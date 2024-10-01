import { Fab, styled, type FabProps } from "@mui/material"
import { forwardRef, type Ref } from "react"

const StyledSelectableFab = styled(Fab, {
  shouldForwardProp: (prop) => prop !== "selected",
})<CodeFabProps>(({ theme }) => ({
  borderRadius: "20px",

  "&:hover": {
    background: theme.palette.backgroundPaperElevation?.[7],
  },

  variants: [
    {
      props: ({ selected }) => !selected,
      style: {
        background: theme.palette.backgroundPaperElevation?.[0],
        color: theme.palette.action.disabled,
        "> img": {
          opacity: 0.4,
        },
      },
    },
    {
      props: ({ selected }) => selected,
      style: {
        background: theme.palette.backgroundPaperElevation?.[11],
        border: `1px solid ${theme.palette.divider}`,
        color: theme.palette.primary.contrastText,
      },
    },
  ],
}))

type CodeFabProps = {
  selected?: boolean
} & Omit<FabProps, "variant" | "color">

export const SelectableFab = forwardRef(
  (props: CodeFabProps, ref: Ref<HTMLButtonElement>) => {
    return (
      <StyledSelectableFab
        ref={ref}
        selected={props.selected}
        {...props}
        color={"secondary"}
        variant="circular"
      />
    )
  },
)
