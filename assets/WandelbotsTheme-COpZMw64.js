import{j as o,M as m,e as n,C as p}from"./iframe-BngTVNlE.js";import{useMDXComponents as r}from"./index-DcLy2HV2.js";import{muiComponents as s}from"./defaultTheme.stories-Yuid0PjH.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BWAQrjoK.js";import"./context-p6WrlAch.js";import"./ExpandMore-5siNhcgy.js";import"./createSvgIcon-B2iHT_wq.js";import"./SvgIcon-DGn-kC6U.js";import"./Typography-BBZ9ZGdq.js";import"./Box-xHKMts_2.js";import"./useSlot-D1cnroQD.js";import"./mergeSlotProps-DQX4evuT.js";import"./useControlled-CzI241gx.js";import"./useTheme-dfKSq2Su.js";import"./utils-De7wtTOM.js";import"./useTimeout-BAdU5pP-.js";import"./Paper-5Zoc-9xP.js";import"./ButtonBase-DHoB_RJy.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-IXOLDclN.js";import"./styled-D8pj8Y4K.js";import"./listItemTextClasses-C7E-_PbG.js";import"./useThemeProps-BFQAGp_D.js";import"./getThemeProps-ChOnUwF0.js";import"./Alert-4PMQY43u.js";import"./Tab-BQ8isWIW.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BtIx0Hbn.js";import"./IconButton-BJlTJPq7.js";import"./CircularProgress-Q8c3WL36.js";import"./getValidReactChildren-CUz4ioTo.js";import"./TablePagination-C9t4WSEn.js";import"./Popover-DywppzR0.js";import"./Portal-BV3Pe61p.js";import"./Fade-BrbKBgZA.js";import"./Select-CxawLc-3.js";import"./MenuItem-BB-JoX19.js";import"./dividerClasses-DhTq4M-8.js";import"./Toolbar-e2JGeZ1r.js";import"./Tooltip-Cgiz5qkC.js";import"./Badge-D_CKobRc.js";import"./Button-93TGJvjn.js";import"./Stack-BhWwXw0z.js";import"./Card-DQQXVU6-.js";import"./CardContent-C9sUgdCK.js";import"./Chip-CosZ7bLG.js";import"./ListItem-ClQetUem.js";import"./Slider-CWCCBvKq.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
