import{j as o,M as i,C as c}from"./iframe-B5Ijub9I.js";import{useMDXComponents as r}from"./index-DObUQdxg.js";import{RobotStory as s}from"./Robot.stories-CBWda7pk.js";import"./preload-helper-Dp1pzeXC.js";import"./PresetEnvironment-DVIADsr9.js";import"./three.module-BfWIdBXu.js";import"./with-selector-DQ0IXKfO.js";import"./index-Bb8JjhAW.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./robotStoryConfig-BsZuigkM.js";import"./hooks-nBCnzZYu.js";import"./mobx.esm-D1cTsgoC.js";import"./interpolation-llf2nRLT.js";import"./Line-DGNPNi-D.js";import"./externalizeComponent-Bgk64OIa.js";import"./context-BsjbqM7p.js";import"./ConnectedMotionGroup-BjZPltlw.js";import"./novaCompat-DBu8Nre9.js";import"./rotationVector-DKUTJqRd.js";import"./Robot-DUqGfWxe.js";function e(t){const n={code:"code",h1:"h1",p:"p",pre:"pre",...r(),...t.components};return o.jsxs(o.Fragment,{children:[o.jsx(i,{title:"3D View/Model Visualization/Robot"}),`
`,o.jsx(n.h1,{id:"robot",children:"Robot"}),`
`,o.jsxs(n.p,{children:["This ",o.jsx(n.code,{children:"Robot"})," component adds the robot to the 3D viewport. Use it together with the ",o.jsx(n.code,{children:"ConnectedMotionGroup"})," from this library:"]}),`
`,o.jsx(n.pre,{children:o.jsx(n.code,{className:"language-tsx",children:`import { Nova } from "@wandelbots/nova-js/v2"
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/core"
import { Robot } from "@wandelbots/wandelbots-js-react-components/3d"

const nova = new Nova({ instanceUrl: "https://your-nova-instance.com" })
const connectedMotionGroup = await ConnectedMotionGroup.connect(nova, "0@your-motion-group-id");

<Robot connectedMotionGroup={connectedMotionGroup} />
`})}),`
`,o.jsx(n.p,{children:"The robot model are loaded from your connected Nova instance."}),`
`,o.jsx(n.pre,{children:o.jsx(n.code,{className:"language-tsx",children:`const file = await nova.api.motionGroupModels.getMotionGroupGlbModel(modelFromController)
const url = URL.createObjectURL(file)
return url
`})}),`
`,o.jsxs(n.p,{children:["In case you want to use the application offline, you can download the models and host them locally. You can override the URL resolver of the ",o.jsx(n.code,{children:"Robot"})," component by passing a ",o.jsx(n.code,{children:"getModel"})," function like:"]}),`
`,o.jsx(n.pre,{children:o.jsx(n.code,{className:"language-tsx",children:`<Robot
  getModel={() => \`public/\${connectedMotionGroup.modelFromController}.glb\`}
  connectedMotionGroup={connectedMotionGroup}
/>
`})}),`
`,o.jsx(c,{of:s})]})}function U(t={}){const{wrapper:n}={...r(),...t.components};return n?o.jsx(n,{...t,children:o.jsx(e,{...t})}):e(t)}export{U as default};
