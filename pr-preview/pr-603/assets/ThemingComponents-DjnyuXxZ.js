import{j as e,M as p,e as i,C as r}from"./iframe-DOFV3qMp.js";import{useMDXComponents as n}from"./index-RSlysZkc.js";import{D as a}from"./JoggingPanel.stories-6esdS4Sl.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-Dzz0q-WS.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-CQ2pSqNi.js";import"./useTheme-Di2OtXAQ.js";import"./useLocalObservable-Tp6ZvJpe.js";import"./Stack-CCVEjtxj.js";import"./Typography-whG0rXfO.js";import"./styled-lyJmsatx.js";import"./useThemeProps-D-62jMOk.js";import"./getThemeProps-BvAQ1KVd.js";import"./createSvgIcon-9WOo4EIx.js";import"./SvgIcon-Cms0l4xT.js";import"./getValidReactChildren-D6KyY9iS.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BvFwLKPO.js";import"./context-BKk3ZerB.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-CgyNkRzM.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-1B2YlRj9.js";import"./hooks-AXv7i9Ds.js";import"./useTranslation-CvP1kotX.js";import"./IconButton-Bxsl-23L.js";import"./ButtonBase-BCwvd70N.js";import"./useTimeout-BLz4VzWu.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CZIJRd5n.js";import"./useControlled-DjHS7a5v.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DvZl-0P8.js";import"./useSlotProps-DlO16BSe.js";import"./Popover-B372jZ5R.js";import"./useSlot-BP5_SMj3.js";import"./Paper-B5_AfT_p.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-aykiK9SZ.js";import"./utils-UBy_vJjt.js";import"./Fade-B8WvNpXz.js";import"./Alert-CdPLC9lo.js";import"./Tab-CZZ03aPS.js";import"./Button-CQ-Mzu5s.js";import"./axis-x-CWuF7Ssc.js";import"./rotation-Da9gPhBD.js";import"./JoggingCartesianAxisControl-BB1oin0d.js";import"./Select-CJEhWlc6.js";import"./listItemTextClasses-iz72LTFy.js";import"./MenuItem-Dd24l5OX.js";import"./dividerClasses-DjJBTqjk.js";import"./Box-COYdint4.js";import"./ToggleButton-thnBZwOf.js";import"./VelocitySlider-Cxyn3fpf.js";import"./Divider-B-bfkLqA.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
