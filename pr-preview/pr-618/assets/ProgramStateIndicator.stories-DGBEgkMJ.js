import{P as w}from"./ProgramStateIndicator-jYgYEYoU.js";import{P as t}from"./ProgramControl-DdGTynKv.js";import"./iframe-B5QuGMjp.js";import"./preload-helper-Dp1pzeXC.js";import"./index-jzs0njo_.js";import"./mobx.esm-D1cTsgoC.js";import"./externalizeComponent-DMOifEec.js";import"./context-CA8FdNYC.js";import"./useTheme-DyBIfWj3.js";import"./useTranslation-qv8ysC4d.js";import"./Chip-D-Qj_vd1.js";import"./createSvgIcon-Umkb0fkK.js";import"./SvgIcon-B3mqJ87k.js";import"./Typography-CrlbwWDa.js";import"./useSlot-DCpDVAbb.js";import"./mergeSlotProps-BwNMEpYD.js";import"./ButtonBase-B6geqTjM.js";import"./useTimeout-BS8fzZm4.js";import"./isFocusVisible-B8k4qzLc.js";import"./PlayArrow-CsLIpHQB.js";import"./Box-DeghQrm3.js";import"./Button-BctY-s9Q.js";import"./CircularProgress-voHYLowf.js";const Tt={title:"Components/ProgramStateIndicator",component:w,tags:["!dev"],parameters:{layout:"centered",docs:{description:{component:`
A state indicator component that displays the current program execution state combined with robot controller safety and operation mode states.

**Features:**
- Combines program state with safety and operation mode states
- Color-coded based on state severity (success, warning, error)
- Rendered as Material-UI filled chip
- Localization support via react-i18next
- Handles emergency stops, errors, and manual action requirements

**State Priority:**
1. Emergency Stop (E-Stop) - Highest priority, always shown
2. Stop States - Critical safety stops
3. Error States - System faults and unknown states  
4. Normal Operation - Program state (running, paused, idle, ready)
5. Manual Action Required - States requiring operator intervention

The component automatically determines the appropriate state to display based on the combination of program, safety, and operation mode states.
        `}}},argTypes:{programState:{control:"select",options:[t.IDLE,t.PREPARING,t.STARTING,t.RUNNING,t.PAUSING,t.PAUSED,t.STOPPING,t.COMPLETED,t.FAILED,t.STOPPED,t.ERROR],description:"The current state of the program execution",table:{type:{summary:"ProgramState"}}},safetyState:{control:"select",options:["SAFETY_STATE_NORMAL","SAFETY_STATE_DEVICE_EMERGENCY_STOP","SAFETY_STATE_ROBOT_EMERGENCY_STOP","SAFETY_STATE_STOP_0","SAFETY_STATE_STOP_1","SAFETY_STATE_STOP_2","SAFETY_STATE_PROTECTIVE_STOP","SAFETY_STATE_STOP","SAFETY_STATE_REDUCED","SAFETY_STATE_MASTERING","SAFETY_STATE_CONFIRM_SAFETY","SAFETY_STATE_OPERATOR_SAFETY","SAFETY_STATE_RECOVERY","SAFETY_STATE_VIOLATION","SAFETY_STATE_UNKNOWN","SAFETY_STATE_FAULT"],description:"Current safety state of the robot controller"},operationMode:{control:"select",options:["OPERATION_MODE_AUTO","OPERATION_MODE_MANUAL","OPERATION_MODE_MANUAL_T1","OPERATION_MODE_MANUAL_T2"],description:"Current operation mode of the robot controller"}},args:{programState:t.IDLE,safetyState:"SAFETY_STATE_NORMAL",operationMode:"OPERATION_MODE_AUTO"}},e={args:{programState:t.IDLE,safetyState:"SAFETY_STATE_NORMAL",operationMode:"OPERATION_MODE_AUTO"}},r={args:{programState:t.RUNNING,safetyState:"SAFETY_STATE_NORMAL",operationMode:"OPERATION_MODE_AUTO"}},a={args:{programState:t.PAUSED,safetyState:"SAFETY_STATE_NORMAL",operationMode:"OPERATION_MODE_AUTO"}},o={args:{programState:t.RUNNING,safetyState:"SAFETY_STATE_FAULT",operationMode:"OPERATION_MODE_AUTO"}},s={args:{programState:t.RUNNING,safetyState:"SAFETY_STATE_DEVICE_EMERGENCY_STOP",operationMode:"OPERATION_MODE_AUTO"}},n={args:{programState:t.RUNNING,safetyState:"SAFETY_STATE_STOP",operationMode:"OPERATION_MODE_AUTO"}},T={args:{programState:t.RUNNING,safetyState:"SAFETY_STATE_NORMAL",operationMode:"OPERATION_MODE_MANUAL"}},A={args:{programState:t.RUNNING,safetyState:"SAFETY_STATE_NORMAL",operationMode:"OPERATION_MODE_MANUAL_T1"}},E={args:{programState:t.RUNNING,safetyState:"SAFETY_STATE_NORMAL",operationMode:"OPERATION_MODE_MANUAL_T2"}};var S,p,_;e.parameters={...e.parameters,docs:{...(S=e.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.IDLE,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO"
  }
}`,...(_=(p=e.parameters)==null?void 0:p.docs)==null?void 0:_.source}}};var i,m,O;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.RUNNING,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO"
  }
}`,...(O=(m=r.parameters)==null?void 0:m.docs)==null?void 0:O.source}}};var N,c,d;a.parameters={...a.parameters,docs:{...(N=a.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.PAUSED,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO"
  }
}`,...(d=(c=a.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var R,g,M;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.RUNNING,
    safetyState: "SAFETY_STATE_FAULT",
    operationMode: "OPERATION_MODE_AUTO"
  }
}`,...(M=(g=o.parameters)==null?void 0:g.docs)==null?void 0:M.source}}};var u,P,I;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.RUNNING,
    safetyState: "SAFETY_STATE_DEVICE_EMERGENCY_STOP",
    operationMode: "OPERATION_MODE_AUTO"
  }
}`,...(I=(P=s.parameters)==null?void 0:P.docs)==null?void 0:I.source}}};var l,U,F;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.RUNNING,
    safetyState: "SAFETY_STATE_STOP",
    operationMode: "OPERATION_MODE_AUTO"
  }
}`,...(F=(U=n.parameters)==null?void 0:U.docs)==null?void 0:F.source}}};var y,Y,D;T.parameters={...T.parameters,docs:{...(y=T.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.RUNNING,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_MANUAL"
  }
}`,...(D=(Y=T.parameters)==null?void 0:Y.docs)==null?void 0:D.source}}};var f,L,G;A.parameters={...A.parameters,docs:{...(f=A.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.RUNNING,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_MANUAL_T1"
  }
}`,...(G=(L=A.parameters)==null?void 0:L.docs)==null?void 0:G.source}}};var C,h,b;E.parameters={...E.parameters,docs:{...(C=E.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.RUNNING,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_MANUAL_T2"
  }
}`,...(b=(h=E.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};const At=["ReadyAuto","RunningAuto","PausedAuto","ErrorAuto","EStopAuto","StoppedAuto","RunningManual","RunningManualT1","RunningManualT2"];export{s as EStopAuto,o as ErrorAuto,a as PausedAuto,e as ReadyAuto,r as RunningAuto,T as RunningManual,A as RunningManualT1,E as RunningManualT2,n as StoppedAuto,At as __namedExportsOrder,Tt as default};
