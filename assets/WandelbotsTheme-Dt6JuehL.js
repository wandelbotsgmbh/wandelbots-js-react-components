import{j as o,M as m,e as n,C as p}from"./iframe-Ck_8_rPi.js";import{useMDXComponents as i}from"./index-D25tAKuv.js";import{muiComponents as s}from"./defaultTheme.stories-CBPzxLpl.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-D7iOTdkY.js";import"./context-B4wr4qHp.js";import"./ExpandMore-BSDRC3ft.js";import"./createSvgIcon-BPZKg3h6.js";import"./SvgIcon-ienfSbo7.js";import"./Typography-5Ydmnuwf.js";import"./Box-CRTfYKmG.js";import"./useSlot-BP0g0-qk.js";import"./mergeSlotProps-CUjb-jSh.js";import"./useControlled-C4e_OTwW.js";import"./useTheme-D2WhJaKu.js";import"./utils-B4gVlluA.js";import"./useTimeout-CaXFH3dq.js";import"./Paper-JCun0_jh.js";import"./ButtonBase-idj6tRoO.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BM9ShkUF.js";import"./styled-C3IjdeTo.js";import"./listItemTextClasses-D3LytYZK.js";import"./useThemeProps-eyjNKKy9.js";import"./getThemeProps-Wxn2q-2f.js";import"./Alert-6Vm35Ss_.js";import"./Tab-DV8du3MK.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CTBWw-Dx.js";import"./IconButton-9mJukCkq.js";import"./CircularProgress-C1ku_D3b.js";import"./getValidReactChildren-DTrRWs0n.js";import"./TablePagination-Cgx2UGgL.js";import"./Select-W1VaI4IC.js";import"./MenuItem-C9cvTgMx.js";import"./Popover-C0yMpXk8.js";import"./Portal-C2UTdt16.js";import"./Fade-62z4Qa__.js";import"./dividerClasses-ChsAyLBN.js";import"./Toolbar-DZ7A_RUf.js";import"./Tooltip-DyO9EBva.js";import"./Badge-BvMfuqZB.js";import"./Button-BmTt5xhs.js";import"./Stack-DgWh5f85.js";import"./Card-DeZkMPh0.js";import"./CardContent-BeiX0n5O.js";import"./Chip-D7wiCWYH.js";import"./ListItem-BEfQHmVh.js";import"./Slider-CWsMnsXl.js";function r(e){const t={a:"a",code:"code",h1:"h1",p:"p",...i(),...e.components};return o.jsxs(o.Fragment,{children:[`
`,`
`,`
`,o.jsx(m,{title:"Theming/Wandelbots MUI Theme"}),`
`,o.jsx(t.h1,{id:"wandelbots-mui-theme",children:"Wandelbots MUI Theme"}),`
`,o.jsxs(t.p,{children:[`The component library comes with a Wandelbots theme for Material UI which is the default theme used in this storybook.
If you like, you can use it in your own app to give the components a similar look.
The theme is accessed by calling `,o.jsx(t.code,{children:"createNovaTheme"}),", and can be ",o.jsx(t.a,{href:"?path=/docs/theming-theming-components--docs",children:"customized"})," as needed."]}),`
`,o.jsxs(t.p,{children:["The theme comes in dark and light variants using the standard MUI ",o.jsxs(t.a,{href:"https://mui.com/material-ui/customization/dark-mode/",rel:"nofollow",children:[o.jsx(t.code,{children:"palette.mode"})," option"]}),"."]}),`
`,o.jsx(n,{dark:!0,code:`
import { ThemeProvider } from "@mui/material"
import { createNovaTheme } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaTheme()

<ThemeProvider theme={theme}>
...
</ThemeProvider>
`}),`
`,o.jsx(p,{of:s,sourceState:"none"})]})}function no(e={}){const{wrapper:t}={...i(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(r,{...e})}):r(e)}export{no as default};
