import{j as o,M as m,e as n,C as p}from"./iframe-B7eLhB1G.js";import{useMDXComponents as r}from"./index-D3dSVpuR.js";import{muiComponents as s}from"./defaultTheme.stories-DtqMRwII.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-D4IaLvUJ.js";import"./context-C66GAeig.js";import"./ExpandMore-B-DI61W3.js";import"./createSvgIcon-UCPh6Xpv.js";import"./SvgIcon-DbAvX_u_.js";import"./Typography-BIi6HOl1.js";import"./Box-CcKEiYfK.js";import"./useSlot-BR0XpeGg.js";import"./mergeSlotProps-CHFRxy9U.js";import"./useControlled-DXGWV2sT.js";import"./useTheme-IUPPQnTY.js";import"./utils-DiJe37tT.js";import"./useTimeout-DlGHZIfH.js";import"./Paper-bHYUPcQX.js";import"./ButtonBase-B-i_deDD.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BPJ-VdF0.js";import"./styled-DxMcYi3O.js";import"./listItemTextClasses-Reo79Ye1.js";import"./useThemeProps-DQl74Wc6.js";import"./getThemeProps-DxLpSNSy.js";import"./Alert-6XWm531k.js";import"./Tab-CzYDunOu.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-Miadi8ka.js";import"./IconButton-BrfOctZK.js";import"./CircularProgress-c4b45OuK.js";import"./getValidReactChildren-a_8z_1-O.js";import"./TablePagination-Cp5NdknE.js";import"./Popover-gNHlVkoy.js";import"./Portal-Di0PKSQE.js";import"./Fade-BbENL1qV.js";import"./Select-CY201DMi.js";import"./MenuItem-CiUdOvEy.js";import"./dividerClasses-CfoS94OU.js";import"./Toolbar-Bs3liMuU.js";import"./Tooltip-BnKGxM2o.js";import"./Badge-DAop3ewv.js";import"./Button-CylckVM6.js";import"./Stack-Bukd3C8T.js";import"./Card-Bc37VO55.js";import"./CardContent-BykTBoPC.js";import"./Chip-Cj3IXezV.js";import"./ListItem-auOPuodB.js";import"./Slider-npyyyMct.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
