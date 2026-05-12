import{j as o,M as m,e as n,C as p}from"./iframe-hXx5oMQp.js";import{useMDXComponents as r}from"./index-QLDr0DE2.js";import{muiComponents as s}from"./defaultTheme.stories-IPZj5iXG.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BcXOS-uX.js";import"./context-BPYY6mhq.js";import"./ExpandMore-oLdUnD2m.js";import"./createSvgIcon-DjscTYY8.js";import"./SvgIcon-BwYJMJ1H.js";import"./Typography-B05m_3uR.js";import"./Box-14EnU6IS.js";import"./useSlot-CtzbODUV.js";import"./mergeSlotProps-C5EnmoRF.js";import"./useControlled-DaN6Z31o.js";import"./useTheme-DRrqKVgv.js";import"./utils-BlghJGm5.js";import"./useTimeout-C6VzMoWz.js";import"./Paper-3MAz6v8d.js";import"./ButtonBase-BDET1SPp.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BWH-gwjq.js";import"./styled-CJBq1w2Z.js";import"./listItemTextClasses-Bkgjpfua.js";import"./useThemeProps-CyhkD0JX.js";import"./getThemeProps-DkGuqda-.js";import"./Alert-W1L2tL5j.js";import"./Tab-D7J4BueO.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DCgpz4Rw.js";import"./IconButton-CjO82949.js";import"./CircularProgress-WuZsF_M_.js";import"./getValidReactChildren-aLg8ETmP.js";import"./TablePagination-BaFCcl4o.js";import"./Popover-DLMtlWRc.js";import"./Portal-BsNN7h77.js";import"./Fade-FyEyWS8O.js";import"./Select-CjNm5GnI.js";import"./MenuItem-BU-2bcKx.js";import"./dividerClasses-3tvRBj86.js";import"./Toolbar-D7k-xbWq.js";import"./Tooltip-DKXOyhuY.js";import"./Badge-D80tf8mv.js";import"./Button-BHDn1__y.js";import"./Stack-BFsbkQv7.js";import"./Card-YmSBn9hc.js";import"./CardContent-CnL6kBx-.js";import"./Chip-44dGZGXI.js";import"./ListItem-DnQbCBA7.js";import"./Slider-DfNOsES0.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
