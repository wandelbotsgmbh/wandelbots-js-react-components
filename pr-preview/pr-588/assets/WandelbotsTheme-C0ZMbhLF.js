import{j as o,M as m,e as n,C as p}from"./iframe-BBM-L_pJ.js";import{useMDXComponents as r}from"./index-DPhOJaQW.js";import{muiComponents as s}from"./defaultTheme.stories-Z7wD8v7f.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-D9OW_3-K.js";import"./context-BXkv4zTp.js";import"./ExpandMore-BqBMGan4.js";import"./createSvgIcon-CziPth_L.js";import"./SvgIcon-Cbpv0Ybw.js";import"./Typography-CK1K8DgU.js";import"./Box-D5ATEn0N.js";import"./useSlot-CJ0-TgTC.js";import"./mergeSlotProps-B89aSjOD.js";import"./useControlled-Ba1gLORI.js";import"./useTheme-DhQJaoBr.js";import"./utils-CGnuWxAw.js";import"./useTimeout-pXozlHN-.js";import"./Paper-C7sSHZyj.js";import"./ButtonBase-BcFc2VdP.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DbMp4iCl.js";import"./styled-ePcSnPHF.js";import"./listItemTextClasses-CQsqpQ0B.js";import"./useThemeProps-CsOtnOGF.js";import"./getThemeProps-8w1TVfyq.js";import"./Alert-kXhTW-mp.js";import"./Tab-7mFGkdY6.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-hQX5-9E0.js";import"./IconButton-CZD6Lyiv.js";import"./CircularProgress-BHblJfLb.js";import"./getValidReactChildren-BJM8H7dk.js";import"./TablePagination-B4foEUA_.js";import"./Popover-C7wRrVjK.js";import"./Portal-Bc46UTZ3.js";import"./Fade-Bnz_P2x0.js";import"./Select-Bcb7iVE0.js";import"./MenuItem-h1sohUZd.js";import"./dividerClasses-HSrufICD.js";import"./Toolbar-Bs6kW2d1.js";import"./Tooltip-V83YoNW-.js";import"./Badge-Bv84tBem.js";import"./Button-gQgqIJED.js";import"./Stack-VysfzjV0.js";import"./Card-ClLlSOyd.js";import"./CardContent-DRPliCk2.js";import"./Chip-B_Sn0seX.js";import"./ListItem-CnyQHxC8.js";import"./Slider-BpPW1d67.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
