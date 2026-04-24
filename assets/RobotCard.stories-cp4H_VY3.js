import{r as m,j as e}from"./iframe-LALOZN-F.js";import{P as p}from"./ProgramControl-DOAX348L.js";import{u as $,a as Ne,C as X,P as ee}from"./PresetEnvironment-5q4n5KA_.js";import{o as De}from"./index-Br4K_1eJ.js";import{e as Fe}from"./externalizeComponent-BV-4vh52.js";import{P as te}from"./ProgramStateIndicator-BmnOFVp2.js";import{R as we}from"./Robot-B693ANkg.js";import{u as je}from"./useTheme-BFfoDheP.js";import{u as Ie}from"./useTranslation-CQu2Xlq8.js";import{C as Le}from"./Card-BxhwVSt-.js";import{B as d}from"./Box-DWv2XJjX.js";import{Q as K,V as h,cF as He,b as q}from"./three.core-CGXRouN8.js";import{T as oe}from"./Typography-BiioHOtl.js";import{D as re}from"./Divider-Cr95W7ZP.js";import{B as ae}from"./Button-CeXyAHoX.js";import{M as v}from"./index-BHJ0r4qt.js";import{g as U,a as ze,b as Be}from"./robotStoryConfig-CD0DXqwJ.js";import{S as ke}from"./Stack-BfsrEyT5.js";import"./preload-helper-Dp1pzeXC.js";import"./createSvgIcon-Dc0zdbun.js";import"./SvgIcon-CVRt6gBr.js";import"./PlayArrow-BrQ-lVMI.js";import"./three.module-JKIWMgkV.js";import"./with-selector-CjUlJGuI.js";import"./index-Bb8JjhAW.js";import"./mobx.esm-DvxsEwe8.js";import"./context-DlYdp_bM.js";import"./Chip-D4r_Oml4.js";import"./useSlot-DloJ_rNX.js";import"./mergeSlotProps-CeMMO6qp.js";import"./ButtonBase-CmUDboTJ.js";import"./useTimeout-DizItLVc.js";import"./isFocusVisible-B8k4qzLc.js";import"./Paper-DF38Nh1S.js";import"./dividerClasses-DHTHURVx.js";import"./CircularProgress-B8D7nPKJ.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./hooks-DZ2AgNCF.js";import"./interpolation-C1gWHBt4.js";import"./Line--6J6lRCm.js";import"./styled-3sXY9-6B.js";import"./useThemeProps-CEGX7FhJ.js";import"./getThemeProps-A7XPW7Hz.js";var y=(function(r){return r[r.NONE=0]="NONE",r[r.START=1]="START",r[r.ACTIVE=2]="ACTIVE",r})(y||{});const j=r=>r&&r.isOrthographicCamera,Ye=r=>r&&r.isBox3,We=r=>1-Math.exp(-5*r)+.007*r,Ve=m.createContext(null);function ne({children:r,maxDuration:n=1,margin:l=1.2,observe:C,fit:u,clip:M,interpolateFunc:E=We,onFit:P}){const L=m.useRef(null),{camera:t,size:V,invalidate:S}=$(),c=$(A=>A.controls),w=m.useRef(P);w.current=P;const R=m.useRef({camPos:new h,camRot:new K,camZoom:1}),o=m.useRef({camPos:void 0,camRot:void 0,camZoom:void 0,camUp:void 0,target:void 0}),x=m.useRef(y.NONE),g=m.useRef(0),[s]=m.useState(()=>new He),_=m.useMemo(()=>{function A(){const a=s.getSize(new h),i=s.getCenter(new h),f=Math.max(a.x,a.y,a.z),b=j(t)?f*4:f/(2*Math.atan(Math.PI*t.fov/360)),O=j(t)?f*4:b/t.aspect,T=l*Math.max(b,O);return{box:s,size:a,center:i,distance:T}}return{getSize:A,refresh(a){if(Ye(a))s.copy(a);else{const i=a||L.current;if(!i)return this;i.updateWorldMatrix(!0,!0),s.setFromObject(i)}if(s.isEmpty()){const i=t.position.length()||10;s.setFromCenterAndSize(new h,new h(i,i,i))}return R.current.camPos.copy(t.position),R.current.camRot.copy(t.quaternion),j(t)&&(R.current.camZoom=t.zoom),o.current.camPos=void 0,o.current.camRot=void 0,o.current.camZoom=void 0,o.current.camUp=void 0,o.current.target=void 0,this},reset(){const{center:a,distance:i}=A(),f=t.position.clone().sub(a).normalize();o.current.camPos=a.clone().addScaledVector(f,i),o.current.target=a.clone();const b=new q().lookAt(o.current.camPos,o.current.target,t.up);return o.current.camRot=new K().setFromRotationMatrix(b),x.current=y.START,g.current=0,this},moveTo(a){return o.current.camPos=Array.isArray(a)?new h(...a):a.clone(),x.current=y.START,g.current=0,this},lookAt({target:a,up:i}){o.current.target=Array.isArray(a)?new h(...a):a.clone(),i?o.current.camUp=Array.isArray(i)?new h(...i):i.clone():o.current.camUp=t.up.clone();const f=new q().lookAt(o.current.camPos||t.position,o.current.target,o.current.camUp);return o.current.camRot=new K().setFromRotationMatrix(f),x.current=y.START,g.current=0,this},to({position:a,target:i}){return this.moveTo(a).lookAt({target:i})},fit(){if(!j(t))return this.reset();let a=0,i=0;const f=[new h(s.min.x,s.min.y,s.min.z),new h(s.min.x,s.max.y,s.min.z),new h(s.min.x,s.min.y,s.max.z),new h(s.min.x,s.max.y,s.max.z),new h(s.max.x,s.max.y,s.max.z),new h(s.max.x,s.max.y,s.min.z),new h(s.max.x,s.min.y,s.max.z),new h(s.max.x,s.min.y,s.min.z)],b=o.current.camPos||t.position,O=o.current.target||(c==null?void 0:c.target),T=o.current.camUp||t.up,N=O?new q().lookAt(b,O,T).setPosition(b).invert():t.matrixWorldInverse;for(const F of f)F.applyMatrix4(N),a=Math.max(a,Math.abs(F.y)),i=Math.max(i,Math.abs(F.x));a*=2,i*=2;const W=(t.top-t.bottom)/a,D=(t.right-t.left)/i;return o.current.camZoom=Math.min(W,D)/l,x.current=y.START,g.current=0,w.current&&w.current(this.getSize()),this},clip(){const{distance:a}=A();return t.near=a/100,t.far=a*100,t.updateProjectionMatrix(),c&&(c.maxDistance=a*10,c.update()),S(),this}}},[s,t,c,l,S]);m.useLayoutEffect(()=>{if(c){const A=()=>{if(c&&o.current.target&&x.current!==y.NONE){const a=new h().setFromMatrixColumn(t.matrix,2),i=R.current.camPos.distanceTo(c.target),f=(o.current.camPos||R.current.camPos).distanceTo(o.current.target),b=(1-g.current)*i+g.current*f;c.target.copy(t.position).addScaledVector(a,-b),c.update()}x.current=y.NONE};return c.addEventListener("start",A),()=>c.removeEventListener("start",A)}},[c]);const G=m.useRef(0);return m.useLayoutEffect(()=>{(C||G.current++===0)&&(_.refresh(),u&&_.reset().fit(),M&&_.clip())},[V,M,u,C,t,c]),Ne((A,a)=>{if(x.current===y.START)x.current=y.ACTIVE,S();else if(x.current===y.ACTIVE){if(g.current+=a/n,g.current>=1)o.current.camPos&&t.position.copy(o.current.camPos),o.current.camRot&&t.quaternion.copy(o.current.camRot),o.current.camUp&&t.up.copy(o.current.camUp),o.current.camZoom&&j(t)&&(t.zoom=o.current.camZoom),t.updateMatrixWorld(),t.updateProjectionMatrix(),c&&o.current.target&&(c.target.copy(o.current.target),c.update()),x.current=y.NONE;else{const i=E(g.current);o.current.camPos&&t.position.lerpVectors(R.current.camPos,o.current.camPos,i),o.current.camRot&&t.quaternion.slerpQuaternions(R.current.camRot,o.current.camRot,i),o.current.camUp&&t.up.set(0,1,0).applyQuaternion(t.quaternion),o.current.camZoom&&j(t)&&(t.zoom=(1-i)*R.current.camZoom+i*o.current.camZoom),t.updateMatrixWorld(),t.updateProjectionMatrix()}S()}}),m.createElement("group",{ref:L},m.createElement(Ve.Provider,{value:_},r))}const Z=Fe(De(({robotName:r,programState:n,safetyState:l,operationMode:C,driveToHomeEnabled:u=!1,onDriveToHomePress:M,onDriveToHomeRelease:E,connectedMotionGroup:P,robotComponent:L=we,customContentComponent:t,className:V})=>{var W;const S=je(),{t:c}=Ie(),[w,R]=m.useState(!1),o=m.useRef(null),x=m.useRef(null),[g,s]=m.useState(!1),[_,G]=m.useState({width:400,height:600}),[A,a]=m.useState(0);m.useEffect(()=>{const D=()=>{if(x.current){const{offsetWidth:J,offsetHeight:Q}=x.current;s(J>Q),G({width:J,height:Q})}};D();const F=new ResizeObserver(D);return x.current&&F.observe(x.current),()=>{F.disconnect()}},[]);const i=m.useCallback(()=>{a(D=>D+1)},[]),f=m.useCallback(()=>{!u||!M||(R(!0),M())},[u,M]),b=m.useCallback(()=>{!u||!E||(R(!1),E())},[u,E]),O=m.useCallback(()=>{w&&E&&(R(!1),E())},[w,E]),T=g?_.width<350:_.height<200,N=g?_.height<310:_.height<450;return e.jsx(Le,{ref:x,className:V,sx:{width:"100%",height:"100%",display:"flex",flexDirection:g?"row":"column",position:"relative",overflow:"hidden",minWidth:{xs:180,sm:220,md:250},minHeight:g?{xs:200,sm:240,md:260}:{xs:150,sm:180,md:220},border:`1px solid ${S.palette.divider}`,borderRadius:"18px",boxShadow:"none",backgroundColor:((W=S.palette.backgroundPaperElevation)==null?void 0:W[8])||"#2A2A3F",backgroundImage:"none"},children:g?e.jsxs(e.Fragment,{children:[e.jsx(d,{sx:{flex:"0 0 50%",position:"relative",height:"100%",minHeight:"100%",maxHeight:"100%",borderRadius:1,m:{xs:1.5,sm:2,md:3},mr:{xs:.75,sm:1,md:1.5},overflow:"hidden",display:T?"none":"block"},children:!T&&e.jsxs(X,{orthographic:!0,camera:{position:[3,2,3],zoom:1},shadows:!0,frameloop:"demand",style:{borderRadius:S.shape.borderRadius,width:"100%",height:"100%",background:"transparent",position:"absolute",top:0,left:0},dpr:[1,2],gl:{alpha:!0,antialias:!0},children:[e.jsx(ee,{}),e.jsx(ne,{fit:!0,observe:!0,margin:1,maxDuration:1,children:e.jsx(L,{connectedMotionGroup:P,postModelRender:i})})]})}),e.jsxs(d,{sx:{flex:"1",display:"flex",flexDirection:"column",justifyContent:"flex-start",width:T?"100%":"50%"},children:[e.jsxs(d,{sx:{p:{xs:1.5,sm:2,md:3},pb:{xs:1,sm:1.5,md:2},textAlign:"left"},children:[e.jsx(oe,{variant:"h6",component:"h2",sx:{mb:1},children:r}),e.jsx(te,{programState:n,safetyState:l,operationMode:C})]}),e.jsxs(d,{sx:{p:{xs:1.5,sm:2,md:3},pt:0,flex:"1",display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[!N&&t&&e.jsxs(d,{children:[e.jsx(t,{}),e.jsx(re,{sx:{mt:1,mb:0,borderColor:S.palette.divider,opacity:.5}})]}),e.jsx(d,{sx:{mt:!N&&t?"auto":0},children:e.jsx(d,{sx:{display:"flex",justifyContent:"flex-start",mt:{xs:1,sm:1.5,md:2},mb:{xs:.5,sm:.75,md:1}},children:e.jsx(ae,{ref:o,variant:"contained",color:"secondary",size:"small",disabled:!u,onMouseDown:f,onMouseUp:b,onMouseLeave:O,onTouchStart:f,onTouchEnd:b,sx:{textTransform:"none",px:1.5,py:.5},children:c("RobotCard.DriveToHome.bt")})})})]})]})]}):e.jsx(e.Fragment,{children:e.jsxs(d,{sx:{p:3,height:"100%",display:"flex",flexDirection:"column"},children:[e.jsxs(d,{children:[e.jsx(oe,{variant:"h6",component:"h2",sx:{mb:1},children:r}),e.jsx(te,{programState:n,safetyState:l,operationMode:C})]}),e.jsx(d,{sx:{flex:T?0:1,position:"relative",minHeight:T?0:{xs:120,sm:150,md:200},height:T?0:"auto",borderRadius:1,overflow:"hidden",display:T?"none":"block"},children:!T&&e.jsxs(X,{orthographic:!0,camera:{position:[3,2,3],zoom:1},shadows:!0,frameloop:"demand",style:{borderRadius:S.shape.borderRadius,width:"100%",height:"100%",background:"transparent",position:"absolute"},dpr:[1,2],gl:{alpha:!0,antialias:!0},children:[e.jsx(ee,{}),e.jsx(ne,{fit:!0,clip:!0,observe:!0,margin:1,maxDuration:1,children:e.jsx(L,{connectedMotionGroup:P,postModelRender:i})})]})}),e.jsxs(d,{children:[!N&&t&&e.jsxs(e.Fragment,{children:[e.jsx(t,{}),e.jsx(re,{sx:{mt:1,mb:0,borderColor:S.palette.divider,opacity:.5}})]}),e.jsx(d,{sx:{display:"flex",justifyContent:"flex-start",mt:!N&&t?{xs:1,sm:2,md:5}:{xs:.5,sm:1,md:2},mb:{xs:.5,sm:.75,md:1}},children:e.jsx(ae,{ref:o,variant:"contained",color:"secondary",size:"small",disabled:!u,onMouseDown:f,onMouseUp:b,onMouseLeave:O,onTouchStart:f,onTouchEnd:b,sx:{textTransform:"none",px:1.5,py:.5},children:c("RobotCard.DriveToHome.bt")})})]})]})})})}));try{Z.displayName="RobotCard",Z.__docgenInfo={description:`A responsive card component that displays a 3D robot with states and controls.
The card automatically adapts to its container's size and aspect ratio.

Features:
- Fully responsive Material-UI Card that adapts to container dimensions
- Automatic layout switching based on aspect ratio:
  - Portrait mode: Vertical layout with robot in center
  - Landscape mode: Horizontal layout with robot on left, content on right (left-aligned)
- Responsive 3D robot rendering:
  - Scales dynamically with container size
  - Hides at very small sizes to preserve usability
  - Adaptive margin based on available space
- Smart spacing and padding that reduces at smaller sizes
- Minimum size constraints for usability while maximizing content density
- Robot name displayed in Typography h6 at top-left
- Program state indicator below the name
- Auto-fitting 3D robot model that scales with container size
- Customizable content area for displaying custom React components
- Transparent gray divider line
- "Drive to Home" button with press-and-hold functionality
- Localization support via react-i18next
- Material-UI theming integration

Usage with custom content:
\`\`\`tsx
// Example custom timer component
const CustomTimer = () => (
  <Box>
    <Typography variant="body1" sx={{ color: "text.secondary" }}>
      Runtime
    </Typography>
    <Typography variant="h6">05:23</Typography>
  </Box>
)

<RobotCard
  robotName="UR5e Robot"
  programState={ProgramState.RUNNING}
  customContentComponent={CustomTimer}
  // ... other props
/>
\`\`\``,displayName:"RobotCard",props:{robotName:{defaultValue:null,description:"Name of the robot displayed at the top",name:"robotName",required:!0,type:{name:"string"}},programState:{defaultValue:null,description:"Current program state",name:"programState",required:!0,type:{name:"enum",value:[{value:'"idle"'},{value:'"preparing"'},{value:'"starting"'},{value:'"running"'},{value:'"pausing"'},{value:'"paused"'},{value:'"stopping"'},{value:'"completed"'},{value:'"failed"'},{value:'"stopped"'},{value:'"error"'}]}},safetyState:{defaultValue:null,description:"Current safety state of the robot controller",name:"safetyState",required:!0,type:{name:"SafetyStateType"}},operationMode:{defaultValue:null,description:"Current operation mode of the robot controller",name:"operationMode",required:!0,type:{name:"OperationMode"}},driveToHomeEnabled:{defaultValue:null,description:'Whether the "Drive to Home" button should be enabled',name:"driveToHomeEnabled",required:!1,type:{name:"boolean"}},onDriveToHomePress:{defaultValue:null,description:'Callback fired when "Drive to Home" button is pressed',name:"onDriveToHomePress",required:!1,type:{name:"() => void"}},onDriveToHomeRelease:{defaultValue:null,description:'Callback fired when "Drive to Home" button is released',name:"onDriveToHomeRelease",required:!1,type:{name:"() => void"}},onDriveToHomePressWithConfig:{defaultValue:null,description:`Callback fired when "Drive to Home" button is pressed, with the default home position.
If provided, this will be called instead of onDriveToHomePress, providing the recommended
home position joint configuration based on the robot manufacturer.`,name:"onDriveToHomePressWithConfig",required:!1,type:{name:"(homePosition: number[]) => void"}},onDriveToHomeReleaseWithConfig:{defaultValue:null,description:`Callback fired when "Drive to Home" button is released after using onDriveToHomePressWithConfig.
If provided, this will be called instead of onDriveToHomeRelease.`,name:"onDriveToHomeReleaseWithConfig",required:!1,type:{name:"() => void"}},defaultJointConfig:{defaultValue:null,description:`Custom default joint configuration to use if manufacturer-based defaults are not available.
Joint values should be in radians.`,name:"defaultJointConfig",required:!1,type:{name:"number[]"}},connectedMotionGroup:{defaultValue:null,description:"Connected motion group for the robot",name:"connectedMotionGroup",required:!0,type:{name:"ConnectedMotionGroup"}},robotComponent:{defaultValue:null,description:"Custom robot component to render (optional, defaults to Robot)",name:"robotComponent",required:!1,type:{name:"ComponentType<{ connectedMotionGroup: ConnectedMotionGroup; flangeRef?: Ref<Group<Object3DEventMap>>; postModelRender?: () => void; transparentColor?: string; getModel?: (modelFromController: string) => Promise<...>; }>"}},customContentComponent:{defaultValue:null,description:"Custom component to render in the content area (optional)",name:"customContentComponent",required:!1,type:{name:"ComponentType<Record<string, unknown>>"}},className:{defaultValue:null,description:"Additional CSS class name",name:"className",required:!1,type:{name:"string"}}}}}catch{}const se={[v.Abb]:[0,0,0,0,Math.PI/2,0,0],[v.Fanuc]:[0,0,0,0,-Math.PI/2,0,0],[v.Yaskawa]:[0,0,0,0,-Math.PI/2,0,0],[v.Kuka]:[0,-Math.PI/2,Math.PI/2,0,Math.PI/2,0,0],[v.Universalrobots]:[0,-Math.PI/2,-Math.PI/2,-Math.PI/2,Math.PI/2,-Math.PI/2,0]};function Ge(r){const[n]=r.split("_");switch(n){case"ABB":return v.Abb;case"FANUC":return v.Fanuc;case"YASKAWA":return v.Yaskawa;case"KUKA":return v.Kuka;case"UniversalRobots":return v.Universalrobots;default:return null}}function Ke(r,n){const l=Ge(r);return l&&l in se?se[l]:null}const qe=()=>e.jsxs(d,{children:[e.jsx(d,{sx:{mb:1,color:"text.secondary",fontSize:"14px"},children:"Runtime"}),e.jsx(d,{sx:{fontSize:"18px",fontWeight:"bold"},children:"05:23"})]});function I(r){const n=Ke(r.modelFromController),C={rapidlyChangingMotionState:{...ze,joint_position:n||[0,0,0,0,0,0]},modelFromController:r.modelFromController,dhParameters:r.dhParameters||[],motionGroupId:"0",controllerId:r.modelFromController},{modelFromController:u,dhParameters:M,...E}=r;return e.jsx(Z,{...E,connectedMotionGroup:C,robotComponent:r.robotComponent||(P=>e.jsx(we,{...P,getModel:Be}))})}const Ht={title:"Components/RobotCard/Stories",tags:["!dev"],parameters:{layout:"centered"},argTypes:{robotName:{control:"text",description:"Name of the robot displayed at the top"},programState:{control:"select",options:[p.IDLE,p.PREPARING,p.STARTING,p.RUNNING,p.PAUSING,p.PAUSED,p.STOPPING,p.COMPLETED,p.FAILED,p.STOPPED,p.ERROR],description:"The current state of the program execution"},safetyState:{control:"select",options:["SAFETY_STATE_NORMAL","SAFETY_STATE_DEVICE_EMERGENCY_STOP","SAFETY_STATE_ROBOT_EMERGENCY_STOP","SAFETY_STATE_STOP_0","SAFETY_STATE_STOP_1","SAFETY_STATE_STOP_2","SAFETY_STATE_PROTECTIVE_STOP","SAFETY_STATE_STOP","SAFETY_STATE_REDUCED","SAFETY_STATE_MASTERING","SAFETY_STATE_CONFIRM_SAFETY","SAFETY_STATE_OPERATOR_SAFETY","SAFETY_STATE_RECOVERY","SAFETY_STATE_VIOLATION","SAFETY_STATE_UNKNOWN","SAFETY_STATE_FAULT"],description:"Current safety state of the robot controller"},operationMode:{control:"select",options:["OPERATION_MODE_AUTO","OPERATION_MODE_MANUAL","OPERATION_MODE_MANUAL_T1","OPERATION_MODE_MANUAL_T2"],description:"Current operation mode of the robot controller"},driveToHomeEnabled:{control:"boolean",description:"Whether the Drive to Home button should be enabled"},modelFromController:{control:"select",options:["UniversalRobots_UR3e","UniversalRobots_UR5e","UniversalRobots_UR10e","KUKA_KR6_R700_2"],description:"Robot model to display"},showCustomContent:{control:"boolean",description:"Whether to show custom content component example"}},args:{robotName:"UR5e Robot",programState:p.IDLE,safetyState:"SAFETY_STATE_NORMAL",operationMode:"OPERATION_MODE_AUTO",driveToHomeEnabled:!0,modelFromController:"UniversalRobots_UR5e",showCustomContent:!1}},H={args:{robotName:"UR5e Robot",programState:p.IDLE,safetyState:"SAFETY_STATE_NORMAL",operationMode:"OPERATION_MODE_AUTO",driveToHomeEnabled:!1,modelFromController:"UniversalRobots_UR5e"},loaders:[async()=>({dhParameters:await U("UniversalRobots_UR5e")})],render:function(n,{loaded:{dhParameters:l}}){return e.jsx(d,{sx:{display:"flex",justifyContent:"center",padding:2,width:484,height:578},children:e.jsx(I,{robotName:n.robotName,programState:n.programState,safetyState:n.safetyState,operationMode:n.operationMode,driveToHomeEnabled:n.driveToHomeEnabled,modelFromController:n.modelFromController,dhParameters:l,customContentComponent:n.showCustomContent?qe:void 0})})}},z={loaders:[async()=>({robotConfigs:await Promise.all([{model:"UniversalRobots_UR5e",dhParameters:await U("UniversalRobots_UR5e")},{model:"UniversalRobots_UR10e",dhParameters:await U("UniversalRobots_UR10e")},{model:"KUKA_KR6_R700_2",dhParameters:await U("KUKA_KR6_R700_2")}])})],render:function(n,{loaded:{robotConfigs:l}}){const C=[{name:"UR5e Station A",modelFromController:l[0].model,dhParameters:l[0].dhParameters,programState:p.RUNNING,safetyState:"SAFETY_STATE_NORMAL",operationMode:"OPERATION_MODE_AUTO"},{name:"UR10e Station B",modelFromController:l[1].model,dhParameters:l[1].dhParameters,programState:p.PAUSED,safetyState:"SAFETY_STATE_NORMAL",operationMode:"OPERATION_MODE_AUTO"},{name:"KUKA Station C",modelFromController:l[2].model,dhParameters:l[2].dhParameters,programState:p.IDLE,safetyState:"SAFETY_STATE_STOP",operationMode:"OPERATION_MODE_MANUAL"}];return e.jsx(ke,{spacing:1,sx:{padding:1,width:500,overflow:"auto"},children:C.map(u=>e.jsx(d,{sx:{height:300},children:e.jsx(I,{robotName:u.name,programState:u.programState,safetyState:u.safetyState,operationMode:u.operationMode,driveToHomeEnabled:u.programState===p.IDLE,modelFromController:u.modelFromController,dhParameters:u.dhParameters})},u.name))})}},B={args:{robotName:"Compact UR3e",programState:p.IDLE,safetyState:"SAFETY_STATE_NORMAL",operationMode:"OPERATION_MODE_AUTO",driveToHomeEnabled:!1,modelFromController:"UniversalRobots_UR3e"},loaders:[async()=>({dhParameters:await U("UniversalRobots_UR3e")})],render:function(n,{loaded:{dhParameters:l}}){return e.jsx(d,{sx:{display:"flex",justifyContent:"center",padding:2,width:300,height:400},children:e.jsx(I,{robotName:n.robotName,programState:n.programState,safetyState:n.safetyState,operationMode:n.operationMode,driveToHomeEnabled:n.driveToHomeEnabled,modelFromController:n.modelFromController,dhParameters:l})})}},k={loaders:[async()=>({dhParameters:await U("UniversalRobots_UR5e")})],render:function(n,{loaded:{dhParameters:l}}){return e.jsxs(d,{sx:{display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:2},children:[e.jsxs(d,{sx:{width:800,height:400,border:"2px dashed",borderColor:"divider",borderRadius:2,display:"flex",flexDirection:"column",gap:1,p:1},children:[e.jsx(d,{sx:{typography:"subtitle2",color:"text.secondary",textAlign:"center"},children:"Landscape Mode (800×400) - Robot on Left, Content on Right"}),e.jsx(d,{sx:{flex:1},children:e.jsx(I,{robotName:"UR5e Landscape",programState:p.RUNNING,safetyState:"SAFETY_STATE_NORMAL",operationMode:"OPERATION_MODE_AUTO",driveToHomeEnabled:n.driveToHomeEnabled,modelFromController:"UniversalRobots_UR5e",dhParameters:l})})]}),e.jsxs(d,{sx:{width:400,height:600,border:"2px dashed",borderColor:"divider",borderRadius:2,display:"flex",flexDirection:"column",gap:1,p:1},children:[e.jsx(d,{sx:{typography:"subtitle2",color:"text.secondary",textAlign:"center"},children:"Portrait Mode (400×600) - Vertical Layout"}),e.jsx(d,{sx:{flex:1},children:e.jsx(I,{robotName:"UR5e Portrait",programState:p.IDLE,safetyState:"SAFETY_STATE_NORMAL",operationMode:"OPERATION_MODE_AUTO",driveToHomeEnabled:n.driveToHomeEnabled,modelFromController:"UniversalRobots_UR5e",dhParameters:l})})]}),e.jsxs(d,{sx:{maxWidth:600,textAlign:"center",color:"text.secondary",typography:"body2"},children:["The RobotCard automatically detects its container's aspect ratio and adjusts the layout accordingly:",e.jsx("br",{}),"• ",e.jsx("strong",{children:"Landscape:"})," Robot positioned on left (50% width), content on right with left-aligned text",e.jsx("br",{}),"• ",e.jsx("strong",{children:"Portrait:"})," Traditional vertical layout with robot in center"]})]})}},Y={args:{robotName:"Resizable Robot",programState:p.IDLE,safetyState:"SAFETY_STATE_NORMAL",operationMode:"OPERATION_MODE_AUTO",driveToHomeEnabled:!0,modelFromController:"UniversalRobots_UR5e"},loaders:[async r=>({dhParameters:await U(r.args.modelFromController||"UniversalRobots_UR5e")})],render:function(n,{loaded:{dhParameters:l}}){return e.jsxs(d,{sx:{display:"flex",flexDirection:"column",gap:2,width:"100%",maxWidth:800,margin:"0 auto",padding:2},children:[e.jsxs(d,{sx:{color:"text.secondary",typography:"body2",textAlign:"center",mb:2},children:[e.jsx("strong",{children:"Responsive Test:"})," Drag the resize handle below to test responsive behavior.",e.jsx("br",{}),"• ",e.jsx("strong",{children:"Landscape:"})," Robot scales at ","<450px","/","<550px",", hides at ","<350px"," width or ","<250px"," height",e.jsx("br",{}),"• ",e.jsx("strong",{children:"Portrait:"})," Robot scales at ","<300px","/","<400px",", hides at ","<250px"," width or ","<180px"," height",e.jsx("br",{}),"• Less aggressive scaling/hiding for portrait mode to preserve central robot display",e.jsx("br",{}),"• Padding remains consistent for visual harmony"]}),e.jsx(d,{sx:{resize:"both",overflow:"auto",border:"2px dashed",borderColor:"primary.main",borderRadius:2,padding:1,minWidth:200,minHeight:150,width:400,height:300,background:"background.paper",position:"relative","&::after":{content:'"↘ Drag to resize"',position:"absolute",bottom:4,right:4,fontSize:12,color:"text.disabled",pointerEvents:"none"}},children:e.jsx(I,{robotName:n.robotName,programState:n.programState,safetyState:n.safetyState,operationMode:n.operationMode,driveToHomeEnabled:n.driveToHomeEnabled,modelFromController:n.modelFromController,dhParameters:l})}),e.jsx(d,{sx:{color:"text.secondary",typography:"caption",textAlign:"center",mt:1},children:"Try different sizes to see the responsive behavior in action!"})]})}};var ie,de,le,me,ce;H.parameters={...H.parameters,docs:{...(ie=H.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    robotName: "UR5e Robot",
    programState: ProgramState.IDLE,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO",
    driveToHomeEnabled: false,
    modelFromController: "UniversalRobots_UR5e"
  },
  loaders: [async () => ({
    dhParameters: await getDHParams("UniversalRobots_UR5e")
  })],
  render: function Render(args, {
    loaded: {
      dhParameters
    }
  }) {
    return <Box sx={{
      display: "flex",
      justifyContent: "center",
      padding: 2,
      width: 484,
      height: 578
    }}>
        <RobotCardWithMockConnectedMotionGroup robotName={args.robotName} programState={args.programState} safetyState={args.safetyState as SafetyStateType} operationMode={args.operationMode as OperationMode} driveToHomeEnabled={args.driveToHomeEnabled} modelFromController={args.modelFromController} dhParameters={dhParameters} customContentComponent={args.showCustomContent ? ExampleCustomContent : undefined} />
      </Box>;
  }
}`,...(le=(de=H.parameters)==null?void 0:de.docs)==null?void 0:le.source},description:{story:`Basic RobotCard showing the component structure without complex interactions.
This demonstrates the layout and visual hierarchy of the card.`,...(ce=(me=H.parameters)==null?void 0:me.docs)==null?void 0:ce.description}}};var pe,ue,he,xe,fe;z.parameters={...z.parameters,docs:{...(pe=z.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  loaders: [async () => ({
    robotConfigs: await Promise.all([{
      model: "UniversalRobots_UR5e",
      dhParameters: await getDHParams("UniversalRobots_UR5e")
    }, {
      model: "UniversalRobots_UR10e",
      dhParameters: await getDHParams("UniversalRobots_UR10e")
    }, {
      model: "KUKA_KR6_R700_2",
      dhParameters: await getDHParams("KUKA_KR6_R700_2")
    }])
  })],
  render: function Render(args, {
    loaded: {
      robotConfigs
    }
  }) {
    const robots = [{
      name: "UR5e Station A",
      modelFromController: robotConfigs[0].model,
      dhParameters: robotConfigs[0].dhParameters,
      programState: ProgramState.RUNNING,
      safetyState: "SAFETY_STATE_NORMAL" as const,
      operationMode: "OPERATION_MODE_AUTO" as const
    }, {
      name: "UR10e Station B",
      modelFromController: robotConfigs[1].model,
      dhParameters: robotConfigs[1].dhParameters,
      programState: ProgramState.PAUSED,
      safetyState: "SAFETY_STATE_NORMAL" as const,
      operationMode: "OPERATION_MODE_AUTO" as const
    }, {
      name: "KUKA Station C",
      modelFromController: robotConfigs[2].model,
      dhParameters: robotConfigs[2].dhParameters,
      programState: ProgramState.IDLE,
      safetyState: "SAFETY_STATE_STOP" as const,
      operationMode: "OPERATION_MODE_MANUAL" as const
    }];
    return <Stack spacing={1} sx={{
      padding: 1,
      width: 500,
      overflow: "auto" // Allow horizontal scrolling if needed
    }}>
        {robots.map(robot => <Box key={robot.name} sx={{
        height: 300
      }}>
            <RobotCardWithMockConnectedMotionGroup robotName={robot.name} programState={robot.programState} safetyState={robot.safetyState as SafetyStateType} operationMode={robot.operationMode as OperationMode} driveToHomeEnabled={robot.programState === ProgramState.IDLE} modelFromController={robot.modelFromController} dhParameters={robot.dhParameters} />
          </Box>)}
      </Stack>;
  }
}`,...(he=(ue=z.parameters)==null?void 0:ue.docs)==null?void 0:he.source},description:{story:`Multiple robot cards displayed in a MUI Stack with landscape orientation
to demonstrate how they would appear in a multi-robot monitoring interface.
Each card shows a different robot model with various states in landscape format,
demonstrating the behavior of RobotCards within a Material-UI Stack component.`,...(fe=(xe=z.parameters)==null?void 0:xe.docs)==null?void 0:fe.description}}};var ge,be,Te,Re,ye;B.parameters={...B.parameters,docs:{...(ge=B.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    robotName: "Compact UR3e",
    programState: ProgramState.IDLE,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO",
    driveToHomeEnabled: false,
    modelFromController: "UniversalRobots_UR3e"
  },
  loaders: [async () => ({
    dhParameters: await getDHParams("UniversalRobots_UR3e")
  })],
  render: function Render(args, {
    loaded: {
      dhParameters
    }
  }) {
    return <Box sx={{
      display: "flex",
      justifyContent: "center",
      padding: 2,
      width: 300,
      height: 400
    }}>
        <RobotCardWithMockConnectedMotionGroup robotName={args.robotName} programState={args.programState} safetyState={args.safetyState as SafetyStateType} operationMode={args.operationMode as OperationMode} driveToHomeEnabled={args.driveToHomeEnabled} modelFromController={args.modelFromController} dhParameters={dhParameters} />
      </Box>;
  }
}`,...(Te=(be=B.parameters)==null?void 0:be.docs)==null?void 0:Te.source},description:{story:`Compact variant of the robot card with smaller dimensions
suitable for dense dashboard layouts.`,...(ye=(Re=B.parameters)==null?void 0:Re.docs)==null?void 0:ye.description}}};var Se,Ee,Ae,ve,Ce;k.parameters={...k.parameters,docs:{...(Se=k.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  loaders: [async () => ({
    dhParameters: await getDHParams("UniversalRobots_UR5e")
  })],
  render: function Render(args, {
    loaded: {
      dhParameters
    }
  }) {
    return <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
      padding: 2
    }}>
        {/* Landscape orientation container */}
        <Box sx={{
        width: 800,
        height: 400,
        border: "2px dashed",
        borderColor: "divider",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 1
      }}>
          <Box sx={{
          typography: "subtitle2",
          color: "text.secondary",
          textAlign: "center"
        }}>
            Landscape Mode (800×400) - Robot on Left, Content on Right
          </Box>
          <Box sx={{
          flex: 1
        }}>
            <RobotCardWithMockConnectedMotionGroup robotName="UR5e Landscape" programState={ProgramState.RUNNING} safetyState={"SAFETY_STATE_NORMAL" as SafetyStateType} operationMode={"OPERATION_MODE_AUTO" as OperationMode} driveToHomeEnabled={args.driveToHomeEnabled} modelFromController="UniversalRobots_UR5e" dhParameters={dhParameters} />
          </Box>
        </Box>

        {/* Portrait orientation container for comparison */}
        <Box sx={{
        width: 400,
        height: 600,
        border: "2px dashed",
        borderColor: "divider",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 1
      }}>
          <Box sx={{
          typography: "subtitle2",
          color: "text.secondary",
          textAlign: "center"
        }}>
            Portrait Mode (400×600) - Vertical Layout
          </Box>
          <Box sx={{
          flex: 1
        }}>
            <RobotCardWithMockConnectedMotionGroup robotName="UR5e Portrait" programState={ProgramState.IDLE} safetyState={"SAFETY_STATE_NORMAL" as SafetyStateType} operationMode={"OPERATION_MODE_AUTO" as OperationMode} driveToHomeEnabled={args.driveToHomeEnabled} modelFromController="UniversalRobots_UR5e" dhParameters={dhParameters} />
          </Box>
        </Box>

        <Box sx={{
        maxWidth: 600,
        textAlign: "center",
        color: "text.secondary",
        typography: "body2"
      }}>
          The RobotCard automatically detects its container's aspect ratio and
          adjusts the layout accordingly:
          <br />• <strong>Landscape:</strong> Robot positioned on left (50%
          width), content on right with left-aligned text
          <br />• <strong>Portrait:</strong> Traditional vertical layout with
          robot in center
        </Box>
      </Box>;
  }
}`,...(Ae=(Ee=k.parameters)==null?void 0:Ee.docs)==null?void 0:Ae.source},description:{story:`Landscape layout demonstration showing how the RobotCard automatically
adapts to landscape aspect ratios by placing the robot on the left and
content on the right with left-aligned text elements.`,...(Ce=(ve=k.parameters)==null?void 0:ve.docs)==null?void 0:Ce.description}}};var _e,Me,Pe,Oe,Ue;Y.parameters={...Y.parameters,docs:{...(_e=Y.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  args: {
    robotName: "Resizable Robot",
    programState: ProgramState.IDLE,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO",
    driveToHomeEnabled: true,
    modelFromController: "UniversalRobots_UR5e"
  },
  loaders: [async context => ({
    dhParameters: await getDHParams(context.args.modelFromController || "UniversalRobots_UR5e")
  })],
  render: function Render(args, {
    loaded: {
      dhParameters
    }
  }) {
    return <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      width: "100%",
      maxWidth: 800,
      margin: "0 auto",
      padding: 2
    }}>
        <Box sx={{
        color: "text.secondary",
        typography: "body2",
        textAlign: "center",
        mb: 2
      }}>
          <strong>Responsive Test:</strong> Drag the resize handle below to test
          responsive behavior.
          <br />• <strong>Landscape:</strong> Robot scales at {"<450px"}/
          {"<550px"}, hides at {"<350px"} width or {"<250px"} height
          <br />• <strong>Portrait:</strong> Robot scales at {"<300px"}/
          {"<400px"}, hides at {"<250px"} width or {"<180px"} height
          <br />• Less aggressive scaling/hiding for portrait mode to preserve
          central robot display
          <br />• Padding remains consistent for visual harmony
        </Box>

        <Box sx={{
        resize: "both",
        overflow: "auto",
        border: "2px dashed",
        borderColor: "primary.main",
        borderRadius: 2,
        padding: 1,
        minWidth: 200,
        minHeight: 150,
        width: 400,
        height: 300,
        background: "background.paper",
        position: "relative",
        "&::after": {
          content: '"↘ Drag to resize"',
          position: "absolute",
          bottom: 4,
          right: 4,
          fontSize: 12,
          color: "text.disabled",
          pointerEvents: "none"
        }
      }}>
          <RobotCardWithMockConnectedMotionGroup robotName={args.robotName} programState={args.programState} safetyState={args.safetyState as SafetyStateType} operationMode={args.operationMode as OperationMode} driveToHomeEnabled={args.driveToHomeEnabled} modelFromController={args.modelFromController} dhParameters={dhParameters} />
        </Box>

        <Box sx={{
        color: "text.secondary",
        typography: "caption",
        textAlign: "center",
        mt: 1
      }}>
          Try different sizes to see the responsive behavior in action!
        </Box>
      </Box>;
  }
}`,...(Pe=(Me=Y.parameters)==null?void 0:Me.docs)==null?void 0:Pe.source},description:{story:`Test responsive behavior with a resizable container.
Drag the resize handle to see how the robot scales and eventually hides at small sizes.
The component maintains consistent padding while making the 3D robot responsive.`,...(Ue=(Oe=Y.parameters)==null?void 0:Oe.docs)==null?void 0:Ue.description}}};const zt=["Basic","MultipleRobots","CompactSize","LandscapeLayout","ResizableTest"];export{H as Basic,B as CompactSize,k as LandscapeLayout,z as MultipleRobots,Y as ResizableTest,zt as __namedExportsOrder,Ht as default};
