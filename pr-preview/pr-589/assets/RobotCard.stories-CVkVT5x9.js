import{n as e}from"./chunk-DnJy8xQt.js";import{Di as t,Ma as n,Mt as r,Nt as i,Oi as a,Sr as o,cr as s,dr as c,lr as l,or as u,sr as d,ur as f,xr as p}from"./iframe-86veRUl1.js";import{a as m,n as h,o as g,r as _,t as v}from"./robotStoryConfig-FFyyLJmV.js";function y(e){let t=u(e.modelFromController),n={rapidlyChangingMotionState:{...g,joint_position:t||[0,0,0,0,0,0]},modelFromController:e.modelFromController,dhParameters:e.dhParameters||[],motionGroupId:`0`,controllerId:e.modelFromController},{modelFromController:r,dhParameters:i,...a}=e;return(0,b.jsx)(s,{...a,connectedMotionGroup:n,robotComponent:e.robotComponent||(e=>(0,b.jsx)(f,{...e,getModel:h}))})}var b,x,S,C,w,T,E,D,O;e((()=>{t(),r(),o(),l(),d(),c(),m(),_(),b=n(),x=()=>(0,b.jsxs)(a,{children:[(0,b.jsx)(a,{sx:{mb:1,color:`text.secondary`,fontSize:`14px`},children:`Runtime`}),(0,b.jsx)(a,{sx:{fontSize:`18px`,fontWeight:`bold`},children:`05:23`})]}),S={title:`Components/RobotCard/Stories`,tags:[`!dev`],parameters:{layout:`centered`},argTypes:{robotName:{control:`text`,description:`Name of the robot displayed at the top`},programState:{control:`select`,options:[p.IDLE,p.PREPARING,p.STARTING,p.RUNNING,p.PAUSING,p.PAUSED,p.STOPPING,p.COMPLETED,p.FAILED,p.STOPPED,p.ERROR],description:`The current state of the program execution`},safetyState:{control:`select`,options:[`SAFETY_STATE_NORMAL`,`SAFETY_STATE_DEVICE_EMERGENCY_STOP`,`SAFETY_STATE_ROBOT_EMERGENCY_STOP`,`SAFETY_STATE_STOP_0`,`SAFETY_STATE_STOP_1`,`SAFETY_STATE_STOP_2`,`SAFETY_STATE_PROTECTIVE_STOP`,`SAFETY_STATE_STOP`,`SAFETY_STATE_REDUCED`,`SAFETY_STATE_MASTERING`,`SAFETY_STATE_CONFIRM_SAFETY`,`SAFETY_STATE_OPERATOR_SAFETY`,`SAFETY_STATE_RECOVERY`,`SAFETY_STATE_VIOLATION`,`SAFETY_STATE_UNKNOWN`,`SAFETY_STATE_FAULT`],description:`Current safety state of the robot controller`},operationMode:{control:`select`,options:[`OPERATION_MODE_AUTO`,`OPERATION_MODE_MANUAL`,`OPERATION_MODE_MANUAL_T1`,`OPERATION_MODE_MANUAL_T2`],description:`Current operation mode of the robot controller`},driveToHomeEnabled:{control:`boolean`,description:`Whether the Drive to Home button should be enabled`},modelFromController:{control:`select`,options:[`UniversalRobots_UR3e`,`UniversalRobots_UR5e`,`UniversalRobots_UR10e`,`KUKA_KR6_R700_2`],description:`Robot model to display`},showCustomContent:{control:`boolean`,description:`Whether to show custom content component example`}},args:{robotName:`UR5e Robot`,programState:p.IDLE,safetyState:`SAFETY_STATE_NORMAL`,operationMode:`OPERATION_MODE_AUTO`,driveToHomeEnabled:!0,modelFromController:`UniversalRobots_UR5e`,showCustomContent:!1}},C={args:{robotName:`UR5e Robot`,programState:p.IDLE,safetyState:`SAFETY_STATE_NORMAL`,operationMode:`OPERATION_MODE_AUTO`,driveToHomeEnabled:!1,modelFromController:`UniversalRobots_UR5e`},loaders:[async()=>({dhParameters:await v(`UniversalRobots_UR5e`)})],render:function(e,{loaded:{dhParameters:t}}){return(0,b.jsx)(a,{sx:{display:`flex`,justifyContent:`center`,padding:2,width:484,height:578},children:(0,b.jsx)(y,{robotName:e.robotName,programState:e.programState,safetyState:e.safetyState,operationMode:e.operationMode,driveToHomeEnabled:e.driveToHomeEnabled,modelFromController:e.modelFromController,dhParameters:t,customContentComponent:e.showCustomContent?x:void 0})})}},w={loaders:[async()=>({robotConfigs:await Promise.all([{model:`UniversalRobots_UR5e`,dhParameters:await v(`UniversalRobots_UR5e`)},{model:`UniversalRobots_UR10e`,dhParameters:await v(`UniversalRobots_UR10e`)},{model:`KUKA_KR6_R700_2`,dhParameters:await v(`KUKA_KR6_R700_2`)}])})],render:function(e,{loaded:{robotConfigs:t}}){return(0,b.jsx)(i,{spacing:1,sx:{padding:1,width:500,overflow:`auto`},children:[{name:`UR5e Station A`,modelFromController:t[0].model,dhParameters:t[0].dhParameters,programState:p.RUNNING,safetyState:`SAFETY_STATE_NORMAL`,operationMode:`OPERATION_MODE_AUTO`},{name:`UR10e Station B`,modelFromController:t[1].model,dhParameters:t[1].dhParameters,programState:p.PAUSED,safetyState:`SAFETY_STATE_NORMAL`,operationMode:`OPERATION_MODE_AUTO`},{name:`KUKA Station C`,modelFromController:t[2].model,dhParameters:t[2].dhParameters,programState:p.IDLE,safetyState:`SAFETY_STATE_STOP`,operationMode:`OPERATION_MODE_MANUAL`}].map(e=>(0,b.jsx)(a,{sx:{height:300},children:(0,b.jsx)(y,{robotName:e.name,programState:e.programState,safetyState:e.safetyState,operationMode:e.operationMode,driveToHomeEnabled:e.programState===p.IDLE,modelFromController:e.modelFromController,dhParameters:e.dhParameters})},e.name))})}},T={args:{robotName:`Compact UR3e`,programState:p.IDLE,safetyState:`SAFETY_STATE_NORMAL`,operationMode:`OPERATION_MODE_AUTO`,driveToHomeEnabled:!1,modelFromController:`UniversalRobots_UR3e`},loaders:[async()=>({dhParameters:await v(`UniversalRobots_UR3e`)})],render:function(e,{loaded:{dhParameters:t}}){return(0,b.jsx)(a,{sx:{display:`flex`,justifyContent:`center`,padding:2,width:300,height:400},children:(0,b.jsx)(y,{robotName:e.robotName,programState:e.programState,safetyState:e.safetyState,operationMode:e.operationMode,driveToHomeEnabled:e.driveToHomeEnabled,modelFromController:e.modelFromController,dhParameters:t})})}},E={loaders:[async()=>({dhParameters:await v(`UniversalRobots_UR5e`)})],render:function(e,{loaded:{dhParameters:t}}){return(0,b.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:3,padding:2},children:[(0,b.jsxs)(a,{sx:{width:800,height:400,border:`2px dashed`,borderColor:`divider`,borderRadius:2,display:`flex`,flexDirection:`column`,gap:1,p:1},children:[(0,b.jsx)(a,{sx:{typography:`subtitle2`,color:`text.secondary`,textAlign:`center`},children:`Landscape Mode (800×400) - Robot on Left, Content on Right`}),(0,b.jsx)(a,{sx:{flex:1},children:(0,b.jsx)(y,{robotName:`UR5e Landscape`,programState:p.RUNNING,safetyState:`SAFETY_STATE_NORMAL`,operationMode:`OPERATION_MODE_AUTO`,driveToHomeEnabled:e.driveToHomeEnabled,modelFromController:`UniversalRobots_UR5e`,dhParameters:t})})]}),(0,b.jsxs)(a,{sx:{width:400,height:600,border:`2px dashed`,borderColor:`divider`,borderRadius:2,display:`flex`,flexDirection:`column`,gap:1,p:1},children:[(0,b.jsx)(a,{sx:{typography:`subtitle2`,color:`text.secondary`,textAlign:`center`},children:`Portrait Mode (400×600) - Vertical Layout`}),(0,b.jsx)(a,{sx:{flex:1},children:(0,b.jsx)(y,{robotName:`UR5e Portrait`,programState:p.IDLE,safetyState:`SAFETY_STATE_NORMAL`,operationMode:`OPERATION_MODE_AUTO`,driveToHomeEnabled:e.driveToHomeEnabled,modelFromController:`UniversalRobots_UR5e`,dhParameters:t})})]}),(0,b.jsxs)(a,{sx:{maxWidth:600,textAlign:`center`,color:`text.secondary`,typography:`body2`},children:[`The RobotCard automatically detects its container's aspect ratio and adjusts the layout accordingly:`,(0,b.jsx)(`br`,{}),`• `,(0,b.jsx)(`strong`,{children:`Landscape:`}),` Robot positioned on left (50% width), content on right with left-aligned text`,(0,b.jsx)(`br`,{}),`• `,(0,b.jsx)(`strong`,{children:`Portrait:`}),` Traditional vertical layout with robot in center`]})]})}},D={args:{robotName:`Resizable Robot`,programState:p.IDLE,safetyState:`SAFETY_STATE_NORMAL`,operationMode:`OPERATION_MODE_AUTO`,driveToHomeEnabled:!0,modelFromController:`UniversalRobots_UR5e`},loaders:[async e=>({dhParameters:await v(e.args.modelFromController||`UniversalRobots_UR5e`)})],render:function(e,{loaded:{dhParameters:t}}){return(0,b.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:2,width:`100%`,maxWidth:800,margin:`0 auto`,padding:2},children:[(0,b.jsxs)(a,{sx:{color:`text.secondary`,typography:`body2`,textAlign:`center`,mb:2},children:[(0,b.jsx)(`strong`,{children:`Responsive Test:`}),` Drag the resize handle below to test responsive behavior.`,(0,b.jsx)(`br`,{}),`• `,(0,b.jsx)(`strong`,{children:`Landscape:`}),` Robot scales at `,`<450px`,`/`,`<550px`,`, hides at `,`<350px`,` width or `,`<250px`,` height`,(0,b.jsx)(`br`,{}),`• `,(0,b.jsx)(`strong`,{children:`Portrait:`}),` Robot scales at `,`<300px`,`/`,`<400px`,`, hides at `,`<250px`,` width or `,`<180px`,` height`,(0,b.jsx)(`br`,{}),`• Less aggressive scaling/hiding for portrait mode to preserve central robot display`,(0,b.jsx)(`br`,{}),`• Padding remains consistent for visual harmony`]}),(0,b.jsx)(a,{sx:{resize:`both`,overflow:`auto`,border:`2px dashed`,borderColor:`primary.main`,borderRadius:2,padding:1,minWidth:200,minHeight:150,width:400,height:300,background:`background.paper`,position:`relative`,"&::after":{content:`"↘ Drag to resize"`,position:`absolute`,bottom:4,right:4,fontSize:12,color:`text.disabled`,pointerEvents:`none`}},children:(0,b.jsx)(y,{robotName:e.robotName,programState:e.programState,safetyState:e.safetyState,operationMode:e.operationMode,driveToHomeEnabled:e.driveToHomeEnabled,modelFromController:e.modelFromController,dhParameters:t})}),(0,b.jsx)(a,{sx:{color:`text.secondary`,typography:`caption`,textAlign:`center`,mt:1},children:`Try different sizes to see the responsive behavior in action!`})]})}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source},description:{story:`Basic RobotCard showing the component structure without complex interactions.
This demonstrates the layout and visual hierarchy of the card.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source},description:{story:`Multiple robot cards displayed in a MUI Stack with landscape orientation
to demonstrate how they would appear in a multi-robot monitoring interface.
Each card shows a different robot model with various states in landscape format,
demonstrating the behavior of RobotCards within a Material-UI Stack component.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source},description:{story:`Compact variant of the robot card with smaller dimensions
suitable for dense dashboard layouts.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source},description:{story:`Landscape layout demonstration showing how the RobotCard automatically
adapts to landscape aspect ratios by placing the robot on the left and
content on the right with left-aligned text elements.`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source},description:{story:`Test responsive behavior with a resizable container.
Drag the resize handle to see how the robot scales and eventually hides at small sizes.
The component maintains consistent padding while making the 3D robot responsive.`,...D.parameters?.docs?.description}}},O=[`Basic`,`MultipleRobots`,`CompactSize`,`LandscapeLayout`,`ResizableTest`]}))();export{C as Basic,T as CompactSize,E as LandscapeLayout,w as MultipleRobots,D as ResizableTest,O as __namedExportsOrder,S as default};