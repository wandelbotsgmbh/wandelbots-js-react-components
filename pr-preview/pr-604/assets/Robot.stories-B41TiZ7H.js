import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{Ar as n,Ga as r,Ki as i,L as a,Mr as o,Q as s,Qa as c,Xi as l,Z as u,Zi as d,jr as f,kr as p,wr as m}from"./iframe-BvHxi_cZ.js";import{c as h,i as g,r as _,s as v}from"./robotStoryConfig-DSRWIKO3.js";function y(e){let[t,r]=(0,b.useState)(),a=new f({instanceUrl:`https://mock.example.com`});return(0,b.useEffect)(()=>{async function e(){r(await u.connect(a,`0@mock-ur5e`))}return e(),()=>{n()}},[]),t?(0,x.jsx)(`div`,{style:{width:`100%`,height:`100vh`,minHeight:`400px`,display:`flex`,justifyContent:`center`,alignItems:`center`},children:(0,x.jsxs)(l,{shadows:!0,children:[(0,x.jsx)(i,{}),(0,x.jsx)(v,{children:(0,x.jsx)(m,{...e,connectedMotionGroup:t})})]})}):null}var b,x,S,C,w,T,E,D,O=e((()=>{d(),o(),b=t(c(),1),a(),p(),s(),h(),_(),x=r(),{expect:S,fn:C,waitFor:w}=__STORYBOOK_MODULE_TEST__,T={...g,tags:[`!dev`],title:`3D View/Model Visualization/Robot`},E={args:{postModelRender:C()},play:async({args:e})=>{await w(()=>S(e.postModelRender,`Failed to load model for example ur5e`).toHaveBeenCalled(),{timeout:8e3})},render:e=>(0,x.jsx)(y,{...e}),name:`Robot`},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D=[`RobotStory`]}));O();export{E as RobotStory,D as __namedExportsOrder,T as default,O as t};