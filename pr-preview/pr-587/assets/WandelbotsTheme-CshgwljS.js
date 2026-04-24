import{j as o,M as m,e as n,C as p}from"./iframe-lSRc8Kry.js";import{useMDXComponents as r}from"./index-Dh8qIJNA.js";import{muiComponents as s}from"./defaultTheme.stories-Cbe7tiWu.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-CXQJobDn.js";import"./context-BQX-Ltts.js";import"./ExpandMore-BcwghwtR.js";import"./createSvgIcon-BpkQB3oN.js";import"./SvgIcon-DnKliW6C.js";import"./Typography-5Pc4-azQ.js";import"./Box-BTbmGrRi.js";import"./useSlot-CeMrY-J1.js";import"./mergeSlotProps-CngkMY-H.js";import"./useControlled-DojgYW6k.js";import"./useTheme-CBXsMXri.js";import"./utils-DeOodEku.js";import"./useTimeout-CbLclIbx.js";import"./Paper-Bc8LSlF_.js";import"./ButtonBase-Blz7Rgfg.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DsECU34d.js";import"./styled-CFGTLu5P.js";import"./listItemTextClasses-wYy5oLy-.js";import"./useThemeProps-FOlGIRxm.js";import"./getThemeProps-DmtdMtKF.js";import"./Alert-BYaBXQNg.js";import"./Tab-CPxpAmuF.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-D-WXCSGZ.js";import"./IconButton-BrR-WDQi.js";import"./CircularProgress-uuJD8bHC.js";import"./getValidReactChildren-DwyQTwEU.js";import"./TablePagination-Cjt764Py.js";import"./Popover-BAvjMlqd.js";import"./Portal-DY1gkC5i.js";import"./Fade-CFKJ6LMp.js";import"./Select-IQtwEBpD.js";import"./MenuItem-By614huF.js";import"./dividerClasses-DArCPYSc.js";import"./Toolbar-BNf90JnW.js";import"./Tooltip-DtzzQjfi.js";import"./Badge-B0N8NsAe.js";import"./Button-DpNV2gGM.js";import"./Stack-B3c5imzn.js";import"./Card-B0DxhUC9.js";import"./CardContent-BCtesQF_.js";import"./Chip-BIcQXKU4.js";import"./ListItem-BTcNxPJa.js";import"./Slider-CgDkizw_.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
