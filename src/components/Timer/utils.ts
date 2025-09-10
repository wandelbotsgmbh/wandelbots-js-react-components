/**
 * Formats time in seconds to MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

/**
 * Calculates progress percentage for timer (minute-based cycles)
 */
export const calculateTimerProgress = (elapsedTime: number): number => {
  return ((elapsedTime / 60) % 1) * 100
}
