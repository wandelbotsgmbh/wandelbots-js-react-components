import{j as o,M as m,e as n,C as p}from"./iframe-Dw-aDc3x.js";import{useMDXComponents as r}from"./index-D_J1Vcnc.js";import{muiComponents as s}from"./defaultTheme.stories-DAEyGj1o.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-B7xqTWP8.js";import"./context-B11HR0Yh.js";import"./ExpandMore-7alwrgsz.js";import"./createSvgIcon-CPOZ2SXk.js";import"./SvgIcon-D0zqiTf-.js";import"./Typography-Cvf5naJQ.js";import"./Box-BhN-sHsU.js";import"./useSlot-DzfuiiH3.js";import"./mergeSlotProps-DmTZaDUp.js";import"./useControlled-BOyfU4p7.js";import"./useTheme-L0gwFtnq.js";import"./utils-Bkj_bO9g.js";import"./useTimeout-oAL5oMgw.js";import"./Paper-DKgVsGt7.js";import"./ButtonBase-C2s7F2E4.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Ckq9S80i.js";import"./styled-CsN-KrtD.js";import"./listItemTextClasses-B5SG5999.js";import"./useThemeProps-BuvoJeGe.js";import"./getThemeProps-BqH3cNwf.js";import"./Alert-B49PKiot.js";import"./Tab-BZDTAuuJ.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BTopYdGP.js";import"./IconButton-DZw8pBVz.js";import"./CircularProgress-B0WhehdO.js";import"./getValidReactChildren-DJxmbfR2.js";import"./TablePagination-BIavlmr2.js";import"./Popover-DJhJrIOk.js";import"./Portal-Cus7BKra.js";import"./Fade-BX8odah9.js";import"./Select-BKcjz4sM.js";import"./MenuItem-CyLIUZh6.js";import"./dividerClasses-DDRyKStY.js";import"./Toolbar-Cb2zq60N.js";import"./Tooltip-CJGAa6QP.js";import"./Badge-DrqFA70F.js";import"./Button-Brp1Iwkj.js";import"./Stack-C_mYGwGo.js";import"./Card--jarVgIn.js";import"./CardContent-BcU3IfKr.js";import"./Chip-BCInt8CL.js";import"./ListItem-x5Vqig8H.js";import"./Slider-sLA8Sh_Q.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
