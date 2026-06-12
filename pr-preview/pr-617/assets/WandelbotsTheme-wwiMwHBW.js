import{j as o,M as m,e as n,C as p}from"./iframe-DeM2dlXB.js";import{useMDXComponents as r}from"./index-pTg_E5nV.js";import{muiComponents as s}from"./defaultTheme.stories-COzuTDYy.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Bs7Wd-OB.js";import"./context-DalZFnB3.js";import"./ExpandMore-Dv7XvxWh.js";import"./createSvgIcon-C_rZBQmf.js";import"./SvgIcon-BkI4IVFL.js";import"./Typography-BGGlcvk4.js";import"./Box-Bc6eAzlK.js";import"./useSlot-BeLMw7Pj.js";import"./mergeSlotProps-BY-JCkyx.js";import"./useControlled-kwgz8Nro.js";import"./useTheme-DXEkWXhe.js";import"./utils-DGMtgLpI.js";import"./useTimeout-5ZCUeKvY.js";import"./Paper-DVa6y2Qz.js";import"./ButtonBase-B_7b6jYD.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-B0cPEGT5.js";import"./styled-B6xwWCeI.js";import"./listItemTextClasses-Wv11sEd0.js";import"./useThemeProps-2cL-71wr.js";import"./getThemeProps-Cows3naL.js";import"./Alert-BtsBhsWX.js";import"./Tab-BiZt2rr8.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CQxGFzh4.js";import"./IconButton-BVGEiR_R.js";import"./CircularProgress-C3MqscAl.js";import"./getValidReactChildren-BNRuXSA9.js";import"./TablePagination-Doo_9SYz.js";import"./Popover-D8vUVmH9.js";import"./Portal-DF5J-mwq.js";import"./Fade-B82O4YTs.js";import"./Select-CIHomdi9.js";import"./MenuItem-BARmsFpx.js";import"./dividerClasses-DbQZy1R3.js";import"./Toolbar-Dx4MypDs.js";import"./Tooltip-D0KE--wv.js";import"./Badge-nQ8Cvt5U.js";import"./Button-C4BSGe6k.js";import"./Stack-ClwOHmiG.js";import"./Card-Dok57KL-.js";import"./CardContent-DwUZqp7S.js";import"./Chip-3WsT-lqe.js";import"./ListItem-C7TJ0HgN.js";import"./Slider-2vv9mqRj.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
