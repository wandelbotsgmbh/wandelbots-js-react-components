import{j as o,M as m,e as n,C as p}from"./iframe-d0d6_6nB.js";import{useMDXComponents as r}from"./index-DwsvK5RM.js";import{muiComponents as s}from"./defaultTheme.stories-BTNv4v_O.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BL2rj_SF.js";import"./context-CzI_zTJ7.js";import"./ExpandMore-DksC4cBj.js";import"./createSvgIcon-D041jSaU.js";import"./SvgIcon-B7xoBCZS.js";import"./Typography-PL2p-I1G.js";import"./Box-EyQb8sRT.js";import"./useSlot-DfgUEkJi.js";import"./mergeSlotProps-Ccdjw24j.js";import"./useControlled-Dj6xVzWS.js";import"./useTheme-f_mA3yV5.js";import"./utils-BAHNRu6w.js";import"./useTimeout-DJsmCn_u.js";import"./Paper-CXCuV4Np.js";import"./ButtonBase-Bdv7Z0O3.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BE4kUOGZ.js";import"./styled-C_OuhPVC.js";import"./listItemTextClasses-BEDgkstk.js";import"./useThemeProps-BU040dvJ.js";import"./getThemeProps-7b-klxdi.js";import"./Alert-BT59ruxk.js";import"./Close-QZ9F75xp.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CzKMYj9b.js";import"./IconButton-BY9BlTYX.js";import"./CircularProgress-XzU522EY.js";import"./getValidReactChildren-cDv3Bpfg.js";import"./TablePagination-Ds8v_eV2.js";import"./Popover-Dd4FnYS6.js";import"./Portal-Crw_eBEJ.js";import"./Fade-B9Fy5kj2.js";import"./Select-VarcbTla.js";import"./MenuItem-C0JSfUy3.js";import"./dividerClasses-Bkjwzpw7.js";import"./Toolbar-CGmXJ3b1.js";import"./Tooltip-DU07jQ9V.js";import"./Badge-Cp0et-w0.js";import"./Button-CeCxbCtw.js";import"./Stack-D-8kzB8m.js";import"./Card-bVFQjLa5.js";import"./CardContent-D1Pu9Fn7.js";import"./Chip-DeZTfNn0.js";import"./ListItem-2Oybt0Ln.js";import"./Slider-UkT5C3Zp.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
