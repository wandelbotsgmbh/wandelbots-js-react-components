import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-D_7OwatM.js";import{Ma as n}from"./iframe-DpqMHKse.js";import{t as r}from"./mdx-react-shim-KhjDAwK7.js";function i(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:`getting-started`,children:`Getting Started`}),`
`,(0,o.jsxs)(n.p,{children:[`A growing collection of ready-made React UI components based on MaterialUI and React Three Fiber for use with the `,(0,o.jsx)(n.a,{href:`https://www.wandelbots.com/`,rel:`nofollow`,children:`Wandelbots Nova platform`}),`.`]}),`
`,(0,o.jsx)(n.p,{children:`Provides robot control interfaces, 3D visualizations, and automation components that integrate with the Nova ecosystem.`}),`
`,(0,o.jsx)(n.h2,{id:`install`,children:`Install`}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-bash`,children:`pnpm add @wandelbots/wandelbots-js-react-components react react-dom @mui/material @emotion/react @emotion/styled
`})}),`
`,(0,o.jsx)(n.h2,{id:`modular-imports`,children:`Modular Imports`}),`
`,(0,o.jsxs)(n.p,{children:[`Some modules require additional peer dependencies, such as Three.js for 3D rendering. If you don't need 3D rendering in your application, import from `,(0,o.jsx)(n.code,{children:`/core`}),` to avoid these dependencies:`]}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-typescript`,children:`import {
  SafetyBar,
  JoggingPanel,
  DataGrid,
  Timer,
} from "@wandelbots/wandelbots-js-react-components/core"
`})}),`
`,(0,o.jsxs)(n.p,{children:[`For 3D-enabled components, use `,(0,o.jsx)(n.code,{children:`/3d`}),`:`]}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-typescript`,children:`import { Robot, RobotCard } from "@wandelbots/wandelbots-js-react-components/3d"
`})}),`
`,(0,o.jsxs)(n.p,{children:[`For SVG icon components (general UI icons and safety bar icons), use `,(0,o.jsx)(n.code,{children:`/wb-icons`}),`:`]}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-typescript`,children:`import {
  RobotIcon,
  HomeIcon,
  ControllerTypeVirtualIcon,
  SafetyStateNormalIcon,
} from "@wandelbots/wandelbots-js-react-components/wb-icons"
`})}),`
`,(0,o.jsx)(n.p,{children:`You can also import everything from the main entry point, but you'll need to install all optional peer dependencies:`}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-bash`,children:`pnpm add @wandelbots/wandelbots-js-react-components \\
  react react-dom \\
  @mui/material @mui/icons-material @emotion/react @emotion/styled \\
  three @react-three/fiber @react-three/drei three-stdlib
`})}),`
`,(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:`Available Entry Points:`})}),`
`,(0,o.jsxs)(n.ul,{children:[`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:`.`})}),` (Main) — All components. Requires: React 18+, MUI v6/v7, @emotion/react, @emotion/styled, @mui/icons-material + all below.`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:`/core`})}),` — Base components (AppHeader, ProgramControl, SafetyBar, VelocitySlider, JoggingPanel, DataGrid, Timer, themes, i18n, etc.). Requires: React 18+, MUI v6/v7, @emotion/react, @emotion/styled, @mui/icons-material.`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:`/wb-icons`})}),` — SVG icon components (general UI icons, safety bar icons, jogging icons, axis icons). Requires: React 18+.`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:`/3d`})}),` — 3D visualization (Robot, RobotCard, CollisionSceneRenderer, SafetyZonesRenderer, TrajectoryRenderer). Requires: all from `,(0,o.jsx)(n.code,{children:`/core`}),` + three, @react-three/fiber, @react-three/drei, three-stdlib.`]}),`
`]}),`
`,(0,o.jsx)(n.h2,{id:`components-usage`,children:`Components Usage`}),`
`,(0,o.jsxs)(n.p,{children:[`See the individual `,(0,o.jsx)(n.a,{href:`https://wandelbotsgmbh.github.io/wandelbots-js-react-components`,rel:`nofollow`,children:`Storybook`}),` pages for implementation details of each component.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(i,{...e})}):i(e)}var o;e((()=>{o=n(),r()}))();export{a as default};