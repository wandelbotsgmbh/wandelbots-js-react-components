import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-Xf3tZYL7.js";import{Ma as n,l as r,n as i,o as a,s as o}from"./iframe-XS2jLBOb.js";import{t as s}from"./mdx-react-shim-BYZh-Naj.js";import{muiComponents as c,t as l}from"./defaultTheme.stories-CY1b2_un.js";function u(e){let n={a:`a`,code:`code`,h1:`h1`,p:`p`,...t(),...e.components};return(0,f.jsxs)(f.Fragment,{children:[`
`,`
`,`
`,(0,f.jsx)(a,{title:`Theming/Wandelbots MUI Theme`}),`
`,(0,f.jsx)(n.h1,{id:`wandelbots-mui-theme`,children:`Wandelbots MUI Theme`}),`
`,(0,f.jsxs)(n.p,{children:[`The component library comes with a Wandelbots theme for Material UI which is the default theme used in this storybook.
If you like, you can use it in your own app to give the components a similar look.
The theme is accessed by calling `,(0,f.jsx)(n.code,{children:`createNovaMuiTheme`}),`, and can be `,(0,f.jsx)(n.a,{href:`?path=/docs/theming-theming-components--docs`,children:`customized`}),` as needed.`]}),`
`,(0,f.jsxs)(n.p,{children:[`The theme comes in dark and light variants using the standard MUI `,(0,f.jsxs)(n.a,{href:`https://mui.com/material-ui/customization/dark-mode/`,rel:`nofollow`,children:[(0,f.jsx)(n.code,{children:`palette.mode`}),` option`]}),`.`]}),`
`,(0,f.jsx)(o,{dark:!0,code:`
import { ThemeProvider } from "@mui/material"
import { createNovaMuiTheme } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaMuiTheme()

<ThemeProvider theme={theme}>
...
</ThemeProvider>
`}),`
`,(0,f.jsx)(i,{of:c,sourceState:`none`})]})}function d(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,f.jsx)(n,{...e,children:(0,f.jsx)(u,{...e})}):u(e)}var f;e((()=>{f=n(),s(),r(),l()}))();export{d as default};