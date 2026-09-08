import{j as e,M as m,e as n,C as s}from"./iframe-DYTX7wAR.js";import{useMDXComponents as i}from"./index-CPW1b6Fr.js";import{muiComponents as p}from"./defaultTheme.stories-CtfRglPG.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Dx9Xmeca.js";import"./context-Alb2AyRI.js";import"./ExpandMore-BQsdk9uk.js";import"./createSvgIcon-CCbHjsbF.js";import"./SvgIcon-By_QyyhL.js";import"./Typography-CAlWe7IC.js";import"./Box-DN0P7hR8.js";import"./useSlot-BkIRJy81.js";import"./mergeSlotProps-UPbiAEcF.js";import"./useControlled-8fAOB_F6.js";import"./useTheme-DuaDv9u6.js";import"./utils-D_eAC1T_.js";import"./useTimeout-CTU1lD2w.js";import"./Paper-BpuYudHq.js";import"./ButtonBase-gZVlVl5a.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BsIJA-oi.js";import"./listItemTextClasses-pfOj542Z.js";import"./styled-Bbt82TbU.js";import"./useThemeProps-C_yIZhz1.js";import"./getThemeProps-CccIGP6S.js";import"./Alert-H_ehVnMt.js";import"./Tab-DIS8PS68.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-fmZCCnoV.js";import"./IconButton-D1RGLoLX.js";import"./CircularProgress-BedGh8A5.js";import"./getValidReactChildren-koMmtBGF.js";import"./TablePagination-B8Nbmajc.js";import"./Select-DA-2rcK7.js";import"./MenuItem-haDre_y4.js";import"./Popover-BH7BFmaa.js";import"./Portal-B_Ex1sh-.js";import"./Fade-CwX6uvV7.js";import"./dividerClasses-DmLmEbD2.js";import"./Toolbar-DjaFK1sr.js";import"./Tooltip-DR-V2dy2.js";import"./Badge-BPRKGVmu.js";import"./Button-Bjf16zt8.js";import"./Stack-LGByhYoZ.js";import"./Card-t89m8eJ-.js";import"./CardContent-CDXHIEXW.js";import"./Chip-vDflTDz2.js";import"./ListItem-B4pFkHxg.js";import"./Slider-LVKir6cb.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
