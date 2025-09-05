import { observer } from "mobx-react-lite"
import { useEffect, useRef } from "react"
import { externalizeComponent } from "../../externalizeComponent"
import { DefaultVariant } from "./DefaultVariant"
import { SmallVariant } from "./SmallVariant"
import type { CycleTimerProps } from "./types"
import { useAnimations } from "./useAnimations"
import { useTimerLogic } from "./useTimerLogic"

/**
 * A circular gauge timer component that shows the remaining time of a cycle or counts up
 *
 * Features:
 * - Custom SVG circular gauge with 264px diameter and 40px thickness
 * - Multiple states: idle, measuring, measured, countdown, countup, success
 * - Idle state: shows "Waiting for program cycle" with transparent inner circle
 * - Measuring state: counts up with "Cycle Time" / "measuring..." labels
 * - Measured state: shows final time with "Cycle Time" / "determined" labels in pulsating green
 * - Countdown mode: shows remaining time prominently, counts down to zero
 * - Count-up mode: shows elapsed time without special labels
 * - Success state: brief green flash after cycle completion
 * - Displays appropriate labels based on state
 * - Automatically counts down/up and triggers callback when reaching zero (countdown only)
 * - Full timer control: start, pause, resume functionality
 * - Support for starting with elapsed time (resume mid-cycle)
 * - Error state support: pauses timer and shows error styling (red color)
 * - Smooth fade transitions between different text states
 * - Pulsating text animation for completed measuring state
 * - Fully localized with i18next
 * - Material-UI theming integration
 * - Small variant with animated progress icon (gauge border only) next to text or simple text-only mode
 */
export const CycleTimer = externalizeComponent(
  observer(
    ({
      onCycleComplete,
      onCycleEnd,
      onMeasuringComplete,
      autoStart = true,
      variant = "default",
      compact = false,
      className,
      hasError = false,
    }: CycleTimerProps) => {
      const prevStateRef = useRef<string | undefined>(undefined)

      // Initialize animation hooks
      const {
        animationState,
        triggerPauseAnimation,
        triggerErrorAnimation,
        clearErrorAnimation,
        startPulsatingAnimation,
        stopPulsatingAnimation,
        triggerFadeTransition,
        setInitialAnimationState,
        cleanup,
      } = useAnimations()

      // Initialize timer logic
      const { timerState, controls } = useTimerLogic({
        autoStart,
        onCycleEnd,
        onMeasuringComplete,
        hasError,
        onPauseAnimation: triggerPauseAnimation,
        onErrorAnimation: triggerErrorAnimation,
        onClearErrorAnimation: clearErrorAnimation,
        onStartPulsating: startPulsatingAnimation,
      })

      // Handle state changes with fade transitions
      useEffect(() => {
        const prevState = prevStateRef.current

        if (
          prevStateRef.current !== undefined &&
          prevState !== timerState.currentState
        ) {
          // Stop pulsating animation if leaving measured state
          if (prevState === "measured") {
            stopPulsatingAnimation()
          }

          // Trigger fade transition
          triggerFadeTransition()
        } else {
          // No state change or first time - set initial state
          setInitialAnimationState()
        }

        prevStateRef.current = timerState.currentState
      }, [
        timerState.currentState,
        stopPulsatingAnimation,
        triggerFadeTransition,
        setInitialAnimationState,
      ])

      // Provide controls to parent component
      useEffect(() => {
        let isMounted = true
        const timeoutId = setTimeout(() => {
          if (isMounted) {
            onCycleComplete(controls)
          }
        }, 0)

        return () => {
          isMounted = false
          clearTimeout(timeoutId)
        }
      }, [onCycleComplete, controls])

      // Cleanup on unmount
      useEffect(() => {
        return cleanup
      }, [cleanup])

      // Render appropriate variant
      if (variant === "small") {
        return (
          <SmallVariant
            timerState={timerState}
            animationState={animationState}
            hasError={hasError}
            compact={compact}
            className={className}
          />
        )
      }

      return (
        <DefaultVariant
          timerState={timerState}
          animationState={animationState}
          hasError={hasError}
          className={className}
        />
      )
    },
  ),
)
