import{j as o,M as i,C as c}from"./iframe-Cad1GJBg.js";import{useMDXComponents as r}from"./index-CsuHhnFA.js";import{RobotStory as s}from"./Robot.stories-BHFJYWzf.js";import"./preload-helper-Dp1pzeXC.js";import"./PresetEnvironment-BE5cH1xV.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./with-selector-DBPbMziz.js";import"./index-Bb8JjhAW.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./robotStoryConfig-CU5MXeej.js";import"./hooks-NKPOmrDj.js";import"./mobx.esm-D1cTsgoC.js";import"./interpolation-C835dcj_.js";import"./Line-j6DbDKzB.js";import"./externalizeComponent-CRLYvFhp.js";import"./context-DIMlD-Eo.js";import"./ConnectedMotionGroup-B-rgq4Iy.js";import"./novaCompat-Dczxmkh6.js";import"./Robot-owH6cYdQ.js";function e(t){const n={code:"code",h1:"h1",p:"p",pre:"pre",...r(),...t.components};return o.jsxs(o.Fragment,{children:[o.jsx(i,{title:"3D View/Model Visualization/Robot"}),`
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
