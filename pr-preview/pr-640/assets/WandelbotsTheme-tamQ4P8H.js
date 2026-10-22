import{j as e,M as m,e as n,C as s}from"./iframe-thrxo2Nv.js";import{useMDXComponents as i}from"./index-BENrqwg9.js";import{muiComponents as p}from"./defaultTheme.stories-B9OJSxvT.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-C1xl5akl.js";import"./context-D2CMOXZU.js";import"./ExpandMore-B2KvUv8X.js";import"./createSvgIcon-D-QAyx8G.js";import"./SvgIcon-Czt8aDBR.js";import"./Typography-DQDqRtH5.js";import"./Box-D39Zps6G.js";import"./useSlot-B3_ip8PF.js";import"./mergeSlotProps-C8AaGziJ.js";import"./useControlled-opMXDOo7.js";import"./useTheme-CUJqkKyv.js";import"./utils-BTzuTdVV.js";import"./useTimeout-CymiKGsG.js";import"./Paper-DwQ1eQyY.js";import"./ButtonBase-BBm3c9gu.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-dA_6Esta.js";import"./listItemTextClasses-BPgoyIvV.js";import"./styled-OTyuFKS0.js";import"./useThemeProps-COHJr5Jc.js";import"./getThemeProps-Cw2ehNnN.js";import"./Alert-CUx4KYwh.js";import"./Tab-CG1cF87y.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-KIMnxfFm.js";import"./IconButton-BTzc7LFi.js";import"./CircularProgress-BHOpG9pC.js";import"./getValidReactChildren-Bp60WvUU.js";import"./TablePagination-BXNLouOI.js";import"./Select-DuD9aif9.js";import"./MenuItem-CJaNj_cT.js";import"./Popover-TNgCtkaB.js";import"./Portal-D5iKhnWE.js";import"./Fade-5W3Sj3pk.js";import"./dividerClasses-D2RQns_9.js";import"./Toolbar-Cy3ww1Nf.js";import"./Tooltip-Dgct_DX2.js";import"./Badge-Cn7-36fC.js";import"./Button-BLtAvx2H.js";import"./Stack-Cy_XserE.js";import"./Card-CM-cNtyH.js";import"./CardContent-BVKqI5VV.js";import"./Chip-Ct98WUTj.js";import"./ListItem-B-SqgkfA.js";import"./Slider-BN0Hkb9G.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
