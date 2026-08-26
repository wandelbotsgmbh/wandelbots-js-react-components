import{j as e,M as m,e as n,C as s}from"./iframe-BrmrOCzp.js";import{useMDXComponents as i}from"./index-B5dPVPCi.js";import{muiComponents as p}from"./defaultTheme.stories-BlbpzCY4.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DXyyqZs7.js";import"./context-DgBZYKyV.js";import"./ExpandMore-BRrkkbCy.js";import"./createSvgIcon-B2kYwyZD.js";import"./SvgIcon-Ciq8AI-7.js";import"./Typography-Dq-ZZ20F.js";import"./Box-CcZxxKlY.js";import"./useSlot-C8qAsIOn.js";import"./mergeSlotProps-rLIgBGjk.js";import"./useControlled-Bq8FnJqZ.js";import"./useTheme-BPXyZQUs.js";import"./utils-CpK6nZ72.js";import"./useTimeout-CPdwtlmY.js";import"./Paper-h8QfcexE.js";import"./ButtonBase-DcDC2r4x.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-C2OEuN6i.js";import"./styled-Cn81LYqI.js";import"./listItemTextClasses-vH7koIJz.js";import"./useThemeProps-DXCRiTur.js";import"./getThemeProps-Cg-ZuiXr.js";import"./Alert-DXSFpbbd.js";import"./Tab-Cf7vx-2b.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CBLUJ1-6.js";import"./IconButton-BSbIGxvn.js";import"./CircularProgress-D0xnzDae.js";import"./getValidReactChildren-Bvve1TwL.js";import"./TablePagination-D5FIQGEj.js";import"./Select-DQKXCi4P.js";import"./MenuItem-CXHa_5Ii.js";import"./Popover-BQgfEbHN.js";import"./Portal-BAO1eqlZ.js";import"./Fade-yVr_W3cf.js";import"./dividerClasses-DYKnHf30.js";import"./Toolbar-BxiepiQs.js";import"./Tooltip-CZ7lwg-8.js";import"./Badge-e7xIcarr.js";import"./Button-CWt_e4k5.js";import"./Stack-BQ613KHW.js";import"./Card-DZzoNxYN.js";import"./CardContent-D4l-SG3V.js";import"./Chip-BHwsSA5h.js";import"./ListItem-Z8fZe_zp.js";import"./Slider-COk_Dl3F.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
