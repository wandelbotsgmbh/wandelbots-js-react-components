import React from "react";
import "./button.css";
import "../../styles/colors.css";
import {
  Button as MaterialButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

type ButtonColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

export interface ButtonProps extends MuiButtonProps {
  label: string;
  color?: ButtonColor;
  onClick?: () => void;
  sx?: React.CSSProperties;
}

export const Button = (props: ButtonProps) => {
  const { label, color, onClick, sx, ...rest } = props;
  return (
    <MaterialButton
      className="wui-button"
      variant="contained"
      color={color ?? "primary"}
      size="large"
      onClick={onClick}
      sx={{
        // backgroundColor: "var(--palette--polar--green--500)",
        color: "white",
        borderRadius: 20,
        textTransform: "none",
        ...sx,
      }}
      {...rest}
    >
      {label}
    </MaterialButton>
  );
}
