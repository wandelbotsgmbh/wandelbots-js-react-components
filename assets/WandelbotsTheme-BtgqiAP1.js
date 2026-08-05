import{j as e,M as m,e as n,C as s}from"./iframe-DkYea-kr.js";import{useMDXComponents as i}from"./index-DnWuTDtb.js";import{muiComponents as p}from"./defaultTheme.stories-fdPxxMy_.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-LLuIJpwT.js";import"./context-CDVTju11.js";import"./ExpandMore-wutk_unp.js";import"./createSvgIcon-DMhRrVIP.js";import"./SvgIcon-Dl3HvK6Z.js";import"./Typography-B2GngKrK.js";import"./Box-CB5O4XHm.js";import"./useSlot-9t8Mzrpu.js";import"./mergeSlotProps-IECz2ZAM.js";import"./useControlled-apa1KGAb.js";import"./useTheme-BOvrQoMF.js";import"./utils-BbtRSZY9.js";import"./useTimeout-DQKgCCW3.js";import"./Paper-D2dbpn3B.js";import"./ButtonBase-CkZH5FNo.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BCFy2Bow.js";import"./styled-C3xSSN5c.js";import"./listItemTextClasses-o4RwC4_W.js";import"./useThemeProps-CQDPG6S0.js";import"./getThemeProps-Cp1jNBft.js";import"./Alert-D-5_kpSP.js";import"./Tab-fe5WvfDv.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DZiWKT5y.js";import"./IconButton-qLxzQ-Qu.js";import"./CircularProgress-B2CfdrgV.js";import"./getValidReactChildren-soM2k5xg.js";import"./TablePagination-BWKA_rGU.js";import"./Select-DiPRdQEJ.js";import"./MenuItem-FGSWmKkL.js";import"./Popover-ByxN8Nad.js";import"./Portal-Ab88GEsm.js";import"./Fade-DpVsLLQZ.js";import"./dividerClasses-CStzHPzS.js";import"./Toolbar-Cxjs0M4o.js";import"./Tooltip-CIBbgbGm.js";import"./Badge-DC0lOiw2.js";import"./Button-CJItOmwG.js";import"./Stack-y5EyMkv8.js";import"./Card-CY97dIhl.js";import"./CardContent-DfCfqJrt.js";import"./Chip-BX0t_SfK.js";import"./ListItem-GwhmT5cK.js";import"./Slider-B3pWdZkC.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
