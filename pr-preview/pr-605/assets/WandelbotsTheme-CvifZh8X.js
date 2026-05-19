import{j as o,M as m,e as n,C as p}from"./iframe-OBhjQyWz.js";import{useMDXComponents as r}from"./index-gzTGp83N.js";import{muiComponents as s}from"./defaultTheme.stories-BZ1v_Iu-.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BlaERw2M.js";import"./context-DTYHCVEI.js";import"./ExpandMore-DDImvP9C.js";import"./createSvgIcon-BLKUZehO.js";import"./SvgIcon-oVV5Gf8c.js";import"./Typography-B1KoJ2q7.js";import"./Box-C1paHLJs.js";import"./useSlot-BCcXSrtW.js";import"./mergeSlotProps-D08EeVE5.js";import"./useControlled-tcRm9rgB.js";import"./useTheme-Dxxhmn9l.js";import"./utils-zv1GRV67.js";import"./useTimeout-Cvg84d-X.js";import"./Paper-BN646I5A.js";import"./ButtonBase-BApT6k7C.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BZJjXTmH.js";import"./styled-Bni2CDhE.js";import"./listItemTextClasses-D5eVZ8Zo.js";import"./useThemeProps-BNLaQ9IC.js";import"./getThemeProps-DLFV0jFg.js";import"./Alert-DtGnnnTs.js";import"./Tab-zH9n28nt.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DZkyJ_im.js";import"./IconButton-CAONvW6I.js";import"./CircularProgress-DsiK7eqQ.js";import"./getValidReactChildren-DtSytMta.js";import"./TablePagination-DY_Tov_T.js";import"./Popover-R5pz_910.js";import"./Portal-BN4vs4bk.js";import"./Fade-Z3yzqCAa.js";import"./Select-BcBly8Br.js";import"./MenuItem-BUIq4Nwd.js";import"./dividerClasses-DoqiyinD.js";import"./Toolbar-DC_lV9pz.js";import"./Tooltip-DUdxH8Wg.js";import"./Badge-C5BZLIXs.js";import"./Button-BaNxG2Qa.js";import"./Stack-DPkQxlU0.js";import"./Card-DB92568k.js";import"./CardContent-yLeybHTO.js";import"./Chip-BYcI6jbd.js";import"./ListItem-Crcx2GVl.js";import"./Slider-R4x6UPYI.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
