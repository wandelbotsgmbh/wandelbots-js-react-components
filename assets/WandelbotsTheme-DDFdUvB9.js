import{j as e,M as m,e as n,C as s}from"./iframe-BJQa-ykD.js";import{useMDXComponents as i}from"./index-BOQtRgMM.js";import{muiComponents as p}from"./defaultTheme.stories-DavfGaY3.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-OtApy5U4.js";import"./context-BLKvZ0Of.js";import"./ExpandMore-BNWuc9El.js";import"./createSvgIcon-OUMzsPds.js";import"./SvgIcon-0UQRRWsS.js";import"./Typography-CsoFWogS.js";import"./Box-DgbLzk1a.js";import"./useSlot-bcoxvXjg.js";import"./mergeSlotProps-lp0dLWyX.js";import"./useControlled-BaqZjwTS.js";import"./useTheme-Dio5vgl0.js";import"./utils-CCfnI1Et.js";import"./useTimeout-BlLrA5Dk.js";import"./Paper-CAEv2D__.js";import"./ButtonBase-BJLYQLeI.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BisBYMds.js";import"./styled-DlLA3eoN.js";import"./listItemTextClasses-DGpD097a.js";import"./useThemeProps-CUcrUFL4.js";import"./getThemeProps-Ck549EvU.js";import"./Alert-CuyGcxmb.js";import"./Tab-CxxJbgRt.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DEZdGyWP.js";import"./IconButton-CI0KtmRu.js";import"./CircularProgress-DqFZbISL.js";import"./getValidReactChildren-DcPAz4GL.js";import"./TablePagination-PeNcUWJ9.js";import"./Select-t_JlS7LK.js";import"./MenuItem-Civu2YwV.js";import"./Popover-CIXGTnwz.js";import"./Portal-DGU0bXdG.js";import"./Fade-BBKwi58L.js";import"./dividerClasses-BYmY3odh.js";import"./Toolbar-DoubXLki.js";import"./Tooltip-u3fiGQ2p.js";import"./Badge-DwRks88b.js";import"./Button-T8ut9evi.js";import"./Stack-w7OHLazp.js";import"./Card-Bslvoq9a.js";import"./CardContent-BMUZlmwu.js";import"./Chip-CPXzUfIF.js";import"./ListItem-ElQX_Pdd.js";import"./Slider-GN39vZ9F.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
