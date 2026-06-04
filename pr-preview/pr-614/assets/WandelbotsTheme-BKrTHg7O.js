import{j as o,M as m,e as n,C as p}from"./iframe-BtrzgrV8.js";import{useMDXComponents as r}from"./index-BfzNLbOM.js";import{muiComponents as s}from"./defaultTheme.stories-Bxah8DG7.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-B3-zZMxO.js";import"./context-BarGEpDz.js";import"./ExpandMore-B6Q0BXy8.js";import"./createSvgIcon-Cy8ZLq_g.js";import"./SvgIcon-CMTnfU9O.js";import"./Typography-jpJgFQ2i.js";import"./Box-BGzzxwU-.js";import"./useSlot-0sN3Lnz3.js";import"./mergeSlotProps-C6p3xKH-.js";import"./useControlled-C9DZghv8.js";import"./useTheme-B3DrdsdG.js";import"./utils-11de4an7.js";import"./useTimeout-CbipQpPA.js";import"./Paper-B8zJb-6j.js";import"./ButtonBase-S3s4USaD.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CBVuyF1I.js";import"./styled-COx3iEBO.js";import"./listItemTextClasses-CEXWd6rV.js";import"./useThemeProps-BlZlOzfv.js";import"./getThemeProps-CP60H-EU.js";import"./Alert-BsqvO31n.js";import"./Tab-RKbsVhd1.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CWtFffqL.js";import"./IconButton-OFaAZU8k.js";import"./CircularProgress-DBAZ_PyH.js";import"./getValidReactChildren-DCbVy6G9.js";import"./TablePagination-1L48XMcv.js";import"./Popover-D4oC11ri.js";import"./Portal-qIp9Gu_e.js";import"./Fade-DtpFn_mI.js";import"./Select-DTMqUkHE.js";import"./MenuItem-RFb3K2Tx.js";import"./dividerClasses-DmGC_F47.js";import"./Toolbar-BkXVhxDk.js";import"./Tooltip-Bw34jrnj.js";import"./Badge-DcpvO2xb.js";import"./Button-T578rp8F.js";import"./Stack-DqFw7jsi.js";import"./Card-ITuEApBM.js";import"./CardContent-CDPfuFe7.js";import"./Chip-DyLkITnb.js";import"./ListItem-Dn89Jssx.js";import"./Slider-D_NlxjzI.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
