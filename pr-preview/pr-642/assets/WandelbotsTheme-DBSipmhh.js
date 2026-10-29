import{j as e,M as m,e as n,C as s}from"./iframe-DQSx3FpI.js";import{useMDXComponents as i}from"./index-tGrfmCc8.js";import{muiComponents as p}from"./defaultTheme.stories-DOSFos8A.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-CW7p8V6I.js";import"./context-DizzZv2X.js";import"./ExpandMore-DN8SxDkJ.js";import"./createSvgIcon-DpxcV1wl.js";import"./SvgIcon-Coh3-2pB.js";import"./Typography-Ku1V1lcB.js";import"./Box-D5mZh4HN.js";import"./useSlot-DUBklCtE.js";import"./mergeSlotProps-9GD2WVoK.js";import"./useControlled-J8dlEwwH.js";import"./useTheme-BBMANvYx.js";import"./utils-n-5vLEiA.js";import"./useTimeout-BVxqqW_f.js";import"./Paper-DhkDwtKD.js";import"./ButtonBase-D06kRmmp.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-xuMsvUpX.js";import"./listItemTextClasses-CemFiV0k.js";import"./styled-C8c8ewel.js";import"./useThemeProps-DSlVNiCA.js";import"./getThemeProps-Jr__qZNO.js";import"./Alert-aEF6dX8L.js";import"./Tab-eSyWAD8Q.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DvusYCcv.js";import"./IconButton-CFSqMTzQ.js";import"./CircularProgress-pGSHK5z0.js";import"./getValidReactChildren-BB7qmbJz.js";import"./TablePagination-DYCLlgXE.js";import"./Select-DS04mur0.js";import"./MenuItem-NoKH6NjH.js";import"./Popover-nF8PhaFQ.js";import"./Portal-lyZlFCYD.js";import"./Fade-BZb8OeI_.js";import"./dividerClasses-DtTxKCNl.js";import"./Toolbar-gWutBxic.js";import"./Tooltip-sZIx4iD2.js";import"./Badge-gnwOCLmb.js";import"./Button-BAU3USEP.js";import"./Stack-BpFn-_6R.js";import"./Card-mIk9PUys.js";import"./CardContent-CDiUGg4g.js";import"./Chip-DG9u8Kap.js";import"./ListItem-r_W8Cu4O.js";import"./Slider-C0NqLS4G.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
