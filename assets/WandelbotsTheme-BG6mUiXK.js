import{j as e,M as m,e as n,C as s}from"./iframe-DxiXdM2q.js";import{useMDXComponents as i}from"./index-CKP6HLyW.js";import{muiComponents as p}from"./defaultTheme.stories-C5747_yK.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BnFfily6.js";import"./context-CuzJde4p.js";import"./ExpandMore-C-eF2OdX.js";import"./createSvgIcon-C7DcmS5k.js";import"./SvgIcon-DCzXKrgG.js";import"./Typography-RtYt0vXR.js";import"./Box-5W93FfVl.js";import"./useSlot-Ca3ZvXKF.js";import"./mergeSlotProps-DCbnvAlJ.js";import"./useControlled-Bh-PgyEM.js";import"./useTheme-CKxhqilf.js";import"./utils-DrYvmE-0.js";import"./useTimeout-ydVVigZK.js";import"./Paper-xQeAj1Up.js";import"./ButtonBase-Bbb_yUxx.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DtEYziMJ.js";import"./styled-brFqv9Tq.js";import"./listItemTextClasses-Dc1d-6Kc.js";import"./useThemeProps-BRABdsUe.js";import"./getThemeProps-Bj25HqHJ.js";import"./Alert-DTvf42Vu.js";import"./Tab-Dfcd-zrY.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-D0JEbO3W.js";import"./IconButton-BALMdA_U.js";import"./CircularProgress-CUKbrnRk.js";import"./getValidReactChildren-CB1AqURb.js";import"./TablePagination-UJ642acR.js";import"./Select-Cco8BKrQ.js";import"./MenuItem-DYe_bhAL.js";import"./Popover-C-4p8BNI.js";import"./Portal-BiUkWUW0.js";import"./Fade-DauWtePj.js";import"./dividerClasses-0RjaPv4f.js";import"./Toolbar-IQUZDQjB.js";import"./Tooltip-BmF-MGli.js";import"./Badge-DtxCIBsd.js";import"./Button-5ey_LRkw.js";import"./Stack-iaxVYi6Z.js";import"./Card-Rt0HL1A1.js";import"./CardContent-C-PpQwS0.js";import"./Chip-CkVxonky.js";import"./ListItem-DdtvivIi.js";import"./Slider-DEnbddxI.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
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
