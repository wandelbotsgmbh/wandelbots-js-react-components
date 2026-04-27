import{j as o,M as m,e as n,C as p}from"./iframe-bBEJQEds.js";import{useMDXComponents as r}from"./index-DVUI7X0I.js";import{muiComponents as s}from"./defaultTheme.stories-DrxZfjdJ.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DLrNwbvW.js";import"./context-DLuZ7TM-.js";import"./ExpandMore-Cd_6JYSg.js";import"./createSvgIcon-Cmm04yzo.js";import"./SvgIcon-CiJOt2sZ.js";import"./Typography-Dwqy70mz.js";import"./Box-BAC3Irbd.js";import"./useSlot-B4apvZMh.js";import"./mergeSlotProps-BCKYnMIV.js";import"./useControlled-DmyUTsTh.js";import"./useTheme-BdsD46aS.js";import"./utils-DYmQ7Bdk.js";import"./useTimeout-DHf2iQkr.js";import"./Paper-FULSlh0n.js";import"./ButtonBase-CFfTI7X0.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-zAfbzTrv.js";import"./styled-ByeKu3ow.js";import"./listItemTextClasses-CY4P9mor.js";import"./useThemeProps-BR_7Qw_j.js";import"./getThemeProps-B674xtKh.js";import"./Alert-Cv5k1HHo.js";import"./Tab-Bj9v4zmi.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DeEJLnM-.js";import"./IconButton-BXs58941.js";import"./CircularProgress-Cw7se-Mx.js";import"./getValidReactChildren-Be4o2bQi.js";import"./TablePagination-B1Zkz97C.js";import"./Popover-DHvglnMP.js";import"./Portal-96Pfxnnf.js";import"./Fade-CuIw1BRt.js";import"./Select-CTUdj7n4.js";import"./MenuItem-BiCQzyuH.js";import"./dividerClasses-DTTypBm6.js";import"./Toolbar-BdiO-8Ly.js";import"./Tooltip-DGMTh7wj.js";import"./Badge-pYiR2RW5.js";import"./Button-N07hVmnv.js";import"./Stack-xC_0XcBD.js";import"./Card-BJw40m0R.js";import"./CardContent-Bh3GH8L2.js";import"./Chip-a7CkC6Fk.js";import"./ListItem-EB9dk4nK.js";import"./Slider-CAIpJRqQ.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
