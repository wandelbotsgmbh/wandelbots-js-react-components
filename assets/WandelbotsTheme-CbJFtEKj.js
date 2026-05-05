import{j as o,M as m,e as n,C as p}from"./iframe-g1tvjZqV.js";import{useMDXComponents as r}from"./index-hX-1XT3x.js";import{muiComponents as s}from"./defaultTheme.stories-DGjuVjUk.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Cl2hSBGR.js";import"./context-DAtywzRo.js";import"./ExpandMore-CO4L5uPd.js";import"./createSvgIcon-C74oxuC1.js";import"./SvgIcon-BtS-QEpr.js";import"./Typography-CyF5_Nc8.js";import"./Box-CZQODqqE.js";import"./useSlot-BgnWcro6.js";import"./mergeSlotProps-Cmf30Ddw.js";import"./useControlled-BQduLGtP.js";import"./useTheme-D7Stu3Yl.js";import"./utils-CjZ05U2d.js";import"./useTimeout-De7OyFTn.js";import"./Paper-Bk-q_sqO.js";import"./ButtonBase-DFN-PRSf.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CQfAMl4m.js";import"./styled-DS8zqvnZ.js";import"./listItemTextClasses-Cr5hWba2.js";import"./useThemeProps-8R2KET3C.js";import"./getThemeProps-WgGzirjS.js";import"./Alert-CnJgIVez.js";import"./Tab-DR8o8T9b.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-D_dSDeXQ.js";import"./IconButton-B0Iwr5vD.js";import"./CircularProgress-J4HPYlOd.js";import"./getValidReactChildren-BIi9uS3N.js";import"./TablePagination-AQlARAUt.js";import"./Popover-kNJEAMfa.js";import"./Portal-CZEUHTem.js";import"./Fade-BEyxrvCi.js";import"./Select-CRC6_weX.js";import"./MenuItem-CpF4ccSS.js";import"./dividerClasses-DXExzmI5.js";import"./Toolbar-F_AbaQJk.js";import"./Tooltip-BexYgP-A.js";import"./Badge-lAMl1hNg.js";import"./Button-Du0yi4lF.js";import"./Stack-CE6s3fQO.js";import"./Card-LMQqh-l7.js";import"./CardContent-DBwPxuZZ.js";import"./Chip-McWfpkcx.js";import"./ListItem-DvC_OT8L.js";import"./Slider-CisjSHhm.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
