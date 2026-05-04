import{j as o,M as m,e as n,C as p}from"./iframe-CpUKlncv.js";import{useMDXComponents as r}from"./index-CWkA06wa.js";import{muiComponents as s}from"./defaultTheme.stories-Bkdceax1.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Bwpi0YXV.js";import"./context-DpBUgnSd.js";import"./ExpandMore-PBMwspVS.js";import"./createSvgIcon-Ci6L_j4k.js";import"./SvgIcon-CAcr4Ch0.js";import"./Typography-DupreqQF.js";import"./Box-C4kGhlzZ.js";import"./useSlot-BQrLGsuy.js";import"./mergeSlotProps-Blt9sFy3.js";import"./useControlled-GnzUNTcZ.js";import"./useTheme-D8cDHp8q.js";import"./utils-DuECi3Zb.js";import"./useTimeout-DYojldLV.js";import"./Paper-D26N1_LG.js";import"./ButtonBase-CeKP6lH-.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-C1lCmoLa.js";import"./styled-Dvms5KRu.js";import"./listItemTextClasses-DLjdz3Dn.js";import"./useThemeProps-D94sfPpT.js";import"./getThemeProps-rODPrKUx.js";import"./Alert-Dah04zma.js";import"./Tab-4JWcE3Lg.js";import"./getActiveElement-DxURyTVq.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DOk7hy72.js";import"./IconButton-43bHWoQk.js";import"./CircularProgress-noRxEc5w.js";import"./getValidReactChildren-C-2NJYVj.js";import"./TablePagination-DwQ98X0l.js";import"./Popover-CHpvEMV1.js";import"./Portal-CT0o4a4g.js";import"./Fade-DThocLAa.js";import"./Select-CH4ri50D.js";import"./MenuItem-pS0K8BwJ.js";import"./dividerClasses-CTlFQKjB.js";import"./Toolbar-lVaJCYIZ.js";import"./Tooltip-DBKvzL-y.js";import"./Badge-BVCBRHDq.js";import"./Button-Dlegblqu.js";import"./Stack-R1iheqkd.js";import"./Card-DxEyekxY.js";import"./CardContent-CVkUBouV.js";import"./Chip-B0YxHTpe.js";import"./ListItem-sREWjEO2.js";import"./Slider-CgqOu8zd.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
`,`
`,`
`,o.jsx(m,{title:"Theming/Wandelbots MUI Theme"}),`
`,o.jsx(t.h1,{id:"wandelbots-mui-theme",children:"Wandelbots MUI Theme"}),`
`,o.jsxs(t.p,{children:[`The component library comes with a Wandelbots theme for Material UI which is the default theme used in this storybook.
If you like, you can use it in your own app to give the components a similar look.
The theme is accessed by calling `,o.jsx(t.code,{children:"createNovaMuiTheme"}),", and can be ",o.jsx(t.a,{href:"?path=/docs/theming-theming-components--docs",children:"customized"})," as needed."]}),`
`,o.jsxs(t.p,{children:["The theme comes in dark and light variants using the standard MUI ",o.jsxs(t.a,{href:"https://mui.com/material-ui/customization/dark-mode/",rel:"nofollow",children:[o.jsx(t.code,{children:"palette.mode"})," option"]}),"."]}),`
`,o.jsx(n,{dark:!0,code:`
import { ThemeProvider } from "@mui/material"
import { createNovaMuiTheme } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaMuiTheme()

<ThemeProvider theme={theme}>
...
</ThemeProvider>
`}),`
`,o.jsx(p,{of:s,sourceState:"none"})]})}function mo(e={}){const{wrapper:t}={...r(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(i,{...e})}):i(e)}export{mo as default};
