export type CycleTimerState =
  | "idle" // Initial state showing "Waiting for program cycle"
  | "measuring" // Counting up without max time, showing "Cycle Time" / "measuring..."
  | "measured" // Completed measuring state showing "Cycle Time" / "determined" with pulsating green text
  | "countdown" // Counting down with max time
  | "success" // Brief success state after cycle completion

export interface CycleTimerControls {
  startNewCycle: (maxTimeSeconds: number, elapsedSeconds?: number) => void
  startMeasuring: (elapsedSeconds?: number) => void
  setIdle: () => void
  completeMeasuring: () => void
  pause: () => void
  resume: () => void
  isPaused: () => boolean
}

export interface CycleTimerProps {
  /**
   * Callback that receives the timer control functions
   */
  onCycleComplete: (controls: CycleTimerControls) => void
  /** Callback fired when a cycle actually completes (reaches zero) */
  onCycleEnd?: () => void
  /** Callback fired when measuring cycle completes */
  onMeasuringComplete?: () => void
  /** Whether the timer should start automatically when maxTime is set */
  autoStart?: boolean
  /** Visual variant of the timer */
  variant?: "default" | "small"
  /** For small variant: whether to show remaining time details (compact hides them) */
  compact?: boolean
  /** Additional CSS classes */
  className?: string
  /** Whether the timer is in an error state (pauses timer and shows error styling) */
  hasError?: boolean
}

export interface TimerState {
  currentState: CycleTimerState
  remainingTime: number
  maxTime: number | null
  isRunning: boolean
  isPausedState: boolean
  currentProgress: number
  wasRunningBeforeError: boolean
}

export interface AnimationState {
  showPauseAnimation: boolean
  showErrorAnimation: boolean
  showPulsatingText: boolean
  pulsatingFinished: boolean
  showLabels: boolean
  showMainText: boolean
  showIdlePulsating: boolean
  idleDotsCount: number
}
