import{j as e,M as m,e as n,C as s}from"./iframe-DFWCUJcd.js";import{useMDXComponents as i}from"./index-1kiNoD-e.js";import{muiComponents as p}from"./defaultTheme.stories-ZnTmFD-o.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-8f2r-bRG.js";import"./context-BfG9PRjJ.js";import"./ExpandMore-hCLrpuuu.js";import"./createSvgIcon-DucIEf_0.js";import"./SvgIcon-HYGMVELO.js";import"./Typography-xMaF04LY.js";import"./Box-ReRLTk2a.js";import"./useSlot-BU3PbBv_.js";import"./mergeSlotProps-BpmpDS2t.js";import"./useControlled-DEQGWRu4.js";import"./useTheme-CdVIIIG6.js";import"./utils-CeciMygM.js";import"./useTimeout-DIY2PhHu.js";import"./Paper-Duse9F_y.js";import"./ButtonBase-Dc0s3ira.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DWanK9Ko.js";import"./styled-D84wahn-.js";import"./listItemTextClasses-dGL-3ynv.js";import"./useThemeProps-DpkurgqQ.js";import"./getThemeProps-BfBsJRdR.js";import"./Alert-CyIgxSee.js";import"./Tab-0GfqqNr8.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BIV7YvIn.js";import"./IconButton-Dv_Gvuz2.js";import"./CircularProgress-CgEobnjZ.js";import"./getValidReactChildren-i-Vq7Y0g.js";import"./TablePagination-DQI1kA1r.js";import"./Select-BhXA_s1Y.js";import"./MenuItem-Csk6wBE3.js";import"./Popover-UXJoqKAA.js";import"./Portal-Bg3TgbMM.js";import"./Fade-DFUTRu3C.js";import"./dividerClasses-C7ojMzBq.js";import"./Toolbar-Bb8sf3zL.js";import"./Tooltip-BlIlP9SC.js";import"./Badge-FvNO5bxz.js";import"./Button-CdM6PYK0.js";import"./Stack-DoMdcR_-.js";import"./Card-D967LT_1.js";import"./CardContent-mlCYy25w.js";import"./Chip-BnFpYzlQ.js";import"./ListItem-COuEhlNT.js";import"./Slider-X23LDm0D.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
