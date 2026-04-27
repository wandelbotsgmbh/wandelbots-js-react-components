import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-D_7OwatM.js";import{Ma as n,c as r,l as i,o as a}from"./iframe-DpqMHKse.js";import{t as o}from"./mdx-react-shim-KhjDAwK7.js";import{CollisionSceneRendererSt as s,n as c,t as l}from"./CollisionSceneRenderer.stories-CQekWTkj.js";function u(e){let n={a:`a`,code:`code`,h1:`h1`,p:`p`,pre:`pre`,...t(),...e.components};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(a,{of:l}),`
`,(0,f.jsx)(n.h1,{id:`collision-scene-renderer`,children:`Collision Scene Renderer`}),`
`,(0,f.jsxs)(n.p,{children:[`The `,(0,f.jsx)(n.code,{children:`CollisionSceneRenderer`}),` component visualizes a collision scene which can be created and fetched via the collision scene API endpoint.`]}),`
`,(0,f.jsxs)(n.p,{children:[`This component should be used with `,(0,f.jsx)(n.a,{href:`https://github.com/wandelbotsgmbh/nova-js`,rel:`nofollow`,children:`nova-js`}),`. Pass the `,(0,f.jsx)(n.code,{children:`scene`}),` from the `,(0,f.jsx)(n.code,{children:`Get Collision Scene API endpoint`}),` to the component.`]}),`
`,(0,f.jsx)(n.pre,{children:(0,f.jsx)(n.code,{className:`language-tsx`,children:`
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
`,(0,f.jsx)(r,{of:s})]})}function d(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,f.jsx)(n,{...e,children:(0,f.jsx)(u,{...e})}):u(e)}var f;e((()=>{f=n(),o(),i(),c()}))();export{d as default};