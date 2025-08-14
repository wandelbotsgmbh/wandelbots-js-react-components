import { Box, Button, Card, Divider, Typography, useTheme } from "@mui/material"
import { Bounds, useBounds } from "@react-three/drei"
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
import { externalizeComponent } from "../externalizeComponent"
import { PresetEnvironment } from "./3d-viewport/PresetEnvironment"
import { CycleTimer } from "./CycleTimer"
import type { ProgramState } from "./ProgramControl"
import { ProgramStateIndicator } from "./ProgramStateIndicator"
import { SupportedRobot } from "./robots/SupportedRobot"

// Component to refresh bounds when model renders
function BoundsRefresher({
  modelRenderTrigger,
  children,
}: {
  modelRenderTrigger?: number
  children: React.ReactNode
}) {
  const api = useBounds()

  useEffect(() => {
    if (modelRenderTrigger && modelRenderTrigger > 0) {
      // Small delay to ensure the model is fully rendered
      const timer = setTimeout(() => {
        api.refresh().fit()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [modelRenderTrigger, api])

  return <>{children}</>
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
 * The card automatically adapts to its container's size and aspect ratio.
 *
 * Features:
 * - Fully responsive Material-UI Card that adapts to container dimensions
 * - Automatic layout switching based on aspect ratio:
 *   - Portrait mode: Vertical layout with robot in center
 *   - Landscape mode: Horizontal layout with robot on left, content on right (left-aligned)
 * - Minimum size constraints (300px width, 400px height in portrait, 250px height in landscape) for usability
 * - Robot name displayed in Typography h6 at top-left
 * - Program state indicator below the name
 * - Auto-fitting 3D robot model that scales with container size
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
      const cardRef = useRef<HTMLDivElement>(null)
      const [isLandscape, setIsLandscape] = useState(false)
      const [modelRenderTrigger, setModelRenderTrigger] = useState(0)

      // Hook to detect aspect ratio changes
      useEffect(() => {
        const checkAspectRatio = () => {
          if (cardRef.current) {
            const { offsetWidth, offsetHeight } = cardRef.current
            setIsLandscape(offsetWidth > offsetHeight)
          }
        }

        // Initial check
        checkAspectRatio()

        // Set up ResizeObserver to watch for size changes
        const resizeObserver = new ResizeObserver(checkAspectRatio)
        if (cardRef.current) {
          resizeObserver.observe(cardRef.current)
        }

        return () => {
          resizeObserver.disconnect()
        }
      }, [])

      const handleModelRender = useCallback(() => {
        // Trigger bounds refresh when model renders
        setModelRenderTrigger((prev) => prev + 1)
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
      const handleCycleComplete = useCallback(
        (_controls: {
          startNewCycle: (
            maxTimeSeconds: number,
            elapsedSeconds?: number,
          ) => void
          pause: () => void
          resume: () => void
          isPaused: () => boolean
        }) => {
          // TODO: Implement cycle timer integration if needed
          // Controls are available here for future integration
        },
        [],
      )

      return (
        <Card
          ref={cardRef}
          className={className}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: isLandscape ? "row" : "column",
            position: "relative",
            overflow: "hidden",
            minWidth: 300,
            minHeight: isLandscape ? 300 : 400,
            background: "var(--background-paper-elevation-8, #292B3F)",
            border:
              "1px solid var(--secondary-_states-outlinedBorder, #FFFFFF1F)",
            borderRadius: "18px",
            boxShadow: "none",
          }}
        >
          {isLandscape ? (
            <>
              {/* Landscape Layout: Robot on left, content on right */}
              <Box
                sx={{
                  flex: "0 0 50%",
                  position: "relative",
                  height: "100%",
                  minHeight: "100%",
                  maxHeight: "100%",
                  borderRadius: 1,
                  m: 2,
                  mr: 1,
                  overflow: "hidden", // Prevent content from affecting container size
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
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                  dpr={[1, 2]}
                  gl={{ alpha: true, antialias: true }}
                >
                  <PresetEnvironment />
                  <Bounds fit clip observe margin={1}>
                    <BoundsRefresher modelRenderTrigger={modelRenderTrigger}>
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
                    </BoundsRefresher>
                  </Bounds>
                </Canvas>
              </Box>

              {/* Content container on right */}
              <Box
                sx={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                {/* Header section with robot name and program state */}
                <Box
                  sx={{
                    p: 3,
                    pb: 2,
                    textAlign: "left",
                  }}
                >
                  <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                    {robotName}
                  </Typography>
                  <ProgramStateIndicator
                    programState={programState}
                    safetyState={safetyState}
                    operationMode={operationMode}
                  />
                </Box>

                {/* Bottom section with runtime, cycle time, and button */}
                <Box
                  sx={{
                    p: 3,
                    pt: 0,
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    {/* Runtime display */}
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 0,
                        color: "var(--text-secondary, #FFFFFFB2)",
                        textAlign: "left",
                      }}
                    >
                      {t("RobotCard.Runtime.lb")}
                    </Typography>

                    {/* Compact cycle time component directly below runtime */}
                    <Box sx={{ textAlign: "left" }}>
                      <CycleTimerComponent
                        variant="small"
                        compact
                        onCycleComplete={handleCycleComplete}
                      />
                    </Box>

                    {/* Divider */}
                    <Divider
                      sx={{
                        mt: 2,
                        mb: 2,
                        borderColor: theme.palette.divider,
                        opacity: 0.5,
                      }}
                    />
                  </Box>

                  <Box sx={{ mt: "auto" }}>
                    {/* Drive to Home button with some space */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        mt: 2,
                        mb: 2,
                      }}
                    >
                      <Button
                        ref={driveButtonRef}
                        variant="contained"
                        color="secondary"
                        size="small"
                        disabled={true}
                        onMouseDown={handleDriveToHomeMouseDown}
                        onMouseUp={handleDriveToHomeMouseUp}
                        onMouseLeave={handleDriveToHomeMouseLeave}
                        onTouchStart={handleDriveToHomeMouseDown}
                        onTouchEnd={handleDriveToHomeMouseUp}
                        sx={{
                          textTransform: "none",
                          px: 1.5,
                          py: 0.5,
                        }}
                      >
                        {t("RobotCard.DriveToHome.bt")}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <>
              {/* Portrait Layout: Header, Robot, Footer */}

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

              {/* 3D Robot viewport in center */}
              <Box
                sx={{
                  flex: 1,
                  position: "relative",
                  minHeight: 200,
                  borderRadius: 1,
                  mx: 3,
                  mb: 1,
                  overflow: "hidden", // Prevent content from affecting container size
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
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                  dpr={[1, 2]}
                  gl={{ alpha: true, antialias: true }}
                >
                  <PresetEnvironment />
                  <Bounds fit clip observe margin={1.2}>
                    <BoundsRefresher modelRenderTrigger={modelRenderTrigger}>
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
                    </BoundsRefresher>
                  </Bounds>
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
                    size="small"
                    disabled={true}
                    onMouseDown={handleDriveToHomeMouseDown}
                    onMouseUp={handleDriveToHomeMouseUp}
                    onMouseLeave={handleDriveToHomeMouseLeave}
                    onTouchStart={handleDriveToHomeMouseDown}
                    onTouchEnd={handleDriveToHomeMouseUp}
                    sx={{
                      textTransform: "none",
                      px: 1.5,
                      py: 0.5,
                    }}
                  >
                    {t("RobotCard.DriveToHome.bt")}
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Card>
      )
    },
  ),
)
