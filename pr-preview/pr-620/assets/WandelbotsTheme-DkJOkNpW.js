import{j as e,M as m,e as n,C as s}from"./iframe-UN6SZsDe.js";import{useMDXComponents as i}from"./index-BjbgaVdw.js";import{muiComponents as p}from"./defaultTheme.stories-CVOpkh_p.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DZVhLn8I.js";import"./context-CsZ5hyZA.js";import"./ExpandMore-BpZ_22kH.js";import"./createSvgIcon-DOUQyvGn.js";import"./SvgIcon-B0FOsNWU.js";import"./Typography-CbUUG6x_.js";import"./Box-CofZUwOL.js";import"./useSlot-q27aiQvc.js";import"./mergeSlotProps-BVqHAaG2.js";import"./useControlled-_mvUrjQK.js";import"./useTheme-BcX997CB.js";import"./utils-ClfalBhg.js";import"./useTimeout-DucQs_lc.js";import"./Paper-D7Ofju7_.js";import"./ButtonBase-DnAFYhKx.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-eiFqRcVQ.js";import"./styled-DWPpRRwv.js";import"./listItemTextClasses-wXz3-LeL.js";import"./useThemeProps-DFEYNd3B.js";import"./getThemeProps-B_2AGQIW.js";import"./Alert-DTkqCKvy.js";import"./Tab-CunAJQYh.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-B0HYtjlB.js";import"./IconButton-CfPhcHUR.js";import"./CircularProgress-Ep7x5lkE.js";import"./getValidReactChildren-BzifcJXs.js";import"./TablePagination-_9ePwWU5.js";import"./Select-C_aqsuqG.js";import"./MenuItem-D0zQjYJZ.js";import"./Popover-CEKE2yR6.js";import"./Portal-DwtGFU5E.js";import"./Fade--Jp-B6Op.js";import"./dividerClasses-ur6LSIYT.js";import"./Toolbar-CFwEnTzt.js";import"./Tooltip-BQRaNdGM.js";import"./Badge-B8pzyMFz.js";import"./Button-C-x130x5.js";import"./Stack-3IiJYbZm.js";import"./Card-Dx5ByrxZ.js";import"./CardContent--DYjptTl.js";import"./Chip-CsQJDqwc.js";import"./ListItem-CoKEIeNr.js";import"./Slider-B63U-pQb.js";function r(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[`
`,`
`,`
`,e.jsx(m,{title:"Theming/Wandelbots MUI Theme"}),`
`,e.jsx(o.h1,{id:"wandelbots-mui-theme",children:"Wandelbots MUI Theme"}),`
`,e.jsxs(o.p,{children:[`The component library comes with a Wandelbots theme for Material UI which is the default theme used in this storybook.
If you like, you can use it in your own app to give the components a similar look.
The theme is accessed by calling `,e.jsx(o.code,{children:"createNovaTheme"}),", and can be ",e.jsx(o.a,{href:"?path=/docs/theming-theming-components--docs",children:"customized"})," as needed."]}),`
`,e.jsxs(o.p,{children:["The theme currently supports ",e.jsx(o.strong,{children:"dark mode only"}),". Passing ",e.jsx(o.code,{children:'palette: { mode: "light" }'})," is not supported yet (it throws upstream)."]}),`
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
