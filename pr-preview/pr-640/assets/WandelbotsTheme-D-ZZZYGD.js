import{j as e,M as m,e as n,C as s}from"./iframe-D884141u.js";import{useMDXComponents as i}from"./index-Dr86W9SG.js";import{muiComponents as p}from"./defaultTheme.stories-D1FhYdze.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-Bd1pXgg0.js";import"./context-yX39zROz.js";import"./ExpandMore-DwNZugir.js";import"./createSvgIcon-BnYqwPby.js";import"./SvgIcon-BgvEQeou.js";import"./Typography-V06HsBqI.js";import"./Box-mOBt15YC.js";import"./useSlot-B0rwcHxP.js";import"./mergeSlotProps-BoRcc9DH.js";import"./useControlled-Ckhs2-JN.js";import"./useTheme-DlfWPF4G.js";import"./utils-BhuaU_eo.js";import"./useTimeout-BCiwPjbb.js";import"./Paper-B0NnY_8H.js";import"./ButtonBase-DZTjYyES.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DzVDslvj.js";import"./listItemTextClasses-CydzYEF0.js";import"./styled-B0ao0ZAV.js";import"./useThemeProps-CHMSUCul.js";import"./getThemeProps-DO3TSdEy.js";import"./Alert-CNbfDNRk.js";import"./Tab-DjKjf_C8.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BkTr94iK.js";import"./IconButton-lxGgnN1D.js";import"./CircularProgress-C73PxTiL.js";import"./getValidReactChildren-kFGK7thM.js";import"./TablePagination-DGUy2ds4.js";import"./Select-C3I5VoZz.js";import"./MenuItem-4jdCzo2q.js";import"./Popover-BcQb6pCU.js";import"./Portal-DGR3w91M.js";import"./Fade-6DUK05bt.js";import"./dividerClasses-BxMGW2ul.js";import"./Toolbar-hqgPHVbd.js";import"./Tooltip-NSIx9ZXY.js";import"./Badge-BBBuq_JT.js";import"./Button-D6MJ5xqo.js";import"./Stack-DtIhmKcN.js";import"./Card-C4LR3_2o.js";import"./CardContent-C4ySEI67.js";import"./Chip-AIKNFRqS.js";import"./ListItem-DaI2c8fT.js";import"./Slider-Bi_aIPcm.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
