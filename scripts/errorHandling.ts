export function assertUnreachable(x: never, msg: string): never {
  throw new Error(msg + ` ${JSON.stringify(x)}`)
}

export function makeErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message
  }
  return String(err)
}
