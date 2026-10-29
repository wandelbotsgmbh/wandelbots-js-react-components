import{j as e,M as m,e as n,C as s}from"./iframe-BhlBWSZR.js";import{useMDXComponents as i}from"./index-DiBes79Z.js";import{muiComponents as p}from"./defaultTheme.stories-0K68cw-q.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-mFj2eSAS.js";import"./context-B9TbbZ4R.js";import"./ExpandMore-usavQFuU.js";import"./createSvgIcon-DxjAq5r4.js";import"./SvgIcon-BSPHsXvA.js";import"./Typography-Byg24-1_.js";import"./Box-D5YiNWTF.js";import"./useSlot-DJCsDy7A.js";import"./mergeSlotProps-Bvm8x1qp.js";import"./useControlled-EoZqWi_W.js";import"./useTheme-Gt3OiB7t.js";import"./utils-D0bQDSZ2.js";import"./useTimeout-BWGcR7MB.js";import"./Paper-BRMuTstt.js";import"./ButtonBase-BN2uQD9z.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-L19GVVun.js";import"./listItemTextClasses-CS1056KE.js";import"./styled-BsImAE4J.js";import"./useThemeProps-DlTsXD3t.js";import"./getThemeProps-k-63bx6P.js";import"./Alert-DAhUrVOI.js";import"./Tab-nP8--JCS.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BBGzaLfO.js";import"./IconButton-BhcpJ3zO.js";import"./CircularProgress-Db975Rfp.js";import"./getValidReactChildren-CEmYW87A.js";import"./TablePagination-CP5_PFbN.js";import"./Select-BBfLdUiQ.js";import"./MenuItem-hrMZ1nJe.js";import"./Popover-Dztx6h4q.js";import"./Portal-CoCFn1sK.js";import"./Fade-DOj5hkoo.js";import"./dividerClasses-Bf27BKDg.js";import"./Toolbar-5aphBkmV.js";import"./Tooltip-BCtduzpi.js";import"./Badge-Bcz-jXe8.js";import"./Button-CoIbJ_A3.js";import"./Stack-C3Fdk60l.js";import"./Card-rwZKpvz_.js";import"./CardContent-D1O8HVTm.js";import"./Chip-XnWRn9A7.js";import"./ListItem-D4NQeGs1.js";import"./Slider-DY6v8xZF.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
