import{j as o,M as m,e as n,C as p}from"./iframe-CKnMv-q-.js";import{useMDXComponents as r}from"./index-COT5TnJa.js";import{muiComponents as s}from"./defaultTheme.stories-DQ2tYBKy.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BLq6MfI8.js";import"./context-BwLpVNGx.js";import"./ExpandMore-DRk82Qys.js";import"./createSvgIcon-22tDeSxu.js";import"./SvgIcon-BXipr3fz.js";import"./Typography-CtqVY7OF.js";import"./Box-2WcZy4OE.js";import"./useSlot-DfW1Qxse.js";import"./mergeSlotProps-C-MiaO5i.js";import"./useControlled-D6OTga_k.js";import"./useTheme-JMl8CxOu.js";import"./utils-DeyaSgWs.js";import"./useTimeout-Ds47fsbn.js";import"./Paper-DbunMG_e.js";import"./ButtonBase-BsnTmO4Y.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CbRWfFdx.js";import"./styled-BFZVIFTe.js";import"./listItemTextClasses-CLHBkTwn.js";import"./useThemeProps-rt0Ibdir.js";import"./getThemeProps-B6_c1AsR.js";import"./Alert-Dp1duk69.js";import"./Tab-CNB7_ftG.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-ukMyzBOJ.js";import"./IconButton-iS-WVmoX.js";import"./CircularProgress-Ch8mMNCX.js";import"./getValidReactChildren-BGL6NY5W.js";import"./TablePagination-HNdAkGqI.js";import"./Popover-DvkUIKtC.js";import"./Portal-CjaVblo0.js";import"./Fade-DtQi7c9_.js";import"./Select-BdLihiPL.js";import"./MenuItem-CvaHqA6W.js";import"./dividerClasses-DxP3upp4.js";import"./Toolbar-C-r9AZBF.js";import"./Tooltip-BSojX3JE.js";import"./Badge-bx1gS0BB.js";import"./Button-hC2JayWv.js";import"./Stack-rPrAmSD9.js";import"./Card-CvSnHE1P.js";import"./CardContent-BpLr2X_f.js";import"./Chip-BcKtvrpo.js";import"./ListItem--JzFNcPB.js";import"./Slider-BAddgImB.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
