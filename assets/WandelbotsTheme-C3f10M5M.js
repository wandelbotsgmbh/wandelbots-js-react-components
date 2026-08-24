import{j as e,M as m,e as n,C as s}from"./iframe-CyD9rD0D.js";import{useMDXComponents as i}from"./index-BeZObc6P.js";import{muiComponents as p}from"./defaultTheme.stories-BxMpowwd.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DX2gn8bo.js";import"./context-Dpnh0CK8.js";import"./ExpandMore-D81pc3tI.js";import"./createSvgIcon-CTNAzbdZ.js";import"./SvgIcon-BCJAo3PQ.js";import"./Typography-CeJalG0m.js";import"./Box-Cd13N0JR.js";import"./useSlot-DsX7NklW.js";import"./mergeSlotProps-wKmKeqQz.js";import"./useControlled-CN0qBHif.js";import"./useTheme-BYrdovPt.js";import"./utils-DM7FDu1i.js";import"./useTimeout-CCgVkqtM.js";import"./Paper-DVmjI36g.js";import"./ButtonBase-nZ_xAdWC.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DQGqEiYd.js";import"./styled-Cq6ngS8T.js";import"./listItemTextClasses-FG8IvNcm.js";import"./useThemeProps-DYEd5J4c.js";import"./getThemeProps-C6HLSFE8.js";import"./Alert-BOprKsh8.js";import"./Tab-DPDPtfTi.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DpZJqu5B.js";import"./IconButton-BpELGcAI.js";import"./CircularProgress-D9Me9nDi.js";import"./getValidReactChildren-DY2r1Ijx.js";import"./TablePagination-BBAgMBfM.js";import"./Select-CE6g6KMh.js";import"./MenuItem-BDxnweul.js";import"./Popover-DKtvRjal.js";import"./Portal-Bfy7dlc7.js";import"./Fade-D_nVJisO.js";import"./dividerClasses-DjENhNDT.js";import"./Toolbar-CiQymBiI.js";import"./Tooltip-CA0__OGs.js";import"./Badge-BK9c-N8z.js";import"./Button-DT0_0zr9.js";import"./Stack-37_jsn52.js";import"./Card-ctdkCqf-.js";import"./CardContent-Ckb5Yhk5.js";import"./Chip-mja3xNKK.js";import"./ListItem-CPy6A536.js";import"./Slider-DDWMQ6y7.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
