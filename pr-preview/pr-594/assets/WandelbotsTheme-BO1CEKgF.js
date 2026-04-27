import{j as o,M as m,e as n,C as p}from"./iframe-TfOBwPhs.js";import{useMDXComponents as r}from"./index-C6weNvoL.js";import{muiComponents as s}from"./defaultTheme.stories-CNUKOgXG.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-iPiJme4b.js";import"./context-Db2z16ug.js";import"./ExpandMore-CwcZeiAv.js";import"./createSvgIcon-DRMbAZ0e.js";import"./SvgIcon-g0gkd2Hr.js";import"./Typography-Bf8eW30X.js";import"./Box-D5eszPsQ.js";import"./useSlot-DsIglrBS.js";import"./mergeSlotProps-Cy2bMqGn.js";import"./useControlled-DioeQ4EG.js";import"./useTheme-wqN532uy.js";import"./utils-XCdVoUpC.js";import"./useTimeout-h1V3ossd.js";import"./Paper-Dpyh2TkT.js";import"./ButtonBase-BamcbkFP.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CRczDA6I.js";import"./styled-Co5J03YL.js";import"./listItemTextClasses-CPKUoZIr.js";import"./useThemeProps-Dz9Yt3j7.js";import"./getThemeProps-D0oqFg1R.js";import"./Alert-NbxwkK3r.js";import"./Tab-LnxgdXhB.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BCd6bDIM.js";import"./IconButton-CoYLMIfA.js";import"./CircularProgress-DGrVQeuJ.js";import"./getValidReactChildren-BP7V0qKP.js";import"./TablePagination-D0cANPPq.js";import"./Popover-B68pdEca.js";import"./Portal-Bf8lIK3p.js";import"./Fade-COizaEH3.js";import"./Select-C5iwiCv1.js";import"./MenuItem-FQDHF6uI.js";import"./dividerClasses-B3JLK2K_.js";import"./Toolbar-CiVYYN1M.js";import"./Tooltip-2PK9EM_x.js";import"./Badge-nDmOaRA8.js";import"./Button-B3Pjwj6x.js";import"./Stack-DjLOY6Op.js";import"./Card-CYo3UkKQ.js";import"./CardContent-tz6cwEfE.js";import"./Chip-CZPqegzJ.js";import"./ListItem-B9iTTnDj.js";import"./Slider-MGU8Z-II.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
