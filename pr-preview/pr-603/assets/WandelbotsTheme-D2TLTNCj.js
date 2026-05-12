import{j as o,M as m,e as n,C as p}from"./iframe-CFL8p0Ds.js";import{useMDXComponents as r}from"./index-CUY-zwZ8.js";import{muiComponents as s}from"./defaultTheme.stories-CJ8blI4c.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-FyvlocEs.js";import"./context-BnQZ-WQd.js";import"./ExpandMore-B5z1REYV.js";import"./createSvgIcon-DuDYgGcf.js";import"./SvgIcon-yWN82Agu.js";import"./Typography-BnZJVhAb.js";import"./Box-Cl7-mo-_.js";import"./useSlot-D61Lckvr.js";import"./mergeSlotProps-ZbsI7CjF.js";import"./useControlled-A2mDahpW.js";import"./useTheme-DRw8hrsD.js";import"./utils-8hLKq199.js";import"./useTimeout-zF1KbbjZ.js";import"./Paper-BA6JPuV7.js";import"./ButtonBase-Dy2NmHJ6.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DeFKvlOu.js";import"./styled-BN63rhj0.js";import"./listItemTextClasses-DzsSB9Ar.js";import"./useThemeProps-BHHQx-__.js";import"./getThemeProps-jEEsBWVU.js";import"./Alert-CvzSYS_C.js";import"./Tab-BXuDoHq5.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-Bp-s0Qxh.js";import"./IconButton-CGMBzQI4.js";import"./CircularProgress-MLUDSYP1.js";import"./getValidReactChildren-BESWTF8v.js";import"./TablePagination-BqOfTKv_.js";import"./Popover-B_3mbTo9.js";import"./Portal-4moZPUDp.js";import"./Fade-DeJtR000.js";import"./Select-D8pu2vKh.js";import"./MenuItem-DDzjEaQj.js";import"./dividerClasses-B0AGhz01.js";import"./Toolbar-CasMtvvR.js";import"./Tooltip-Bji0588O.js";import"./Badge-D3bug0XK.js";import"./Button-C3ADz-zL.js";import"./Stack-Ct_AAowl.js";import"./Card-DCcFiGdu.js";import"./CardContent-DPKlf47u.js";import"./Chip-CdyjOH6s.js";import"./ListItem-CIpqS5fd.js";import"./Slider-DW_ssf6J.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
