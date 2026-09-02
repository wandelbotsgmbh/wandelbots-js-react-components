import{j as e,M as m,e as n,C as s}from"./iframe-DVABygGB.js";import{useMDXComponents as i}from"./index-FD8o0OGF.js";import{muiComponents as p}from"./defaultTheme.stories-BQ1TRzeD.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-B2-IdwDO.js";import"./context-BXUSAXvA.js";import"./ExpandMore-B8D9Xffr.js";import"./createSvgIcon-BxnmXMCS.js";import"./SvgIcon-CAK9whZL.js";import"./Typography-opa92pxK.js";import"./Box-C_oyWmqa.js";import"./useSlot-C8Pjq9xN.js";import"./mergeSlotProps-Bt-plzGd.js";import"./useControlled-dTJo4MDw.js";import"./useTheme-o35uV6O-.js";import"./utils-BnKYtJRX.js";import"./useTimeout-CaF7kKa6.js";import"./Paper-tXuYQBmX.js";import"./ButtonBase-DuZV6Rh1.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-phrS-xEf.js";import"./listItemTextClasses-Cl0fFQXA.js";import"./styled-CZ_inNSq.js";import"./useThemeProps-D1ZVKsgN.js";import"./getThemeProps-VrgOpOq4.js";import"./Alert-B1FcaLwz.js";import"./Tab-Wx1YwtYL.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DUGzrhIo.js";import"./IconButton-Bq5Zq_jm.js";import"./CircularProgress-DbKSzzOa.js";import"./getValidReactChildren-BuWC21AR.js";import"./TablePagination-DJUJCpa7.js";import"./Select-CH1PRBEz.js";import"./MenuItem-S6pInyrF.js";import"./Popover-CcgJKWBi.js";import"./Portal-Boz6v1X4.js";import"./Fade-CAWlMldG.js";import"./dividerClasses-CvoeQLaf.js";import"./Toolbar-Bq-hfV1_.js";import"./Tooltip-D6OKqr7J.js";import"./Badge-CMuBNsHz.js";import"./Button-SiU2wBhD.js";import"./Stack-Cq707yTR.js";import"./Card-8HajoKwj.js";import"./CardContent-Fjg1WIdf.js";import"./Chip-D8XFQMKy.js";import"./ListItem-BGyDn38R.js";import"./Slider-DFpCWrJh.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
