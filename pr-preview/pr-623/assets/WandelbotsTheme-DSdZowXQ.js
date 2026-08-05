import{j as e,M as m,e as n,C as s}from"./iframe-BULENBHd.js";import{useMDXComponents as i}from"./index-ChdTMMLq.js";import{muiComponents as p}from"./defaultTheme.stories-QvD1TavE.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BvhamZqx.js";import"./context-DFJAjtTV.js";import"./ExpandMore-zlOophia.js";import"./createSvgIcon-sLy3FjYc.js";import"./SvgIcon-nQTFzumX.js";import"./Typography-CARqZca3.js";import"./Box-CX3FDlk8.js";import"./useSlot-C6dvsjnW.js";import"./mergeSlotProps-C_H8PwmJ.js";import"./useControlled-BbfoK_k3.js";import"./useTheme-DCM-apCM.js";import"./utils-CZdWku2T.js";import"./useTimeout-04jR6ZL1.js";import"./Paper-GkpUQsdz.js";import"./ButtonBase-DOLyEsKI.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-B_-CAde2.js";import"./styled-Dqw9CmZ9.js";import"./listItemTextClasses-B4EUYCcH.js";import"./useThemeProps-DZ-EXUYI.js";import"./getThemeProps-B2nkLcbG.js";import"./Alert-BwW18oXL.js";import"./Tab-Dod_GHdh.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-Ckf3mzOD.js";import"./IconButton-pjEx_P91.js";import"./CircularProgress-CukT95En.js";import"./getValidReactChildren-YaqulXmv.js";import"./TablePagination-CNI6i7oR.js";import"./Select-sChawSsR.js";import"./MenuItem-AfCImRDX.js";import"./Popover-MsnhAfIu.js";import"./Portal-gJuR3Sso.js";import"./Fade-CUUmvSB6.js";import"./dividerClasses-C_v1rRJ8.js";import"./Toolbar-CAjMGTNh.js";import"./Tooltip-CzZIcKvl.js";import"./Badge-TLMNhArM.js";import"./Button-C2xfuuZr.js";import"./Stack-BXDyryDC.js";import"./Card-DkqRvIhW.js";import"./CardContent-BZFyUTZt.js";import"./Chip-6gLIMOaL.js";import"./ListItem-ChS-V6Yh.js";import"./Slider-BDzTQe0o.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
