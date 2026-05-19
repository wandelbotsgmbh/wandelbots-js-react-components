import{j as e,M as p,e as i,C as r}from"./iframe-BTBeAsGn.js";import{useMDXComponents as n}from"./index-CJg0040u.js";import{D as a}from"./JoggingPanel.stories-DlLIErit.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-mSZPMAJN.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-CIyY9eg3.js";import"./useTheme-Bcw-BlOg.js";import"./useLocalObservable-DQN8SAu1.js";import"./Stack-C2dxL4Xl.js";import"./Typography-BQZQt3va.js";import"./styled-BdLycTVy.js";import"./useThemeProps-CFuQLnvW.js";import"./getThemeProps-Y_cGgDsp.js";import"./createSvgIcon-DRN8_Qu_.js";import"./SvgIcon-zdK7aDKR.js";import"./getValidReactChildren-C6Oh0s6v.js";import"./index-Bcq_XY8v.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-CPc1pQiz.js";import"./context-DSAlxZkO.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DfkOzqTR.js";import"./converters-bkii-Zhi.js";import"./CircularProgress-ZGbW9JZL.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BrioQF_x.js";import"./hooks-VbFL8pmM.js";import"./useTranslation-wJVWXi9P.js";import"./IconButton-D-GzSN6H.js";import"./ButtonBase-D4kGo-p3.js";import"./useTimeout-B7U5osWj.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-XNhV3OQQ.js";import"./useControlled-9K7FkiU1.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-_774ZHLG.js";import"./useSlotProps-CziHO3GH.js";import"./Popover-CvqlVAYR.js";import"./useSlot-CVqA8j2k.js";import"./Paper-D5GN9JLL.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-0oFzKt9q.js";import"./utils-S-grsyyM.js";import"./Fade-B9uYpnvg.js";import"./Alert-DYG7by7f.js";import"./Tab-Cp6NNAIc.js";import"./Button-B1DmizTi.js";import"./axis-x-CIk9DemX.js";import"./rotation-jhPeGULq.js";import"./JoggingCartesianAxisControl-C-aoKcuB.js";import"./Select-CJhsoa8P.js";import"./listItemTextClasses-BTaVUXPn.js";import"./MenuItem-DE7QnUJM.js";import"./dividerClasses-BffnPp4h.js";import"./Box-O-7_eFcf.js";import"./ToggleButton-wjyaASzm.js";import"./VelocitySlider-CFDSLQAx.js";import"./Divider-_VLap_Zi.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
