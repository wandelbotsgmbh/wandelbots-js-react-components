import{j as e,M as p,e as i,C as r}from"./iframe-DzkduSN5.js";import{useMDXComponents as n}from"./index-DVLj52ly.js";import{D as a}from"./JoggingPanel.stories-DK3OI6Xa.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BYmevAAx.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-BEf5SNgL.js";import"./useTheme-Dglcc0qK.js";import"./useLocalObservable-sle5c1ZR.js";import"./Stack-Dj96-hOb.js";import"./Typography-SbE6EZMf.js";import"./styled-YxX8NoS3.js";import"./useThemeProps-cJFIFyYJ.js";import"./getThemeProps-CvU0DA3I.js";import"./createSvgIcon-BJKMBxUO.js";import"./SvgIcon-z32JuZug.js";import"./getValidReactChildren-CkMtQ3sE.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-JivsVoES.js";import"./context-C-SFr4NW.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-sATUphan.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CxyPLV3f.js";import"./hooks-Bb4sO-9A.js";import"./useTranslation-CyZMo_Eh.js";import"./IconButton-D05y1YQ2.js";import"./ButtonBase-CooJ7iMR.js";import"./useTimeout-BwrNkGaU.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BECnCu2S.js";import"./useControlled-BwtE2zNz.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CKxRQmoG.js";import"./useSlotProps-CjYjv1g_.js";import"./Popover-BTcPdiEa.js";import"./useSlot-D-hScFTC.js";import"./Paper-BbciFb-V.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-kJ_SwJ8g.js";import"./utils-BPOoFFgO.js";import"./Fade-hX-xp3jX.js";import"./Alert-TlAXUHLX.js";import"./Tab-D7TLh5yM.js";import"./Button-BgwoVAog.js";import"./axis-x-DhvrTH-D.js";import"./rotation-B52sbI93.js";import"./JoggingCartesianAxisControl-Dya6nQFR.js";import"./Box-HVxffsAF.js";import"./Select-CJ6Dd7f-.js";import"./listItemTextClasses-BjX5b19l.js";import"./MenuItem-BNGZl7Sj.js";import"./dividerClasses-DZq_3EBl.js";import"./ToggleButton-BjYIgD3D.js";import"./VelocitySlider-Bm9zS7IJ.js";import"./Divider-Bqze0tVt.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
