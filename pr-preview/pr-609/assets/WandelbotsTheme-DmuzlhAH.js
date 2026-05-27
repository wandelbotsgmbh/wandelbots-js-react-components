import{j as o,M as m,e as n,C as p}from"./iframe-CM7yJV8d.js";import{useMDXComponents as r}from"./index-DJFbaP7r.js";import{muiComponents as s}from"./defaultTheme.stories-DBCnJYMa.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-TMKJ5AQS.js";import"./context-VSYot3tW.js";import"./ExpandMore-DDSymlB_.js";import"./createSvgIcon-B1L4HWYf.js";import"./SvgIcon-Cz970-H4.js";import"./Typography-DZPgDbRn.js";import"./Box-DuC_CC2P.js";import"./useSlot-Cg36KikH.js";import"./mergeSlotProps-CUp63VMv.js";import"./useControlled-CpDQSSut.js";import"./useTheme-z5AdC5JJ.js";import"./utils-DfP829hM.js";import"./useTimeout-BMwhRLm1.js";import"./Paper-B0lTKRlq.js";import"./ButtonBase-Civ89Hsn.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-B1zr7Jpi.js";import"./styled-DFKj8Qa5.js";import"./listItemTextClasses-DjFGcWBI.js";import"./useThemeProps-DDHHA-H4.js";import"./getThemeProps-DF3Lnwyt.js";import"./Alert-B5Zh1tf-.js";import"./Tab-CCt4gu_O.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-Bv0DHkGB.js";import"./IconButton-CES9VijH.js";import"./CircularProgress-BULUfrO4.js";import"./getValidReactChildren-CDO-0oPm.js";import"./TablePagination-9CFxuxD0.js";import"./Popover-BcdlVbeB.js";import"./Portal-BtxUzP4C.js";import"./Fade-gUC3c_nb.js";import"./Select-BWIMDkPT.js";import"./MenuItem-CyIbKlS3.js";import"./dividerClasses-CcL5DJfd.js";import"./Toolbar-Ifybb4H-.js";import"./Tooltip-BHT_wYOK.js";import"./Badge-BBMUi4Ix.js";import"./Button-BK3K8Q_1.js";import"./Stack-7SO3NtYX.js";import"./Card-DTHotshf.js";import"./CardContent-D_usa42n.js";import"./Chip-BQ7wK0Mn.js";import"./ListItem-DXVvqseh.js";import"./Slider-BVlLyAjK.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
