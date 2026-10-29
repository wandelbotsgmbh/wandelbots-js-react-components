import{j as e,M as m,e as n,C as s}from"./iframe-CBroFEin.js";import{useMDXComponents as i}from"./index-nikGQL7d.js";import{muiComponents as p}from"./defaultTheme.stories-D3RNlwZd.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Bp7uC6c1.js";import"./context-B9vJqMp4.js";import"./ExpandMore-Do5gwCH9.js";import"./createSvgIcon--Jof-KsA.js";import"./SvgIcon-DTE9W2LG.js";import"./Typography-C8z9ryPV.js";import"./Box-eWIpLIW-.js";import"./useSlot-Cj2O67BJ.js";import"./mergeSlotProps-BuiDVtqs.js";import"./useControlled-xN8oEOFN.js";import"./useTheme-Ytz9uQsi.js";import"./utils-CH9ryMTv.js";import"./useTimeout-B32SDDeB.js";import"./Paper-B9fLM-PL.js";import"./ButtonBase-BtsGromz.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-D9FhcAzA.js";import"./listItemTextClasses-BGlcurxX.js";import"./styled-ELQwwjZJ.js";import"./useThemeProps-D36LR1lf.js";import"./getThemeProps-0oo6wIeh.js";import"./Alert-xbAbb7j3.js";import"./Tab-tQ0UMpi6.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DzTACaDs.js";import"./IconButton-BwUMeLeZ.js";import"./CircularProgress-D3i9H91y.js";import"./getValidReactChildren-BWOLopMP.js";import"./TablePagination-CLjfMAle.js";import"./Select-B6i-2jol.js";import"./MenuItem-DLKS24nc.js";import"./Popover-C832IFSv.js";import"./Portal-D-PiLfGm.js";import"./Fade-BCu8jmpE.js";import"./dividerClasses-BKgMd12S.js";import"./Toolbar-BN-gAyWG.js";import"./Tooltip-BjN-CmW4.js";import"./Badge-B_knsemg.js";import"./Button-C2Ur0i9X.js";import"./Stack-yEQ8tzby.js";import"./Card-KbueR9uX.js";import"./CardContent-aWLZUj3E.js";import"./Chip-DQC_LTWt.js";import"./ListItem-B3VJhyqN.js";import"./Slider-kMi08H0P.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
