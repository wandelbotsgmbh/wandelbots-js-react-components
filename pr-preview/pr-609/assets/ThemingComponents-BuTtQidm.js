import{j as e,M as p,e as i,C as r}from"./iframe-Dcmn42tv.js";import{useMDXComponents as n}from"./index-CgoHcePl.js";import{D as a}from"./JoggingPanel.stories-BJcGaCvr.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BB2d0WoJ.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-DdU8ubv0.js";import"./useTheme-139swMtV.js";import"./useLocalObservable-h9xlWyuw.js";import"./Stack-D_oLykLK.js";import"./Typography-BBtbxn6K.js";import"./styled-BFCn464a.js";import"./useThemeProps-BWInZWb0.js";import"./getThemeProps-B6gsEQP0.js";import"./createSvgIcon-NJJohj8e.js";import"./SvgIcon-Du6KE5rc.js";import"./getValidReactChildren-ClBssk_v.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BTWjdZbG.js";import"./context-B35EpFub.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-EW4ccMUy.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-B1uXBGqp.js";import"./hooks-BIczyd4v.js";import"./useTranslation-h-4M_3V_.js";import"./IconButton-0NAu6vmr.js";import"./ButtonBase-N22w60Sc.js";import"./useTimeout-ByN2NyeA.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DY0HoCcU.js";import"./useControlled-4NxfGtC8.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-Bf1NHMYu.js";import"./useSlotProps-BGlY2FHo.js";import"./Popover-Bc6qquBs.js";import"./useSlot-CG_2yG4d.js";import"./Paper-C3W0A68c.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-B-ewKxWD.js";import"./utils-Di_tQ8IY.js";import"./Fade-BHOuRT9i.js";import"./Alert-D92wjWYE.js";import"./Tab-CLcdOO9p.js";import"./Button-CbyD2CxH.js";import"./axis-x-CREkhZFd.js";import"./rotation-Cvz1OFWu.js";import"./JoggingCartesianAxisControl-D-7FcfRh.js";import"./Select-8DQdwDjt.js";import"./listItemTextClasses-CX4W13IH.js";import"./MenuItem-B9udXM5s.js";import"./dividerClasses-DRCv2dZ6.js";import"./ToggleButton-apBsjJlf.js";import"./Box-DREbLPds.js";import"./VelocitySlider-BugxG_uH.js";import"./Divider-CzjbSBrE.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
