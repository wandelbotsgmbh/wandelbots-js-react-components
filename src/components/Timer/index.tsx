import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { externalizeComponent } from "../../externalizeComponent"
import { TimerDefaultVariant } from "./TimerDefaultVariant"
import { TimerSmallVariant } from "./TimerSmallVariant"
import type { TimerProps } from "./types"
import { useTimerAnimations } from "./useTimerAnimations"
import { useTimerLogic } from "./useTimerLogic"

/**
 * A simple count-up timer component with visual progress indication
 *
 * Features:
 * - Count-up timer that tracks elapsed time
 * - Visual progress gauge that cycles every minute
 * - Two display variants: large circular gauge (default) or small icon with text
 * - Full timer control: start, pause, resume, reset functionality
 * - Support for starting with elapsed time (resume mid-session)
 * - Error state support: pauses timer and shows error styling
 * - Smooth progress animations with spring physics
 * - Fully localized with i18next
 * - Material-UI theming integration
 */
export const Timer = externalizeComponent(
  observer(
    ({
      onTimerReady,
      autoStart = true,
      variant = "default",
      compact = false,
      className,
      hasError = false,
    }: TimerProps) => {
      // Initialize animation hooks
      const {
        animationState,
        triggerPauseAnimation,
        triggerErrorAnimation,
        clearErrorAnimation,
        setInitialAnimationState,
        cleanup,
      } = useTimerAnimations()

      // Initialize timer logic
      const { timerState, controls } = useTimerLogic({
        autoStart,
        hasError,
        onPauseAnimation: triggerPauseAnimation,
        onErrorAnimation: triggerErrorAnimation,
        onClearErrorAnimation: clearErrorAnimation,
      })

      // Set initial animation state
      useEffect(() => {
        setInitialAnimationState()
      }, [setInitialAnimationState])

      // Provide controls to parent component
      useEffect(() => {
        let isMounted = true
        const timeoutId = setTimeout(() => {
          if (isMounted) {
            onTimerReady(controls)
          }
        }, 0)

        return () => {
          isMounted = false
          clearTimeout(timeoutId)
        }
      }, [onTimerReady, controls])

      // Cleanup on unmount
      useEffect(() => {
        return cleanup
      }, [cleanup])

      // Render appropriate variant
      if (variant === "small") {
        return (
          <TimerSmallVariant
            timerState={timerState}
            animationState={animationState}
            hasError={hasError}
            compact={compact}
            className={className}
          />
        )
      }

      return (
        <TimerDefaultVariant
          timerState={timerState}
          animationState={animationState}
          hasError={hasError}
          className={className}
        />
      )
    },
  ),
)
