import{j as o,M as m,e as n,C as p}from"./iframe-B5QuGMjp.js";import{useMDXComponents as r}from"./index-C2J499iS.js";import{muiComponents as s}from"./defaultTheme.stories-BZvvDyZF.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-DMOifEec.js";import"./context-CA8FdNYC.js";import"./ExpandMore-BlcaQp07.js";import"./createSvgIcon-Umkb0fkK.js";import"./SvgIcon-B3mqJ87k.js";import"./Typography-CrlbwWDa.js";import"./Box-DeghQrm3.js";import"./useSlot-DCpDVAbb.js";import"./mergeSlotProps-BwNMEpYD.js";import"./useControlled-sSW6TrFX.js";import"./useTheme-DyBIfWj3.js";import"./utils-DZiPGVC9.js";import"./useTimeout-BS8fzZm4.js";import"./Paper-BY3n15DG.js";import"./ButtonBase-B6geqTjM.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BJZpqkUa.js";import"./styled-D1uX4bve.js";import"./listItemTextClasses-B1ePVTyV.js";import"./useThemeProps-N88UKK0O.js";import"./getThemeProps-C8th2CFP.js";import"./Alert-AzGNL5ty.js";import"./Tab-DgL5P33O.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DvNmar4i.js";import"./IconButton--XqJkMhJ.js";import"./CircularProgress-voHYLowf.js";import"./getValidReactChildren-DrMpihL5.js";import"./TablePagination-C96auuhO.js";import"./Select-BqhqJDVu.js";import"./MenuItem-mVlhW2OA.js";import"./Popover-DjWxNMXL.js";import"./Portal-B96oIiUe.js";import"./Fade-CG24A_l8.js";import"./dividerClasses-DNgfhWmf.js";import"./Toolbar-B6JOYUOg.js";import"./Tooltip-KFTacI6e.js";import"./Badge-CHAhkNK5.js";import"./Button-BctY-s9Q.js";import"./Stack-BHDH169f.js";import"./Card-CkFmuD9p.js";import"./CardContent-DfJkqbuZ.js";import"./Chip-D-Qj_vd1.js";import"./ListItem-BVokUxX4.js";import"./Slider-BNc6ancs.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
