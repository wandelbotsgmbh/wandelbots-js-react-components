import{j as e,M as m,e as n,C as s}from"./iframe-CMJe3vUn.js";import{useMDXComponents as i}from"./index-DZkgdffJ.js";import{muiComponents as p}from"./defaultTheme.stories-FaPBVIvx.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-B-Ed7NDu.js";import"./context-CvonSSXN.js";import"./ExpandMore-0INqMFhX.js";import"./createSvgIcon-Cv1Xk519.js";import"./SvgIcon-DWmxO4Xz.js";import"./Typography-BI6PP6Cc.js";import"./Box-B1bTA7Df.js";import"./useSlot-BUn2VBDJ.js";import"./mergeSlotProps-DeWz8kPK.js";import"./useControlled-BCy5l5cn.js";import"./useTheme-CmqkvzSF.js";import"./utils-BOqE5FGX.js";import"./useTimeout-DzrPpziT.js";import"./Paper-zAv6N390.js";import"./ButtonBase-DUIfW5eq.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-oHnQaX_0.js";import"./listItemTextClasses-cTcmMXNj.js";import"./styled-Cu5McQR3.js";import"./useThemeProps-DUHT0jOh.js";import"./getThemeProps-DF4KkJ2r.js";import"./Alert-BBYnWcfl.js";import"./Tab-DReKulEK.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BGMZujcS.js";import"./IconButton-CHSa_IHV.js";import"./CircularProgress-CT44Abba.js";import"./getValidReactChildren-Bmi90xg2.js";import"./TablePagination-Bvg0v64g.js";import"./Select-B-D0nWSg.js";import"./MenuItem-CwkFVrA6.js";import"./Popover-fdcSkfdM.js";import"./Portal-ChZRDM_q.js";import"./Fade-BF8wxTr4.js";import"./dividerClasses-DASsu3ph.js";import"./Toolbar-BusEE6Mu.js";import"./Tooltip-B5JKQ6Yf.js";import"./Badge-pCHAX90A.js";import"./Button-ew2cMJ9w.js";import"./Stack-WvCO-lcu.js";import"./Card-Bgz_v09c.js";import"./CardContent-BNLGyIDv.js";import"./Chip-f8kx_mu3.js";import"./ListItem-Bt11mFT9.js";import"./Slider-Byw9Pqt7.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
