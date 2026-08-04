import{j as e,M as m,e as n,C as s}from"./iframe-hUXCLP2m.js";import{useMDXComponents as i}from"./index-1yhvyELA.js";import{muiComponents as p}from"./defaultTheme.stories-708AbZAM.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-NNZ3telc.js";import"./context-CeZbWtx4.js";import"./ExpandMore-CrX6pxxp.js";import"./createSvgIcon-goP6fANp.js";import"./SvgIcon-D08quMO8.js";import"./Typography-BpCcFgCs.js";import"./Box-BK6tP84J.js";import"./useSlot-BuNbhcF2.js";import"./mergeSlotProps-SeF-jlW5.js";import"./useControlled-BjmXxUM9.js";import"./useTheme-5lEezaxf.js";import"./utils-C06F0_GZ.js";import"./useTimeout-CAUgCEbZ.js";import"./Paper-BFoLHb1r.js";import"./ButtonBase-fgbzlvIM.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Digvc4mZ.js";import"./styled-BFYDQIR0.js";import"./listItemTextClasses-DXNzZVcW.js";import"./useThemeProps-Dqkq_xij.js";import"./getThemeProps-jXOs3pzp.js";import"./Alert-B3Dz1xQs.js";import"./Tab-BzIYVN2h.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BYWaBF4F.js";import"./IconButton-BJcuGlK9.js";import"./CircularProgress-DkF5K0_N.js";import"./getValidReactChildren-BWccCPKZ.js";import"./TablePagination-CC7lWrHm.js";import"./Select-aLwTZZZ3.js";import"./MenuItem-DQzcnUDY.js";import"./Popover-BRwnmwmz.js";import"./Portal-CU8JZsfJ.js";import"./Fade-7nvlBWGD.js";import"./dividerClasses-grkBmdn-.js";import"./Toolbar-CAuGDq0P.js";import"./Tooltip-BXQSY5Ux.js";import"./Badge-Bu3aP_EV.js";import"./Button-DnetH9eQ.js";import"./Stack-MVU6gAtW.js";import"./Card-DB8hRYbf.js";import"./CardContent-Ba-KJkTN.js";import"./Chip-CBvopPFA.js";import"./ListItem-Bb8yI7on.js";import"./Slider-DNkZLfmU.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
