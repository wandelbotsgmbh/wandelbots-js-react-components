import{j as e,M as p,e as i,C as r}from"./iframe-DCokSdT7.js";import{useMDXComponents as n}from"./index-CPJuWE6i.js";import{D as a}from"./JoggingPanel.stories-DmVX6GGG.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-lr4vlEq4.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-BIZVF8Hu.js";import"./useTheme-B_nhbgZF.js";import"./useLocalObservable-BJPgKsaf.js";import"./Stack-CBfrBnME.js";import"./Typography-xeTEG8K0.js";import"./styled-C6BemGc7.js";import"./useThemeProps-GvQfHGKS.js";import"./getThemeProps-DXkvPSLR.js";import"./createSvgIcon-CqRlMz8T.js";import"./SvgIcon-CXDGlQs5.js";import"./getValidReactChildren-D1Hiqgkf.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-CJpkoEyD.js";import"./context-zkDGtYYg.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DnawC6GW.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BaspHuGM.js";import"./hooks-DXR1t149.js";import"./useTranslation-D9w3coEZ.js";import"./IconButton-CeWoJyel.js";import"./ButtonBase-BLAY8Qqy.js";import"./useTimeout-DM98COdN.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-9t_oRhI3.js";import"./useControlled-BjD1XdI8.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BGRhNw94.js";import"./useSlotProps-B7mUyRSK.js";import"./Popover-CAB0eiUS.js";import"./useSlot-ET9ocIeW.js";import"./Paper-DtICMVyH.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CLOEicDQ.js";import"./utils-CN09Sruk.js";import"./Fade-B74F0Arq.js";import"./Alert-CCwq4rC4.js";import"./Tab-B9WZ_fhU.js";import"./Button-BdZ1mKjp.js";import"./axis-x-CrczWCy-.js";import"./rotation-C0eEJBE5.js";import"./JoggingCartesianAxisControl-B2RuN4B8.js";import"./Select-CFT9rViM.js";import"./listItemTextClasses-CX1YVwMY.js";import"./MenuItem-B7gkQJbF.js";import"./dividerClasses-H1E61aya.js";import"./Box-QyQwW5pn.js";import"./ToggleButton-RZBk0s_b.js";import"./VelocitySlider-fa-Xg2L6.js";import"./Divider-KdYHvmXI.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
