import{j as e,M as r,S as s}from"./iframe-CAKmp4rk.js";import{useMDXComponents as i}from"./index-Dt8xiTB0.js";import{C as c,a as l}from"./CollisionSceneRenderer.stories-C-WF8O9g.js";import"./preload-helper-Dp1pzeXC.js";import"./ConvexGeometry-DVCCnoqk.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./Setup-D-3Wjf9-.js";import"./PresetEnvironment-CPJyzaFo.js";import"./with-selector-bmL4YZ7P.js";import"./index-Bb8JjhAW.js";import"./useTheme-aBLdMIW5.js";function t(o){const n={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
`,e.jsx(n.h1,{id:"collision-scene-renderer",children:"Collision Scene Renderer"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"CollisionSceneRenderer"})," component visualizes a collision scene which can be created and fetched via the collision scene API endpoint."]}),`
`,e.jsxs(n.p,{children:["This component should be used with ",e.jsx(n.a,{href:"https://github.com/wandelbotsgmbh/nova-js",rel:"nofollow",children:"nova-js"}),". Pass the ",e.jsx(n.code,{children:"scene"})," from the ",e.jsx(n.code,{children:"Get Collision Scene API endpoint"})," to the component."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`
const scene: CollisionScene = {
    colliders: {
      ...
      "test/box/rotated": {
        shape: {
          shape_type: "box",
          size_x: 100,
          size_y: 200,
          size_z: 300,
          box_type: "FULL",
        },
        pose: {
          position: [200, 0, -400],
          orientation: [Math.PI * 0.75, Math.PI * 0.5, 0],
        },
      },
      ...
    },
  }

return (
  <CollisionSceneRenderer
    scene={scene}
    meshChildrenProvider={(colliderKey, collider) => (
      <meshStandardMaterial
        color={
  	colliderKey === "test/convex-hull"
  	  ? theme.palette.tertiary.main
  	  : theme.palette.primary.main
        }
        opacity={0.5}
        transparent
      />
    )}
  />
)
`})}),`
`,e.jsx(s,{of:l})]})}function M(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{M as default};
