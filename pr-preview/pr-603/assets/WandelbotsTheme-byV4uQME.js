import{j as o,M as m,e as n,C as p}from"./iframe-B1Bs3RxJ.js";import{useMDXComponents as r}from"./index-BreGfa1d.js";import{muiComponents as s}from"./defaultTheme.stories-Bjqp1Fj2.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BtP1uQqh.js";import"./context-DR8mrapR.js";import"./ExpandMore-ILo27Rhz.js";import"./createSvgIcon-ixhp2G9O.js";import"./SvgIcon-BiGUDYK1.js";import"./Typography-D5hqRsFl.js";import"./Box-D2LtxsD2.js";import"./useSlot-bUwWAfIy.js";import"./mergeSlotProps-BvJb789h.js";import"./useControlled-CGu9U0x5.js";import"./useTheme-fCrL-hko.js";import"./utils-sYb3uprM.js";import"./useTimeout-D86CVsWp.js";import"./Paper-IZsyuoa7.js";import"./ButtonBase-DtmtrwHb.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DW26fizS.js";import"./styled-DXhg39tz.js";import"./listItemTextClasses-DOro3SXA.js";import"./useThemeProps-DJqmVvwq.js";import"./getThemeProps-zDjuqjOX.js";import"./Alert-Dbz8RhZy.js";import"./Tab-DpYoG4tQ.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-gq5kQyAg.js";import"./IconButton-DEdFF3dk.js";import"./CircularProgress-BFJKN8dy.js";import"./getValidReactChildren-CIapjKiF.js";import"./TablePagination-BT13esG9.js";import"./Popover-CRHOmkTQ.js";import"./Portal-Bys7yHt-.js";import"./Fade-FW0EcaKU.js";import"./Select-C51TtN1l.js";import"./MenuItem-BV7oW56d.js";import"./dividerClasses-0kxZ3YhU.js";import"./Toolbar-BZyqXz8c.js";import"./Tooltip-jYEuQ09v.js";import"./Badge-BljI1pM-.js";import"./Button-BAWnDKkq.js";import"./Stack-BVdxOj8d.js";import"./Card-BDZZTGSD.js";import"./CardContent-DddslCA8.js";import"./Chip-COKc1KGT.js";import"./ListItem-xrPFkFml.js";import"./Slider-Bku3U6Pb.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
