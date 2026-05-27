import{j as o,M as m,e as n,C as p}from"./iframe-DzfWrSPr.js";import{useMDXComponents as r}from"./index-BOhUO5Fc.js";import{muiComponents as s}from"./defaultTheme.stories-3tSMPoN7.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-CC2NvLCj.js";import"./context-BsWOb5tu.js";import"./ExpandMore-IKjXf7Ib.js";import"./createSvgIcon-B7TTzAlC.js";import"./SvgIcon-DrcM7-tb.js";import"./Typography-DvmypobY.js";import"./Box-C-I5h5KP.js";import"./useSlot-C1tSz0gq.js";import"./mergeSlotProps-mUbZpGx1.js";import"./useControlled-C73fIbx-.js";import"./useTheme-pFzUWaqK.js";import"./utils-BsvALDLy.js";import"./useTimeout-CO9LbGyt.js";import"./Paper-Cy9khsp7.js";import"./ButtonBase-CHXd6DbZ.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-B7B3qIpW.js";import"./styled-BxyiA9Wk.js";import"./listItemTextClasses-DtuEiL5J.js";import"./useThemeProps-DLEjcKXI.js";import"./getThemeProps-BC6ADCv4.js";import"./Alert-mKDNu8Zk.js";import"./Tab-Bu-AdRB_.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CtCL7rPg.js";import"./IconButton-7j7aJIku.js";import"./CircularProgress-CuXVFhFm.js";import"./getValidReactChildren-BjV1Ux19.js";import"./TablePagination-D9nnpQS5.js";import"./Popover-C9KVxpWg.js";import"./Portal-4QvXWliX.js";import"./Fade-B0hFfAad.js";import"./Select-CG7p3Zhc.js";import"./MenuItem-CBDQad_I.js";import"./dividerClasses-bdtJcw_r.js";import"./Toolbar-CxNFgXTH.js";import"./Tooltip-BJ6Pmqvf.js";import"./Badge-BSjk_YwK.js";import"./Button-lv6k5ezl.js";import"./Stack-DJuvZJyF.js";import"./Card-kbkgdQ06.js";import"./CardContent-COFIQNgx.js";import"./Chip-DXeqGHKk.js";import"./ListItem-BaB8ah4G.js";import"./Slider-BHZHdISy.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
`,`
`,`
`,o.jsx(m,{title:"Theming/Wandelbots MUI Theme"}),`
`,o.jsx(t.h1,{id:"wandelbots-mui-theme",children:"Wandelbots MUI Theme"}),`
`,o.jsxs(t.p,{children:[`The component library comes with a Wandelbots theme for Material UI which is the default theme used in this storybook.
If you like, you can use it in your own app to give the components a similar look.
The theme is accessed by calling `,o.jsx(t.code,{children:"createNovaMuiTheme"}),", and can be ",o.jsx(t.a,{href:"?path=/docs/theming-theming-components--docs",children:"customized"})," as needed."]}),`
`,o.jsxs(t.p,{children:["The theme comes in dark and light variants using the standard MUI ",o.jsxs(t.a,{href:"https://mui.com/material-ui/customization/dark-mode/",rel:"nofollow",children:[o.jsx(t.code,{children:"palette.mode"})," option"]}),"."]}),`
`,o.jsx(n,{dark:!0,code:`
import { ThemeProvider } from "@mui/material"
import { createNovaMuiTheme } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaMuiTheme()

<ThemeProvider theme={theme}>
...
</ThemeProvider>
`}),`
`,o.jsx(p,{of:s,sourceState:"none"})]})}function no(e={}){const{wrapper:t}={...r(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(i,{...e})}):i(e)}export{no as default};
