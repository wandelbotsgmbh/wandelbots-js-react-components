import{j as o,r as n}from"./iframe-BULENBHd.js";import{C as l,P as u}from"./PresetEnvironment-DI7CTsD3.js";import{N as f}from"./index-B5rnV39A.js";import{s as x,r as R,O as g}from"./robotStoryConfig-Cr9QeRpD.js";import{C as h}from"./ConnectedMotionGroup-DOpkiZ2Q.js";import{R as y}from"./Robot-Cmfw8LtW.js";import"./preload-helper-Dp1pzeXC.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./with-selector-DA9QtjpJ.js";import"./index-Bb8JjhAW.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./hooks-CuNiUMc9.js";import"./mobx.esm-D1cTsgoC.js";import"./interpolation-CDhBdW35.js";import"./Line-CeFlSN0Z.js";import"./externalizeComponent-BvhamZqx.js";import"./context-DFJAjtTV.js";import"./novaCompat-Dczxmkh6.js";const{expect:C,fn:M,waitFor:b}=__STORYBOOK_MODULE_TEST__,I={...x,tags:["!dev"],title:"3D View/Model Visualization/Robot"};function v(e){const[r,m]=n.useState(),p=new f({instanceUrl:"https://mock.example.com"});return n.useEffect(()=>{async function c(){const d=await h.connect(p,"0@mock-ur5e");m(d)}return c(),()=>{R()}},[]),r?o.jsx("div",{style:{width:"100%",height:"100vh",minHeight:"400px",display:"flex",justifyContent:"center",alignItems:"center"},children:o.jsxs(l,{shadows:!0,children:[o.jsx(u,{}),o.jsx(g,{children:o.jsx(y,{...e,connectedMotionGroup:r})})]})}):null}const t={args:{postModelRender:M()},play:async({args:e})=>{await b(()=>C(e.postModelRender,"Failed to load model for example ur5e").toHaveBeenCalled(),{timeout:8e3})},render:e=>o.jsx(v,{...e}),name:"Robot"};var s,a,i;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
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
}`,...(i=(a=t.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const K=["RobotStory"];export{t as RobotStory,K as __namedExportsOrder,I as default};
