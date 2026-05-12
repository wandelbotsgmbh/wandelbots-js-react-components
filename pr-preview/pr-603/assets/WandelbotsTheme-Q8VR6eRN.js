import{j as o,M as m,e as n,C as p}from"./iframe-CTXJna5z.js";import{useMDXComponents as r}from"./index-CldcGkGi.js";import{muiComponents as s}from"./defaultTheme.stories-BZvBwIpK.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-CG2_aJmX.js";import"./context-D710SZCY.js";import"./ExpandMore-BN-LoGbA.js";import"./createSvgIcon-921n9FUR.js";import"./SvgIcon-BcMHFmlH.js";import"./Typography-ChVS9r8q.js";import"./Box-CJqBV3my.js";import"./useSlot-CCRHhE0S.js";import"./mergeSlotProps-D26Zj0ke.js";import"./useControlled-BSyizBJp.js";import"./useTheme-DNYSHzv7.js";import"./utils-CYH3bSy_.js";import"./useTimeout-DlxaCm6p.js";import"./Paper-BlgjF9z7.js";import"./ButtonBase-DjbfjuLU.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CBUKSs35.js";import"./styled-_rnDdv6m.js";import"./listItemTextClasses-BWpS95jW.js";import"./useThemeProps-CjyaSlQl.js";import"./getThemeProps-Bv2vVnUP.js";import"./Alert-CHb6qYzQ.js";import"./Tab-ptPh2VTK.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DShK-e95.js";import"./IconButton-fVHP6YAy.js";import"./CircularProgress-Dy51q-Vj.js";import"./getValidReactChildren-C0GgTy2y.js";import"./TablePagination-BxV7mS9O.js";import"./Popover-Bp6R_hEa.js";import"./Portal-Dv8OU4SL.js";import"./Fade-C6-zWtrx.js";import"./Select-z9XtF5WE.js";import"./MenuItem-D0nNFOsM.js";import"./dividerClasses-DCWLtBv-.js";import"./Toolbar-DjMh6CA_.js";import"./Tooltip-BrS46HJi.js";import"./Badge-B2KGI7ZC.js";import"./Button-DbqO249p.js";import"./Stack-CNPQ083j.js";import"./Card-CMkZso9j.js";import"./CardContent-DYHstuop.js";import"./Chip-DZJUWiEG.js";import"./ListItem-BmGPJ6Bv.js";import"./Slider-CrLFz9jc.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
