import{j as o,M as m,e as n,C as p}from"./iframe-DE2njiz1.js";import{useMDXComponents as r}from"./index-vAsu4v3Y.js";import{muiComponents as s}from"./defaultTheme.stories-C1RJASiZ.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-B4itn4pz.js";import"./context-CbuTCtHY.js";import"./ExpandMore-ColRdD_Z.js";import"./createSvgIcon-eU0KLI9t.js";import"./SvgIcon-DhP8axsb.js";import"./Typography-BlRZVuTA.js";import"./Box-BSk8KSRk.js";import"./useSlot-DH7ZdPy5.js";import"./mergeSlotProps-DJVqsN6W.js";import"./useControlled-DF1SuFK7.js";import"./useTheme-DOBygOzZ.js";import"./utils-BvVaRORx.js";import"./useTimeout-AH_mefcC.js";import"./Paper-BAJGX6uN.js";import"./ButtonBase-a-0Hynlg.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-x95coo2m.js";import"./styled-DMKZ1Toz.js";import"./listItemTextClasses-BlEfRVle.js";import"./useThemeProps-C0Dzrly5.js";import"./getThemeProps-C80AW5gi.js";import"./Alert-D7kfzI8N.js";import"./Tab-CEFqcMij.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-Cj-jJpdF.js";import"./IconButton-BCBaOQDG.js";import"./CircularProgress-BSgxhpaX.js";import"./getValidReactChildren-D5qNA3-s.js";import"./TablePagination-DNcWEXnX.js";import"./Popover-BtmUYu-t.js";import"./Portal-CmQbebU6.js";import"./Fade-BbLIe0vw.js";import"./Select-NUEwyx5c.js";import"./MenuItem-B2x1lszQ.js";import"./dividerClasses-BodF566W.js";import"./Toolbar-CeWdIzRs.js";import"./Tooltip-DbuDXEHG.js";import"./Badge-J2TXEoIe.js";import"./Button-DxzV5Mkd.js";import"./Stack-tNVO4PVc.js";import"./Card-BwNkzLfH.js";import"./CardContent-BmaV-hew.js";import"./Chip-C0R5M-Hn.js";import"./ListItem-BreKyZTl.js";import"./Slider-CFuCIJPi.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
