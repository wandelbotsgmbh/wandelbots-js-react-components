import{j as o,M as m,e as n,C as p}from"./iframe-cfdVx8Cc.js";import{useMDXComponents as r}from"./index-zMY1CA4i.js";import{muiComponents as s}from"./defaultTheme.stories-CmPN7lZd.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-O9XMYABf.js";import"./context-BVsrAZlT.js";import"./ExpandMore-9SIHY6zE.js";import"./createSvgIcon-C2wYP7B7.js";import"./SvgIcon-ujziTsxV.js";import"./Typography-6afosi2l.js";import"./Box-2iBkKvbV.js";import"./useSlot-DL1AA0MN.js";import"./mergeSlotProps-9TP3HNR3.js";import"./useControlled-Bb7Ltx_b.js";import"./useTheme-ChZm421A.js";import"./utils-BpNTcCS8.js";import"./useTimeout-BxZAkZQt.js";import"./Paper-BAHsxK1c.js";import"./ButtonBase-xbXnwGNz.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CLbi7lnc.js";import"./styled-D_e4LsFS.js";import"./listItemTextClasses-2OKd2yhF.js";import"./useThemeProps-C9w_Ca8v.js";import"./getThemeProps-CZO3bs5z.js";import"./Alert-Cjcbe6Pa.js";import"./Tab-Cr8C2rMo.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DrYlhehi.js";import"./IconButton-DpR_Az12.js";import"./CircularProgress-DQcCngpD.js";import"./getValidReactChildren-C4hcGp-c.js";import"./TablePagination-BpWdP_BK.js";import"./Popover-IVTowpQa.js";import"./Portal-6liuLpfF.js";import"./Fade-CoXXWFFx.js";import"./Select-Z-79C6p3.js";import"./MenuItem-Swgjmc3j.js";import"./dividerClasses-wX7qLEgB.js";import"./Toolbar-QkbDExGX.js";import"./Tooltip-rspD_amT.js";import"./Badge-Bs7RbxYD.js";import"./Button-BGMqq5mX.js";import"./Stack-suQcEKDY.js";import"./Card-B4mZu-ZK.js";import"./CardContent-BVJawwzG.js";import"./Chip-CQF6Zi27.js";import"./ListItem-mSTzKgHX.js";import"./Slider-BnFd1YwE.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
