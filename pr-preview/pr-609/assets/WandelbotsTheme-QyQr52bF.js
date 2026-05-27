import{j as o,M as m,e as n,C as p}from"./iframe-DsUmfJSm.js";import{useMDXComponents as r}from"./index-k01BtSUO.js";import{muiComponents as s}from"./defaultTheme.stories-v-0ygQXG.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-C1dp0D93.js";import"./context-C9r-NdSV.js";import"./ExpandMore-BleZpH3v.js";import"./createSvgIcon-CHAGv8R0.js";import"./SvgIcon-C8klQgEI.js";import"./Typography-qGTMw4GJ.js";import"./Box-GDlSCJRY.js";import"./useSlot-X54YKWe7.js";import"./mergeSlotProps-DcusVXcS.js";import"./useControlled-CZgoEVpv.js";import"./useTheme-DufqDysx.js";import"./utils-BPa-Grcl.js";import"./useTimeout-DqXxMr3N.js";import"./Paper-CFJ8ram0.js";import"./ButtonBase-LOzYJsY3.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DzAHqWSA.js";import"./styled-NYwgL3DE.js";import"./listItemTextClasses-DkXCITbk.js";import"./useThemeProps-Bnv9_XyV.js";import"./getThemeProps-Dx-CnyDg.js";import"./Alert-CSJleMUg.js";import"./Tab-DMtJr5hN.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BNV2_yYu.js";import"./IconButton-B7H7nq-p.js";import"./CircularProgress-BVSMhwVd.js";import"./getValidReactChildren-CgEhzll2.js";import"./TablePagination-CBowUsyf.js";import"./Popover-CgAA4VqW.js";import"./Portal-DHkhJzD2.js";import"./Fade-To34lP5j.js";import"./Select-LX96Vr4M.js";import"./MenuItem-olvp6wZn.js";import"./dividerClasses-DFVU_BVQ.js";import"./Toolbar-BrWIgy0Q.js";import"./Tooltip-CARBRChb.js";import"./Badge-Bcj8Btzb.js";import"./Button-D5-LN_13.js";import"./Stack-Bt6fIear.js";import"./Card-DfbkX80r.js";import"./CardContent-pUz9Ng7r.js";import"./Chip-aOgHkBG7.js";import"./ListItem-Bovn-PF7.js";import"./Slider-BIOegyXx.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
