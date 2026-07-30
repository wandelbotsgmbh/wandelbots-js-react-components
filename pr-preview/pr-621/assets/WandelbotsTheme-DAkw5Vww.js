import{j as e,M as m,e as n,C as s}from"./iframe-CFoP9jN5.js";import{useMDXComponents as i}from"./index-BDFp8MOR.js";import{muiComponents as p}from"./defaultTheme.stories-l3gIYBPY.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BtY_6Jm0.js";import"./context-CNFP59DB.js";import"./ExpandMore-CRfBK-_A.js";import"./createSvgIcon-BNUS_1B0.js";import"./SvgIcon-Ck1sFqon.js";import"./Typography-CqqRKYoO.js";import"./Box-iCJ4afvA.js";import"./useSlot-BTtZ_q25.js";import"./mergeSlotProps-CF_p-w0N.js";import"./useControlled-DGPptLn0.js";import"./useTheme-BOonRYZ1.js";import"./utils-BN9l69iS.js";import"./useTimeout-BSnwyZ2B.js";import"./Paper-BdVbPhUi.js";import"./ButtonBase-K4Rwa3h7.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CFK2c6rH.js";import"./styled-DKQ2PoAh.js";import"./listItemTextClasses-PH9M2X7m.js";import"./useThemeProps-BnfDRSfN.js";import"./getThemeProps-BU5MPTj2.js";import"./Alert-BvJkqXz8.js";import"./Tab-sTGGawq2.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-C6_G92FL.js";import"./IconButton-CL4iDnMS.js";import"./CircularProgress-BhlicnA7.js";import"./getValidReactChildren-BkzdQ88k.js";import"./TablePagination-BYj_HOrH.js";import"./Select-C-3WWtEo.js";import"./MenuItem-D5_CPTs6.js";import"./Popover-B3R6wwIj.js";import"./Portal-DXI6gLsu.js";import"./Fade-Di8QG6WX.js";import"./dividerClasses-B0QCCtsS.js";import"./Toolbar-CQT3S7er.js";import"./Tooltip-Dz7Rjqi-.js";import"./Badge-CnBVI8DN.js";import"./Button-Dy5I_Kvy.js";import"./Stack-BjaExvKF.js";import"./Card-pmlGpqNh.js";import"./CardContent-PWhhkqHy.js";import"./Chip-BQCdrKve.js";import"./ListItem-BsBQl6QN.js";import"./Slider-DG2KfczU.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
