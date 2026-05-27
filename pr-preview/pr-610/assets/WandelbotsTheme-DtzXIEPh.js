import{j as o,M as m,e as n,C as p}from"./iframe-CBDMMuz3.js";import{useMDXComponents as r}from"./index-BHcHHmcJ.js";import{muiComponents as s}from"./defaultTheme.stories-Cmg9-_iz.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-QvszZoWx.js";import"./context-BbxTy0Z6.js";import"./ExpandMore-BMTF-QTf.js";import"./createSvgIcon-CECx_tZv.js";import"./SvgIcon-Dd-LMu7U.js";import"./Typography-CV0Tp7we.js";import"./Box-BdTXmdsT.js";import"./useSlot-BsAs-b92.js";import"./mergeSlotProps-C47F8L1P.js";import"./useControlled-RBFZn4TN.js";import"./useTheme-DLS4xLiw.js";import"./utils-D0Qjap8z.js";import"./useTimeout-heWQx0Fu.js";import"./Paper-BZ-6F4wl.js";import"./ButtonBase-BxkUYE9-.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Dz1-KTC_.js";import"./styled-DUru4iAQ.js";import"./listItemTextClasses-D5LtiFb5.js";import"./useThemeProps-iCVF290L.js";import"./getThemeProps-C8JWlsdd.js";import"./Alert-DZrhRJvg.js";import"./Tab-DTRYLvEs.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-4a1ygkJs.js";import"./IconButton-DBvCGYHM.js";import"./CircularProgress-Mwyi83Mg.js";import"./getValidReactChildren-Bf7HSdqz.js";import"./TablePagination-GVdBgSg8.js";import"./Popover-PjGpEV_J.js";import"./Portal-CffhO-SH.js";import"./Fade-o5-oD3wG.js";import"./Select-DRFC7ynJ.js";import"./MenuItem-DdOB7rQG.js";import"./dividerClasses-n_Fa-sDT.js";import"./Toolbar-CWak5K2Z.js";import"./Tooltip-nxkbaMqs.js";import"./Badge-B2DTzabp.js";import"./Button-RK-WujTV.js";import"./Stack-D3nClK2q.js";import"./Card-tYwTAgbo.js";import"./CardContent-mmv2hqxt.js";import"./Chip-BLmXWYu0.js";import"./ListItem-Cx4YjxTB.js";import"./Slider-B89lZYTz.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
