import{j as o,M as m,e as n,C as p}from"./iframe-BQswGLQo.js";import{useMDXComponents as r}from"./index-mtpjM1A2.js";import{muiComponents as s}from"./defaultTheme.stories-ChjgDZl4.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-tOwP7QJB.js";import"./context-C5VyNP--.js";import"./ExpandMore-3vbMEH6X.js";import"./createSvgIcon-DNCq4Y8p.js";import"./SvgIcon-C-EjauRw.js";import"./Typography-C61CSdkt.js";import"./Box-3KAvMgbz.js";import"./useSlot-DrR4MYST.js";import"./mergeSlotProps-DB9QTWiJ.js";import"./useControlled-CclbEWb4.js";import"./useTheme-BqJmB9xs.js";import"./utils-qvWW5KJi.js";import"./useTimeout-BCmj0WzM.js";import"./Paper-BKvyeRF3.js";import"./ButtonBase-Dh5IH7ah.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-oS0n-ErY.js";import"./styled-C40GvXnj.js";import"./listItemTextClasses-CzTCo7dz.js";import"./useThemeProps-T_BR1aD0.js";import"./getThemeProps-ChwIeg81.js";import"./Alert-DU5WFCAh.js";import"./Tab-DpVuPPUR.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BVMmFfrb.js";import"./IconButton-DMkPID8r.js";import"./CircularProgress-BNJ6G_02.js";import"./getValidReactChildren-CGbjface.js";import"./TablePagination-9U3lvLb0.js";import"./Popover-DT1Mkgcp.js";import"./Portal-D1EdNHwA.js";import"./Fade-DMlEtzdD.js";import"./Select-DDKYblT1.js";import"./MenuItem-DfL_lUgE.js";import"./dividerClasses-BeECLjhL.js";import"./Toolbar-7J3AKf1e.js";import"./Tooltip-BFliAd64.js";import"./Badge-CVXrILtq.js";import"./Button-Cl4W2dlQ.js";import"./Stack-Dw9LpDy1.js";import"./Card-V3RD5MhK.js";import"./CardContent-DUyMakp7.js";import"./Chip-CtR1hkoK.js";import"./ListItem-Csq5pFg3.js";import"./Slider-B7947HYv.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
