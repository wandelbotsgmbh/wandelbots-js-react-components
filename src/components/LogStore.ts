import { action, makeObservable, observable } from "mobx"
import type { LogLevel, LogMessage } from "./LogViewer"

export class LogStore {
  messages: LogMessage[] = []

  constructor() {
    makeObservable(this, {
      messages: observable,
      addMessage: action,
      clearMessages: action,
    })
  }

  addMessage = (message: string, level: LogLevel = "info") => {
    const logMessage: LogMessage = {
      id: Math.random().toString(36).substring(2, 11),
      timestamp: new Date(),
      message,
      level,
    }
    this.messages.push(logMessage)
  }

  clearMessages = () => {
    this.messages = []
  }

  addInfo = (message: string) => {
    this.addMessage(message, "info")
  }

  addWarning = (message: string) => {
    this.addMessage(message, "warning")
  }

  addError = (message: string) => {
    this.addMessage(message, "error")
  }
}
