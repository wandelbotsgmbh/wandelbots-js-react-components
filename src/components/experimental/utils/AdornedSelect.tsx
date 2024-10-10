import {
  FormControl,
  InputLabel,
  Select,
  styled,
  type SelectProps,
} from "@mui/material"

const AdornedFormControl = styled(FormControl)(({ theme }) => ({
  "&.MuiFormControl-root": {
    ".MuiSelect-select": {
      paddingTop: "20px",
      paddingLeft: "12px",
    },
    label: {
      pointerEvents: "none",
      fontSize: "16px",
    },
    ".MuiInputLabel-root": {
      "&.Mui-focused": {
        color: theme.palette.text.primary,
      },
    },
  },
}))

type AdornedSelectProps = {
  labelValue: string
  labelId: string
} & SelectProps

export default function AdornedSelect({
  labelValue,
  ...props
}: AdornedSelectProps) {
  return (
    <AdornedFormControl fullWidth variant="filled">
      <InputLabel id={props.labelId}>{labelValue}</InputLabel>
      <Select {...props} />
    </AdornedFormControl>
  )
}
