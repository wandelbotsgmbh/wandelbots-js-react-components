import{j as o,M as m,e as n,C as p}from"./iframe-DY_IO8c8.js";import{useMDXComponents as r}from"./index-C7IjzBrz.js";import{muiComponents as s}from"./defaultTheme.stories-yLERmzm1.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-4lBGU2R5.js";import"./context-CGzCXoAR.js";import"./ExpandMore-DMCctMDL.js";import"./createSvgIcon-ITmClUvp.js";import"./SvgIcon-DqnXvElq.js";import"./Typography-Fa3ajHU7.js";import"./Box-BupPFMzk.js";import"./useSlot-Dz-UKd6T.js";import"./mergeSlotProps--QLpn-k1.js";import"./useControlled-D3NIlsD7.js";import"./useTheme-DrFw6D_u.js";import"./utils-CQ76Iv63.js";import"./useTimeout-BOq0MMlw.js";import"./Paper-Y0exr2ky.js";import"./ButtonBase-Vc7MHbHD.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BOtCaJj1.js";import"./styled-DtpyQBcf.js";import"./listItemTextClasses-DZo8nSZc.js";import"./useThemeProps-igg2zpwF.js";import"./getThemeProps-CKlwOt8G.js";import"./Alert-CKXxGvZD.js";import"./Tab-DwL7PlcS.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-B9CHFuFe.js";import"./IconButton-BS0lUVAZ.js";import"./CircularProgress-BjMzktpI.js";import"./getValidReactChildren-D5IvabZK.js";import"./TablePagination-DJdolSVf.js";import"./Popover-XCafoHn8.js";import"./Portal-DHr1pSUL.js";import"./Fade-CUyXHLF7.js";import"./Select-BVG2pEWP.js";import"./MenuItem-B73Xfzo-.js";import"./dividerClasses-CXCLijuN.js";import"./Toolbar-ChNFfCjJ.js";import"./Tooltip-CkYNPIma.js";import"./Badge-_KKUc8Qj.js";import"./Button-qnvr5D63.js";import"./Stack-DhlPXTc7.js";import"./Card-CsQO5k9Z.js";import"./CardContent-DAtf-cD0.js";import"./Chip-Bz9DTq22.js";import"./ListItem-D34ObiE9.js";import"./Slider-AsKEgAnA.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
