import{j as e,M as m,e as n,C as s}from"./iframe-DYyNtN06.js";import{useMDXComponents as i}from"./index-DOy4v5ZT.js";import{muiComponents as p}from"./defaultTheme.stories-CRk8iB87.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Dpc_CLIh.js";import"./context-DZFEO8-v.js";import"./ExpandMore-BPCLQHrg.js";import"./createSvgIcon-Ci9MBYBu.js";import"./SvgIcon-B5iUi_dv.js";import"./Typography-CMcz4DFJ.js";import"./Box-x1NN5IwL.js";import"./useSlot-DIBM1CTl.js";import"./mergeSlotProps-CbgCMPNG.js";import"./useControlled-DoH44Ezb.js";import"./useTheme-D6VgL8HS.js";import"./utils-BzVUSSgS.js";import"./useTimeout-C61zSYzb.js";import"./Paper-CNEqEsvG.js";import"./ButtonBase-Ctd8q0yy.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-C7m-rqv1.js";import"./styled-BiXrH4p5.js";import"./listItemTextClasses-Cjw61rjP.js";import"./useThemeProps-anOV7Es0.js";import"./getThemeProps-ESRjCcgF.js";import"./Alert-DuPx0zwz.js";import"./Tab-DeyIqOHP.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-e4iicfoB.js";import"./IconButton-CNYpAeVC.js";import"./CircularProgress-B7l9M-5O.js";import"./getValidReactChildren-BCv1lHhn.js";import"./TablePagination-N4bg_vxG.js";import"./Select-DafOBTYl.js";import"./MenuItem-Nvjge9s1.js";import"./Popover-C4qql3I-.js";import"./Portal-DFZiaYYd.js";import"./Fade-JQaZ39Q6.js";import"./dividerClasses-h4uMIfRF.js";import"./Toolbar-DKCRujDc.js";import"./Tooltip-Bz_7dwOV.js";import"./Badge-Bhy9TEO-.js";import"./Button-1wIGWp2J.js";import"./Stack-C6xDQ_wI.js";import"./Card-DnIb3BM1.js";import"./CardContent-BZrW_PmQ.js";import"./Chip-BILfW_lW.js";import"./ListItem-Bw0C2yPT.js";import"./Slider-pa7340h0.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
