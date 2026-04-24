import{j as o,M as m,e as n,C as p}from"./iframe-DIwJYtGD.js";import{useMDXComponents as r}from"./index-Kk18Nnvx.js";import{muiComponents as s}from"./defaultTheme.stories-COPf0FeA.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent--eKSPZYM.js";import"./context-KWHKwRr8.js";import"./ExpandMore-BAIAjHKa.js";import"./createSvgIcon-kpswALAs.js";import"./SvgIcon-vyy-Dufo.js";import"./Typography-DVw1jKEx.js";import"./Box-ZT9p9Gzf.js";import"./useSlot-Cp5BGbWw.js";import"./mergeSlotProps-B7zS71bn.js";import"./useControlled-Gi9gFupQ.js";import"./useTheme-ZaFxVY4K.js";import"./utils-ig6sz9ZK.js";import"./useTimeout-CAyxjZZE.js";import"./Paper-DmcUkLkQ.js";import"./ButtonBase-UGuu9vvn.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-_SMg8WP5.js";import"./styled-BBsgjtGw.js";import"./listItemTextClasses-DSxXLS7f.js";import"./useThemeProps-_ip4ABd8.js";import"./getThemeProps-B95gudXi.js";import"./Alert-f83nzd72.js";import"./Tab-BeqMojV-.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BZmqV1UC.js";import"./IconButton-CWzeOn36.js";import"./CircularProgress-DpvoRlhc.js";import"./getValidReactChildren-DBOzNCgi.js";import"./TablePagination-3Ru9fxx0.js";import"./Popover-BNc9V3v6.js";import"./Portal-D6rRQxLA.js";import"./Fade-DA9QTW75.js";import"./Select-gpYKDFKn.js";import"./MenuItem-gS-KRqR2.js";import"./dividerClasses-DXouQzVa.js";import"./Toolbar-Ckpar1kd.js";import"./Tooltip-qVw1yT9p.js";import"./Badge-sF3-7KbF.js";import"./Button-jOqAA-0K.js";import"./Stack-B_Spj1To.js";import"./Card-TugmMCIw.js";import"./CardContent-CmrhYTD-.js";import"./Chip-Dytasq7g.js";import"./ListItem-DqJYcEQH.js";import"./Slider-DDXqWgR8.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
