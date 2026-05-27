import{j as o,M as m,e as n,C as p}from"./iframe-44hoIhP5.js";import{useMDXComponents as r}from"./index-C14ySbsR.js";import{muiComponents as s}from"./defaultTheme.stories-qCfhautp.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-CO3o4x07.js";import"./context-CRXxSswD.js";import"./ExpandMore-C5FaCqxW.js";import"./createSvgIcon-BDo7lS3l.js";import"./SvgIcon-CqUiKtq6.js";import"./Typography-BvzhM_O5.js";import"./Box-DKrR8TZY.js";import"./useSlot-0MBGqVe7.js";import"./mergeSlotProps-m-QT1kb6.js";import"./useControlled-DOaGVFmw.js";import"./useTheme-DDsUOZZW.js";import"./utils-CT7Acchw.js";import"./useTimeout-B9Hv7638.js";import"./Paper-BlN86j55.js";import"./ButtonBase-Bgn2EZlQ.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Cw_GlL9K.js";import"./styled-244R6eLn.js";import"./listItemTextClasses-DUz29HtO.js";import"./useThemeProps-BXYlZaLn.js";import"./getThemeProps-CV7cE1Dp.js";import"./Alert-BcbxwhLm.js";import"./Tab-Cf5852KE.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-iZprujtb.js";import"./IconButton-CjQWLDqc.js";import"./CircularProgress-C4fjEma5.js";import"./getValidReactChildren-Bs0U7isG.js";import"./TablePagination-DVZVuKjd.js";import"./Popover-CmGW7EoJ.js";import"./Portal-D1f_ot7q.js";import"./Fade-C0yU-RH2.js";import"./Select-DturI76y.js";import"./MenuItem-5oA_-LIL.js";import"./dividerClasses-Ks-kWDZK.js";import"./Toolbar-Dc44NQtT.js";import"./Tooltip-CFA4GbZH.js";import"./Badge-8WpuK5y9.js";import"./Button-Df_yjjlD.js";import"./Stack-DKD_mngY.js";import"./Card-DC1n4e0H.js";import"./CardContent-DQguUloq.js";import"./Chip-CPbObkcS.js";import"./ListItem-BoS3Ispi.js";import"./Slider-BjDwBpma.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
