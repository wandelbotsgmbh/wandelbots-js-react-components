import{j as o,M as i,C as c}from"./iframe-DCokSdT7.js";import{useMDXComponents as r}from"./index-CPJuWE6i.js";import{RobotStory as s}from"./Robot.stories-BT5vQit7.js";import"./preload-helper-Dp1pzeXC.js";import"./PresetEnvironment-BSgXc-zR.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./with-selector-Byu33rFo.js";import"./index-Bb8JjhAW.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./robotStoryConfig-C-3fmcmR.js";import"./hooks-DXR1t149.js";import"./mobx.esm-DvxsEwe8.js";import"./interpolation-xMwOAe1Y.js";import"./Line-CaHWGrpF.js";import"./externalizeComponent-CJpkoEyD.js";import"./context-zkDGtYYg.js";import"./ConnectedMotionGroup-GgO0jXn0.js";import"./motionStateUpdate-DhiNLbY7.js";import"./Robot-Bb6xkTbG.js";function e(t){const n={code:"code",h1:"h1",p:"p",pre:"pre",...r(),...t.components};return o.jsxs(o.Fragment,{children:[o.jsx(i,{title:"3D View/Model Visualization/Robot"}),`
`,o.jsx(n.h1,{id:"robot",children:"Robot"}),`
`,o.jsxs(n.p,{children:["This ",o.jsx(n.code,{children:"Robot"})," component adds the robot to the 3D viewport. Use it together with the ",o.jsx(n.code,{children:"ConnectedMotionGroup"})," from this library:"]}),`
`,o.jsx(n.pre,{children:o.jsx(n.code,{className:"language-tsx",children:`import { NovaClient } from "@wandelbots/nova-js/v2"
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/core"
import { Robot } from "@wandelbots/wandelbots-js-react-components/3d"

const nova = new NovaClient({ instanceUrl: "https://your-nova-instance.com" })
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
`,o.jsx(c,{of:s})]})}function L(t={}){const{wrapper:n}={...r(),...t.components};return n?o.jsx(n,{...t,children:o.jsx(e,{...t})}):e(t)}export{L as default};
