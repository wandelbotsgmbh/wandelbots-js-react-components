import{j as o,M as m,e as n,C as p}from"./iframe-CAKmp4rk.js";import{useMDXComponents as r}from"./index-Dt8xiTB0.js";import{muiComponents as s}from"./defaultTheme.stories-iVnBcL0o.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DFr6_erU.js";import"./context-Dyvr6kXv.js";import"./ExpandMore-Bg_t3Aws.js";import"./createSvgIcon-BdnYsR2H.js";import"./SvgIcon-lT4dItk1.js";import"./Typography-APz3h4le.js";import"./Box-cojHj64w.js";import"./useSlot-KeS48scm.js";import"./mergeSlotProps-D3MCcSy3.js";import"./useControlled-BhICY6xO.js";import"./useTheme-aBLdMIW5.js";import"./utils-DsxKZj0F.js";import"./useTimeout-CO-grCLr.js";import"./Paper-DciqH-ZU.js";import"./ButtonBase-prxtXDoG.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Cu-RCsHx.js";import"./styled-8O9hxnuF.js";import"./listItemTextClasses-DXqa03lp.js";import"./useThemeProps-IzrxH-NF.js";import"./getThemeProps-y04XkB-q.js";import"./Alert-Cp6Vd1DV.js";import"./Tab-DIqVb73k.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-C55IjNaP.js";import"./IconButton-Utnw2syr.js";import"./CircularProgress-BigYyNVf.js";import"./getValidReactChildren-CHld9ZOA.js";import"./TablePagination-CQUPX0LR.js";import"./Popover-DyqoPakX.js";import"./Portal-D3SvCFT3.js";import"./Fade-DS2YC1OP.js";import"./Select-BJs0l-a6.js";import"./MenuItem-Bx26uCvw.js";import"./dividerClasses-DxQJEgPW.js";import"./Toolbar-FY93ytAJ.js";import"./Tooltip-CpkeiJpf.js";import"./Badge-CmZIMBfY.js";import"./Button-Dfebia43.js";import"./Stack-CEioPeho.js";import"./Card-DnjDdAOo.js";import"./CardContent-B98GnlBG.js";import"./Chip-BOwMf3_c.js";import"./ListItem-NaIeyxQY.js";import"./Slider-0M9WeRt6.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
