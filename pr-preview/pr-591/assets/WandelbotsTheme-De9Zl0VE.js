import{j as o,M as m,e as n,C as p}from"./iframe-MIriT0nl.js";import{useMDXComponents as r}from"./index-Dfb9mtFr.js";import{muiComponents as s}from"./defaultTheme.stories-DNDQP5VV.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DMbcls_E.js";import"./context-Cq8P_2h0.js";import"./ExpandMore-DC9iArOZ.js";import"./createSvgIcon-BuebzpOu.js";import"./SvgIcon-Ct8sJvRg.js";import"./Typography-CNiP0_wm.js";import"./Box-LUV0JySQ.js";import"./useSlot-Fc9_QjGa.js";import"./mergeSlotProps-BPr6vHcR.js";import"./useControlled-DAUbxM7a.js";import"./useTheme-B-feZ2Ip.js";import"./utils-CbEw5kHR.js";import"./useTimeout-Cv9hfpK0.js";import"./Paper-B42PQXlw.js";import"./ButtonBase-3p_pdqvv.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CDKkHdjh.js";import"./styled-ClnsY_bS.js";import"./listItemTextClasses-Ba6REEec.js";import"./useThemeProps-CD0delGH.js";import"./getThemeProps-CG3bCcME.js";import"./Alert-DLozDsfI.js";import"./Tab-D2QB50s1.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-BAkbrVY4.js";import"./IconButton-DkWP2e-9.js";import"./CircularProgress-DJUlHJvF.js";import"./getValidReactChildren-BL2leNor.js";import"./TablePagination-C41v3oSk.js";import"./Popover-BHFAk9My.js";import"./Portal-BKSCO0Ex.js";import"./Fade-B1j14a9s.js";import"./Select-Yc1sdwef.js";import"./MenuItem-vvdz3UKF.js";import"./dividerClasses-DQUnA9aZ.js";import"./Toolbar-Kpb7q3by.js";import"./Tooltip-D1mapqWZ.js";import"./Badge-Ms_ghoQT.js";import"./Button-BB1lEv_N.js";import"./Stack-Dz8j2g4N.js";import"./Card-szQrbbUF.js";import"./CardContent-DraaixKs.js";import"./Chip-9DF9zV0d.js";import"./ListItem-C5eaIU2_.js";import"./Slider-CTy-aPOT.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
