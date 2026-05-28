import{j as o,M as m,e as n,C as p}from"./iframe-Waa6VYzJ.js";import{useMDXComponents as r}from"./index-Mhh_WMH6.js";import{muiComponents as s}from"./defaultTheme.stories-COVfUt3G.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Bw2Mwq5j.js";import"./context-Bj76iq7P.js";import"./ExpandMore-BkdoPM1a.js";import"./createSvgIcon-DadHriq4.js";import"./SvgIcon-gx3vOPYm.js";import"./Typography-DY5O9HeQ.js";import"./Box-D-TeUImx.js";import"./useSlot-YZMZfCg5.js";import"./mergeSlotProps-q9ck1PPS.js";import"./useControlled-DlxjQNji.js";import"./useTheme-CL_tyFms.js";import"./utils-BSPm6bp3.js";import"./useTimeout-B9-Q51tP.js";import"./Paper-CeFLz4HS.js";import"./ButtonBase-BwWfyHmz.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CWyKzAcs.js";import"./styled-BSRcJChX.js";import"./listItemTextClasses-BBPti5cl.js";import"./useThemeProps-3fkEqJXH.js";import"./getThemeProps-CNgtLbT8.js";import"./Alert-CNAIFpYw.js";import"./Tab-BaLRfoZx.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-fEGg9ULY.js";import"./IconButton-ecjhIcOM.js";import"./CircularProgress-BlWgyOfX.js";import"./getValidReactChildren-lfdl057i.js";import"./TablePagination-Dpu8it8N.js";import"./Popover-Cr8fRFsT.js";import"./Portal-Ddy7rmyb.js";import"./Fade-DfJYid_D.js";import"./Select-DU-ktNCC.js";import"./MenuItem-RUne-M0O.js";import"./dividerClasses-CYWXTyDJ.js";import"./Toolbar-CzArK3ZU.js";import"./Tooltip-FpBN9fEn.js";import"./Badge-DIo4i9mS.js";import"./Button-BWcN-fVy.js";import"./Stack-CeRKZF7m.js";import"./Card-DoY2T4hp.js";import"./CardContent-xQ2pezCg.js";import"./Chip-CazyBqU7.js";import"./ListItem-_eC1poac.js";import"./Slider-DBnPGOZM.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
