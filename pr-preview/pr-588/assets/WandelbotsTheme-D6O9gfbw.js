import{j as o,M as m,e as n,C as p}from"./iframe-BBmVBaXS.js";import{useMDXComponents as r}from"./index-lAh9eyM2.js";import{muiComponents as s}from"./defaultTheme.stories-BTX_mZvB.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BkopyABe.js";import"./context-BXq1Kzxk.js";import"./ExpandMore-B1pZeNR_.js";import"./createSvgIcon-B40FZVUG.js";import"./SvgIcon-BtAVmWyZ.js";import"./Typography-C1U95F0t.js";import"./Box-CQ-kzbOs.js";import"./useSlot-CJi7OSrX.js";import"./mergeSlotProps-BGcK5O9j.js";import"./useControlled-BpH0Flz0.js";import"./useTheme-D2eBzOSs.js";import"./utils-ChFxB50m.js";import"./useTimeout-nLurqOe3.js";import"./Paper-D273xkrv.js";import"./ButtonBase-CF-tky-V.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-8vruRA9R.js";import"./styled-Hs5-_FkZ.js";import"./listItemTextClasses-CF9sc0k3.js";import"./useThemeProps-D-iJag9A.js";import"./getThemeProps-C5W9ryFb.js";import"./Alert-CJpJTFls.js";import"./Tab-Bg21U47I.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-Qbmopmh5.js";import"./IconButton-DtKNsbH8.js";import"./CircularProgress-DxiIqKl9.js";import"./getValidReactChildren-BKpF2kUk.js";import"./TablePagination-BkFvRK2M.js";import"./Popover-Dv_hg5yX.js";import"./Portal-D6lHd-UN.js";import"./Fade-D0hM0czw.js";import"./Select-maptVLdv.js";import"./MenuItem-sURWPfZv.js";import"./dividerClasses-a2ssiwrq.js";import"./Toolbar-Bid4C6uO.js";import"./Tooltip-q90Dm4E3.js";import"./Badge-B3_KE4L0.js";import"./Button-OovAzzPo.js";import"./Stack-DbB5Agwv.js";import"./Card-BB1UGxgw.js";import"./CardContent-kJ_Ugfvi.js";import"./Chip-DOH48NGP.js";import"./ListItem-CPT1BtKI.js";import"./Slider-DrXV9arZ.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
