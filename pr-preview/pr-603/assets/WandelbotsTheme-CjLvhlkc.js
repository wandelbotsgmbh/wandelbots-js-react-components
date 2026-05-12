import{j as o,M as m,e as n,C as p}from"./iframe-QlxCEF0f.js";import{useMDXComponents as r}from"./index-CJXTqmj3.js";import{muiComponents as s}from"./defaultTheme.stories-B5Mx28ag.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DAaWnwD3.js";import"./context-9Ofit6Eh.js";import"./ExpandMore-P61OZ1yK.js";import"./createSvgIcon-DWCmMCDn.js";import"./SvgIcon-YSJMwUPz.js";import"./Typography-D9h2Ip6P.js";import"./Box-BPNEVVPQ.js";import"./useSlot-Tubf4_hd.js";import"./mergeSlotProps-CZfqZwon.js";import"./useControlled-bTet-ea8.js";import"./useTheme-C02dBQHj.js";import"./utils-CuUgICqJ.js";import"./useTimeout-HlOPIonK.js";import"./Paper-CpH6QZqP.js";import"./ButtonBase-BrXE-YKK.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DQ7rHmY7.js";import"./styled-BAUq8f3m.js";import"./listItemTextClasses-KnCVkcfF.js";import"./useThemeProps-CrRSV36O.js";import"./getThemeProps-BC8EGLHF.js";import"./Alert-xleHOzeU.js";import"./Tab-B6TldVaB.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CGBPfxI-.js";import"./IconButton-CSRyS8HJ.js";import"./CircularProgress-D6sWrly4.js";import"./getValidReactChildren-Bzbz1imH.js";import"./TablePagination-OgXRJvp9.js";import"./Popover-3Smzkt9Z.js";import"./Portal-C6xX7wjm.js";import"./Fade-yDZfDAst.js";import"./Select-COltPF5v.js";import"./MenuItem-CsHaMjLl.js";import"./dividerClasses-DVLYTuFp.js";import"./Toolbar-NR_txTXK.js";import"./Tooltip-DUV4KAXm.js";import"./Badge-BiM9USf0.js";import"./Button-BdYVM1mn.js";import"./Stack-BxTuxgLD.js";import"./Card-hE4FFUgB.js";import"./CardContent-CgOb3Ezy.js";import"./Chip-KFOP_A--.js";import"./ListItem-Cai8lSlC.js";import"./Slider-CjLCEfgO.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
