import{j as o,M as m,e as n,C as p}from"./iframe-CtlxfIm5.js";import{useMDXComponents as r}from"./index-Dfa7621Y.js";import{muiComponents as s}from"./defaultTheme.stories-yohW7eNr.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-BoRH8jCz.js";import"./context-C5gDIydU.js";import"./ExpandMore-COCgdYLm.js";import"./createSvgIcon-rHzc-oWj.js";import"./SvgIcon-Cq3ZH_vE.js";import"./Typography-Ln-i8CgU.js";import"./Box-BjMHgAQT.js";import"./useSlot-Bm-O5tEt.js";import"./mergeSlotProps-DcCEPYkb.js";import"./useControlled-DBugiPWe.js";import"./useTheme-B64QnTMR.js";import"./utils-CTdnRKh3.js";import"./useTimeout-D4d-mIpE.js";import"./Paper-t4_MWTj4.js";import"./ButtonBase-NofM-t9b.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-BJorHv99.js";import"./styled-CrtGsq4g.js";import"./listItemTextClasses-DsTrWpkO.js";import"./useThemeProps-ChquWVSs.js";import"./getThemeProps-bL27AOxK.js";import"./Alert-BiNHWxee.js";import"./Tab-CdNWxJ3u.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-DsLOgQJf.js";import"./IconButton-0XF08Wpn.js";import"./CircularProgress-Csw8k20n.js";import"./getValidReactChildren-BeIUCzgA.js";import"./TablePagination-BjRIiqnE.js";import"./Popover-Cv6Asgcb.js";import"./Portal-DYJUtiHf.js";import"./Fade-DcBXY3tb.js";import"./Select-JuhuE5O3.js";import"./MenuItem-DjKofzmL.js";import"./dividerClasses-Cg8gdeW7.js";import"./Toolbar-Dw_1ioCx.js";import"./Tooltip-BTbCBTfz.js";import"./Badge-C6p29F6y.js";import"./Button-DZpRQccq.js";import"./Stack-BoPWqgs_.js";import"./Card-Bn4bBY5c.js";import"./CardContent-C3KbpA9X.js";import"./Chip-BH6B-JV1.js";import"./ListItem-p2Cc53rn.js";import"./Slider-DjSsMqbd.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
