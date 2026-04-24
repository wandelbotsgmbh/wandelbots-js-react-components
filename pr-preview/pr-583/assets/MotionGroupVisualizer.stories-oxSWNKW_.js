import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{Ba as n,Ii as r,Li as i,Ma as a,Mi as o,S as s,T as c,_r as l,ar as u,gr as d,hr as f,vr as p}from"./iframe-B6q2Ff5u.js";import{c as m,i as h,r as g,s as _}from"./robotStoryConfig-CGfBUmhe.js";function v(e){let[t,n]=(0,y.useState)(),[i,a]=(0,y.useState)(void 0),s=`https://mock.example.com`,f=new l({instanceUrl:s});(0,y.useEffect)(()=>{async function e(){n(await c.connect(f,`0@mock-ur5e`))}return e(),()=>{d()}},[]);let p=async()=>{if(t)try{let{inverse_solver:e,dh_parameters:n}=await f.api.motionGroupModels.getMotionGroupKinematicModel(t?.modelFromController);a(e)}catch{console.warn(`Failed to fetch kinematic model from API for ${t?.modelFromController}, falling back to local config`)}};return(0,y.useEffect)(()=>{p()},[t]),!t||i===void 0?null:(0,b.jsx)(`div`,{style:{width:`100%`,height:`100vh`,minHeight:`400px`,display:`flex`,justifyContent:`center`,alignItems:`center`},children:(0,b.jsxs)(r,{shadows:!0,children:[(0,b.jsx)(o,{}),(0,b.jsx)(_,{children:(0,b.jsx)(u,{...e,instanceUrl:s,modelFromController:t.modelFromController,rapidlyChangingMotionState:t.rapidlyChangingMotionState,dhParameters:t.dhParameters??[],inverseSolver:i})})]})})}var y,b,x,S,C,w,T,E,D=t((()=>{i(),p(),y=e(n(),1),s(),f(),m(),g(),b=a(),{expect:x,fn:S,waitFor:C}=__STORYBOOK_MODULE_TEST__,w={...h,tags:[`!dev`],title:`3D View/Model Visualization/MotionGroupVisualizer`},T={args:{postModelRender:S()},play:async({args:e})=>{await C(()=>x(e.postModelRender,`Failed to load model for example ur5e`).not.toHaveBeenCalled(),{timeout:8e3})},render:e=>(0,b.jsx)(v,{...e}),name:`MotionGroupVisualizer`},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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