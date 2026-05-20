import{j as o,M as m,e as n,C as p}from"./iframe-DC4iWNaz.js";import{useMDXComponents as r}from"./index-BENVgoYa.js";import{muiComponents as s}from"./defaultTheme.stories-DM9dNdEb.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-B0rpBNAw.js";import"./context-DfqC7GsF.js";import"./ExpandMore-gVNSb7F6.js";import"./createSvgIcon-C4bHV54J.js";import"./SvgIcon-BZRxNZFI.js";import"./Typography-SMWrZwY5.js";import"./Box-OMtI9Y7C.js";import"./useSlot-Bn9wABzF.js";import"./mergeSlotProps-4sBA9Gx6.js";import"./useControlled-CO66ZHfw.js";import"./useTheme-CdwGmyvQ.js";import"./utils-CPCmjnQX.js";import"./useTimeout-0F6kPdfz.js";import"./Paper-Bm94lbgZ.js";import"./ButtonBase-Rx9yiQVJ.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-ClPbLP1n.js";import"./styled-CrJWBdiL.js";import"./listItemTextClasses-D_Uxtcux.js";import"./useThemeProps-CU_2HpCW.js";import"./getThemeProps-DDMH7tRp.js";import"./Alert-qNSwbQy8.js";import"./Tab-CgTaMCBI.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-Dm3N3kPi.js";import"./IconButton-DcDBhWKi.js";import"./CircularProgress-Dl3XmUFg.js";import"./getValidReactChildren-DL6tzlf3.js";import"./TablePagination-Bd5izedC.js";import"./Popover-Cly7vEQH.js";import"./Portal-DrnY7Dgy.js";import"./Fade-CMZJhtd_.js";import"./Select-DYyaKnRf.js";import"./MenuItem-CmQr7jWG.js";import"./dividerClasses-CTrpwM_g.js";import"./Toolbar-DGxtXmx3.js";import"./Tooltip-Rvpjuyy6.js";import"./Badge-CCLU9sfV.js";import"./Button-mBnneziD.js";import"./Stack-B5C88iOH.js";import"./Card-DQFwTZo_.js";import"./CardContent-BjkO63iI.js";import"./Chip-DfbBJkmC.js";import"./ListItem-s7Em6WDk.js";import"./Slider-9CM9i3Vz.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
