import{j as e,M as m,e as n,C as s}from"./iframe-B5Ijub9I.js";import{useMDXComponents as i}from"./index-DObUQdxg.js";import{muiComponents as p}from"./defaultTheme.stories-CMZVmFuX.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Bgk64OIa.js";import"./context-BsjbqM7p.js";import"./ExpandMore-DfRwEZQ5.js";import"./createSvgIcon-DEWPX8IA.js";import"./SvgIcon-DaMiAJ7m.js";import"./Typography-BeduDhH7.js";import"./Box-C5dL6iIZ.js";import"./useSlot-EEzG71Pe.js";import"./mergeSlotProps-DPl4aS9q.js";import"./useControlled-DBJ7n3Pm.js";import"./useTheme-BR6tVe-0.js";import"./utils-BLmn4C0X.js";import"./useTimeout-_mXMqDhl.js";import"./Paper-AQKndPN6.js";import"./ButtonBase-HbXbjD-d.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BOOORhz0.js";import"./styled-B5PeTkeA.js";import"./listItemTextClasses-Cq9ziFWs.js";import"./useThemeProps-Dq1d04UV.js";import"./getThemeProps-DBFYspaH.js";import"./Alert-DtZkz1_Q.js";import"./Tab-_nfNVOyv.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-jqNPguSO.js";import"./IconButton-wyD4JqA7.js";import"./CircularProgress-CHVuvRsH.js";import"./getValidReactChildren-DwoPQ30I.js";import"./TablePagination-CDUGKCvI.js";import"./Select-CJ4A24ro.js";import"./MenuItem-BKTf9463.js";import"./Popover-UTpUo9bi.js";import"./Portal-CfaW_TrE.js";import"./Fade-Br3kJgQu.js";import"./dividerClasses-z4x-S7B4.js";import"./Toolbar-C3rb1azQ.js";import"./Tooltip-W46a0pnj.js";import"./Badge-6icQ6v87.js";import"./Button-DwodJOVF.js";import"./Stack-By6aRm3g.js";import"./Card-9QRjO0fb.js";import"./CardContent-CzoTQDuP.js";import"./Chip-CSCTLnNS.js";import"./ListItem-COd3OS5I.js";import"./Slider-C5N3QTVh.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
