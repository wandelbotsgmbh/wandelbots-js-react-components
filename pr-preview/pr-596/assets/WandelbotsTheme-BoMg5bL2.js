import{j as o,M as m,e as n,C as p}from"./iframe-DYY95HYM.js";import{useMDXComponents as r}from"./index-DEE-R3Z-.js";import{muiComponents as s}from"./defaultTheme.stories-Bmt20ufo.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-B7cwCZh0.js";import"./context-CoxmOV92.js";import"./ExpandMore-CJ1_UEdw.js";import"./createSvgIcon-D-bR9a_R.js";import"./SvgIcon-CZ54g-o7.js";import"./Typography--nLqRGAu.js";import"./Box-QzjKRH-n.js";import"./useSlot-DGg492ce.js";import"./mergeSlotProps-C22PEeuL.js";import"./useControlled-BL59xnXL.js";import"./useTheme-BLClqO1h.js";import"./utils-BwhWsQGb.js";import"./useTimeout-CKpxJawG.js";import"./Paper-CEWM88yN.js";import"./ButtonBase-C3QhcuDX.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Bo5yLzjq.js";import"./styled-BRm6JC1V.js";import"./listItemTextClasses-HKUeXqpk.js";import"./useThemeProps-Bv1FYu_P.js";import"./getThemeProps-BC9l4Nee.js";import"./Alert-DE8gt1iJ.js";import"./Tab-B9JeFWnO.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DG4qWOLY.js";import"./IconButton-DzgcGNUK.js";import"./CircularProgress-LMlWQ7mD.js";import"./getValidReactChildren-CoSd4PRI.js";import"./TablePagination-DzPGRpqZ.js";import"./Popover-BE_TpCE7.js";import"./Portal-DfzA2o1W.js";import"./Fade-VGu7HuM7.js";import"./Select-CASsKQuf.js";import"./MenuItem-BVRKXd0n.js";import"./dividerClasses-DuX1CO81.js";import"./Toolbar-DniaJMZG.js";import"./Tooltip-CZaz4pOa.js";import"./Badge-2GHwI4jN.js";import"./Button-B2ewRLlW.js";import"./Stack-DEwgRLqX.js";import"./Card-DeBON1cO.js";import"./CardContent-C2aubNd6.js";import"./Chip-C_cOZ0Ig.js";import"./ListItem-QP8ro11P.js";import"./Slider-4vTW56Wm.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
