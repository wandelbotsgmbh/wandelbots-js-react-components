import{j as e,M as p,e as i,C as r}from"./iframe-Ccvk4lqh.js";import{useMDXComponents as n}from"./index-BOtUMWng.js";import{D as a}from"./JoggingPanel.stories-D6pVVb2u.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BZgstAn9.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-eFY-0XpK.js";import"./useTheme-B-LUCvvv.js";import"./useLocalObservable-BVUyeQAN.js";import"./Stack-Bedv1cPA.js";import"./Typography-8g-0sihl.js";import"./styled-C7bbyX7j.js";import"./useThemeProps-BM39M4Yb.js";import"./getThemeProps-RrF-2-cN.js";import"./createSvgIcon-BtL2Alr7.js";import"./SvgIcon-DwZAwAQy.js";import"./getValidReactChildren-DwwcQNJ2.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-DmGWC5Lo.js";import"./context-CWI-I5lq.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BcmhoRwx.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BETtQvln.js";import"./hooks-Kl4-FSZQ.js";import"./useTranslation-OfYQlrxe.js";import"./IconButton-DD2Srs09.js";import"./ButtonBase-3-VVAOkt.js";import"./useTimeout-CqAJlu4L.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BSTqm0zz.js";import"./useControlled-Cxek5mNJ.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-C5U6_dFD.js";import"./useSlotProps-CkE4ud3b.js";import"./Popover-DqmNkGW8.js";import"./useSlot-CeyViPqg.js";import"./Paper-D7WVMPXU.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DyxJ_85z.js";import"./utils-BdIw276R.js";import"./Fade-BrMySx3L.js";import"./Alert-BRJ_TxFC.js";import"./Tab-Dc8fKOJk.js";import"./Button-mWMwBiy_.js";import"./axis-x-sXx4VQ6J.js";import"./rotation-BVVS54hF.js";import"./JoggingCartesianAxisControl-BbxC50G1.js";import"./Select-DHHEIMTW.js";import"./listItemTextClasses-6wrDVV-P.js";import"./MenuItem-gj1WMS1Z.js";import"./dividerClasses-HSKHziqc.js";import"./ToggleButton-CBJDmqsy.js";import"./Box-B9ppKL-n.js";import"./VelocitySlider-Bm-qQbM9.js";import"./Divider-Dc7baB9n.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
`,e.jsx(t.h1,{id:"theming-components",children:"Theming components"}),`
`,e.jsxs(t.p,{children:["The UI components presented in this library will respect the ",e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/",rel:"nofollow",children:"Material UI theme"}),` of
the application they are rendered within, allowing customization with the MUI theming system.`]}),`
`,e.jsx(t.h2,{id:"using-the-wandelbots-mui-theme",children:"Using the Wandelbots MUI theme"}),`
`,e.jsxs(t.p,{children:["To make the components look exactly like they do in the storybook, pass the Wandelbots MUI theme to ",e.jsx(t.code,{children:"ThemeProvider"}),"."]}),`
`,e.jsx(i,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaMuiTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaMuiTheme()

<ThemeProvider theme={theme}>
<JoggingPanel ... />
</ThemeProvider>
`}),`
`,e.jsx(r,{of:a,sourceState:"none"}),`
`,e.jsx(t.h2,{id:"extending-the-default-theme",children:"Extending the default theme"}),`
`,e.jsxs(t.p,{children:[`You can also use the Wandelbots theme as a base and extend it with your own customizations, or even merge it
with another theme using MUI `,e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/#api",rel:"nofollow",children:"theme composition"}),"."]}),`
`,e.jsx(i,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaMuiTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaMuiTheme({
palette: {
  primary: {
    main: "#ff0000"
  }
}
})

<ThemeProvider theme={theme}>
<JoggingPanel ... />
</ThemeProvider>
`}),`
`,e.jsx(r,{of:s,sourceState:"none"}),`
`,e.jsx(t.h2,{id:"use-your-own-theme",children:"Use your own theme"}),`
`,e.jsx(t.p,{children:"You could instead use an entirely different MUI theme and style the components as you like."}),`
`,e.jsx(i,{dark:!0,code:`
import { ThemeProvider, createTheme } from "@mui/material";
import { JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createTheme({
typography: {
  fontFamily: 'Comic Sans MS'
}
})

<ThemeProvider theme={theme}>
<JoggingPanel ... />
</ThemeProvider>
`}),`
`,e.jsx(r,{of:h,sourceState:"none"})]})}function we(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{we as default};
