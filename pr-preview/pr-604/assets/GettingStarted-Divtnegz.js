import{i as e}from"./preload-helper-Cs4UwXAW.js";import{Ga as t,d as n}from"./iframe-BvHxi_cZ.js";import{t as r}from"./mdx-react-shim-X3p0ODal.js";function i(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{id:`getting-started`,children:`Getting Started`}),`
`,(0,o.jsxs)(t.p,{children:[`A growing collection of ready-made React UI components based on MaterialUI and React Three Fiber for use with the `,(0,o.jsx)(t.a,{href:`https://www.wandelbots.com/`,rel:`nofollow`,children:`Wandelbots Nova platform`}),`.`]}),`
`,(0,o.jsx)(t.p,{children:`Provides robot control interfaces, 3D visualizations, and automation components that integrate with the Nova ecosystem.`}),`
`,(0,o.jsx)(t.h2,{id:`install`,children:`Install`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-bash`,children:`pnpm add @wandelbots/wandelbots-js-react-components react react-dom @mui/material @emotion/react @emotion/styled
`})}),`
`,(0,o.jsx)(t.h2,{id:`modular-imports`,children:`Modular Imports`}),`
`,(0,o.jsxs)(t.p,{children:[`Some modules require additional peer dependencies, such as Three.js for 3D rendering. If you don't need 3D rendering in your application, import from `,(0,o.jsx)(t.code,{children:`/core`}),` to avoid these dependencies:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-typescript`,children:`import {
  SafetyBar,
  JoggingPanel,
  DataGrid,
  Timer,
} from "@wandelbots/wandelbots-js-react-components/core"
`})}),`
`,(0,o.jsxs)(t.p,{children:[`For 3D-enabled components, use `,(0,o.jsx)(t.code,{children:`/3d`}),`:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-typescript`,children:`import { Robot, RobotCard } from "@wandelbots/wandelbots-js-react-components/3d"
`})}),`
`,(0,o.jsxs)(t.p,{children:[`For SVG icon components (general UI icons and safety bar icons), use `,(0,o.jsx)(t.code,{children:`/wb-icons`}),`:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-typescript`,children:`import {
  RobotIcon,
  HomeIcon,
  ControllerTypeVirtualIcon,
  SafetyStateNormalIcon,
} from "@wandelbots/wandelbots-js-react-components/wb-icons"
`})}),`
`,(0,o.jsx)(t.p,{children:`You can also import everything from the main entry point, but you'll need to install all optional peer dependencies:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-bash`,children:`pnpm add @wandelbots/wandelbots-js-react-components \\
  react react-dom \\
  @mui/material @mui/icons-material @emotion/react @emotion/styled \\
  three @react-three/fiber @react-three/drei three-stdlib
`})}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`Available Entry Points:`})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:(0,o.jsx)(t.code,{children:`.`})}),` (Main) — All components. Requires: React 18+, MUI v6/v7, @emotion/react, @emotion/styled, @mui/icons-material + all below.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:(0,o.jsx)(t.code,{children:`/core`})}),` — Base components (AppHeader, ProgramControl, SafetyBar, VelocitySlider, JoggingPanel, DataGrid, Timer, themes, i18n, etc.). Requires: React 18+, MUI v6/v7, @emotion/react, @emotion/styled, @mui/icons-material.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:(0,o.jsx)(t.code,{children:`/wb-icons`})}),` — SVG icon components (general UI icons, safety bar icons, jogging icons, axis icons). Requires: React 18+.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:(0,o.jsx)(t.code,{children:`/3d`})}),` — 3D visualization (Robot, RobotCard, CollisionSceneRenderer, SafetyZonesRenderer, TrajectoryRenderer). Requires: all from `,(0,o.jsx)(t.code,{children:`/core`}),` + three, @react-three/fiber, @react-three/drei, three-stdlib.`]}),`
`]}),`
`,(0,o.jsx)(t.h2,{id:`components-usage`,children:`Components Usage`}),`
`,(0,o.jsxs)(t.p,{children:[`See the individual `,(0,o.jsx)(t.a,{href:`https://wandelbotsgmbh.github.io/wandelbots-js-react-components`,rel:`nofollow`,children:`Storybook`}),` pages for implementation details of each component.`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(i,{...e})}):i(e)}var o;e((()=>{o=t(),r()}))();export{a as default};