import{j as o,M as m,e as n,C as p}from"./iframe-CjkWaB0r.js";import{useMDXComponents as r}from"./index-CXHC9Mr7.js";import{muiComponents as s}from"./defaultTheme.stories-DENZOGBU.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-xf8oVIAh.js";import"./context-6Lwi58kF.js";import"./ExpandMore-t4Xnt_DL.js";import"./createSvgIcon-BPZeSsoz.js";import"./SvgIcon-CKDKiHSc.js";import"./Typography-D-u8sNmY.js";import"./Box-DpEzWbYz.js";import"./useSlot-t_aYngUb.js";import"./mergeSlotProps-B06vc6RE.js";import"./useControlled-BRGJcJ5q.js";import"./useTheme-Bk4_ueQb.js";import"./utils-BI6BwBf9.js";import"./useTimeout-CWUswA-U.js";import"./Paper-BAz4g2wF.js";import"./ButtonBase-CemTr4II.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BzP20zVE.js";import"./styled-AyDrVyP9.js";import"./listItemTextClasses-Cu_k14aa.js";import"./useThemeProps-CSGMSxPc.js";import"./getThemeProps-DF-Ra3BQ.js";import"./Alert-DgnPYXu6.js";import"./Tab-CzsBWHFR.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DL1aIr2Y.js";import"./IconButton-DwBaVFAI.js";import"./CircularProgress-B6pQwjho.js";import"./getValidReactChildren-Rss1cyvr.js";import"./TablePagination-BDAN1HXm.js";import"./Popover-eUO7yTZF.js";import"./Portal-Bz29Sl6k.js";import"./Fade-Dxls6hfm.js";import"./Select-DQ0T1oeA.js";import"./MenuItem-DCixZLnk.js";import"./dividerClasses-D40HZ8Rf.js";import"./Toolbar-Cxs2WEHI.js";import"./Tooltip-BMy6SxmX.js";import"./Badge-tuZWPg3o.js";import"./Button-Cm6cd10T.js";import"./Stack-BDML2keN.js";import"./Card-ejKaM2lD.js";import"./CardContent-B_EgDu0p.js";import"./Chip-D1wnZo2T.js";import"./ListItem-h71DNjct.js";import"./Slider-B-LlarhK.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
