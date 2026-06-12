import{j as e,M as t,S as i}from"./iframe-DDZb5C_9.js";import{useMDXComponents as o}from"./index-sZ4tiABQ.js";import{S as d,a as l}from"./SafetyZonesRenderer.stories-BikKrzJu.js";import"./preload-helper-Dp1pzeXC.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./Setup-CyyXg6x5.js";import"./PresetEnvironment-CVyqzUa4.js";import"./with-selector-CfSVMgLM.js";import"./index-Bb8JjhAW.js";import"./ConvexGeometry-DVCCnoqk.js";import"./converters-DABMUzRG.js";function r(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:d}),`
`,e.jsx(n.h1,{id:"safety-zones-renderer",children:"Safety Zones Renderer"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"SafetyZonesRenderer"})," component visualizes the safety zones of the controller."]}),`
`,e.jsxs(n.p,{children:["This component should be used with ",e.jsx(n.a,{href:"https://github.com/wandelbotsgmbh/nova-js",rel:"nofollow",children:"nova-js"}),". Pass the ",e.jsx(n.code,{children:"safety_zones"})," from the ",e.jsx(n.code,{children:"motion group description"})," (API v2) to the component."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<SafetyZonesRenderer
  safetyZones={motionGroupDescription.safety_zones || {}}
  dhParameters={motionGroupDescription.dh_parameters}
/>
`})}),`
`,e.jsxs(n.h2,{id:"optional-dhparameters",children:["Optional: ",e.jsx(n.code,{children:"dhParameters"})]}),`
`,e.jsxs(n.p,{children:["For plane safety zones, the rendered plane size depends on the robot's reach radius. Pass ",e.jsx(n.code,{children:"dhParameters"})," from the motion group description to correctly scale plane safety zones based on the robot's kinematics. Without this prop, planes fall back to a fixed default size."]}),`
`,e.jsx(n.h2,{id:"supported-safety-zone-types",children:"Supported Safety Zone Types"}),`
`,e.jsx(n.p,{children:"All these safety zone types are supported for rendering:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Box"})," - ",e.jsx(n.code,{children:"convex_hull"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Plane"})," - ",e.jsx(n.code,{children:"plane"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Sphere"})," - ",e.jsx(n.code,{children:"sphere"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Capsule"})," - ",e.jsx(n.code,{children:"capsule"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Prism"})," - ",e.jsx(n.code,{children:"convex_hull"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Lozenge"})," - ",e.jsx(n.code,{children:"rectangular_capsule"})]}),`
`]}),`
`,e.jsx(i,{of:l})]})}function S(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{S as default};
