import{j as e,M as m,e as n,C as s}from"./iframe-CHRrQrpf.js";import{useMDXComponents as i}from"./index-D7iVsuG-.js";import{muiComponents as p}from"./defaultTheme.stories-rgAlzGyT.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DE-553Eg.js";import"./context-jM6KHFiw.js";import"./ExpandMore-BkMMnjPN.js";import"./createSvgIcon-pw13r3-e.js";import"./SvgIcon-3NA9EXNl.js";import"./Typography-scsTkIWG.js";import"./Box-W09X9YSz.js";import"./useSlot-MrVdrNIp.js";import"./mergeSlotProps-EWh3k8H1.js";import"./useControlled-BBuMN09C.js";import"./useTheme-14eFBSLu.js";import"./utils-BpoNUnYa.js";import"./useTimeout-DX5FA95s.js";import"./Paper-BgUFvY5I.js";import"./ButtonBase-CLMrMBL2.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BYWDJ9r4.js";import"./listItemTextClasses-BSUch6BX.js";import"./styled-Czcq0AwZ.js";import"./useThemeProps-N-UYjPi1.js";import"./getThemeProps-BrgMGzIv.js";import"./Alert-Bwb8LO5U.js";import"./Tab-D-I1BrML.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-0vt-uzNm.js";import"./IconButton-DZz85T-S.js";import"./CircularProgress-CVfgvaXz.js";import"./getValidReactChildren-BekppnJ6.js";import"./TablePagination-DxU7puoM.js";import"./Select-cTCdab8B.js";import"./MenuItem-Bn-875Ae.js";import"./Popover-axjAzeZl.js";import"./Portal-gLv9JpB-.js";import"./Fade-ChgJ7mm7.js";import"./dividerClasses-jsROuSr_.js";import"./Toolbar-CUeu56Rz.js";import"./Tooltip-CLnxJTYs.js";import"./Badge-BSDRs-2Q.js";import"./Button-CbJiUMaX.js";import"./Stack-chcLftao.js";import"./Card-BcLXFh5U.js";import"./CardContent-B3QvQZF-.js";import"./Chip-C_K8iAsF.js";import"./ListItem-Dn4308V5.js";import"./Slider-DSlQwd6p.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
