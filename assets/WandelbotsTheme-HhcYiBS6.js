import{j as o,M as m,e as n,C as p}from"./iframe-CdvPq_J5.js";import{useMDXComponents as r}from"./index-C6ifmIzS.js";import{muiComponents as s}from"./defaultTheme.stories-BMDtYskd.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-erqo-p00.js";import"./context-JO7Y_tQP.js";import"./ExpandMore-gzIFqUOe.js";import"./createSvgIcon-0eJjmrY7.js";import"./SvgIcon-Dy8tNe0F.js";import"./Typography-DVy_lahi.js";import"./Box-QvXRImCh.js";import"./useSlot-CBoorv5_.js";import"./mergeSlotProps-DWuP01E-.js";import"./useControlled-sE8ajiih.js";import"./useTheme-BMx762vv.js";import"./utils-7Y-xYDUZ.js";import"./useTimeout-BEOqa_ew.js";import"./Paper-DZ5YLlbu.js";import"./ButtonBase-DkQQQ3uW.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Chudm2jU.js";import"./styled-DTrVGn0e.js";import"./listItemTextClasses-h-k4lcfa.js";import"./useThemeProps-DdtoHKOe.js";import"./getThemeProps-DRkLRDNT.js";import"./Alert-cjbyA2gH.js";import"./Tab-Vvbj-3qw.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DFpAi_-D.js";import"./IconButton-CUbUZMMh.js";import"./CircularProgress-DSt6uf_m.js";import"./getValidReactChildren--y9s-WLY.js";import"./TablePagination-mlByxOvF.js";import"./Popover-DSwpcnD5.js";import"./Portal-BcIkMm-t.js";import"./Fade--TkY-6Gj.js";import"./Select-BIoFwkJb.js";import"./MenuItem-CCZznAcE.js";import"./dividerClasses-CjeXueck.js";import"./Toolbar-DKraBr1I.js";import"./Tooltip-D0ZCDrC9.js";import"./Badge-DqnK4Mzs.js";import"./Button-B9KnpnbJ.js";import"./Stack-V5ehjch4.js";import"./Card-D5nvA90E.js";import"./CardContent-DlprPG_6.js";import"./Chip-DZqLflZU.js";import"./ListItem-D7KZ_qI5.js";import"./Slider-CGcTbh2b.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
