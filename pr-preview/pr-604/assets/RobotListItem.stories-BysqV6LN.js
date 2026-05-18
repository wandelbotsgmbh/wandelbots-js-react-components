import{i as e}from"./preload-helper-Cs4UwXAW.js";import{Ga as t,Hi as n,Vi as r,at as i,ct as a,it as o,ot as s,st as c}from"./iframe-BvHxi_cZ.js";var l,u,d,f,p;e((()=>{r(),i(),a(),l=t(),u={title:`Components/RobotListItem`,component:o,tags:[`!dev`],parameters:{layout:`padded`},argTypes:{robotName:{control:`text`,description:`The name of the robot`,table:{type:{summary:`string`}}},robotType:{control:`text`,description:`The type/model of the robot`,table:{type:{summary:`string`}}},setupState:{control:`radio`,options:[c.PRECONDITION_NOT_FULFILLED,c.ROBOT_DISCONNECTED,c.READY],description:`The current setup readiness state of the robot`,table:{type:{summary:`RobotSetupReadinessState`}}},PreconditionComponent:{control:`select`,options:[`RobotSetupReadinessIndicator`,`null`],mapping:{RobotSetupReadinessIndicator:s,null:null},description:`Component to render for the precondition indicator. Pass null to hide it.`,table:{type:{summary:`ComponentType<{ setupState: RobotSetupReadinessState }> | null`},defaultValue:{summary:`RobotSetupReadinessIndicator`}}},className:{control:`text`,description:`Additional CSS class name`,table:{type:{summary:`string`}}}},args:{robotName:`Robot A1`,robotType:`Universal Robot UR5e`,setupState:c.READY,PreconditionComponent:s}},d={},f={name:`Robot List`,render:()=>(0,l.jsxs)(n,{sx:{display:`flex`,flexDirection:`column`,gap:2,width:`fit-content`},children:[(0,l.jsx)(o,{robotName:`Robot A1`,robotType:`Universal Robot UR5e`,setupState:c.READY}),(0,l.jsx)(o,{robotName:`Robot B2`,robotType:`KUKA KR 6 R900 sixx`,setupState:c.ROBOT_DISCONNECTED}),(0,l.jsx)(o,{robotName:`Production Line Robot`,robotType:`ABB IRB 1200`,setupState:c.PRECONDITION_NOT_FULFILLED}),(0,l.jsx)(o,{robotName:`Quality Control Robot`,robotType:`Fanuc LR Mate 200iD`,setupState:c.READY}),(0,l.jsx)(o,{robotName:`Assembly Station Robot with Very Long Name`,robotType:`Staubli TX2-90L with Extended Specifications`,setupState:c.ROBOT_DISCONNECTED})]}),parameters:{docs:{description:{story:`Example showing multiple robot list items in different states, including text overflow handling for long names.`}}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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