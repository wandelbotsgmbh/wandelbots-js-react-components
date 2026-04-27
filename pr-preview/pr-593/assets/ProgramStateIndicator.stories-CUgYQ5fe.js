import{n as e}from"./chunk-DnJy8xQt.js";import{S as t,xr as n,yr as r}from"./iframe-DpqMHKse.js";var i,a,o,s,c,l,u,d,f,p,m;e((()=>{t(),i={title:`Components/ProgramStateIndicator`,component:r,tags:[`!dev`],parameters:{layout:`centered`,docs:{description:{component:`
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
        `}}},argTypes:{programState:{control:`select`,options:[n.IDLE,n.PREPARING,n.STARTING,n.RUNNING,n.PAUSING,n.PAUSED,n.STOPPING,n.COMPLETED,n.FAILED,n.STOPPED,n.ERROR],description:`The current state of the program execution`,table:{type:{summary:`ProgramState`}}},safetyState:{control:`select`,options:[`SAFETY_STATE_NORMAL`,`SAFETY_STATE_DEVICE_EMERGENCY_STOP`,`SAFETY_STATE_ROBOT_EMERGENCY_STOP`,`SAFETY_STATE_STOP_0`,`SAFETY_STATE_STOP_1`,`SAFETY_STATE_STOP_2`,`SAFETY_STATE_PROTECTIVE_STOP`,`SAFETY_STATE_STOP`,`SAFETY_STATE_REDUCED`,`SAFETY_STATE_MASTERING`,`SAFETY_STATE_CONFIRM_SAFETY`,`SAFETY_STATE_OPERATOR_SAFETY`,`SAFETY_STATE_RECOVERY`,`SAFETY_STATE_VIOLATION`,`SAFETY_STATE_UNKNOWN`,`SAFETY_STATE_FAULT`],description:`Current safety state of the robot controller`},operationMode:{control:`select`,options:[`OPERATION_MODE_AUTO`,`OPERATION_MODE_MANUAL`,`OPERATION_MODE_MANUAL_T1`,`OPERATION_MODE_MANUAL_T2`],description:`Current operation mode of the robot controller`}},args:{programState:n.IDLE,safetyState:`SAFETY_STATE_NORMAL`,operationMode:`OPERATION_MODE_AUTO`}},a={args:{programState:n.IDLE,safetyState:`SAFETY_STATE_NORMAL`,operationMode:`OPERATION_MODE_AUTO`}},o={args:{programState:n.RUNNING,safetyState:`SAFETY_STATE_NORMAL`,operationMode:`OPERATION_MODE_AUTO`}},s={args:{programState:n.PAUSED,safetyState:`SAFETY_STATE_NORMAL`,operationMode:`OPERATION_MODE_AUTO`}},c={args:{programState:n.RUNNING,safetyState:`SAFETY_STATE_FAULT`,operationMode:`OPERATION_MODE_AUTO`}},l={args:{programState:n.RUNNING,safetyState:`SAFETY_STATE_DEVICE_EMERGENCY_STOP`,operationMode:`OPERATION_MODE_AUTO`}},u={args:{programState:n.RUNNING,safetyState:`SAFETY_STATE_STOP`,operationMode:`OPERATION_MODE_AUTO`}},d={args:{programState:n.RUNNING,safetyState:`SAFETY_STATE_NORMAL`,operationMode:`OPERATION_MODE_MANUAL`}},f={args:{programState:n.RUNNING,safetyState:`SAFETY_STATE_NORMAL`,operationMode:`OPERATION_MODE_MANUAL_T1`}},p={args:{programState:n.RUNNING,safetyState:`SAFETY_STATE_NORMAL`,operationMode:`OPERATION_MODE_MANUAL_T2`}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.IDLE,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO"
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.RUNNING,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO"
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.PAUSED,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO"
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.RUNNING,
    safetyState: "SAFETY_STATE_FAULT",
    operationMode: "OPERATION_MODE_AUTO"
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.RUNNING,
    safetyState: "SAFETY_STATE_DEVICE_EMERGENCY_STOP",
    operationMode: "OPERATION_MODE_AUTO"
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.RUNNING,
    safetyState: "SAFETY_STATE_STOP",
    operationMode: "OPERATION_MODE_AUTO"
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.RUNNING,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_MANUAL"
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.RUNNING,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_MANUAL_T1"
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    programState: ProgramState.RUNNING,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_MANUAL_T2"
  }
}`,...p.parameters?.docs?.source}}},m=[`ReadyAuto`,`RunningAuto`,`PausedAuto`,`ErrorAuto`,`EStopAuto`,`StoppedAuto`,`RunningManual`,`RunningManualT1`,`RunningManualT2`]}))();export{l as EStopAuto,c as ErrorAuto,s as PausedAuto,a as ReadyAuto,o as RunningAuto,d as RunningManual,f as RunningManualT1,p as RunningManualT2,u as StoppedAuto,m as __namedExportsOrder,i as default};