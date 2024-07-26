export function radiansToDegree(radians: number): number {
  return radians * (180 / Math.PI)
}

export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

export function tryParseJson(json: unknown): any {
  try {
    return JSON.parse(json as string)
  } catch {
    return undefined
  }
}

export function tryStringifyJson(json: unknown): string | undefined {
  try {
    return JSON.stringify(json)
  } catch {
    return undefined
  }
}