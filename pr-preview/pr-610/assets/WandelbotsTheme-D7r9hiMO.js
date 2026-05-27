import{j as o,M as m,e as n,C as p}from"./iframe-C-_PEr4F.js";import{useMDXComponents as r}from"./index-PAStVa5D.js";import{muiComponents as s}from"./defaultTheme.stories-CtkbegoY.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DhvSt_J5.js";import"./context-D3bl-uv7.js";import"./ExpandMore-DawxGcx6.js";import"./createSvgIcon-bSv65n4k.js";import"./SvgIcon-DGX9lv5B.js";import"./Typography-hrPxMBZb.js";import"./Box-DW652qMW.js";import"./useSlot-CeiUI52W.js";import"./mergeSlotProps-BSbGI1mo.js";import"./useControlled-DWK5kEAD.js";import"./useTheme-BzvwfQCq.js";import"./utils-5kT5oPbZ.js";import"./useTimeout-BU701t-H.js";import"./Paper-E18E0ptN.js";import"./ButtonBase-DDVfuFIX.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BueJ4KUh.js";import"./styled-DqMoxixX.js";import"./listItemTextClasses-wkq5rM8u.js";import"./useThemeProps-xqY9KdM5.js";import"./getThemeProps-Cn6keKKw.js";import"./Alert-BxWV2nfZ.js";import"./Tab-D_mmHgAa.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-Cbb-pAeM.js";import"./IconButton-k-tsBcjF.js";import"./CircularProgress-_ua-Fk3G.js";import"./getValidReactChildren-DI1kzd46.js";import"./TablePagination-DkJa-yBT.js";import"./Popover-BC9VSNK3.js";import"./Portal-BRY_bIIC.js";import"./Fade-DPU9QbVm.js";import"./Select-BNnimodo.js";import"./MenuItem-DI_ivNdE.js";import"./dividerClasses-C8pLxzae.js";import"./Toolbar-Bajas-tQ.js";import"./Tooltip-DJmiFuLJ.js";import"./Badge-DSNGizQN.js";import"./Button-Cn78zCTv.js";import"./Stack-D9IuXArQ.js";import"./Card-CARdo6Tq.js";import"./CardContent-BaPQo4D9.js";import"./Chip-B1gyvrfk.js";import"./ListItem-CTGQH1Sz.js";import"./Slider-BBLZom2B.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
