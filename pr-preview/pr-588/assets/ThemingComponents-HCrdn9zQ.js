import{j as e,M as p,e as i,C as r}from"./iframe-BBM-L_pJ.js";import{useMDXComponents as n}from"./index-DPhOJaQW.js";import{D as a}from"./JoggingPanel.stories-MAbz4qZi.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-D8Dx9SZf.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-Uzw4kKq_.js";import"./useTheme-DhQJaoBr.js";import"./useLocalObservable-DjDfrd92.js";import"./Stack-VysfzjV0.js";import"./Typography-CK1K8DgU.js";import"./styled-ePcSnPHF.js";import"./useThemeProps-CsOtnOGF.js";import"./getThemeProps-8w1TVfyq.js";import"./createSvgIcon-CziPth_L.js";import"./SvgIcon-Cbpv0Ybw.js";import"./getValidReactChildren-BJM8H7dk.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-D9OW_3-K.js";import"./context-BXkv4zTp.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BHblJfLb.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DFJl4b38.js";import"./hooks-BjfVl8gN.js";import"./useTranslation-BcTIf-fz.js";import"./IconButton-CZD6Lyiv.js";import"./ButtonBase-BcFc2VdP.js";import"./useTimeout-pXozlHN-.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BpPW1d67.js";import"./useControlled-Ba1gLORI.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-B89aSjOD.js";import"./useSlotProps-hQX5-9E0.js";import"./Popover-C7wRrVjK.js";import"./useSlot-CJ0-TgTC.js";import"./Paper-C7sSHZyj.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Bc46UTZ3.js";import"./utils-CGnuWxAw.js";import"./Fade-Bnz_P2x0.js";import"./Alert-kXhTW-mp.js";import"./Tab-7mFGkdY6.js";import"./Button-gQgqIJED.js";import"./axis-x-Cl8FRNWN.js";import"./rotation-DyNyFc-g.js";import"./JoggingCartesianAxisControl-km_bBEJ-.js";import"./Select-Bcb7iVE0.js";import"./listItemTextClasses-CQsqpQ0B.js";import"./MenuItem-h1sohUZd.js";import"./dividerClasses-HSrufICD.js";import"./Box-D5ATEn0N.js";import"./ToggleButton-dUHF3bu-.js";import"./VelocitySlider-BT49-hWA.js";import"./Divider-BPl2CAtU.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
