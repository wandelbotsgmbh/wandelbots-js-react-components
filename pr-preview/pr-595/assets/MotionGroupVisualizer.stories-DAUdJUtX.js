import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{Ba as n,I as r,Ii as i,Li as a,Ma as o,Mi as s,S as c,_r as l,ar as u,gr as d,hr as f,vr as p}from"./iframe-XS2jLBOb.js";import{c as m,i as h,r as g,s as _}from"./robotStoryConfig-C7J9qW36.js";function v(e){let[t,n]=(0,y.useState)(),[a,o]=(0,y.useState)(void 0),c=`https://mock.example.com`,f=new l({instanceUrl:c});(0,y.useEffect)(()=>{async function e(){n(await r.connect(f,`0@mock-ur5e`))}return e(),()=>{d()}},[]);let p=async()=>{if(t)try{let{inverse_solver:e,dh_parameters:n}=await f.api.motionGroupModels.getMotionGroupKinematicModel(t?.modelFromController);o(e)}catch{console.warn(`Failed to fetch kinematic model from API for ${t?.modelFromController}, falling back to local config`)}};return(0,y.useEffect)(()=>{p()},[t]),!t||a===void 0?null:(0,b.jsx)(`div`,{style:{width:`100%`,height:`100vh`,minHeight:`400px`,display:`flex`,justifyContent:`center`,alignItems:`center`},children:(0,b.jsxs)(i,{shadows:!0,children:[(0,b.jsx)(s,{}),(0,b.jsx)(_,{children:(0,b.jsx)(u,{...e,instanceUrl:c,modelFromController:t.modelFromController,rapidlyChangingMotionState:t.rapidlyChangingMotionState,dhParameters:t.dhParameters??[],inverseSolver:a})})]})})}var y,b,x,S,C,w,T,E,D=t((()=>{a(),p(),y=e(n(),1),c(),f(),m(),g(),b=o(),{expect:x,fn:S,waitFor:C}=__STORYBOOK_MODULE_TEST__,w={...h,tags:[`!dev`],title:`3D View/Model Visualization/MotionGroupVisualizer`},T={args:{postModelRender:S()},play:async({args:e})=>{await C(()=>x(e.postModelRender,`Failed to load model for example ur5e`).not.toHaveBeenCalled(),{timeout:8e3})},render:e=>(0,b.jsx)(v,{...e}),name:`MotionGroupVisualizer`},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    postModelRender: fn()
  },
  play: async ({
    args
  }) => {
    /**
     * First render for undefined inverseSolver would be a null, which does not
     * fire the postModelRender callback
     */
    await waitFor(() => expect(args.postModelRender, \`Failed to load model for example ur5e\`).not.toHaveBeenCalled(), {
      timeout: 8000
    });
  },
  render: args => <MotionGroupVisualizerScene {...args} />,
  name: "MotionGroupVisualizer"
}`,...T.parameters?.docs?.source}}},E=[`MotionGroupVisualizerStory`]}));D();export{T as MotionGroupVisualizerStory,E as __namedExportsOrder,w as default,D as t};