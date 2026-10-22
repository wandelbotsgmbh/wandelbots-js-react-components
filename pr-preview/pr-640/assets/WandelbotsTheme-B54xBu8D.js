import{j as e,M as m,e as n,C as s}from"./iframe-3_1gAL3j.js";import{useMDXComponents as i}from"./index-CsGV3ZIf.js";import{muiComponents as p}from"./defaultTheme.stories-kalZmblb.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-CMLcXRvL.js";import"./context-CCseGEkZ.js";import"./ExpandMore-DAu7s5ch.js";import"./createSvgIcon-DuwO-KD2.js";import"./SvgIcon-Bh49S5AI.js";import"./Typography-D3RtMN4n.js";import"./Box-DTfyUXIw.js";import"./useSlot-DkQUSlOw.js";import"./mergeSlotProps-NjS1ZH_j.js";import"./useControlled-CJ0nSNud.js";import"./useTheme-0LdBglcA.js";import"./utils-cTlRF3Sf.js";import"./useTimeout-Cl2tIbht.js";import"./Paper-uy4c7uUj.js";import"./ButtonBase-Bkrehxee.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-C8DZKIbw.js";import"./listItemTextClasses-C1SCsOsk.js";import"./styled-xTHTdLIU.js";import"./useThemeProps-BaUP9mfX.js";import"./getThemeProps-BYWAdWcC.js";import"./Alert-BeSBAkCQ.js";import"./Tab-CQecjpD3.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BhfcMN_f.js";import"./IconButton-B9x48uNM.js";import"./CircularProgress-Cm-iQgwH.js";import"./getValidReactChildren-Dy4J5mHE.js";import"./TablePagination-DXkXUEyy.js";import"./Select-B8E-pHkL.js";import"./MenuItem-Bcc3LLWD.js";import"./Popover-BN8HVKgy.js";import"./Portal-zQa3Mibf.js";import"./Fade-Dbf4LSmZ.js";import"./dividerClasses-uDut7PLy.js";import"./Toolbar-sCI6a9uA.js";import"./Tooltip-CJtXvcEA.js";import"./Badge-CmQ6glIx.js";import"./Button-D2lOmjnP.js";import"./Stack-CCNeUVvZ.js";import"./Card-DqlwXN00.js";import"./CardContent-DyCv_NEk.js";import"./Chip-BauiVrcI.js";import"./ListItem-By_nA3y-.js";import"./Slider-DnbJor-6.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
