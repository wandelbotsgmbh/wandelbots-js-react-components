import{j as e,M as p,e as i,C as r}from"./iframe-Dioa7UMG.js";import{useMDXComponents as n}from"./index-B2i1Lj_E.js";import{D as a}from"./JoggingPanel.stories-Byvg1Q4B.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-C0YYHgxt.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-BQktJo--.js";import"./useTheme-BIwUcHuI.js";import"./useLocalObservable-BeiGwx17.js";import"./Stack-CNgnP__l.js";import"./Typography-Ct8eltDp.js";import"./styled-DYg-3ueW.js";import"./useThemeProps-BBz7e_HX.js";import"./getThemeProps-BQMZ-h3r.js";import"./createSvgIcon-CUohqrN-.js";import"./SvgIcon-BreQU8Nv.js";import"./getValidReactChildren-DSTwJSHx.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BHp_e4nK.js";import"./context-pjyp2Uec.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-C7et44Ll.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DEqEahwM.js";import"./hooks-BF1JOmkM.js";import"./useTranslation-j-QzATLc.js";import"./IconButton-CMuU0xcf.js";import"./ButtonBase-CNL7BMjL.js";import"./useTimeout-CqZh_w3x.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BS8v10LE.js";import"./useControlled-BMaQ2mr9.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-C-04uEyJ.js";import"./useSlotProps-DaNhISQS.js";import"./Popover-DirfpScr.js";import"./useSlot-ByoEJRxC.js";import"./Paper-CYh5dMRB.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CiRqKTff.js";import"./utils-_QLH5w0x.js";import"./Fade-B52xdSA2.js";import"./Alert-B5EC8YG4.js";import"./Tab-BqNkjygN.js";import"./Button-D6mtfsPx.js";import"./axis-x-BUEiFUJT.js";import"./rotation-C9cfK9au.js";import"./JoggingCartesianAxisControl-D_oKw0g-.js";import"./Select-BohklmyS.js";import"./listItemTextClasses-xfpx5bLS.js";import"./MenuItem-DSsgtAoU.js";import"./dividerClasses--z_TqbR-.js";import"./Box-DwFKJR9J.js";import"./ToggleButton-D2IxM5j0.js";import"./VelocitySlider-Dut9cvZi.js";import"./Divider-CZDJs5OI.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
