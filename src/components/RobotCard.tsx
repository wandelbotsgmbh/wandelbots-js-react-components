import { Box, Button, Card, Divider, Typography, useTheme } from "@mui/material"
import { CameraControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import type { DHParameter } from "@wandelbots/nova-api/v1"
import type {
  ConnectedMotionGroup,
  RobotControllerStateOperationModeEnum,
  RobotControllerStateSafetyStateEnum,
} from "@wandelbots/nova-js/v1"
import { observer } from "mobx-react-lite"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import type { Group } from "three"
import { Box3, Vector3 } from "three"
import { externalizeComponent } from "../externalizeComponent"
import { PresetEnvironment } from "./3d-viewport/PresetEnvironment"
import { CycleTimer } from "./CycleTimer"
import type { ProgramState } from "./ProgramControl"
import { ProgramStateIndicator } from "./ProgramStateIndicator"
import { SupportedRobot } from "./robots/SupportedRobot"

// Component to auto-fit the camera to show the robot
function AutoFitCamera({
  targetRef,
  onModelLoad,
  connectedMotionGroup,
  cameraOffsetMultiplier = 0.7,
  cameraHeightMultiplier = 0.2,
  targetHeightOffset = 0.2,
}: {
  targetRef: React.RefObject<Group | null>
  onModelLoad?: number
  connectedMotionGroup: ConnectedMotionGroup
  /** How far to position camera horizontally (0.7 = good side angle) */
  cameraOffsetMultiplier?: number
  /** How high to position camera relative to robot size (0.2 = slightly above) */
  cameraHeightMultiplier?: number
  /** How much higher to look relative to robot height (0.2 = shows robot lower in viewport) */
  targetHeightOffset?: number
}) {
  const cameraControlsRef = useRef<CameraControls>(null)

  const fitCameraToRobot = useCallback(() => {
    if (targetRef.current && cameraControlsRef.current) {
      // Calculate bounding box of the robot
      const box = new Box3().setFromObject(targetRef.current)

      // Only proceed if the bounding box is not empty (model is loaded)
      if (!box.isEmpty()) {
        const center = box.getCenter(new Vector3())
        const size = box.getSize(new Vector3())

        // Get the max dimension to calculate proper distance
        const maxDim = Math.max(size.x, size.y, size.z)
        const distance = maxDim * 1.5

        // Position camera at a slight angle - higher and to the side
        cameraControlsRef.current.setLookAt(
          center.x + distance * cameraOffsetMultiplier,
          center.y + distance * cameraHeightMultiplier,
          center.z + distance * cameraOffsetMultiplier,
          center.x,
          center.y + size.y * targetHeightOffset, // Look at a point higher to show robot lower in viewport
          center.z,
          true, // animate
        )
        return true
      }
    }
    return false
  }, [
    targetRef,
    cameraOffsetMultiplier,
    cameraHeightMultiplier,
    targetHeightOffset,
  ])

  // Watch for motion state changes to refit camera when robot pose changes
  useEffect(() => {
    if (connectedMotionGroup.rapidlyChangingMotionState) {
      // Small delay to ensure the robot has moved to the new position
      const timer = setTimeout(() => fitCameraToRobot(), 100)
      return () => clearTimeout(timer)
    }
  }, [connectedMotionGroup.rapidlyChangingMotionState, fitCameraToRobot])

  useEffect(() => {
    if (onModelLoad && onModelLoad > 0) {
      // Small delay to ensure the model is fully rendered
      setTimeout(() => fitCameraToRobot(), 100)
    }
  }, [onModelLoad, fitCameraToRobot])

  useEffect(() => {
    // Initial attempt
    fitCameraToRobot()
  }, [fitCameraToRobot])

  return <CameraControls ref={cameraControlsRef} makeDefault enabled={false} />
}

export interface RobotCardProps {
  /** Name of the robot displayed at the top */
  robotName: string
  /** Current program state */
  programState: ProgramState
  /** Current safety state of the robot controller */
  safetyState: RobotControllerStateSafetyStateEnum
  /** Current operation mode of the robot controller */
  operationMode: RobotControllerStateOperationModeEnum
  /** Runtime text to display */
  runtime: string
  /** Whether the "Drive to Home" button should be enabled */
  driveToHomeEnabled?: boolean
  /** Callback fired when "Drive to Home" button is pressed */
  onDriveToHomePress?: () => void
  /** Callback fired when "Drive to Home" button is released */
  onDriveToHomeRelease?: () => void
  /** Connected motion group for the robot */
  connectedMotionGroup: ConnectedMotionGroup
  /** Custom robot component to render (optional, defaults to SupportedRobot) */
  robotComponent?: React.ComponentType<{
    rapidlyChangingMotionState: ConnectedMotionGroup["rapidlyChangingMotionState"]
    modelFromController: string
    dhParameters: DHParameter[]
    flangeRef?: React.Ref<Group>
    postModelRender?: () => void
    transparentColor?: string
    getModel?: (modelFromController: string) => string
  }>
  /** Custom cycle timer component (optional, defaults to CycleTimer) */
  cycleTimerComponent?: React.ComponentType<{
    variant?: "default" | "small"
    compact?: boolean
    onCycleComplete: (controls: {
      startNewCycle: (maxTimeSeconds: number, elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    }) => void
    onCycleEnd?: () => void
    autoStart?: boolean
    className?: string
  }>
  /** Additional CSS class name */
  className?: string
}

/**
 * A responsive card component that displays a 3D robot with states and controls.
 * The card automatically adapts to its container's size while maintaining a minimum size.
 *
 * Features:
 * - Fully responsive Material-UI Card that adapts to container dimensions
 * - Minimum size constraints (300px width, 400px height) for usability
 * - Robot name displayed in Typography h6 at top-left
 * - Program state indicator below the name
 * - Auto-fitting 3D robot model that scales with container size
 * - Runtime display with specified typography
 * - Compact cycle time component with small variant
 * - Transparent gray divider line
 * - "Drive to Home" button with press-and-hold functionality
 * - Localization support via react-i18next
 * - Material-UI theming integration
 */
export const RobotCard = externalizeComponent(
  observer(
    ({
      robotName,
      programState,
      safetyState,
      operationMode,
      driveToHomeEnabled = false,
      onDriveToHomePress,
      onDriveToHomeRelease,
      connectedMotionGroup,
      robotComponent: RobotComponent = SupportedRobot,
      cycleTimerComponent: CycleTimerComponent = CycleTimer,
      className,
    }: RobotCardProps) => {
      const theme = useTheme()
      const { t } = useTranslation()
      const [isDriveToHomePressed, setIsDriveToHomePressed] = useState(false)
      const driveButtonRef = useRef<HTMLButtonElement>(null)
      const robotRef = useRef<Group>(null)
      const [modelLoaded, setModelLoaded] = useState(0)

      const handleModelRender = useCallback(() => {
        // Trigger camera refit by updating state
        setModelLoaded((prev) => prev + 1)
      }, [])

      const handleDriveToHomeMouseDown = useCallback(() => {
        if (!driveToHomeEnabled || !onDriveToHomePress) return
        setIsDriveToHomePressed(true)
        onDriveToHomePress()
      }, [driveToHomeEnabled, onDriveToHomePress])

      const handleDriveToHomeMouseUp = useCallback(() => {
        if (!driveToHomeEnabled || !onDriveToHomeRelease) return
        setIsDriveToHomePressed(false)
        onDriveToHomeRelease()
      }, [driveToHomeEnabled, onDriveToHomeRelease])

      const handleDriveToHomeMouseLeave = useCallback(() => {
        if (isDriveToHomePressed && onDriveToHomeRelease) {
          setIsDriveToHomePressed(false)
          onDriveToHomeRelease()
        }
      }, [isDriveToHomePressed, onDriveToHomeRelease])

      // Mock cycle timer controls for now
      const handleCycleComplete = useCallback((_controls: {
        startNewCycle: (maxTimeSeconds: number, elapsedSeconds?: number) => void
        pause: () => void
        resume: () => void
        isPaused: () => boolean
      }) => {
        // TODO: Implement cycle timer integration if needed
        // Controls are available here for future integration
      }, [])

      return (
        <Card
          className={className}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
            minWidth: 300,
            minHeight: 400,
            background: "var(--background-paper-elevation-8, #292B3F)",
            border:
              "1px solid var(--secondary-_states-outlinedBorder, #FFFFFF1F)",
            borderRadius: "18px",
            boxShadow: "none",
          }}
        >
          {/* Header section with robot name and program state */}
          <Box sx={{ p: 3, pb: 1 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              {robotName}
            </Typography>
            <ProgramStateIndicator
              programState={programState}
              safetyState={safetyState}
              operationMode={operationMode}
            />
          </Box>

          {/* 3D Robot viewport with transparent background and auto-fit camera */}
          <Box
            sx={{
              flex: 1,
              position: "relative",
              minHeight: 200,
              borderRadius: 1,
              mx: 3,
              mb: 1,
            }}
          >
            <Canvas
              camera={{
                position: [2, 2, 2],
                fov: 45,
              }}
              shadows
              style={{
                borderRadius: theme.shape.borderRadius,
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
              dpr={[1, 2]}
              gl={{ alpha: true, antialias: true }}
            >
              <PresetEnvironment />
              <AutoFitCamera
                targetRef={robotRef}
                onModelLoad={modelLoaded}
                connectedMotionGroup={connectedMotionGroup}
              />
              <group ref={robotRef}>
                <RobotComponent
                  rapidlyChangingMotionState={
                    connectedMotionGroup.rapidlyChangingMotionState
                  }
                  modelFromController={
                    connectedMotionGroup.modelFromController || ""
                  }
                  dhParameters={connectedMotionGroup.dhParameters || []}
                  postModelRender={handleModelRender}
                />
              </group>
            </Canvas>
          </Box>

          {/* Bottom section with runtime, cycle time, and button */}
          <Box sx={{ p: 3, pt: 0 }}>
            {/* Runtime display */}
            <Typography
              variant="body1"
              sx={{
                mb: 0,
                color: "var(--text-secondary, #FFFFFFB2)",
              }}
            >
              {t("RobotCard.Runtime.lb")}
            </Typography>

            {/* Compact cycle time component directly below runtime */}
            <CycleTimerComponent
              variant="small"
              compact
              onCycleComplete={handleCycleComplete}
            />

            {/* Divider */}
            <Divider
              sx={{
                mt: 2,
                mb: 2,
                borderColor: theme.palette.divider,
                opacity: 0.5,
              }}
            />

            {/* Drive to Home button with some space */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                mt: 5,
                mb: 2,
              }}
            >
              <Button
                ref={driveButtonRef}
                variant="contained"
                color="secondary"
                size="medium"
                disabled={true}
                onMouseDown={handleDriveToHomeMouseDown}
                onMouseUp={handleDriveToHomeMouseUp}
                onMouseLeave={handleDriveToHomeMouseLeave}
                onTouchStart={handleDriveToHomeMouseDown}
                onTouchEnd={handleDriveToHomeMouseUp}
                sx={{
                  textTransform: "none",
                }}
              >
                {t("RobotCard.DriveToHome.bt")}
              </Button>
            </Box>
          </Box>
        </Card>
      )
    },
  ),
)
