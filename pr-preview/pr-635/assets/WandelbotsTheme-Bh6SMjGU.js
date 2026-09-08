import{j as e,M as m,e as n,C as s}from"./iframe-Dg8QaNeO.js";import{useMDXComponents as i}from"./index-D5da4161.js";import{muiComponents as p}from"./defaultTheme.stories-C8FqTy3o.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-lg8v6IMz.js";import"./context-BhGYiao1.js";import"./ExpandMore-BHM6Q7h1.js";import"./createSvgIcon-CXtyqEEJ.js";import"./SvgIcon-CkcX3XiG.js";import"./Typography-BDayEOYH.js";import"./Box-2ILZ1ZcC.js";import"./useSlot-oz5jDBW1.js";import"./mergeSlotProps-BVbpKGW4.js";import"./useControlled-MpnwMukB.js";import"./useTheme-CvsiONSV.js";import"./utils-Dk7o1jss.js";import"./useTimeout-DK1MT_6g.js";import"./Paper-BlZnOFxL.js";import"./ButtonBase-CY6rDtJe.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DPpw6h3r.js";import"./listItemTextClasses-VJyiyMA6.js";import"./styled-B1muPhWg.js";import"./useThemeProps-BdjuaDM0.js";import"./getThemeProps-BR3TdkWI.js";import"./Alert-CtZ-R5Tr.js";import"./Tab-DpgwPT8y.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BJPSNPxe.js";import"./IconButton-CINZDiGZ.js";import"./CircularProgress-Ch2taCr_.js";import"./getValidReactChildren-DPFuxJgY.js";import"./TablePagination-CcYNqbXK.js";import"./Select-8vL0VnQG.js";import"./MenuItem-D1x40Cfv.js";import"./Popover-BPGweu0O.js";import"./Portal-Bybouti6.js";import"./Fade-B3UeZkVw.js";import"./dividerClasses-CepDCMsY.js";import"./Toolbar-CMfy9zvQ.js";import"./Tooltip-cOttQlw7.js";import"./Badge-Co-zLohf.js";import"./Button-ktTf_bCK.js";import"./Stack-DVZIgza7.js";import"./Card-Bu6fB6--.js";import"./CardContent-d0n1586s.js";import"./Chip-DfKBP_-w.js";import"./ListItem-ChZGI17G.js";import"./Slider-B304OaDz.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
`,`
`,`
`,e.jsx(m,{title:"Theming/Wandelbots MUI Theme"}),`
`,e.jsx(o.h1,{id:"wandelbots-mui-theme",children:"Wandelbots MUI Theme"}),`
`,e.jsxs(o.p,{children:[`The component library comes with a Wandelbots theme for Material UI which is the default theme used in this storybook.
If you like, you can use it in your own app to give the components a similar look.
The theme is accessed by calling `,e.jsx(o.code,{children:"createNovaTheme"}),", and can be ",e.jsx(o.a,{href:"?path=/docs/theming-theming-components--docs",children:"customized"})," as needed."]}),`
`,e.jsxs(o.p,{children:["The theme currently supports ",e.jsx(o.strong,{children:"dark mode only"}),". Passing ",e.jsx(o.code,{children:'palette: { mode: "light" }'})," is silently ignored (with a console warning) — light tokens are not yet available from Figma."]}),`
`,e.jsxs(o.blockquote,{children:[`
`,e.jsxs(o.p,{children:[e.jsx(o.strong,{children:"Migration note:"})," ",e.jsx(o.code,{children:"createNovaMuiTheme"})," is deprecated. Rename to ",e.jsx(o.code,{children:"createNovaTheme"}),` — it accepts
the same options (now variadic: pass multiple `,e.jsx(o.code,{children:"ThemeOptions"}),` objects to deep-merge in order).
The old name will be removed in the next major release.`]}),`
`]}),`
`,e.jsx(n,{dark:!0,code:`
import { ThemeProvider } from "@mui/material"
import { createNovaTheme } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaTheme()

<ThemeProvider theme={theme}>
...
</ThemeProvider>
`}),`
`,e.jsx(s,{of:p,sourceState:"none"})]})}function ne(t={}){const{wrapper:o}={...i(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(r,{...t})}):r(t)}export{ne as default};
