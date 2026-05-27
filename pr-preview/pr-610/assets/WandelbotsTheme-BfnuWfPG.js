import{j as o,M as m,e as n,C as p}from"./iframe-D4uLF9TB.js";import{useMDXComponents as r}from"./index-Cp4yEjNb.js";import{muiComponents as s}from"./defaultTheme.stories-CKqUa7G5.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-UrgOdACs.js";import"./context-DXYmRPRN.js";import"./ExpandMore-Ci_CLTGg.js";import"./createSvgIcon-CP7Y9Rxk.js";import"./SvgIcon-CranwfZU.js";import"./Typography-Dy-nTLDq.js";import"./Box-DPw2Q3LD.js";import"./useSlot-tLTcq4Q0.js";import"./mergeSlotProps-CJUwzrVL.js";import"./useControlled-CqYwyuYZ.js";import"./useTheme-Bms5QHf0.js";import"./utils-BiORq_tM.js";import"./useTimeout-B5dGmiFs.js";import"./Paper-BdtHCakD.js";import"./ButtonBase-CRqxhArW.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-u9HkD-dX.js";import"./styled-DaT-ZLqM.js";import"./listItemTextClasses-BD6gXkFc.js";import"./useThemeProps-knUI08R2.js";import"./getThemeProps-CJE8k7eI.js";import"./Alert-D-0c_GpV.js";import"./Tab-BwFtfawl.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-B_qy4WHX.js";import"./IconButton-DpBGEWZi.js";import"./CircularProgress-s6n3lLpa.js";import"./getValidReactChildren-DhTpX6yM.js";import"./TablePagination-CiTNA2WT.js";import"./Popover-B4UtBGwO.js";import"./Portal-CDopbxRj.js";import"./Fade-CnUrSun7.js";import"./Select-DPvc-h4J.js";import"./MenuItem-JGPCpEPo.js";import"./dividerClasses-CcQA9d93.js";import"./Toolbar-6hwGNcfw.js";import"./Tooltip-DgK1ZvsP.js";import"./Badge-DMFiMX_-.js";import"./Button-DefDVYzj.js";import"./Stack-a4dh9oo2.js";import"./Card-B6nVgNaZ.js";import"./CardContent-Pw2y0pMh.js";import"./Chip-BRdHDzl6.js";import"./ListItem-C4LO_Bea.js";import"./Slider-BU5BHukA.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
