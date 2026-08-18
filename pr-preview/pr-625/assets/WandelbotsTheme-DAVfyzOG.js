import{j as e,M as m,e as n,C as s}from"./iframe-h8NL3EDU.js";import{useMDXComponents as i}from"./index-CdgsYKZV.js";import{muiComponents as p}from"./defaultTheme.stories-3nPqWQxH.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DIO01v_N.js";import"./context-DAKIBJEQ.js";import"./ExpandMore-EwN7WOy2.js";import"./createSvgIcon-MTVCnYpQ.js";import"./SvgIcon-cJd-ZcDs.js";import"./Typography-D4ivK-bG.js";import"./Box-BFA_5ioc.js";import"./useSlot-B2ndZuD1.js";import"./mergeSlotProps-vce7VFU4.js";import"./useControlled-CNbt-DvH.js";import"./useTheme-BtjAgfmr.js";import"./utils-DZkSmX42.js";import"./useTimeout-BQJYND9D.js";import"./Paper-CtgLLKSZ.js";import"./ButtonBase-zUTg5apA.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-B-lrH0Sm.js";import"./styled-CYyeyU1o.js";import"./listItemTextClasses-C7gC6VvM.js";import"./useThemeProps-BGjoWdPa.js";import"./getThemeProps-BpgR3-rx.js";import"./Alert-BaWQc3Io.js";import"./Tab-DiF69Ot2.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CPX197hl.js";import"./IconButton-BooeBWB7.js";import"./CircularProgress-7Qt-eMJA.js";import"./getValidReactChildren-Ct7f2HsA.js";import"./TablePagination-xqVPQHal.js";import"./Select-ByGcQ6FU.js";import"./MenuItem-Cy_BnpDG.js";import"./Popover-l7k4o8Ix.js";import"./Portal-DYM9O7bs.js";import"./Fade-WBqH5IKz.js";import"./dividerClasses-C3u_BcTx.js";import"./Toolbar-BeiWSLJr.js";import"./Tooltip-CNjuXeQi.js";import"./Badge-CEh1LFF3.js";import"./Button-B3scScxp.js";import"./Stack-wsa88NAL.js";import"./Card-BMOaMkUd.js";import"./CardContent-ByGjHjHv.js";import"./Chip-BI5z0Rd6.js";import"./ListItem-qKN3w-uX.js";import"./Slider-CtZf68pc.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
