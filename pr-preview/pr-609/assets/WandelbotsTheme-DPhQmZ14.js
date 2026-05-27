import{j as o,M as m,e as n,C as p}from"./iframe-Dj7DAHEB.js";import{useMDXComponents as r}from"./index-nUnPpHWd.js";import{muiComponents as s}from"./defaultTheme.stories-Bn5M1HaS.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-C2QiAah3.js";import"./context-BW5wz18S.js";import"./ExpandMore-ywgWg8uS.js";import"./createSvgIcon-x-oWwPfX.js";import"./SvgIcon-BihC4enE.js";import"./Typography-pPFv8ov5.js";import"./Box-NcKT6gJS.js";import"./useSlot-CkBv-IPs.js";import"./mergeSlotProps-Bt9BiSWd.js";import"./useControlled-DIUbfn-I.js";import"./useTheme-BjQQqwD4.js";import"./utils-CVRt_Cq7.js";import"./useTimeout-BmEZpCe4.js";import"./Paper-41EDSQ54.js";import"./ButtonBase-Cnwcv5GA.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BffLQxd7.js";import"./styled-DcYtgouz.js";import"./listItemTextClasses-huiFMGkD.js";import"./useThemeProps-JeLhly6J.js";import"./getThemeProps-EsKwhHiU.js";import"./Alert-BZ88F-Mm.js";import"./Tab-BJulLvYH.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-Cxvhz16f.js";import"./IconButton-Dz9wNTU3.js";import"./CircularProgress-Sp0qEgRF.js";import"./getValidReactChildren-CL6Bbcax.js";import"./TablePagination-Br4WsXP0.js";import"./Popover-vp-GT07x.js";import"./Portal-QHg1hDnY.js";import"./Fade-lq3QnGpm.js";import"./Select-3vKi6oH-.js";import"./MenuItem-BtxC0kLW.js";import"./dividerClasses-C26v3zUq.js";import"./Toolbar-B99-J0fr.js";import"./Tooltip-jbdBbCR3.js";import"./Badge-DcY7i3fI.js";import"./Button-CXJaqWDa.js";import"./Stack-CWb25cUe.js";import"./Card-CfzDNcZL.js";import"./CardContent-CaqHR_PR.js";import"./Chip-B22ybPHr.js";import"./ListItem-Bk2KTCp4.js";import"./Slider-D0uALyuI.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
