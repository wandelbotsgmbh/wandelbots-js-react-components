import{j as o,M as m,e as n,C as p}from"./iframe-DzkduSN5.js";import{useMDXComponents as r}from"./index-DVLj52ly.js";import{muiComponents as s}from"./defaultTheme.stories-DK60KbfP.js";import"./preload-helper-Dp1pzeXC.js";import"./externalizeComponent-JivsVoES.js";import"./context-C-SFr4NW.js";import"./ExpandMore-BPrjiLKH.js";import"./createSvgIcon-BJKMBxUO.js";import"./SvgIcon-z32JuZug.js";import"./Typography-SbE6EZMf.js";import"./Box-HVxffsAF.js";import"./useSlot-D-hScFTC.js";import"./mergeSlotProps-CKxRQmoG.js";import"./useControlled-BwtE2zNz.js";import"./useTheme-Dglcc0qK.js";import"./utils-BPOoFFgO.js";import"./useTimeout-BwrNkGaU.js";import"./Paper-BbciFb-V.js";import"./ButtonBase-CooJ7iMR.js";import"./isFocusVisible-B8k4qzLc.js";import"./Grid-DYFkM6bF.js";import"./styled-YxX8NoS3.js";import"./listItemTextClasses-BjX5b19l.js";import"./useThemeProps-cJFIFyYJ.js";import"./getThemeProps-CvU0DA3I.js";import"./Alert-TlAXUHLX.js";import"./Tab-D7TLh5yM.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlotProps-CjYjv1g_.js";import"./IconButton-D05y1YQ2.js";import"./CircularProgress-sATUphan.js";import"./getValidReactChildren-CkMtQ3sE.js";import"./TablePagination-e6zu6OAK.js";import"./Popover-BTcPdiEa.js";import"./Portal-kJ_SwJ8g.js";import"./Fade-hX-xp3jX.js";import"./Select-CJ6Dd7f-.js";import"./MenuItem-BNGZl7Sj.js";import"./dividerClasses-DZq_3EBl.js";import"./Toolbar-DCdyDDd8.js";import"./Tooltip-CxUxrf2h.js";import"./Badge-DJqcZ1Px.js";import"./Button-BgwoVAog.js";import"./Stack-Dj96-hOb.js";import"./Card-JnXI4Dni.js";import"./CardContent-CFydRAJj.js";import"./Chip-ChhOGl_d.js";import"./ListItem-CZDRi5Uz.js";import"./Slider-BECnCu2S.js";function i(e){const t={a:"a",code:"code",h1:"h1",p:"p",...r(),...e.components};return o.jsxs(o.Fragment,{children:[`
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
