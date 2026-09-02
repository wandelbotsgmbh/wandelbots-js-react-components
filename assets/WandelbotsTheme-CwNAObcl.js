import{j as e,M as m,e as n,C as s}from"./iframe-BF58rWUt.js";import{useMDXComponents as i}from"./index-CJs_SMj4.js";import{muiComponents as p}from"./defaultTheme.stories-DHOKo2Qi.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BmUE7o8g.js";import"./context-DmIccY1f.js";import"./ExpandMore-By0zBzA9.js";import"./createSvgIcon-a-D4oG-Z.js";import"./SvgIcon-DbMvS4W9.js";import"./Typography-B6BpdpHM.js";import"./Box-BII0NUxj.js";import"./useSlot-RnOvUYrY.js";import"./mergeSlotProps-C9JxP70e.js";import"./useControlled-DLtqorVV.js";import"./useTheme-MkHF-WjG.js";import"./utils-CMrZGE3i.js";import"./useTimeout-ShLoy47y.js";import"./Paper-_qjcJUIi.js";import"./ButtonBase-iaoVNle8.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-d6LHQmQo.js";import"./styled-BLu4EuWF.js";import"./listItemTextClasses-C6I04Mbq.js";import"./useThemeProps-B-I8OL7i.js";import"./getThemeProps-CehkZgyq.js";import"./Alert-BLOSi7UM.js";import"./Tab-DEsw7vcT.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-_UXLUcLs.js";import"./IconButton-dSJcbeyx.js";import"./CircularProgress-BLq5M5KB.js";import"./getValidReactChildren-C0UFTXtw.js";import"./TablePagination-iDCk57TR.js";import"./Select-D0zca3zu.js";import"./MenuItem-EhCW8kf-.js";import"./Popover-i8z0wEDW.js";import"./Portal-DjqFPrZz.js";import"./Fade-DMmc-5f5.js";import"./dividerClasses-DtKCHcTs.js";import"./Toolbar-CfGJQkAO.js";import"./Tooltip-CmslC2aR.js";import"./Badge-ZF0-9qV-.js";import"./Button-qu90ZdXx.js";import"./Stack-CBYliyMZ.js";import"./Card-CUUh7ySa.js";import"./CardContent-DPmjJjcp.js";import"./Chip-CdmtrTap.js";import"./ListItem-WIC2qRKT.js";import"./Slider-Dw2u9QkT.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
