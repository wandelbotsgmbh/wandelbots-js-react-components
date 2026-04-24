import{j as n}from"./iframe-BqZADguX.js";import{P as e,a as R}from"./ProgramControl-Bw7r74Cp.js";import{B as P}from"./Box-CDkM_MwH.js";import{B as Y}from"./Button-5-VzsWQj.js";import"./preload-helper-Dp1pzeXC.js";import"./createSvgIcon-DVH8VwjX.js";import"./SvgIcon-Rw5lUk44.js";import"./Typography-Hj7IHUMS.js";import"./PlayArrow-iuOtZT5n.js";import"./index-DXmpplPd.js";import"./mobx.esm-DvxsEwe8.js";import"./externalizeComponent-DH2TjDiN.js";import"./context-DUW5165K.js";import"./useTheme-Do2I_AnB.js";import"./useTranslation-CZpD0gPK.js";import"./ButtonBase-Cy63Z8_U.js";import"./useTimeout-C5fRSlNM.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-06J-Ubqo.js";const{useArgs:H}=__STORYBOOK_MODULE_PREVIEW_API__,Re={title:"Components/ProgramControl",component:R,tags:["!dev"],parameters:{layout:"centered"},argTypes:{state:{control:"select",options:[e.IDLE,e.PREPARING,e.STARTING,e.RUNNING,e.PAUSING,e.PAUSED,e.STOPPING,e.COMPLETED,e.FAILED,e.STOPPED,e.ERROR],description:"The current state of the program control",table:{type:{summary:"'idle' | 'preparing' | 'starting' | 'running' | 'pausing' | 'paused' | 'stopping' | 'completed' | 'failed' | 'stopped' | 'error'"}}},variant:{control:"select",options:["with_pause","without_pause"],description:"Variant of the component: 'with_pause' shows run/pause/stop buttons, 'without_pause' shows only run/stop buttons",table:{type:{summary:"'with_pause' | 'without_pause'"},defaultValue:{summary:"'with_pause'"}}},requiresManualReset:{control:"boolean",description:"When true, the component will stay in 'stopping' state until onReset is called manually. When false, auto-resets to 'idle' after 2 seconds."},onRun:{action:"onRun",description:"Callback fired when the run/resume button is clicked"},onPause:{action:"onPause",description:"Callback fired when the pause button is clicked (only available in 'with_pause' variant)"},onStop:{action:"onStop",description:"Callback fired when the stop button is clicked"},onReset:{action:"onReset",description:"Function to reset the component from 'stopping' state back to 'idle'. This must be called manually by the user when requiresManualReset is true."}},args:{state:e.IDLE,variant:"with_pause",requiresManualReset:!1},render:function(t){const[,s]=H();function F(){var a;console.log("Run pressed"),(a=t.onRun)==null||a.call(t),t.state===e.IDLE?s({state:e.RUNNING}):t.state===e.PAUSED&&s({state:e.RUNNING})}function z(){var a;console.log("Pause pressed"),(a=t.onPause)==null||a.call(t),t.state===e.RUNNING&&s({state:e.PAUSED})}function K(){var a;console.log("Stop pressed"),(a=t.onStop)==null||a.call(t),s({state:e.STOPPING}),t.requiresManualReset||setTimeout(()=>{s({state:e.IDLE})},2e3)}function h(){var a;console.log("Reset called"),(a=t.onReset)==null||a.call(t),s({state:e.IDLE})}return n.jsxs(P,{sx:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[n.jsx(R,{...t,onRun:F,onPause:z,onStop:K,onReset:h}),t.requiresManualReset&&t.state===e.STOPPING&&n.jsx(Y,{variant:"outlined",color:"info",onClick:h,sx:{mt:2},children:"🔄 Manual Reset (Trigger onReset)"}),t.requiresManualReset&&n.jsx(P,{sx:{textAlign:"center",fontSize:"0.875rem",color:"text.secondary",maxWidth:300},children:t.state===e.STOPPING?"Component is in stopping state. Use the Manual Reset button above or manually call onReset() to return to idle.":"When you press Stop, the component will stay in stopping state until you manually call the onReset function."})]})}},o={args:{state:e.IDLE,variant:"with_pause"}},r={args:{state:e.RUNNING,variant:"with_pause"}},i={args:{state:e.PAUSED,variant:"with_pause"}},u={args:{state:e.STOPPING,variant:"with_pause"}},p={args:{state:e.IDLE,variant:"without_pause"}},c={args:{state:e.RUNNING,variant:"without_pause"}},l={name:"Manual Reset Example",args:{state:e.STOPPING,variant:"with_pause",requiresManualReset:!0},parameters:{docs:{description:{story:"This example shows the component in stopping state when manual reset is required. The user must manually call the onReset function to return to idle state."}}}},m={name:"Interactive Demo (Auto Reset)",args:{state:e.IDLE,variant:"with_pause"},parameters:{docs:{description:{story:"Interactive demo with automatic reset after stopping. The component automatically returns to idle state after 2 seconds in stopping state."}}}},d={name:"Interactive Demo (Manual Reset)",args:{state:e.IDLE,variant:"with_pause",requiresManualReset:!0},parameters:{docs:{description:{story:"Interactive demo with manual reset required. When stopped, the component stays in stopping state until you manually call the onReset function (check the Actions panel or use the reset button below)."}}}};var I,g,w;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    state: ProgramState.IDLE,
    variant: "with_pause"
  }
}`,...(w=(g=o.parameters)==null?void 0:g.docs)==null?void 0:w.source}}};var S,f,y;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    state: ProgramState.RUNNING,
    variant: "with_pause"
  }
}`,...(y=(f=r.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var _,v,N;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    state: ProgramState.PAUSED,
    variant: "with_pause"
  }
}`,...(N=(v=i.parameters)==null?void 0:v.docs)==null?void 0:N.source}}};var E,D,T;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    state: ProgramState.STOPPING,
    variant: "with_pause"
  }
}`,...(T=(D=u.parameters)==null?void 0:D.docs)==null?void 0:T.source}}};var M,b,x;p.parameters={...p.parameters,docs:{...(M=p.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    state: ProgramState.IDLE,
    variant: "without_pause"
  }
}`,...(x=(b=p.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var W,G,A;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    state: ProgramState.RUNNING,
    variant: "without_pause"
  }
}`,...(A=(G=c.parameters)==null?void 0:G.docs)==null?void 0:A.source}}};var q,L,O;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: "Manual Reset Example",
  args: {
    state: ProgramState.STOPPING,
    variant: "with_pause",
    requiresManualReset: true
  },
  parameters: {
    docs: {
      description: {
        story: "This example shows the component in stopping state when manual reset is required. The user must manually call the onReset function to return to idle state."
      }
    }
  }
}`,...(O=(L=l.parameters)==null?void 0:L.docs)==null?void 0:O.source}}};var U,k,C;m.parameters={...m.parameters,docs:{...(U=m.parameters)==null?void 0:U.docs,source:{originalSource:`{
  name: "Interactive Demo (Auto Reset)",
  args: {
    state: ProgramState.IDLE,
    variant: "with_pause"
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive demo with automatic reset after stopping. The component automatically returns to idle state after 2 seconds in stopping state."
      }
    }
  }
}`,...(C=(k=m.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var j,B,V;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: "Interactive Demo (Manual Reset)",
  args: {
    state: ProgramState.IDLE,
    variant: "with_pause",
    requiresManualReset: true
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive demo with manual reset required. When stopped, the component stays in stopping state until you manually call the onReset function (check the Actions panel or use the reset button below)."
      }
    }
  }
}`,...(V=(B=d.parameters)==null?void 0:B.docs)==null?void 0:V.source}}};const Pe=["WithPauseIdle","WithPauseRunning","WithPausePaused","WithPauseStopping","WithoutPauseIdle","WithoutPauseRunning","WithManualReset","Interactive","ManualResetRequired"];export{m as Interactive,d as ManualResetRequired,l as WithManualReset,o as WithPauseIdle,i as WithPausePaused,r as WithPauseRunning,u as WithPauseStopping,p as WithoutPauseIdle,c as WithoutPauseRunning,Pe as __namedExportsOrder,Re as default};
