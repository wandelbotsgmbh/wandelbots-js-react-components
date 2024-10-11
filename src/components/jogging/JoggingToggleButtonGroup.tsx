import { styled, ToggleButtonGroup } from "@mui/material"

export const JoggingToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme }) => ({
    "&.MuiToggleButtonGroup-root": {
      background: theme.palette.backgroundPaperElevation?.[8],
      borderRadius: "8px",
      padding: "4px",
      gap: "4px",
      button: {
        border: "none",
        borderRadius: "4px",
        flex: "1 1 0px",
        minWidth: 0,
        "&.MuiToggleButtonGroup-firstButton": {
          borderRadius: "8px 4px 4px 8px",
        },

        "&.MuiToggleButtonGroup-lastButton": {
          borderRadius: "4px 8px 8px 4px",
        },
      },
    },
  }),
)
