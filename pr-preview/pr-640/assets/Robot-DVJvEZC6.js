import{j as o,M as i,C as c}from"./iframe-3_1gAL3j.js";import{useMDXComponents as r}from"./index-CsGV3ZIf.js";import{RobotStory as s}from"./Robot.stories-K7MizJjf.js";import"./preload-helper-Dp1pzeXC.js";import"./PresetEnvironment-D_OlL6zu.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./with-selector-AguFR1DY.js";import"./index-Bb8JjhAW.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./robotStoryConfig-BVESWhrn.js";import"./hooks-zJ0e6Dx3.js";import"./mobx.esm-D1cTsgoC.js";import"./Line-DZEtVcK0.js";import"./externalizeComponent-CMLcXRvL.js";import"./context-CCseGEkZ.js";import"./interpolation-C84u-OV2.js";import"./ConnectedMotionGroup-BXtVF8Hb.js";import"./novaCompat-2dTa2FyQ.js";import"./Robot-CWVfvqZA.js";function e(t){const n={code:"code",h1:"h1",p:"p",pre:"pre",...r(),...t.components};return o.jsxs(o.Fragment,{children:[o.jsx(i,{title:"3D View/Model Visualization/Robot"}),`
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
`,o.jsx(c,{of:s})]})}function L(t={}){const{wrapper:n}={...r(),...t.components};return n?o.jsx(n,{...t,children:o.jsx(e,{...t})}):e(t)}export{L as default};
