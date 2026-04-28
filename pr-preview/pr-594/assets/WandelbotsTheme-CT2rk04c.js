import{j as o,M as m,e as n,C as p}from"./iframe-C7xEWNK7.js";import{useMDXComponents as r}from"./index-DNMqzkQO.js";import{muiComponents as s}from"./defaultTheme.stories-DV_P4CS5.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DF4E-5ZW.js";import"./context-BCAr3CMY.js";import"./ExpandMore-BWUW8IWo.js";import"./createSvgIcon-CBs1NLyo.js";import"./SvgIcon-CU6ZXLAC.js";import"./Typography-4x9EgFN8.js";import"./Box-DeV0gvSL.js";import"./useSlot-KjnR5l5Y.js";import"./mergeSlotProps-DiQcYUks.js";import"./useControlled-DTF4bgBP.js";import"./useTheme-Bu9-ccFP.js";import"./utils-IcFnE6wl.js";import"./useTimeout-DGAuAM58.js";import"./Paper-CGJLdHH_.js";import"./ButtonBase-CArdJ1LK.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CVsJrINz.js";import"./styled-DnpNcwRh.js";import"./listItemTextClasses-BcidDDlS.js";import"./useThemeProps-CWGbb3xY.js";import"./getThemeProps-rxOIgxSj.js";import"./Alert-DMWMSeVB.js";import"./Tab-DnGDs1wj.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-yI0kBNx8.js";import"./IconButton-DhQKXmK3.js";import"./CircularProgress-BP78AaYc.js";import"./getValidReactChildren-v2gCXwYn.js";import"./TablePagination---n-abAO.js";import"./Popover-CjlIZE8G.js";import"./Portal-BtHpdPAE.js";import"./Fade-BMQ145in.js";import"./Select-D8FvCw2B.js";import"./MenuItem-qQPhJE6f.js";import"./dividerClasses-bN1yRyfL.js";import"./Toolbar-DePPE820.js";import"./Tooltip-Cjr5YRq9.js";import"./Badge-BfSau2x3.js";import"./Button-BSUd8iaS.js";import"./Stack-CpBWYhzk.js";import"./Card-Cv_LLGFe.js";import"./CardContent-DTfcE6Fq.js";import"./Chip-J2Pvp2lP.js";import"./ListItem-BkqgMqPn.js";import"./Slider-Szxw0tnA.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
