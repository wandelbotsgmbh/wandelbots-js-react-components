import{j as e,M as p,e as i,C as r}from"./iframe-Dj7DAHEB.js";import{useMDXComponents as n}from"./index-nUnPpHWd.js";import{D as a}from"./JoggingPanel.stories-pLnja8GX.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BitJCyxX.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-BtCdm7pc.js";import"./useTheme-BjQQqwD4.js";import"./useLocalObservable-DQa1FCn1.js";import"./Stack-CWb25cUe.js";import"./Typography-pPFv8ov5.js";import"./styled-DcYtgouz.js";import"./useThemeProps-JeLhly6J.js";import"./getThemeProps-EsKwhHiU.js";import"./createSvgIcon-x-oWwPfX.js";import"./SvgIcon-BihC4enE.js";import"./getValidReactChildren-CL6Bbcax.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-C2QiAah3.js";import"./context-BW5wz18S.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-Sp0qEgRF.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Cybwp63M.js";import"./hooks-D9G2fTFf.js";import"./useTranslation-B0aFKVf4.js";import"./IconButton-Dz9wNTU3.js";import"./ButtonBase-Cnwcv5GA.js";import"./useTimeout-BmEZpCe4.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-D0uALyuI.js";import"./useControlled-DIUbfn-I.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-Bt9BiSWd.js";import"./useSlotProps-Cxvhz16f.js";import"./Popover-vp-GT07x.js";import"./useSlot-CkBv-IPs.js";import"./Paper-41EDSQ54.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-QHg1hDnY.js";import"./utils-CVRt_Cq7.js";import"./Fade-lq3QnGpm.js";import"./Alert-BZ88F-Mm.js";import"./Tab-BJulLvYH.js";import"./Button-CXJaqWDa.js";import"./axis-x-Dya_mW11.js";import"./rotation-Ci9pzYUm.js";import"./JoggingCartesianAxisControl-DwyG8gky.js";import"./Select-3vKi6oH-.js";import"./listItemTextClasses-huiFMGkD.js";import"./MenuItem-BtxC0kLW.js";import"./dividerClasses-C26v3zUq.js";import"./ToggleButton-CL13rEgN.js";import"./Box-NcKT6gJS.js";import"./VelocitySlider-Cu4ZBw_9.js";import"./Divider-DuF8PaHf.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
