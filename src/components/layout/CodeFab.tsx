import { Fab, styled, type FabProps } from "@mui/material"

const SelecteableFab = styled(Fab, {
  shouldForwardProp: (prop) => prop !== "selected",
})<CodeFabProps>(({ theme }) => ({
  borderRadius: "20px",
  variants: [
    {
      props: ({ selected }) => !selected,
      style: {
        backgroundColor: theme.palette.backgroundPaperElevation?.[0],
        color: theme.palette.action.disabled,
      },
    },
    {
      props: ({ selected }) => selected,
      style: {
        backgroundColor: theme.palette.backgroundPaperElevation?.[11],
        border: `1px solid ${theme.palette.divider}`,
        color: theme.palette.primary.contrastText,
      },
    },
  ],
}))

type CodeFabProps = {
  selected?: boolean
} & Omit<FabProps, "variant" | "color">

export function CodeFab({ selected, ...props }: CodeFabProps) {
  return (
    <SelecteableFab
      selected={selected}
      {...props}
      color={"secondary"}
      variant="circular"
    />
  )
}
