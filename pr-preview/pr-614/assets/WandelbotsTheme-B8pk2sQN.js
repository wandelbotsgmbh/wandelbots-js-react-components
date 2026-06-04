import{j as o,M as m,e as n,C as p}from"./iframe-DHLZxDk2.js";import{useMDXComponents as r}from"./index-BT6H3Ort.js";import{muiComponents as s}from"./defaultTheme.stories-DT7q-_8u.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DQ_wlx5p.js";import"./context-yDNSQZ-N.js";import"./ExpandMore-B5sAo1Ce.js";import"./createSvgIcon-CepTjeIv.js";import"./SvgIcon-BBR7t137.js";import"./Typography-SeUMkerZ.js";import"./Box-DsxLsmXk.js";import"./useSlot-D33Mnr7I.js";import"./mergeSlotProps-BNT6GgWx.js";import"./useControlled-Ci2_O6-S.js";import"./useTheme-BVqqz3Ma.js";import"./utils-BQ8mk8g2.js";import"./useTimeout-CIIgN2b7.js";import"./Paper-lxQITlLY.js";import"./ButtonBase-S6boMzXk.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DgsHOfAO.js";import"./styled-CDsBB1OD.js";import"./listItemTextClasses-mAgHenQX.js";import"./useThemeProps-DObzeCIW.js";import"./getThemeProps-BI-Nr62g.js";import"./Alert-CaxxIsML.js";import"./Tab-DZMPcpX3.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DA3nuVzb.js";import"./IconButton-UUSYIXci.js";import"./CircularProgress-CLDqnjTl.js";import"./getValidReactChildren-Dnxj9E3G.js";import"./TablePagination-DjMK6kw3.js";import"./Popover-mC0J53kV.js";import"./Portal-ahxVIYjq.js";import"./Fade-W2QmvGDf.js";import"./Select-BdzNLhG5.js";import"./MenuItem-BUep-jZ8.js";import"./dividerClasses-CkbndXiT.js";import"./Toolbar-Dm2Vb8L5.js";import"./Tooltip-DWVbMoyr.js";import"./Badge-DImfBr4v.js";import"./Button-BFo8UAFG.js";import"./Stack-CjNl26fg.js";import"./Card-fFUe6LxL.js";import"./CardContent-CxnN319r.js";import"./Chip-bswd2agx.js";import"./ListItem-BWKD6Sct.js";import"./Slider-L3PptOvd.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
