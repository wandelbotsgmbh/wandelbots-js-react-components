import React from "react";
import "./button.css";
import "../../styles/colors.css";
import { ButtonProps as MuiButtonProps } from "@mui/material";
type ButtonColor = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
export interface ButtonProps extends MuiButtonProps {
    label: string;
    color?: ButtonColor;
    onClick?: () => void;
    sx?: React.CSSProperties;
}
export declare const Button: (props: ButtonProps) => React.JSX.Element;
export {};
