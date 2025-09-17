export interface TimerControls {
  start: (elapsedSeconds?: number) => void
  pause: () => void
  resume: () => void
  reset: () => void
  isPaused: () => boolean
}

export interface TimerProps {
  /**
   * Callback that receives the timer control functions
   */
  onTimerReady: (controls: TimerControls) => void
  /** Whether the timer should start automatically when initialized */
  autoStart?: boolean
  /** Visual variant of the timer */
  variant?: "default" | "small"
  /** For small variant: whether to show compact display */
  compact?: boolean
  /** Additional CSS classes */
  className?: string
  /** Whether the timer is in an error state (pauses timer and shows error styling) */
  hasError?: boolean
}

export interface TimerState {
  elapsedTime: number
  isRunning: boolean
  isPausedState: boolean
  currentProgress: number
  wasRunningBeforeError: boolean
}

export interface TimerAnimationState {
  showPauseAnimation: boolean
  showErrorAnimation: boolean
  showMainText: boolean
}
