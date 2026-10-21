import{r as w,j as r}from"./iframe-6oA2lFHu.js";import{C as Z,P as B}from"./PresetEnvironment-CAVtiT2F.js";import{g as W,r as X,O as Q,S as K,a as $}from"./robotStoryConfig-DzRHVSnm.js";import{S as tt}from"./Setup-C2XZv-Qs.js";import"./three.module-IMxEiD3l.js";import{b as _,V as g,Q as R}from"./three.core-EPGyoDIa.js";import{L as et}from"./Line-DS1s3RSd.js";import"./preload-helper-Dp1pzeXC.js";import"./with-selector-Cjkix74B.js";import"./index-Bb8JjhAW.js";import"./hooks-DPcBmqfz.js";import"./mobx.esm-D1cTsgoC.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-Bdu2hrYy.js";import"./context-BWZhWyts.js";import"./interpolation-CCLjt1Be.js";function nt(t){const i=(t==null?void 0:t.position)??[],e=(t==null?void 0:t.orientation)??[],a=new g(e[0]??0,e[1]??0,e[2]??0),n=a.length(),s=n>0?new R().setFromAxisAngle(a.normalize(),n):new R;return new _().compose(new g(i[0]??0,i[1]??0,i[2]??0).divideScalar(1e3),s,new g(1,1,1))}function it(t,i=null,e=[]){const a=nt(i);return t.map((n,s)=>{const o=a.clone(),c=(n.reverse_rotation_direction?-1:1)*(e[s]??0),m=n.type==="PRISMATIC_JOINT",l=(n.theta??0)+(m?0:c),d=(n.d??0)+(m?c:0);return a.multiply(new _().makeRotationZ(l)).multiply(new _().makeTranslation((n.a??0)/1e3,0,d/1e3)).multiply(new _().makeRotationX(n.alpha??0)),o})}const N="#ff4b4b",J="#2fa8ff",ot="#8a8d9e",rt=96,at=.15,st=new g(0,1,0),lt=.2,ct=2;function E({base:t,direction:i,size:e,color:a,opacity:n}){const s=new R().setFromUnitVectors(st,i.clone().normalize()),o=t.clone().addScaledVector(i.clone().normalize(),e/2);return r.jsxs("mesh",{position:o,quaternion:s,renderOrder:10,children:[r.jsx("coneGeometry",{args:[e*.35,e,16]}),r.jsx("meshBasicMaterial",{color:a,depthTest:!1,transparent:!0,opacity:n})]})}function z({points:t,color:i,width:e,opacity:a}){return r.jsx(et,{points:t,color:i,lineWidth:e,depthTest:!1,transparent:!0,opacity:a,renderOrder:10})}function G(t,i){const e=[...t];let a=i;for(;e.length>1;){const n=e[e.length-1],s=e[e.length-2],o=n.distanceTo(s);if(o>a)return e[e.length-1]=n.clone().lerp(s,a/o),e;a-=o,e.pop()}return e}function mt(t,i,e,a){const n=e*t,s=e*i,o=Math.abs(s-n),c=Math.max(2,Math.ceil(o/(2*Math.PI)*rt));return Array.from({length:c+1},(m,l)=>{const d=n+(s-n)*l/c,p=o*l/c/(2*Math.PI),v=a*(1+at*p);return new g(Math.cos(d)*v,Math.sin(d)*v,0)})}function dt(t,i,e,a){const n=t.theta??0,s=t.d??0,o=t.type==="PRISMATIC_JOINT",c=t.reverse_rotation_direction?-1:1,{negative:m,positive:l}=i;return w.useMemo(()=>{const d=new _().makeRotationZ(n).multiply(new _().makeTranslation(0,0,o?s/1e3:0)),p=(h,P,S)=>new g(h,P,S).applyMatrix4(d),v=new g().applyMatrix4(d),u=p(0,0,e),f=(o?[p(e*.25,0,c*m/1e3),p(e*.25,0,c*l/1e3)]:mt(m,l,c,e*.6)).map(h=>o?h:h.applyMatrix4(d)),y=p(o?e*.25:e*.6,0,0),b=f.slice(1).reduce((h,P,S)=>h+P.distanceTo(f[S]),0),M=Math.min(a,b/3),j=G(G(f,M).reverse(),M).reverse();return{axisPoints:[v,u],axisTip:u,origin:v,restPoints:[v,y],range:f,limitPoints:j,rangeStart:j[0],rangeEnd:j[j.length-1]}},[n,s,o,c,e,m,l,a])}function pt({frame:t,dh:i,limit:e,size:a,emphasis:n}){const s=n==="highlighted"?ct:1,o=n==="dimmed"?lt:1,c=a*.2*(n==="highlighted"?1.4:1),m=2*s,{axisPoints:l,axisTip:d,origin:p,restPoints:v,range:u,limitPoints:f,rangeStart:y,rangeEnd:b}=dt(i,e,a,c),{position:M,quaternion:j}=w.useMemo(()=>{const h=new g,P=new R;return t.decompose(h,P,new g),{position:h,quaternion:P}},[t]);return r.jsxs("group",{position:M,quaternion:j,children:[r.jsx(z,{points:l,color:J,width:m,opacity:o}),r.jsx(E,{base:d,direction:d.clone().sub(p),size:c,color:J,opacity:o}),r.jsx(z,{points:v,color:ot,width:1.5*s,opacity:o}),r.jsx(z,{points:f,color:N,width:m,opacity:o}),r.jsx(E,{base:y,direction:u[0].clone().sub(y),size:y.distanceTo(u[0]),color:N,opacity:o}),r.jsx(E,{base:b,direction:u[u.length-1].clone().sub(b),size:b.distanceTo(u[u.length-1]),color:N,opacity:o})]})}function O({dhParameters:t,chainOffset:i=null,limits:e,jointPositions:a,size:n=.15,highlightedJoint:s=null}){const o=w.useMemo(()=>it(t,i,a),[t,i,a]);return r.jsx("group",{children:o.map((c,m)=>{const l=e[m];return!l||!Number.isFinite(l.negative)||!Number.isFinite(l.positive)||!(l.negative<l.positive)?null:r.jsx(pt,{frame:c,dh:t[m],limit:l,size:n,emphasis:s===null?"normal":s===m?"highlighted":"dimmed"},m)})})}try{O.displayName="JointLimitGizmo",O.__docgenInfo={description:`Draws joint axes and position ranges in NOVA's Z-up frame (joint axis =
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

using the same \`dhParameters\`/\`chainOffset\`/\`jointPositions\` passed to the
robot so the markers line up with its joints.`,displayName:"JointLimitGizmo",props:{dhParameters:{defaultValue:null,description:"",name:"dhParameters",required:!0,type:{name:"GizmoDhParameter[]"}},chainOffset:{defaultValue:{value:"null"},description:"",name:"chainOffset",required:!1,type:{name:"GizmoChainOffset"}},limits:{defaultValue:null,description:"",name:"limits",required:!0,type:{name:"GizmoJointLimit[]"}},jointPositions:{defaultValue:null,description:"Radians for revolute joints; millimetres for prismatic joints.",name:"jointPositions",required:!1,type:{name:"number[]"}},size:{defaultValue:{value:"0.15"},description:"",name:"size",required:!1,type:{name:"number"}},highlightedJoint:{defaultValue:{value:"null"},description:"",name:"highlightedJoint",required:!1,type:{name:"number"}}}}}catch{}try{GizmoJointLimit.displayName="GizmoJointLimit",GizmoJointLimit.__docgenInfo={description:"Radians for revolute joints; millimetres for prismatic joints.",displayName:"GizmoJointLimit",props:{}}}catch{}const{expect:ut,fn:ht,waitFor:gt}=__STORYBOOK_MODULE_TEST__,Gt={title:"3D View/JointLimitGizmo",component:O,tags:["!dev"],parameters:{docs:{description:{component:"Joint axes and position limits for a DH chain in NOVA's Z-up frame (joint axis = local Z). Revolute positions are radians; prismatic positions and DH lengths are millimetres. Rendered lengths and marker size are metres. This library's robot visualizers place robots in three.js's Y-up world and rotate each joint about local Y instead, so overlaying the gizmo on a rendered robot needs an outer `rotation={[-Math.PI / 2, 0, 0]}` group to rotate Z onto Y — see the 'On a robot' story."}}},argTypes:{size:{control:{type:"range",min:.05,max:.3,step:.01}},highlightedJoint:{control:"select",options:[null,0,1,2]},jointPositions:{control:"object"},dhParameters:{control:"object"},chainOffset:{control:"object"},limits:{control:"object"}}},I={args:{dhParameters:[{a:400,d:200,alpha:Math.PI/2},{a:300,reverse_rotation_direction:!0},{d:100,type:"PRISMATIC_JOINT"}],limits:[{negative:-Math.PI,positive:Math.PI},{negative:-2*Math.PI,positive:2*Math.PI},{negative:-100,positive:300}],chainOffset:null,jointPositions:[Math.PI/6,Math.PI/4,100],size:.15,highlightedJoint:null},decorators:[t=>r.jsx("div",{style:{width:"100%",height:480},children:r.jsxs(tt,{lights:!1,camera:{position:[1.8,1.8,1.5],up:[0,0,1],fov:40},children:[r.jsx("gridHelper",{args:[2,20,"#6b7280","#343840"],rotation:[Math.PI/2,0,0]}),r.jsx(t,{})]})})],parameters:{docs:{description:{story:"Edit live joint positions, DH parameters, offsets and limits; select a highlighted joint or adjust marker size. The chain includes a reversed revolute joint, a multi-turn range and a prismatic joint."}}}},T={args:{...I.args,limits:[{negative:Number.NEGATIVE_INFINITY,positive:Number.POSITIVE_INFINITY},I.args.limits[1],I.args.limits[2]]},decorators:I.decorators,parameters:{docs:{description:{story:"Non-finite limits are skipped instead of crashing (joint 0 here has no bounded limit drawn)."}}}},q="UniversalRobots_UR5e",L=[.4,-.9,1.1,-.6,.8,.3],vt={negative:-2*Math.PI,positive:2*Math.PI};function It({dhParameters:t,postModelRender:i}){return w.useEffect(()=>()=>{X()},[]),r.jsx("div",{style:{width:"100%",height:"100vh",minHeight:400,display:"flex",justifyContent:"center",alignItems:"center"},children:r.jsxs(Z,{shadows:!0,children:[r.jsx(B,{}),r.jsxs(Q,{children:[r.jsx(K,{modelFromController:q,getModel:$,dhParameters:t,postModelRender:i,rapidlyChangingMotionState:{motion_group:"",controller:"",joint_position:L,tcp_pose:{position:[0,0,0],orientation:[0,0,0]},joint_limit_reached:{limit_reached:L.map(()=>!1)},sequence_number:0,standstill:!0,timestamp:new Date().toISOString(),description_revision:0}}),r.jsx("group",{rotation:[-Math.PI/2,0,0],children:r.jsx(O,{dhParameters:t,limits:t.map(()=>vt),jointPositions:L,size:.12})})]})]})})}const x={args:{postModelRender:ht()},loaders:[async()=>({dhParameters:await W(q)})],play:async({args:t})=>{await gt(()=>ut(t.postModelRender).toHaveBeenCalled(),{timeout:8e3})},render:(t,{loaded:i})=>r.jsx(It,{...t,dhParameters:i.dhParameters}),name:"On a robot",parameters:{docs:{description:{story:"The gizmo overlaid on a rendered UR5e, driven by the same DH parameters and joint positions as the robot itself. The gizmo is wrapped in `rotation={[-Math.PI / 2, 0, 0]}` to convert its Z-up frame to the robot visualizer's Y-up convention."}}}};var A,C,D;I.parameters={...I.parameters,docs:{...(A=I.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
      negative: -Math.PI,
      positive: Math.PI
    }, {
      negative: -2 * Math.PI,
      positive: 2 * Math.PI
    }, {
      negative: -100,
      positive: 300
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
} satisfies Story`,...(D=(C=I.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var H,k,V;T.parameters={...T.parameters,docs:{...(H=T.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    ...Interactive.args,
    // Real controllers never report an unbounded limit, but the gizmo
    // guards against one anyway instead of crashing with a \`RangeError\`.
    limits: [{
      negative: Number.NEGATIVE_INFINITY,
      positive: Number.POSITIVE_INFINITY
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
} satisfies Story`,...(V=(k=T.parameters)==null?void 0:k.docs)==null?void 0:V.source}}};var U,Y,F;x.parameters={...x.parameters,docs:{...(U=x.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
}`,...(F=(Y=x.parameters)==null?void 0:Y.docs)==null?void 0:F.source}}};const At=["Interactive","UnboundedLimits","OnRobot"];export{I as Interactive,x as OnRobot,T as UnboundedLimits,At as __namedExportsOrder,Gt as default};
