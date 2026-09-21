import{j as e,M as m,e as n,C as s}from"./iframe-BmabLFoJ.js";import{useMDXComponents as i}from"./index-BVs1_B6a.js";import{muiComponents as p}from"./defaultTheme.stories-Du6f7A6R.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BWG8HseK.js";import"./context-CsJ6UPxf.js";import"./ExpandMore-BBayZyh4.js";import"./createSvgIcon-CmmMGDz7.js";import"./SvgIcon-rdheAufg.js";import"./Typography-CSMK2NSJ.js";import"./Box-IKoY0UTk.js";import"./useSlot-Bhvq17TF.js";import"./mergeSlotProps-Beqhzo2w.js";import"./useControlled-OHHfRx73.js";import"./useTheme-DTr1WInn.js";import"./utils--FXLeKRP.js";import"./useTimeout-CuY3ze4H.js";import"./Paper-wwUPGpqm.js";import"./ButtonBase-DcqZYvDQ.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-By5xdqxj.js";import"./listItemTextClasses-ClA-CC6u.js";import"./styled-BEP2lxQD.js";import"./useThemeProps-B-oZEUpN.js";import"./getThemeProps-BVr5wI7P.js";import"./Alert-BuntzgB4.js";import"./Tab-DDIqYhxI.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-ChOD6QnK.js";import"./IconButton-Dc4U-QYn.js";import"./CircularProgress-gCfHjSDj.js";import"./getValidReactChildren-CA9U0SWu.js";import"./TablePagination-CUArpttQ.js";import"./Select-CyQk1zu2.js";import"./MenuItem-rlLbQywS.js";import"./Popover-DFLlo-KE.js";import"./Portal-BnAELXhD.js";import"./Fade-dqs2x2Vk.js";import"./dividerClasses-yDeCFpqD.js";import"./Toolbar-Dq_YeXRS.js";import"./Tooltip-Cm-Q9_kj.js";import"./Badge-Cu1AhSzm.js";import"./Button--dbltRVR.js";import"./Stack-CTeuISsq.js";import"./Card-BZCeaK-W.js";import"./CardContent-DFiKMEjt.js";import"./Chip-B3PuFCLu.js";import"./ListItem-DxnmUUj4.js";import"./Slider-DWw2ReJZ.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
