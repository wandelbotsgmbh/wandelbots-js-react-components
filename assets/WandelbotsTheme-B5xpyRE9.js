import{j as o,M as m,e as n,C as p}from"./iframe-BFeF9gk2.js";import{useMDXComponents as r}from"./index-ozDmechc.js";import{muiComponents as s}from"./defaultTheme.stories-RSgS5elw.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BQ1u6IUA.js";import"./context-CcjSgJEl.js";import"./ExpandMore-CC4zVwy0.js";import"./createSvgIcon-DZsBN_jU.js";import"./SvgIcon-f85fcE7w.js";import"./Typography-hI18_TwR.js";import"./Box-BKRViR-C.js";import"./useSlot-CbKsaWOU.js";import"./mergeSlotProps-DnUMdTYF.js";import"./useControlled-C1F4iWXj.js";import"./useTheme-CJCRPKcM.js";import"./utils-DVP9FpvH.js";import"./useTimeout-DHMgKmaj.js";import"./Paper-CyDMh1-h.js";import"./ButtonBase-sRQUBi5w.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DsNAtt7l.js";import"./styled-CH-DqwsO.js";import"./listItemTextClasses-DseFidaJ.js";import"./useThemeProps-DCty8Iof.js";import"./getThemeProps-B0jypEog.js";import"./Alert-B1Spb9mW.js";import"./Tab-CWMSE8tr.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-fqu9cOGN.js";import"./IconButton-CWuSKACi.js";import"./CircularProgress-C7jJUx11.js";import"./getValidReactChildren-B9eySIEQ.js";import"./TablePagination-Dx3kPqif.js";import"./Select-CGoigSZ0.js";import"./MenuItem-C2Swpt5T.js";import"./Popover-BuKSX9t8.js";import"./Portal-DvqV-6aj.js";import"./Fade-uSRWjqvd.js";import"./dividerClasses-CHYLQ8Z7.js";import"./Toolbar-CZj_Y2oP.js";import"./Tooltip-tE0K37SL.js";import"./Badge-RaRLKXe5.js";import"./Button-Bq92fsRd.js";import"./Stack-BH-NSAfB.js";import"./Card-D1xxY3vg.js";import"./CardContent-jCs4trXp.js";import"./Chip-Cbsk5I4p.js";import"./ListItem-BYAgKX0I.js";import"./Slider-D_S7SGGO.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
