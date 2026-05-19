import{j as o,M as m,e as n,C as p}from"./iframe-BTBeAsGn.js";import{useMDXComponents as r}from"./index-CJg0040u.js";import{muiComponents as s}from"./defaultTheme.stories-COs85fzi.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-CPc1pQiz.js";import"./context-DSAlxZkO.js";import"./ExpandMore-C0fwZLPi.js";import"./createSvgIcon-DRN8_Qu_.js";import"./SvgIcon-zdK7aDKR.js";import"./Typography-BQZQt3va.js";import"./Box-O-7_eFcf.js";import"./useSlot-CVqA8j2k.js";import"./mergeSlotProps-_774ZHLG.js";import"./useControlled-9K7FkiU1.js";import"./useTheme-Bcw-BlOg.js";import"./utils-S-grsyyM.js";import"./useTimeout-B7U5osWj.js";import"./Paper-D5GN9JLL.js";import"./ButtonBase-D4kGo-p3.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-pU22F_1N.js";import"./styled-BdLycTVy.js";import"./listItemTextClasses-BTaVUXPn.js";import"./useThemeProps-CFuQLnvW.js";import"./getThemeProps-Y_cGgDsp.js";import"./Alert-DYG7by7f.js";import"./Tab-Cp6NNAIc.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CziHO3GH.js";import"./IconButton-D-GzSN6H.js";import"./CircularProgress-ZGbW9JZL.js";import"./getValidReactChildren-C6Oh0s6v.js";import"./TablePagination-CTT-joWV.js";import"./Popover-CvqlVAYR.js";import"./Portal-0oFzKt9q.js";import"./Fade-B9uYpnvg.js";import"./Select-CJhsoa8P.js";import"./MenuItem-DE7QnUJM.js";import"./dividerClasses-BffnPp4h.js";import"./Toolbar-BVk8BYJv.js";import"./Tooltip-BWqa4y7_.js";import"./Badge-BV9cE_LP.js";import"./Button-B1DmizTi.js";import"./Stack-C2dxL4Xl.js";import"./Card-CggUOl1x.js";import"./CardContent-C-4doLzN.js";import"./Chip-vEEIr2Y-.js";import"./ListItem-B6yWjIkg.js";import"./Slider-XNhV3OQQ.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
