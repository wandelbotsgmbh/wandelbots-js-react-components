import{j as o,M as m,e as n,C as p}from"./iframe-ZZVW1XqV.js";import{useMDXComponents as r}from"./index-kPfas0ri.js";import{muiComponents as s}from"./defaultTheme.stories-Be1t-Iy8.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BZq5q35Q.js";import"./context-CYxK5gWU.js";import"./ExpandMore--Gfm8lau.js";import"./createSvgIcon-Dv0TmzfE.js";import"./SvgIcon-YFWIgye4.js";import"./Typography-CWr55VjG.js";import"./Box-WIoobPhI.js";import"./useSlot-B0f-OLbV.js";import"./mergeSlotProps-CFVqvEkb.js";import"./useControlled-BtfMh9E9.js";import"./useTheme-cazX4MSO.js";import"./utils-BqtJ5hDS.js";import"./useTimeout-0hM7NA6S.js";import"./Paper-q-K7EU-g.js";import"./ButtonBase-IiuycNnO.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-GmNyO7LT.js";import"./styled-DuVnwfSN.js";import"./listItemTextClasses-BzFT_91G.js";import"./useThemeProps-C8RddSMC.js";import"./getThemeProps-DAsDnbBv.js";import"./Alert-BgfgEBap.js";import"./Tab-CVL1SRIh.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CyFjPeQm.js";import"./IconButton-BZE1CHx5.js";import"./CircularProgress-DxKDwRex.js";import"./getValidReactChildren-BPGO9w4M.js";import"./TablePagination-Djb7nPfi.js";import"./Popover-BBByfKJM.js";import"./Portal-ChiveiD1.js";import"./Fade-B-jEww1M.js";import"./Select-BKjk8p5o.js";import"./MenuItem-BQxRG53j.js";import"./dividerClasses-CQaIfQ4c.js";import"./Toolbar-D1v2YGO0.js";import"./Tooltip-C3pU2xXh.js";import"./Badge-D1GA3Enn.js";import"./Button-jTIPvSj2.js";import"./Stack-CnzyR7YV.js";import"./Card-DwLZL8sg.js";import"./CardContent-DEW7DT87.js";import"./Chip-CRDJ9k8L.js";import"./ListItem-BmHThRca.js";import"./Slider-BWglofE-.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
