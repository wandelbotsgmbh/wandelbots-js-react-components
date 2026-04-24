import{n as e}from"./chunk-DnJy8xQt.js";import{Di as t,Gr as n,Kr as r,Ma as i,Oi as a,S as o,br as s,xr as c}from"./iframe-B6q2Ff5u.js";var l,u,d,f,p,m,h,g,_,v,y,b,x;e((()=>{t(),n(),o(),l=i(),{useArgs:u}=__STORYBOOK_MODULE_PREVIEW_API__,d={title:`Components/ProgramControl`,component:s,tags:[`!dev`],parameters:{layout:`centered`},argTypes:{state:{control:`select`,options:[c.IDLE,c.PREPARING,c.STARTING,c.RUNNING,c.PAUSING,c.PAUSED,c.STOPPING,c.COMPLETED,c.FAILED,c.STOPPED,c.ERROR],description:`The current state of the program control`,table:{type:{summary:`'idle' | 'preparing' | 'starting' | 'running' | 'pausing' | 'paused' | 'stopping' | 'completed' | 'failed' | 'stopped' | 'error'`}}},variant:{control:`select`,options:[`with_pause`,`without_pause`],description:`Variant of the component: 'with_pause' shows run/pause/stop buttons, 'without_pause' shows only run/stop buttons`,table:{type:{summary:`'with_pause' | 'without_pause'`},defaultValue:{summary:`'with_pause'`}}},requiresManualReset:{control:`boolean`,description:`When true, the component will stay in 'stopping' state until onReset is called manually. When false, auto-resets to 'idle' after 2 seconds.`},onRun:{action:`onRun`,description:`Callback fired when the run/resume button is clicked`},onPause:{action:`onPause`,description:`Callback fired when the pause button is clicked (only available in 'with_pause' variant)`},onStop:{action:`onStop`,description:`Callback fired when the stop button is clicked`},onReset:{action:`onReset`,description:`Function to reset the component from 'stopping' state back to 'idle'. This must be called manually by the user when requiresManualReset is true.`}},args:{state:c.IDLE,variant:`with_pause`,requiresManualReset:!1},render:function(e){let[,t]=u();function n(){console.log(`Run pressed`),e.onRun?.(),(e.state===c.IDLE||e.state===c.PAUSED)&&t({state:c.RUNNING})}function i(){console.log(`Pause pressed`),e.onPause?.(),e.state===c.RUNNING&&t({state:c.PAUSED})}function o(){console.log(`Stop pressed`),e.onStop?.(),t({state:c.STOPPING}),e.requiresManualReset||setTimeout(()=>{t({state:c.IDLE})},2e3)}function d(){console.log(`Reset called`),e.onReset?.(),t({state:c.IDLE})}return(0,l.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:3},children:[(0,l.jsx)(s,{...e,onRun:n,onPause:i,onStop:o,onReset:d}),e.requiresManualReset&&e.state===c.STOPPING&&(0,l.jsx)(r,{variant:`outlined`,color:`info`,onClick:d,sx:{mt:2},children:`🔄 Manual Reset (Trigger onReset)`}),e.requiresManualReset&&(0,l.jsx)(a,{sx:{textAlign:`center`,fontSize:`0.875rem`,color:`text.secondary`,maxWidth:300},children:e.state===c.STOPPING?`Component is in stopping state. Use the Manual Reset button above or manually call onReset() to return to idle.`:`When you press Stop, the component will stay in stopping state until you manually call the onReset function.`})]})}},f={args:{state:c.IDLE,variant:`with_pause`}},p={args:{state:c.RUNNING,variant:`with_pause`}},m={args:{state:c.PAUSED,variant:`with_pause`}},h={args:{state:c.STOPPING,variant:`with_pause`}},g={args:{state:c.IDLE,variant:`without_pause`}},_={args:{state:c.RUNNING,variant:`without_pause`}},v={name:`Manual Reset Example`,args:{state:c.STOPPING,variant:`with_pause`,requiresManualReset:!0},parameters:{docs:{description:{story:`This example shows the component in stopping state when manual reset is required. The user must manually call the onReset function to return to idle state.`}}}},y={name:`Interactive Demo (Auto Reset)`,args:{state:c.IDLE,variant:`with_pause`},parameters:{docs:{description:{story:`Interactive demo with automatic reset after stopping. The component automatically returns to idle state after 2 seconds in stopping state.`}}}},b={name:`Interactive Demo (Manual Reset)`,args:{state:c.IDLE,variant:`with_pause`,requiresManualReset:!0},parameters:{docs:{description:{story:`Interactive demo with manual reset required. When stopped, the component stays in stopping state until you manually call the onReset function (check the Actions panel or use the reset button below).`}}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    state: ProgramState.IDLE,
    variant: "with_pause"
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    state: ProgramState.RUNNING,
    variant: "with_pause"
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    state: ProgramState.PAUSED,
    variant: "with_pause"
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    state: ProgramState.STOPPING,
    variant: "with_pause"
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    state: ProgramState.IDLE,
    variant: "without_pause"
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    state: ProgramState.RUNNING,
    variant: "without_pause"
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x=[`WithPauseIdle`,`WithPauseRunning`,`WithPausePaused`,`WithPauseStopping`,`WithoutPauseIdle`,`WithoutPauseRunning`,`WithManualReset`,`Interactive`,`ManualResetRequired`]}))();export{y as Interactive,b as ManualResetRequired,v as WithManualReset,f as WithPauseIdle,m as WithPausePaused,p as WithPauseRunning,h as WithPauseStopping,g as WithoutPauseIdle,_ as WithoutPauseRunning,x as __namedExportsOrder,d as default};