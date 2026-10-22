import{j as e,M as s,e as r,C as i}from"./iframe-wm_LgJCB.js";import{useMDXComponents as n}from"./index-xZdLz2hE.js";import{D as a}from"./JoggingPanel.stories--a3e6vsr.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-D6mehTk4.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-DrrPvCA5.js";import"./useTheme-CccEYAFl.js";import"./useLocalObservable-96-zgvPG.js";import"./Stack-DrHdrlKP.js";import"./Typography-BdkCM2eG.js";import"./styled-Ds1Mq2kk.js";import"./useThemeProps-isdZ54p3.js";import"./getThemeProps-Daz5eId2.js";import"./createSvgIcon-C09MlxR4.js";import"./SvgIcon-BiDcfQnJ.js";import"./getValidReactChildren-CXUWVWu0.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-B4Hh_XYu.js";import"./context-y2pfIxPJ.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-BAegOCT4.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-yTpm0Kln.js";import"./hooks-BJKuNEHi.js";import"./useTranslation-CAsTYeNx.js";import"./IconButton-DvMfvabp.js";import"./ButtonBase-DkcDhg9A.js";import"./useTimeout-BJ85yZBS.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-ciz8SjWb.js";import"./useControlled-CBYrwl3N.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BTL6ucIg.js";import"./useSlotProps-BXzNNAgu.js";import"./Popover-D9X-rZAx.js";import"./useSlot-BJBkmAqy.js";import"./Paper-ecsif8x5.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-C_MkV8gT.js";import"./utils-BaZYAeRw.js";import"./Fade-z4txmJ6c.js";import"./Alert-D7V9DysS.js";import"./Tab-B0mwj5EF.js";import"./Button-G99aJeEW.js";import"./axis-x-kTRFSypm.js";import"./Box-DbZI7o_k.js";import"./Select-CECL54yh.js";import"./listItemTextClasses-BU9Hmwlk.js";import"./MenuItem-Belq4sii.js";import"./dividerClasses-C8IFVPsa.js";import"./ToggleButton-BvbX1A0_.js";import"./VelocitySlider-CmlSo9Uc.js";import"./Divider-d_YEKn1K.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
