import{j as o,M as m,e as n,C as p}from"./iframe-C4X6DbwW.js";import{useMDXComponents as r}from"./index-Bz4myz6U.js";import{muiComponents as s}from"./defaultTheme.stories-DoNbH8zW.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-CYnAAZw0.js";import"./context-BglkCNdI.js";import"./ExpandMore-B9DgM3iW.js";import"./createSvgIcon-Wrx9RGeB.js";import"./SvgIcon-BiPpAoyL.js";import"./Typography-DFEEvr9-.js";import"./Box-B688Cah7.js";import"./useSlot-B-55KECa.js";import"./mergeSlotProps-D8zPUAbS.js";import"./useControlled-Fab2aNQh.js";import"./useTheme-C5CdIxmL.js";import"./utils-CUj-OOCK.js";import"./useTimeout-CCiJeLTo.js";import"./Paper-CmqOqz87.js";import"./ButtonBase-CqVZecld.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Ca6Jo7tD.js";import"./styled-Cxuh8You.js";import"./listItemTextClasses-Cf7Mq72g.js";import"./useThemeProps-C4EK_XHx.js";import"./getThemeProps-DfvRs0Wh.js";import"./Alert-DYh0c9Qh.js";import"./Tab-BdZnw_dz.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BaXBozge.js";import"./IconButton-ZCSvVEu0.js";import"./CircularProgress-BvH1MklR.js";import"./getValidReactChildren-Bk_sGT76.js";import"./TablePagination-BJdd_s4D.js";import"./Popover-DUHxQF0u.js";import"./Portal-eK4SOPEU.js";import"./Fade-CQtMc7dg.js";import"./Select-DQKdnfzu.js";import"./MenuItem-B9qSwNRw.js";import"./dividerClasses-De7NamSU.js";import"./Toolbar-BzQsEcti.js";import"./Tooltip-CRLvyqg_.js";import"./Badge-CV3bky_S.js";import"./Button-CHXA_VL1.js";import"./Stack-DvavnoCs.js";import"./Card-CtWEkQy-.js";import"./CardContent-4QuFYgbG.js";import"./Chip-DsZrcgC0.js";import"./ListItem-D_Vbncr-.js";import"./Slider-BcAdgzrU.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
