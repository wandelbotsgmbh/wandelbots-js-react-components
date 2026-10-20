import{r as D,j as s}from"./iframe-DxjNtV5G.js";import{S as H}from"./Setup-4T8C6GYB.js";import"./three.module-IMxEiD3l.js";import{b as f,V as h,Q as O}from"./three.core-EPGyoDIa.js";import{L as q}from"./Line-CVOre79s.js";import"./preload-helper-Dp1pzeXC.js";import"./PresetEnvironment-D4WNHpzB.js";import"./with-selector-3gv8GRx_.js";import"./index-Bb8JjhAW.js";function k(e){const o=(e==null?void 0:e.position)??[],t=(e==null?void 0:e.orientation)??[],n=new h(t[0]??0,t[1]??0,t[2]??0),i=n.length(),r=i>0?new O().setFromAxisAngle(n.normalize(),i):new O;return new f().compose(new h(o[0]??0,o[1]??0,o[2]??0).divideScalar(1e3),r,new h(1,1,1))}function z(e,o=null,t=[]){const n=k(o);return e.map((i,r)=>{const a=n.clone(),d=(i.reverse_rotation_direction?-1:1)*(t[r]??0),c=i.type==="PRISMATIC_JOINT",l=(i.theta??0)+(c?0:d),u=(i.d??0)+(c?d:0);return n.multiply(new f().makeRotationZ(l)).multiply(new f().makeTranslation((i.a??0)/1e3,0,u/1e3)).multiply(new f().makeRotationX(i.alpha??0)),a})}const x="#ff4b4b",b="#2fa8ff",G="#8a8d9e",F=96,U=.15,W=new h(0,1,0),X=.2,Z=2;function T({base:e,direction:o,size:t,color:n,opacity:i}){const r=new O().setFromUnitVectors(W,o.clone().normalize()),a=e.clone().addScaledVector(o.clone().normalize(),t/2);return s.jsxs("mesh",{position:a,quaternion:r,renderOrder:10,children:[s.jsx("coneGeometry",{args:[t*.35,t,16]}),s.jsx("meshBasicMaterial",{color:n,depthTest:!1,transparent:!0,opacity:i})]})}function R({points:e,color:o,width:t,opacity:n}){return s.jsx(q,{points:e,color:o,lineWidth:t,depthTest:!1,transparent:!0,opacity:n,renderOrder:10})}function S(e,o){const t=[...e];let n=o;for(;t.length>1;){const i=t[t.length-1],r=t[t.length-2],a=i.distanceTo(r);if(a>n)return t[t.length-1]=i.clone().lerp(r,n/a),t;n-=a,t.pop()}return t}function Q(e,o,t,n){const i=t*o.negative,r=t*o.positive,a=Math.abs(r-i),d=Math.max(2,Math.ceil(a/(2*Math.PI)*F));return Array.from({length:d+1},(c,l)=>{const u=i+(r-i)*l/d,m=a*l/d/(2*Math.PI),g=n*(1+U*m);return new h(Math.cos(u)*g,Math.sin(u)*g,0).applyMatrix4(e)})}function Y({frame:e,dh:o,limit:t,size:n,emphasis:i}){const r=o.reverse_rotation_direction?-1:1,a=o.type==="PRISMATIC_JOINT",d=new h().applyMatrix4(e),c=(M,y,P)=>new h(M,y,P).applyMatrix4(e),l=c(0,0,n),u=i==="highlighted"?Z:1,m=i==="dimmed"?X:1,g=n*.2*(i==="highlighted"?1.4:1),w=2*u,p=a?[c(n*.25,0,r*t.negative/1e3),c(n*.25,0,r*t.positive/1e3)]:Q(e,t,r,n*.6),N=c(a?n*.25:n*.6,0,0),C=p.slice(1).reduce((M,y,P)=>M+y.distanceTo(p[P]),0),J=Math.min(g,C/3),j=S(S(p,J).reverse(),J).reverse(),_=j[0],I=j[j.length-1];return s.jsxs("group",{children:[s.jsx(R,{points:[d,l],color:b,width:w,opacity:m}),s.jsx(T,{base:l,direction:l.clone().sub(d),size:g,color:b,opacity:m}),s.jsx(R,{points:[d,N],color:G,width:1.5*u,opacity:m}),s.jsx(R,{points:j,color:x,width:w,opacity:m}),s.jsx(T,{base:_,direction:p[0].clone().sub(_),size:_.distanceTo(p[0]),color:x,opacity:m}),s.jsx(T,{base:I,direction:p[p.length-1].clone().sub(I),size:I.distanceTo(p[p.length-1]),color:x,opacity:m})]})}function L({dhParameters:e,chainOffset:o=null,limits:t,jointPositions:n,size:i=.15,highlightedJoint:r=null}){const a=D.useMemo(()=>z(e,o,n),[e,o,n]);return s.jsx("group",{children:a.map((d,c)=>{const l=t[c];return!l||!(l.negative<l.positive)?null:s.jsx(Y,{frame:d,dh:e[c],limit:l,size:i,emphasis:r===null?"normal":r===c?"highlighted":"dimmed"},c)})})}try{L.displayName="JointLimits",L.__docgenInfo={description:"Draws joint axes and position ranges in NOVA's Z-up frame, in metres.",displayName:"JointLimits",props:{dhParameters:{defaultValue:null,description:"",name:"dhParameters",required:!0,type:{name:"DhParameter[]"}},chainOffset:{defaultValue:{value:"null"},description:"",name:"chainOffset",required:!1,type:{name:"ChainOffset"}},limits:{defaultValue:null,description:"",name:"limits",required:!0,type:{name:"JointLimit[]"}},jointPositions:{defaultValue:null,description:"Radians for revolute joints; millimetres for prismatic joints.",name:"jointPositions",required:!1,type:{name:"number[]"}},size:{defaultValue:{value:"0.15"},description:"",name:"size",required:!1,type:{name:"number"}},highlightedJoint:{defaultValue:{value:"null"},description:"",name:"highlightedJoint",required:!1,type:{name:"number"}}}}}catch{}try{JointLimit.displayName="JointLimit",JointLimit.__docgenInfo={description:"Radians for revolute joints; millimetres for prismatic joints.",displayName:"JointLimit",props:{}}}catch{}const st={title:"3D View/JointLimits",component:L,tags:["!dev"],parameters:{docs:{description:{component:"Joint axes and position limits for a DH chain in NOVA's Z-up frame. Revolute positions are radians; prismatic positions and DH lengths are millimetres. Rendered lengths and marker size are metres."}}},argTypes:{size:{control:{type:"range",min:.05,max:.3,step:.01}},highlightedJoint:{control:"select",options:[null,0,1,2]},jointPositions:{control:"object"},dhParameters:{control:"object"},chainOffset:{control:"object"},limits:{control:"object"}},decorators:[e=>s.jsx("div",{style:{width:"100%",height:480},children:s.jsxs(H,{lights:!1,camera:{position:[1.8,1.8,1.5],up:[0,0,1],fov:40},children:[s.jsx("gridHelper",{args:[2,20,"#6b7280","#343840"],rotation:[Math.PI/2,0,0]}),s.jsx(e,{})]})})]},v={args:{dhParameters:[{a:400,d:200,alpha:Math.PI/2},{a:300,reverse_rotation_direction:!0},{d:100,type:"PRISMATIC_JOINT"}],limits:[{negative:-Math.PI,positive:Math.PI},{negative:-2*Math.PI,positive:2*Math.PI},{negative:-100,positive:300}],chainOffset:null,jointPositions:[Math.PI/6,Math.PI/4,100],size:.15,highlightedJoint:null},parameters:{docs:{description:{story:"Edit live joint positions, DH parameters, offsets and limits; select a highlighted joint or adjust marker size. The chain includes a reversed revolute joint, a multi-turn range and a prismatic joint."}}}};var A,E,V;v.parameters={...v.parameters,docs:{...(A=v.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
  parameters: {
    docs: {
      description: {
        story: "Edit live joint positions, DH parameters, offsets and limits; select a highlighted joint or adjust marker size. The chain includes a reversed revolute joint, a multi-turn range and a prismatic joint."
      }
    }
  }
} satisfies Story`,...(V=(E=v.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};const at=["Interactive"];export{v as Interactive,at as __namedExportsOrder,st as default};
