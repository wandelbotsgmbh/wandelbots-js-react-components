/**
 * Where the library's NOVA connections log: the console by default, or an
 * app's own logger (e.g. one that sends the lines to its backend)
 */
export type ConnectionLogger = {
  info: (message: string, data?: unknown) => void
  debug: (message: string, data?: unknown) => void
  warn: (message: string, data?: unknown) => void
}
