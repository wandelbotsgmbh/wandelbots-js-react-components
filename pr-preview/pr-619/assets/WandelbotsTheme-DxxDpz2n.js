import{j as o,M as m,e as n,C as p}from"./iframe-ClPjLESK.js";import{useMDXComponents as i}from"./index-ChWOXs0v.js";import{muiComponents as s}from"./defaultTheme.stories-CpEdJ7Sn.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-7iC9ztzr.js";import"./context-DyGSmiAH.js";import"./ExpandMore-CVil0Tg2.js";import"./createSvgIcon-CjZKo-in.js";import"./SvgIcon-BBehSt2Y.js";import"./Typography-JNlZg_gZ.js";import"./Box-CqOMTEFa.js";import"./useSlot-GSbmP1AL.js";import"./mergeSlotProps-B8wbtBlc.js";import"./useControlled-C1lmEePH.js";import"./useTheme-CJQCZWfl.js";import"./utils-DY5U5uS8.js";import"./useTimeout-RZrI-pdh.js";import"./Paper-CCZfD0xK.js";import"./ButtonBase-DN92I9VY.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DPGpy4jm.js";import"./styled-Do_FGgcP.js";import"./listItemTextClasses-Cjn9P2Pd.js";import"./useThemeProps-BdwZvIA3.js";import"./getThemeProps-adN2yLWB.js";import"./Alert-BSYriPP7.js";import"./Tab-Be_ymnbs.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DIBWfLgH.js";import"./IconButton-ekWQfTZp.js";import"./CircularProgress-CuuZW_ne.js";import"./getValidReactChildren-D_iot0YP.js";import"./TablePagination-CmeGDBzG.js";import"./Select-Cb7hW27q.js";import"./MenuItem-VgtzrJvE.js";import"./Popover-BWqOOyUp.js";import"./Portal-CGIAgBF9.js";import"./Fade-DVw_YgbL.js";import"./dividerClasses-CWk0QRyV.js";import"./Toolbar-BvqSWmIC.js";import"./Tooltip-CTWdvJ_s.js";import"./Badge-CReCnBH1.js";import"./Button-C-w9gvNa.js";import"./Stack-MmW22r8z.js";import"./Card-BKb9OGoI.js";import"./CardContent-CH77x382.js";import"./Chip-Bpd-REVx.js";import"./ListItem-BiKC9G4Y.js";import"./Slider-CJPkKyoN.js";function r(e){const t={a:"a",code:"code",h1:"h1",p:"p",...i(),...e.components};return o.jsxs(o.Fragment,{children:[`
`,`
`,`
`,o.jsx(m,{title:"Theming/Wandelbots MUI Theme"}),`
`,o.jsx(t.h1,{id:"wandelbots-mui-theme",children:"Wandelbots MUI Theme"}),`
`,o.jsxs(t.p,{children:[`The component library comes with a Wandelbots theme for Material UI which is the default theme used in this storybook.
If you like, you can use it in your own app to give the components a similar look.
The theme is accessed by calling `,o.jsx(t.code,{children:"createNovaTheme"}),", and can be ",o.jsx(t.a,{href:"?path=/docs/theming-theming-components--docs",children:"customized"})," as needed."]}),`
`,o.jsxs(t.p,{children:["The theme comes in dark and light variants using the standard MUI ",o.jsxs(t.a,{href:"https://mui.com/material-ui/customization/dark-mode/",rel:"nofollow",children:[o.jsx(t.code,{children:"palette.mode"})," option"]}),"."]}),`
`,o.jsx(n,{dark:!0,code:`
import { ThemeProvider } from "@mui/material"
import { createNovaTheme } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaTheme()

<ThemeProvider theme={theme}>
...
</ThemeProvider>
`}),`
`,o.jsx(p,{of:s,sourceState:"none"})]})}function no(e={}){const{wrapper:t}={...i(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(r,{...e})}):r(e)}export{no as default};
