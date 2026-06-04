import{j as o,M as m,e as n,C as p}from"./iframe-oN6q3zgG.js";import{useMDXComponents as r}from"./index-ayKKM3BD.js";import{muiComponents as s}from"./defaultTheme.stories-CRceV7Jd.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-D-qg6SU6.js";import"./context-CMhpk8d7.js";import"./ExpandMore-RUkoKHK9.js";import"./createSvgIcon-DD-xdrzr.js";import"./SvgIcon-BvgSJNq6.js";import"./Typography-DydLEqyU.js";import"./Box-D9FEQXWC.js";import"./useSlot-9vJNPunL.js";import"./mergeSlotProps-Bqm69nWB.js";import"./useControlled-_GnWSzzA.js";import"./useTheme-C63l57-j.js";import"./utils-Cuz6EezF.js";import"./useTimeout-w6cgNl3H.js";import"./Paper-CPuzR7XL.js";import"./ButtonBase-BvCY-EIs.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-ZqKZ329i.js";import"./styled-9T41Md9y.js";import"./listItemTextClasses-_dPWYVMW.js";import"./useThemeProps-CRh_l191.js";import"./getThemeProps-CI7EbCW6.js";import"./Alert-BB6_g71M.js";import"./Tab-CtF0DLgM.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-ttg1cKmP.js";import"./IconButton-51VCroTw.js";import"./CircularProgress-Cn3IjZrO.js";import"./getValidReactChildren-EIUSuprp.js";import"./TablePagination-DHYiS4OA.js";import"./Popover-CfzrIiWm.js";import"./Portal-C1utOIxh.js";import"./Fade-BFrjesZE.js";import"./Select-B94zvDV5.js";import"./MenuItem-C4MIZkf7.js";import"./dividerClasses-D8wEvQN3.js";import"./Toolbar-ChssxWNS.js";import"./Tooltip-DBf8f2NN.js";import"./Badge-DfPtaXAK.js";import"./Button-Dcrc7Wyz.js";import"./Stack-CzoYev1Y.js";import"./Card-BiNzuSo5.js";import"./CardContent-BzeaGfKy.js";import"./Chip-LzwNqhG2.js";import"./ListItem-gfRSZNJo.js";import"./Slider-DnXbM3M4.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
