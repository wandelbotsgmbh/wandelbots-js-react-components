import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-CgmNMXcz.js";import{Ma as n,l as r,n as i,o as a,s as o}from"./iframe-C06mTC8J.js";import{t as s}from"./mdx-react-shim-DuT2vvxG.js";import{Default as c,n as l}from"./JoggingPanel.stories-BLCGpi_j.js";import{JoggingStoryExtendedTheme as u,JoggingStoryReplacedTheme as d,t as f}from"./theming.stories-B13V6Ho2.js";function p(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(a,{title:`Theming/Theming components`}),`
`,(0,h.jsx)(n.h1,{id:`theming-components`,children:`Theming components`}),`
`,(0,h.jsxs)(n.p,{children:[`The UI components presented in this library will respect the `,(0,h.jsx)(n.a,{href:`https://mui.com/material-ui/customization/theming/`,rel:`nofollow`,children:`Material UI theme`}),` of
the application they are rendered within, allowing customization with the MUI theming system.`]}),`
`,(0,h.jsx)(n.h2,{id:`using-the-wandelbots-mui-theme`,children:`Using the Wandelbots MUI theme`}),`
`,(0,h.jsxs)(n.p,{children:[`To make the components look exactly like they do in the storybook, pass the Wandelbots MUI theme to `,(0,h.jsx)(n.code,{children:`ThemeProvider`}),`.`]}),`
`,(0,h.jsx)(o,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaMuiTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaMuiTheme()

<ThemeProvider theme={theme}>
<JoggingPanel ... />
</ThemeProvider>
`}),`
`,(0,h.jsx)(i,{of:c,sourceState:`none`}),`
`,(0,h.jsx)(n.h2,{id:`extending-the-default-theme`,children:`Extending the default theme`}),`
`,(0,h.jsxs)(n.p,{children:[`You can also use the Wandelbots theme as a base and extend it with your own customizations, or even merge it
with another theme using MUI `,(0,h.jsx)(n.a,{href:`https://mui.com/material-ui/customization/theming/#api`,rel:`nofollow`,children:`theme composition`}),`.`]}),`
`,(0,h.jsx)(o,{dark:!0,code:`
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
`,(0,h.jsx)(i,{of:u,sourceState:`none`}),`
`,(0,h.jsx)(n.h2,{id:`use-your-own-theme`,children:`Use your own theme`}),`
`,(0,h.jsx)(n.p,{children:`You could instead use an entirely different MUI theme and style the components as you like.`}),`
`,(0,h.jsx)(o,{dark:!0,code:`
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
`,(0,h.jsx)(i,{of:d,sourceState:`none`})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;e((()=>{h=n(),s(),r(),l(),f()}))();export{m as default};