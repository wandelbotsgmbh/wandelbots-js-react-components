import{j as o,M as m,e as n,C as p}from"./iframe-DsIznll6.js";import{useMDXComponents as i}from"./index-Cu9z6NLM.js";import{muiComponents as s}from"./defaultTheme.stories-C_Kbs5Pu.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BIfxugPc.js";import"./context-d2CPQsug.js";import"./ExpandMore-3UdKxz8C.js";import"./createSvgIcon-PMG1r61Z.js";import"./SvgIcon-DoN0bCkI.js";import"./Typography-BxHRdZ9I.js";import"./Box-Djfsij3E.js";import"./useSlot-D9OoSkzS.js";import"./mergeSlotProps-RfnMYMpl.js";import"./useControlled-CiqNq30m.js";import"./useTheme-B0FSM7P6.js";import"./utils-DoOhbL3j.js";import"./useTimeout-BOvcVN-v.js";import"./Paper-McALZ7Oz.js";import"./ButtonBase-DQ7U0C-3.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CmsWWT4Q.js";import"./styled-CMvJS0dM.js";import"./listItemTextClasses-YSV6tf82.js";import"./useThemeProps-BapssDN1.js";import"./getThemeProps-Cr2DU6F7.js";import"./Alert-DYq4WO-D.js";import"./Tab-BfDpxBMP.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DfJcPf-6.js";import"./IconButton-B4PNVDVK.js";import"./CircularProgress-D6oZ61_8.js";import"./getValidReactChildren-BTpOBsZP.js";import"./TablePagination-CjfpvQxI.js";import"./Select-CA9j9mig.js";import"./MenuItem-d4_0BGjr.js";import"./Popover-BW8Rb4dP.js";import"./Portal-Bl5PbDcM.js";import"./Fade-BrMVxWCP.js";import"./dividerClasses-kmKSPPUW.js";import"./Toolbar-DgIlKmku.js";import"./Tooltip-DEAwFxok.js";import"./Badge-BWe6sE3B.js";import"./Button-BcWovFl4.js";import"./Stack-BEWfguQ2.js";import"./Card-BKAU8pz3.js";import"./CardContent-1_i-N4Hi.js";import"./Chip-D3pm67bD.js";import"./ListItem-IyhTzOeR.js";import"./Slider-DQ9Nl8Bf.js";function r(e){const t={a:"a",code:"code",h1:"h1",p:"p",...i(),...e.components};return o.jsxs(o.Fragment,{children:[`
`,`
`,`
`,o.jsx(m,{title:"Theming/Wandelbots MUI Theme"}),`
`,o.jsx(t.h1,{id:"wandelbots-mui-theme",children:"Wandelbots MUI Theme"}),`
`,o.jsxs(t.p,{children:[`The component library comes with a Wandelbots theme for Material UI which is the default theme used in this storybook.
If you like, you can use it in your own app to give the components a similar look.
The theme is accessed by calling `,o.jsx(t.code,{children:"createNovaTheme"}),", and can be ",o.jsx(t.a,{href:"?path=/docs/theming-theming-components--docs",children:"customized"})," as needed."]}),`
`,o.jsxs(t.p,{children:["The theme comes in dark and light variants using the standard MUI ",o.jsxs(t.a,{href:"https://mui.com/material-ui/customization/dark-mode/",rel:"nofollow",children:[o.jsx(t.code,{children:"palette.mode"})," option"]}),"."]}),`
`,o.jsx(n,{dark:!0,code:`
import { ThemeProvider } from "@mui/material"
import { createNovaTheme } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaTheme()

<ThemeProvider theme={theme}>
...
</ThemeProvider>
`}),`
`,o.jsx(p,{of:s,sourceState:"none"})]})}function no(e={}){const{wrapper:t}={...i(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(r,{...e})}):r(e)}export{no as default};
