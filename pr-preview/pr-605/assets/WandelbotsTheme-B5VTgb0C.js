import{j as o,M as m,e as n,C as p}from"./iframe-DtiRLENr.js";import{useMDXComponents as r}from"./index-Ckte2jAc.js";import{muiComponents as s}from"./defaultTheme.stories-0DO0WEfp.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Czyi4ZjS.js";import"./context-7xJ7erWY.js";import"./ExpandMore-DjNN3dHH.js";import"./createSvgIcon-N7Tnr47b.js";import"./SvgIcon-dUljdHEN.js";import"./Typography-CbqdGqIA.js";import"./Box-zvvdYgkw.js";import"./useSlot-Ba29BbID.js";import"./mergeSlotProps-DXgBOhoI.js";import"./useControlled-7_zBQ-7P.js";import"./useTheme-DGw6sctI.js";import"./utils-Czag9zuk.js";import"./useTimeout-DciHL5hH.js";import"./Paper-DTC4QZjN.js";import"./ButtonBase-CVBkE61i.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Ryb8_DIj.js";import"./styled-C-S2gy1s.js";import"./listItemTextClasses-DoJm4fOu.js";import"./useThemeProps-84FL5F3q.js";import"./getThemeProps-D7c4XuWz.js";import"./Alert-OlkaQjGT.js";import"./Tab-CbIO47yy.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CHpSAnQI.js";import"./IconButton-DgBu6amV.js";import"./CircularProgress-CQCxWSu9.js";import"./getValidReactChildren-JkuvTBtb.js";import"./TablePagination-1ZgXb7Dr.js";import"./Popover-Cn9crKEa.js";import"./Portal-DOofyrSN.js";import"./Fade-CRhzyC-S.js";import"./Select-IgOIgipA.js";import"./MenuItem-DBac0KC1.js";import"./dividerClasses-B2xlyl9b.js";import"./Toolbar-OYefsIWZ.js";import"./Tooltip-Dx78JW_m.js";import"./Badge-hZ2-bUC6.js";import"./Button-7t4pJR4X.js";import"./Stack-DWZJAes8.js";import"./Card-bcctGoK0.js";import"./CardContent-BEI41y8i.js";import"./Chip-b14XJEL8.js";import"./ListItem-BIYUZ2Vd.js";import"./Slider-e1Ufz6Tt.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
