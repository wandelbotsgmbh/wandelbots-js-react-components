import{j as o,M as m,e as n,C as p}from"./iframe-C07m-IKX.js";import{useMDXComponents as r}from"./index-D5cTvBwF.js";import{muiComponents as s}from"./defaultTheme.stories-DrtFCuKO.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Ck7Htujg.js";import"./context-Dcj41OPp.js";import"./ExpandMore-Dmxtskxj.js";import"./createSvgIcon-CjP9B7RW.js";import"./SvgIcon-b_KZCA-W.js";import"./Typography-Jm6qxxhF.js";import"./Box-LwGkxjSJ.js";import"./useSlot-BjU0YYDi.js";import"./mergeSlotProps-Y946gwbV.js";import"./useControlled-Du5ML2Le.js";import"./useTheme-Ce2whl9O.js";import"./utils-DxvHo6Ug.js";import"./useTimeout-BdGB40KS.js";import"./Paper-BLdlX3yg.js";import"./ButtonBase-BEvr7jey.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BdLfJU2Q.js";import"./styled-DcXINnoC.js";import"./listItemTextClasses-87JBuy2K.js";import"./useThemeProps-KCR6C5tN.js";import"./getThemeProps-Cx5fvbyg.js";import"./Alert-CKKnFpqF.js";import"./Tab-BBQnnNFK.js";import"./getActiveElement-DxURyTVq.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-lVEaevsu.js";import"./IconButton-BO4uSwn8.js";import"./CircularProgress-CPE-XVM3.js";import"./getValidReactChildren-CyBSny1w.js";import"./TablePagination-D6wnGi_9.js";import"./Popover-BFAjdCvC.js";import"./Portal-B50M1dpa.js";import"./Fade-CL9Xa_a9.js";import"./Select-Bm8uB5Om.js";import"./MenuItem-BGSwgp5b.js";import"./dividerClasses-Dxfqqs6s.js";import"./Toolbar-AOggVGzN.js";import"./Tooltip-DGRzB6Y0.js";import"./Badge-T2zigNYo.js";import"./Button-Dd3x1SNA.js";import"./Stack-zux6E1d2.js";import"./Card-MXAGFdkI.js";import"./CardContent-TJkgmTt6.js";import"./Chip-B7MbtyiQ.js";import"./ListItem-QNCyy8rH.js";import"./Slider-4mJC9WEy.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
