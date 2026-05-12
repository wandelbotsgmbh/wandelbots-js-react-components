import{j as e,M as p,e as i,C as r}from"./iframe-CKnMv-q-.js";import{useMDXComponents as n}from"./index-COT5TnJa.js";import{D as a}from"./JoggingPanel.stories-QPXgJGVK.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-CMr-h57z.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-DkyElCIm.js";import"./useTheme-JMl8CxOu.js";import"./useLocalObservable-Jmo1p9Q9.js";import"./Stack-rPrAmSD9.js";import"./Typography-CtqVY7OF.js";import"./styled-BFZVIFTe.js";import"./useThemeProps-rt0Ibdir.js";import"./getThemeProps-B6_c1AsR.js";import"./createSvgIcon-22tDeSxu.js";import"./SvgIcon-BXipr3fz.js";import"./getValidReactChildren-BGL6NY5W.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BLq6MfI8.js";import"./context-BwLpVNGx.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-Ch8mMNCX.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-F5chNvhV.js";import"./hooks-DV2UCy8X.js";import"./useTranslation-cDob2Uin.js";import"./IconButton-iS-WVmoX.js";import"./ButtonBase-BsnTmO4Y.js";import"./useTimeout-Ds47fsbn.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BAddgImB.js";import"./useControlled-D6OTga_k.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-C-MiaO5i.js";import"./useSlotProps-ukMyzBOJ.js";import"./Popover-DvkUIKtC.js";import"./useSlot-DfW1Qxse.js";import"./Paper-DbunMG_e.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CjaVblo0.js";import"./utils-DeyaSgWs.js";import"./Fade-DtQi7c9_.js";import"./Alert-Dp1duk69.js";import"./Tab-CNB7_ftG.js";import"./Button-hC2JayWv.js";import"./axis-x-Da86mb65.js";import"./rotation-DA51qmjK.js";import"./JoggingCartesianAxisControl-Dlg6LlfJ.js";import"./Select-BdLihiPL.js";import"./listItemTextClasses-CLHBkTwn.js";import"./MenuItem-CvaHqA6W.js";import"./dividerClasses-DxP3upp4.js";import"./Box-2WcZy4OE.js";import"./ToggleButton-BNy7CErK.js";import"./VelocitySlider-BHjR1i9L.js";import"./Divider-CRsyy1bM.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
