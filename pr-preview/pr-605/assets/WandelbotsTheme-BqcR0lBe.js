import{j as o,M as m,e as n,C as p}from"./iframe-rs4JJaxD.js";import{useMDXComponents as r}from"./index-DjaeLhX7.js";import{muiComponents as s}from"./defaultTheme.stories-DA0iYiRm.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-PnLHNwdn.js";import"./context-Cbe8v213.js";import"./ExpandMore-DVEixexC.js";import"./createSvgIcon-DQv-5Hox.js";import"./SvgIcon-CFc36DXz.js";import"./Typography-8ej_sRAy.js";import"./Box-wPKQBFlL.js";import"./useSlot-DUuripow.js";import"./mergeSlotProps-DzfaOKJt.js";import"./useControlled-k06cjiXT.js";import"./useTheme-CobDTQWt.js";import"./utils-CFhL4CVk.js";import"./useTimeout-CBChyXBX.js";import"./Paper-Bh8ZbiY3.js";import"./ButtonBase-CLiuZHd0.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DHKSE031.js";import"./styled-D246MLwA.js";import"./listItemTextClasses-CuysdyAw.js";import"./useThemeProps-RQmF4gJB.js";import"./getThemeProps-BWT0v7ja.js";import"./Alert-8r1pVsHC.js";import"./Tab-BZ-LlD77.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CZhrjHov.js";import"./IconButton-BlnWzPJI.js";import"./CircularProgress-DM2hf5ZD.js";import"./getValidReactChildren-DgDlnM3n.js";import"./TablePagination-at-L5Qr9.js";import"./Popover-rfo8QyS_.js";import"./Portal-DEj2U8TQ.js";import"./Fade-B3VkPA17.js";import"./Select-C_9FgCiN.js";import"./MenuItem-E3ZCUZuJ.js";import"./dividerClasses-DbLakAHH.js";import"./Toolbar-mqsSZykn.js";import"./Tooltip-DITidPaN.js";import"./Badge-1AcQDppY.js";import"./Button-CfH1JK8e.js";import"./Stack-Cc3xfy9U.js";import"./Card-CTwDuPeU.js";import"./CardContent-B9bHUIE2.js";import"./Chip-DKHfSh9v.js";import"./ListItem-DlrAxZf1.js";import"./Slider-_TYtKJ9f.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
