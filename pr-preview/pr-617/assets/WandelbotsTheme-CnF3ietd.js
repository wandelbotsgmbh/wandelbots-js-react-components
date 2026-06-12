import{j as o,M as m,e as n,C as p}from"./iframe-DDZb5C_9.js";import{useMDXComponents as r}from"./index-sZ4tiABQ.js";import{muiComponents as s}from"./defaultTheme.stories-CmA9_-i3.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Ddy9lapu.js";import"./context-uvdwl_PX.js";import"./ExpandMore-CE-8eVyW.js";import"./createSvgIcon-Be5Su7zx.js";import"./SvgIcon-DKd9hJOE.js";import"./Typography-D7t3e7Ha.js";import"./Box-D6gXKZ28.js";import"./useSlot-MKhUHBtw.js";import"./mergeSlotProps-BQUBHHSC.js";import"./useControlled-C5lXQPVS.js";import"./useTheme-C9eHsOs_.js";import"./utils-BCbcidwG.js";import"./useTimeout-6uieEHO-.js";import"./Paper-ABE1pKvr.js";import"./ButtonBase-Cv5ElOYw.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-xc4dnVnQ.js";import"./styled-fqtkY4XR.js";import"./listItemTextClasses-opSSFfoZ.js";import"./useThemeProps-CpUyiTkc.js";import"./getThemeProps-BLymj9cx.js";import"./Alert-DapZiqVA.js";import"./Tab-BX0F1Ttf.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-Bo3tHGaK.js";import"./IconButton-ClsoVu8a.js";import"./CircularProgress-CklX4QOf.js";import"./getValidReactChildren-D6xyuTh0.js";import"./TablePagination-D6NoFHPk.js";import"./Popover-D_S-WADF.js";import"./Portal-DwbGmv57.js";import"./Fade-O3LKgWHx.js";import"./Select-D9uWjG1g.js";import"./MenuItem-RG5jZ3VM.js";import"./dividerClasses-Bx7bIUc1.js";import"./Toolbar-DPSNPlgs.js";import"./Tooltip-BDV-FesJ.js";import"./Badge-Cxvv08vy.js";import"./Button-BO-u8ST8.js";import"./Stack-BM5xfkCw.js";import"./Card-C5J7lFG6.js";import"./CardContent-DpHgaxIv.js";import"./Chip-CHZIiPZU.js";import"./ListItem-Czmdhx0X.js";import"./Slider-Yp4in-Mx.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
