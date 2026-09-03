import{j as e,M as m,e as n,C as s}from"./iframe-Dm6jcncn.js";import{useMDXComponents as i}from"./index-D1qU77Il.js";import{muiComponents as p}from"./defaultTheme.stories-Cxx8BzHN.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-B9hn1_kS.js";import"./context-qK1fYBkc.js";import"./ExpandMore-DijNZUo2.js";import"./createSvgIcon-VwN9eH0O.js";import"./SvgIcon-DhMKheaS.js";import"./Typography-ySm70typ.js";import"./Box-kDg82Vig.js";import"./useSlot-D5zs2RfM.js";import"./mergeSlotProps-BshJEO3y.js";import"./useControlled-Dq48Cbjr.js";import"./useTheme-Bri5kmPW.js";import"./utils-hzNV6h3P.js";import"./useTimeout-BS4gSS4F.js";import"./Paper-yQc4B77S.js";import"./ButtonBase-2znkRrXt.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Dy1GG2zy.js";import"./listItemTextClasses-CH3HfcII.js";import"./styled-BMlA1CF6.js";import"./useThemeProps-DFZmpcoV.js";import"./getThemeProps-DLFonx5W.js";import"./Alert-CT0nXhmN.js";import"./Tab-BKM7UqMF.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-Dr3tMw5C.js";import"./IconButton-DsFTMB4Z.js";import"./CircularProgress-DLKmdOM1.js";import"./getValidReactChildren-BM7AX112.js";import"./TablePagination-DVB_-b5U.js";import"./Select-Dy1tibfT.js";import"./MenuItem-C2djCXiM.js";import"./Popover-BBNYS7SO.js";import"./Portal-B7_6nmB6.js";import"./Fade-BhkX6A2J.js";import"./dividerClasses-CBzuBNGP.js";import"./Toolbar-BzWIwAse.js";import"./Tooltip-C8r7pjv0.js";import"./Badge-DQRz6bwI.js";import"./Button-DFNapvNV.js";import"./Stack-DQ3H5ZFG.js";import"./Card-D_ZekdtM.js";import"./CardContent-DMaRGwdv.js";import"./Chip-CNO1nQCA.js";import"./ListItem-cO7OJH1i.js";import"./Slider-D0MK-wwN.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
