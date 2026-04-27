import{j as o,M as m,e as n,C as p}from"./iframe-DhdsUEIY.js";import{useMDXComponents as r}from"./index-BBBh85Ii.js";import{muiComponents as s}from"./defaultTheme.stories-Bq6cwEqy.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Inrp6oT6.js";import"./context-CtggvLOJ.js";import"./ExpandMore-B5MB5xTX.js";import"./createSvgIcon-HM7GVLHh.js";import"./SvgIcon-qdWXT4rN.js";import"./Typography-CqVlkvmb.js";import"./Box-BXLGUvTJ.js";import"./useSlot-DfQrFRVx.js";import"./mergeSlotProps-DLKdOERb.js";import"./useControlled-BR_agXVe.js";import"./useTheme-CAYi9Yas.js";import"./utils-CZ_Efy11.js";import"./useTimeout-HYXGpxb5.js";import"./Paper-B4njx4d6.js";import"./ButtonBase-CKVI9M2b.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Df9rEr7I.js";import"./styled-Br-UfBGC.js";import"./listItemTextClasses-bo7R06wP.js";import"./useThemeProps-CvsSN_yF.js";import"./getThemeProps-Cj5lKWUP.js";import"./Alert-B-bGNoIg.js";import"./Tab-8dUSp7N-.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-Cp7NOKUY.js";import"./IconButton-CH4QGYXB.js";import"./CircularProgress-BKh6uyg1.js";import"./getValidReactChildren-DnRJHYRl.js";import"./TablePagination-B6Kba36Y.js";import"./Popover-CMZw7wsu.js";import"./Portal-TZn5baU1.js";import"./Fade-Df5WRmS_.js";import"./Select-B-E0v3nY.js";import"./MenuItem-BQZixSLN.js";import"./dividerClasses-BINWen7d.js";import"./Toolbar-Co12Y0Ee.js";import"./Tooltip-DLq_ZsWw.js";import"./Badge-noCnbJzI.js";import"./Button-ru7IzA0e.js";import"./Stack-BNYMr0Rx.js";import"./Card-ZGj01e-f.js";import"./CardContent-D085BU41.js";import"./Chip-BzPLrKdO.js";import"./ListItem-BoSM8nvr.js";import"./Slider-NVXy70CU.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
