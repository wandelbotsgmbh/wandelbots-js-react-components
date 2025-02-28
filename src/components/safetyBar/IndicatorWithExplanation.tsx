import {
  Popover,
  Stack,
  SvgIcon,
  Typography,
  type TypographyProps,
} from "@mui/material"
import { observer, useLocalObservable } from "mobx-react-lite"
import type { ElementType, ReactNode } from "react"

export type IndicatorWithExplanationProps = {
  id: string
  icon: ElementType
  color: TypographyProps["color"]
  title?: ReactNode
  name: ReactNode
  explanation: ReactNode
  literalValue?: string
}

export const IndicatorWithExplanation = observer(
  ({
    id,
    icon,
    color,
    title,
    name,
    explanation,
    literalValue,
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
          aria-owns={state.isPopoverOpen ? id : undefined}
          aria-haspopup="true"
          onMouseEnter={state.openPopover}
          onMouseLeave={state.closePopover}
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
        </Stack>
        <Popover
          id={id}
          sx={{
            pointerEvents: "none",
          }}
          open={state.isPopoverOpen}
          anchorEl={state.anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
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
