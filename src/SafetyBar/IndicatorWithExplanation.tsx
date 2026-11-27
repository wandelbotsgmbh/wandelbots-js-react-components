import Popover, { type PopoverOrigin } from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import SvgIcon from "@mui/material/SvgIcon"
import Typography, { type TypographyProps } from "@mui/material/Typography"
import { observer, useLocalObservable } from "mobx-react-lite"
import type { ElementType, ReactNode } from "react"

export type IndicatorWithExplanationProps = {
  /** The id of the popover: one per state and component, so not stable */
  id: string
  /**
   * What a test finds the indicator by, whatever it shows: the same for
   * every state, e.g. "safety-state-indicator"
   */
  testId: string
  /**
   * The name of the indicator for a screen reader and a test, e.g. "Safety
   * state: Safe": it shows an icon, and its text only in the popover
   */
  accessibleName: string
  icon: ElementType
  color: TypographyProps["color"]
  title?: ReactNode
  name: ReactNode
  label?: ReactNode
  explanation: ReactNode
  literalValue?: string
  anchorOrigin?: PopoverOrigin
  transformOrigin?: PopoverOrigin
}

export const IndicatorWithExplanation = observer(
  ({
    id,
    testId,
    accessibleName,
    icon,
    color,
    title,
    name,
    label,
    explanation,
    literalValue,
    anchorOrigin,
    transformOrigin,
  }: IndicatorWithExplanationProps) => {
    const state = useLocalObservable(() => ({
      anchorEl: null as HTMLElement | null,

      get isPopoverOpen() {
        return !!state.anchorEl
      },

      openPopover(event: React.MouseEvent<HTMLElement>) {
        state.anchorEl = event.currentTarget
      },

      closePopover() {
        state.anchorEl = null
      },
    }))

    return (
      <>
        <Stack
          data-testid={testId}
          // An image with a name: the icon, and the text next to it when
          // the bar is not compact
          role="img"
          aria-label={accessibleName}
          aria-owns={state.isPopoverOpen ? id : undefined}
          aria-haspopup="true"
          onMouseEnter={state.openPopover}
          onMouseLeave={state.closePopover}
          direction="row"
          spacing={1}
          sx={{
            cursor: "pointer",
          }}
        >
          <SvgIcon
            component={icon}
            sx={{
              color,
            }}
          />
          {label && (
            <div
              style={{
                color,
              }}
            >
              {label}
            </div>
          )}
        </Stack>
        <Popover
          id={id}
          sx={{
            pointerEvents: "none",
          }}
          open={state.isPopoverOpen}
          anchorEl={state.anchorEl}
          anchorOrigin={
            anchorOrigin ?? {
              vertical: "bottom",
              horizontal: "left",
            }
          }
          transformOrigin={
            transformOrigin ?? {
              vertical: "top",
              horizontal: "left",
            }
          }
          onClose={state.closePopover}
          disableRestoreFocus
        >
          <Stack
            gap="1rem"
            padding={2}
            maxWidth="450px"
            sx={{
              wordWrap: "break-word",
            }}
          >
            <div>
              {title && (
                <Typography component="span" fontSize="14px">
                  {`${title}: `}
                </Typography>
              )}
              <Typography
                component="span"
                color={color}
                fontWeight="bold"
                fontSize="14px"
              >
                {name}
              </Typography>
            </div>

            <Typography fontSize="14px">{explanation}</Typography>

            {literalValue && (
              <Typography fontSize="12px">{literalValue}</Typography>
            )}
          </Stack>
        </Popover>
      </>
    )
  },
)

export default IndicatorWithExplanation
