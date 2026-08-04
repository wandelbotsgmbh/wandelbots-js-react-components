import{j as e,M as s,e as r,C as i}from"./iframe-DFWCUJcd.js";import{useMDXComponents as m}from"./index-1kiNoD-e.js";import{D as a}from"./JoggingPanel.stories-ADcJeeL0.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-CZt27E8l.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-CgQ1NEk8.js";import"./useTheme-CdVIIIG6.js";import"./useLocalObservable-CiBaClub.js";import"./Stack-DoMdcR_-.js";import"./Typography-xMaF04LY.js";import"./styled-D84wahn-.js";import"./useThemeProps-DpkurgqQ.js";import"./getThemeProps-BfBsJRdR.js";import"./createSvgIcon-DucIEf_0.js";import"./SvgIcon-HYGMVELO.js";import"./getValidReactChildren-i-Vq7Y0g.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./externalizeComponent-8f2r-bRG.js";import"./context-BfG9PRjJ.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-CgEobnjZ.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CWIWc9nS.js";import"./hooks-W3sWvS3D.js";import"./useTranslation-CmQ1uLHC.js";import"./IconButton-Dv_Gvuz2.js";import"./ButtonBase-Dc0s3ira.js";import"./useTimeout-DIY2PhHu.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-X23LDm0D.js";import"./useControlled-DEQGWRu4.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BpmpDS2t.js";import"./useSlotProps-BIV7YvIn.js";import"./Popover-UXJoqKAA.js";import"./useSlot-BU3PbBv_.js";import"./Paper-Duse9F_y.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Bg3TgbMM.js";import"./utils-CeciMygM.js";import"./Fade-DFUTRu3C.js";import"./Alert-CyIgxSee.js";import"./Tab-0GfqqNr8.js";import"./Button-CdM6PYK0.js";import"./axis-x-C84Qq5E2.js";import"./Box-ReRLTk2a.js";import"./Select-BhXA_s1Y.js";import"./listItemTextClasses-dGL-3ynv.js";import"./MenuItem-Csk6wBE3.js";import"./dividerClasses-C7ojMzBq.js";import"./ToggleButton-DqkiDJUS.js";import"./VelocitySlider-Dpv9YRyZ.js";import"./Divider-BrvISn0v.js";function n(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...m(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
`,e.jsx(i,{of:p,sourceState:"none"})]})}function je(o={}){const{wrapper:t}={...m(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{je as default};
