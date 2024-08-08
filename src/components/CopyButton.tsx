import { Tooltip } from "@mui/material"
import { FC, RefObject, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

/**
 * A button that copies the text content of a target element to the clipboard.
 * Falls back to selecting the text if direct clipboard access is not available
 * (e.g. on a non-https connection).
 */
export const CopyButton: FC<{ targetRef: RefObject<HTMLElement> }> = ({
  targetRef,
}) => {
  const [isCopiedTooltipShown, setIsCopiedTooltipShown] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { t } = useTranslation()

  async function copyToClipboard() {
    const targetEl = targetRef.current
    if (!targetEl) return

    try {
      await navigator.clipboard.writeText(targetEl.textContent || "")
      setIsCopiedTooltipShown(true)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      timeoutRef.current = setTimeout(() => {
        setIsCopiedTooltipShown(false)
      }, 1000)
    } catch (err) {
      // Direct clipboard copy is not available in non-secure contexts
      console.error(err)

      // Let's fall back to selecting the text so the user can manually copy easily
      const selection = window.getSelection()!
      const range = document.createRange()
      range.selectNodeContents(targetEl)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }

  return (
    <Tooltip
      open={state.isCopiedTooltipShown}
      title={t("Points.Copied.lb")}
      placement="top"
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -10],
              },
            },
          ],
        },
      }}
    >
      <IconButton onClick={state.copyToClipboard}>
        <CopyAllSharp />
      </IconButton>
    </Tooltip>
  )
}
