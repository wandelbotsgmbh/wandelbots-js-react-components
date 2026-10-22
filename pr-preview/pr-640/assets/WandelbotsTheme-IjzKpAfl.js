import{j as e,M as m,e as n,C as s}from"./iframe-CcEZ_qSY.js";import{useMDXComponents as i}from"./index-c3y8u5dO.js";import{muiComponents as p}from"./defaultTheme.stories-BZEF367r.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-D17srCFj.js";import"./context-C2W6U0go.js";import"./ExpandMore-CbYnQOnc.js";import"./createSvgIcon-4q7DkNPb.js";import"./SvgIcon-D02hs19z.js";import"./Typography-D6jid27D.js";import"./Box-DuC4hTOz.js";import"./useSlot-Lm66yU7i.js";import"./mergeSlotProps-CNrZgcqr.js";import"./useControlled-sD7Nds3Z.js";import"./useTheme-73kFwhQI.js";import"./utils-qT78mNwc.js";import"./useTimeout-DlkP_xm3.js";import"./Paper-UE5zM-Xg.js";import"./ButtonBase-mXZNferh.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DakvkF0g.js";import"./listItemTextClasses-DTZPF7vq.js";import"./styled-BebcqQ4p.js";import"./useThemeProps-B7vhisMx.js";import"./getThemeProps-CTCJDgej.js";import"./Alert-WZMP7AWc.js";import"./Tab-C86vl7YK.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DGML88_c.js";import"./IconButton-DNYJDC4z.js";import"./CircularProgress-BKY1YvAv.js";import"./getValidReactChildren-CYnbkeDY.js";import"./TablePagination-DVYtgWjI.js";import"./Select-MfwEkFZY.js";import"./MenuItem-CmsZDfDf.js";import"./Popover-D9ZBhVe8.js";import"./Portal-CYop8iSy.js";import"./Fade-BooDPsxk.js";import"./dividerClasses-BfPnpJbt.js";import"./Toolbar-MOhAvtnn.js";import"./Tooltip-CiHIZJPH.js";import"./Badge-C4MVY1Zk.js";import"./Button-BE-5XmEI.js";import"./Stack-BD3IIN95.js";import"./Card-BIoTBQV7.js";import"./CardContent-DB-sRyWV.js";import"./Chip-DfIH0Klk.js";import"./ListItem-CfCxiSRm.js";import"./Slider-Dw3e8R-K.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
