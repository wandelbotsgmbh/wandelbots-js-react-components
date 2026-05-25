import{j as o,M as m,e as n,C as p}from"./iframe-CrnI26pq.js";import{useMDXComponents as r}from"./index-DXN0MUOF.js";import{muiComponents as s}from"./defaultTheme.stories-OJkNx8Z1.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-C6R6DUdk.js";import"./context-BMRpBBQQ.js";import"./ExpandMore-DVjnaxM4.js";import"./createSvgIcon-B4c6XfeA.js";import"./SvgIcon-ClYQLYi8.js";import"./Typography-Bjdz118C.js";import"./Box-jw_GGJTT.js";import"./useSlot-C17nw9RZ.js";import"./mergeSlotProps-BxcAXsM5.js";import"./useControlled-T928lM1P.js";import"./useTheme-BLJFR6cv.js";import"./utils-CUEv2nuH.js";import"./useTimeout-CK740mVH.js";import"./Paper-BRv-Tz-m.js";import"./ButtonBase-DTs6PPNJ.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DLZlh_hl.js";import"./styled--BcJjMEz.js";import"./listItemTextClasses-DiAqBBuu.js";import"./useThemeProps-CUED_EFs.js";import"./getThemeProps-COHO8jbd.js";import"./Alert-Bv6pca36.js";import"./Tab-BPZEqFfr.js";import"./getActiveElement-DxURyTVq.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DcedS0zY.js";import"./IconButton-PtOsaORq.js";import"./CircularProgress-BJc8XS3H.js";import"./getValidReactChildren-Cc5dAQu9.js";import"./TablePagination-DmlOqGrJ.js";import"./Popover-BSJn5iSw.js";import"./Portal-CGminMKw.js";import"./Fade-CknnbYUa.js";import"./Select-CdctDk4l.js";import"./MenuItem-BhGKJO80.js";import"./dividerClasses-B-AHBhf4.js";import"./Toolbar-B-qrdczO.js";import"./Tooltip-BABCQ06S.js";import"./Badge-BGzgQarc.js";import"./Button-DNksvveI.js";import"./Stack-Bv51tItc.js";import"./Card-xpSMKyvL.js";import"./CardContent-CwLMUd3T.js";import"./Chip-34xSMTde.js";import"./ListItem-BwjLUKsS.js";import"./Slider-DwBMnDLQ.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
`,o.jsx(p,{of:s,sourceState:"none"})]})}function mo(e={}){const{wrapper:t}={...r(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(i,{...e})}):i(e)}export{mo as default};
