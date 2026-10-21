import{j as e,M as m,e as n,C as s}from"./iframe-C-1QXTc1.js";import{useMDXComponents as i}from"./index-CFCshvHz.js";import{muiComponents as p}from"./defaultTheme.stories-DpN2tyYK.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-N9XphJ3G.js";import"./context-BRmSTh3b.js";import"./ExpandMore-ZbR0vihL.js";import"./createSvgIcon-oFSVzeaF.js";import"./SvgIcon-xi-7rvsa.js";import"./Typography-BRa19HZ0.js";import"./Box-CLrpVc2B.js";import"./useSlot-CMJa1bry.js";import"./mergeSlotProps-QniukcKU.js";import"./useControlled-0kzWwm6G.js";import"./useTheme-CReI2mBA.js";import"./utils-BJNS-cp8.js";import"./useTimeout-B7lhD6gV.js";import"./Paper-CeLmSilj.js";import"./ButtonBase-BsafTb3q.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BGnj19po.js";import"./listItemTextClasses-ZDTuq83E.js";import"./styled-p2lVGt_y.js";import"./useThemeProps-DATolmrO.js";import"./getThemeProps-BsS-E9D6.js";import"./Alert-CkUE0QXZ.js";import"./Tab-DT21xZCz.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-C1E1jjGT.js";import"./IconButton-C8KUrlQC.js";import"./CircularProgress-CxPFYYan.js";import"./getValidReactChildren-Ki3SuHAU.js";import"./TablePagination-3bWTi2ep.js";import"./Select-CIurdDI9.js";import"./MenuItem-EVWbQO4T.js";import"./Popover-CzaXcAic.js";import"./Portal-rOg918s5.js";import"./Fade-DtqmhdYD.js";import"./dividerClasses--8bSTBiR.js";import"./Toolbar-C_0skTwu.js";import"./Tooltip-Br0HSyh4.js";import"./Badge-5H6RAXVf.js";import"./Button-DRKw4OEE.js";import"./Stack-CDNN68Us.js";import"./Card-aSF-yhm7.js";import"./CardContent-LKTk7Bo7.js";import"./Chip-C4xlid69.js";import"./ListItem-kwm8BaTh.js";import"./Slider-B8kTijO2.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
