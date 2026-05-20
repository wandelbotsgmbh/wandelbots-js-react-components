import{j as e,M as i,C as s}from"./iframe-CxmfdHuz.js";import{useMDXComponents as r}from"./index-BkmO7D1P.js";import{MotionGroupVisualizerStory as l}from"./MotionGroupVisualizer.stories-nOJh2zTc.js";import"./preload-helper-Dp1pzeXC.js";import"./PresetEnvironment-B5HSHRwS.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./with-selector-BryuxtgE.js";import"./index-Bb8JjhAW.js";import"./index-CW2dP9i_.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./robotStoryConfig-CG1NulVk.js";import"./hooks-Qwwjthxc.js";import"./mobx.esm-DvxsEwe8.js";import"./interpolation-Cdn4VloA.js";import"./Line-CbAycBSj.js";import"./externalizeComponent-D2LPhBva.js";import"./context-CFahWQCx.js";import"./ConnectedMotionGroup-GgO0jXn0.js";import"./motionStateUpdate-DhiNLbY7.js";function t(n){const o={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"3D View/Model Visualization/MotionGroupVisualizer"}),`
`,e.jsx(o.h1,{id:"motiongroupvisualizer",children:"MotionGroupVisualizer"}),`
`,e.jsxs(o.p,{children:["This ",e.jsx(o.code,{children:"MotionGroupVisualizer"})," component adds the robot or linear axis to the 3D viewport. It can be used on top of a robot or linear axis if we want to include the internal differentiation of what should be rendered."]}),`
`,e.jsxs(o.p,{children:["The differentiation is dependent on the ",e.jsx(o.code,{children:"inverseSolver"})," and ",e.jsx(o.code,{children:"dhParameters"})," variables, which must be passed as a prop:"]}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"dhParameters"})," have to include the ",e.jsx(o.code,{children:"type"})," attribute, that determines, which joint type is supported by the deliver model"]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"inverseSolver"})," set (e.g. string): ",e.jsx(o.code,{children:"SupportedRobot"})," component is returned."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"inverseSolver"})," null: ",e.jsx(o.code,{children:"SupportedLinearAxis"})," component is returned."]}),`
`,e.jsxs(o.li,{children:["Note: If ",e.jsx(o.code,{children:"inverseSolver"})," is null but the first joint is a ",e.jsx(o.code,{children:"RevoluteJoint"}),", it is treated as a turntable and ",e.jsx(o.code,{children:"SupportedRobot"})," is returned"]}),`
`]}),`
`,e.jsxs(o.p,{children:["Use it together with the ",e.jsx(o.code,{children:"ConnectedMotionGroup"})," from this library:"]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-tsx",children:`import { NovaClient } from "@wandelbots/nova-js/v2"
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/core"
import { MotionGroupVisualizer } from "@wandelbots/wandelbots-js-react-components/3d"

const instanceUrl = "https://your-nova-instance.com"
const nova = new NovaClient({ instanceUrl })
const connectedMotionGroup = await ConnectedMotionGroup.connect(nova, "0@your-motion-group-id");

const { inverse_solver } = await nova.api.motionGroupModels.getMotionGroupKinematicModel(connectedMotionGroup.modelFromController)

<MotionGroupVisualizer
  instanceUrl={instanceUrl}
  modelFromController={connectedMotionGroup.modelFromController}
  rapidlyChangingMotionState={connectedMotionGroup.rapidlyChangingMotionState}
  dhParameters={connectedMotionGroup.dhParameters ?? []}
  inverseSolver={inverse_solver}
/>
`})}),`
`,e.jsx(o.p,{children:"The model files are loaded from your connected Nova instance."}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-tsx",children:`const file = await nova.api.motionGroupModels.getMotionGroupGlbModel(modelFromController)
const url = URL.createObjectURL(file)
return url
`})}),`
`,e.jsxs(o.p,{children:["In case you want to use the application offline, you can download the models and host them locally. You can override the URL resolver of the ",e.jsx(o.code,{children:"MotionGroupVisualizer"})," component by passing a ",e.jsx(o.code,{children:"getModel"})," function like:"]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-tsx",children:`<MotionGroupVisualizer
  instanceUrl={instanceUrl}
  modelFromController={connectedMotionGroup.modelFromController}
  rapidlyChangingMotionState={connectedMotionGroup.rapidlyChangingMotionState}
  dhParameters={connectedMotionGroup.dhParameters ?? []}
  inverseSolver={inverse_solver}
  getModel={() => \`public/\${connectedMotionGroup.modelFromController}.glb\`}
/>
`})}),`
`,e.jsx(s,{of:l})]})}function V(n={}){const{wrapper:o}={...r(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(t,{...n})}):t(n)}export{V as default};
