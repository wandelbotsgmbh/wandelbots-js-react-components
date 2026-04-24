import{j as e,M as p,e as i,C as r}from"./iframe-CJvI5zCD.js";import{useMDXComponents as n}from"./index-tATN8rjQ.js";import{D as a}from"./JoggingPanel.stories-DXbIReEG.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-B8DMNIz1.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-91wm3zC4.js";import"./useTheme-DIVErIPC.js";import"./useLocalObservable-CgeAxjUq.js";import"./Stack-DcCGIswi.js";import"./Typography-By8xgP9c.js";import"./styled-orFgq5sf.js";import"./useThemeProps-eAd8t3j3.js";import"./getThemeProps-D7nMntxm.js";import"./createSvgIcon-BUKmf-IE.js";import"./SvgIcon-dzaD1Y41.js";import"./getValidReactChildren-CSYZeuhH.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-DG7lbcLD.js";import"./context-D-BLjBTG.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BvzL5Wtj.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DjAxd5G0.js";import"./hooks-CZRX5naU.js";import"./useTranslation-DQXWxft2.js";import"./IconButton-DaDI6frD.js";import"./ButtonBase-BzQxkfcS.js";import"./useTimeout-CG0neS_Q.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CAy8zCDK.js";import"./useControlled-C5qoPxJY.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-nu3AJl-Y.js";import"./useSlotProps-BdqIVPhW.js";import"./Popover-DzV2H5Rx.js";import"./useSlot-s5CMMXPd.js";import"./Paper-BkVqy4c-.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DioGNsU8.js";import"./utils-CbG3oRES.js";import"./Fade-C9cZSC3L.js";import"./Alert-BZyIu67k.js";import"./Tab-BzMaDjrg.js";import"./Button-C3tjNlhx.js";import"./axis-x-Bz8izqN6.js";import"./rotation-DYsy4dk4.js";import"./JoggingCartesianAxisControl-ZIaScuhQ.js";import"./Select-CxouOy6k.js";import"./listItemTextClasses-DbHjUbiJ.js";import"./MenuItem-CQA2kCnm.js";import"./dividerClasses-BaoBVbcy.js";import"./Box-BCMKYrHH.js";import"./ToggleButton-DduE_zNc.js";import"./VelocitySlider-BHhSlfh2.js";import"./Divider-BAILFoYq.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
