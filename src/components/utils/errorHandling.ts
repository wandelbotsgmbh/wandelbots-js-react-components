import { AxiosError } from "axios"
import { tryStringifyJson } from "./converters"

// Please note: These helper functions also exist in nova.js
// (with slightly different formatting), and will be unified
// at some point in the future.

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function makeShortErrorMessage(err: unknown) {
  if (err instanceof AxiosError && err.code === "ERR_NETWORK") {
    return "Failed to connect to the server. Please check your internet connection."
  } else if (err instanceof AxiosError && err.response) {
    return `${err.response?.status} ${err.response?.statusText}: ${JSON.stringify(err.response?.data)}`
  } else if (err instanceof Error) {
    return err.message
  } else {
    return `Unexpected error: ${err}`
  }
}

export function assertUnreachable(x: never, msg: string): never {
  throw new Error(msg + ` ${JSON.stringify(x)}`)
}

export function makeErrorMessage(err: unknown) {
  if (err instanceof AxiosError && err.code === "ERR_NETWORK") {
    return "Failed to connect to the server. Please check your internet connection."
  } else if (err instanceof AxiosError && err.response) {
    return `${err.response?.status} ${err.response?.statusText} from ${err.response?.config.url}: ${JSON.stringify(err.response?.data)}`
  } else if (err instanceof Error) {
    return err.message
  } else {
    return `Unexpected error: ${tryStringifyJson(err) || err}`
  }
}
