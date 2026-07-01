import{j as o,M as m,e as n,C as p}from"./iframe-DlVyBzpi.js";import{useMDXComponents as r}from"./index-FIg5dnsw.js";import{muiComponents as s}from"./defaultTheme.stories-BmXqY1V_.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-CGu16mc7.js";import"./context-BQrBuDwe.js";import"./ExpandMore-Bn7weypg.js";import"./createSvgIcon-7Pk92ygQ.js";import"./SvgIcon-j6zUy6_U.js";import"./Typography-C2l6Re_h.js";import"./Box-qwGWoIt1.js";import"./useSlot-DpMwvKlY.js";import"./mergeSlotProps-MiAiPoXo.js";import"./useControlled-B8VEYPCH.js";import"./useTheme-kw-UmSir.js";import"./utils-B9xuRM3M.js";import"./useTimeout-DT9FEl5p.js";import"./Paper-BzNUsV-K.js";import"./ButtonBase-BZyoBJ6y.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-CmxcaeDC.js";import"./styled-DSPUPZpQ.js";import"./listItemTextClasses-ZZ6K7qVk.js";import"./useThemeProps-C-QfhJkQ.js";import"./getThemeProps-cuYpjEUq.js";import"./Alert-j9eyTxRI.js";import"./Tab-CWmpp1Be.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-Cn3iRUcL.js";import"./IconButton-BPaBVlU0.js";import"./CircularProgress-umI-wE3P.js";import"./getValidReactChildren-CyLW5cVS.js";import"./TablePagination-CzZQ79YV.js";import"./Select-CzqHmd91.js";import"./MenuItem-D46MnSRv.js";import"./Popover-BDC13S1F.js";import"./Portal-Cp41W3FY.js";import"./Fade-DO4JEcHl.js";import"./dividerClasses-CD3T0C7c.js";import"./Toolbar-Ch7WWI-7.js";import"./Tooltip-BCVgp-Ff.js";import"./Badge-D8eaBdCu.js";import"./Button-CwzLgPPM.js";import"./Stack-Cfn1Rccn.js";import"./Card-DOMPvW2P.js";import"./CardContent-LwivOd5-.js";import"./Chip-DYAMO4y1.js";import"./ListItem-hyEKTf6b.js";import"./Slider-BABbXdB6.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
