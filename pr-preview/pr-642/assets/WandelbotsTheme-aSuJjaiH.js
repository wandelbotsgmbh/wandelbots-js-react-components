import{j as e,M as m,e as n,C as s}from"./iframe-C3i5VtH2.js";import{useMDXComponents as i}from"./index-sRPPmJLD.js";import{muiComponents as p}from"./defaultTheme.stories-CMcD7Lle.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-B9zSvggg.js";import"./context-BW3BpTE1.js";import"./ExpandMore-Ci3kL4LZ.js";import"./createSvgIcon-DlbDLNHf.js";import"./SvgIcon-CPGH9cXu.js";import"./Typography-DuDXt270.js";import"./Box-BXzJm3dS.js";import"./useSlot-Dmg8EyfP.js";import"./mergeSlotProps-B816zYuf.js";import"./useControlled-DoIH9NaX.js";import"./useTheme-CORFzKCN.js";import"./utils-CUCN_3XZ.js";import"./useTimeout-BXSeW2QP.js";import"./Paper-lkxFwJ-Z.js";import"./ButtonBase-DqfXtwmx.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DfmqodOo.js";import"./listItemTextClasses-Dv0pTvZA.js";import"./styled-C810q6lS.js";import"./useThemeProps-BwMjOkoo.js";import"./getThemeProps-B1MzFs2r.js";import"./Alert-CZV1NTyG.js";import"./Tab-kcawMyLH.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DRv-pCx1.js";import"./IconButton-Aa0CaESU.js";import"./CircularProgress-DLx0FoJz.js";import"./getValidReactChildren-BJQ00d8F.js";import"./TablePagination-14z8CJa_.js";import"./Select-CHTurhBL.js";import"./MenuItem-DC0jJlRe.js";import"./Popover-CS9vlDpp.js";import"./Portal-BQHDhcYJ.js";import"./Fade-DfqcjNjN.js";import"./dividerClasses-cwPm_23Z.js";import"./Toolbar-BlsbkqEC.js";import"./Tooltip-hBZ7qRvh.js";import"./Badge-BnquZkfb.js";import"./Button-KODbTWy5.js";import"./Stack-CHa2am4J.js";import"./Card-6XEiDFnu.js";import"./CardContent-BMcduh1x.js";import"./Chip-DXy2hbpo.js";import"./ListItem-Bp1bc24y.js";import"./Slider-CB_tzp3u.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
