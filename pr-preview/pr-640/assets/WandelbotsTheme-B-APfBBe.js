import{j as e,M as m,e as n,C as s}from"./iframe-BTaUecuH.js";import{useMDXComponents as i}from"./index-D4SMC-JH.js";import{muiComponents as p}from"./defaultTheme.stories-CnOeSm1V.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Bxsg7yuJ.js";import"./context-BQOmf8OU.js";import"./ExpandMore-CEghY93z.js";import"./createSvgIcon-CYoU8uEs.js";import"./SvgIcon-HPWlfptg.js";import"./Typography-8IxL4PEX.js";import"./Box-BTwJY6Ci.js";import"./useSlot-DGAHhsvD.js";import"./mergeSlotProps-BxTfWixE.js";import"./useControlled-B9v_sXXB.js";import"./useTheme-CFOqftXY.js";import"./utils-Bu4aQ3z7.js";import"./useTimeout-J9g92Bif.js";import"./Paper-bno0t8D5.js";import"./ButtonBase-DfHmQn-S.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-COi04NTm.js";import"./listItemTextClasses-09D_mkub.js";import"./styled-BGBtoES-.js";import"./useThemeProps-BTdDPMYS.js";import"./getThemeProps-Db8SbAnQ.js";import"./Alert-DoUge7_g.js";import"./Tab-DhqOmyb2.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DiU4oK3R.js";import"./IconButton-vCzw7UtJ.js";import"./CircularProgress-DgQWL7Sp.js";import"./getValidReactChildren-CMvB3Cu9.js";import"./TablePagination-BTXP7lIA.js";import"./Select-D79XSfSI.js";import"./MenuItem-C6eZUMYE.js";import"./Popover-CrkoMpkh.js";import"./Portal-D5Tf750N.js";import"./Fade-3tu_AmNs.js";import"./dividerClasses-DKVyjcQ3.js";import"./Toolbar-C-FrUW6-.js";import"./Tooltip-ByBKEwAv.js";import"./Badge-BPeKnK1H.js";import"./Button-CvxF3nwV.js";import"./Stack-CES2rYfK.js";import"./Card--KZI6LpC.js";import"./CardContent-BPuYeRe6.js";import"./Chip-Bw13UpfM.js";import"./ListItem-zFzXGNSg.js";import"./Slider-CdAh8JON.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
