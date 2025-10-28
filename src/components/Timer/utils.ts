/**
 * Formats time in seconds to D:HH:MM:SS, H:MM:SS or MM:SS format
 * Used for the default (large) timer variant
 * Automatically includes days and hours as needed for clarity
 */
export const formatTime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  // Build time parts array
  const parts: string[] = []

  if (days > 0) {
    parts.push(days.toString())
    parts.push(hours.toString().padStart(2, "0"))
    parts.push(minutes.toString().padStart(2, "0"))
    parts.push(remainingSeconds.toString().padStart(2, "0"))
  } else if (hours > 0) {
    parts.push(hours.toString())
    parts.push(minutes.toString().padStart(2, "0"))
    parts.push(remainingSeconds.toString().padStart(2, "0"))
  } else {
    parts.push(minutes.toString())
    parts.push(remainingSeconds.toString().padStart(2, "0"))
  }

  return parts.join(":")
}

/**
 * Formats time in seconds to a localized human-readable format
 * Used for the small timer variant
 * Examples: "2h 30m 15s", "45m 30s", "30s"
 * Falls back to English units if Intl.DurationFormat is not available
 */
export const formatTimeLocalized = (
  seconds: number,
  locale?: string,
): string => {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  // Try using Intl.DurationFormat if available (newer browsers)
  if (typeof Intl !== "undefined" && "DurationFormat" in Intl) {
    try {
      const duration: Record<string, number> = {}
      if (days > 0) duration.days = days
      if (hours > 0) duration.hours = hours
      if (minutes > 0) duration.minutes = minutes
      if (remainingSeconds > 0 || Object.keys(duration).length === 0) {
        duration.seconds = remainingSeconds
      }

      // @ts-expect-error
      // TODO: Remove suppression once Intl.DurationFormat is supported in TypeScript types.
      // See: https://github.com/microsoft/TypeScript/issues/53971
      // DurationFormat is a proposed API and not yet available in TypeScript's standard library types.
      const formatter = new Intl.DurationFormat(locale, { style: "narrow" })
      return formatter.format(duration)
    } catch {
      // Fall through to manual formatting
    }
  }

  // Manual formatting with compact units
  const parts: string[] = []

  if (days > 0) parts.push(`${days}d`)
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`)
  if (remainingSeconds > 0 || parts.length === 0) {
    parts.push(`${remainingSeconds}s`)
  }

  return parts.join(" ")
}

/**
 * Calculates progress percentage for timer (minute-based cycles)
 */
export const calculateTimerProgress = (elapsedTime: number): number => {
  return ((elapsedTime / 60) % 1) * 100
}
