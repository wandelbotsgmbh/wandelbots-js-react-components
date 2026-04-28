import{j as o,M as m,e as n,C as p}from"./iframe-BrnONMw0.js";import{useMDXComponents as r}from"./index-Dge_MOXM.js";import{muiComponents as s}from"./defaultTheme.stories-BnnuogZC.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-qYnVXIzD.js";import"./context-BJ5rln0u.js";import"./ExpandMore-CzSqMaov.js";import"./createSvgIcon-Dc8GZyfD.js";import"./SvgIcon-CUG56wVz.js";import"./Typography-DYzupmba.js";import"./Box-CoTZIo7n.js";import"./useSlot-B6uK05aG.js";import"./mergeSlotProps-CvPfpLzy.js";import"./useControlled-D9m4a-bf.js";import"./useTheme-CRxijQya.js";import"./utils-BBxGlK1p.js";import"./useTimeout-D7NR9fVI.js";import"./Paper-D2DUEe9f.js";import"./ButtonBase-BSiht2oU.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CKc6RT8h.js";import"./styled-DOQ7WG3p.js";import"./listItemTextClasses-C04UfnMW.js";import"./useThemeProps-DQDz93yQ.js";import"./getThemeProps-D25QP68p.js";import"./Alert-CMXUuE7e.js";import"./Tab-CTjWQhOq.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-IZOWyLSF.js";import"./IconButton-pw2r3n3w.js";import"./CircularProgress-ntQJ96Y-.js";import"./getValidReactChildren-D4Hg-UuX.js";import"./TablePagination-ClNxJuvR.js";import"./Popover-BBqxGnpF.js";import"./Portal-Vsr8woe8.js";import"./Fade-BWFMirVs.js";import"./Select-CnRQLt6d.js";import"./MenuItem-Bd_oDF4m.js";import"./dividerClasses-BEz629pa.js";import"./Toolbar-9HIHA590.js";import"./Tooltip-Bhas-9Zn.js";import"./Badge-Dd3ZyruO.js";import"./Button-C1mbzRpF.js";import"./Stack-UEmqruWd.js";import"./Card-D5xGMXyI.js";import"./CardContent-CY9HMy01.js";import"./Chip-BSd9FW7i.js";import"./ListItem-L_zkA7xy.js";import"./Slider-BL1QlIj8.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
