import{j as e,M as m,e as n,C as s}from"./iframe-j0thzbNF.js";import{useMDXComponents as i}from"./index-kXhWkDSY.js";import{muiComponents as p}from"./defaultTheme.stories-DtuHR0Ta.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DmMBs8OT.js";import"./context-ORfzidM9.js";import"./ExpandMore-DNhzfac5.js";import"./createSvgIcon-DOM1Qtjr.js";import"./SvgIcon-comWsVMo.js";import"./Typography-DHGP9HtQ.js";import"./Box-BNcG8HRw.js";import"./useSlot-DGlEB1Xo.js";import"./mergeSlotProps-CRiaEWQk.js";import"./useControlled-CHl7J0g1.js";import"./useTheme-riZ3Nb-b.js";import"./utils-BXV9CZRY.js";import"./useTimeout-BP3yRsf9.js";import"./Paper-CNgzzeJy.js";import"./ButtonBase-DeUwRmEJ.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BPhGEf6c.js";import"./styled-DNInA09u.js";import"./listItemTextClasses-DE09cRdd.js";import"./useThemeProps-C4xyc_lx.js";import"./getThemeProps-BEtzBwuP.js";import"./Alert-BEDYEAyW.js";import"./Tab-DZ9tgUeL.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-Baoj46wx.js";import"./IconButton-B2UCKFCf.js";import"./CircularProgress-dXp6F8dr.js";import"./getValidReactChildren-BfqmOFx5.js";import"./TablePagination-DjZyd7hE.js";import"./Select-Dbkiyovq.js";import"./MenuItem-CVnEexjc.js";import"./Popover-DX0q5QQy.js";import"./Portal-CvZeoyqz.js";import"./Fade-BL86EmbG.js";import"./dividerClasses-BYzPB7zY.js";import"./Toolbar-CVvYqYrF.js";import"./Tooltip-DmFaTo4J.js";import"./Badge-fyXWCMS3.js";import"./Button-B3k8MV1P.js";import"./Stack-DNZUvnSD.js";import"./Card-Bry47G2m.js";import"./CardContent-Brg8ioMG.js";import"./Chip-DYktKckt.js";import"./ListItem-CWTKgIxg.js";import"./Slider-DybpwSIi.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
