import{j as e,M as m,e as n,C as s}from"./iframe-CL-edXTw.js";import{useMDXComponents as i}from"./index-CgANnAhB.js";import{muiComponents as p}from"./defaultTheme.stories-CYVvW9p_.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-59hF3qLj.js";import"./context-CovjpBNc.js";import"./ExpandMore-DXkakruU.js";import"./createSvgIcon-Nc08Icb7.js";import"./SvgIcon-Ds6AZaXJ.js";import"./Typography-DzQ3lFHr.js";import"./Box-CzEV8ehf.js";import"./useSlot-Bjstjuyh.js";import"./mergeSlotProps-TWfjtR2l.js";import"./useControlled-Bxzb7-Fy.js";import"./useTheme-fgOHMgns.js";import"./utils-D6l2ISkt.js";import"./useTimeout-PUthFASg.js";import"./Paper-DQU5icyX.js";import"./ButtonBase-DWKVx7tM.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BkAjjOGf.js";import"./styled-DO2rxddS.js";import"./listItemTextClasses-DV8vypFK.js";import"./useThemeProps-DVvvt_4I.js";import"./getThemeProps-ClUx_wFD.js";import"./Alert-BPi4mFEa.js";import"./Tab-BxOeUlCq.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-D-KGP_X-.js";import"./IconButton-Mys-qOD8.js";import"./CircularProgress-DIw1f8JU.js";import"./getValidReactChildren-B2w3li0L.js";import"./TablePagination-DHJH272i.js";import"./Select-Bmqx_tbi.js";import"./MenuItem-DAFBNjCr.js";import"./Popover-DGFqGLd_.js";import"./Portal-Be8Qp1cS.js";import"./Fade-DCUhO9vr.js";import"./dividerClasses-CiGBVBo1.js";import"./Toolbar-C0MeDT5M.js";import"./Tooltip-cbakQQ9r.js";import"./Badge-CShYePJJ.js";import"./Button-DHYDKkAM.js";import"./Stack-B6GSMolc.js";import"./Card-Cv637-7K.js";import"./CardContent-psqvzzDV.js";import"./Chip-CPPYZAID.js";import"./ListItem-DEymkrpZ.js";import"./Slider-D_0fyICh.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
