import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{Ar as n,Ga as r,Ki as i,L as a,Mr as o,Qa as s,Xi as c,Z as l,Zi as u,jr as d,kr as f,yr as p}from"./iframe-BvHxi_cZ.js";import{c as m,i as h,r as g,s as _}from"./robotStoryConfig-DSRWIKO3.js";function v(e){let[t,r]=(0,y.useState)(),[a,o]=(0,y.useState)(void 0),s=`https://mock.example.com`,u=new d({instanceUrl:s});(0,y.useEffect)(()=>{async function e(){r(await l.connect(u,`0@mock-ur5e`))}return e(),()=>{n()}},[]);let f=async()=>{if(t)try{let{inverse_solver:e,dh_parameters:n}=await u.api.motionGroupModels.getMotionGroupKinematicModel(t?.modelFromController);o(e)}catch{console.warn(`Failed to fetch kinematic model from API for ${t?.modelFromController}, falling back to local config`)}};return(0,y.useEffect)(()=>{f()},[t]),!t||a===void 0?null:(0,b.jsx)(`div`,{style:{width:`100%`,height:`100vh`,minHeight:`400px`,display:`flex`,justifyContent:`center`,alignItems:`center`},children:(0,b.jsxs)(c,{shadows:!0,children:[(0,b.jsx)(i,{}),(0,b.jsx)(_,{children:(0,b.jsx)(p,{...e,instanceUrl:s,modelFromController:t.modelFromController,rapidlyChangingMotionState:t.rapidlyChangingMotionState,dhParameters:t.dhParameters??[],inverseSolver:a})})]})})}var y,b,x,S,C,w,T,E,D=e((()=>{u(),o(),y=t(s(),1),a(),f(),m(),g(),b=r(),{expect:x,fn:S,waitFor:C}=__STORYBOOK_MODULE_TEST__,w={...h,tags:[`!dev`],title:`3D View/Model Visualization/MotionGroupVisualizer`},T={args:{postModelRender:S()},play:async({args:e})=>{await C(()=>x(e.postModelRender,`Failed to load model for example ur5e`).not.toHaveBeenCalled(),{timeout:8e3})},render:e=>(0,b.jsx)(v,{...e}),name:`MotionGroupVisualizer`},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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