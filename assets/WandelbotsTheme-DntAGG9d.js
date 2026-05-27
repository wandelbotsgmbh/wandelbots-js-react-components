import{j as o,M as m,e as n,C as p}from"./iframe-Ccvk4lqh.js";import{useMDXComponents as r}from"./index-BOtUMWng.js";import{muiComponents as s}from"./defaultTheme.stories-le7c7wTg.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DmGWC5Lo.js";import"./context-CWI-I5lq.js";import"./ExpandMore-Duu3wnEw.js";import"./createSvgIcon-BtL2Alr7.js";import"./SvgIcon-DwZAwAQy.js";import"./Typography-8g-0sihl.js";import"./Box-B9ppKL-n.js";import"./useSlot-CeyViPqg.js";import"./mergeSlotProps-C5U6_dFD.js";import"./useControlled-Cxek5mNJ.js";import"./useTheme-B-LUCvvv.js";import"./utils-BdIw276R.js";import"./useTimeout-CqAJlu4L.js";import"./Paper-D7WVMPXU.js";import"./ButtonBase-3-VVAOkt.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BxAlNwIb.js";import"./styled-C7bbyX7j.js";import"./listItemTextClasses-6wrDVV-P.js";import"./useThemeProps-BM39M4Yb.js";import"./getThemeProps-RrF-2-cN.js";import"./Alert-BRJ_TxFC.js";import"./Tab-Dc8fKOJk.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CkE4ud3b.js";import"./IconButton-DD2Srs09.js";import"./CircularProgress-BcmhoRwx.js";import"./getValidReactChildren-DwwcQNJ2.js";import"./TablePagination-CfAzEeNc.js";import"./Popover-DqmNkGW8.js";import"./Portal-DyxJ_85z.js";import"./Fade-BrMySx3L.js";import"./Select-DHHEIMTW.js";import"./MenuItem-gj1WMS1Z.js";import"./dividerClasses-HSKHziqc.js";import"./Toolbar-9asni6F4.js";import"./Tooltip-BR-6qHea.js";import"./Badge-B3m2J_We.js";import"./Button-mWMwBiy_.js";import"./Stack-Bedv1cPA.js";import"./Card-jKP0eLVa.js";import"./CardContent-D_6rupeB.js";import"./Chip-BcXMjgWW.js";import"./ListItem-DMXcsxjo.js";import"./Slider-BSTqm0zz.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
