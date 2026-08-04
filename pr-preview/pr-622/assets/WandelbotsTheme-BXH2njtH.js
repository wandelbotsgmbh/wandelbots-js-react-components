import{j as e,M as m,e as n,C as s}from"./iframe-B5PFQy9-.js";import{useMDXComponents as i}from"./index-C6JfVJTX.js";import{muiComponents as p}from"./defaultTheme.stories-Offi2dyY.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-C8UCWtGC.js";import"./context-BxXh1kDg.js";import"./ExpandMore-CXyhOeFQ.js";import"./createSvgIcon-DAO-R13K.js";import"./SvgIcon-CZyxW_Fg.js";import"./Typography-CyKnxWK6.js";import"./Box--wBh1mrf.js";import"./useSlot-CQjmWY8S.js";import"./mergeSlotProps-CFZGZN8p.js";import"./useControlled-B8kShZZw.js";import"./useTheme-BPu14NQi.js";import"./utils-7dBYBRql.js";import"./useTimeout-Dn_iGzU0.js";import"./Paper-DzRu06Ou.js";import"./ButtonBase-ojmHqgLV.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DexI2cAr.js";import"./styled-Bc_rMeX1.js";import"./listItemTextClasses-CTZxknfm.js";import"./useThemeProps-raU1XFRw.js";import"./getThemeProps-3BKRl8To.js";import"./Alert-DFNRfWzG.js";import"./Tab-CJ6jbMQw.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-C8c992tN.js";import"./IconButton-DdiOvGHm.js";import"./CircularProgress-DZoB8bff.js";import"./getValidReactChildren-tBjTFqM_.js";import"./TablePagination-D28k3MYk.js";import"./Select-BnErlo87.js";import"./MenuItem-DC43MNke.js";import"./Popover-CyW7q0te.js";import"./Portal-ClCvCyAY.js";import"./Fade-B0qkhVig.js";import"./dividerClasses-D3nGeTJ4.js";import"./Toolbar-D3-1SLC3.js";import"./Tooltip-DHt4GO9G.js";import"./Badge-B2BMxEUh.js";import"./Button-D3RqUawu.js";import"./Stack-CnFyifxT.js";import"./Card-D4Iyn9-x.js";import"./CardContent-BO0gb1JP.js";import"./Chip-DDBkd7tt.js";import"./ListItem-Cdai9zm9.js";import"./Slider-DAyD6o-Q.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
