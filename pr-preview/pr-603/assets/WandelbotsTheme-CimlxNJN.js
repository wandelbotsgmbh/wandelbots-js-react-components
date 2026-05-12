import{j as o,M as m,e as n,C as p}from"./iframe-C5c9tU-p.js";import{useMDXComponents as r}from"./index-BGGinTHt.js";import{muiComponents as s}from"./defaultTheme.stories-CuDCxCFx.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BuIeh7Xb.js";import"./context-BEJoRi31.js";import"./ExpandMore-BsjM4u4y.js";import"./createSvgIcon-DzmMlF_Q.js";import"./SvgIcon-DFeIuTd2.js";import"./Typography-BfEehDz8.js";import"./Box-BVA2QCpv.js";import"./useSlot-CPhX8sVD.js";import"./mergeSlotProps-D4yW1jM8.js";import"./useControlled-BqbpyBLT.js";import"./useTheme-cuXy1hCP.js";import"./utils-ChORfhZf.js";import"./useTimeout-jun5qSCw.js";import"./Paper-BzmZ4c3I.js";import"./ButtonBase-XrKeXN30.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-COdQuw9s.js";import"./styled-C0V3kd0o.js";import"./listItemTextClasses-D0D2RLbR.js";import"./useThemeProps-B8utN0Pw.js";import"./getThemeProps-EmFAGg0A.js";import"./Alert-BCw7BlEA.js";import"./Tab-FLhnGHzp.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-C4AM_AcR.js";import"./IconButton-Bxwckqr2.js";import"./CircularProgress-BEgKeOHX.js";import"./getValidReactChildren-0ta3bBT6.js";import"./TablePagination-DHUG89mF.js";import"./Popover-l2ja7UPg.js";import"./Portal-C432OD__.js";import"./Fade-BzQXM4Je.js";import"./Select-YyRu609r.js";import"./MenuItem-jJJunO45.js";import"./dividerClasses-DAl4FEBH.js";import"./Toolbar-DexEzIiz.js";import"./Tooltip-mKqiqFuD.js";import"./Badge-CzvqU4MD.js";import"./Button-DLjGdiBg.js";import"./Stack-DSfreFD9.js";import"./Card-Dm8SJXJK.js";import"./CardContent-CG_hpoTH.js";import"./Chip-f5ED7fjp.js";import"./ListItem-DY-hCYGv.js";import"./Slider-1TD4TBhC.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
