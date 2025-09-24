/**
 * Formats time in seconds to MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

/**
 * Calculates progress percentage for different timer states
 */
export const calculateProgress = (
  currentState: string,
  remainingTime: number,
  maxTime: number | null,
): number => {
  if (currentState === "idle") {
    return 0
  }

  if (currentState === "countdown" && maxTime !== null) {
    // Count-down mode: progress based on elapsed time
    const elapsed = maxTime - remainingTime
    return Math.min(100, (elapsed / maxTime) * 100)
  }

  if (currentState === "measuring") {
    // Measuring mode: progress based on minute steps (0-100% per minute)
    return ((remainingTime / 60) % 1) * 100
  }

  return 0
}

/**
 * Calculates exact progress position based on elapsed time
 */
export const calculateExactProgress = (
  currentState: string,
  totalElapsed: number,
  maxTime: number | null,
): number => {
  if (currentState === "countdown" && maxTime !== null) {
    return Math.min(100, (totalElapsed / maxTime) * 100)
  }

  if (currentState === "measuring") {
    return ((totalElapsed / 60) % 1) * 100
  }

  return 0
}
