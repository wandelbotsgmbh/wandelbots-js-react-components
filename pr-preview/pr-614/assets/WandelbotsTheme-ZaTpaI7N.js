import{j as o,M as m,e as n,C as p}from"./iframe-CpXZ1sfw.js";import{useMDXComponents as r}from"./index-DpeChjgv.js";import{muiComponents as s}from"./defaultTheme.stories-CyxRtjlw.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BEXytYls.js";import"./context-DgGyg4U9.js";import"./ExpandMore-BlRaW9-e.js";import"./createSvgIcon-CIAt2Bba.js";import"./SvgIcon-CZkt748a.js";import"./Typography-W2tkGr_I.js";import"./Box-D-TT-5fZ.js";import"./useSlot-CFEqSrfB.js";import"./mergeSlotProps-BYtytRHW.js";import"./useControlled-Bm78H0iL.js";import"./useTheme-BvV1J_lS.js";import"./utils-Hm1Nsoe7.js";import"./useTimeout-BXmFU7IG.js";import"./Paper-BZARBTB4.js";import"./ButtonBase-D63WrDTT.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-B1z22wQB.js";import"./styled-DZPuci9R.js";import"./listItemTextClasses-BSW-GxPp.js";import"./useThemeProps-BzatpvyN.js";import"./getThemeProps-D8HMFAjK.js";import"./Alert-ByWu2z_f.js";import"./Tab-CJXjLaiq.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CATYtp46.js";import"./IconButton-M6m65Dft.js";import"./CircularProgress-N6Pr6J1M.js";import"./getValidReactChildren-CygeaIyE.js";import"./TablePagination-BaFW0Qbm.js";import"./Popover-TACpv38m.js";import"./Portal-CXBastih.js";import"./Fade-Bf9-aiAS.js";import"./Select-Cb_yslO0.js";import"./MenuItem-BK1zc40R.js";import"./dividerClasses-CF4eRuVQ.js";import"./Toolbar-CGqBdrIy.js";import"./Tooltip-CDsrfFTj.js";import"./Badge-C9-TwBDx.js";import"./Button-DZ52Zr9K.js";import"./Stack-BCdMOuBd.js";import"./Card-DlyGXR4X.js";import"./CardContent-CM2oP4UL.js";import"./Chip-BOQCMwCd.js";import"./ListItem-D07lmo11.js";import"./Slider-oJRYaTrq.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
