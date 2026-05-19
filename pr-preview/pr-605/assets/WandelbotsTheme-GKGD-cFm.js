import{j as o,M as m,e as n,C as p}from"./iframe-DmWrSOEO.js";import{useMDXComponents as r}from"./index-D8Zpn89l.js";import{muiComponents as s}from"./defaultTheme.stories-CDwK6l7j.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BIFJjxz7.js";import"./context-DrRBIKK8.js";import"./ExpandMore-JWRKLJMr.js";import"./createSvgIcon-BF5G2ZAl.js";import"./SvgIcon-BLj97Ng9.js";import"./Typography-DxaxNoiH.js";import"./Box-9kJ4zQP6.js";import"./useSlot--zttzNcS.js";import"./mergeSlotProps-BPo8AolI.js";import"./useControlled-ZZFLVrJl.js";import"./useTheme-MMsUXTKm.js";import"./utils-p52p785Y.js";import"./useTimeout-h43r87Sj.js";import"./Paper-B3tLmsc5.js";import"./ButtonBase-DZlJ_kXj.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DljHAjno.js";import"./styled-CWKJBPFi.js";import"./listItemTextClasses-BoYYJ7x7.js";import"./useThemeProps-DDjR6HIq.js";import"./getThemeProps-D1nbxefB.js";import"./Alert-D02kdrYm.js";import"./Tab-DTZnAcCq.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-_OIqGBMY.js";import"./IconButton-BvPGJluI.js";import"./CircularProgress-DNbZQgqF.js";import"./getValidReactChildren-BA5oVa5k.js";import"./TablePagination-D-Nb-z1t.js";import"./Popover-DqCr4PFB.js";import"./Portal-CakRNTf3.js";import"./Fade-BMCKoO5Q.js";import"./Select-0h5t4R6h.js";import"./MenuItem-DNZXC8NB.js";import"./dividerClasses-DnnmBU_N.js";import"./Toolbar-BrbT7buV.js";import"./Tooltip-CAkjQno3.js";import"./Badge-BHRgApMI.js";import"./Button-csQUkHsC.js";import"./Stack-DiXKl1xv.js";import"./Card-BECV8s__.js";import"./CardContent-Ct3JPGcx.js";import"./Chip-eMQhI2HY.js";import"./ListItem-BTblM6Dl.js";import"./Slider-BDGUY7Mv.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
