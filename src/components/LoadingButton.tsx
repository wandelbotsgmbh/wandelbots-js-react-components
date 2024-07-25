import { LoadingButton as MUILoadingButton } from "@mui/lab"
import { forwardRef } from "react"

type LoadingButtonProps = React.ComponentProps<typeof MUILoadingButton>

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ sx, ...rest }, ref) => {
    return (
      <MUILoadingButton
        sx={{
          ...sx,
        }}
        ref={ref}
        {...rest}
      />
    )
  },
)
