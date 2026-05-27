import{j as o,M as m,e as n,C as p}from"./iframe-Bs93Cmuy.js";import{useMDXComponents as r}from"./index-DyHyw214.js";import{muiComponents as s}from"./defaultTheme.stories-DsQxaFBU.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Cuxcw2GU.js";import"./context-CJqIUTOv.js";import"./ExpandMore-D6Bg0Zrb.js";import"./createSvgIcon-Czdv3772.js";import"./SvgIcon-DaRZEuUg.js";import"./Typography-Do2RZT0N.js";import"./Box-CPsmUjbp.js";import"./useSlot-DetuhBgA.js";import"./mergeSlotProps-zn5sdWwH.js";import"./useControlled-C_9hQIb-.js";import"./useTheme-C3gcx3LF.js";import"./utils-BwsrCMpV.js";import"./useTimeout-DZMysQnm.js";import"./Paper-Vo6N-m_A.js";import"./ButtonBase-Dzz3fGVQ.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BBxY8Gnf.js";import"./styled-C0LrGXlW.js";import"./listItemTextClasses-DHirL5h6.js";import"./useThemeProps-FlxZaJqz.js";import"./getThemeProps-B9thdXYp.js";import"./Alert-DUKQ1-UN.js";import"./Tab-CDEzWCnW.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-B4rn0cU4.js";import"./IconButton-D3gUKoDy.js";import"./CircularProgress-B07tln9G.js";import"./getValidReactChildren-BW4askwh.js";import"./TablePagination-Dq44PFdc.js";import"./Popover-hYALo3de.js";import"./Portal-wUStjj0g.js";import"./Fade-DV80J1qt.js";import"./Select-Cri6HUG3.js";import"./MenuItem-Cz-iAHbN.js";import"./dividerClasses-aNg_NK0w.js";import"./Toolbar-B6hjepaZ.js";import"./Tooltip-CheVfmA_.js";import"./Badge-CW7YfeOW.js";import"./Button-Wr8ALqoI.js";import"./Stack-BUQ6j-GQ.js";import"./Card-_AsX6PGa.js";import"./CardContent-DfelFs0K.js";import"./Chip-D-R4UvUQ.js";import"./ListItem-CVw43WIS.js";import"./Slider-CWpyrshd.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
