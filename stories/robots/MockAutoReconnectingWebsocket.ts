// MockAutoReconnectingWebsocket.ts

import { AutoReconnectingWebsocket } from "@wandelbots/wandelbots-js"

export class MockAutoReconnectingWebsocket extends AutoReconnectingWebsocket {
  opts: any

  addEventListener(event: string, listener: (event: any) => void) {
    // Mock implementation of addEventListener
  }

  close() {
    // Mock implementation of close
  }

  // Add other methods and properties as needed to match the AutoReconnectingWebsocket interface
  changeUrl(url: string) {
    // Mock implementation of changeUrl
  }

  // Mock other methods and properties as needed
}
