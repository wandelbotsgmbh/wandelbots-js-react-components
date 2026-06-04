import{j as o,M as m,e as n,C as p}from"./iframe-BktpLyFG.js";import{useMDXComponents as r}from"./index-DVaYwRcD.js";import{muiComponents as s}from"./defaultTheme.stories-D4SB-RyR.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BkYu4_0b.js";import"./context-Cblz76sC.js";import"./ExpandMore-CTDywhdy.js";import"./createSvgIcon-3XXHrKCW.js";import"./SvgIcon-DVr8FpOn.js";import"./Typography-Voa_F59U.js";import"./Box-6_1luqr6.js";import"./useSlot-HeRHl38G.js";import"./mergeSlotProps-Dw9MGOG8.js";import"./useControlled-BIYqvKFk.js";import"./useTheme-vGz388W0.js";import"./utils-5rAu8RCr.js";import"./useTimeout-DalGcRLt.js";import"./Paper-D3YakWmv.js";import"./ButtonBase-D0Z-haiV.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-KhyWMNOF.js";import"./styled-DAuixZZr.js";import"./listItemTextClasses-DTgc7c2b.js";import"./useThemeProps-BnDuMFvZ.js";import"./getThemeProps-VRdCsbYl.js";import"./Alert-CvY8Cfq_.js";import"./Tab-CXbn_kY8.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-9D-wZKDg.js";import"./IconButton--tvB0ucb.js";import"./CircularProgress-sS5KrYs0.js";import"./getValidReactChildren-BCi9coFi.js";import"./TablePagination-Crne1KVB.js";import"./Popover-VSBWPDPW.js";import"./Portal-LQN90JnI.js";import"./Fade-D-Ukbu1X.js";import"./Select-CbEEf3GV.js";import"./MenuItem-BQnQWa3q.js";import"./dividerClasses-Wzv_-_UV.js";import"./Toolbar-iOoFAt5Q.js";import"./Tooltip-DuNDJ5Df.js";import"./Badge-Ccnqx8Eb.js";import"./Button-DUdd8WAk.js";import"./Stack-B4LRxMix.js";import"./Card-DN1ZgJdO.js";import"./CardContent-Arg7Xqnx.js";import"./Chip-CsCfhxc2.js";import"./ListItem-BR3_uU9g.js";import"./Slider-4Ggq5fjF.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
