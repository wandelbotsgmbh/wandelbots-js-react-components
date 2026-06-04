import{j as e,M as a,e as i,C as r}from"./iframe-odfKxiTV.js";import{useMDXComponents as n}from"./index-9fQ3fZen.js";import{D as p}from"./JoggingPanel.stories-BK73qeUn.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-CULen7wR.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-BJN1u2tk.js";import"./useTheme-B3GCKj7e.js";import"./useLocalObservable-BJi3pu91.js";import"./Stack-fM7dFeIR.js";import"./Typography-LyVcd3Va.js";import"./styled-mrztSxry.js";import"./useThemeProps-DESBK_k_.js";import"./getThemeProps-ur7W5uuC.js";import"./createSvgIcon-leizhUbI.js";import"./SvgIcon-BhLLzV0v.js";import"./getValidReactChildren-JU8M877q.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-Di913JnV.js";import"./context-BBIOFhRA.js";import"./novaCompat-CLCJAe3b.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-Ca1EZ2xA.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DIzBXwqq.js";import"./hooks-DLRDfDZc.js";import"./useTranslation-YBey-yG2.js";import"./IconButton-WCKs6kKZ.js";import"./ButtonBase-APn3V94D.js";import"./useTimeout-CoRBxoT9.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CozdFahk.js";import"./useControlled-DQL7PAt4.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DjxkSxtl.js";import"./useSlotProps-DGEQD-ew.js";import"./Popover-COzh9Dq_.js";import"./useSlot-CnqtNHtQ.js";import"./Paper-DrWsVeZL.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CC432YjX.js";import"./utils-DfjlRU2E.js";import"./Fade-BuoLAAwP.js";import"./Alert-Sl_Nq9FZ.js";import"./Tab-DskL23ot.js";import"./Button--PBfIG2p.js";import"./axis-x-D6BKC7rr.js";import"./rotation-DcuEXiJp.js";import"./JoggingCartesianAxisControl-Wh-tGysB.js";import"./Box-DGhUiJhe.js";import"./Select-B4v9rALQ.js";import"./listItemTextClasses-Ch0Jh6sO.js";import"./MenuItem-BbcmXXSE.js";import"./dividerClasses-S-HTf57D.js";import"./ToggleButton-DUCJ1BXy.js";import"./VelocitySlider-CuaPX02e.js";import"./Divider-CFYaRXRB.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
