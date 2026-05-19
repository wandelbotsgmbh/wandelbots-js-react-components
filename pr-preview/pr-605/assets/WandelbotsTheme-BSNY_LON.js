import{j as o,M as m,e as n,C as p}from"./iframe-DmFjQ5Bx.js";import{useMDXComponents as r}from"./index-gkxOxS1q.js";import{muiComponents as s}from"./defaultTheme.stories-CKY9z-6F.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-D8_p-pUa.js";import"./context-Cxw0pEVe.js";import"./ExpandMore-B6minNCV.js";import"./createSvgIcon-Di9BeXBT.js";import"./SvgIcon-ieK5DRoI.js";import"./Typography-DGXi_W3G.js";import"./Box--Do-lTK_.js";import"./useSlot-BDAdJvAN.js";import"./mergeSlotProps-CRMdGftQ.js";import"./useControlled-Cu_Bc94N.js";import"./useTheme-CN3kyOmF.js";import"./utils-Cq10Dre7.js";import"./useTimeout-UBvimZzO.js";import"./Paper-DIah2kFb.js";import"./ButtonBase-CyTCj4P4.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-kz_G90NY.js";import"./styled-CwW2V0ZY.js";import"./listItemTextClasses-C-Qlb8nN.js";import"./useThemeProps-D02WdLDy.js";import"./getThemeProps-B6_soYah.js";import"./Alert-DJdhxi8i.js";import"./Tab-BGkmwyVk.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CD93msS5.js";import"./IconButton-BOZyo1m2.js";import"./CircularProgress-BtRN2GYX.js";import"./getValidReactChildren-Do32Dkl_.js";import"./TablePagination-W5vXxrVx.js";import"./Popover-IvobXe5I.js";import"./Portal-D2Z9-soz.js";import"./Fade-CMNbKxzB.js";import"./Select-BrLViYjt.js";import"./MenuItem-BDbKpOpq.js";import"./dividerClasses-5yzmI50h.js";import"./Toolbar-Dcq1alJR.js";import"./Tooltip-X6BbyZ6O.js";import"./Badge-CTXdj5qz.js";import"./Button-D1-420sk.js";import"./Stack-BoUZoXe-.js";import"./Card-DyW9iiyc.js";import"./CardContent-C2cypkho.js";import"./Chip-D0ip3Fmw.js";import"./ListItem-DFTu0i2n.js";import"./Slider-PMaN384p.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
