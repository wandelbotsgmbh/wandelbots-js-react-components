import{j as e,M as m,e as n,C as s}from"./iframe-wm_LgJCB.js";import{useMDXComponents as i}from"./index-xZdLz2hE.js";import{muiComponents as p}from"./defaultTheme.stories-6lpQCJ4p.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-B4Hh_XYu.js";import"./context-y2pfIxPJ.js";import"./ExpandMore-UvdVMY8l.js";import"./createSvgIcon-C09MlxR4.js";import"./SvgIcon-BiDcfQnJ.js";import"./Typography-BdkCM2eG.js";import"./Box-DbZI7o_k.js";import"./useSlot-BJBkmAqy.js";import"./mergeSlotProps-BTL6ucIg.js";import"./useControlled-CBYrwl3N.js";import"./useTheme-CccEYAFl.js";import"./utils-BaZYAeRw.js";import"./useTimeout-BJ85yZBS.js";import"./Paper-ecsif8x5.js";import"./ButtonBase-DkcDhg9A.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-C96BbYZB.js";import"./listItemTextClasses-BU9Hmwlk.js";import"./styled-Ds1Mq2kk.js";import"./useThemeProps-isdZ54p3.js";import"./getThemeProps-Daz5eId2.js";import"./Alert-D7V9DysS.js";import"./Tab-B0mwj5EF.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BXzNNAgu.js";import"./IconButton-DvMfvabp.js";import"./CircularProgress-BAegOCT4.js";import"./getValidReactChildren-CXUWVWu0.js";import"./TablePagination-DgI1GQJY.js";import"./Select-CECL54yh.js";import"./MenuItem-Belq4sii.js";import"./Popover-D9X-rZAx.js";import"./Portal-C_MkV8gT.js";import"./Fade-z4txmJ6c.js";import"./dividerClasses-C8IFVPsa.js";import"./Toolbar-YUvfznr_.js";import"./Tooltip-D3QjZtHC.js";import"./Badge-DTX001J5.js";import"./Button-G99aJeEW.js";import"./Stack-DrHdrlKP.js";import"./Card-CXQ-hP-v.js";import"./CardContent-5NxgycI_.js";import"./Chip-Bj2b_DzM.js";import"./ListItem-Dej96rFq.js";import"./Slider-ciz8SjWb.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
