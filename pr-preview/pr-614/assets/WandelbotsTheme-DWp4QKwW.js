import{j as o,M as m,e as n,C as p}from"./iframe-BtF3oR4V.js";import{useMDXComponents as r}from"./index-DVC8T9zb.js";import{muiComponents as s}from"./defaultTheme.stories-BndhmKat.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DreBknOy.js";import"./context-Cg2IIDQ2.js";import"./ExpandMore-DyMwl33s.js";import"./createSvgIcon-mxSchYmh.js";import"./SvgIcon-DDQQRVaT.js";import"./Typography-aacKlFId.js";import"./Box-BVBGV5E8.js";import"./useSlot-CTTe-nk3.js";import"./mergeSlotProps-DFRSXzHZ.js";import"./useControlled-DIVtUnm1.js";import"./useTheme-3noL50R_.js";import"./utils-DmIAFWaR.js";import"./useTimeout-iXNn04rO.js";import"./Paper-DcSffA1y.js";import"./ButtonBase-BljvDUcf.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-Dg5SzH5e.js";import"./styled-Bh4zLGD3.js";import"./listItemTextClasses-DXr6VMNs.js";import"./useThemeProps-CkrD-jWf.js";import"./getThemeProps-CuBATgfS.js";import"./Alert-Yyui75lq.js";import"./Tab-Dpy75n5N.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-1RH-0CF5.js";import"./IconButton-DadaKapX.js";import"./CircularProgress-DcsoScJS.js";import"./getValidReactChildren-BsBfMWe5.js";import"./TablePagination-C7dMFpEJ.js";import"./Popover-C4VynSWT.js";import"./Portal-IBGt74iG.js";import"./Fade-CpfeWuN6.js";import"./Select-CTiSj-Ru.js";import"./MenuItem-CfndPCx1.js";import"./dividerClasses-1b-VmslD.js";import"./Toolbar-TJAVXzgs.js";import"./Tooltip-BzgNfurq.js";import"./Badge-BNMA79gW.js";import"./Button-diERvsNP.js";import"./Stack-C15rN9Ic.js";import"./Card-CxCzV_hg.js";import"./CardContent-D6g6O799.js";import"./Chip-wq2Nx5h_.js";import"./ListItem-D771G6o9.js";import"./Slider-scAd4cqa.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
