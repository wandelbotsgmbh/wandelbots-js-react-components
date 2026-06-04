import{j as o,M as m,e as n,C as p}from"./iframe-B9F5iZda.js";import{useMDXComponents as r}from"./index-BLnTGf82.js";import{muiComponents as s}from"./defaultTheme.stories-DQHDokxb.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-D54vYJpq.js";import"./context-HY_5LgCr.js";import"./ExpandMore-Cv_bgB1V.js";import"./createSvgIcon-DPz_DFR5.js";import"./SvgIcon-CpGJwWSR.js";import"./Typography-DqVhG7kq.js";import"./Box-DJoGMdib.js";import"./useSlot-nWFN0B3Q.js";import"./mergeSlotProps-B1fBSrR0.js";import"./useControlled-DffW1y8K.js";import"./useTheme-yxLqqDqL.js";import"./utils-Cvw1gOUC.js";import"./useTimeout-uivG_Tex.js";import"./Paper-BPSUiw3x.js";import"./ButtonBase-tzEInArf.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CrbUUztQ.js";import"./styled-D3Igtyhg.js";import"./listItemTextClasses-D3W_ZLnm.js";import"./useThemeProps-D8pmlMqC.js";import"./getThemeProps-BEbE1hzy.js";import"./Alert-BekP6s-G.js";import"./Tab-Bntd84va.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-Djl5Swys.js";import"./IconButton-Djj2i-TE.js";import"./CircularProgress-DgenPePO.js";import"./getValidReactChildren-2L1Citkn.js";import"./TablePagination-CsYQH3zz.js";import"./Popover-BgnnJ3Nz.js";import"./Portal-BpwCfqFs.js";import"./Fade-TGyLMQ_n.js";import"./Select-Dc1Su7qb.js";import"./MenuItem-BXq2lZco.js";import"./dividerClasses-B-rJzWXx.js";import"./Toolbar-pLqVnqPn.js";import"./Tooltip-DR-YAXQf.js";import"./Badge-BFd3gSRZ.js";import"./Button-C-xukK9K.js";import"./Stack-ruSYhJ3p.js";import"./Card-CjhXzmFl.js";import"./CardContent-DFJXD6e8.js";import"./Chip-BW-ZWjzL.js";import"./ListItem-B81JaB9g.js";import"./Slider-Dyk6fQO3.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
`,o.jsx(p,{of:s,sourceState:"none"})]})}function no(e={}){const{wrapper:t}={...r(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(i,{...e})}):i(e)}export{no as default};
