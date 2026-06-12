import{j as o,M as m,e as n,C as p}from"./iframe-s7ZrqLNA.js";import{useMDXComponents as r}from"./index-euhUF8Zx.js";import{muiComponents as s}from"./defaultTheme.stories-CYD0oe9b.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-CInLho51.js";import"./context-DWM2Yq5H.js";import"./ExpandMore-ncH_KyqG.js";import"./createSvgIcon-I-Pj84Gs.js";import"./SvgIcon-CBPNTyO7.js";import"./Typography-BrDDMUAE.js";import"./Box-Bdq25nDB.js";import"./useSlot-B6Ro0KqX.js";import"./mergeSlotProps-DPqwijDN.js";import"./useControlled-CyhfE2jr.js";import"./useTheme-BfuSoypX.js";import"./utils-DCzyp8Tx.js";import"./useTimeout-HSgdfMDh.js";import"./Paper-Roz3drq0.js";import"./ButtonBase-CF724c6F.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-FIuxy2RS.js";import"./styled-BWAYR4uy.js";import"./listItemTextClasses-0FeK4-uz.js";import"./useThemeProps-BVma5PsW.js";import"./getThemeProps-o67rY4qy.js";import"./Alert-BpKfPXvb.js";import"./Tab-DnFazTYC.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-HIFXCtAH.js";import"./IconButton-BAWUNZKJ.js";import"./CircularProgress-BIoqLhir.js";import"./getValidReactChildren-DDEWDiVl.js";import"./TablePagination-BnUqeA8h.js";import"./Popover-BNXCCSvf.js";import"./Portal-BSfp1gtY.js";import"./Fade-Ftal6ojF.js";import"./Select-C4Jk1Exb.js";import"./MenuItem-DnxrhkI0.js";import"./dividerClasses-4UOoYjb4.js";import"./Toolbar-BkpvGOmE.js";import"./Tooltip-CoKzQkRb.js";import"./Badge-D6bc9Sdx.js";import"./Button-BcNV_ykx.js";import"./Stack-CjQwbftk.js";import"./Card-igzcdyhK.js";import"./CardContent-C-ha3lad.js";import"./Chip-Cqh-VnNe.js";import"./ListItem-DYwIZbJM.js";import"./Slider-fAnroGmK.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
