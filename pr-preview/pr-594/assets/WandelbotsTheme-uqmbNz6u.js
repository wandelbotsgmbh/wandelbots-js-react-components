import{j as o,M as m,e as n,C as p}from"./iframe-BMcQktZ7.js";import{useMDXComponents as r}from"./index-n41gtyfp.js";import{muiComponents as s}from"./defaultTheme.stories-Bdk9rkMM.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-CQd4s9WX.js";import"./context-DGUnB9hR.js";import"./ExpandMore-CixEb9D6.js";import"./createSvgIcon-dFiwPo3H.js";import"./SvgIcon-BuXAn5KV.js";import"./Typography-SB9KT5aK.js";import"./Box-D75yl4w_.js";import"./useSlot-CpDF6RBR.js";import"./mergeSlotProps-Db6HpuFL.js";import"./useControlled-B3vcnMzr.js";import"./useTheme-CVHHyit9.js";import"./utils-C7WBIsRU.js";import"./useTimeout-CoqDFAAI.js";import"./Paper-t26AaJqV.js";import"./ButtonBase-BKDHvGCl.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BnK5eTfR.js";import"./styled-CQMNb9Wh.js";import"./listItemTextClasses-Dj8AON83.js";import"./useThemeProps-CIuOYlJZ.js";import"./getThemeProps-CA3k7Ef7.js";import"./Alert-CX4m12cb.js";import"./Tab-dttpQ477.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CfI_iy_s.js";import"./IconButton-CSsSGLnv.js";import"./CircularProgress-Bhl9BAk3.js";import"./getValidReactChildren-BWituB71.js";import"./TablePagination-B_7t0BWB.js";import"./Popover-DPAuDENX.js";import"./Portal-3Ji79hD4.js";import"./Fade-CFzm-TAc.js";import"./Select-D6sqF8Zd.js";import"./MenuItem-Cks6x4mZ.js";import"./dividerClasses-BmNZzEOQ.js";import"./Toolbar-YA5Zq76j.js";import"./Tooltip-_H9B9bZS.js";import"./Badge-Z6Ffm_UY.js";import"./Button-DL9teXyp.js";import"./Stack-H_tb6mOT.js";import"./Card-DQx9hU51.js";import"./CardContent-e-s6qToy.js";import"./Chip-D-Q9jLK1.js";import"./ListItem-DX9Ltp7q.js";import"./Slider-3WFxASz6.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
