import{j as o,M as m,e as n,C as p}from"./iframe-LALOZN-F.js";import{useMDXComponents as r}from"./index-DWvdt-UQ.js";import{muiComponents as s}from"./defaultTheme.stories-_KPnQA4_.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BV-4vh52.js";import"./context-DlYdp_bM.js";import"./ExpandMore-DTmXppH1.js";import"./createSvgIcon-Dc0zdbun.js";import"./SvgIcon-CVRt6gBr.js";import"./Typography-BiioHOtl.js";import"./Box-DWv2XJjX.js";import"./useSlot-DloJ_rNX.js";import"./mergeSlotProps-CeMMO6qp.js";import"./useControlled-CYJnRy0B.js";import"./useTheme-BFfoDheP.js";import"./utils-CSocEYyf.js";import"./useTimeout-DizItLVc.js";import"./Paper-DF38Nh1S.js";import"./ButtonBase-CmUDboTJ.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BHWy_5MS.js";import"./styled-3sXY9-6B.js";import"./listItemTextClasses-Dh-hMnUV.js";import"./useThemeProps-CEGX7FhJ.js";import"./getThemeProps-A7XPW7Hz.js";import"./Alert-BRp2UQyn.js";import"./Tab-D5x8iDOC.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-B1esMxNN.js";import"./IconButton-DUSj2IBL.js";import"./CircularProgress-B8D7nPKJ.js";import"./getValidReactChildren-CxadR_6q.js";import"./TablePagination-BJZ2iCfF.js";import"./Popover-CohJYgKa.js";import"./Portal-D_F_Ft-f.js";import"./Fade-C8akLH92.js";import"./Select-Ccf1tX8T.js";import"./MenuItem-CZBxsSgZ.js";import"./dividerClasses-DHTHURVx.js";import"./Toolbar-BJ76p8aC.js";import"./Tooltip-C9Lf_zfT.js";import"./Badge-BTUJJngR.js";import"./Button-CeXyAHoX.js";import"./Stack-BfsrEyT5.js";import"./Card-BxhwVSt-.js";import"./CardContent-i1pr18zo.js";import"./Chip-D4r_Oml4.js";import"./ListItem-BQr6TeL9.js";import"./Slider-DGspmWgZ.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
