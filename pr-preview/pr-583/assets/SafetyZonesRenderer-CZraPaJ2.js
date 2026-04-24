import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-BwbqkF8g.js";import{Ma as n,c as r,l as i,o as a}from"./iframe-B6q2Ff5u.js";import{t as o}from"./mdx-react-shim-DrK5xiHK.js";import{SafetyZoneRenderer as s,n as c,t as l}from"./SafetyZonesRenderer.stories-CohQD07R.js";function u(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(a,{of:l}),`
`,(0,f.jsx)(n.h1,{id:`safety-zones-renderer`,children:`Safety Zones Renderer`}),`
`,(0,f.jsxs)(n.p,{children:[`The `,(0,f.jsx)(n.code,{children:`SafetyZonesRenderer`}),` component visualizes the safety zones of the controller.`]}),`
`,(0,f.jsxs)(n.p,{children:[`This component should be used with `,(0,f.jsx)(n.a,{href:`https://github.com/wandelbotsgmbh/nova-js`,rel:`nofollow`,children:`nova-js`}),`. Pass the `,(0,f.jsx)(n.code,{children:`safety_zones`}),` from the `,(0,f.jsx)(n.code,{children:`motion group description`}),` (API v2) to the component.`]}),`
`,(0,f.jsx)(n.pre,{children:(0,f.jsx)(n.code,{className:`language-tsx`,children:`<SafetyZonesRenderer
  safetyZones={motionGroupDescription.safety_zones || {}}
  dhParameters={motionGroupDescription.dh_parameters}
/>
`})}),`
`,(0,f.jsxs)(n.h2,{id:`optional-dhparameters`,children:[`Optional: `,(0,f.jsx)(n.code,{children:`dhParameters`})]}),`
`,(0,f.jsxs)(n.p,{children:[`For plane safety zones, the rendered plane size depends on the robot's reach radius. Pass `,(0,f.jsx)(n.code,{children:`dhParameters`}),` from the motion group description to correctly scale plane safety zones based on the robot's kinematics. Without this prop, planes fall back to a fixed default size.`]}),`
`,(0,f.jsx)(n.h2,{id:`supported-safety-zone-types`,children:`Supported Safety Zone Types`}),`
`,(0,f.jsx)(n.p,{children:`All these safety zone types are supported for rendering:`}),`
`,(0,f.jsxs)(n.ul,{children:[`
`,(0,f.jsxs)(n.li,{children:[(0,f.jsx)(n.strong,{children:`Box`}),` - `,(0,f.jsx)(n.code,{children:`convex_hull`})]}),`
`,(0,f.jsxs)(n.li,{children:[(0,f.jsx)(n.strong,{children:`Plane`}),` - `,(0,f.jsx)(n.code,{children:`plane`})]}),`
`,(0,f.jsxs)(n.li,{children:[(0,f.jsx)(n.strong,{children:`Sphere`}),` - `,(0,f.jsx)(n.code,{children:`sphere`})]}),`
`,(0,f.jsxs)(n.li,{children:[(0,f.jsx)(n.strong,{children:`Capsule`}),` - `,(0,f.jsx)(n.code,{children:`capsule`})]}),`
`,(0,f.jsxs)(n.li,{children:[(0,f.jsx)(n.strong,{children:`Prism`}),` - `,(0,f.jsx)(n.code,{children:`convex_hull`})]}),`
`,(0,f.jsxs)(n.li,{children:[(0,f.jsx)(n.strong,{children:`Lozenge`}),` - `,(0,f.jsx)(n.code,{children:`rectangular_capsule`})]}),`
`]}),`
`,(0,f.jsx)(r,{of:s})]})}function d(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,f.jsx)(n,{...e,children:(0,f.jsx)(u,{...e})}):u(e)}var f;e((()=>{f=n(),o(),i(),c()}))();export{d as default};