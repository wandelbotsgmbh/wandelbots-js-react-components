import{j as o,M as m,e as n,C as p}from"./iframe-DCokSdT7.js";import{useMDXComponents as r}from"./index-CPJuWE6i.js";import{muiComponents as s}from"./defaultTheme.stories-BXCEfdkK.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-CJpkoEyD.js";import"./context-zkDGtYYg.js";import"./ExpandMore--D5XMUEb.js";import"./createSvgIcon-CqRlMz8T.js";import"./SvgIcon-CXDGlQs5.js";import"./Typography-xeTEG8K0.js";import"./Box-QyQwW5pn.js";import"./useSlot-ET9ocIeW.js";import"./mergeSlotProps-BGRhNw94.js";import"./useControlled-BjD1XdI8.js";import"./useTheme-B_nhbgZF.js";import"./utils-CN09Sruk.js";import"./useTimeout-DM98COdN.js";import"./Paper-DtICMVyH.js";import"./ButtonBase-BLAY8Qqy.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Ck0nGkul.js";import"./styled-C6BemGc7.js";import"./listItemTextClasses-CX1YVwMY.js";import"./useThemeProps-GvQfHGKS.js";import"./getThemeProps-DXkvPSLR.js";import"./Alert-CCwq4rC4.js";import"./Tab-B9WZ_fhU.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-B7mUyRSK.js";import"./IconButton-CeWoJyel.js";import"./CircularProgress-DnawC6GW.js";import"./getValidReactChildren-D1Hiqgkf.js";import"./TablePagination-Vnc5b7qE.js";import"./Popover-CAB0eiUS.js";import"./Portal-CLOEicDQ.js";import"./Fade-B74F0Arq.js";import"./Select-CFT9rViM.js";import"./MenuItem-B7gkQJbF.js";import"./dividerClasses-H1E61aya.js";import"./Toolbar-BWaAWRIv.js";import"./Tooltip-BcGZ6xJ4.js";import"./Badge-DjKola5j.js";import"./Button-BdZ1mKjp.js";import"./Stack-CBfrBnME.js";import"./Card-BMf2dLV3.js";import"./CardContent-BclXdewe.js";import"./Chip-PewRw4Bo.js";import"./ListItem-BO8shW2c.js";import"./Slider-9t_oRhI3.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
