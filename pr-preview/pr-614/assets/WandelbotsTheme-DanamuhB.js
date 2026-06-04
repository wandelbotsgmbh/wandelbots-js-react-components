import{j as o,M as m,e as n,C as p}from"./iframe-DfWPFmHR.js";import{useMDXComponents as r}from"./index-DjAywOnV.js";import{muiComponents as s}from"./defaultTheme.stories-Bvixh0id.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-C6tO6kDg.js";import"./context-DvXoX9AM.js";import"./ExpandMore-CHjxZtLG.js";import"./createSvgIcon-BQPOlWPh.js";import"./SvgIcon-CD3_c9Hi.js";import"./Typography-BLYFB-H6.js";import"./Box-DboErsje.js";import"./useSlot-BsG9Jq0v.js";import"./mergeSlotProps-B9WdnHSX.js";import"./useControlled-BVYEcAfq.js";import"./useTheme-CQuiQKlK.js";import"./utils-C2bj6Z0W.js";import"./useTimeout-NRm9GukT.js";import"./Paper-LA4HZB9z.js";import"./ButtonBase-C3XcEfzS.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Bvkxa5y2.js";import"./styled-l6iecieT.js";import"./listItemTextClasses-DgpCbqQv.js";import"./useThemeProps-Qc9rWBpD.js";import"./getThemeProps-BQvTXkAz.js";import"./Alert-B5R5px7k.js";import"./Tab-DD7na1Kb.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-C4LcECm2.js";import"./IconButton-giGHxeHF.js";import"./CircularProgress-D9aPwPBt.js";import"./getValidReactChildren-Cv7hA9ys.js";import"./TablePagination-aR-RQGx0.js";import"./Popover-BbXhLCPa.js";import"./Portal-C28uELVK.js";import"./Fade--rSJHSZ2.js";import"./Select-DtjY7ZIZ.js";import"./MenuItem-BE3OCfuR.js";import"./dividerClasses-BYzXGtzT.js";import"./Toolbar-mmJTvHdJ.js";import"./Tooltip-BOZ2iCIA.js";import"./Badge-CeE3vH5K.js";import"./Button-Cw-z3Q1s.js";import"./Stack-CJ5_8D7X.js";import"./Card-SzXxgL4o.js";import"./CardContent-s0GzPW3s.js";import"./Chip-CjjKQQiy.js";import"./ListItem--o_xRj7h.js";import"./Slider-BNDy54j-.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
