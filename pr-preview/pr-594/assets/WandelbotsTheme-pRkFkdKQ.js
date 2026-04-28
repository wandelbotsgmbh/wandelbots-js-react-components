import{j as o,M as m,e as n,C as p}from"./iframe-Dioa7UMG.js";import{useMDXComponents as r}from"./index-B2i1Lj_E.js";import{muiComponents as s}from"./defaultTheme.stories-Bf-9E784.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BHp_e4nK.js";import"./context-pjyp2Uec.js";import"./ExpandMore-CbeSqW8g.js";import"./createSvgIcon-CUohqrN-.js";import"./SvgIcon-BreQU8Nv.js";import"./Typography-Ct8eltDp.js";import"./Box-DwFKJR9J.js";import"./useSlot-ByoEJRxC.js";import"./mergeSlotProps-C-04uEyJ.js";import"./useControlled-BMaQ2mr9.js";import"./useTheme-BIwUcHuI.js";import"./utils-_QLH5w0x.js";import"./useTimeout-CqZh_w3x.js";import"./Paper-CYh5dMRB.js";import"./ButtonBase-CNL7BMjL.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-M7lTfGcK.js";import"./styled-DYg-3ueW.js";import"./listItemTextClasses-xfpx5bLS.js";import"./useThemeProps-BBz7e_HX.js";import"./getThemeProps-BQMZ-h3r.js";import"./Alert-B5EC8YG4.js";import"./Tab-BqNkjygN.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DaNhISQS.js";import"./IconButton-CMuU0xcf.js";import"./CircularProgress-C7et44Ll.js";import"./getValidReactChildren-DSTwJSHx.js";import"./TablePagination-V2m3cZfi.js";import"./Popover-DirfpScr.js";import"./Portal-CiRqKTff.js";import"./Fade-B52xdSA2.js";import"./Select-BohklmyS.js";import"./MenuItem-DSsgtAoU.js";import"./dividerClasses--z_TqbR-.js";import"./Toolbar-Cn2H0Uee.js";import"./Tooltip-CdZr_3KJ.js";import"./Badge-C-SHuemj.js";import"./Button-D6mtfsPx.js";import"./Stack-CNgnP__l.js";import"./Card-Dnfib_gf.js";import"./CardContent-D9intlbz.js";import"./Chip-CYDqbqsx.js";import"./ListItem-Dz0yUPk_.js";import"./Slider-BS8v10LE.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
