import{j as o,M as m,e as n,C as p}from"./iframe-DOFV3qMp.js";import{useMDXComponents as r}from"./index-RSlysZkc.js";import{muiComponents as s}from"./defaultTheme.stories-CNULc6mn.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BvFwLKPO.js";import"./context-BKk3ZerB.js";import"./ExpandMore-sK54_WFc.js";import"./createSvgIcon-9WOo4EIx.js";import"./SvgIcon-Cms0l4xT.js";import"./Typography-whG0rXfO.js";import"./Box-COYdint4.js";import"./useSlot-BP5_SMj3.js";import"./mergeSlotProps-DvZl-0P8.js";import"./useControlled-DjHS7a5v.js";import"./useTheme-Di2OtXAQ.js";import"./utils-UBy_vJjt.js";import"./useTimeout-BLz4VzWu.js";import"./Paper-B5_AfT_p.js";import"./ButtonBase-BCwvd70N.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CIYTpUs5.js";import"./styled-lyJmsatx.js";import"./listItemTextClasses-iz72LTFy.js";import"./useThemeProps-D-62jMOk.js";import"./getThemeProps-BvAQ1KVd.js";import"./Alert-CdPLC9lo.js";import"./Tab-CZZ03aPS.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DlO16BSe.js";import"./IconButton-Bxsl-23L.js";import"./CircularProgress-CgyNkRzM.js";import"./getValidReactChildren-D6KyY9iS.js";import"./TablePagination-D022IUij.js";import"./Popover-B372jZ5R.js";import"./Portal-aykiK9SZ.js";import"./Fade-B8WvNpXz.js";import"./Select-CJEhWlc6.js";import"./MenuItem-Dd24l5OX.js";import"./dividerClasses-DjJBTqjk.js";import"./Toolbar-D6io5san.js";import"./Tooltip-BBwdeV7M.js";import"./Badge-CTSWC7M9.js";import"./Button-CQ-Mzu5s.js";import"./Stack-CCVEjtxj.js";import"./Card-Boer5DFe.js";import"./CardContent-B3SRbT86.js";import"./Chip-C8kDhQy0.js";import"./ListItem-D0SURr_g.js";import"./Slider-CZIJRd5n.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
