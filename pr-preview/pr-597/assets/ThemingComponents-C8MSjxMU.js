import{j as e,M as a,e as i,C as r}from"./iframe-Csvqmt9d.js";import{useMDXComponents as n}from"./index-CEMQBUNd.js";import{D as p}from"./JoggingPanel.stories-48jITtTU.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-7crg2-Wz.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-v39rqgQk.js";import"./index-CpsLbTMz.js";import"./useTheme-BmUsjoBs.js";import"./useLocalObservable-DKtHxFgy.js";import"./Stack-z4Y2H4fM.js";import"./Typography-9JWGQxWv.js";import"./composeClasses-jpgJS3sY.js";import"./useThemeProps-GtQox2oI.js";import"./getThemeProps-BKgyK9W_.js";import"./createSvgIcon-CQobpaRP.js";import"./SvgIcon-BjA8CGvM.js";import"./getValidReactChildren-9MDF7GEr.js";import"./index-DHCxF5fF.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-Ci0nU1vS.js";import"./externalizeComponent-JgDRPajj.js";import"./context-CKfxtjc4.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-CgeMb0GA.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DpfZJbgc.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-JGC3i0Ow.js";import"./hooks-pbHk0UHl.js";import"./useTranslation-CPlXgko5.js";import"./IconButton-C7P47dzF.js";import"./ButtonBase-DWxjZB3W.js";import"./useTimeout-DPmD0v9b.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-D3YpAmA7.js";import"./useControlled-Bfufdaay.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-dHsxP8Mr.js";import"./useSlotProps-D2vM2epx.js";import"./Popover-BFNMFKe0.js";import"./useSlot-DJnBC_aL.js";import"./Paper-BdLmHOf3.js";import"./getActiveElement-DxURyTVq.js";import"./Portal-DMi1q-7P.js";import"./utils-mstRdeUE.js";import"./Fade-XgDxQ5L4.js";import"./Alert-BcrKOJb2.js";import"./Tab-f-ZF7Fjo.js";import"./Button-BjIbCnOI.js";import"./axis-x-arrKpnYj.js";import"./rotation-BhdvjegU.js";import"./JoggingCartesianAxisControl-DCoB6anp.js";import"./Select-DosvkvtQ.js";import"./MenuItem-BRFkJsps.js";import"./listItemTextClasses-_F5IOE_I.js";import"./dividerClasses-CjEzI8Aa.js";import"./Box-b8wV-evi.js";import"./ToggleButton-DA8cIdwc.js";import"./VelocitySlider-BeNY23NL.js";import"./Divider-B6Nfouky.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
`,e.jsx(r,{of:p,sourceState:"none"}),`
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
`,e.jsx(r,{of:h,sourceState:"none"})]})}function Te(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{Te as default};
