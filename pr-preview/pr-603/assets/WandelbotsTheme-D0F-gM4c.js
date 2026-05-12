import{j as o,M as m,e as n,C as p}from"./iframe-fqcQmF3Q.js";import{useMDXComponents as r}from"./index-CFkI5lBH.js";import{muiComponents as s}from"./defaultTheme.stories-Bwz8qzMo.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BODOFgMG.js";import"./context-CO-c0hk4.js";import"./ExpandMore-cC5oiPoW.js";import"./createSvgIcon-P6h4Qoq-.js";import"./SvgIcon-Bp1Lxvpt.js";import"./Typography-BIkbrq7L.js";import"./Box-D1Lbx9pH.js";import"./useSlot-Cp-2ydpp.js";import"./mergeSlotProps-C3BFbINK.js";import"./useControlled-D9sRsPFY.js";import"./useTheme-62ohso46.js";import"./utils-DYUmMNg3.js";import"./useTimeout-DJgwiHjA.js";import"./Paper-Dt2b-LBz.js";import"./ButtonBase-DFSMmqoq.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Bazi2TBx.js";import"./styled-C57JLxY4.js";import"./listItemTextClasses-B5llrfhh.js";import"./useThemeProps-BOQ5O-9-.js";import"./getThemeProps-D2kw5W3I.js";import"./Alert-aguOZ8zg.js";import"./Tab-BLCbfAVX.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-yr9fD2Uw.js";import"./IconButton-BuhxkpYK.js";import"./CircularProgress-3hch-vff.js";import"./getValidReactChildren-DrpagpHg.js";import"./TablePagination-1zn2TpOk.js";import"./Popover-CYosJrzG.js";import"./Portal-D4geYSex.js";import"./Fade-D4XsnP-k.js";import"./Select-DGI0nL5O.js";import"./MenuItem-DUt7P48I.js";import"./dividerClasses-CpehJv7q.js";import"./Toolbar-DnNPaovc.js";import"./Tooltip-9jwIL1Ew.js";import"./Badge-u3weLZVP.js";import"./Button-BSi43MVn.js";import"./Stack-BCkCXLUk.js";import"./Card-BFUVvx7S.js";import"./CardContent-b3__i5WR.js";import"./Chip-Cr4gZsHf.js";import"./ListItem-zIDoOGDy.js";import"./Slider-BKbbwd3Z.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
