import{n as e}from"./chunk-DnJy8xQt.js";import{M as t,S as n}from"./iframe-C06mTC8J.js";var r,i,a,o,s,c,l,u,d,f;e((()=>{n(),r={title:`Safety/SafetyBar`,component:t,tags:[`!dev`],parameters:{layout:`padded`},args:{isVirtual:!1,motionGroupId:`robot1`,operationMode:`OPERATION_MODE_AUTO`,safetyState:`SAFETY_STATE_NORMAL`,compact:!0},argTypes:{isVirtual:{control:`boolean`,description:`Whether the robot is virtual or physical`,table:{type:{summary:`boolean`}}},motionGroupId:{control:`text`,description:`ID of the motion group`,table:{type:{summary:`string`}}},operationMode:{control:`select`,options:[`OPERATION_MODE_AUTO`,`OPERATION_MODE_MANUAL`,`OPERATION_MODE_MANUAL_T1`,`OPERATION_MODE_MANUAL_T2`],description:`Current operation mode of the robot`},compact:{control:`boolean`,description:`Whether to display the safety bar in compact mode`,table:{defaultValue:{summary:`true`}}},safetyState:{control:`select`,options:[`SAFETY_STATE_NORMAL`,`SAFETY_STATE_DEVICE_EMERGENCY_STOP`,`SAFETY_STATE_ROBOT_EMERGENCY_STOP`,`SAFETY_STATE_STOP_0`,`SAFETY_STATE_STOP_1`,`SAFETY_STATE_STOP_2`,`SAFETY_STATE_PROTECTIVE_STOP`,`SAFETY_STATE_STOP`,`SAFETY_STATE_REDUCED`,`SAFETY_STATE_MASTERING`,`SAFETY_STATE_CONFIRM_SAFETY`,`SAFETY_STATE_OPERATOR_SAFETY`,`SAFETY_STATE_RECOVERY`,`SAFETY_STATE_VIOLATION`,`SAFETY_STATE_UNKNOWN`,`SAFETY_STATE_FAULT`],description:`Current safety state of the robot`}}},i={},a={args:{isVirtual:!0,motionGroupId:`virtual_robot`}},o={args:{operationMode:`OPERATION_MODE_MANUAL`}},s={args:{safetyState:`SAFETY_STATE_DEVICE_EMERGENCY_STOP`}},c={args:{safetyState:`SAFETY_STATE_PROTECTIVE_STOP`}},l={args:{safetyState:`SAFETY_STATE_FAULT`}},u={args:{compact:!0,safetyState:`SAFETY_STATE_NORMAL`,operationMode:`OPERATION_MODE_AUTO`}},d={args:{compact:!1,safetyState:`SAFETY_STATE_NORMAL`,operationMode:`OPERATION_MODE_AUTO`}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    isVirtual: true,
    motionGroupId: "virtual_robot"
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    operationMode: "OPERATION_MODE_MANUAL"
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    safetyState: "SAFETY_STATE_DEVICE_EMERGENCY_STOP"
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    safetyState: "SAFETY_STATE_PROTECTIVE_STOP"
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    safetyState: "SAFETY_STATE_FAULT"
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    compact: true,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO"
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    compact: false,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO"
  }
}`,...d.parameters?.docs?.source}}},f=[`Interactive`,`VirtualRobot`,`ManualMode`,`EmergencyStop`,`ProtectiveStop`,`ErrorState`,`CompactView`,`ExtendedView`]}))();export{u as CompactView,s as EmergencyStop,l as ErrorState,d as ExtendedView,i as Interactive,o as ManualMode,c as ProtectiveStop,a as VirtualRobot,f as __namedExportsOrder,r as default};