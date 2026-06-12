import{j as o,M as m,e as n,C as p}from"./iframe-DdP0gaRT.js";import{useMDXComponents as r}from"./index-CvXhWj1T.js";import{muiComponents as s}from"./defaultTheme.stories-4ejD-lb4.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DYYMF-Xu.js";import"./context-CA18Ijjg.js";import"./ExpandMore-Cz6fr3hP.js";import"./createSvgIcon-BmmSVAeq.js";import"./SvgIcon-BF3ERyFN.js";import"./Typography-DghpXaWt.js";import"./Box-B-240vSN.js";import"./useSlot-C69o2CCu.js";import"./mergeSlotProps-D6JNy1kg.js";import"./useControlled-4mRriWGc.js";import"./useTheme-DJ3h7S-r.js";import"./utils-DC5ZCaJW.js";import"./useTimeout-CCZk6BFH.js";import"./Paper-CpMJbD_J.js";import"./ButtonBase-sdHY-SuN.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BceVmJCF.js";import"./styled-Da8LGzWK.js";import"./listItemTextClasses-CvS36jRq.js";import"./useThemeProps-CHGYTIAi.js";import"./getThemeProps-Bmz9uF9q.js";import"./Alert-B3Y_kESE.js";import"./Tab-jCBZ3nKp.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BL6fQqk9.js";import"./IconButton-DrQts_By.js";import"./CircularProgress-D2kMgvm6.js";import"./getValidReactChildren-y0YysrG-.js";import"./TablePagination-CeYstL_Y.js";import"./Popover-pPWH3ET-.js";import"./Portal-Com9JgI_.js";import"./Fade-BGLAtZtN.js";import"./Select-ronOjHVh.js";import"./MenuItem-BFd_eNqI.js";import"./dividerClasses-DW_ElmwJ.js";import"./Toolbar-DSsKqdQc.js";import"./Tooltip-Owp41Auy.js";import"./Badge-WSO8_fGJ.js";import"./Button-DjGdxunT.js";import"./Stack-CA7ZlAeE.js";import"./Card-D24pLHxD.js";import"./CardContent-B63PzEXG.js";import"./Chip-DbtM8Nc2.js";import"./ListItem-R728uaA0.js";import"./Slider-B_bbswrG.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
