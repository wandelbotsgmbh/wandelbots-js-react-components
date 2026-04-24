import{j as o,M as m,e as n,C as p}from"./iframe-DF6c2dkY.js";import{useMDXComponents as r}from"./index-DdGBgiQq.js";import{muiComponents as s}from"./defaultTheme.stories-pGlbXXvg.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-B56U4FqE.js";import"./context-Cvg5SO6c.js";import"./ExpandMore-vT_E7NOq.js";import"./createSvgIcon-C_gd4y8_.js";import"./SvgIcon-DADENsJK.js";import"./Typography-Bgg-Huzl.js";import"./Box-B-UgyHUp.js";import"./useSlot-BVw2G__l.js";import"./mergeSlotProps-CdjMYrAd.js";import"./useControlled-um3Rc1wn.js";import"./useTheme-ypqlOKkP.js";import"./utils-BncWIjs1.js";import"./useTimeout-6B51JAm4.js";import"./Paper-AXuX-76d.js";import"./ButtonBase-CbXdqDA1.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-D5rNSmCU.js";import"./styled-C9DKh_lZ.js";import"./listItemTextClasses-dXnqZ-av.js";import"./useThemeProps-D8mWAyUm.js";import"./getThemeProps-BvXfbr_G.js";import"./Alert-BKbbBdBF.js";import"./Tab-CU5OX7pG.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-GRJWPVRB.js";import"./IconButton-27pDd_-2.js";import"./CircularProgress-CKMUUu8_.js";import"./getValidReactChildren-Bsc0Xmyd.js";import"./TablePagination-g9IL_DLZ.js";import"./Popover-Caqw3INv.js";import"./Portal-Dt1uXJ9G.js";import"./Fade-kmtJmqRa.js";import"./Select-lRGTUlbr.js";import"./MenuItem-BRezWIXX.js";import"./dividerClasses-CewJnzUd.js";import"./Toolbar-BIF6oPc0.js";import"./Tooltip-DK-PYxxP.js";import"./Badge-BkIp4xcQ.js";import"./Button-hXFdvZGW.js";import"./Stack-YlC1Rb40.js";import"./Card-CK0yG2dK.js";import"./CardContent-Bs9HTH_U.js";import"./Chip-Dqj9btDx.js";import"./ListItem-BL0uvZ_w.js";import"./Slider-Ca2phYq-.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
