import{j as o,M as m,e as n,C as p}from"./iframe-BuuPyDNL.js";import{useMDXComponents as r}from"./index-CKbMnS24.js";import{muiComponents as s}from"./defaultTheme.stories-ChgfEpu1.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-C-qzYzHb.js";import"./context-NHSCVuX4.js";import"./ExpandMore-DVCs5hW0.js";import"./createSvgIcon-Bzq0m25E.js";import"./SvgIcon-DcGW5tyF.js";import"./Typography-DKwhcGvn.js";import"./Box-DmNL1czu.js";import"./useSlot-Bc-0cQ1b.js";import"./mergeSlotProps-B7CrqStn.js";import"./useControlled-DyvrEtyM.js";import"./useTheme-EvfctsYy.js";import"./utils-IGTPJ_th.js";import"./useTimeout-DQEzINZ6.js";import"./Paper-C1gOATfU.js";import"./ButtonBase-BhgQEx9s.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CMh7qyWq.js";import"./styled-KxI98Yl1.js";import"./listItemTextClasses-DRLcrXcs.js";import"./useThemeProps-C7Jr8d6z.js";import"./getThemeProps-B9EUPU2l.js";import"./Alert-DbHdESF0.js";import"./Tab-CopY2xfK.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-2nyAoVM_.js";import"./IconButton-1xnEV7uZ.js";import"./CircularProgress-9f38TWZJ.js";import"./getValidReactChildren-B3cjLp0W.js";import"./TablePagination-CncYpqmH.js";import"./Select-B7FLkjfH.js";import"./MenuItem-C45ZTdQ2.js";import"./Popover-DSSwHFBD.js";import"./Portal-fhE7VVxo.js";import"./Fade-DYqDU9q6.js";import"./dividerClasses-ToQBN7ZJ.js";import"./Toolbar-BN-xTHz3.js";import"./Tooltip-BGX7nqbB.js";import"./Badge-BuR-oU-y.js";import"./Button-3q8uASl3.js";import"./Stack-m3tCKIbj.js";import"./Card-CtB-d76E.js";import"./CardContent-DL0msm7y.js";import"./Chip-Df4M38Xh.js";import"./ListItem-BcB_F0qM.js";import"./Slider-ZI1qWi6t.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
