import{j as e,M as m,e as n,C as s}from"./iframe-CkNgdxeF.js";import{useMDXComponents as i}from"./index-COMHaLL2.js";import{muiComponents as p}from"./defaultTheme.stories-B8KKTlHW.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-CegwMWPl.js";import"./context-BZPJXfZC.js";import"./ExpandMore-BkazWPrR.js";import"./createSvgIcon-DqkDMCkp.js";import"./SvgIcon-BvbJMwnL.js";import"./Typography-CF7wFBPN.js";import"./Box-CiapCYj-.js";import"./useSlot-DJc-LRt3.js";import"./mergeSlotProps--TtYLRfs.js";import"./useControlled-OtMMyrJG.js";import"./useTheme-CDqTuutn.js";import"./utils-7rrYUnS9.js";import"./useTimeout-BjFS5r2H.js";import"./Paper-Da0usnJ2.js";import"./ButtonBase-CnjBY7VK.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-m_z_5XZ7.js";import"./styled-BxUOQt-w.js";import"./listItemTextClasses-C31q-Qxo.js";import"./useThemeProps-BT3T52rl.js";import"./getThemeProps-Cb0A8BUx.js";import"./Alert-BWu_LU8a.js";import"./Tab-BI6GlSfI.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DKvs31ta.js";import"./IconButton-BRWfR7k0.js";import"./CircularProgress-B_IE56LL.js";import"./getValidReactChildren-Hu7h3U4y.js";import"./TablePagination-Bhv1ww75.js";import"./Select-uDuA350u.js";import"./MenuItem-Q2IBCxYs.js";import"./Popover-8hOq99B5.js";import"./Portal-Cw1SZYW9.js";import"./Fade-BMBwUSeg.js";import"./dividerClasses-BitFvwUN.js";import"./Toolbar-DeTB0J3h.js";import"./Tooltip-B14cyVk1.js";import"./Badge-BNi6NlKV.js";import"./Button-BDq74niP.js";import"./Stack-CUoNksGc.js";import"./Card-BdNLx5QW.js";import"./CardContent-BgPQYCXh.js";import"./Chip-BzeT-FM6.js";import"./ListItem-HF9elIYp.js";import"./Slider-BqA-4m09.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
`,`
`,`
`,e.jsx(m,{title:"Theming/Wandelbots MUI Theme"}),`
`,e.jsx(o.h1,{id:"wandelbots-mui-theme",children:"Wandelbots MUI Theme"}),`
`,e.jsxs(o.p,{children:[`The component library comes with a Wandelbots theme for Material UI which is the default theme used in this storybook.
If you like, you can use it in your own app to give the components a similar look.
The theme is accessed by calling `,e.jsx(o.code,{children:"createNovaTheme"}),", and can be ",e.jsx(o.a,{href:"?path=/docs/theming-theming-components--docs",children:"customized"})," as needed."]}),`
`,e.jsxs(o.p,{children:["The theme currently supports ",e.jsx(o.strong,{children:"dark mode only"}),". Passing ",e.jsx(o.code,{children:'palette: { mode: "light" }'})," is silently ignored (with a console warning) — light tokens are not yet available from Figma."]}),`
`,e.jsxs(o.blockquote,{children:[`
`,e.jsxs(o.p,{children:[e.jsx(o.strong,{children:"Migration note:"})," ",e.jsx(o.code,{children:"createNovaMuiTheme"})," is deprecated. Rename to ",e.jsx(o.code,{children:"createNovaTheme"}),` — it accepts
the same options (now variadic: pass multiple `,e.jsx(o.code,{children:"ThemeOptions"}),` objects to deep-merge in order).
The old name will be removed in the next major release.`]}),`
`]}),`
`,e.jsx(n,{dark:!0,code:`
import { ThemeProvider } from "@mui/material"
import { createNovaTheme } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaTheme()

<ThemeProvider theme={theme}>
...
</ThemeProvider>
`}),`
`,e.jsx(s,{of:p,sourceState:"none"})]})}function ne(t={}){const{wrapper:o}={...i(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(r,{...t})}):r(t)}export{ne as default};
