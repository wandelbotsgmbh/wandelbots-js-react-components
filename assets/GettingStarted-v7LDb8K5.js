import{j as e}from"./iframe-DkYea-kr.js";import{useMDXComponents as r}from"./index-DnWuTDtb.js";import"./preload-helper-Dp1pzeXC.js";function t(o){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"getting-started",children:"Getting Started"}),`
`,e.jsxs(n.p,{children:["A growing collection of ready-made React UI components based on MaterialUI and React Three Fiber for use with the ",e.jsx(n.a,{href:"https://www.wandelbots.com/",rel:"nofollow",children:"Wandelbots Nova platform"}),"."]}),`
`,e.jsx(n.p,{children:"Provides robot control interfaces, 3D visualizations, and automation components that integrate with the Nova ecosystem."}),`
`,e.jsx(n.h2,{id:"install",children:"Install"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`pnpm add @wandelbots/wandelbots-js-react-components react react-dom @mui/material @emotion/react @emotion/styled
`})}),`
`,e.jsx(n.h2,{id:"modular-imports",children:"Modular Imports"}),`
`,e.jsxs(n.p,{children:["Some modules require additional peer dependencies, such as Three.js for 3D rendering. If you don't need 3D rendering in your application, import from ",e.jsx(n.code,{children:"/core"})," to avoid these dependencies:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`import {
  SafetyBar,
  JoggingPanel,
  DataGrid,
  Timer,
} from "@wandelbots/wandelbots-js-react-components/core"
`})}),`
`,e.jsxs(n.p,{children:["For 3D-enabled components, use ",e.jsx(n.code,{children:"/3d"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`import { Robot, RobotCard } from "@wandelbots/wandelbots-js-react-components/3d"
`})}),`
`,e.jsxs(n.p,{children:["For icons, use the dedicated ",e.jsx(n.a,{href:"https://www.npmjs.com/package/@wandelbots/icons",rel:"nofollow",children:e.jsx(n.code,{children:"@wandelbots/icons"})})," package (the ",e.jsx(n.code,{children:"/wb-icons"})," entry point has been removed). Each icon is imported from its own subpath — there is no bulk export:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`import { Home } from "@wandelbots/icons/Home"
import { Robot } from "@wandelbots/icons/Robot"
`})}),`
`,e.jsxs(n.p,{children:["Browse the full icon set at ",e.jsx(n.a,{href:"https://wandelbotsgmbh.github.io/nova-design-system/#icons",rel:"nofollow",children:"nova-design-system"}),"."]}),`
`,e.jsx(n.p,{children:"You can also import everything from the main entry point, but you'll need to install all optional peer dependencies:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`pnpm add @wandelbots/wandelbots-js-react-components \\
  react react-dom \\
  @mui/material @mui/icons-material @emotion/react @emotion/styled \\
  three @react-three/fiber @react-three/drei three-stdlib
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Available Entry Points:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"."})})," (Main) — All components. Requires: React 18+, MUI v6/v7, @emotion/react, @emotion/styled, @mui/icons-material + all below."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"/core"})})," — Base components (AppHeader, ProgramControl, SafetyBar, VelocitySlider, JoggingPanel, DataGrid, Timer, themes, i18n, etc.). Requires: React 18+, MUI v6/v7, @emotion/react, @emotion/styled, @mui/icons-material."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"/3d"})})," — 3D visualization (Robot, RobotCard, CollisionSceneRenderer, SafetyZonesRenderer, TrajectoryRenderer). Requires: all from ",e.jsx(n.code,{children:"/core"})," + three, @react-three/fiber, @react-three/drei, three-stdlib."]}),`
`]}),`
`,e.jsx(n.h2,{id:"components-usage",children:"Components Usage"}),`
`,e.jsxs(n.p,{children:["See the individual ",e.jsx(n.a,{href:"https://wandelbotsgmbh.github.io/wandelbots-js-react-components",rel:"nofollow",children:"Storybook"})," pages for implementation details of each component."]})]})}function l(o={}){const{wrapper:n}={...r(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{l as default};
