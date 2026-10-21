import{j as e,M as m,e as n,C as s}from"./iframe-6oA2lFHu.js";import{useMDXComponents as i}from"./index-CAz9CoZd.js";import{muiComponents as p}from"./defaultTheme.stories-I7IhFrnV.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Bdu2hrYy.js";import"./context-BWZhWyts.js";import"./ExpandMore-B5drluao.js";import"./createSvgIcon-Usrg-WB6.js";import"./SvgIcon-DvZdtkzv.js";import"./Typography-BnveLTa3.js";import"./Box-DEkb0HT5.js";import"./useSlot-C22hsMXN.js";import"./mergeSlotProps-BZvwqfIZ.js";import"./useControlled-CcNxqU4p.js";import"./useTheme-DX8YEvoe.js";import"./utils-DCUnKPzL.js";import"./useTimeout-C6DvDclQ.js";import"./Paper-Bue-LRLf.js";import"./ButtonBase-eNTHA6Xp.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Dr60j1MC.js";import"./listItemTextClasses-BGym45JZ.js";import"./styled-h2Uh2WnL.js";import"./useThemeProps-BFN1al8P.js";import"./getThemeProps-CBZbJXCp.js";import"./Alert-CMop-_U9.js";import"./Tab-BCWUaEsh.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CbsjE05e.js";import"./IconButton-fr1_TtTM.js";import"./CircularProgress-CC3qmAxm.js";import"./getValidReactChildren-u6DLZoKd.js";import"./TablePagination-BqoiwpJL.js";import"./Select-DpkEYS1l.js";import"./MenuItem-CqhMeLOD.js";import"./Popover-BMhvYLyA.js";import"./Portal-BCN8GEVb.js";import"./Fade-g2pBjZiB.js";import"./dividerClasses-CxPYFVUO.js";import"./Toolbar-DrHFeFAh.js";import"./Tooltip-Bdaj7T90.js";import"./Badge-DCJwCJ5M.js";import"./Button-DEaUTV-M.js";import"./Stack-aDX_r0WY.js";import"./Card-BbVzMqfs.js";import"./CardContent-Fb2vGCY_.js";import"./Chip-BxqrQZWR.js";import"./ListItem-M5wgRbMu.js";import"./Slider-D5YUBVE0.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
