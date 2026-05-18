import{i as e}from"./preload-helper-Cs4UwXAW.js";import{Ga as t,d as n,l as r,n as i,o as a,s as o}from"./iframe-BvHxi_cZ.js";import{t as s}from"./mdx-react-shim-X3p0ODal.js";import{muiComponents as c,t as l}from"./defaultTheme.stories-BuhBROkt.js";function u(e){let t={a:`a`,code:`code`,h1:`h1`,p:`p`,...n(),...e.components};return(0,f.jsxs)(f.Fragment,{children:[`
`,`
`,`
`,(0,f.jsx)(a,{title:`Theming/Wandelbots MUI Theme`}),`
`,(0,f.jsx)(t.h1,{id:`wandelbots-mui-theme`,children:`Wandelbots MUI Theme`}),`
`,(0,f.jsxs)(t.p,{children:[`The component library comes with a Wandelbots theme for Material UI which is the default theme used in this storybook.
If you like, you can use it in your own app to give the components a similar look.
The theme is accessed by calling `,(0,f.jsx)(t.code,{children:`createNovaMuiTheme`}),`, and can be `,(0,f.jsx)(t.a,{href:`?path=/docs/theming-theming-components--docs`,children:`customized`}),` as needed.`]}),`
`,(0,f.jsxs)(t.p,{children:[`The theme comes in dark and light variants using the standard MUI `,(0,f.jsxs)(t.a,{href:`https://mui.com/material-ui/customization/dark-mode/`,rel:`nofollow`,children:[(0,f.jsx)(t.code,{children:`palette.mode`}),` option`]}),`.`]}),`
`,(0,f.jsx)(o,{dark:!0,code:`
import { ThemeProvider } from "@mui/material"
import { createNovaMuiTheme } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaMuiTheme()

<ThemeProvider theme={theme}>
...
</ThemeProvider>
`}),`
`,(0,f.jsx)(i,{of:c,sourceState:`none`})]})}function d(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(u,{...e})}):u(e)}var f;e((()=>{f=t(),s(),r(),l()}))();export{d as default};