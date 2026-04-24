import{j as o,M as m,e as n,C as p}from"./iframe-VNBGIUsT.js";import{useMDXComponents as r}from"./index-CaAAU8-B.js";import{muiComponents as s}from"./defaultTheme.stories-RnNyG0Cg.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-CKt-t5hp.js";import"./context-BqaCWgSm.js";import"./ExpandMore-BwtbpDwV.js";import"./createSvgIcon-DZEjwLoB.js";import"./SvgIcon-DIfmOT3J.js";import"./Typography-_xEovoiV.js";import"./Box-DihJe2Ys.js";import"./useSlot-Ci7jmD9b.js";import"./mergeSlotProps-CT6FaOui.js";import"./useControlled-8ikIL7Hh.js";import"./useTheme-DnoFIzLK.js";import"./utils-Bt8_1HxM.js";import"./useTimeout-D_QrI38A.js";import"./Paper-OBowjlcs.js";import"./ButtonBase-mCKICush.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CChjw174.js";import"./styled-BFy2eu4m.js";import"./listItemTextClasses-BZLiB4NU.js";import"./useThemeProps-DlFpyEcu.js";import"./getThemeProps-CAhrhVde.js";import"./Alert-DLL7x8dt.js";import"./Close-DlgNSEpq.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BBL2hYhL.js";import"./IconButton-zsDAKERl.js";import"./CircularProgress-xt0Se-Jn.js";import"./getValidReactChildren-CFOfgBtC.js";import"./TablePagination-BLDj7EVO.js";import"./Popover-BD7XWTCb.js";import"./Portal-Bq3bGXdR.js";import"./Fade-Bsc3Qe_9.js";import"./Select-DS3CWJ6S.js";import"./MenuItem-B8Uck2ve.js";import"./dividerClasses-DpD-BCCf.js";import"./Toolbar-Cgu7srT9.js";import"./Tooltip-DEu4WgIy.js";import"./Badge-BbhDtfMD.js";import"./Button-CdB_hC51.js";import"./Stack-CWw0eW2v.js";import"./Card-B59gLQoz.js";import"./CardContent-Wuh3fi5p.js";import"./Chip-BiBFuCTX.js";import"./ListItem-DkMCsgVl.js";import"./Slider-BSyoVbdu.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
