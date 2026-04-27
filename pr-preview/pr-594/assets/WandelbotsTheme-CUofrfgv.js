import{j as o,M as m,e as n,C as p}from"./iframe-Bp-eZQR_.js";import{useMDXComponents as r}from"./index-DolcIjfm.js";import{muiComponents as s}from"./defaultTheme.stories-cemHPhws.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BtNmMQuq.js";import"./context-CmvUXe3s.js";import"./ExpandMore-mtc6un3V.js";import"./createSvgIcon-BBr1DZtN.js";import"./SvgIcon-nZ7tFYYe.js";import"./Typography-D5AR0ySX.js";import"./Box-Br6ASEc1.js";import"./useSlot-BS_FAULt.js";import"./mergeSlotProps-ByuWleP4.js";import"./useControlled-OcfU0DID.js";import"./useTheme-BNgDLTr9.js";import"./utils-B8nhvYDF.js";import"./useTimeout-DLCnn4U9.js";import"./Paper-DQvVD6mu.js";import"./ButtonBase-CGYWLec6.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BO-AByLW.js";import"./styled-BKObgSi9.js";import"./listItemTextClasses-C0yIUBcz.js";import"./useThemeProps-xpqrEkCq.js";import"./getThemeProps-CXweWoHo.js";import"./Alert-BpFoM5YL.js";import"./Tab-CJ5VNzYK.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-koKiZoWi.js";import"./IconButton-7sMRwxMQ.js";import"./CircularProgress-BSiEkpaf.js";import"./getValidReactChildren-Dqo_bR9R.js";import"./TablePagination-C4-PX4pq.js";import"./Popover-BOUv47eD.js";import"./Portal-B5QEAO6-.js";import"./Fade-BvujggVO.js";import"./Select-CEwPNVop.js";import"./MenuItem-B-1xm_JQ.js";import"./dividerClasses-CAX6EUaK.js";import"./Toolbar-C5OoLHGH.js";import"./Tooltip-4scpCQzo.js";import"./Badge-C5IJ0lSn.js";import"./Button-bsiYTJib.js";import"./Stack-uLGyNHmk.js";import"./Card-C1BWU_DN.js";import"./CardContent-CzTtSCxF.js";import"./Chip-BPwvTcT5.js";import"./ListItem-Cdlb5Ufj.js";import"./Slider-R9dqCe-6.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
