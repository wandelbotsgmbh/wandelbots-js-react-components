import{r as O,j as r}from"./iframe-3_1gAL3j.js";import{C as Z,P as B}from"./PresetEnvironment-D_OlL6zu.js";import{g as W,r as X,O as Q,S as K,a as $}from"./robotStoryConfig-BVESWhrn.js";import{S as tt}from"./Setup-C0uDUPk7.js";import"./three.module-IMxEiD3l.js";import{b as P,V as g,Q as x}from"./three.core-EPGyoDIa.js";import{L as et}from"./Line-DZEtVcK0.js";import"./preload-helper-Dp1pzeXC.js";import"./with-selector-AguFR1DY.js";import"./index-Bb8JjhAW.js";import"./hooks-zJ0e6Dx3.js";import"./mobx.esm-D1cTsgoC.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-CMLcXRvL.js";import"./context-CCseGEkZ.js";import"./interpolation-C84u-OV2.js";function nt(t){const n=(t==null?void 0:t.position)??[],e=(t==null?void 0:t.orientation)??[],a=new g(e[0]??0,e[1]??0,e[2]??0),i=a.length(),s=i>0?new x().setFromAxisAngle(a.normalize(),i):new x;return new P().compose(new g(n[0]??0,n[1]??0,n[2]??0).divideScalar(1e3),s,new g(1,1,1))}function it(t,n=null,e=[]){const a=nt(n);return t.map((i,s)=>{const o=a.clone(),l=(i.reverse_rotation_direction?-1:1)*(e[s]??0),m=i.type==="PRISMATIC_JOINT",c=(i.theta??0)+(m?0:l),d=(i.d??0)+(m?l:0);return a.multiply(new P().makeRotationZ(c)).multiply(new P().makeTranslation((i.a??0)/1e3,0,d/1e3)).multiply(new P().makeRotationX(i.alpha??0)),o})}const N="#ff4b4b",J="#2fa8ff",ot="#8a8d9e",rt=96,at=.15,st=new g(0,1,0),lt=.2,mt=2;function ct(t){const{lower_limit:n,upper_limit:e}=t??{};return typeof n!="number"||typeof e!="number"||!Number.isFinite(n)||!Number.isFinite(e)||!(n<e)?null:{lower_limit:n,upper_limit:e}}function E({base:t,direction:n,size:e,color:a,opacity:i}){const s=new x().setFromUnitVectors(st,n.clone().normalize()),o=t.clone().addScaledVector(n.clone().normalize(),e/2);return r.jsxs("mesh",{position:o,quaternion:s,renderOrder:10,children:[r.jsx("coneGeometry",{args:[e*.35,e,16]}),r.jsx("meshBasicMaterial",{color:a,depthTest:!1,transparent:!0,opacity:i})]})}function L({points:t,color:n,width:e,opacity:a}){return r.jsx(et,{points:t,color:n,lineWidth:e,depthTest:!1,transparent:!0,opacity:a,renderOrder:10})}function A(t,n){const e=[...t];let a=n;for(;e.length>1;){const i=e[e.length-1],s=e[e.length-2],o=i.distanceTo(s);if(o>a)return e[e.length-1]=i.clone().lerp(s,a/o),e;a-=o,e.pop()}return e}function dt(t,n,e,a){const i=e*t,s=e*n,o=Math.abs(s-i),l=Math.max(2,Math.ceil(o/(2*Math.PI)*rt));return Array.from({length:l+1},(m,c)=>{const d=i+(s-i)*c/l,p=o*c/l/(2*Math.PI),_=a*(1+at*p);return new g(Math.cos(d)*_,Math.sin(d)*_,0)})}function pt(t,n,e,a){const i=t.theta??0,s=t.d??0,o=t.type==="PRISMATIC_JOINT",l=t.reverse_rotation_direction?-1:1,{lower_limit:m,upper_limit:c}=n;return O.useMemo(()=>{const d=new P().makeRotationZ(i).multiply(new P().makeTranslation(0,0,o?s/1e3:0)),p=(h,y,S)=>new g(h,y,S).applyMatrix4(d),_=new g().applyMatrix4(d),u=p(0,0,e),f=(o?[p(e*.25,0,l*m/1e3),p(e*.25,0,l*c/1e3)]:dt(m,c,l,e*.6)).map(h=>o?h:h.applyMatrix4(d)),b=p(o?e*.25:e*.6,0,0),M=f.slice(1).reduce((h,y,S)=>h+y.distanceTo(f[S]),0),v=Math.min(a,M/3),j=A(A(f,v).reverse(),v).reverse();return{axisPoints:[_,u],axisTip:u,origin:_,restPoints:[_,b],range:f,limitPoints:j,rangeStart:j[0],rangeEnd:j[j.length-1]}},[i,s,o,l,e,m,c,a])}function ut({frame:t,dh:n,limit:e,size:a,emphasis:i}){const s=i==="highlighted"?mt:1,o=i==="dimmed"?lt:1,l=a*.2*(i==="highlighted"?1.4:1),m=2*s,{axisPoints:c,axisTip:d,origin:p,restPoints:_,range:u,limitPoints:f,rangeStart:b,rangeEnd:M}=pt(n,e,a,l),{position:v,quaternion:j}=O.useMemo(()=>{const h=new g,y=new x;return t.decompose(h,y,new g),{position:h,quaternion:y}},[t]);return r.jsxs("group",{position:v,quaternion:j,children:[r.jsx(L,{points:c,color:J,width:m,opacity:o}),r.jsx(E,{base:d,direction:d.clone().sub(p),size:l,color:J,opacity:o}),r.jsx(L,{points:_,color:ot,width:1.5*s,opacity:o}),r.jsx(L,{points:f,color:N,width:m,opacity:o}),r.jsx(E,{base:b,direction:u[0].clone().sub(b),size:b.distanceTo(u[0]),color:N,opacity:o}),r.jsx(E,{base:M,direction:u[u.length-1].clone().sub(M),size:M.distanceTo(u[u.length-1]),color:N,opacity:o})]})}function R({dhParameters:t,chainOffset:n=null,limits:e,jointPositions:a,size:i=.15,highlightedJoint:s=null}){const o=O.useMemo(()=>it(t,n,a),[t,n,a]);return r.jsx("group",{children:o.map((l,m)=>{const c=ct(e[m]);return c?r.jsx(ut,{frame:l,dh:t[m],limit:c,size:i,emphasis:s===null?"normal":s===m?"highlighted":"dimmed"},m):null})})}try{R.displayName="JointLimitGizmo",R.__docgenInfo={description:`Draws joint axes and position ranges in NOVA's Z-up frame (joint axis =
local Z), in metres.

This library's robot visualizers ({@link SupportedRobot }, {@link Robot },
the DH fallback renderer) place robots in three.js's Y-up world and rotate
each joint about local Y. To overlay this gizmo on one of them, wrap it in
a group that rotates Z onto Y, e.g.:

\`\`\`tsx
<group rotation={[-Math.PI / 2, 0, 0]}>
  <JointLimitGizmo dhParameters={dhParameters} limits={limits} jointPositions={jointPositions} />
</group>
\`\`\`

Use the same \`dhParameters\` and displayed \`jointPositions\` as the robot.
The example above assumes identity mounting. For a mounted robot, wrap
this example in an outer group using the same mounting position (in metres)
and quaternion passed to the robot, and leave the gizmo's \`chainOffset\` null.
Passing that mounting pose as \`chainOffset\` here would also rotate it during
the Z-to-Y conversion.`,displayName:"JointLimitGizmo",props:{dhParameters:{defaultValue:null,description:"",name:"dhParameters",required:!0,type:{name:"DHParameter[]"}},chainOffset:{defaultValue:{value:"null"},description:"",name:"chainOffset",required:!1,type:{name:"any"}},limits:{defaultValue:null,description:"",name:"limits",required:!0,type:{name:"any[]"}},jointPositions:{defaultValue:null,description:"Radians for revolute joints; millimetres for prismatic joints.",name:"jointPositions",required:!1,type:{name:"number[]"}},size:{defaultValue:{value:"0.15"},description:"",name:"size",required:!1,type:{name:"number"}},highlightedJoint:{defaultValue:{value:"null"},description:"",name:"highlightedJoint",required:!1,type:{name:"number"}}}}}catch{}try{GizmoJointLimit.displayName="GizmoJointLimit",GizmoJointLimit.__docgenInfo={description:"Radians for revolute joints; millimetres for prismatic joints.",displayName:"GizmoJointLimit",props:{}}}catch{}const{expect:ht,fn:gt,waitFor:_t}=__STORYBOOK_MODULE_TEST__,Ht={title:"3D View/JointLimitGizmo",component:R,tags:["!dev"],parameters:{docs:{description:{component:"Joint axes and position limits for a DH chain in NOVA's Z-up frame (joint axis = local Z). Revolute positions are radians; prismatic positions and DH lengths are millimetres. Rendered lengths and marker size are metres. This library's robot visualizers place robots in three.js's Y-up world and rotate each joint about local Y instead, so overlaying the gizmo on a rendered robot needs an outer `rotation={[-Math.PI / 2, 0, 0]}` group to rotate Z onto Y — see the 'On a robot' story."}}},argTypes:{size:{control:{type:"range",min:.05,max:.3,step:.01}},highlightedJoint:{control:"select",options:[null,0,1,2]},jointPositions:{control:"object"},dhParameters:{control:"object"},chainOffset:{control:"object"},limits:{control:"object"}}},I={args:{dhParameters:[{a:400,d:200,alpha:Math.PI/2},{a:300,reverse_rotation_direction:!0},{d:100,type:"PRISMATIC_JOINT"}],limits:[{lower_limit:-Math.PI,upper_limit:Math.PI},{lower_limit:-2*Math.PI,upper_limit:2*Math.PI},{lower_limit:-100,upper_limit:300}],chainOffset:null,jointPositions:[Math.PI/6,Math.PI/4,100],size:.15,highlightedJoint:null},decorators:[t=>r.jsx("div",{style:{width:"100%",height:480},children:r.jsxs(tt,{lights:!1,camera:{position:[1.8,1.8,1.5],up:[0,0,1],fov:40},children:[r.jsx("gridHelper",{args:[2,20,"#6b7280","#343840"],rotation:[Math.PI/2,0,0]}),r.jsx(t,{})]})})],parameters:{docs:{description:{story:"Edit live joint positions, DH parameters, offsets and limits; select a highlighted joint or adjust marker size. The chain includes a reversed revolute joint, a multi-turn range and a prismatic joint."}}}},w={args:{...I.args,limits:[{lower_limit:Number.NEGATIVE_INFINITY,upper_limit:Number.POSITIVE_INFINITY},I.args.limits[1],I.args.limits[2]]},decorators:I.decorators,parameters:{docs:{description:{story:"Non-finite limits are skipped instead of crashing (joint 0 here has no bounded limit drawn)."}}}},q="UniversalRobots_UR5e",z=[.4,-.9,1.1,-.6,.8,.3],It={lower_limit:-2*Math.PI,upper_limit:2*Math.PI};function ft({dhParameters:t,postModelRender:n}){return O.useEffect(()=>()=>{X()},[]),r.jsx("div",{style:{width:"100%",height:"100vh",minHeight:400,display:"flex",justifyContent:"center",alignItems:"center"},children:r.jsxs(Z,{shadows:!0,children:[r.jsx(B,{}),r.jsxs(Q,{children:[r.jsx(K,{modelFromController:q,getModel:$,dhParameters:t,postModelRender:n,rapidlyChangingMotionState:{motion_group:"",controller:"",joint_position:z,tcp_pose:{position:[0,0,0],orientation:[0,0,0]},joint_limit_reached:{limit_reached:z.map(()=>!1)},sequence_number:0,standstill:!0,timestamp:new Date().toISOString(),description_revision:0}}),r.jsx("group",{rotation:[-Math.PI/2,0,0],children:r.jsx(R,{dhParameters:t,limits:t.map(()=>It),jointPositions:z,size:.12})})]})]})})}const T={args:{postModelRender:gt()},loaders:[async()=>({dhParameters:await W(q)})],play:async({args:t})=>{await _t(()=>ht(t.postModelRender).toHaveBeenCalled(),{timeout:8e3})},render:(t,{loaded:n})=>r.jsx(ft,{...t,dhParameters:n.dhParameters}),name:"On a robot",parameters:{docs:{description:{story:"The gizmo overlaid on a rendered UR5e, driven by the same DH parameters and joint positions as the robot itself. The gizmo is wrapped in `rotation={[-Math.PI / 2, 0, 0]}` to convert its Z-up frame to the robot visualizer's Y-up convention."}}}};var H,D,G;I.parameters={...I.parameters,docs:{...(H=I.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    dhParameters: [{
      a: 400,
      d: 200,
      alpha: Math.PI / 2
    }, {
      a: 300,
      reverse_rotation_direction: true
    }, {
      d: 100,
      type: "PRISMATIC_JOINT"
    }],
    limits: [{
      lower_limit: -Math.PI,
      upper_limit: Math.PI
    }, {
      lower_limit: -2 * Math.PI,
      upper_limit: 2 * Math.PI
    }, {
      lower_limit: -100,
      upper_limit: 300
    }],
    chainOffset: null,
    jointPositions: [Math.PI / 6, Math.PI / 4, 100],
    size: 0.15,
    highlightedJoint: null
  },
  decorators: [Story => <div style={{
    width: "100%",
    height: 480
  }}>
        <Setup lights={false} camera={{
      position: [1.8, 1.8, 1.5],
      up: [0, 0, 1],
      fov: 40
    }}>
          <gridHelper args={[2, 20, "#6b7280", "#343840"]} rotation={[Math.PI / 2, 0, 0]} />
          <Story />
        </Setup>
      </div>],
  parameters: {
    docs: {
      description: {
        story: "Edit live joint positions, DH parameters, offsets and limits; select a highlighted joint or adjust marker size. The chain includes a reversed revolute joint, a multi-turn range and a prismatic joint."
      }
    }
  }
} satisfies Story`,...(G=(D=I.parameters)==null?void 0:D.docs)==null?void 0:G.source}}};var C,V,k;w.parameters={...w.parameters,docs:{...(C=w.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    ...Interactive.args,
    // Real controllers never report an unbounded limit, but the gizmo
    // guards against one anyway instead of crashing with a \`RangeError\`.
    limits: [{
      lower_limit: Number.NEGATIVE_INFINITY,
      upper_limit: Number.POSITIVE_INFINITY
    }, Interactive.args.limits[1], Interactive.args.limits[2]]
  },
  decorators: Interactive.decorators,
  parameters: {
    docs: {
      description: {
        story: "Non-finite limits are skipped instead of crashing (joint 0 here has no bounded limit drawn)."
      }
    }
  }
} satisfies Story`,...(k=(V=w.parameters)==null?void 0:V.docs)==null?void 0:k.source}}};var U,Y,F;T.parameters={...T.parameters,docs:{...(U=T.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    postModelRender: fn()
  },
  loaders: [async () => ({
    dhParameters: await getDHParams(UR5E_MODEL)
  })],
  play: async ({
    args
  }) => {
    await waitFor(() => expect(args.postModelRender).toHaveBeenCalled(), {
      timeout: 8000
    });
  },
  render: (args, {
    loaded
  }) => <JointLimitGizmoOnRobotScene {...args} dhParameters={loaded.dhParameters as DHParameter[]} />,
  name: "On a robot",
  parameters: {
    docs: {
      description: {
        story: "The gizmo overlaid on a rendered UR5e, driven by the same DH parameters and joint positions as the robot itself. The gizmo is wrapped in \`rotation={[-Math.PI / 2, 0, 0]}\` to convert its Z-up frame to the robot visualizer's Y-up convention."
      }
    }
  }
}`,...(F=(Y=T.parameters)==null?void 0:Y.docs)==null?void 0:F.source}}};const Dt=["Interactive","UnboundedLimits","OnRobot"];export{I as Interactive,T as OnRobot,w as UnboundedLimits,Dt as __namedExportsOrder,Ht as default};
