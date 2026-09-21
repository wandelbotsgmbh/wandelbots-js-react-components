import{j as e,M as s,e as r,C as i}from"./iframe-BmabLFoJ.js";import{useMDXComponents as n}from"./index-BVs1_B6a.js";import{D as a}from"./JoggingPanel.stories-ZUffvCvj.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-CfWIzKK6.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index--7XmkOnx.js";import"./useTheme-DTr1WInn.js";import"./useLocalObservable-DbsE0SqW.js";import"./Stack-CTeuISsq.js";import"./Typography-CSMK2NSJ.js";import"./styled-BEP2lxQD.js";import"./useThemeProps-B-oZEUpN.js";import"./getThemeProps-BVr5wI7P.js";import"./createSvgIcon-CmmMGDz7.js";import"./SvgIcon-rdheAufg.js";import"./getValidReactChildren-CA9U0SWu.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-BWG8HseK.js";import"./context-CsJ6UPxf.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-gCfHjSDj.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-C78rFZTj.js";import"./hooks-LNdhnvrL.js";import"./useTranslation-BJ30RZoK.js";import"./IconButton-Dc4U-QYn.js";import"./ButtonBase-DcqZYvDQ.js";import"./useTimeout-CuY3ze4H.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DWw2ReJZ.js";import"./useControlled-OHHfRx73.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-Beqhzo2w.js";import"./useSlotProps-ChOD6QnK.js";import"./Popover-DFLlo-KE.js";import"./useSlot-Bhvq17TF.js";import"./Paper-wwUPGpqm.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BnAELXhD.js";import"./utils--FXLeKRP.js";import"./Fade-dqs2x2Vk.js";import"./Alert-BuntzgB4.js";import"./Tab-DDIqYhxI.js";import"./Button--dbltRVR.js";import"./axis-x-B1UJ-2KI.js";import"./Box-IKoY0UTk.js";import"./Select-CyQk1zu2.js";import"./listItemTextClasses-ClA-CC6u.js";import"./MenuItem-rlLbQywS.js";import"./dividerClasses-yDeCFpqD.js";import"./ToggleButton-DyuqWbMU.js";import"./VelocitySlider-ruh2KVpK.js";import"./Divider-lPIF0fos.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
`,e.jsx(t.h1,{id:"theming-components",children:"Theming components"}),`
`,e.jsxs(t.p,{children:["The UI components presented in this library will respect the ",e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/",rel:"nofollow",children:"Material UI theme"}),` of
the application they are rendered within, allowing customization with the MUI theming system.`]}),`
`,e.jsx(t.h2,{id:"using-the-wandelbots-mui-theme",children:"Using the Wandelbots MUI theme"}),`
`,e.jsxs(t.p,{children:["To make the components look exactly like they do in the storybook, pass the Wandelbots MUI theme to ",e.jsx(t.code,{children:"ThemeProvider"}),"."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Migration note:"})," ",e.jsx(t.code,{children:"createNovaMuiTheme"})," has been renamed to ",e.jsx(t.code,{children:"createNovaTheme"}),`.
The old export still works but is deprecated and will be removed in the next major release.
`,e.jsx(t.code,{children:"createNovaTheme"})," also accepts multiple ",e.jsx(t.code,{children:"ThemeOptions"})," arguments (variadic) for easier composition."]}),`
`]}),`
`,e.jsx(r,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaTheme()

<ThemeProvider theme={theme}>
<JoggingPanel ... />
</ThemeProvider>
`}),`
`,e.jsx(i,{of:a,sourceState:"none"}),`
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
`,e.jsx(i,{of:h,sourceState:"none"}),`
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
`,e.jsx(i,{of:p,sourceState:"none"})]})}function fe(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{fe as default};
