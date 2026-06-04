import{j as o,M as m,e as n,C as p}from"./iframe-DDTXLvOw.js";import{useMDXComponents as r}from"./index-C_dUECTL.js";import{muiComponents as s}from"./defaultTheme.stories-B9owQsuC.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-a1Y6uaPT.js";import"./context-DuzUiMG7.js";import"./ExpandMore-DhDZws6E.js";import"./createSvgIcon-o9K7giso.js";import"./SvgIcon-vpUkJrwW.js";import"./Typography-CUP0grXy.js";import"./Box-ZdOj145j.js";import"./useSlot-vwvj5WkK.js";import"./mergeSlotProps-BGi2w5mF.js";import"./useControlled-D2pK702F.js";import"./useTheme-CZOnp54v.js";import"./utils-CEXmX7RL.js";import"./useTimeout-CcJLFniF.js";import"./Paper-Cn2fCz5k.js";import"./ButtonBase-B6HGoOFo.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Su7AjR1f.js";import"./styled-DQy_d1xN.js";import"./listItemTextClasses-5aA43rcO.js";import"./useThemeProps-BFsj70fR.js";import"./getThemeProps-BpadWtvG.js";import"./Alert-BZEvdQGl.js";import"./Tab-DRVBR1VS.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DkyS6phj.js";import"./IconButton-BQqAgMK3.js";import"./CircularProgress-ao0gYHEk.js";import"./getValidReactChildren-C1RBtmMw.js";import"./TablePagination-DVc_Orv3.js";import"./Popover-CpGSRkCr.js";import"./Portal-CzIU-iU5.js";import"./Fade-Ca0SPhrH.js";import"./Select-DGw_vVaG.js";import"./MenuItem-D3fJ1Z9K.js";import"./dividerClasses-BNA_nXQP.js";import"./Toolbar-CxQYet_q.js";import"./Tooltip-Nntw42VT.js";import"./Badge-Bx_wL-uN.js";import"./Button-C_UdjCB5.js";import"./Stack-D2627u9U.js";import"./Card-BFMw2tGV.js";import"./CardContent-CLNO3anp.js";import"./Chip-C2vTvbtr.js";import"./ListItem-Bd_s0JF7.js";import"./Slider-C97JEQLN.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
