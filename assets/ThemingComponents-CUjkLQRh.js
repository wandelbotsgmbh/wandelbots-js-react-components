import{j as e,M as p,e as i,C as r}from"./iframe-DIwJYtGD.js";import{useMDXComponents as n}from"./index-Kk18Nnvx.js";import{D as a}from"./JoggingPanel.stories-BwPyEdpC.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-D4yNGuDc.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-MWs3nUw2.js";import"./useTheme-ZaFxVY4K.js";import"./useLocalObservable-gh_1J2ok.js";import"./Stack-B_Spj1To.js";import"./Typography-DVw1jKEx.js";import"./styled-BBsgjtGw.js";import"./useThemeProps-_ip4ABd8.js";import"./getThemeProps-B95gudXi.js";import"./createSvgIcon-kpswALAs.js";import"./SvgIcon-vyy-Dufo.js";import"./getValidReactChildren-DBOzNCgi.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent--eKSPZYM.js";import"./context-KWHKwRr8.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DpvoRlhc.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BjOr21SZ.js";import"./hooks-CK_N-3Z6.js";import"./useTranslation-he0Plvax.js";import"./IconButton-CWzeOn36.js";import"./ButtonBase-UGuu9vvn.js";import"./useTimeout-CAyxjZZE.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DDXqWgR8.js";import"./useControlled-Gi9gFupQ.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-B7zS71bn.js";import"./useSlotProps-BZmqV1UC.js";import"./Popover-BNc9V3v6.js";import"./useSlot-Cp5BGbWw.js";import"./Paper-DmcUkLkQ.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-D6rRQxLA.js";import"./utils-ig6sz9ZK.js";import"./Fade-DA9QTW75.js";import"./Alert-f83nzd72.js";import"./Tab-BeqMojV-.js";import"./Button-jOqAA-0K.js";import"./axis-x-BafxAqF0.js";import"./rotation-Dzm2_NIB.js";import"./JoggingCartesianAxisControl-B2JlPHl3.js";import"./Select-gpYKDFKn.js";import"./listItemTextClasses-DSxXLS7f.js";import"./MenuItem-gS-KRqR2.js";import"./dividerClasses-DXouQzVa.js";import"./Box-ZT9p9Gzf.js";import"./ToggleButton-CnxMxmEu.js";import"./VelocitySlider-DtOf_oyY.js";import"./Divider-I11-pKEy.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
