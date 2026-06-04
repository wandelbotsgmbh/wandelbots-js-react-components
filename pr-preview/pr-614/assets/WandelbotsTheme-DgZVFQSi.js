import{j as o,M as m,e as n,C as p}from"./iframe-DOikaZn2.js";import{useMDXComponents as r}from"./index-Cab0K6UI.js";import{muiComponents as s}from"./defaultTheme.stories-CHm31vOP.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DQ3SdwYm.js";import"./context-oU1KEh3q.js";import"./ExpandMore-BlF0aGkG.js";import"./createSvgIcon-C_kpDAhd.js";import"./SvgIcon-BT8_RdvD.js";import"./Typography-CDFgRY4g.js";import"./Box-bWYavhQA.js";import"./useSlot-DT3ojdWR.js";import"./mergeSlotProps-DMMedFAN.js";import"./useControlled-B7EQGe-I.js";import"./useTheme-MiEZSqX3.js";import"./utils-DQfIvqGu.js";import"./useTimeout-Db-qi6l6.js";import"./Paper-Al6e6jXj.js";import"./ButtonBase-mBGbf_II.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CUc4oWEB.js";import"./styled-C9gWAxgT.js";import"./listItemTextClasses-7lEEtM3V.js";import"./useThemeProps-DiQSXTXj.js";import"./getThemeProps-aP9BRdJd.js";import"./Alert-CudYxJbx.js";import"./Tab-DTH_Ssvw.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BuLkksFO.js";import"./IconButton-aBBjPNzC.js";import"./CircularProgress-Cqm7cZSx.js";import"./getValidReactChildren-BvTRrJkO.js";import"./TablePagination-DgJsUeSi.js";import"./Popover-yJXhyrM7.js";import"./Portal-B8jM0h3J.js";import"./Fade-4N0gbrRq.js";import"./Select-DPzG3blr.js";import"./MenuItem-s5UuIWAy.js";import"./dividerClasses-DDou6iqG.js";import"./Toolbar-C26vAvqO.js";import"./Tooltip-CzaQDnNT.js";import"./Badge-ZDisB6f3.js";import"./Button-DpP2ynTk.js";import"./Stack-CxpqR0u_.js";import"./Card-DBKfw9XI.js";import"./CardContent-B4-OrlWs.js";import"./Chip-D9ixMYKn.js";import"./ListItem-CkS803H2.js";import"./Slider-Bed-Unaq.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
