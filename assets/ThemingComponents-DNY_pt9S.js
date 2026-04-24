import{j as e,M as p,e as i,C as r}from"./iframe-BngTVNlE.js";import{useMDXComponents as n}from"./index-DcLy2HV2.js";import{D as a}from"./JoggingPanel.stories-DdOGNWgl.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-Cj7yU5uq.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-DsHegz_C.js";import"./useTheme-dfKSq2Su.js";import"./useLocalObservable-DzB1V6w5.js";import"./Stack-BhWwXw0z.js";import"./Typography-BBZ9ZGdq.js";import"./styled-D8pj8Y4K.js";import"./useThemeProps-BFQAGp_D.js";import"./getThemeProps-ChOnUwF0.js";import"./createSvgIcon-B2iHT_wq.js";import"./SvgIcon-DGn-kC6U.js";import"./getValidReactChildren-CUz4ioTo.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BWAQrjoK.js";import"./context-p6WrlAch.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-Q8c3WL36.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-G0Jsmq2o.js";import"./hooks-CLUD7mbi.js";import"./useTranslation-DfOUERnE.js";import"./IconButton-BJlTJPq7.js";import"./ButtonBase-DHoB_RJy.js";import"./useTimeout-BAdU5pP-.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CWCCBvKq.js";import"./useControlled-CzI241gx.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DQX4evuT.js";import"./useSlotProps-BtIx0Hbn.js";import"./Popover-DywppzR0.js";import"./useSlot-D1cnroQD.js";import"./Paper-5Zoc-9xP.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BV3Pe61p.js";import"./utils-De7wtTOM.js";import"./Fade-BrbKBgZA.js";import"./Alert-4PMQY43u.js";import"./Tab-BQ8isWIW.js";import"./Button-93TGJvjn.js";import"./axis-x-DCZp_lML.js";import"./rotation-CRMgA11D.js";import"./JoggingCartesianAxisControl-D1cEhtOx.js";import"./Select-CxawLc-3.js";import"./listItemTextClasses-C7E-_PbG.js";import"./MenuItem-BB-JoX19.js";import"./dividerClasses-DhTq4M-8.js";import"./Box-xHKMts_2.js";import"./ToggleButton-QNbbxruV.js";import"./VelocitySlider-ByB7XT9v.js";import"./Divider-Tp_qdGsQ.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
