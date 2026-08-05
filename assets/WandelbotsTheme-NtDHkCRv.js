import{j as e,M as m,e as n,C as s}from"./iframe-CZsDXUGY.js";import{useMDXComponents as i}from"./index-BzNNBhKg.js";import{muiComponents as p}from"./defaultTheme.stories-CnNwO1R2.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Do6K1j38.js";import"./context-CDzm82JD.js";import"./ExpandMore-D9gJTa2d.js";import"./createSvgIcon-kq69jG0g.js";import"./SvgIcon-Do6Waq8N.js";import"./Typography-sUnuH8ns.js";import"./Box-Bv6dOwbO.js";import"./useSlot-Cxt_r3nM.js";import"./mergeSlotProps-DAaHsJF1.js";import"./useControlled-Bx6NLe-n.js";import"./useTheme-BVvwGCN-.js";import"./utils-3WztzHKR.js";import"./useTimeout-TB38rTy-.js";import"./Paper-CQgoA7Zp.js";import"./ButtonBase-DWuN0-Tw.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CTeeuGd9.js";import"./styled-D9crd3vb.js";import"./listItemTextClasses-Us74v_nn.js";import"./useThemeProps-dtNMfdPJ.js";import"./getThemeProps-e0hYUUUg.js";import"./Alert-CrL3rgbb.js";import"./Tab-C9b0yi1l.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-D9bPlNEX.js";import"./IconButton-DFaEPgj7.js";import"./CircularProgress-D-hd5tNh.js";import"./getValidReactChildren-BhiVPQ1C.js";import"./TablePagination-rSzoictZ.js";import"./Select-BIXURQir.js";import"./MenuItem-BfUsxBSO.js";import"./Popover-Bmp1pyP_.js";import"./Portal-BOkPY5oH.js";import"./Fade-BWl1OJUu.js";import"./dividerClasses-Dt9Vc5Lf.js";import"./Toolbar-DvzKXqWF.js";import"./Tooltip-B5Hf59BK.js";import"./Badge-4X18HbCm.js";import"./Button-DgKnLxfx.js";import"./Stack-CkI4qMcw.js";import"./Card-ChgjjDu7.js";import"./CardContent-BOK_cJKI.js";import"./Chip-D_WbMQ7j.js";import"./ListItem-DRtOSQBK.js";import"./Slider-Cd_ims_c.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
