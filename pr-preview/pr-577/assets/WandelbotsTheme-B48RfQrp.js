import{j as o,M as m,e as n,C as p}from"./iframe-_RYo2JIA.js";import{useMDXComponents as r}from"./index-C9LS5zGd.js";import{muiComponents as s}from"./defaultTheme.stories-Xm8HhIFX.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-ZD5YR1N6.js";import"./context-B8MGCvuk.js";import"./ExpandMore-OcjzyUYr.js";import"./createSvgIcon-wqDgMg8N.js";import"./SvgIcon-CdGksEMM.js";import"./Typography-FABigBVM.js";import"./Box-D-IVt8YJ.js";import"./useSlot-DxFZy2mo.js";import"./mergeSlotProps-CTICiVxB.js";import"./useControlled-DmDemGJj.js";import"./useTheme-IxdNAN3G.js";import"./utils-RlZKy7iu.js";import"./useTimeout-CSZacgEd.js";import"./Paper-BmYJpO2Z.js";import"./ButtonBase-YNwrcsX1.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-k9UEJ1RT.js";import"./styled-Zhqt0UU3.js";import"./listItemTextClasses-CTD_9mpN.js";import"./useThemeProps-DcmGm_te.js";import"./getThemeProps-3_LeOcqk.js";import"./Alert-CcvghnhV.js";import"./Tab-gp2fscVd.js";import"./getActiveElement-DxURyTVq.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DG4OvPqH.js";import"./IconButton-C7MYT_Qz.js";import"./CircularProgress-CSNNI3hI.js";import"./getValidReactChildren-CE4jL60S.js";import"./TablePagination-67cel6Gb.js";import"./Popover-CbzkPeZV.js";import"./Portal-CMO9hA5x.js";import"./Fade-B0QQe4AI.js";import"./Select-I1KQDllS.js";import"./MenuItem-DHCPTX9o.js";import"./dividerClasses-ChrUcE8B.js";import"./Toolbar-BHM_KlxI.js";import"./Tooltip-C6wBmDR4.js";import"./Badge-CZZlgCKA.js";import"./Button-BfWH79FO.js";import"./Stack-ibPF5CS1.js";import"./Card-C3cG2JrW.js";import"./CardContent-Cg7CYZWK.js";import"./Chip-BaDkzOfp.js";import"./ListItem-B3dPvPit.js";import"./Slider-Cqwl9J9P.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
`,o.jsx(p,{of:s,sourceState:"none"})]})}function mo(e={}){const{wrapper:t}={...r(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(i,{...e})}):i(e)}export{mo as default};
