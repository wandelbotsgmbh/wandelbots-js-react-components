import{j as o,r as g}from"./iframe-odfKxiTV.js";import{o as Z}from"./index-BJN1u2tk.js";import{e as K}from"./externalizeComponent-Di913JnV.js";import{c as oe,d as I,o as ne}from"./mobx.esm-D1cTsgoC.js";import{c as L}from"./createSvgIcon-leizhUbI.js";import{E as ae}from"./ExpandMore-BsH93bpO.js";import{u as re}from"./useTheme-B3GCKj7e.js";import{P as ie}from"./Paper-DrWsVeZL.js";import{B as h}from"./Box-DGhUiJhe.js";import{T as b}from"./Typography-LyVcd3Va.js";import{B as p}from"./Button--PBfIG2p.js";import{I as E}from"./IconButton-WCKs6kKZ.js";import{S as f}from"./Stack-fM7dFeIR.js";import"./preload-helper-Dp1pzeXC.js";import"./context-BBIOFhRA.js";import"./SvgIcon-BhLLzV0v.js";import"./ButtonBase-APn3V94D.js";import"./useTimeout-CoRBxoT9.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-Ca1EZ2xA.js";import"./styled-mrztSxry.js";import"./useThemeProps-DESBK_k_.js";import"./getThemeProps-ur7W5uuC.js";class se{constructor(){this.messages=[],this.addMessage=(e,r="info")=>{const d={id:Math.random().toString(36).substring(2,11),timestamp:new Date,message:e,level:r};this.messages.push(d)},this.clearMessages=()=>{this.messages=[]},this.addInfo=e=>{this.addMessage(e,"info")},this.addWarning=e=>{this.addMessage(e,"warning")},this.addError=e=>{this.addMessage(e,"error")},this.addDebug=e=>{this.addMessage(e,"debug")},oe(this,{messages:ne,addMessage:I,clearMessages:I})}}const le=L(o.jsx("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"})),de=L(o.jsx("path",{d:"M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"})),ce=L(o.jsx("path",{d:"m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"})),y=(a,e,r)=>({id:r||`${Date.now()}-${Math.random().toString(36).substring(2,11)}`,timestamp:new Date,message:a,level:e}),T=(a,e)=>y(a,"debug",e),j=(a,e)=>y(a,"info",e),$=(a,e)=>y(a,"warning",e),z=(a,e)=>y(a,"error",e),C=K(Z(a=>{var k;const{messages:e=[],onClear:r,height:d=400,sx:s}=a,t=re(),n=g.useRef(null);g.useEffect(()=>{if(e.length===0)return;const i=n.current;if(!i)return;const u=setTimeout(()=>{i.scrollTop=i.scrollHeight},10);return()=>clearTimeout(u)},[e.length]);const l=i=>i.toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"}),c=i=>{switch(i){case"error":return t.palette.error.main;case"warning":return t.palette.warning.main;case"info":return t.palette.info.main;case"debug":return t.palette.text.disabled;default:return t.palette.text.secondary}},S=({message:i})=>{const[u,X]=g.useState(!1),[Y,_]=g.useState(!1),[R,P]=g.useState(!1),D=i.message.length>150,Q=async()=>{try{await navigator.clipboard.writeText(i.message),_(!0),setTimeout(()=>_(!1),2e3)}catch(te){console.error("Failed to copy message:",te)}},ee=D&&!u?`${i.message.substring(0,150)}...`:i.message;return o.jsx(h,{onMouseEnter:()=>P(!0),onMouseLeave:()=>P(!1),sx:{display:"flex",gap:1,fontFamily:"monospace",flexDirection:"column","&:hover":{backgroundColor:t.palette.action.hover},borderRadius:"4px",padding:"2px 4px",margin:"-2px -4px"},children:o.jsxs(h,{sx:{display:"flex",gap:1},children:[o.jsxs(b,{component:"span",sx:{fontWeight:400,fontSize:"12px",lineHeight:"18px",letterSpacing:"0.4px",color:t.palette.text.disabled,whiteSpace:"nowrap",flexShrink:0},children:["[",l(i.timestamp),"]"]}),o.jsx(b,{component:"span",sx:{fontWeight:400,fontSize:"12px",lineHeight:"18px",letterSpacing:"0.4px",color:c(i.level),wordBreak:"break-word",overflowWrap:"anywhere",hyphens:"auto",flex:1,whiteSpace:"pre-wrap"},children:ee}),o.jsxs(h,{sx:{display:"flex",alignItems:"flex-start",gap:.5,opacity:R?1:0,transition:"opacity 0.2s ease-in-out",visibility:R?"visible":"hidden"},children:[o.jsx(E,{size:"small",onClick:Q,sx:{padding:"2px",color:t.palette.text.secondary,"&:hover":{backgroundColor:t.palette.action.hover}},title:Y?"Copied!":"Copy message",children:o.jsx(le,{sx:{fontSize:12}})}),D&&o.jsx(E,{size:"small",onClick:()=>X(!u),sx:{padding:"2px",color:t.palette.text.secondary,"&:hover":{backgroundColor:t.palette.action.hover}},title:u?"Collapse":"Expand",children:u?o.jsx(ce,{sx:{fontSize:12}}):o.jsx(ae,{sx:{fontSize:12}})})]})]})},i.id)};return o.jsxs(ie,{sx:{backgroundColor:((k=t.palette.backgroundPaperElevation)==null?void 0:k[2])||"#171927",backgroundImage:"none",height:d,display:"flex",flexDirection:"column",overflow:"hidden",...s},children:[o.jsxs(h,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px"},children:[o.jsxs(h,{sx:{display:"flex",alignItems:"center",gap:1},children:[o.jsx(de,{sx:{fontSize:16,color:t.palette.action.active,opacity:.56}}),o.jsx(b,{sx:{fontWeight:500,fontSize:"14px",lineHeight:"143%",letterSpacing:"0.17px",color:t.palette.text.primary},children:"Log"})]}),o.jsx(p,{onClick:r,variant:"text",sx:{fontWeight:500,fontSize:"13px",lineHeight:"22px",letterSpacing:"0.46px",color:t.palette.primary.main,textTransform:"none",minWidth:"auto",padding:"4px 8px","&:hover":{backgroundColor:`${t.palette.primary.main}14`}},children:"Clear"})]}),o.jsx(h,{ref:n,sx:{flex:1,overflow:"auto",padding:"8px 16px",display:"flex",flexDirection:"column",gap:"2px",scrollbarWidth:"thin",scrollbarColor:`${t.palette.divider} transparent`,"&::-webkit-scrollbar":{width:"6px"},"&::-webkit-scrollbar-track":{background:"transparent"},"&::-webkit-scrollbar-thumb":{backgroundColor:t.palette.divider,borderRadius:"3px","&:hover":{backgroundColor:t.palette.divider}}},children:e.length===0?o.jsx(b,{sx:{color:t.palette.text.disabled,fontSize:"12px",fontStyle:"italic",textAlign:"center",marginTop:2},children:"No log messages"}):e.map(i=>o.jsx(S,{message:i},i.id))})]})}));try{y.displayName="createLogMessage",y.__docgenInfo={description:"Utility function to create a log message",displayName:"createLogMessage",props:{}}}catch{}try{T.displayName="createDebugMessage",T.__docgenInfo={description:"Utility function to create a debug log message",displayName:"createDebugMessage",props:{}}}catch{}try{j.displayName="createInfoMessage",j.__docgenInfo={description:"Utility function to create an info log message",displayName:"createInfoMessage",props:{}}}catch{}try{$.displayName="createWarningMessage",$.__docgenInfo={description:"Utility function to create a warning log message",displayName:"createWarningMessage",props:{}}}catch{}try{z.displayName="createErrorMessage",z.__docgenInfo={description:"Utility function to create an error log message",displayName:"createErrorMessage",props:{}}}catch{}try{C.displayName="LogViewer",C.__docgenInfo={description:`A log viewer component that displays timestamped log messages with different levels.
Features a header with document icon and clear button, and scrollable message area.`,displayName:"LogViewer",props:{messages:{defaultValue:null,description:"Log messages to display",name:"messages",required:!0,type:{name:"LogMessage[]"}},onClear:{defaultValue:null,description:"Callback when clear button is clicked",name:"onClear",required:!1,type:{name:"() => void"}},height:{defaultValue:null,description:"Height of the component",name:"height",required:!1,type:{name:"string | number"}},sx:{defaultValue:null,description:"Additional styles",name:"sx",required:!1,type:{name:"SxProps"}}}}}catch{}const m=K(Z(a=>{const{store:e,onStoreReady:r,...d}=a,s=g.useRef(r);g.useEffect(()=>{s.current=r},[r]);const t=g.useMemo(()=>{var c;const l=e||new se;return(c=s.current)==null||c.call(s,l),l},[e]),n=()=>{t.clearMessages()};return o.jsx(C,{...d,messages:t.messages,onClear:n})}));try{m.displayName="LogPanel",m.__docgenInfo={description:"A complete log panel component with built-in state management.",displayName:"LogPanel",props:{store:{defaultValue:null,description:"Log store instance to use, or create one automatically if not provided",name:"store",required:!1,type:{name:"LogStore"}},height:{defaultValue:null,description:"Height of the component",name:"height",required:!1,type:{name:"string | number"}},sx:{defaultValue:null,description:"Additional styles",name:"sx",required:!1,type:{name:"SxProps"}},onStoreReady:{defaultValue:null,description:"Ref to the log store for external access",name:"onStoreReady",required:!1,type:{name:"(store: LogStore) => void"}}}}}catch{}const je={title:"Components/LogPanel",component:m,tags:["!dev"],parameters:{docs:{description:{component:`A complete log panel component with built-in state management using MobX. 

## Usage

\`\`\`tsx
function MyComponent() {
  const [logStore, setLogStore] = useState<LogStore>()

  return (
    <LogPanel 
      height={400}
      onStoreReady={setLogStore}
    />
  )
}

// Then use the store to add messages
logStore?.addInfo("Operation completed successfully")
logStore?.addError("Something went wrong")
logStore?.addWarning("Warning message")
logStore?.addDebug("Debug information")
\`\`\``}}},argTypes:{store:{control:!1,description:"Optional LogStore instance. If not provided, creates its own."},height:{control:{type:"text"},description:"Height of the component",defaultValue:400},onStoreReady:{action:"store-ready",description:"Callback when the store is ready for external access"}}},x={render:a=>{const[e,r]=g.useState(null),d=c=>{var S;r(c),(S=a.onStoreReady)==null||S.call(a,c)},s=()=>{e==null||e.addInfo(`Info: Operation completed at ${new Date().toLocaleTimeString()}`)},t=()=>{e==null||e.addWarning(`Warning: System approaching limits at ${new Date().toLocaleTimeString()}`)},n=()=>{e==null||e.addError(`Error: Connection failed at ${new Date().toLocaleTimeString()}`)},l=()=>{e==null||e.addDebug(`Debug: Function called with parameters {id: ${Math.floor(Math.random()*1e3)}, timestamp: ${new Date().toISOString()}}`)};return o.jsxs(f,{spacing:2,sx:{width:600},children:[o.jsxs(f,{direction:"row",spacing:1,children:[o.jsx(p,{variant:"outlined",size:"small",onClick:s,disabled:!e,children:"Add Info"}),o.jsx(p,{variant:"outlined",size:"small",onClick:t,color:"warning",disabled:!e,children:"Add Warning"}),o.jsx(p,{variant:"outlined",size:"small",onClick:n,color:"error",disabled:!e,children:"Add Error"}),o.jsx(p,{variant:"outlined",size:"small",onClick:l,disabled:!e,sx:{color:"text.disabled",borderColor:"text.disabled"},children:"Add Debug"})]}),o.jsx(m,{...a,onStoreReady:d})]})},args:{height:400},parameters:{docs:{description:{story:"Interactive log panel with built-in state management. Use the buttons above to add different types of log messages. The component manages its own LogStore internally."}}}},w={render:a=>{const e=r=>{r.addInfo("Nova client initialized and connected to robot controller"),r.addDebug("Connection parameters: {host: '192.168.1.100', port: 8080, timeout: 5000}"),r.addWarning("Joint 3 approaching velocity limit - reducing speed to 80%"),r.addError("Safety zone violation detected - emergency stop triggered"),r.addDebug("Error context: {zone_id: 'SZ_001', tcp_position: [245.67, -123.45, 378.90]}")};return o.jsx(m,{...a,onStoreReady:e})},args:{},parameters:{docs:{description:{story:"LogPanel with default height (400px) and some sample messages."}}}},v={render:a=>{const[e,r]=g.useState(null),d=t=>{r(t);for(let n=1;n<=50;n++){const l=n%10===0?"debug":n%7===0?"error":n%3===0?"warning":"info",c=new Date(Date.now()-(50-n)*1e3);l==="debug"?t.addDebug(`Debug trace #${n}: Function robotController.getJointPositions() returned [${n*15%180}, ${n*20%180}, ${n*25%180}, ${n*30%180}, ${n*35%180}, ${n*40%180}] in ${n%10+1}ms`):l==="error"?t.addError(`Robot motion error #${n}: Joint ${n%6+1} position feedback timeout. Communication with servo drive lost. Check encoder cables and power supply connections. Recovery requires manual joint reset procedure.`):l==="warning"?t.addWarning(`Motion planning warning #${n}: Path optimization detected potential singularity near joint configuration J${n%6}=${n*15%180}°`):t.addInfo(`Motion sequence #${n}: Waypoint reached successfully at ${c.toLocaleTimeString()}, TCP velocity: ${n*50%1e3}mm/s`)}},s=()=>{if(!e)return;const t=["Nova client connected to robot controller at 192.168.1.100","Motion group 0@ur5e initialized successfully","Wandelscript program compiled and validated","Robot moved to home position [0.0, -90.0, 0.0, -90.0, 0.0, 0.0]","Safety zone collision detected - motion stopped","TCP calibration completed with accuracy ±0.1mm","Joint velocity limits updated: [180°/s, 180°/s, 180°/s, 360°/s, 360°/s, 360°/s]","Emergency stop button pressed - all motions halted","Robot workspace boundaries recalibrated","Nova API rate limit: 100 requests remaining in current window","Gripper IO signal received: digital_out_0 = HIGH","Path planning optimization reduced cycle time by 12%","Robot temperature monitoring: Joint 1 at 45°C (normal range)","Wandelbots skill library updated to version 2.1.3","Motion execution completed in 4.2 seconds","Safety controller heartbeat lost - entering safe mode","Robot pose validation failed: position outside workspace","Nova WebSocket connection established with latency 15ms","Coordinate system transformation applied: base_link → tool0","Program execution paused - awaiting operator confirmation"],n=["info","warning","error","debug"],l=t[Math.floor(Math.random()*t.length)],c=n[Math.floor(Math.random()*n.length)];e.addMessage(l,c)};return o.jsxs(f,{spacing:2,sx:{width:700},children:[o.jsx(f,{direction:"row",spacing:1,children:o.jsx(p,{variant:"outlined",size:"small",onClick:s,disabled:!e,children:"Add Random Message"})}),o.jsx(m,{...a,onStoreReady:d})]})},args:{height:300},parameters:{docs:{description:{story:"LogPanel with many messages to demonstrate scrolling behavior. The component automatically scrolls to show the latest messages, and long messages are properly wrapped."}}}},M={render:a=>{const[e,r]=g.useState(null),d=t=>{r(t),t.addInfo("Simple connection established"),t.addWarning("Motion planning detected potential collision with safety zone SZ_001. Recommended path deviation: 15mm offset along Y-axis to maintain 50mm safety margin."),t.addError(`Fatal robot communication error occurred at ${new Date().toISOString()}: 
Connection to robot controller UR5e (Serial: 20231234567) was lost during critical motion sequence execution.

Error Details:
- Socket timeout after 5000ms
- Last received heartbeat: ${new Date(Date.now()-8e3).toISOString()}
- Motion state: EXECUTING (waypoint 15/23)
- Current joint positions: [12.5°, -95.3°, 47.8°, -142.1°, 89.7°, 0.0°]
- TCP position: [245.67, -123.45, 378.90] mm
- TCP orientation: [0.123, 0.456, 0.789, 0.321] quaternion

Network Diagnostics:
- Ping to 192.168.1.100: TIMEOUT (>1000ms)
- Switch port status: ACTIVE
- Cable integrity: OK
- Firewall rules: PASSED

Recovery Actions Required:
1. Check physical network connections to robot controller
2. Verify robot controller status LEDs (should be solid green)
3. Restart robot controller if necessary (hold power button 10 seconds)
4. Re-establish connection through Nova client
5. Perform homing sequence before resuming operations
6. Validate workspace calibration if position feedback errors persist

Impact Assessment:
- Production downtime: Estimated 15-30 minutes
- Work piece position: UNKNOWN (manual verification required)
- Safety status: SECURED (all motion stopped)

Contact support if error persists after following recovery procedures.
Reference: ERR_COMM_2024_0819_001`),t.addInfo("Recovery procedure initiated"),t.addError(`Wandelscript compilation failed with multiple syntax errors:

File: /workspace/programs/pick_and_place_v2.ws
Line 45: Unexpected token 'movej' - missing semicolon on previous line
Line 67: Undefined variable 'target_position_2' - did you mean 'target_position_1'?
Line 89: Function 'calculate_offset()' expects 3 parameters but received 2
Line 112: Invalid joint angle range: J4 = 195.5° exceeds maximum limit of 180°
Line 134: Unreachable code detected after return statement
Line 156: Missing closing bracket for IF statement starting at line 148

Compilation aborted. Please fix syntax errors and recompile.
For detailed syntax reference, see: https://docs.wandelbots.com/wandelscript/syntax`)},s=()=>{if(!e)return;const t=[`Stack trace for robot motion exception:
at RobotController.executeMotion() line 234
at MotionPlanner.planPath() line 156  
at PathOptimizer.calculateTrajectory() line 89
at CollisionDetector.checkSafetyZones() line 45
at SafetyController.validateMotion() line 12

Exception: Joint velocity limit exceeded during motion execution
Joint 3 commanded velocity: 195.5°/s (limit: 180°/s)
Motion was automatically stopped to prevent hardware damage.`,`Detailed calibration report for TCP offset calculation:
Robot: UR5e (Serial: 20231234567)
Tool: Pneumatic Gripper v2.1 (Weight: 0.85kg)
Calibration Method: 4-point touch

Measurement Points:
Point 1: Base[287.65, -156.23, 412.78] Tool[0.0, 0.0, 0.0]
Point 2: Base[287.65, -156.23, 412.78] Tool[45.0, 0.0, 0.0]  
Point 3: Base[287.65, -156.23, 412.78] Tool[0.0, 45.0, 0.0]
Point 4: Base[287.65, -156.23, 412.78] Tool[0.0, 0.0, 45.0]

Calculated TCP Offset: [0.0, 0.0, 145.7] mm
Standard Deviation: ±0.12mm (excellent precision)
Validation: PASSED (error < 0.5mm threshold)

Tool parameters updated in robot configuration.`,`Complete system diagnostics report generated at ${new Date().toISOString()}:

Hardware Status:
✓ Robot Controller: Online (Firmware 5.12.1)
✓ Safety PLC: Active (Emergency stops functional)  
✓ Servo Drives: All 6 axes responding normally
✓ I/O Modules: 16 digital inputs, 8 digital outputs operational
✓ Pneumatic System: 6.2 bar (within 6.0-7.0 bar range)
✓ Temperature Sensors: All joints within normal operating range

Network Configuration:
✓ Robot IP: 192.168.1.100 (static)
✓ Gateway: 192.168.1.1
✓ DNS: 8.8.8.8, 8.8.4.4
✓ Nova Client Connection: Stable (latency 12ms)
✓ WebSocket Status: Connected (Protocol v2.1)

Software Versions:
- Nova Core: 2.1.3
- Robot Driver: 1.8.2  
- Safety Module: 3.2.1
- Motion Planning: 4.1.0
- Wandelscript Runtime: 1.5.4

Performance Metrics (Last 24h):
- Uptime: 23h 47m (99.8%)
- Total Motions: 1,247
- Average Cycle Time: 24.6s
- Error Rate: 0.08% (1 error per 1,250 motions)
- Safety Stops: 0 (excellent)

Recommendations: No issues detected. System operating optimally.`],n=t[Math.floor(Math.random()*t.length)];e.addError(n)};return o.jsxs(f,{spacing:2,sx:{width:800},children:[o.jsx(f,{direction:"row",spacing:1,children:o.jsx(p,{variant:"outlined",size:"small",onClick:s,disabled:!e,children:"Add Long Message"})}),o.jsx(m,{...a,onStoreReady:d})]})},args:{height:400},parameters:{docs:{description:{story:"LogPanel demonstrating very long log messages with detailed stack traces, error reports, and system diagnostics. Long messages are automatically wrapped and can be scrolled within the log viewer."}}}};var W,N,A;x.parameters={...x.parameters,docs:{...(W=x.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: args => {
    const [logStore, setLogStore] = useState<LogStore | null>(null);
    const handleStoreReady = (store: LogStore) => {
      setLogStore(store);
      args.onStoreReady?.(store);
    };
    const addInfoMessage = () => {
      logStore?.addInfo(\`Info: Operation completed at \${new Date().toLocaleTimeString()}\`);
    };
    const addWarningMessage = () => {
      logStore?.addWarning(\`Warning: System approaching limits at \${new Date().toLocaleTimeString()}\`);
    };
    const addErrorMessage = () => {
      logStore?.addError(\`Error: Connection failed at \${new Date().toLocaleTimeString()}\`);
    };
    const addDebugMessage = () => {
      logStore?.addDebug(\`Debug: Function called with parameters {id: \${Math.floor(Math.random() * 1000)}, timestamp: \${new Date().toISOString()}}\`);
    };
    return <Stack spacing={2} sx={{
      width: 600
    }}>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="small" onClick={addInfoMessage} disabled={!logStore}>
            Add Info
          </Button>
          <Button variant="outlined" size="small" onClick={addWarningMessage} color="warning" disabled={!logStore}>
            Add Warning
          </Button>
          <Button variant="outlined" size="small" onClick={addErrorMessage} color="error" disabled={!logStore}>
            Add Error
          </Button>
          <Button variant="outlined" size="small" onClick={addDebugMessage} disabled={!logStore} sx={{
          color: "text.disabled",
          borderColor: "text.disabled"
        }}>
            Add Debug
          </Button>
        </Stack>
        <LogPanel {...args} onStoreReady={handleStoreReady} />
      </Stack>;
  },
  args: {
    height: 400
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive log panel with built-in state management. Use the buttons above to add different types of log messages. The component manages its own LogStore internally."
      }
    }
  }
}`,...(A=(N=x.parameters)==null?void 0:N.docs)==null?void 0:A.source}}};var O,U,V;w.parameters={...w.parameters,docs:{...(O=w.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => {
    const handleStoreReady = (store: LogStore) => {
      // Add some sample messages
      store.addInfo("Nova client initialized and connected to robot controller");
      store.addDebug("Connection parameters: {host: '192.168.1.100', port: 8080, timeout: 5000}");
      store.addWarning("Joint 3 approaching velocity limit - reducing speed to 80%");
      store.addError("Safety zone violation detected - emergency stop triggered");
      store.addDebug("Error context: {zone_id: 'SZ_001', tcp_position: [245.67, -123.45, 378.90]}");
    };
    return <LogPanel {...args} onStoreReady={handleStoreReady} />;
  },
  args: {
    // Use default height
  },
  parameters: {
    docs: {
      description: {
        story: "LogPanel with default height (400px) and some sample messages."
      }
    }
  }
}`,...(V=(U=w.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var B,H,q;v.parameters={...v.parameters,docs:{...(B=v.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => {
    const [logStore, setLogStore] = useState<LogStore | null>(null);
    const handleStoreReady = (store: LogStore) => {
      setLogStore(store);
      // Pre-populate with many messages to demonstrate scrolling
      for (let i = 1; i <= 50; i++) {
        const level = i % 10 === 0 ? "debug" : i % 7 === 0 ? "error" : i % 3 === 0 ? "warning" : "info";
        const timestamp = new Date(Date.now() - (50 - i) * 1000);
        if (level === "debug") {
          store.addDebug(\`Debug trace #\${i}: Function robotController.getJointPositions() returned [\${i * 15 % 180}, \${i * 20 % 180}, \${i * 25 % 180}, \${i * 30 % 180}, \${i * 35 % 180}, \${i * 40 % 180}] in \${i % 10 + 1}ms\`);
        } else if (level === "error") {
          store.addError(\`Robot motion error #\${i}: Joint \${i % 6 + 1} position feedback timeout. Communication with servo drive lost. Check encoder cables and power supply connections. Recovery requires manual joint reset procedure.\`);
        } else if (level === "warning") {
          store.addWarning(\`Motion planning warning #\${i}: Path optimization detected potential singularity near joint configuration J\${i % 6}=\${i * 15 % 180}°\`);
        } else {
          store.addInfo(\`Motion sequence #\${i}: Waypoint reached successfully at \${timestamp.toLocaleTimeString()}, TCP velocity: \${i * 50 % 1000}mm/s\`);
        }
      }
    };
    const addRandomMessage = () => {
      if (!logStore) return;
      const messages = ["Nova client connected to robot controller at 192.168.1.100", "Motion group 0@ur5e initialized successfully", "Wandelscript program compiled and validated", "Robot moved to home position [0.0, -90.0, 0.0, -90.0, 0.0, 0.0]", "Safety zone collision detected - motion stopped", "TCP calibration completed with accuracy ±0.1mm", "Joint velocity limits updated: [180°/s, 180°/s, 180°/s, 360°/s, 360°/s, 360°/s]", "Emergency stop button pressed - all motions halted", "Robot workspace boundaries recalibrated", "Nova API rate limit: 100 requests remaining in current window", "Gripper IO signal received: digital_out_0 = HIGH", "Path planning optimization reduced cycle time by 12%", "Robot temperature monitoring: Joint 1 at 45°C (normal range)", "Wandelbots skill library updated to version 2.1.3", "Motion execution completed in 4.2 seconds", "Safety controller heartbeat lost - entering safe mode", "Robot pose validation failed: position outside workspace", "Nova WebSocket connection established with latency 15ms", "Coordinate system transformation applied: base_link → tool0", "Program execution paused - awaiting operator confirmation"];
      const levels: Array<"info" | "warning" | "error" | "debug"> = ["info", "warning", "error", "debug"];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      logStore.addMessage(randomMessage, randomLevel);
    };
    return <Stack spacing={2} sx={{
      width: 700
    }}>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="small" onClick={addRandomMessage} disabled={!logStore}>
            Add Random Message
          </Button>
        </Stack>
        <LogPanel {...args} onStoreReady={handleStoreReady} />
      </Stack>;
  },
  args: {
    height: 300
  },
  parameters: {
    docs: {
      description: {
        story: "LogPanel with many messages to demonstrate scrolling behavior. The component automatically scrolls to show the latest messages, and long messages are properly wrapped."
      }
    }
  }
}`,...(q=(H=v.parameters)==null?void 0:H.docs)==null?void 0:q.source}}};var F,J,G;M.parameters={...M.parameters,docs:{...(F=M.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: args => {
    const [logStore, setLogStore] = useState<LogStore | null>(null);
    const handleStoreReady = (store: LogStore) => {
      setLogStore(store);

      // Add a variety of message lengths
      store.addInfo("Simple connection established");
      store.addWarning("Motion planning detected potential collision with safety zone SZ_001. Recommended path deviation: 15mm offset along Y-axis to maintain 50mm safety margin.");
      store.addError(\`Fatal robot communication error occurred at \${new Date().toISOString()}: 
Connection to robot controller UR5e (Serial: 20231234567) was lost during critical motion sequence execution.

Error Details:
- Socket timeout after 5000ms
- Last received heartbeat: \${new Date(Date.now() - 8000).toISOString()}
- Motion state: EXECUTING (waypoint 15/23)
- Current joint positions: [12.5°, -95.3°, 47.8°, -142.1°, 89.7°, 0.0°]
- TCP position: [245.67, -123.45, 378.90] mm
- TCP orientation: [0.123, 0.456, 0.789, 0.321] quaternion

Network Diagnostics:
- Ping to 192.168.1.100: TIMEOUT (>1000ms)
- Switch port status: ACTIVE
- Cable integrity: OK
- Firewall rules: PASSED

Recovery Actions Required:
1. Check physical network connections to robot controller
2. Verify robot controller status LEDs (should be solid green)
3. Restart robot controller if necessary (hold power button 10 seconds)
4. Re-establish connection through Nova client
5. Perform homing sequence before resuming operations
6. Validate workspace calibration if position feedback errors persist

Impact Assessment:
- Production downtime: Estimated 15-30 minutes
- Work piece position: UNKNOWN (manual verification required)
- Safety status: SECURED (all motion stopped)

Contact support if error persists after following recovery procedures.
Reference: ERR_COMM_2024_0819_001\`);
      store.addInfo("Recovery procedure initiated");
      store.addError(\`Wandelscript compilation failed with multiple syntax errors:

File: /workspace/programs/pick_and_place_v2.ws
Line 45: Unexpected token 'movej' - missing semicolon on previous line
Line 67: Undefined variable 'target_position_2' - did you mean 'target_position_1'?
Line 89: Function 'calculate_offset()' expects 3 parameters but received 2
Line 112: Invalid joint angle range: J4 = 195.5° exceeds maximum limit of 180°
Line 134: Unreachable code detected after return statement
Line 156: Missing closing bracket for IF statement starting at line 148

Compilation aborted. Please fix syntax errors and recompile.
For detailed syntax reference, see: https://docs.wandelbots.com/wandelscript/syntax\`);
    };
    const addLongMessage = () => {
      if (!logStore) return;
      const longMessages = [\`Stack trace for robot motion exception:
at RobotController.executeMotion() line 234
at MotionPlanner.planPath() line 156  
at PathOptimizer.calculateTrajectory() line 89
at CollisionDetector.checkSafetyZones() line 45
at SafetyController.validateMotion() line 12

Exception: Joint velocity limit exceeded during motion execution
Joint 3 commanded velocity: 195.5°/s (limit: 180°/s)
Motion was automatically stopped to prevent hardware damage.\`, \`Detailed calibration report for TCP offset calculation:
Robot: UR5e (Serial: 20231234567)
Tool: Pneumatic Gripper v2.1 (Weight: 0.85kg)
Calibration Method: 4-point touch

Measurement Points:
Point 1: Base[287.65, -156.23, 412.78] Tool[0.0, 0.0, 0.0]
Point 2: Base[287.65, -156.23, 412.78] Tool[45.0, 0.0, 0.0]  
Point 3: Base[287.65, -156.23, 412.78] Tool[0.0, 45.0, 0.0]
Point 4: Base[287.65, -156.23, 412.78] Tool[0.0, 0.0, 45.0]

Calculated TCP Offset: [0.0, 0.0, 145.7] mm
Standard Deviation: ±0.12mm (excellent precision)
Validation: PASSED (error < 0.5mm threshold)

Tool parameters updated in robot configuration.\`, \`Complete system diagnostics report generated at \${new Date().toISOString()}:

Hardware Status:
✓ Robot Controller: Online (Firmware 5.12.1)
✓ Safety PLC: Active (Emergency stops functional)  
✓ Servo Drives: All 6 axes responding normally
✓ I/O Modules: 16 digital inputs, 8 digital outputs operational
✓ Pneumatic System: 6.2 bar (within 6.0-7.0 bar range)
✓ Temperature Sensors: All joints within normal operating range

Network Configuration:
✓ Robot IP: 192.168.1.100 (static)
✓ Gateway: 192.168.1.1
✓ DNS: 8.8.8.8, 8.8.4.4
✓ Nova Client Connection: Stable (latency 12ms)
✓ WebSocket Status: Connected (Protocol v2.1)

Software Versions:
- Nova Core: 2.1.3
- Robot Driver: 1.8.2  
- Safety Module: 3.2.1
- Motion Planning: 4.1.0
- Wandelscript Runtime: 1.5.4

Performance Metrics (Last 24h):
- Uptime: 23h 47m (99.8%)
- Total Motions: 1,247
- Average Cycle Time: 24.6s
- Error Rate: 0.08% (1 error per 1,250 motions)
- Safety Stops: 0 (excellent)

Recommendations: No issues detected. System operating optimally.\`];
      const randomLongMessage = longMessages[Math.floor(Math.random() * longMessages.length)];
      logStore.addError(randomLongMessage);
    };
    return <Stack spacing={2} sx={{
      width: 800
    }}>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="small" onClick={addLongMessage} disabled={!logStore}>
            Add Long Message
          </Button>
        </Stack>
        <LogPanel {...args} onStoreReady={handleStoreReady} />
      </Stack>;
  },
  args: {
    height: 400
  },
  parameters: {
    docs: {
      description: {
        story: "LogPanel demonstrating very long log messages with detailed stack traces, error reports, and system diagnostics. Long messages are automatically wrapped and can be scrolled within the log viewer."
      }
    }
  }
}`,...(G=(J=M.parameters)==null?void 0:J.docs)==null?void 0:G.source}}};const $e=["Interactive","DefaultHeight","ScrollingExample","LongMessagesExample"];export{w as DefaultHeight,x as Interactive,M as LongMessagesExample,v as ScrollingExample,$e as __namedExportsOrder,je as default};
