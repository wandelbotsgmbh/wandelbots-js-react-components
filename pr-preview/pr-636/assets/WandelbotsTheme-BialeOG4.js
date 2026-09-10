import{j as e,M as m,e as n,C as s}from"./iframe-Ba2IKQt4.js";import{useMDXComponents as i}from"./index-CI4M6hsn.js";import{muiComponents as p}from"./defaultTheme.stories-Eh917YM3.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-D5IOm6I6.js";import"./context-BefEgr-r.js";import"./ExpandMore-UuqnYqOM.js";import"./createSvgIcon-C32sSfhx.js";import"./SvgIcon-BzPmyYxb.js";import"./Typography-CuK8FJXG.js";import"./Box-C-RoxQTp.js";import"./useSlot-DTXU092J.js";import"./mergeSlotProps-CM_rgZsI.js";import"./useControlled-xzdmvjdv.js";import"./useTheme-Bd3j7BQU.js";import"./utils-BagDn_k3.js";import"./useTimeout-Dj9r2-70.js";import"./Paper-DCb0OlrC.js";import"./ButtonBase-P2V8yCSY.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-zpEZkNbJ.js";import"./listItemTextClasses-6Q18s3DA.js";import"./styled-0xP5rHfk.js";import"./useThemeProps-_MAURq4F.js";import"./getThemeProps-TwCxgvSa.js";import"./Alert-JgDo4PCL.js";import"./Tab-CXNXp91p.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DC7R9NCP.js";import"./IconButton-HdspM6zu.js";import"./CircularProgress-BwVJelX5.js";import"./getValidReactChildren-o_7xvp53.js";import"./TablePagination-DQ5IqvHk.js";import"./Select-D5R3rZZl.js";import"./MenuItem-BGD07v7T.js";import"./Popover-BPDxwfBY.js";import"./Portal-AlUYG3Xq.js";import"./Fade-PZfov9YT.js";import"./dividerClasses-Bt26paer.js";import"./Toolbar-CLGhXmUv.js";import"./Tooltip-Lf2PGhH-.js";import"./Badge-CACFT4Im.js";import"./Button-BR7kCRcP.js";import"./Stack-DnW68pGL.js";import"./Card-DJbsKYoy.js";import"./CardContent-D6i9GzRK.js";import"./Chip-DyZNpHHP.js";import"./ListItem-CDtWbS5r.js";import"./Slider-DQTslOaj.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
