import{j as e,M as p,e as i,C as r}from"./iframe-rs4JJaxD.js";import{useMDXComponents as n}from"./index-DjaeLhX7.js";import{D as a}from"./JoggingPanel.stories-dfjqPgj3.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-CkORoydv.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-CopNJAVP.js";import"./useTheme-CobDTQWt.js";import"./useLocalObservable-BfiP2KZs.js";import"./Stack-Cc3xfy9U.js";import"./Typography-8ej_sRAy.js";import"./styled-D246MLwA.js";import"./useThemeProps-RQmF4gJB.js";import"./getThemeProps-BWT0v7ja.js";import"./createSvgIcon-DQv-5Hox.js";import"./SvgIcon-CFc36DXz.js";import"./getValidReactChildren-DgDlnM3n.js";import"./index-CW2dP9i_.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-PnLHNwdn.js";import"./context-Cbe8v213.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DfkOzqTR.js";import"./converters-bkii-Zhi.js";import"./CircularProgress-DM2hf5ZD.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Biq3GIAg.js";import"./hooks-CvBA8T3V.js";import"./useTranslation-CJRaX9N0.js";import"./IconButton-BlnWzPJI.js";import"./ButtonBase-CLiuZHd0.js";import"./useTimeout-CBChyXBX.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-_TYtKJ9f.js";import"./useControlled-k06cjiXT.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DzfaOKJt.js";import"./useSlotProps-CZhrjHov.js";import"./Popover-rfo8QyS_.js";import"./useSlot-DUuripow.js";import"./Paper-Bh8ZbiY3.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DEj2U8TQ.js";import"./utils-CFhL4CVk.js";import"./Fade-B3VkPA17.js";import"./Alert-8r1pVsHC.js";import"./Tab-BZ-LlD77.js";import"./Button-CfH1JK8e.js";import"./axis-x-BYU8dYKp.js";import"./rotation-Be3kOKsw.js";import"./JoggingCartesianAxisControl-DPY73emd.js";import"./Select-C_9FgCiN.js";import"./listItemTextClasses-CuysdyAw.js";import"./MenuItem-E3ZCUZuJ.js";import"./dividerClasses-DbLakAHH.js";import"./Box-wPKQBFlL.js";import"./ToggleButton-B-P31Tn_.js";import"./VelocitySlider-B8XDk8uf.js";import"./Divider--kUaC8vU.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
