import{j as o,M as m,e as n,C as p}from"./iframe-IA2p1po4.js";import{useMDXComponents as r}from"./index-B7Lf9-Vi.js";import{muiComponents as s}from"./defaultTheme.stories-CWOg8Y6j.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-y8qPrsT7.js";import"./context-Dkb--uYD.js";import"./ExpandMore-BGVLpChe.js";import"./createSvgIcon-CteLl8Zq.js";import"./SvgIcon-BeekDVw_.js";import"./Typography-DpaiujBV.js";import"./Box-BHICY57P.js";import"./useSlot-BJ5T4JGz.js";import"./mergeSlotProps-CNSytUQf.js";import"./useControlled-zYhHPKXn.js";import"./useTheme-B-3kO3sD.js";import"./utils-W4k7MCsG.js";import"./useTimeout-SFR-6WH-.js";import"./Paper-DE9mW8En.js";import"./ButtonBase-B2AnT0QV.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CNsLBnSR.js";import"./styled-6SQBWaxe.js";import"./listItemTextClasses-BSW7JZeM.js";import"./useThemeProps-CJYT0f8W.js";import"./getThemeProps-BwdJp2an.js";import"./Alert-COYbbT_w.js";import"./Tab-q50P7Qsf.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CR-co5aw.js";import"./IconButton-2jP5UMqf.js";import"./CircularProgress-HTh_Ah9h.js";import"./getValidReactChildren-B2brgijl.js";import"./TablePagination-BFwMhx5W.js";import"./Popover-HNyXdA4K.js";import"./Portal-CUma3SnX.js";import"./Fade-BytJEt24.js";import"./Select-BwDK_Awf.js";import"./MenuItem-DiiN1wKB.js";import"./dividerClasses-C6TNXg_8.js";import"./Toolbar-BOu72SY9.js";import"./Tooltip-gq7V8d-0.js";import"./Badge-BM228wkF.js";import"./Button-nReczDSm.js";import"./Stack-DIPCcrMn.js";import"./Card-k-Gu_GiS.js";import"./CardContent-Dxm1AXyz.js";import"./Chip-CLDwGUpc.js";import"./ListItem-BGXEb9oB.js";import"./Slider-Cr-PMqK6.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
