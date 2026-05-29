import{j as o,M as m,e as n,C as p}from"./iframe-CXWRYfYF.js";import{useMDXComponents as r}from"./index-VJSfVAj1.js";import{muiComponents as s}from"./defaultTheme.stories-xCVtqt4g.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Bm1RTeFs.js";import"./context-C0-xRLGq.js";import"./ExpandMore-BxkbMPWz.js";import"./createSvgIcon-9n22oiwO.js";import"./SvgIcon-QMRlYqnV.js";import"./Typography-iKAZogCX.js";import"./Box-D8qWxPyD.js";import"./useSlot-BK6I3MaY.js";import"./mergeSlotProps-D7mq7P97.js";import"./useControlled-SyW04reC.js";import"./useTheme-C591dLol.js";import"./utils-B-0lLZGK.js";import"./useTimeout-BnlwCWvM.js";import"./Paper-C9FsuWYP.js";import"./ButtonBase-DQ_O7IWK.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CUDJurKI.js";import"./styled-Cuqi1b1a.js";import"./listItemTextClasses-DSlfOqwR.js";import"./useThemeProps-ACJYemJt.js";import"./getThemeProps-CRG9s52o.js";import"./Alert-DZCH6a6D.js";import"./Tab-BzaUMRyf.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BMqMv8de.js";import"./IconButton-afJ5I9bv.js";import"./CircularProgress-CLQXljkL.js";import"./getValidReactChildren-_d-CNjE2.js";import"./TablePagination-ByRhfRwb.js";import"./Popover-ChNuXW11.js";import"./Portal-B5K9R7AW.js";import"./Fade-B6bOyCFz.js";import"./Select-BuldohBW.js";import"./MenuItem-BlIuu8h1.js";import"./dividerClasses-BOAXl7sn.js";import"./Toolbar-DaZ8Unuu.js";import"./Tooltip-_JvHJ-82.js";import"./Badge-D08pznsZ.js";import"./Button-BK01DUGJ.js";import"./Stack-Tc5djd7O.js";import"./Card-DNv7KvFS.js";import"./CardContent-BdSqsxuR.js";import"./Chip-DBUGHsjZ.js";import"./ListItem-CRC03Evg.js";import"./Slider-BSl_KVyd.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
