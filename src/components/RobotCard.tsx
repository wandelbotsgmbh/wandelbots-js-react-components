import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Bounds, useBounds } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
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
import { Robot } from "./robots/Robot"

// Component to refresh bounds when model renders
function BoundsRefresher({
  modelRenderTrigger,
  children,
  isPortrait = false,
}: {
  modelRenderTrigger: number
  children: React.ReactNode
  isPortrait?: boolean
}) {
  const bounds = useBounds()

  useEffect(() => {
    if (modelRenderTrigger > 0) {
      // For portrait mode, use more aggressive fitting
      if (isPortrait) {
        bounds.refresh().clip().fit()
      } else {
        bounds.refresh().clip().fit()
      }
    }
  }, [modelRenderTrigger, bounds, isPortrait])

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
  /** Custom robot component to render (optional, defaults to Robot) */
  robotComponent?: React.ComponentType<{
    connectedMotionGroup: ConnectedMotionGroup
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
 * - Responsive 3D robot rendering:
 *   - Scales dynamically with container size
 *   - Hides at very small sizes to preserve usability
 *   - Adaptive margin based on available space
 * - Smart spacing and padding that reduces at smaller sizes
 * - Minimum size constraints for usability while maximizing content density
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
      robotComponent: RobotComponent = Robot,
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
      const [cardSize, setCardSize] = useState<{
        width: number
        height: number
      }>({ width: 400, height: 600 })
      const [modelRenderTrigger, setModelRenderTrigger] = useState(0)

      // Responsive breakpoints
      const isExtraSmall = useMediaQuery(theme.breakpoints.down("sm"))
      const isSmall = useMediaQuery(theme.breakpoints.down("md"))

      // Hook to detect aspect ratio and size changes
      useEffect(() => {
        const checkDimensions = () => {
          if (cardRef.current) {
            const { offsetWidth, offsetHeight } = cardRef.current
            setIsLandscape(offsetWidth > offsetHeight)
            setCardSize({ width: offsetWidth, height: offsetHeight })
          }
        }

        // Initial check
        checkDimensions()

        // Set up ResizeObserver to watch for size changes
        const resizeObserver = new ResizeObserver(checkDimensions)
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

      // Determine if robot should be hidden at small sizes to save space
      // Less aggressive hiding for portrait mode since robot is in center
      const shouldHideRobot = isLandscape
        ? cardSize.width < 350 || cardSize.height < 250 // Aggressive for landscape
        : cardSize.width < 250 || cardSize.height < 180 // Less aggressive for portrait

      // Calculate responsive robot scale based on card size and orientation
      const getRobotScale = () => {
        if (shouldHideRobot) return 0

        if (isLandscape) {
          // More aggressive scaling for landscape since robot is on side
          if (cardSize.width < 450) return 0.8
          if (cardSize.width < 550) return 0.9
          return 1
        } else {
          // Less aggressive scaling for portrait since robot is central
          if (cardSize.width < 300) return 0.8
          if (cardSize.width < 400) return 0.9
          return 1
        }
      }

      const robotScale = getRobotScale()

      return (
        <Card
          ref={cardRef}
          className={className}
          elevation={5}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: isLandscape ? "row" : "column",
            position: "relative",
            overflow: "hidden",
            minWidth: { xs: 180, sm: 220, md: 250 },
            minHeight: isLandscape
              ? { xs: 160, sm: 200, md: 250 }
              : { xs: 200, sm: 280, md: 350 },
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
                  m: { xs: 1.5, sm: 2, md: 3 },
                  mr: { xs: 0.75, sm: 1, md: 1.5 },
                  overflow: "hidden", // Prevent content from affecting container size
                  display: shouldHideRobot ? "none" : "block",
                }}
              >
                {!shouldHideRobot && (
                  <Canvas
                    camera={{
                      position: [4, 4, 4], // Move camera further back for orthographic view
                      fov: 15, // Low FOV for near-orthographic projection
                    }}
                    shadows
                    frameloop="demand"
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
                      <BoundsRefresher
                        modelRenderTrigger={modelRenderTrigger}
                        isPortrait={false}
                      >
                        <group ref={robotRef} scale={robotScale}>
                          <RobotComponent
                            connectedMotionGroup={connectedMotionGroup}
                            postModelRender={handleModelRender}
                          />
                        </group>
                      </BoundsRefresher>
                    </Bounds>
                  </Canvas>
                )}
              </Box>

              {/* Content container on right */}
              <Box
                sx={{
                  flex: shouldHideRobot ? "1" : "1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  width: shouldHideRobot ? "100%" : "50%",
                }}
              >
                {/* Header section with robot name and program state */}
                <Box
                  sx={{
                    p: { xs: 1.5, sm: 2, md: 3 },
                    pb: { xs: 1, sm: 1.5, md: 2 },
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
                    p: { xs: 1.5, sm: 2, md: 3 },
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
                        mt: 1,
                        mb: 0,
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
                        mt: { xs: 1, sm: 1.5, md: 2 },
                        mb: { xs: 0.5, sm: 0.75, md: 1 },
                      }}
                    >
                      <Button
                        ref={driveButtonRef}
                        variant="contained"
                        color="secondary"
                        size="small"
                        disabled={!driveToHomeEnabled}
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
              <Box
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Header section with robot name and program state */}
                <Box>
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
                    flex: shouldHideRobot ? 0 : 1,
                    position: "relative",
                    minHeight: shouldHideRobot
                      ? 0
                      : { xs: 120, sm: 150, md: 200 },
                    height: shouldHideRobot ? 0 : "auto",
                    borderRadius: 1,
                    overflow: "hidden",
                    display: shouldHideRobot ? "none" : "block",
                  }}
                >
                  {!shouldHideRobot && (
                    <Canvas
                      camera={{
                        position: [3, 3, 3], // Closer camera position for portrait to make robot larger
                        fov: 20, // Slightly higher FOV for portrait to fill better
                      }}
                      shadows
                      frameloop="demand"
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
                      <Bounds fit observe margin={1}>
                        <BoundsRefresher
                          modelRenderTrigger={modelRenderTrigger}
                          isPortrait={true}
                        >
                          <group ref={robotRef} scale={robotScale}>
                            <RobotComponent
                              connectedMotionGroup={connectedMotionGroup}
                              postModelRender={handleModelRender}
                            />
                          </group>
                        </BoundsRefresher>
                      </Bounds>
                    </Canvas>
                  )}
                </Box>

                {/* Bottom section with runtime, cycle time, and button */}
                <Box>
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
                      mt: 1,
                      mb: 0,
                      borderColor: theme.palette.divider,
                      opacity: 0.5,
                    }}
                  />

                  {/* Drive to Home button with some space */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      mt: { xs: 1, sm: 2, md: 5 },
                      mb: { xs: 0.5, sm: 0.75, md: 1 },
                    }}
                  >
                    <Button
                      ref={driveButtonRef}
                      variant="contained"
                      color="secondary"
                      size="small"
                      disabled={!driveToHomeEnabled}
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
            </>
          )}
        </Card>
      )
    },
  ),
)
