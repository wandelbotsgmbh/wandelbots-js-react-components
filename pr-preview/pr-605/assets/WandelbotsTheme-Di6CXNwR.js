import{j as o,M as m,e as n,C as p}from"./iframe-DnBW-mpw.js";import{useMDXComponents as r}from"./index-B9tO1nFs.js";import{muiComponents as s}from"./defaultTheme.stories-BaG09ydO.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DGARq3aG.js";import"./context-B7Ar4VFo.js";import"./ExpandMore-jtdm0xvQ.js";import"./createSvgIcon-ORYM7w_U.js";import"./SvgIcon-BpNUpoak.js";import"./Typography-BYquKsyX.js";import"./Box-BQeZ9a7Q.js";import"./useSlot-jqsv08Jr.js";import"./mergeSlotProps-BwXq9l2S.js";import"./useControlled-Cacd_F9b.js";import"./useTheme-BFoiBZoy.js";import"./utils-BLfcrTUy.js";import"./useTimeout-B7h2j2mv.js";import"./Paper-DNJytLmK.js";import"./ButtonBase-B3B59gZR.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CGQPN76g.js";import"./styled-CoOsKz8W.js";import"./listItemTextClasses-Bmz8JzJT.js";import"./useThemeProps-C_VMY15T.js";import"./getThemeProps-Bp3Nlaib.js";import"./Alert-D6LY7nwB.js";import"./Tab-DBxd1GDJ.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-C1JHAfse.js";import"./IconButton-CEH1jFOg.js";import"./CircularProgress-Dbo39_Tt.js";import"./getValidReactChildren-CZQZtOBP.js";import"./TablePagination-08WiCCWW.js";import"./Popover-D6ZaQDXf.js";import"./Portal-CnFJN2Rv.js";import"./Fade-CvmBYJuf.js";import"./Select-CaaTvU43.js";import"./MenuItem-D-rCr5cI.js";import"./dividerClasses-BSTHesXm.js";import"./Toolbar-BcYCasUh.js";import"./Tooltip-DNQ-KsbP.js";import"./Badge-CA4l0K0O.js";import"./Button-B9bWVl4C.js";import"./Stack-BCUYuGcw.js";import"./Card-BT5V7duP.js";import"./CardContent-C0s1tzGX.js";import"./Chip-VckikFbg.js";import"./ListItem-Dy55o99o.js";import"./Slider-uN-2JOJD.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
