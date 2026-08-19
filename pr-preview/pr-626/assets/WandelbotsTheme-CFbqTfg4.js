import{j as e,M as m,e as n,C as s}from"./iframe-CnZ9Mng8.js";import{useMDXComponents as i}from"./index-1oJqwH9K.js";import{muiComponents as p}from"./defaultTheme.stories-DYejTXKX.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-_3tG58oM.js";import"./context-qGUtD0ut.js";import"./ExpandMore-xGI5dyrH.js";import"./createSvgIcon-_KPFtV3u.js";import"./SvgIcon-Bm-wnoir.js";import"./Typography-Cd-WNHwN.js";import"./Box-Bnmyl29q.js";import"./useSlot-D7StEfVB.js";import"./mergeSlotProps-CfsmG-gm.js";import"./useControlled-D3AhS6zk.js";import"./useTheme-CMQDsrfD.js";import"./utils-BrcR983F.js";import"./useTimeout-B6-6SsYi.js";import"./Paper-BPzQwQda.js";import"./ButtonBase-_Bt-dsyf.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-B5uQdppL.js";import"./styled-LQF_JMND.js";import"./listItemTextClasses-BJa8uoB5.js";import"./useThemeProps-CR1z2hYz.js";import"./getThemeProps-Cgwt0oxK.js";import"./Alert-dp2Lf24h.js";import"./Tab-DaVODwfF.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BQ1XW5do.js";import"./IconButton-C4rly0he.js";import"./CircularProgress-A3Yb6f33.js";import"./getValidReactChildren-tqIIn5Mb.js";import"./TablePagination-6aVmet_E.js";import"./Select-FAye96_6.js";import"./MenuItem-KrkwzG1R.js";import"./Popover-DX3KcAEq.js";import"./Portal-BevpjGuD.js";import"./Fade-DJe09_M-.js";import"./dividerClasses-D9AGWgEr.js";import"./Toolbar-CQbinqrD.js";import"./Tooltip-5UwwkFvu.js";import"./Badge-C2CwGaP_.js";import"./Button-Ct0c-m0P.js";import"./Stack-DYirZNf7.js";import"./Card-85JKIrdD.js";import"./CardContent-DqV288JY.js";import"./Chip-CU6z0iv8.js";import"./ListItem-CkE05r7y.js";import"./Slider-C_PP4G5B.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
