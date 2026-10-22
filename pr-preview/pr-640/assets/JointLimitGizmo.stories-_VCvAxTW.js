import{r as R,j as r}from"./iframe-CcEZ_qSY.js";import{C as Z,P as B}from"./PresetEnvironment-DRkW9XCm.js";import{g as W,r as X,O as Q,S as K,a as $}from"./robotStoryConfig-C4GLf66t.js";import{S as tt}from"./Setup-BRa_4RkI.js";import"./three.module-IMxEiD3l.js";import{b as y,V as g,Q as T}from"./three.core-EPGyoDIa.js";import{L as et}from"./Line-hRd74FBr.js";import"./preload-helper-Dp1pzeXC.js";import"./with-selector-BeDCvjAq.js";import"./index-Bb8JjhAW.js";import"./hooks-DTZMYzxf.js";import"./mobx.esm-D1cTsgoC.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-D17srCFj.js";import"./context-C2W6U0go.js";import"./interpolation-CCuuPRij.js";function nt(t){const i=(t==null?void 0:t.position)??[],e=(t==null?void 0:t.orientation)??[],a=new g(e[0]??0,e[1]??0,e[2]??0),n=a.length(),s=n>0?new T().setFromAxisAngle(a.normalize(),n):new T;return new y().compose(new g(i[0]??0,i[1]??0,i[2]??0).divideScalar(1e3),s,new g(1,1,1))}function it(t,i=null,e=[]){const a=nt(i);return t.map((n,s)=>{const o=a.clone(),m=(n.reverse_rotation_direction?-1:1)*(e[s]??0),c=n.type==="PRISMATIC_JOINT",l=(n.theta??0)+(c?0:m),d=(n.d??0)+(c?m:0);return a.multiply(new y().makeRotationZ(l)).multiply(new y().makeTranslation((n.a??0)/1e3,0,d/1e3)).multiply(new y().makeRotationX(n.alpha??0)),o})}const S="#ff4b4b",J="#2fa8ff",ot="#8a8d9e",rt=96,at=.15,st=new g(0,1,0),lt=.2,mt=2;function N({base:t,direction:i,size:e,color:a,opacity:n}){const s=new T().setFromUnitVectors(st,i.clone().normalize()),o=t.clone().addScaledVector(i.clone().normalize(),e/2);return r.jsxs("mesh",{position:o,quaternion:s,renderOrder:10,children:[r.jsx("coneGeometry",{args:[e*.35,e,16]}),r.jsx("meshBasicMaterial",{color:a,depthTest:!1,transparent:!0,opacity:n})]})}function E({points:t,color:i,width:e,opacity:a}){return r.jsx(et,{points:t,color:i,lineWidth:e,depthTest:!1,transparent:!0,opacity:a,renderOrder:10})}function G(t,i){const e=[...t];let a=i;for(;e.length>1;){const n=e[e.length-1],s=e[e.length-2],o=n.distanceTo(s);if(o>a)return e[e.length-1]=n.clone().lerp(s,a/o),e;a-=o,e.pop()}return e}function ct(t,i,e,a){const n=e*t,s=e*i,o=Math.abs(s-n),m=Math.max(2,Math.ceil(o/(2*Math.PI)*rt));return Array.from({length:m+1},(c,l)=>{const d=n+(s-n)*l/m,p=o*l/m/(2*Math.PI),I=a*(1+at*p);return new g(Math.cos(d)*I,Math.sin(d)*I,0)})}function dt(t,i,e,a){const n=t.theta??0,s=t.d??0,o=t.type==="PRISMATIC_JOINT",m=t.reverse_rotation_direction?-1:1,{lowerLimit:c,upperLimit:l}=i;return R.useMemo(()=>{const d=new y().makeRotationZ(n).multiply(new y().makeTranslation(0,0,o?s/1e3:0)),p=(h,_,O)=>new g(h,_,O).applyMatrix4(d),I=new g().applyMatrix4(d),u=p(0,0,e),j=(o?[p(e*.25,0,m*c/1e3),p(e*.25,0,m*l/1e3)]:ct(c,l,m,e*.6)).map(h=>o?h:h.applyMatrix4(d)),b=p(o?e*.25:e*.6,0,0),M=j.slice(1).reduce((h,_,O)=>h+_.distanceTo(j[O]),0),v=Math.min(a,M/3),P=G(G(j,v).reverse(),v).reverse();return{axisPoints:[I,u],axisTip:u,origin:I,restPoints:[I,b],range:j,limitPoints:P,rangeStart:P[0],rangeEnd:P[P.length-1]}},[n,s,o,m,e,c,l,a])}function pt({frame:t,dh:i,limit:e,size:a,emphasis:n}){const s=n==="highlighted"?mt:1,o=n==="dimmed"?lt:1,m=a*.2*(n==="highlighted"?1.4:1),c=2*s,{axisPoints:l,axisTip:d,origin:p,restPoints:I,range:u,limitPoints:j,rangeStart:b,rangeEnd:M}=dt(i,e,a,m),{position:v,quaternion:P}=R.useMemo(()=>{const h=new g,_=new T;return t.decompose(h,_,new g),{position:h,quaternion:_}},[t]);return r.jsxs("group",{position:v,quaternion:P,children:[r.jsx(E,{points:l,color:J,width:c,opacity:o}),r.jsx(N,{base:d,direction:d.clone().sub(p),size:m,color:J,opacity:o}),r.jsx(E,{points:I,color:ot,width:1.5*s,opacity:o}),r.jsx(E,{points:j,color:S,width:c,opacity:o}),r.jsx(N,{base:b,direction:u[0].clone().sub(b),size:b.distanceTo(u[0]),color:S,opacity:o}),r.jsx(N,{base:M,direction:u[u.length-1].clone().sub(M),size:M.distanceTo(u[u.length-1]),color:S,opacity:o})]})}function x({dhParameters:t,chainOffset:i=null,limits:e,jointPositions:a,size:n=.15,highlightedJoint:s=null}){const o=R.useMemo(()=>it(t,i,a),[t,i,a]);return r.jsx("group",{children:o.map((m,c)=>{const l=e[c];return!l||!Number.isFinite(l.lowerLimit)||!Number.isFinite(l.upperLimit)||!(l.lowerLimit<l.upperLimit)?null:r.jsx(pt,{frame:m,dh:t[c],limit:l,size:n,emphasis:s===null?"normal":s===c?"highlighted":"dimmed"},c)})})}try{x.displayName="JointLimitGizmo",x.__docgenInfo={description:`Draws joint axes and position ranges in NOVA's Z-up frame (joint axis =
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
robot so the markers line up with its joints.`,displayName:"JointLimitGizmo",props:{dhParameters:{defaultValue:null,description:"",name:"dhParameters",required:!0,type:{name:"GizmoDhParameter[]"}},chainOffset:{defaultValue:{value:"null"},description:"",name:"chainOffset",required:!1,type:{name:"GizmoChainOffset"}},limits:{defaultValue:null,description:"",name:"limits",required:!0,type:{name:"GizmoJointLimit[]"}},jointPositions:{defaultValue:null,description:"Radians for revolute joints; millimetres for prismatic joints.",name:"jointPositions",required:!1,type:{name:"number[]"}},size:{defaultValue:{value:"0.15"},description:"",name:"size",required:!1,type:{name:"number"}},highlightedJoint:{defaultValue:{value:"null"},description:"",name:"highlightedJoint",required:!1,type:{name:"number"}}}}}catch{}try{GizmoJointLimit.displayName="GizmoJointLimit",GizmoJointLimit.__docgenInfo={description:"Radians for revolute joints; millimetres for prismatic joints.",displayName:"GizmoJointLimit",props:{}}}catch{}const{expect:ut,fn:ht,waitFor:gt}=__STORYBOOK_MODULE_TEST__,Gt={title:"3D View/JointLimitGizmo",component:x,tags:["!dev"],parameters:{docs:{description:{component:"Joint axes and position limits for a DH chain in NOVA's Z-up frame (joint axis = local Z). Revolute positions are radians; prismatic positions and DH lengths are millimetres. Rendered lengths and marker size are metres. This library's robot visualizers place robots in three.js's Y-up world and rotate each joint about local Y instead, so overlaying the gizmo on a rendered robot needs an outer `rotation={[-Math.PI / 2, 0, 0]}` group to rotate Z onto Y — see the 'On a robot' story."}}},argTypes:{size:{control:{type:"range",min:.05,max:.3,step:.01}},highlightedJoint:{control:"select",options:[null,0,1,2]},jointPositions:{control:"object"},dhParameters:{control:"object"},chainOffset:{control:"object"},limits:{control:"object"}}},f={args:{dhParameters:[{a:400,d:200,alpha:Math.PI/2},{a:300,reverse_rotation_direction:!0},{d:100,type:"PRISMATIC_JOINT"}],limits:[{lowerLimit:-Math.PI,upperLimit:Math.PI},{lowerLimit:-2*Math.PI,upperLimit:2*Math.PI},{lowerLimit:-100,upperLimit:300}],chainOffset:null,jointPositions:[Math.PI/6,Math.PI/4,100],size:.15,highlightedJoint:null},decorators:[t=>r.jsx("div",{style:{width:"100%",height:480},children:r.jsxs(tt,{lights:!1,camera:{position:[1.8,1.8,1.5],up:[0,0,1],fov:40},children:[r.jsx("gridHelper",{args:[2,20,"#6b7280","#343840"],rotation:[Math.PI/2,0,0]}),r.jsx(t,{})]})})],parameters:{docs:{description:{story:"Edit live joint positions, DH parameters, offsets and limits; select a highlighted joint or adjust marker size. The chain includes a reversed revolute joint, a multi-turn range and a prismatic joint."}}}},w={args:{...f.args,limits:[{lowerLimit:Number.NEGATIVE_INFINITY,upperLimit:Number.POSITIVE_INFINITY},f.args.limits[1],f.args.limits[2]]},decorators:f.decorators,parameters:{docs:{description:{story:"Non-finite limits are skipped instead of crashing (joint 0 here has no bounded limit drawn)."}}}},q="UniversalRobots_UR5e",z=[.4,-.9,1.1,-.6,.8,.3],It={lowerLimit:-2*Math.PI,upperLimit:2*Math.PI};function ft({dhParameters:t,postModelRender:i}){return R.useEffect(()=>()=>{X()},[]),r.jsx("div",{style:{width:"100%",height:"100vh",minHeight:400,display:"flex",justifyContent:"center",alignItems:"center"},children:r.jsxs(Z,{shadows:!0,children:[r.jsx(B,{}),r.jsxs(Q,{children:[r.jsx(K,{modelFromController:q,getModel:$,dhParameters:t,postModelRender:i,rapidlyChangingMotionState:{motion_group:"",controller:"",joint_position:z,tcp_pose:{position:[0,0,0],orientation:[0,0,0]},joint_limit_reached:{limit_reached:z.map(()=>!1)},sequence_number:0,standstill:!0,timestamp:new Date().toISOString(),description_revision:0}}),r.jsx("group",{rotation:[-Math.PI/2,0,0],children:r.jsx(x,{dhParameters:t,limits:t.map(()=>It),jointPositions:z,size:.12})})]})]})})}const L={args:{postModelRender:ht()},loaders:[async()=>({dhParameters:await W(q)})],play:async({args:t})=>{await gt(()=>ut(t.postModelRender).toHaveBeenCalled(),{timeout:8e3})},render:(t,{loaded:i})=>r.jsx(ft,{...t,dhParameters:i.dhParameters}),name:"On a robot",parameters:{docs:{description:{story:"The gizmo overlaid on a rendered UR5e, driven by the same DH parameters and joint positions as the robot itself. The gizmo is wrapped in `rotation={[-Math.PI / 2, 0, 0]}` to convert its Z-up frame to the robot visualizer's Y-up convention."}}}};var A,C,D;f.parameters={...f.parameters,docs:{...(A=f.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
      lowerLimit: -Math.PI,
      upperLimit: Math.PI
    }, {
      lowerLimit: -2 * Math.PI,
      upperLimit: 2 * Math.PI
    }, {
      lowerLimit: -100,
      upperLimit: 300
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
} satisfies Story`,...(D=(C=f.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var H,k,V;w.parameters={...w.parameters,docs:{...(H=w.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    ...Interactive.args,
    // Real controllers never report an unbounded limit, but the gizmo
    // guards against one anyway instead of crashing with a \`RangeError\`.
    limits: [{
      lowerLimit: Number.NEGATIVE_INFINITY,
      upperLimit: Number.POSITIVE_INFINITY
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
} satisfies Story`,...(V=(k=w.parameters)==null?void 0:k.docs)==null?void 0:V.source}}};var U,Y,F;L.parameters={...L.parameters,docs:{...(U=L.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
}`,...(F=(Y=L.parameters)==null?void 0:Y.docs)==null?void 0:F.source}}};const At=["Interactive","UnboundedLimits","OnRobot"];export{f as Interactive,L as OnRobot,w as UnboundedLimits,At as __namedExportsOrder,Gt as default};
