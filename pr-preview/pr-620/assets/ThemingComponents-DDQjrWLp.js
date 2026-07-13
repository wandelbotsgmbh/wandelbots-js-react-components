import{j as e,M as s,e as r,C as i}from"./iframe-UN6SZsDe.js";import{useMDXComponents as n}from"./index-BjbgaVdw.js";import{D as a}from"./JoggingPanel.stories-o79Y72Pa.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-D8Jr4Raz.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-DyJ4N3Ks.js";import"./useTheme-BcX997CB.js";import"./useLocalObservable-D_pS-fJ1.js";import"./Stack-3IiJYbZm.js";import"./Typography-CbUUG6x_.js";import"./styled-DWPpRRwv.js";import"./useThemeProps-DFEYNd3B.js";import"./getThemeProps-B_2AGQIW.js";import"./createSvgIcon-DOUQyvGn.js";import"./SvgIcon-B0FOsNWU.js";import"./getValidReactChildren-BzifcJXs.js";import"./index-Ce0B6ND2.js";import"./converters-DnG1fX23-B6Bap9Ks.js";import"./externalizeComponent-DZVhLn8I.js";import"./context-CsZ5hyZA.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-Ep7x5lkE.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Z_zS1WAN.js";import"./hooks-D_S2XAmB.js";import"./useTranslation-DWUoBrfW.js";import"./IconButton-CfPhcHUR.js";import"./ButtonBase-DnAFYhKx.js";import"./useTimeout-DucQs_lc.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-B63U-pQb.js";import"./useControlled-_mvUrjQK.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BVqHAaG2.js";import"./useSlotProps-B0HYtjlB.js";import"./Popover-CEKE2yR6.js";import"./useSlot-q27aiQvc.js";import"./Paper-D7Ofju7_.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DwtGFU5E.js";import"./utils-ClfalBhg.js";import"./Fade--Jp-B6Op.js";import"./Alert-DTkqCKvy.js";import"./Tab-CunAJQYh.js";import"./Button-C-x130x5.js";import"./axis-x-gZmL3p79.js";import"./rotation-DI5UdBqv.js";import"./JoggingCartesianAxisControl-DzoDjgqS.js";import"./Box-CofZUwOL.js";import"./Select-C_aqsuqG.js";import"./listItemTextClasses-wXz3-LeL.js";import"./MenuItem-D0zQjYJZ.js";import"./dividerClasses-ur6LSIYT.js";import"./ToggleButton-CjLofquO.js";import"./VelocitySlider-BcAONv3a.js";import"./Divider-hiK6Ftpd.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
`,e.jsx(i,{of:p,sourceState:"none"})]})}function Te(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{Te as default};
