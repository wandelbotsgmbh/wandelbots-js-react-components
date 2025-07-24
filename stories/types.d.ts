// Type overrides for stories to handle MUI v7 Grid compatibility

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Allow any props on grid items for story compatibility
    }
  }
}

// Add Grid item prop to global GridProps for v7 compatibility
declare module "@mui/material/Grid" {
  interface GridPropsVariantOverrides {
    item: true
  }

  interface GridProps {
    item?: boolean
    container?: boolean
    xs?: boolean | number
    sm?: boolean | number
    md?: boolean | number
    lg?: boolean | number
    xl?: boolean | number
    spacing?: number
    component?: React.ElementType
  }
}

// Make Grid compatible with JSX
declare module "@mui/material/Grid" {
  const Grid: React.FC<any>
  export default Grid
}
