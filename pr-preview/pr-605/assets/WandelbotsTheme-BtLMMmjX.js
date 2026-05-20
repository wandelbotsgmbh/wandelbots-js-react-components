import{j as o,M as m,e as n,C as p}from"./iframe-CxmfdHuz.js";import{useMDXComponents as r}from"./index-BkmO7D1P.js";import{muiComponents as s}from"./defaultTheme.stories-Ba74HztG.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-D2LPhBva.js";import"./context-CFahWQCx.js";import"./ExpandMore-DIJlSqWZ.js";import"./createSvgIcon-hjnmR2te.js";import"./SvgIcon-C3bJ3kMJ.js";import"./Typography-jr8ADynv.js";import"./Box-jGcenm8Q.js";import"./useSlot-SWRv0Orq.js";import"./mergeSlotProps-CuLHjvyk.js";import"./useControlled-AgAaFqdE.js";import"./useTheme-C1yjOFf-.js";import"./utils--2hH7hw6.js";import"./useTimeout-DBywIGx_.js";import"./Paper-D7RVQxGh.js";import"./ButtonBase-B7AdsNN5.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Bys-h0BT.js";import"./styled-C2YkWhUp.js";import"./listItemTextClasses-DCZSA69C.js";import"./useThemeProps-Cq7L-F1-.js";import"./getThemeProps-DH3ZUBOg.js";import"./Alert-CKNp4L05.js";import"./Tab-CwLbCCPC.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-AU9O2JWv.js";import"./IconButton-DFyFMFGn.js";import"./CircularProgress-Clrjn_pK.js";import"./getValidReactChildren-CaA-zBNo.js";import"./TablePagination-RPLofvPk.js";import"./Popover-BEZi7uq_.js";import"./Portal-Cg_sLgT8.js";import"./Fade-D1AID9wn.js";import"./Select-DW3lS5jH.js";import"./MenuItem-DRYvi57N.js";import"./dividerClasses-BebhLpgx.js";import"./Toolbar-CTcqIg8m.js";import"./Tooltip-BrUVdNvQ.js";import"./Badge-D6tUDjKP.js";import"./Button-CnkLqXWa.js";import"./Stack-i1dNGq43.js";import"./Card-cfpkkMs9.js";import"./CardContent-CK-A4Euk.js";import"./Chip-4S16I54u.js";import"./ListItem--tzNP4Pj.js";import"./Slider-BhvQDILg.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
