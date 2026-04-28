import{j as o,M as m,e as n,C as p}from"./iframe-U90q-Qg9.js";import{useMDXComponents as r}from"./index-DDOEFVW5.js";import{muiComponents as s}from"./defaultTheme.stories-B3XucIi7.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-CnHa-WmA.js";import"./context-CsLkZmZr.js";import"./ExpandMore-COLaEDiu.js";import"./createSvgIcon-Bj0ArM1R.js";import"./SvgIcon-AwT4NHC6.js";import"./Typography-C665qnkZ.js";import"./Box-DraEcN3V.js";import"./useSlot-BvqAt5se.js";import"./mergeSlotProps-27_Qgvkm.js";import"./useControlled-CGUg6r88.js";import"./useTheme-CQTOaPs8.js";import"./utils-CDMZqfm9.js";import"./useTimeout-gWXbI-4c.js";import"./Paper-BZ2GBpUt.js";import"./ButtonBase-DB3bIiMP.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BHw1LuP1.js";import"./styled-BTdGtO3P.js";import"./listItemTextClasses-DJTIya_7.js";import"./useThemeProps-BBZZPq4s.js";import"./getThemeProps-DIz0JqPi.js";import"./Alert-CwkUJAIs.js";import"./Tab-CVpoywy8.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-Cb5CQC2O.js";import"./IconButton-BeaRf6MY.js";import"./CircularProgress-Bow2iK7e.js";import"./getValidReactChildren-BYvkwQXA.js";import"./TablePagination-b6KwhW97.js";import"./Popover--Vcr7Z6T.js";import"./Portal-DupZdIva.js";import"./Fade-33q5qA2H.js";import"./Select-ju6MYEEj.js";import"./MenuItem-CZHqObfh.js";import"./dividerClasses-B0AszB9a.js";import"./Toolbar-aIjj-nXM.js";import"./Tooltip-DOs_lW1e.js";import"./Badge-DufV1p2F.js";import"./Button-CFEY8081.js";import"./Stack-5nAG4JGA.js";import"./Card-D-q23f0v.js";import"./CardContent-CDdWOUef.js";import"./Chip-8nJ3z3Gz.js";import"./ListItem-BRqwKlUG.js";import"./Slider-BchgAd2y.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
