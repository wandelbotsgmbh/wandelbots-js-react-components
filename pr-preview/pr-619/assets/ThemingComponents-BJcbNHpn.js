import{j as e,M as a,e as r,C as i}from"./iframe-ClPjLESK.js";import{useMDXComponents as n}from"./index-ChWOXs0v.js";import{D as p}from"./JoggingPanel.stories-CDClPT-U.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BmtFKBXi.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-C8O1-mV9.js";import"./useTheme-CJQCZWfl.js";import"./useLocalObservable-Bfjyt09g.js";import"./Stack-MmW22r8z.js";import"./Typography-JNlZg_gZ.js";import"./styled-Do_FGgcP.js";import"./useThemeProps-BdwZvIA3.js";import"./getThemeProps-adN2yLWB.js";import"./createSvgIcon-CjZKo-in.js";import"./SvgIcon-BBehSt2Y.js";import"./getValidReactChildren-D_iot0YP.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-7iC9ztzr.js";import"./context-DyGSmiAH.js";import"./three.module-BfWIdBXu.js";import"./rotationVector-DKUTJqRd.js";import"./novaCompat-DBu8Nre9.js";import"./errorHandling-COKL7wto.js";import"./converters-CFNBtQGJ.js";import"./CircularProgress-CuuZW_ne.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BZKAO_qO.js";import"./hooks-BH8nzxmo.js";import"./useTranslation-B_-uwCSv.js";import"./IconButton-ekWQfTZp.js";import"./ButtonBase-DN92I9VY.js";import"./useTimeout-RZrI-pdh.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CJPkKyoN.js";import"./useControlled-C1lmEePH.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-B8wbtBlc.js";import"./useSlotProps-DIBWfLgH.js";import"./Popover-BWqOOyUp.js";import"./useSlot-GSbmP1AL.js";import"./Paper-CCZfD0xK.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CGIAgBF9.js";import"./utils-DY5U5uS8.js";import"./Fade-DVw_YgbL.js";import"./Alert-BSYriPP7.js";import"./Tab-Be_ymnbs.js";import"./Button-C-w9gvNa.js";import"./axis-x-DtvPmNai.js";import"./rotation-IVyuhtm3.js";import"./JoggingCartesianAxisControl-D8kcV5L6.js";import"./Box-CqOMTEFa.js";import"./Select-Cb7hW27q.js";import"./listItemTextClasses-Cjn9P2Pd.js";import"./MenuItem-VgtzrJvE.js";import"./dividerClasses-CWk0QRyV.js";import"./ToggleButton-bDXL5TqB.js";import"./VelocitySlider-DghRrYKm.js";import"./Divider-XYa3Mh1D.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
`,e.jsx(t.h1,{id:"theming-components",children:"Theming components"}),`
`,e.jsxs(t.p,{children:["The UI components presented in this library will respect the ",e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/",rel:"nofollow",children:"Material UI theme"}),` of
the application they are rendered within, allowing customization with the MUI theming system.`]}),`
`,e.jsx(t.h2,{id:"using-the-wandelbots-mui-theme",children:"Using the Wandelbots MUI theme"}),`
`,e.jsxs(t.p,{children:["To make the components look exactly like they do in the storybook, pass the Wandelbots MUI theme to ",e.jsx(t.code,{children:"ThemeProvider"}),"."]}),`
`,e.jsx(r,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaTheme()

<ThemeProvider theme={theme}>
<JoggingPanel ... />
</ThemeProvider>
`}),`
`,e.jsx(i,{of:p,sourceState:"none"}),`
`,e.jsx(t.h2,{id:"extending-the-default-theme",children:"Extending the default theme"}),`
`,e.jsxs(t.p,{children:[`You can also use the Wandelbots theme as a base and extend it with your own customizations, or even merge it
with another theme using MUI `,e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/#api",rel:"nofollow",children:"theme composition"}),"."]}),`
`,e.jsx(r,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaTheme({
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
`,e.jsx(i,{of:s,sourceState:"none"}),`
`,e.jsx(t.h2,{id:"use-your-own-theme",children:"Use your own theme"}),`
`,e.jsx(t.p,{children:"You could instead use an entirely different MUI theme and style the components as you like."}),`
`,e.jsx(r,{dark:!0,code:`
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
`,e.jsx(i,{of:h,sourceState:"none"})]})}function Te(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{Te as default};
