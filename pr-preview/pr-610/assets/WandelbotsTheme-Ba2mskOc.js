import{j as o,M as m,e as n,C as p}from"./iframe-DQctPXZS.js";import{useMDXComponents as r}from"./index-BP4QWN_y.js";import{muiComponents as s}from"./defaultTheme.stories-CP_UZnxo.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-B2ZbOJnX.js";import"./context-v8FDDpD-.js";import"./ExpandMore-DFf3d2fP.js";import"./createSvgIcon-DFzcTgCW.js";import"./SvgIcon-vssUOJYe.js";import"./Typography-BdQKjGf9.js";import"./Box-Dwod3OvE.js";import"./useSlot-CDDinKN0.js";import"./mergeSlotProps-BZKirTal.js";import"./useControlled-BWCMXJ-l.js";import"./useTheme-B-GT2ylB.js";import"./utils-CL7KL7_R.js";import"./useTimeout-DK6ihIX6.js";import"./Paper-DAEJqr4u.js";import"./ButtonBase-DWK5tMGY.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BLI0u6V8.js";import"./styled-Ci-DApia.js";import"./listItemTextClasses-CNI1EDn8.js";import"./useThemeProps-DbsftK8Q.js";import"./getThemeProps-CM4qDgYG.js";import"./Alert-BwFrSfWO.js";import"./Tab-bbQdJ16Y.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DpeO9RKp.js";import"./IconButton-DqtWBlsu.js";import"./CircularProgress-Cpv82dzt.js";import"./getValidReactChildren-dVOBwHaK.js";import"./TablePagination-C4yfC6u1.js";import"./Popover-Cb-Np1te.js";import"./Portal-DZnZnpmt.js";import"./Fade-Cqf2Tf1d.js";import"./Select-B4tlIcij.js";import"./MenuItem-B8SeA80S.js";import"./dividerClasses-DGTbMvgZ.js";import"./Toolbar-SRPQr4cu.js";import"./Tooltip-Ds_7z8jt.js";import"./Badge-CCL4BNlN.js";import"./Button-3LlB3Zp4.js";import"./Stack-BJtyeTDk.js";import"./Card-BFM_CPC8.js";import"./CardContent-JZKQwQZF.js";import"./Chip-nWlCx9Bc.js";import"./ListItem-DCsVGLS9.js";import"./Slider-DosFUhMB.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
