import{j as o,M as m,e as n,C as p}from"./iframe-C6efqv-b.js";import{useMDXComponents as r}from"./index-GiS8QRlh.js";import{muiComponents as s}from"./defaultTheme.stories-DS6LB_7D.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-XwlA-YqM.js";import"./context-1EyHmWU5.js";import"./ExpandMore-BUBYS-xi.js";import"./createSvgIcon-By9YLSaT.js";import"./SvgIcon-Cn7goNaQ.js";import"./Typography-Bo0MZfat.js";import"./Box-BByRVkM-.js";import"./useSlot-DG91fb9b.js";import"./mergeSlotProps-bceKToba.js";import"./useControlled-7_zNxTDA.js";import"./useTheme-BL5iGsl1.js";import"./utils-S5i3maOq.js";import"./useTimeout-C1o2m10z.js";import"./Paper-CN6FDtrs.js";import"./ButtonBase-Dw5oWCva.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BsQzZepm.js";import"./styled-tImL_YU6.js";import"./listItemTextClasses-D_U_raHz.js";import"./useThemeProps-DHBfJ2BH.js";import"./getThemeProps-BctRbvUZ.js";import"./Alert-Dsul4Ik_.js";import"./Tab-CdNl6UDw.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-vreILQyR.js";import"./IconButton-CsdhbdwO.js";import"./CircularProgress-Czc3mMCY.js";import"./getValidReactChildren-nQdDtGKg.js";import"./TablePagination-Df55c7xf.js";import"./Popover-CornEv8g.js";import"./Portal-BgnjKL3h.js";import"./Fade-T8dzFM2c.js";import"./Select-BA0D7Wv4.js";import"./MenuItem-BfIOlI4c.js";import"./dividerClasses---uiWqaz.js";import"./Toolbar-DJqnBAZF.js";import"./Tooltip-e2xndef4.js";import"./Badge-BZFfZvSP.js";import"./Button-ZnBBCIKU.js";import"./Stack-CKJ_TzTV.js";import"./Card-CCwV0pEj.js";import"./CardContent-Ca9Y_fdX.js";import"./Chip-C68Ed0QU.js";import"./ListItem-Ck-nVJM3.js";import"./Slider-HAE0CluQ.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
