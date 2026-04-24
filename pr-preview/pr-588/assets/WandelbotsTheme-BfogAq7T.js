import{j as o,M as m,e as n,C as p}from"./iframe-Bk0-2QxL.js";import{useMDXComponents as r}from"./index-LlL1glrS.js";import{muiComponents as s}from"./defaultTheme.stories-DzCt3KTh.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DDgP2jxI.js";import"./context-BnvAqd9w.js";import"./ExpandMore-Bl6d8Jjo.js";import"./createSvgIcon-CSoa__ZT.js";import"./SvgIcon-BEwAl7P9.js";import"./Typography-Bgt_gqro.js";import"./Box-BqX1MVsk.js";import"./useSlot-CRkZLo76.js";import"./mergeSlotProps-BnP2yRvC.js";import"./useControlled-D9Tjxq4w.js";import"./useTheme-DQRgQ4nY.js";import"./utils-DK-RRRZn.js";import"./useTimeout-BcKZ6GGZ.js";import"./Paper-C2JMCm7D.js";import"./ButtonBase-BZyLO8cB.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DsvanF4T.js";import"./styled-DCwxt8BU.js";import"./listItemTextClasses-VN5wKzyl.js";import"./useThemeProps-DfsbA9PU.js";import"./getThemeProps-C59z48vn.js";import"./Alert-C3H-pWIt.js";import"./Tab-CqREvd3V.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DMw4oIjV.js";import"./IconButton-msqth0gC.js";import"./CircularProgress-jDBJqDzV.js";import"./getValidReactChildren-BDPcRI1j.js";import"./TablePagination-B6vptkHD.js";import"./Popover-1rYLFNi8.js";import"./Portal-xT5THvxb.js";import"./Fade-DvPUCNYA.js";import"./Select-DR2GrtsN.js";import"./MenuItem-CQHDnver.js";import"./dividerClasses-KKzH3zDL.js";import"./Toolbar-DCL4kmTA.js";import"./Tooltip-nBuD45Yd.js";import"./Badge-CG4u728z.js";import"./Button-DkH1onzK.js";import"./Stack-BssoHIRZ.js";import"./Card-CpMHyc8r.js";import"./CardContent-VwNzmiOR.js";import"./Chip-D28yJdin.js";import"./ListItem-Q5Nkppw5.js";import"./Slider-c56txrcA.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
