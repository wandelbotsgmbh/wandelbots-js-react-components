import{j as o,M as m,e as n,C as p}from"./iframe-BAWr6Ij4.js";import{useMDXComponents as r}from"./index-DxDCHGrO.js";import{muiComponents as s}from"./defaultTheme.stories-C2ciDzpL.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-MytkGlYH.js";import"./context-DCqurv4E.js";import"./ExpandMore-B10UAwt5.js";import"./createSvgIcon-Dwf6Ieza.js";import"./SvgIcon-CfRio2hI.js";import"./Typography-ByYuPzbL.js";import"./Box-B_Un0H0n.js";import"./useSlot-mk9xQPix.js";import"./mergeSlotProps-C7d8Iac_.js";import"./useControlled-CH-eN4Y7.js";import"./useTheme-mvsmifwt.js";import"./utils-Dg_C6cry.js";import"./useTimeout-q5uRhSgJ.js";import"./Paper-CnHTsteM.js";import"./ButtonBase-Cm5Kv4PO.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DJuh10fI.js";import"./styled-50D-k2xQ.js";import"./listItemTextClasses-Df6ZdKBJ.js";import"./useThemeProps-DZ_htPuE.js";import"./getThemeProps-Ba6ZL8s5.js";import"./Alert-CZEQhz3l.js";import"./Tab-Bj55B6P4.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CUEN5nCK.js";import"./IconButton-DEf8ii_w.js";import"./CircularProgress-BlEzZ_4n.js";import"./getValidReactChildren-BVU3frth.js";import"./TablePagination-C1ZUjCCe.js";import"./Popover-BO5_o2yg.js";import"./Portal-CPPx-Otu.js";import"./Fade-CGGIEajx.js";import"./Select-DwDab80O.js";import"./MenuItem-CvMmY7Yh.js";import"./dividerClasses-BNbHl2Cj.js";import"./Toolbar-DeM6WIW1.js";import"./Tooltip-Kk3zvxNm.js";import"./Badge-BWqrNYu2.js";import"./Button-CPU8BZiZ.js";import"./Stack-9rSG3tXj.js";import"./Card-D2Rp-Umb.js";import"./CardContent-DsIimw0a.js";import"./Chip-X6VYCEvh.js";import"./ListItem-DlCnUUcR.js";import"./Slider-D13VSSZg.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
