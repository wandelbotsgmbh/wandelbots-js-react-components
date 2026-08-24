import{j as e,M as m,e as n,C as s}from"./iframe-Cfpn6AnA.js";import{useMDXComponents as i}from"./index-CEipWoxG.js";import{muiComponents as p}from"./defaultTheme.stories-DMmcYIBe.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BZdo9UBH.js";import"./context-qz4xXuXR.js";import"./ExpandMore-CbSv6PSx.js";import"./createSvgIcon-Cnnf11au.js";import"./SvgIcon-Ds_UxC8s.js";import"./Typography-CErKEqpU.js";import"./Box-Bth11ovj.js";import"./useSlot-BFUtYE45.js";import"./mergeSlotProps-DPSOiPkq.js";import"./useControlled-BKtRi9Kf.js";import"./useTheme-B6scBczm.js";import"./utils-D6e1KYsT.js";import"./useTimeout-DCUfdBrU.js";import"./Paper-BRm-pAJ_.js";import"./ButtonBase-vziP4r3Q.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BX6b54Qz.js";import"./styled-BoiceWH7.js";import"./listItemTextClasses-bp71X-AF.js";import"./useThemeProps-Cb3OjXe3.js";import"./getThemeProps-DAII0hVq.js";import"./Alert-CrwjVA6J.js";import"./Tab-BQ1tiPQa.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-Df1FhVcq.js";import"./IconButton-BSt3XNo9.js";import"./CircularProgress-BFRoVToB.js";import"./getValidReactChildren-B-AWzSTg.js";import"./TablePagination-DrlddGYm.js";import"./Select-peYPYfqb.js";import"./MenuItem-ub1-8F3T.js";import"./Popover-DROQg7O5.js";import"./Portal-BEQ85evd.js";import"./Fade-BRvJafNo.js";import"./dividerClasses-xorLfWyY.js";import"./Toolbar-DYAG1tes.js";import"./Tooltip-Dsr8Nv5W.js";import"./Badge-DXjxzdmK.js";import"./Button-B2b0n6BO.js";import"./Stack-4bJiq57Y.js";import"./Card-BhAoNJiz.js";import"./CardContent-Ba5qh5Xm.js";import"./Chip-DR1Rhuj-.js";import"./ListItem-DlWSUa_q.js";import"./Slider-Decf1MmP.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
