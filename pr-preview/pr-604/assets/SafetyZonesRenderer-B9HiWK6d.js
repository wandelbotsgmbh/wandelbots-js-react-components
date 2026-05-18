import{i as e}from"./preload-helper-Cs4UwXAW.js";import{Ga as t,c as n,d as r,l as i,o as a}from"./iframe-BvHxi_cZ.js";import{t as o}from"./mdx-react-shim-X3p0ODal.js";import{SafetyZoneRenderer as s,n as c,t as l}from"./SafetyZonesRenderer.stories-DClA93qc.js";function u(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(a,{of:l}),`
`,(0,f.jsx)(t.h1,{id:`safety-zones-renderer`,children:`Safety Zones Renderer`}),`
`,(0,f.jsxs)(t.p,{children:[`The `,(0,f.jsx)(t.code,{children:`SafetyZonesRenderer`}),` component visualizes the safety zones of the controller.`]}),`
`,(0,f.jsxs)(t.p,{children:[`This component should be used with `,(0,f.jsx)(t.a,{href:`https://github.com/wandelbotsgmbh/nova-js`,rel:`nofollow`,children:`nova-js`}),`. Pass the `,(0,f.jsx)(t.code,{children:`safety_zones`}),` from the `,(0,f.jsx)(t.code,{children:`motion group description`}),` (API v2) to the component.`]}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-tsx`,children:`<SafetyZonesRenderer
  safetyZones={motionGroupDescription.safety_zones || {}}
  dhParameters={motionGroupDescription.dh_parameters}
/>
`})}),`
`,(0,f.jsxs)(t.h2,{id:`optional-dhparameters`,children:[`Optional: `,(0,f.jsx)(t.code,{children:`dhParameters`})]}),`
`,(0,f.jsxs)(t.p,{children:[`For plane safety zones, the rendered plane size depends on the robot's reach radius. Pass `,(0,f.jsx)(t.code,{children:`dhParameters`}),` from the motion group description to correctly scale plane safety zones based on the robot's kinematics. Without this prop, planes fall back to a fixed default size.`]}),`
`,(0,f.jsx)(t.h2,{id:`supported-safety-zone-types`,children:`Supported Safety Zone Types`}),`
`,(0,f.jsx)(t.p,{children:`All these safety zone types are supported for rendering:`}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.strong,{children:`Box`}),` - `,(0,f.jsx)(t.code,{children:`convex_hull`})]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.strong,{children:`Plane`}),` - `,(0,f.jsx)(t.code,{children:`plane`})]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.strong,{children:`Sphere`}),` - `,(0,f.jsx)(t.code,{children:`sphere`})]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.strong,{children:`Capsule`}),` - `,(0,f.jsx)(t.code,{children:`capsule`})]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.strong,{children:`Prism`}),` - `,(0,f.jsx)(t.code,{children:`convex_hull`})]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.strong,{children:`Lozenge`}),` - `,(0,f.jsx)(t.code,{children:`rectangular_capsule`})]}),`
`]}),`
`,(0,f.jsx)(n,{of:s})]})}function d(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(u,{...e})}):u(e)}var f;e((()=>{f=t(),o(),i(),c()}))();export{d as default};