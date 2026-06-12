import{j as o,M as m,e as n,C as p}from"./iframe-DchEWV59.js";import{useMDXComponents as r}from"./index-D2FjxY4S.js";import{muiComponents as s}from"./defaultTheme.stories-JK5xuFgy.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BZt87fnG.js";import"./context-DvoWthvk.js";import"./ExpandMore-CRQ26mg_.js";import"./createSvgIcon-DUldrXoq.js";import"./SvgIcon-COvp3Gfh.js";import"./Typography-DMtLnw89.js";import"./Box-5o7oNvkM.js";import"./useSlot-Dg6JUlBp.js";import"./mergeSlotProps-DqFprrt2.js";import"./useControlled-aV93uKLx.js";import"./useTheme-CP0vZSll.js";import"./utils-DbE9S4yb.js";import"./useTimeout-Dx8AlRKo.js";import"./Paper-BFQKP65K.js";import"./ButtonBase-D1py1Eto.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-0LskOYcq.js";import"./styled-De1-Mpdo.js";import"./listItemTextClasses-CL84kKxf.js";import"./useThemeProps-n75W-Y7c.js";import"./getThemeProps-BFZGWln5.js";import"./Alert-F0Th9dV2.js";import"./Tab-D3tEEjK_.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-b6Xb8rV3.js";import"./IconButton-AdU4wRWw.js";import"./CircularProgress-DBmYDAjf.js";import"./getValidReactChildren-BG5dXzX7.js";import"./TablePagination-ru2LkgY0.js";import"./Popover-CBx-AUZN.js";import"./Portal-Cns6RQXW.js";import"./Fade-C8NxSv6l.js";import"./Select-BMO9UAg1.js";import"./MenuItem-CFIPuZPp.js";import"./dividerClasses-C-vJPTUp.js";import"./Toolbar-Bn5C6_Z5.js";import"./Tooltip-Dv__USG0.js";import"./Badge-Cug_DCp4.js";import"./Button-D9S9QBoe.js";import"./Stack-DhzmrS6D.js";import"./Card-ClAKnMiw.js";import"./CardContent-CaTAKD4H.js";import"./Chip-BKS17L9h.js";import"./ListItem-Z9khOWi1.js";import"./Slider-DX-aS3tM.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
