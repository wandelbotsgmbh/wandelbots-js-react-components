/** The units of a time ago, the largest first, in seconds */
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
  ["second", 1],
]

/**
 * How long ago `then` was at `now` (both in ms), in the largest whole unit
 * and the given language: "5 seconds ago", "vor 2 Stunden", or "now"
 */
export function timeAgo(then: number, now: number, locale: string): string {
  const seconds = Math.max(0, Math.floor((now - then) / 1000))
  const [unit, size] = UNITS.find(([, size]) => seconds >= size) ?? [
    "second",
    1,
  ]
  return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(
    -Math.floor(seconds / size),
    unit,
  )
}
