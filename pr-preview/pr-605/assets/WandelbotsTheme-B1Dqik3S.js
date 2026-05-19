import{j as o,M as m,e as n,C as p}from"./iframe-CTxk-WG5.js";import{useMDXComponents as r}from"./index-CiXeMU1Z.js";import{muiComponents as s}from"./defaultTheme.stories-Cqkef2mh.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DzUJkyzq.js";import"./context-D4wq1lx5.js";import"./ExpandMore-DNx_-GDm.js";import"./createSvgIcon-C5cieW-Q.js";import"./SvgIcon-YB7XXZAS.js";import"./Typography-D7U38wgt.js";import"./Box-AokjAw6D.js";import"./useSlot-Bz0JUU0E.js";import"./mergeSlotProps-DaW-L06I.js";import"./useControlled-Bwd4Fq7p.js";import"./useTheme-uNgZ5rSk.js";import"./utils-CC1mZwJN.js";import"./useTimeout-M8QMixjI.js";import"./Paper-5A5AlCet.js";import"./ButtonBase-C6L9aqng.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CqShVK1p.js";import"./styled-BXhB8UfT.js";import"./listItemTextClasses-pIhZ9i1M.js";import"./useThemeProps-CnOyfyqf.js";import"./getThemeProps-D__LrrEE.js";import"./Alert-CD70w14T.js";import"./Tab-CC-Mn_Y7.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CXTVyFf0.js";import"./IconButton-BoXwPw-i.js";import"./CircularProgress-DcxTpbLI.js";import"./getValidReactChildren-CN7BlxMp.js";import"./TablePagination-PLwZu93X.js";import"./Popover-Dy6OpLmZ.js";import"./Portal-BFYsNWYi.js";import"./Fade-DZbcQhVK.js";import"./Select-BtJ6PskJ.js";import"./MenuItem-C7TVhtb_.js";import"./dividerClasses-DP8Up6ZH.js";import"./Toolbar-suaBQ9-X.js";import"./Tooltip-_grTIFTT.js";import"./Badge-DCMybhVX.js";import"./Button-DU_4Gik4.js";import"./Stack-DMkgzM7h.js";import"./Card-CcHhiRo5.js";import"./CardContent-D6gIJNyr.js";import"./Chip-I5A0HdwW.js";import"./ListItem-DI6qt1pJ.js";import"./Slider-CvKIltff.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
