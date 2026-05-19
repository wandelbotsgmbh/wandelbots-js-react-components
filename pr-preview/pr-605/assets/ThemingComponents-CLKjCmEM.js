import{j as e,M as p,e as i,C as r}from"./iframe-CTxk-WG5.js";import{useMDXComponents as n}from"./index-CiXeMU1Z.js";import{D as a}from"./JoggingPanel.stories-CF6RN9TW.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-CFZqKVB8.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-DrhRV4CC.js";import"./useTheme-uNgZ5rSk.js";import"./useLocalObservable-BueZlc_Y.js";import"./Stack-DMkgzM7h.js";import"./Typography-D7U38wgt.js";import"./styled-BXhB8UfT.js";import"./useThemeProps-CnOyfyqf.js";import"./getThemeProps-D__LrrEE.js";import"./createSvgIcon-C5cieW-Q.js";import"./SvgIcon-YB7XXZAS.js";import"./getValidReactChildren-CN7BlxMp.js";import"./index-Bcq_XY8v.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-DzUJkyzq.js";import"./context-D4wq1lx5.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DfkOzqTR.js";import"./converters-bkii-Zhi.js";import"./CircularProgress-DcxTpbLI.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Ce45p0s8.js";import"./hooks-D1ZKU8r2.js";import"./useTranslation-Dls_AG3I.js";import"./IconButton-BoXwPw-i.js";import"./ButtonBase-C6L9aqng.js";import"./useTimeout-M8QMixjI.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CvKIltff.js";import"./useControlled-Bwd4Fq7p.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DaW-L06I.js";import"./useSlotProps-CXTVyFf0.js";import"./Popover-Dy6OpLmZ.js";import"./useSlot-Bz0JUU0E.js";import"./Paper-5A5AlCet.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BFYsNWYi.js";import"./utils-CC1mZwJN.js";import"./Fade-DZbcQhVK.js";import"./Alert-CD70w14T.js";import"./Tab-CC-Mn_Y7.js";import"./Button-DU_4Gik4.js";import"./axis-x-DXExn9mx.js";import"./rotation-BiLVOJHb.js";import"./JoggingCartesianAxisControl-ZtoUF3y7.js";import"./Select-BtJ6PskJ.js";import"./listItemTextClasses-pIhZ9i1M.js";import"./MenuItem-C7TVhtb_.js";import"./dividerClasses-DP8Up6ZH.js";import"./Box-AokjAw6D.js";import"./ToggleButton-BtLQMNs9.js";import"./VelocitySlider-D3Jg083I.js";import"./Divider-DBu6uA6f.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
