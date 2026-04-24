import{j as o,M as m,e as n,C as p}from"./iframe-CTE0GIbJ.js";import{useMDXComponents as r}from"./index-8uCzZDLg.js";import{muiComponents as s}from"./defaultTheme.stories-DH2UNAGJ.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DYDhe802.js";import"./context-CqbUFnuw.js";import"./ExpandMore-MTGEPwOD.js";import"./createSvgIcon-DT3ljQvf.js";import"./SvgIcon-HHbXGek5.js";import"./Typography-Db3ykyd3.js";import"./Box-Cg_8zK6M.js";import"./useSlot-B4-BZ_yn.js";import"./mergeSlotProps-DK5tyUBm.js";import"./useControlled-BTr1s3VO.js";import"./useTheme-Iqiw1k9D.js";import"./utils-Ck8wcpK5.js";import"./useTimeout-CHumXHIt.js";import"./Paper-BwQJ5arR.js";import"./ButtonBase-x7ldbRLb.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BwHna2At.js";import"./styled-k8sceZtu.js";import"./listItemTextClasses-B-93gjlK.js";import"./useThemeProps-DpR-AaBe.js";import"./getThemeProps-DJEJk0Gu.js";import"./Alert-B9RSSke_.js";import"./Tab-COoR0LSn.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-B3ERqcWs.js";import"./IconButton-hGyqLi5i.js";import"./CircularProgress-D6kKMAyM.js";import"./getValidReactChildren-K1L-Us30.js";import"./TablePagination-DTy0ncRD.js";import"./Popover-CnEdQzIh.js";import"./Portal-B8SVPxVp.js";import"./Fade-CZxxJluB.js";import"./Select-CsaC1fjB.js";import"./MenuItem-DvH9_uCB.js";import"./dividerClasses-CXk2MNPg.js";import"./Toolbar-xYWI4NVx.js";import"./Tooltip-BCXOqiWN.js";import"./Badge-COjKYUsY.js";import"./Button-BDGALnmF.js";import"./Stack-B9XEDb0H.js";import"./Card-DO9WGDWg.js";import"./CardContent-11_wQQq8.js";import"./Chip-C674FwrB.js";import"./ListItem-p63cgXtT.js";import"./Slider-B-Ysct_o.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
