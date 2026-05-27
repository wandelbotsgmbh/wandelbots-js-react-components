import{j as o,M as m,e as n,C as p}from"./iframe-B5gnKzR8.js";import{useMDXComponents as r}from"./index-BocPsVM9.js";import{muiComponents as s}from"./defaultTheme.stories-DHtVjBXe.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-6301sCHQ.js";import"./context---8VY5lp.js";import"./ExpandMore-hERMTpFB.js";import"./createSvgIcon-Bzkn0_Mm.js";import"./SvgIcon-B5uCuBEJ.js";import"./Typography-8QTXvSJU.js";import"./Box-Da8-yky0.js";import"./useSlot-BSKXXeDt.js";import"./mergeSlotProps-Vj43-_z3.js";import"./useControlled-DJHwGg7J.js";import"./useTheme-DgP_RzB7.js";import"./utils-CD3UBHew.js";import"./useTimeout-6QWZFQfi.js";import"./Paper-DoAfOi-p.js";import"./ButtonBase-Cuc241Tn.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CIiS9_yb.js";import"./styled-avzr92DQ.js";import"./listItemTextClasses-BjLknrsS.js";import"./useThemeProps-9LGvPA_t.js";import"./getThemeProps-BTdH1Pa0.js";import"./Alert-CpDJZkb0.js";import"./Tab-CIPbFkCP.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-5b8S2OYf.js";import"./IconButton-DlDTESJK.js";import"./CircularProgress-BaETmBNL.js";import"./getValidReactChildren-ChzMpj7E.js";import"./TablePagination-DGjgvPx3.js";import"./Popover-nJjzloit.js";import"./Portal-BoVP4rd5.js";import"./Fade-D_eaYSmz.js";import"./Select-DEF5L2SF.js";import"./MenuItem-CnpOKjYj.js";import"./dividerClasses-TqeWzT6V.js";import"./Toolbar-C9-8Qseh.js";import"./Tooltip-B-yZE-bY.js";import"./Badge-CdfgLxjG.js";import"./Button-CImLezly.js";import"./Stack-C3YWb0Vw.js";import"./Card-JfVXT4hr.js";import"./CardContent-DXCRvI3H.js";import"./Chip-98DzGZ-V.js";import"./ListItem-BU1okuZL.js";import"./Slider-Di5VqwNz.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
