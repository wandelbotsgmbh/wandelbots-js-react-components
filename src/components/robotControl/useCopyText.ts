import { useEffect, useState } from "react"

/** The legacy copy command, for the selected text */
function copySelection(): boolean {
  try {
    return document.execCommand("copy")
  } catch {
    return false
  }
}

/**
 * Copies a text to the clipboard; `copied` is true for 3 s after it did.
 *
 * The clipboard API needs a secure context; NOVA instances are often reached
 * over plain http, as RobotPad notes. Then the legacy command copies the
 * selected text: `select` selects the shown text, which stays selected to
 * copy by hand if that fails; without it, a hidden field holds the text.
 */
export function useCopyText() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 3000)
    return () => clearTimeout(timeout)
  }, [copied])

  async function copy(text: string, select?: () => void) {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        return
      }
    } catch {
      // the legacy command below
    }
    if (select) {
      select()
      if (copySelection()) setCopied(true)
      return
    }
    const field = document.createElement("textarea")
    field.value = text
    field.readOnly = true
    field.style.position = "fixed"
    field.style.opacity = "0"
    document.body.appendChild(field)
    field.select()
    if (copySelection()) setCopied(true)
    field.remove()
  }

  return { copied, copy }
}
