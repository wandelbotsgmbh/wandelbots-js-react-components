import{j as o,M as m,e as n,C as p}from"./iframe-BqZADguX.js";import{useMDXComponents as r}from"./index-CZdI_Q86.js";import{muiComponents as s}from"./defaultTheme.stories-3Pw12RUi.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DH2TjDiN.js";import"./context-DUW5165K.js";import"./ExpandMore-Ccba6-4s.js";import"./createSvgIcon-DVH8VwjX.js";import"./SvgIcon-Rw5lUk44.js";import"./Typography-Hj7IHUMS.js";import"./Box-CDkM_MwH.js";import"./useSlot-CpiJMHvL.js";import"./mergeSlotProps-B3xPhfN7.js";import"./useControlled-J_GK2IQn.js";import"./useTheme-Do2I_AnB.js";import"./utils-B185CIT0.js";import"./useTimeout-C5fRSlNM.js";import"./Paper-PoOETQFh.js";import"./ButtonBase-Cy63Z8_U.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Bb5mLslO.js";import"./styled-BB9-wi5v.js";import"./listItemTextClasses-BYfGw6ei.js";import"./useThemeProps-D7lX1oqj.js";import"./getThemeProps-ffl-Co6_.js";import"./Alert-DOLAsE0I.js";import"./Tab-7MhTPMbx.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-C2qYTBHF.js";import"./IconButton-iwKhoh8A.js";import"./CircularProgress-06J-Ubqo.js";import"./getValidReactChildren-BF4b0Nmc.js";import"./TablePagination-NjBQX7TF.js";import"./Popover-DtgsKzs7.js";import"./Portal-B5s_FmMV.js";import"./Fade-BTWx5hda.js";import"./Select-3PHB_kF4.js";import"./MenuItem-DA15WSWA.js";import"./dividerClasses-CYdcB3RL.js";import"./Toolbar-DFbULN77.js";import"./Tooltip-D53ZUYJo.js";import"./Badge-B_LQDLpD.js";import"./Button-5-VzsWQj.js";import"./Stack-5qOmdUB0.js";import"./Card-BE8DeYCy.js";import"./CardContent-Ja2sLUiM.js";import"./Chip-cezPI0Ss.js";import"./ListItem-oTDp92aA.js";import"./Slider-CPin_FIn.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
