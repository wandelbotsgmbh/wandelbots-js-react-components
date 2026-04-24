import{j as o,M as m,e as n,C as p}from"./iframe-B_v-8-lB.js";import{useMDXComponents as r}from"./index-DK5kUrD4.js";import{muiComponents as s}from"./defaultTheme.stories-DocEGni2.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-CNJDZNsU.js";import"./context-D7ew06eA.js";import"./ExpandMore-r1Q7YGqE.js";import"./createSvgIcon-Dqt9y506.js";import"./SvgIcon-DJxTodtR.js";import"./Typography-4lR3XSTa.js";import"./Box-BVuFRonp.js";import"./useSlot-DZaV-B4q.js";import"./mergeSlotProps-D4bznKvs.js";import"./useControlled-BOMStj6E.js";import"./useTheme-BKO7b-Ch.js";import"./utils-CjZO3exs.js";import"./useTimeout-CnwhIyYy.js";import"./Paper-BGSOpvsh.js";import"./ButtonBase-Dk8luv4C.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-orepx_3g.js";import"./styled-GW4sxa-Y.js";import"./listItemTextClasses-VZdPZnib.js";import"./useThemeProps-Bh3Szyyg.js";import"./getThemeProps-B1B3XMuQ.js";import"./Alert-B-qXoerF.js";import"./Close-DqSRvGOz.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-B3A6MMdF.js";import"./IconButton-DxVI0dVb.js";import"./CircularProgress-Gauv6ce0.js";import"./getValidReactChildren-C_EzaRMB.js";import"./TablePagination-DJSp558Z.js";import"./Popover-Bgh94QCZ.js";import"./Portal-JuJjBr4T.js";import"./Fade-B_cdR4El.js";import"./Select-D0UTCFQn.js";import"./MenuItem-jTwoopp3.js";import"./dividerClasses-BFajjhdI.js";import"./Toolbar-BomUELPy.js";import"./Tooltip-DWVsFMMH.js";import"./Badge-Bm-JbK2u.js";import"./Button-WdoRxMhU.js";import"./Stack-C4IDteqL.js";import"./Card-BnzF-k_F.js";import"./CardContent-p7he76Bs.js";import"./Chip-DN9Wvm-N.js";import"./ListItem-QAzqH5sD.js";import"./Slider-C_f8BuRS.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
