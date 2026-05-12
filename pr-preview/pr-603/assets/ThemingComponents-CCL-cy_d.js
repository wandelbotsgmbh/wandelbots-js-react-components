import{j as e,M as p,e as i,C as r}from"./iframe-B1Bs3RxJ.js";import{useMDXComponents as n}from"./index-BreGfa1d.js";import{D as a}from"./JoggingPanel.stories-COFo6GnE.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BvqSSOcV.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-BU_6VMmg.js";import"./useTheme-fCrL-hko.js";import"./useLocalObservable-CxncW2Rl.js";import"./Stack-BVdxOj8d.js";import"./Typography-D5hqRsFl.js";import"./styled-DXhg39tz.js";import"./useThemeProps-DJqmVvwq.js";import"./getThemeProps-zDjuqjOX.js";import"./createSvgIcon-ixhp2G9O.js";import"./SvgIcon-BiGUDYK1.js";import"./getValidReactChildren-CIapjKiF.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BtP1uQqh.js";import"./context-DR8mrapR.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BFJKN8dy.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-RdFYYw-u.js";import"./hooks-BpJhDJQE.js";import"./useTranslation-60V8SIm0.js";import"./IconButton-DEdFF3dk.js";import"./ButtonBase-DtmtrwHb.js";import"./useTimeout-D86CVsWp.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-Bku3U6Pb.js";import"./useControlled-CGu9U0x5.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BvJb789h.js";import"./useSlotProps-gq5kQyAg.js";import"./Popover-CRHOmkTQ.js";import"./useSlot-bUwWAfIy.js";import"./Paper-IZsyuoa7.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Bys7yHt-.js";import"./utils-sYb3uprM.js";import"./Fade-FW0EcaKU.js";import"./Alert-Dbz8RhZy.js";import"./Tab-DpYoG4tQ.js";import"./Button-BAWnDKkq.js";import"./axis-x-DhKzrMcN.js";import"./rotation-CFG_5JsD.js";import"./JoggingCartesianAxisControl-A_iI1AHl.js";import"./Select-C51TtN1l.js";import"./listItemTextClasses-DOro3SXA.js";import"./MenuItem-BV7oW56d.js";import"./dividerClasses-0kxZ3YhU.js";import"./Box-D2LtxsD2.js";import"./ToggleButton-6ssfbSUv.js";import"./VelocitySlider-CRn42C4z.js";import"./Divider-CvBFzeLb.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
