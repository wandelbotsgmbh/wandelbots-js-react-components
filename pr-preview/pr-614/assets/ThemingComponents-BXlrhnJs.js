import{j as e,M as a,e as i,C as r}from"./iframe-BtF3oR4V.js";import{useMDXComponents as n}from"./index-DVC8T9zb.js";import{D as p}from"./JoggingPanel.stories-Dm8UujR9.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-RksppbVy.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-BzJsDDoA.js";import"./useTheme-3noL50R_.js";import"./useLocalObservable-CXFKAV2b.js";import"./Stack-C15rN9Ic.js";import"./Typography-aacKlFId.js";import"./styled-Bh4zLGD3.js";import"./useThemeProps-CkrD-jWf.js";import"./getThemeProps-CuBATgfS.js";import"./createSvgIcon-mxSchYmh.js";import"./SvgIcon-DDQQRVaT.js";import"./getValidReactChildren-BsBfMWe5.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-DreBknOy.js";import"./context-Cg2IIDQ2.js";import"./novaCompat-CLCJAe3b.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DcsoScJS.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BS0hkWh0.js";import"./hooks--zQRw9YT.js";import"./useTranslation-4iP6verG.js";import"./IconButton-DadaKapX.js";import"./ButtonBase-BljvDUcf.js";import"./useTimeout-iXNn04rO.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-scAd4cqa.js";import"./useControlled-DIVtUnm1.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DFRSXzHZ.js";import"./useSlotProps-1RH-0CF5.js";import"./Popover-C4VynSWT.js";import"./useSlot-CTTe-nk3.js";import"./Paper-DcSffA1y.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-IBGt74iG.js";import"./utils-DmIAFWaR.js";import"./Fade-CpfeWuN6.js";import"./Alert-Yyui75lq.js";import"./Tab-Dpy75n5N.js";import"./Button-diERvsNP.js";import"./axis-x-CbjO81OG.js";import"./rotation-CgA6IAxD.js";import"./JoggingCartesianAxisControl-CZZyx7jo.js";import"./Box-BVBGV5E8.js";import"./Select-CTiSj-Ru.js";import"./listItemTextClasses-DXr6VMNs.js";import"./MenuItem-CfndPCx1.js";import"./dividerClasses-1b-VmslD.js";import"./ToggleButton-BPSnt3YU.js";import"./VelocitySlider-dmezwEmM.js";import"./Divider-i4ep7jD4.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
