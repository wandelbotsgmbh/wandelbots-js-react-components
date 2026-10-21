import{r as D,j as a}from"./iframe-C-1QXTc1.js";import{S as H}from"./Setup-BMdAnle8.js";import"./three.module-IMxEiD3l.js";import{b as g,V as h,Q as O}from"./three.core-EPGyoDIa.js";import{L as q}from"./Line-Byt5ChDQ.js";import"./preload-helper-Dp1pzeXC.js";import"./PresetEnvironment-CKwe7_fQ.js";import"./with-selector--v_B4V4j.js";import"./index-Bb8JjhAW.js";function z(e){const o=(e==null?void 0:e.position)??[],t=(e==null?void 0:e.orientation)??[],n=new h(t[0]??0,t[1]??0,t[2]??0),i=n.length(),r=i>0?new O().setFromAxisAngle(n.normalize(),i):new O;return new g().compose(new h(o[0]??0,o[1]??0,o[2]??0).divideScalar(1e3),r,new h(1,1,1))}function F(e,o=null,t=[]){const n=z(o);return e.map((i,r)=>{const s=n.clone(),c=(i.reverse_rotation_direction?-1:1)*(t[r]??0),m=i.type==="PRISMATIC_JOINT",l=(i.theta??0)+(m?0:c),u=(i.d??0)+(m?c:0);return n.multiply(new g().makeRotationZ(l)).multiply(new g().makeTranslation((i.a??0)/1e3,0,u/1e3)).multiply(new g().makeRotationX(i.alpha??0)),s})}const x="#ff4b4b",S="#2fa8ff",G="#8a8d9e",Z=96,U=.15,W=new h(0,1,0),X=.2,Q=2;function T({base:e,direction:o,size:t,color:n,opacity:i}){const r=new O().setFromUnitVectors(W,o.clone().normalize()),s=e.clone().addScaledVector(o.clone().normalize(),t/2);return a.jsxs("mesh",{position:s,quaternion:r,renderOrder:10,children:[a.jsx("coneGeometry",{args:[t*.35,t,16]}),a.jsx("meshBasicMaterial",{color:n,depthTest:!1,transparent:!0,opacity:i})]})}function R({points:e,color:o,width:t,opacity:n}){return a.jsx(q,{points:e,color:o,lineWidth:t,depthTest:!1,transparent:!0,opacity:n,renderOrder:10})}function A(e,o){const t=[...e];let n=o;for(;t.length>1;){const i=t[t.length-1],r=t[t.length-2],s=i.distanceTo(r);if(s>n)return t[t.length-1]=i.clone().lerp(r,n/s),t;n-=s,t.pop()}return t}function Y(e,o,t,n){const i=t*o.negative,r=t*o.positive,s=Math.abs(r-i),c=Math.max(2,Math.ceil(s/(2*Math.PI)*Z));return Array.from({length:c+1},(m,l)=>{const u=i+(r-i)*l/c,f=s*l/c/(2*Math.PI),d=n*(1+U*f);return new h(Math.cos(u)*d,Math.sin(u)*d,0).applyMatrix4(e)})}function B({frame:e,dh:o,limit:t,size:n,emphasis:i}){const r=o.reverse_rotation_direction?-1:1,s=o.type==="PRISMATIC_JOINT",c=e.clone().multiply(new g().makeRotationZ(o.theta??0)).multiply(new g().makeTranslation(0,0,s?(o.d??0)/1e3:0)),m=new h().applyMatrix4(c),l=(M,y,P)=>new h(M,y,P).applyMatrix4(c),u=l(0,0,n),f=i==="highlighted"?Q:1,d=i==="dimmed"?X:1,L=n*.2*(i==="highlighted"?1.4:1),J=2*f,p=s?[l(n*.25,0,r*t.negative/1e3),l(n*.25,0,r*t.positive/1e3)]:Y(c,t,r,n*.6),C=l(s?n*.25:n*.6,0,0),k=p.slice(1).reduce((M,y,P)=>M+y.distanceTo(p[P]),0),b=Math.min(L,k/3),j=A(A(p,b).reverse(),b).reverse(),_=j[0],I=j[j.length-1];return a.jsxs("group",{children:[a.jsx(R,{points:[m,u],color:S,width:J,opacity:d}),a.jsx(T,{base:u,direction:u.clone().sub(m),size:L,color:S,opacity:d}),a.jsx(R,{points:[m,C],color:G,width:1.5*f,opacity:d}),a.jsx(R,{points:j,color:x,width:J,opacity:d}),a.jsx(T,{base:_,direction:p[0].clone().sub(_),size:_.distanceTo(p[0]),color:x,opacity:d}),a.jsx(T,{base:I,direction:p[p.length-1].clone().sub(I),size:I.distanceTo(p[p.length-1]),color:x,opacity:d})]})}function w({dhParameters:e,chainOffset:o=null,limits:t,jointPositions:n,size:i=.15,highlightedJoint:r=null}){const s=D.useMemo(()=>F(e,o,n),[e,o,n]);return a.jsx("group",{children:s.map((c,m)=>{const l=t[m];return!l||!(l.negative<l.positive)?null:a.jsx(B,{frame:c,dh:e[m],limit:l,size:i,emphasis:r===null?"normal":r===m?"highlighted":"dimmed"},m)})})}try{w.displayName="JointLimits",w.__docgenInfo={description:"Draws joint axes and position ranges in NOVA's Z-up frame, in metres.",displayName:"JointLimits",props:{dhParameters:{defaultValue:null,description:"",name:"dhParameters",required:!0,type:{name:"DhParameter[]"}},chainOffset:{defaultValue:{value:"null"},description:"",name:"chainOffset",required:!1,type:{name:"ChainOffset"}},limits:{defaultValue:null,description:"",name:"limits",required:!0,type:{name:"JointLimit[]"}},jointPositions:{defaultValue:null,description:"Radians for revolute joints; millimetres for prismatic joints.",name:"jointPositions",required:!1,type:{name:"number[]"}},size:{defaultValue:{value:"0.15"},description:"",name:"size",required:!1,type:{name:"number"}},highlightedJoint:{defaultValue:{value:"null"},description:"",name:"highlightedJoint",required:!1,type:{name:"number"}}}}}catch{}try{JointLimit.displayName="JointLimit",JointLimit.__docgenInfo={description:"Radians for revolute joints; millimetres for prismatic joints.",displayName:"JointLimit",props:{}}}catch{}const st={title:"3D View/JointLimits",component:w,tags:["!dev"],parameters:{docs:{description:{component:"Joint axes and position limits for a DH chain in NOVA's Z-up frame. Revolute positions are radians; prismatic positions and DH lengths are millimetres. Rendered lengths and marker size are metres."}}},argTypes:{size:{control:{type:"range",min:.05,max:.3,step:.01}},highlightedJoint:{control:"select",options:[null,0,1,2]},jointPositions:{control:"object"},dhParameters:{control:"object"},chainOffset:{control:"object"},limits:{control:"object"}},decorators:[e=>a.jsx("div",{style:{width:"100%",height:480},children:a.jsxs(H,{lights:!1,camera:{position:[1.8,1.8,1.5],up:[0,0,1],fov:40},children:[a.jsx("gridHelper",{args:[2,20,"#6b7280","#343840"],rotation:[Math.PI/2,0,0]}),a.jsx(e,{})]})})]},v={args:{dhParameters:[{a:400,d:200,alpha:Math.PI/2},{a:300,reverse_rotation_direction:!0},{d:100,type:"PRISMATIC_JOINT"}],limits:[{negative:-Math.PI,positive:Math.PI},{negative:-2*Math.PI,positive:2*Math.PI},{negative:-100,positive:300}],chainOffset:null,jointPositions:[Math.PI/6,Math.PI/4,100],size:.15,highlightedJoint:null},parameters:{docs:{description:{story:"Edit live joint positions, DH parameters, offsets and limits; select a highlighted joint or adjust marker size. The chain includes a reversed revolute joint, a multi-turn range and a prismatic joint."}}}};var E,V,N;v.parameters={...v.parameters,docs:{...(E=v.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
} satisfies Story`,...(N=(V=v.parameters)==null?void 0:V.docs)==null?void 0:N.source}}};const lt=["Interactive"];export{v as Interactive,lt as __namedExportsOrder,st as default};
