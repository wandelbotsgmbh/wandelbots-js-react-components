import{j as o,M as m,e as n,C as p}from"./iframe-DX1qAlno.js";import{useMDXComponents as r}from"./index-NGzPqXFh.js";import{muiComponents as s}from"./defaultTheme.stories-JoIEcXm8.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-D523zEaq.js";import"./context--wP1qJEe.js";import"./ExpandMore-Rv1UoG0-.js";import"./createSvgIcon-BrVYGM75.js";import"./SvgIcon-1BqDE2z0.js";import"./Typography-Bhsp7_1J.js";import"./Box-x-iCpWMl.js";import"./useSlot-B_HrPfzE.js";import"./mergeSlotProps-Dzio96Dt.js";import"./useControlled-Cfw0Dg1d.js";import"./useTheme-CYdZjSm6.js";import"./utils-DKWVYrT5.js";import"./useTimeout-o6UDMqpq.js";import"./Paper-B4eK6TqM.js";import"./ButtonBase-yAaOO8N1.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Bgxy1F97.js";import"./styled-D6giLOdr.js";import"./listItemTextClasses-CyzKzMoY.js";import"./useThemeProps-4GP7w5os.js";import"./getThemeProps-BtpaZ8cH.js";import"./Alert-DTtyTvUO.js";import"./Tab-Dl9ny-ve.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BLqIHUAy.js";import"./IconButton-HEjok0pb.js";import"./CircularProgress-B1q_ewP0.js";import"./getValidReactChildren-C7RHxwUy.js";import"./TablePagination-Dliq_O39.js";import"./Popover-BOS_JiaA.js";import"./Portal-CnMq2WYx.js";import"./Fade-BJXGV1W_.js";import"./Select-DIGvAZNk.js";import"./MenuItem-D_KdiF2R.js";import"./dividerClasses-CRv8KTlR.js";import"./Toolbar-BA0OwhLA.js";import"./Tooltip-CS96-_v6.js";import"./Badge-CjEPke6Z.js";import"./Button-BXPPskL2.js";import"./Stack-DJzwG-rI.js";import"./Card-BstIibgq.js";import"./CardContent-CkBFeTkz.js";import"./Chip-CnAqnUFh.js";import"./ListItem-QHmJZJX7.js";import"./Slider-Byk5Ejew.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
