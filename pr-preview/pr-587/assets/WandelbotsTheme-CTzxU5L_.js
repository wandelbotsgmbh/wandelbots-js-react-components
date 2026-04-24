import{j as o,M as m,e as n,C as p}from"./iframe-CJvI5zCD.js";import{useMDXComponents as r}from"./index-tATN8rjQ.js";import{muiComponents as s}from"./defaultTheme.stories-DgIlIOjw.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DG7lbcLD.js";import"./context-D-BLjBTG.js";import"./ExpandMore-C8szsrp-.js";import"./createSvgIcon-BUKmf-IE.js";import"./SvgIcon-dzaD1Y41.js";import"./Typography-By8xgP9c.js";import"./Box-BCMKYrHH.js";import"./useSlot-s5CMMXPd.js";import"./mergeSlotProps-nu3AJl-Y.js";import"./useControlled-C5qoPxJY.js";import"./useTheme-DIVErIPC.js";import"./utils-CbG3oRES.js";import"./useTimeout-CG0neS_Q.js";import"./Paper-BkVqy4c-.js";import"./ButtonBase-BzQxkfcS.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-dNXL8D_9.js";import"./styled-orFgq5sf.js";import"./listItemTextClasses-DbHjUbiJ.js";import"./useThemeProps-eAd8t3j3.js";import"./getThemeProps-D7nMntxm.js";import"./Alert-BZyIu67k.js";import"./Tab-BzMaDjrg.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BdqIVPhW.js";import"./IconButton-DaDI6frD.js";import"./CircularProgress-BvzL5Wtj.js";import"./getValidReactChildren-CSYZeuhH.js";import"./TablePagination-QvrgkT6I.js";import"./Popover-DzV2H5Rx.js";import"./Portal-DioGNsU8.js";import"./Fade-C9cZSC3L.js";import"./Select-CxouOy6k.js";import"./MenuItem-CQA2kCnm.js";import"./dividerClasses-BaoBVbcy.js";import"./Toolbar-BHka6od5.js";import"./Tooltip-Bs4I7goL.js";import"./Badge-BJQB7qt2.js";import"./Button-C3tjNlhx.js";import"./Stack-DcCGIswi.js";import"./Card-BzCdmN61.js";import"./CardContent-BE7CK-ky.js";import"./Chip-D2qCRoUa.js";import"./ListItem-CdW6NiRm.js";import"./Slider-CAy8zCDK.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
