import{j as o,M as m,e as n,C as p}from"./iframe-RLKXSL2L.js";import{useMDXComponents as r}from"./index-BzkMgqjc.js";import{muiComponents as s}from"./defaultTheme.stories-DSe3H22c.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BCcvJ4dd.js";import"./context-fnZvdwT4.js";import"./ExpandMore-jF9Ywvbx.js";import"./createSvgIcon-c2KrZBuE.js";import"./SvgIcon-hBmb142s.js";import"./Typography-CxXcrttO.js";import"./Box-CfCypOiM.js";import"./useSlot-zgjAFWMW.js";import"./mergeSlotProps-BJfQVUXN.js";import"./useControlled-DvixkQcc.js";import"./useTheme-752l6NHN.js";import"./utils-BC0M9_4t.js";import"./useTimeout-3h5lRCjk.js";import"./Paper-xjOQV5S5.js";import"./ButtonBase-pA2aBByI.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BSyESVUB.js";import"./styled-XqBvhWtB.js";import"./listItemTextClasses-BYwFKPlQ.js";import"./useThemeProps-MxJQxNw4.js";import"./getThemeProps-ku--7DhN.js";import"./Alert-CKge3RQZ.js";import"./Tab-0TC89RYi.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-reWfVlGs.js";import"./IconButton-Bw_7kIkG.js";import"./CircularProgress-C7muK3Jo.js";import"./getValidReactChildren-DWk-6epI.js";import"./TablePagination-qJeJnE9a.js";import"./Popover-CvwdVGCy.js";import"./Portal-B9m9OQaF.js";import"./Fade-KbZY5-a1.js";import"./Select-CTiqHv0e.js";import"./MenuItem-BWbbAER4.js";import"./dividerClasses-D8Yy2_95.js";import"./Toolbar-CIg7nCqQ.js";import"./Tooltip-BwM66WK4.js";import"./Badge-B3mt9Yb0.js";import"./Button-BXvy-y1L.js";import"./Stack-ecwMXtXU.js";import"./Card-BHt4eaoD.js";import"./CardContent-B89Wz-ej.js";import"./Chip-DRw9Fewn.js";import"./ListItem-B2frmAXd.js";import"./Slider-DQXyy5nq.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
