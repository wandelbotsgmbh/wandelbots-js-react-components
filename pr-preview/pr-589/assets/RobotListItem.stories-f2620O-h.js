import{n as e}from"./chunk-DnJy8xQt.js";import{Di as t,G as n,K as r,Ma as i,Oi as a,U as o,W as s,q as c}from"./iframe-BYoHjiUl.js";var l,u,d,f,p;e((()=>{t(),s(),c(),l=i(),u={title:`Components/RobotListItem`,component:o,tags:[`!dev`],parameters:{layout:`padded`},argTypes:{robotName:{control:`text`,description:`The name of the robot`,table:{type:{summary:`string`}}},robotType:{control:`text`,description:`The type/model of the robot`,table:{type:{summary:`string`}}},setupState:{control:`radio`,options:[r.PRECONDITION_NOT_FULFILLED,r.ROBOT_DISCONNECTED,r.READY],description:`The current setup readiness state of the robot`,table:{type:{summary:`RobotSetupReadinessState`}}},PreconditionComponent:{control:`select`,options:[`RobotSetupReadinessIndicator`,`null`],mapping:{RobotSetupReadinessIndicator:n,null:null},description:`Component to render for the precondition indicator. Pass null to hide it.`,table:{type:{summary:`ComponentType<{ setupState: RobotSetupReadinessState }> | null`},defaultValue:{summary:`RobotSetupReadinessIndicator`}}},className:{control:`text`,description:`Additional CSS class name`,table:{type:{summary:`string`}}}},args:{robotName:`Robot A1`,robotType:`Universal Robot UR5e`,setupState:r.READY,PreconditionComponent:n}},d={},f={name:`Robot List`,render:()=>(0,l.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:2,width:`fit-content`},children:[(0,l.jsx)(o,{robotName:`Robot A1`,robotType:`Universal Robot UR5e`,setupState:r.READY}),(0,l.jsx)(o,{robotName:`Robot B2`,robotType:`KUKA KR 6 R900 sixx`,setupState:r.ROBOT_DISCONNECTED}),(0,l.jsx)(o,{robotName:`Production Line Robot`,robotType:`ABB IRB 1200`,setupState:r.PRECONDITION_NOT_FULFILLED}),(0,l.jsx)(o,{robotName:`Quality Control Robot`,robotType:`Fanuc LR Mate 200iD`,setupState:r.READY}),(0,l.jsx)(o,{robotName:`Assembly Station Robot with Very Long Name`,robotType:`Staubli TX2-90L with Extended Specifications`,setupState:r.ROBOT_DISCONNECTED})]}),parameters:{docs:{description:{story:`Example showing multiple robot list items in different states, including text overflow handling for long names.`}}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: "Robot List",
  render: () => <Box sx={{
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "fit-content"
  }}>
      <RobotListItem robotName="Robot A1" robotType="Universal Robot UR5e" setupState={RobotSetupReadinessState.READY} />
      <RobotListItem robotName="Robot B2" robotType="KUKA KR 6 R900 sixx" setupState={RobotSetupReadinessState.ROBOT_DISCONNECTED} />
      <RobotListItem robotName="Production Line Robot" robotType="ABB IRB 1200" setupState={RobotSetupReadinessState.PRECONDITION_NOT_FULFILLED} />
      <RobotListItem robotName="Quality Control Robot" robotType="Fanuc LR Mate 200iD" setupState={RobotSetupReadinessState.READY} />
      <RobotListItem robotName="Assembly Station Robot with Very Long Name" robotType="Staubli TX2-90L with Extended Specifications" setupState={RobotSetupReadinessState.ROBOT_DISCONNECTED} />
    </Box>,
  parameters: {
    docs: {
      description: {
        story: "Example showing multiple robot list items in different states, including text overflow handling for long names."
      }
    }
  }
}`,...f.parameters?.docs?.source}}},p=[`Interactive`,`RobotListExample`]}))();export{d as Interactive,f as RobotListExample,p as __namedExportsOrder,u as default};