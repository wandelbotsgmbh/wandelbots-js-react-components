import type { TextFieldProps } from "@mui/material/TextField"
import { styled } from "@mui/material/styles"
import TextField from "@mui/material/TextField"

type AdornedTextFieldSize = "small" | "medium"

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "adornedSize",
})<{
  adornedSize?: AdornedTextFieldSize
}>(({ theme, adornedSize = "medium" }) => ({
  "&.MuiTextField-root": {
    ".MuiInputBase-root": {
      background: theme.palette.secondary.dark,
      borderRadius: "10px",
    },
    ".MuiInputBase-input": {
      "&::placeholder": {
        opacity: "1",
        color: theme.palette.text.disabled,
      },
    },
    // Input without label (default case)
    ".MuiInputBase-root .MuiInputBase-input": {
      padding: adornedSize === "small" ? "8px 16px" : "16px 14px",
    },
    // Input with label - using a more specific selector to override
    ".MuiFormLabel-root + .MuiInputBase-root .MuiInputBase-input": {
      padding: adornedSize === "small" ? "8px 16px" : "24px 14px 8px",
    },
    label: {
      transform: "translate(14px, 8px) scale(0.75)",
    },
    ":hover": {
      fieldset: {
        border: `1px solid ${theme.palette.action.hover}`,
      },
    },
    ".Mui-focused": {
      fieldset: {
        border: `1px solid ${theme.palette.primary.main}`,
        legend: {
          width: 0,
        },
      },
    },
    fieldset: {
      borderRadius: "10px",
      border: `1px solid transparent`,
      legend: {
        width: 0,
      },
    },
  },
}))

type AdornedTextFieldProps = TextFieldProps & {
  adornedSize?: AdornedTextFieldSize
}

export const AdornedTextField = ({
  adornedSize = "medium",
  ...props
}: AdornedTextFieldProps) => {
  return (
    <StyledTextField
      adornedSize={adornedSize}
      {...props}
      slotProps={{
        ...props.slotProps,
        inputLabel: {
          ...props.slotProps?.inputLabel,
          shrink: true,
        },
      }}
    />
  )
}
