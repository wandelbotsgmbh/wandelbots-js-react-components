import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{Ba as n,I as r,Ii as i,L as a,Li as o,Ma as s,Mi as c,S as l,_r as u,gr as d,hr as f,ur as p,vr as m}from"./iframe-BYoHjiUl.js";import{c as h,i as g,r as _,s as v}from"./robotStoryConfig-nrnMJAdQ.js";function y(e){let[t,n]=(0,b.useState)(),a=new u({instanceUrl:`https://mock.example.com`});return(0,b.useEffect)(()=>{async function e(){n(await r.connect(a,`0@mock-ur5e`))}return e(),()=>{d()}},[]),t?(0,x.jsx)(`div`,{style:{width:`100%`,height:`100vh`,minHeight:`400px`,display:`flex`,justifyContent:`center`,alignItems:`center`},children:(0,x.jsxs)(i,{shadows:!0,children:[(0,x.jsx)(c,{}),(0,x.jsx)(v,{children:(0,x.jsx)(p,{...e,connectedMotionGroup:t})})]})}):null}var b,x,S,C,w,T,E,D,O=t((()=>{o(),m(),b=e(n(),1),l(),f(),a(),h(),_(),x=s(),{expect:S,fn:C,waitFor:w}=__STORYBOOK_MODULE_TEST__,T={...g,tags:[`!dev`],title:`3D View/Model Visualization/Robot`},E={args:{postModelRender:C()},play:async({args:e})=>{await w(()=>S(e.postModelRender,`Failed to load model for example ur5e`).toHaveBeenCalled(),{timeout:8e3})},render:e=>(0,x.jsx)(y,{...e}),name:`Robot`},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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