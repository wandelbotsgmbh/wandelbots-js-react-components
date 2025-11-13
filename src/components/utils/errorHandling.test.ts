import axios, { AxiosError, AxiosHeaders } from "axios"
import { expect, test } from "vitest"
import { makeErrorMessage } from "./errorHandling"

test("making useful error messages", async () => {
  // Error objects take the message
  const someCustomError = new Error("some custom error")
  expect(makeErrorMessage(someCustomError)).toEqual("some custom error")

  // Strings go through prefixed
  expect(makeErrorMessage("some string")).toEqual(
    'Unexpected error: "some string"',
  )

  // Random objects get serialized
  expect(makeErrorMessage({ some: "object" })).toEqual(
    'Unexpected error: {"some":"object"}',
  )

  // Axios errors with a response should include the response code
  // and url - but not for 404, we use a friendly message for that
  try {
    await axios.get("http://example.com/doesnt-exist")
    expect(true).toBe(false)
  } catch (err) {
    expect(makeErrorMessage(err)).toMatch(
      "Failed to connect to the server. Please check your internet connection.",
    )
  }

  // Not sure how to reproduce CORS errors naturally in vitest environment
  // so let's create it manually
  const networkError = new AxiosError("Network Error", "ERR_NETWORK", {
    url: "http://example.com/some-cors-thing",
    method: "post",
    headers: new AxiosHeaders(),
  })
  expect(makeErrorMessage(networkError)).toEqual(
    "Failed to connect to the server. Please check your internet connection.",
  )
})
