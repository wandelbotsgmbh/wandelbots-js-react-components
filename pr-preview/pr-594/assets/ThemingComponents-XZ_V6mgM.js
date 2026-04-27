import{j as e,M as p,e as i,C as r}from"./iframe-TfOBwPhs.js";import{useMDXComponents as n}from"./index-C6weNvoL.js";import{D as a}from"./JoggingPanel.stories-DbUHoy6c.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-CzrA6899.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-D2V43uF7.js";import"./useTheme-wqN532uy.js";import"./useLocalObservable-YulsUv0N.js";import"./Stack-DjLOY6Op.js";import"./Typography-Bf8eW30X.js";import"./styled-Co5J03YL.js";import"./useThemeProps-Dz9Yt3j7.js";import"./getThemeProps-D0oqFg1R.js";import"./createSvgIcon-DRMbAZ0e.js";import"./SvgIcon-g0gkd2Hr.js";import"./getValidReactChildren-BP7V0qKP.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-iPiJme4b.js";import"./context-Db2z16ug.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DGrVQeuJ.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Bzit30W_.js";import"./hooks-Bm0QowVc.js";import"./useTranslation-CFBp5eBG.js";import"./IconButton-CoYLMIfA.js";import"./ButtonBase-BamcbkFP.js";import"./useTimeout-h1V3ossd.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-MGU8Z-II.js";import"./useControlled-DioeQ4EG.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-Cy2bMqGn.js";import"./useSlotProps-BCd6bDIM.js";import"./Popover-B68pdEca.js";import"./useSlot-DsIglrBS.js";import"./Paper-Dpyh2TkT.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Bf8lIK3p.js";import"./utils-XCdVoUpC.js";import"./Fade-COizaEH3.js";import"./Alert-NbxwkK3r.js";import"./Tab-LnxgdXhB.js";import"./Button-B3Pjwj6x.js";import"./axis-x-CGszVvu7.js";import"./rotation-CoszVLbT.js";import"./JoggingCartesianAxisControl-UWzsm8F4.js";import"./Select-C5iwiCv1.js";import"./listItemTextClasses-CPKUoZIr.js";import"./MenuItem-FQDHF6uI.js";import"./dividerClasses-B3JLK2K_.js";import"./Box-D5eszPsQ.js";import"./ToggleButton-BOe2S1m0.js";import"./VelocitySlider-Dd1FI-Oi.js";import"./Divider-BLcNF-am.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
