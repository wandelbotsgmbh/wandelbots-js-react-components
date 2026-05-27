import{j as e,M as p,e as i,C as r}from"./iframe-CBDMMuz3.js";import{useMDXComponents as n}from"./index-BHcHHmcJ.js";import{D as a}from"./JoggingPanel.stories-CueGAtye.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-Mz-o5jw6.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-JrrzwG0t.js";import"./useTheme-DLS4xLiw.js";import"./useLocalObservable-CshpBOVH.js";import"./Stack-D3nClK2q.js";import"./Typography-CV0Tp7we.js";import"./styled-DUru4iAQ.js";import"./useThemeProps-iCVF290L.js";import"./getThemeProps-C8JWlsdd.js";import"./createSvgIcon-CECx_tZv.js";import"./SvgIcon-Dd-LMu7U.js";import"./getValidReactChildren-Bf7HSdqz.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-QvszZoWx.js";import"./context-BbxTy0Z6.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-Mwyi83Mg.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CmbV-Jbk.js";import"./hooks-DtQdAhho.js";import"./useTranslation-DDCAfE4N.js";import"./IconButton-DBvCGYHM.js";import"./ButtonBase-BxkUYE9-.js";import"./useTimeout-heWQx0Fu.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-B89lZYTz.js";import"./useControlled-RBFZn4TN.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-C47F8L1P.js";import"./useSlotProps-4a1ygkJs.js";import"./Popover-PjGpEV_J.js";import"./useSlot-BsAs-b92.js";import"./Paper-BZ-6F4wl.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CffhO-SH.js";import"./utils-D0Qjap8z.js";import"./Fade-o5-oD3wG.js";import"./Alert-DZrhRJvg.js";import"./Tab-DTRYLvEs.js";import"./Button-RK-WujTV.js";import"./axis-x-BrWghNUa.js";import"./rotation-BeqbP0ZG.js";import"./JoggingCartesianAxisControl-CyLD_XFh.js";import"./Select-DRFC7ynJ.js";import"./listItemTextClasses-D5LtiFb5.js";import"./MenuItem-DdOB7rQG.js";import"./dividerClasses-n_Fa-sDT.js";import"./Box-BdTXmdsT.js";import"./ToggleButton-Bdea32i4.js";import"./VelocitySlider-COxpLkdE.js";import"./Divider-cNP6Mlen.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
