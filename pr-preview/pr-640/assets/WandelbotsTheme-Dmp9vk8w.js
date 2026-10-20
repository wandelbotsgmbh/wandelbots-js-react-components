import{j as e,M as m,e as n,C as s}from"./iframe-Dv2r0G3e.js";import{useMDXComponents as i}from"./index-CELfvErL.js";import{muiComponents as p}from"./defaultTheme.stories-DEF82MR_.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DBQGefFw.js";import"./context-CkE3Rfbh.js";import"./ExpandMore-C2nqR1yi.js";import"./createSvgIcon-BpJ8uP8L.js";import"./SvgIcon-CB-nOVX_.js";import"./Typography-Ds9vyzS4.js";import"./Box-BgUM0WAG.js";import"./useSlot-ammARZYG.js";import"./mergeSlotProps-D-vcIFUH.js";import"./useControlled-DX04tJ_E.js";import"./useTheme-CKN4NDlc.js";import"./utils-ClRydWZj.js";import"./useTimeout-CVL163BM.js";import"./Paper-HfafaySq.js";import"./ButtonBase-CDA8rKA0.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DXurlM8H.js";import"./listItemTextClasses-BDzQl4uW.js";import"./styled-9A3zxk-n.js";import"./useThemeProps-CmaU1Veu.js";import"./getThemeProps-CDDjZIKX.js";import"./Alert-ClPWko4X.js";import"./Tab-YZMwmekB.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DPtkVV5v.js";import"./IconButton-DnvKRAfC.js";import"./CircularProgress-CqV9fE9p.js";import"./getValidReactChildren-BbImeSDi.js";import"./TablePagination-BiUHY9BP.js";import"./Select-CGbz64Zw.js";import"./MenuItem-Dj8oNNVh.js";import"./Popover-BYdt8hb0.js";import"./Portal-83k3OflH.js";import"./Fade-Qd4Qpw4O.js";import"./dividerClasses-BvRvRkcP.js";import"./Toolbar--n8NiefQ.js";import"./Tooltip-C-fBq1Aa.js";import"./Badge-q2ZhP-SB.js";import"./Button-BcRysXfd.js";import"./Stack-DTNpShGK.js";import"./Card-D5zu6shg.js";import"./CardContent-C5DnhZQL.js";import"./Chip-Ayk2UzIx.js";import"./ListItem-_pZD1NIa.js";import"./Slider-BFujeFKv.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
