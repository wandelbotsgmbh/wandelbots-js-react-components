import{j as o,r as n}from"./iframe-BBM-L_pJ.js";import{C as l,P as u}from"./PresetEnvironment-Di4LfKvo.js";import{N as f}from"./index-BHJ0r4qt.js";import{s as x,r as R,O as g}from"./robotStoryConfig-GvmOMkSv.js";import{C as h}from"./ConnectedMotionGroup-GgO0jXn0.js";import{R as C}from"./Robot-DyRQ1BVR.js";import"./preload-helper-Dp1pzeXC.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./with-selector-BWCUq6nC.js";import"./index-Bb8JjhAW.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./hooks-BjfVl8gN.js";import"./mobx.esm-DvxsEwe8.js";import"./interpolation-C5bJqwI9.js";import"./Line-D0WYXGrX.js";import"./externalizeComponent-D9OW_3-K.js";import"./context-BXkv4zTp.js";import"./motionStateUpdate-DhiNLbY7.js";const{expect:y,fn:M,waitFor:b}=__STORYBOOK_MODULE_TEST__,K={...x,tags:["!dev"],title:"3D View/Model Visualization/Robot"};function v(e){const[r,m]=n.useState(),p=new f({instanceUrl:"https://mock.example.com"});return n.useEffect(()=>{async function c(){const d=await h.connect(p,"0@mock-ur5e");m(d)}return c(),()=>{R()}},[]),r?o.jsx("div",{style:{width:"100%",height:"100vh",minHeight:"400px",display:"flex",justifyContent:"center",alignItems:"center"},children:o.jsxs(l,{shadows:!0,children:[o.jsx(u,{}),o.jsx(g,{children:o.jsx(C,{...e,connectedMotionGroup:r})})]})}):null}const t={args:{postModelRender:M()},play:async({args:e})=>{await b(()=>y(e.postModelRender,"Failed to load model for example ur5e").toHaveBeenCalled(),{timeout:8e3})},render:e=>o.jsx(v,{...e}),name:"Robot"};var s,a,i;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    postModelRender: fn()
  },
  play: async ({
    args
  }) => {
    await waitFor(() => expect(args.postModelRender, \`Failed to load model for example ur5e\`).toHaveBeenCalled(), {
      timeout: 8000
    });
  },
  render: args => <RobotScene {...args} />,
  name: "Robot"
}`,...(i=(a=t.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const L=["RobotStory"];export{t as RobotStory,L as __namedExportsOrder,K as default};
