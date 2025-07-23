import {
  Popover,
  Stack,
  SvgIcon,
  Typography,
  type PopoverOrigin,
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
  label?: ReactNode
  explanation: ReactNode
  literalValue?: string
  anchorOrigin?: PopoverOrigin
  transformOrigin?: PopoverOrigin
}

export const IndicatorWithExplanation = observer(
  ({
    id,
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
          {label && (<div style={{
              color,
            }}>{label}</div>)}
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
