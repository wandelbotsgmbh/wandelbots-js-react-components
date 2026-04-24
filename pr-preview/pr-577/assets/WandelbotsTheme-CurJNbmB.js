import{j as o,M as m,e as n,C as p}from"./iframe-BAbLwoVP.js";import{useMDXComponents as r}from"./index-BdSXySMh.js";import{muiComponents as s}from"./defaultTheme.stories-gUHXRbCV.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-CbtIm1gA.js";import"./context-Cpegwh7k.js";import"./ExpandMore-YZtKnPHi.js";import"./createSvgIcon-CISxd6WL.js";import"./SvgIcon-rAAhGlnv.js";import"./Typography-Dj9A1KJz.js";import"./Box-CYDdlylx.js";import"./useSlot-CZX-5yEn.js";import"./mergeSlotProps-BBftFkGD.js";import"./useControlled-Bs1xI5T1.js";import"./useTheme-Ci7JcOyo.js";import"./utils-CjtlAP_o.js";import"./useTimeout-DcHxBoad.js";import"./Paper-Vl9WxGDO.js";import"./ButtonBase-CLBSmLNh.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CwYzETqx.js";import"./styled-CjPHcWNK.js";import"./listItemTextClasses-EBuWJ8Uu.js";import"./useThemeProps-SahJ4aIa.js";import"./getThemeProps-BN_77y89.js";import"./Alert-Ga1eBVau.js";import"./Tab-mkh3We2S.js";import"./getActiveElement-DxURyTVq.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BWZapZRn.js";import"./IconButton-DUpKTgEz.js";import"./CircularProgress-BY7j-tft.js";import"./getValidReactChildren-CsdyRWRl.js";import"./TablePagination-Ck21EFMh.js";import"./Popover-BjSURI00.js";import"./Portal-DTDfDT7O.js";import"./Fade-DkzvUp7O.js";import"./Select-jvFapZqY.js";import"./MenuItem-Dli-WI5z.js";import"./dividerClasses-N20-8wuD.js";import"./Toolbar-CpLri7Y4.js";import"./Tooltip-DmOea01r.js";import"./Badge-D24OET8O.js";import"./Button-CX_FRzwU.js";import"./Stack-iF9PR87R.js";import"./Card-DexegO2i.js";import"./CardContent-BDPTlCwT.js";import"./Chip-C4l5g6vv.js";import"./ListItem-BqeN1TNk.js";import"./Slider-2roIOQFt.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
