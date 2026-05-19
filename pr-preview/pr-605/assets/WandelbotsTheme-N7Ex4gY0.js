import{j as o,M as m,e as n,C as p}from"./iframe-DdWyWVDD.js";import{useMDXComponents as r}from"./index-CO0FximX.js";import{muiComponents as s}from"./defaultTheme.stories-Cf6-rP9D.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-KLNC9fGa.js";import"./context-cJfUDo-s.js";import"./ExpandMore-uRfmXVnN.js";import"./createSvgIcon-DlSCvL73.js";import"./SvgIcon-Co7Jn47e.js";import"./Typography-Ck01T41X.js";import"./Box-BNw0iW83.js";import"./useSlot-Yl7XXinQ.js";import"./mergeSlotProps-CLc7fnYi.js";import"./useControlled-DMjVbNMR.js";import"./useTheme-CDSN3cgg.js";import"./utils-B2B_Jjp4.js";import"./useTimeout-D5yuWDxJ.js";import"./Paper-BdF1yiZX.js";import"./ButtonBase-DoB0UBrl.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Bs8g91ZN.js";import"./styled-bFkaIJxA.js";import"./listItemTextClasses-UHWtj3hi.js";import"./useThemeProps-DtaAnbgQ.js";import"./getThemeProps-p89wCuJk.js";import"./Alert-BeV76nU7.js";import"./Tab-BAeSSayC.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-q1uY7y4q.js";import"./IconButton-Dzoi8YVQ.js";import"./CircularProgress-CZfZ6yaf.js";import"./getValidReactChildren-CLPAFsOt.js";import"./TablePagination-BDCaA54n.js";import"./Popover-CPh7LNu0.js";import"./Portal-DaZL1XBX.js";import"./Fade-D5oferu6.js";import"./Select-CrL8uIeG.js";import"./MenuItem-CkDO8ino.js";import"./dividerClasses-Suq3Ongg.js";import"./Toolbar-CV_mNfKf.js";import"./Tooltip-kLZlCaDw.js";import"./Badge-bqbJm3vs.js";import"./Button-DnMIqc0-.js";import"./Stack-Bl_ppWKM.js";import"./Card-BUmq615p.js";import"./CardContent-CwCNJVxj.js";import"./Chip-MC-oXLWv.js";import"./ListItem-CAcS_9C6.js";import"./Slider-fYfR2gbb.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
