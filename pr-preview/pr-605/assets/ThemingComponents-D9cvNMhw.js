import{j as e,M as p,e as i,C as r}from"./iframe-RLKXSL2L.js";import{useMDXComponents as n}from"./index-BzkMgqjc.js";import{D as a}from"./JoggingPanel.stories-B2shGCvh.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-DoviDViB.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-CvkTwRBA.js";import"./useTheme-752l6NHN.js";import"./useLocalObservable-CEXT5ji9.js";import"./Stack-ecwMXtXU.js";import"./Typography-CxXcrttO.js";import"./styled-XqBvhWtB.js";import"./useThemeProps-MxJQxNw4.js";import"./getThemeProps-ku--7DhN.js";import"./createSvgIcon-c2KrZBuE.js";import"./SvgIcon-hBmb142s.js";import"./getValidReactChildren-DWk-6epI.js";import"./index-Bcq_XY8v.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BCcvJ4dd.js";import"./context-fnZvdwT4.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DU1lyo05.js";import"./converters-CNFysZQy.js";import"./CircularProgress-C7muK3Jo.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Fu6KOtkq.js";import"./hooks-DjbrmWYX.js";import"./useTranslation-DIN3BHhc.js";import"./IconButton-Bw_7kIkG.js";import"./ButtonBase-pA2aBByI.js";import"./useTimeout-3h5lRCjk.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DQXyy5nq.js";import"./useControlled-DvixkQcc.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BJfQVUXN.js";import"./useSlotProps-reWfVlGs.js";import"./Popover-CvwdVGCy.js";import"./useSlot-zgjAFWMW.js";import"./Paper-xjOQV5S5.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-B9m9OQaF.js";import"./utils-BC0M9_4t.js";import"./Fade-KbZY5-a1.js";import"./Alert-CKge3RQZ.js";import"./Tab-0TC89RYi.js";import"./Button-BXvy-y1L.js";import"./axis-x-DTfdwwyO.js";import"./rotation-BODmvRnz.js";import"./JoggingCartesianAxisControl-CvRn-RS3.js";import"./Select-CTiqHv0e.js";import"./listItemTextClasses-BYwFKPlQ.js";import"./MenuItem-BWbbAER4.js";import"./dividerClasses-D8Yy2_95.js";import"./Box-CfCypOiM.js";import"./ToggleButton-T5eVS2B7.js";import"./VelocitySlider-BsJ_Jtza.js";import"./Divider-BzTkQhI5.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
