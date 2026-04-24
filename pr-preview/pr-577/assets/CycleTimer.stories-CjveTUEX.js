import{j as n,r as u,R as F}from"./iframe-_RYo2JIA.js";import{o as ae}from"./index-B4I10Jtc.js";import{e as se}from"./externalizeComponent-ZD5YR1N6.js";import{u as ne}from"./useTranslation-C4IUwKmI.js";import{u as re}from"./useTheme-IxdNAN3G.js";import{B as R}from"./Box-D-IVt8YJ.js";import{G as oe}from"./Gauge-wjl_Ij7-.js";import{F as A}from"./Fade-B0QQe4AI.js";import{T as P}from"./Typography-FABigBVM.js";import{u as ie}from"./interpolation-CRvuswqV.js";import{B as y}from"./Button-BfWH79FO.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./context-B8MGCvuk.js";import"./useForkRef-BSB83h87.js";import"./with-selector-C3CpO-nP.js";import"./useThemeProps-DcmGm_te.js";import"./getThemeProps-3_LeOcqk.js";import"./utils-RlZKy7iu.js";import"./useTimeout-CSZacgEd.js";import"./ButtonBase-YNwrcsX1.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-CSNNI3hI.js";const le=m=>{const s=Math.floor(m/86400),t=Math.floor(m%86400/3600),d=Math.floor(m%3600/60),a=m%60,i=[];return s>0?(i.push(s.toString()),i.push(t.toString().padStart(2,"0")),i.push(d.toString().padStart(2,"0")),i.push(a.toString().padStart(2,"0"))):t>0?(i.push(t.toString()),i.push(d.toString().padStart(2,"0")),i.push(a.toString().padStart(2,"0"))):(i.push(d.toString()),i.push(a.toString().padStart(2,"0"))),i.join(":")},I=(m,s)=>{const t=Math.floor(m/86400),d=Math.floor(m%86400/3600),a=Math.floor(m%3600/60),i=m%60;if(typeof Intl<"u"&&"DurationFormat"in Intl)try{const r={};return t>0&&(r.days=t),d>0&&(r.hours=d),a>0&&(r.minutes=a),(i>0||Object.keys(r).length===0)&&(r.seconds=i),new Intl.DurationFormat(s,{style:"narrow"}).format(r)}catch{}const l=[];return t>0&&l.push(`${t}d`),d>0&&l.push(`${d}h`),a>0&&l.push(`${a}m`),(i>0||l.length===0)&&l.push(`${i}s`),l.join(" ")},ce=(m,s,t)=>m==="countdown"&&t!==null?Math.min(100,s/t*100):m==="measuring"?s/60%1*100:0,W=({timerState:m,animationState:s,hasError:t,className:d})=>{const{t:a,i18n:i}=ne(),l=re(),{currentState:r,remainingTime:e,maxTime:o,currentProgress:x}=m,{showErrorAnimation:g,showPauseAnimation:w,showPulsatingText:f,pulsatingFinished:C,showLabels:b,showMainText:T,showIdlePulsating:j,idleDotsCount:M}=s;return n.jsxs(R,{className:d,sx:{position:"relative",width:264,height:264,display:"flex",alignItems:"center",justifyContent:"center"},children:[n.jsx(oe,{width:264,height:264,value:r==="idle"?0:x,valueMin:0,valueMax:100,innerRadius:"85%",outerRadius:"100%",margin:0,skipAnimation:!0,text:()=>"",sx:{opacity:w||g?.6:1,transition:"opacity 0.5s ease-out","& .MuiGauge-valueArc":{fill:t?l.palette.error.light:l.palette.success.main,transition:"fill 0.5s ease-out"},"& .MuiGauge-referenceArc":{fill:"#171927",stroke:"transparent",strokeWidth:0,transition:"fill 0.5s ease-out, stroke 0.5s ease-out, stroke-width 0.5s ease-out"},"& .MuiGauge-valueText":{display:"none"},"& .MuiGauge-text":{display:"none"}}}),n.jsxs(R,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:225,height:225,borderRadius:"50%",backgroundColor:"#292B3F",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",gap:1,transition:"background-color 0.5s ease-out"},children:[n.jsx(R,{sx:{height:"16px",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:1},children:n.jsx(A,{in:b&&!t&&r!=="idle"&&r!=="success",timeout:300,children:n.jsx(P,{variant:"body2",sx:{fontSize:"12px",color:r==="measured"&&(f||C)?l.palette.success.main:l.palette.text.secondary,transition:"color 0.8s ease-in-out"},children:n.jsx("span",{style:{opacity:r==="measured"&&C?f?1:.6:1,transition:"opacity 2s ease-in-out"},children:r==="measuring"||r==="measured"?a("CycleTimer.CycleTime.lb","Cycle Time"):r==="countdown"?a("CycleTimer.RemainingTime.lb","Remaining Time"):""})})})}),n.jsxs(R,{sx:{position:"relative",height:"48px",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:.5},children:[n.jsx(A,{in:T&&r==="idle"&&!t,timeout:200,children:n.jsxs(P,{variant:"body2",sx:{position:"absolute",fontSize:"12px",fontWeight:400,color:"rgba(255, 255, 255, 0.7)",lineHeight:"166%",letterSpacing:"0.17px",textAlign:"center",width:"200px",height:"20px",display:"flex",alignItems:"center",justifyContent:"center"},children:[n.jsx("span",{style:{opacity:j?1:.6,transition:"opacity 2s ease-in-out"},children:a("CycleTimer.WaitingForCycle.lb","Waiting for program cycle")}),n.jsx("span",{style:{display:"inline-block",width:"18px",textAlign:"left",opacity:j?1:.6,transition:"opacity 2s ease-in-out"},children:".".repeat(M)})]})}),n.jsx(A,{in:T&&t,timeout:200,children:n.jsx(P,{variant:"h3",sx:{position:"absolute",fontSize:"40px",fontWeight:400,color:"#FFFFFF",lineHeight:"116.7%"},children:a("CycleTimer.Error.lb","Error")})}),n.jsx(A,{in:T&&!t&&r!=="idle"&&r!=="success",timeout:300,children:n.jsx(P,{variant:"h1",sx:{position:"absolute",fontSize:"48px",fontWeight:500,color:l.palette.text.primary,lineHeight:1,transition:"color 0.8s ease-in-out"},children:n.jsx("span",{style:{opacity:1,transition:"opacity 2s ease-in-out"},children:le(e)})})})]}),n.jsx(R,{sx:{height:"16px",display:"flex",marginTop:.5,alignItems:"center",justifyContent:"center"},children:n.jsx(A,{in:b&&!t&&r!=="idle"&&r!=="success",timeout:300,children:n.jsx(P,{variant:"body2",sx:{fontSize:"12px",color:r==="measured"&&(f||C)?l.palette.success.main:l.palette.text.secondary,transition:"color 0.8s ease-in-out"},children:n.jsx("span",{style:{opacity:r==="measured"&&C?f?1:.6:1,transition:"opacity 2s ease-in-out"},children:r==="measuring"?a("CycleTimer.Measuring.lb","measuring..."):r==="measured"?a("CycleTimer.Determined.lb","determined"):r==="countdown"&&o!==null?a("CycleTimer.OfTime.lb",{time:I(o,i.language)}):""})})})})]})]})};try{W.displayName="DefaultVariant",W.__docgenInfo={description:"",displayName:"DefaultVariant",props:{timerState:{defaultValue:null,description:"",name:"timerState",required:!0,type:{name:"TimerState"}},animationState:{defaultValue:null,description:"",name:"animationState",required:!0,type:{name:"AnimationState"}},hasError:{defaultValue:null,description:"",name:"hasError",required:!0,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const H=({timerState:m,animationState:s,hasError:t,compact:d,className:a})=>{const{t:i,i18n:l}=ne(),r=re(),{currentState:e,remainingTime:o,maxTime:x}=m,{showErrorAnimation:g,showPauseAnimation:w,showPulsatingText:f,pulsatingFinished:C,showIdlePulsating:b,idleDotsCount:T}=s;return d&&e==="idle"?n.jsx(R,{className:a,sx:{display:"flex",alignItems:"center",m:0},children:n.jsx(P,{variant:"body2",sx:{color:t?r.palette.error.light:r.palette.text.primary,fontSize:"14px",transition:"color 0.5s ease-out"},children:t?i("CycleTimer.Error.lb","Error"):e==="idle"?"0s":I(o,l.language)})}):n.jsxs(R,{className:a,sx:{display:"flex",alignItems:"center",m:0,gap:1},children:[!(e==="idle"&&d)&&n.jsx(R,{sx:{width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",opacity:w||g?.6:1,transition:"opacity 0.5s ease-out"},children:n.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 20 20",style:{transform:"rotate(-90deg)"},role:"img","aria-label":"Timer progress",children:[n.jsx("circle",{cx:"10",cy:"10",r:"8",fill:"none",stroke:t?r.palette.error.light:e==="measured"?f||C?r.palette.success.main:r.palette.text.secondary:r.palette.success.main,strokeWidth:"2",opacity:e==="measured"&&C?f?1:.6:.3,style:{transition:"stroke 0.8s ease-in-out, opacity 2s ease-in-out"}}),n.jsx("circle",{cx:"10",cy:"10",r:"8",fill:"none",stroke:t?r.palette.error.light:e==="measured"?f||C?r.palette.success.main:r.palette.text.secondary:r.palette.success.main,strokeWidth:"2",strokeLinecap:"round",strokeDasharray:`${2*Math.PI*8}`,strokeDashoffset:`${2*Math.PI*8*(1-(e==="idle"?0:m.currentProgress)/100)}`,style:{opacity:e==="measured"&&C?f?1:.6:1,transition:"stroke-dashoffset 0.1s ease-out, stroke 0.8s ease-in-out, opacity 2s ease-in-out"}})]})}),n.jsx(P,{variant:"body2",sx:{color:t?r.palette.error.light:e==="idle"?"rgba(255, 255, 255, 0.7)":e==="measured"?f||C?r.palette.success.main:r.palette.text.secondary:r.palette.text.primary,fontSize:"14px",lineHeight:"normal",letterSpacing:"normal",opacity:e==="idle"?b?1:.6:e==="measured"&&C?f?1:.6:1,transition:"color 0.8s ease-in-out, font-size 0.3s ease-out, opacity 2s ease-in-out"},children:t?i("CycleTimer.Error.lb","Error"):e==="idle"?n.jsxs(n.Fragment,{children:[n.jsx("span",{children:i("CycleTimer.WaitingForCycle.lb","Waiting for program cycle")}),n.jsx("span",{style:{display:"inline-block",width:"18px",textAlign:"left"},children:".".repeat(T)})]}):e==="measuring"?d?I(o,l.language):`${I(o,l.language)} / ${i("CycleTimer.Measuring.lb","measuring...")}`:e==="measured"?d?I(o,l.language):`${I(o,l.language)} / ${i("CycleTimer.Determined.lb","determined")}`:e==="countdown"&&x!==null?d?I(o,l.language):`${I(o,l.language)} / ${i("CycleTimer.Time.lb",{time:I(x,l.language)})}`:I(o,l.language)})]})};try{H.displayName="SmallVariant",H.__docgenInfo={description:"",displayName:"SmallVariant",props:{timerState:{defaultValue:null,description:"",name:"timerState",required:!0,type:{name:"TimerState"}},animationState:{defaultValue:null,description:"",name:"animationState",required:!0,type:{name:"AnimationState"}},hasError:{defaultValue:null,description:"",name:"hasError",required:!0,type:{name:"boolean"}},compact:{defaultValue:null,description:"",name:"compact",required:!0,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const ue=()=>{const[m,s]=u.useState({showPauseAnimation:!1,showErrorAnimation:!1,showPulsatingText:!1,pulsatingFinished:!1,showLabels:!0,showMainText:!0,showIdlePulsating:!1,idleDotsCount:0}),t=u.useRef(null),d=u.useRef(null),a=u.useRef(null),i=u.useRef(null),l=u.useRef(0),r=u.useRef(null),e=u.useRef(null),o=u.useCallback(()=>{s(c=>({...c,showPauseAnimation:!0})),t.current&&clearTimeout(t.current),t.current=setTimeout(()=>{s(c=>({...c,showPauseAnimation:!1}))},800)},[]),x=u.useCallback(()=>{s(c=>({...c,showErrorAnimation:!0})),d.current&&clearTimeout(d.current),d.current=setTimeout(()=>{s(c=>({...c,showErrorAnimation:!1}))},600)},[]),g=u.useCallback(()=>{s(c=>({...c,showErrorAnimation:!1})),d.current&&clearTimeout(d.current)},[]),w=u.useCallback(c=>{l.current=0,s(S=>({...S,showPulsatingText:!0,pulsatingFinished:!1})),setTimeout(()=>{s(S=>({...S,pulsatingFinished:!0})),a.current=setInterval(()=>{s(S=>({...S,showPulsatingText:!S.showPulsatingText}))},2e3),c&&c()},800)},[]),f=u.useCallback(()=>{a.current&&(clearInterval(a.current),a.current=null),s(c=>({...c,showPulsatingText:!1,pulsatingFinished:!1})),l.current=0},[]),C=u.useCallback(()=>{s(c=>({...c,showIdlePulsating:!0})),r.current=setInterval(()=>{s(c=>({...c,showIdlePulsating:!c.showIdlePulsating}))},2e3),e.current=setInterval(()=>{s(c=>({...c,idleDotsCount:(c.idleDotsCount+1)%4}))},800)},[]),b=u.useCallback(()=>{r.current&&(clearInterval(r.current),r.current=null),e.current&&(clearInterval(e.current),e.current=null),s(c=>({...c,showIdlePulsating:!1,idleDotsCount:0}))},[]),T=u.useCallback(()=>{s(c=>({...c,showLabels:!1,showMainText:!1})),i.current&&clearTimeout(i.current),i.current=setTimeout(()=>{s(c=>({...c,showLabels:!0,showMainText:!0}))},200)},[]),j=u.useCallback(()=>{s(c=>({...c,showLabels:!0,showMainText:!0}))},[]),M=u.useCallback(()=>{t.current&&clearTimeout(t.current),d.current&&clearTimeout(d.current),i.current&&clearTimeout(i.current),a.current&&clearInterval(a.current),r.current&&clearInterval(r.current),e.current&&clearInterval(e.current)},[]);return{animationState:m,triggerPauseAnimation:o,triggerErrorAnimation:x,clearErrorAnimation:g,startPulsatingAnimation:w,stopPulsatingAnimation:f,startIdleAnimations:C,stopIdleAnimations:b,triggerFadeTransition:T,setInitialAnimationState:j,cleanup:M}},de=({autoStart:m,onCycleEnd:s,onMeasuringComplete:t,hasError:d,onPauseAnimation:a,onErrorAnimation:i,onClearErrorAnimation:l,onStartPulsating:r})=>{const[e,o]=u.useState({currentState:"idle",remainingTime:0,maxTime:null,isRunning:!1,isPausedState:!1,currentProgress:0,wasRunningBeforeError:!1}),x=u.useRef(null),g=u.useRef(null),w=u.useRef(0),[f]=ie([0],{tension:80,friction:18,onChange:([p])=>{o(h=>({...h,currentProgress:p}))}}),C=u.useCallback(()=>{o(p=>({...p,currentState:"idle",maxTime:null,isRunning:!1,isPausedState:!1,currentProgress:0})),w.current=0,g.current=null,f.setImmediate([0])},[f]),b=u.useCallback((p=0)=>{const h=p/60%1*100;o(v=>({...v,currentState:"measuring",maxTime:null,remainingTime:p,isPausedState:!1,currentProgress:h})),w.current=0,f.setImmediate([h]),m?(g.current=Date.now()-p*1e3,o(v=>({...v,isRunning:!0}))):g.current=null},[m,f]),T=u.useCallback((p,h=0)=>{o(k=>({...k,isRunning:!1})),g.current=null,o(k=>({...k,currentState:"countdown",maxTime:p,isPausedState:!1})),w.current=0;const v=Math.max(0,p-h),B=h>0?h/p*100:0;o(k=>({...k,remainingTime:v,currentProgress:B})),f.setImmediate([B]),v===0?(o(k=>({...k,isRunning:!1})),g.current=null,s&&queueMicrotask(()=>s())):m?setTimeout(()=>{g.current=Date.now()-h*1e3,o(k=>({...k,isRunning:!0}))},0):g.current=null},[m,s,f]),j=u.useCallback(()=>{o(p=>({...p,isRunning:!1,currentState:"measured"})),g.current=null,r(()=>{t&&t()})},[r,t]),M=u.useCallback(()=>{if(g.current&&e.isRunning){const h=Date.now()-g.current;w.current+=h;const v=w.current/1e3,B=ce(e.currentState,v,e.maxTime);f.setTarget([B])}o(p=>({...p,isRunning:!1,isPausedState:!0})),a()},[e.isRunning,e.currentState,e.maxTime,f,a]),c=u.useCallback(()=>{e.isPausedState&&(e.remainingTime>0||e.currentState!=="countdown")&&(g.current=Date.now(),o(p=>({...p,isRunning:!0,isPausedState:!1})))},[e.isPausedState,e.remainingTime,e.currentState]),S=u.useCallback(()=>e.isPausedState,[e.isPausedState]);return u.useEffect(()=>{d?(e.isRunning&&!e.isPausedState&&(o(p=>({...p,wasRunningBeforeError:!0})),M()),i()):(e.wasRunningBeforeError&&e.isPausedState&&(o(p=>({...p,wasRunningBeforeError:!1})),c()),l())},[d,e.isRunning,e.isPausedState,e.wasRunningBeforeError,M,c,i,l]),u.useEffect(()=>{if(e.isRunning){const p=()=>{if(g.current){const v=(Date.now()-g.current+w.current)/1e3;if(e.currentState==="countdown"&&e.maxTime!==null){const B=Math.max(0,e.maxTime-v);o(V=>({...V,remainingTime:Math.ceil(B)}));const k=Math.min(100,v/e.maxTime*100);if(f.setTarget([k]),B<=0){o(V=>({...V,isRunning:!1,remainingTime:0})),g.current=null,f.setTarget([100]),s&&queueMicrotask(()=>s());return}}else if(e.currentState==="measuring"){o(k=>({...k,remainingTime:Math.floor(v)}));const B=v/60%1*100;f.setTarget([B])}e.isRunning&&(x.current=requestAnimationFrame(p))}};x.current=requestAnimationFrame(p)}else x.current&&(cancelAnimationFrame(x.current),x.current=null);return()=>{x.current&&cancelAnimationFrame(x.current)}},[e.isRunning,s,e.currentState,e.maxTime,f]),u.useEffect(()=>{let p=null;const h=()=>{f.update(1/60),p=requestAnimationFrame(h)};return p=requestAnimationFrame(h),()=>{p&&cancelAnimationFrame(p)}},[f]),{timerState:e,controls:{startNewCycle:T,startMeasuring:b,setIdle:C,completeMeasuring:j,pause:M,resume:c,isPaused:S}}},z=se(ae(({onCycleComplete:m,onCycleEnd:s,onMeasuringComplete:t,autoStart:d=!0,variant:a="default",compact:i=!1,className:l,hasError:r=!1})=>{const e=u.useRef(void 0),{animationState:o,triggerPauseAnimation:x,triggerErrorAnimation:g,clearErrorAnimation:w,startPulsatingAnimation:f,stopPulsatingAnimation:C,startIdleAnimations:b,stopIdleAnimations:T,triggerFadeTransition:j,setInitialAnimationState:M,cleanup:c}=ue(),{timerState:S,controls:p}=de({autoStart:d,onCycleEnd:s,onMeasuringComplete:t,hasError:r,onPauseAnimation:x,onErrorAnimation:g,onClearErrorAnimation:w,onStartPulsating:f});return u.useEffect(()=>{const h=e.current;e.current!==void 0&&h!==S.currentState?(h==="measured"&&C(),h==="idle"&&T(),j()):M(),S.currentState==="idle"&&b(),e.current=S.currentState},[S.currentState,C,T,b,j,M]),u.useEffect(()=>{let h=!0;const v=setTimeout(()=>{h&&m(p)},0);return()=>{h=!1,clearTimeout(v)}},[m,p]),u.useEffect(()=>c,[c]),a==="small"?n.jsx(H,{timerState:S,animationState:o,hasError:r,compact:i,className:l}):n.jsx(W,{timerState:S,animationState:o,hasError:r,className:l})}));try{z.displayName="CycleTimer",z.__docgenInfo={description:`A circular gauge timer component for cycle-specific timing operations

Features:
- Custom SVG circular gauge with 264px diameter and 40px thickness
- Multiple states: idle, measuring, measured, countdown, success
- Idle state: shows "Waiting for program cycle" with transparent inner circle
- Measuring state: counts up with "Cycle Time" / "measuring..." labels
- Measured state: shows final time with "Cycle Time" / "determined" labels in pulsating green
- Countdown mode: shows remaining time prominently, counts down to zero
- Success state: brief green flash after cycle completion
- Displays appropriate labels based on state
- Automatically counts down and triggers callback when reaching zero
- Full timer control: start, pause, resume functionality
- Support for starting with elapsed time (resume mid-cycle)
- Error state support: pauses timer and shows error styling (red color)
- Smooth fade transitions between different text states
- Pulsating text animation for completed measuring state
- Fully localized with i18next
- Material-UI theming integration
- Small variant with animated progress icon (gauge border only) next to text`,displayName:"CycleTimer",props:{onCycleComplete:{defaultValue:null,description:"Callback that receives the timer control functions",name:"onCycleComplete",required:!0,type:{name:"(controls: CycleTimerControls) => void"}},onCycleEnd:{defaultValue:null,description:"Callback fired when a cycle actually completes (reaches zero)",name:"onCycleEnd",required:!1,type:{name:"() => void"}},onMeasuringComplete:{defaultValue:null,description:"Callback fired when measuring cycle completes",name:"onMeasuringComplete",required:!1,type:{name:"() => void"}},autoStart:{defaultValue:null,description:"Whether the timer should start automatically when maxTime is set",name:"autoStart",required:!1,type:{name:"boolean"}},variant:{defaultValue:null,description:"Visual variant of the timer",name:"variant",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"default"'}]}},compact:{defaultValue:null,description:"For small variant: whether to show remaining time details (compact hides them)",name:"compact",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"Additional CSS classes",name:"className",required:!1,type:{name:"string"}},hasError:{defaultValue:null,description:"Whether the timer is in an error state (pauses timer and shows error styling)",name:"hasError",required:!1,type:{name:"boolean"}}}}}catch{}const De={title:"Components/CycleTimer",component:z,tags:["!dev"],parameters:{layout:"centered",docs:{description:{component:`
A circular gauge timer component with multiple states for different cycle tracking scenarios.

**States:**
- **Idle:** Shows "Waiting for program cycle" with transparent inner circle
- **Measuring:** Count-up timer with "Cycle Time" / "measuring..." labels  
- **Countdown:** Timer counts down from set time with remaining time display
- **Success:** Brief green animation after measuring completes

**Key Features:**
- **Visual progress with circular gauge** (264px diameter)
- **Complete timer control interface** (start, pause, resume, state switching)
- **Error state support:** Pauses timer and shows error styling with automatic resume
- **Smooth transitions** between all states with fade animations
- **Success animations** for measuring completion with color transitions
- **Two display variants:** large gauge with centered display, or compact icon/text-only modes
- Smooth spring-based progress animations for all state transitions
- Fully localized with i18next
- Material-UI theming integration

**Control Functions:**
- \`startNewCycle(maxTimeSeconds, elapsedSeconds?)\` - Start countdown timer with optional elapsed time offset
- \`startMeasuring(elapsedSeconds?)\` - Start measuring mode with optional elapsed time offset
- \`setIdle()\` - Set to idle state
- \`completeMeasuring()\` - Complete measuring and trigger success animation
- \`pause()\` / \`resume()\` - Pause and resume timer
- \`isPaused()\` - Check pause state
        `},story:{inline:!1,iframeHeight:400}}},args:{autoStart:!0,onCycleComplete:()=>{}},argTypes:{onCycleComplete:{action:"onCycleComplete",description:"Callback that receives timer control functions (startNewCycle, startMeasuring, setIdle, completeMeasuring, pause, resume, isPaused)"},onCycleEnd:{action:"onCycleEnd",description:"Callback fired when a cycle actually completes (reaches zero) - only for countdown mode"},onMeasuringComplete:{action:"onMeasuringComplete",description:"Callback fired when measuring cycle completes and success animation finishes"},autoStart:{control:"boolean",description:"Whether the timer should start automatically when started",table:{defaultValue:{summary:"true"}}},variant:{control:"select",options:["default","small"],description:"Visual variant: 'default' (large gauge) or 'small' (animated icon with text)",table:{defaultValue:{summary:"default"}}},compact:{control:"boolean",description:"For small variant: whether to hide remaining time details (compact)",table:{defaultValue:{summary:"false"}}},className:{control:"text",description:"Additional CSS classes"},hasError:{control:"boolean",description:"Whether the timer is in an error state (pauses timer and shows error styling)",table:{defaultValue:{summary:"false"}}}}},E={args:{autoStart:!0},render:function(s){const[t,d]=F.useState(!1),a=F.useRef(null),i=M=>{a.current=M,s.onCycleComplete(M)},l=()=>{a.current&&a.current.setIdle()},r=()=>{a.current&&a.current.startMeasuring()},e=()=>{a.current&&a.current.completeMeasuring()},o=()=>{a.current&&a.current.startNewCycle(90)},x=()=>{a.current&&a.current.startNewCycle(120,30)},g=()=>{a.current&&a.current.startMeasuring(45)},w=()=>{a.current&&a.current.startMeasuring(7384)},f=()=>{a.current&&a.current.startNewCycle(7200)},C=()=>{a.current&&a.current.startNewCycle(9e4)},b=()=>{a.current&&a.current.pause()},T=()=>{a.current&&a.current.resume()},j=()=>{d(!t)};return n.jsxs(R,{sx:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[n.jsx(z,{...s,onCycleComplete:i,hasError:t}),n.jsxs(R,{sx:{display:"flex",gap:1,flexWrap:"wrap",justifyContent:"center"},children:[n.jsx(y,{variant:"contained",onClick:l,size:"small",children:"Set Idle"}),n.jsx(y,{variant:"contained",onClick:r,size:"small",children:"Start Measuring"}),n.jsx(y,{variant:"contained",onClick:g,size:"small",children:"Start Measuring (45s)"}),n.jsx(y,{variant:"contained",onClick:e,size:"small",children:"Complete Measuring"}),n.jsx(y,{variant:"contained",onClick:o,size:"small",children:"Start 90s Countdown"}),n.jsx(y,{variant:"contained",onClick:x,size:"small",children:"Start 120s (30s elapsed)"}),n.jsx(y,{variant:"contained",onClick:w,size:"small",color:"secondary",children:"Measuring ~2h 3m"}),n.jsx(y,{variant:"contained",onClick:f,size:"small",color:"secondary",children:"Countdown 2h"}),n.jsx(y,{variant:"contained",onClick:C,size:"small",color:"secondary",children:"Countdown ~25h"}),n.jsx(y,{variant:"outlined",onClick:b,size:"small",children:"Pause"}),n.jsx(y,{variant:"outlined",onClick:T,size:"small",children:"Resume"}),n.jsx(y,{variant:t?"contained":"outlined",color:"error",onClick:j,size:"small",children:t?"Clear Error":"Trigger Error"})]})]})}},D={args:{variant:"small",autoStart:!0},render:function(s){const t=F.useRef(null),d=o=>{t.current=o,s.onCycleComplete(o)},a=()=>{t.current&&t.current.startMeasuring()},i=()=>{t.current&&t.current.startMeasuring(7384)},l=()=>{t.current&&t.current.startNewCycle(60)},r=()=>{t.current&&t.current.startNewCycle(7200)},e=()=>{t.current&&t.current.startNewCycle(9e4)};return n.jsxs(R,{sx:{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:3},children:[n.jsx(z,{...s,onCycleComplete:d}),n.jsxs(R,{sx:{display:"flex",gap:1,flexWrap:"wrap"},children:[n.jsx(y,{variant:"contained",onClick:a,size:"small",children:"Start Measuring"}),n.jsx(y,{variant:"contained",onClick:l,size:"small",children:"Start 60s Countdown"}),n.jsx(y,{variant:"contained",onClick:i,size:"small",color:"secondary",children:"Measuring ~2h 3m"}),n.jsx(y,{variant:"contained",onClick:r,size:"small",color:"secondary",children:"Countdown 2h"}),n.jsx(y,{variant:"contained",onClick:e,size:"small",color:"secondary",children:"Countdown ~25h"})]})]})}},N={args:{variant:"small",compact:!0,autoStart:!0},render:function(s){const t=F.useRef(null),d=o=>{t.current=o,s.onCycleComplete(o)},a=()=>{t.current&&t.current.startMeasuring()},i=()=>{t.current&&t.current.startMeasuring(7384)},l=()=>{t.current&&t.current.startNewCycle(60)},r=()=>{t.current&&t.current.startNewCycle(7200)},e=()=>{t.current&&t.current.startNewCycle(9e4)};return n.jsxs(R,{sx:{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:3},children:[n.jsx(z,{...s,onCycleComplete:d}),n.jsxs(R,{sx:{display:"flex",gap:1,flexWrap:"wrap"},children:[n.jsx(y,{variant:"contained",onClick:a,size:"small",children:"Start Measuring"}),n.jsx(y,{variant:"contained",onClick:l,size:"small",children:"Start 60s Countdown"}),n.jsx(y,{variant:"contained",onClick:i,size:"small",color:"secondary",children:"Measuring ~2h 3m"}),n.jsx(y,{variant:"contained",onClick:r,size:"small",color:"secondary",children:"Countdown 2h"}),n.jsx(y,{variant:"contained",onClick:e,size:"small",color:"secondary",children:"Countdown ~25h"})]})]})}};var _,q,$,O,L;E.parameters={...E.parameters,docs:{...(_=E.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    autoStart: true
  },
  render: function Render(args) {
    const [hasError, setHasError] = React.useState(false);
    const controlsRef = React.useRef<{
      startNewCycle: (maxTimeSeconds: number, elapsedSeconds?: number) => void;
      startMeasuring: (elapsedSeconds?: number) => void;
      setIdle: () => void;
      completeMeasuring: () => void;
      pause: () => void;
      resume: () => void;
      isPaused: () => boolean;
    } | null>(null);
    const handleCycleComplete = (controls: {
      startNewCycle: (maxTimeSeconds: number, elapsedSeconds?: number) => void;
      startMeasuring: (elapsedSeconds?: number) => void;
      setIdle: () => void;
      completeMeasuring: () => void;
      pause: () => void;
      resume: () => void;
      isPaused: () => boolean;
    }) => {
      controlsRef.current = controls;
      args.onCycleComplete(controls);
    };
    const setIdle = () => {
      if (controlsRef.current) {
        controlsRef.current.setIdle();
      }
    };
    const startMeasuring = () => {
      if (controlsRef.current) {
        controlsRef.current.startMeasuring();
      }
    };
    const completeMeasuring = () => {
      if (controlsRef.current) {
        controlsRef.current.completeMeasuring();
      }
    };
    const startCountdown = () => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(90); // 90 second countdown
      }
    };
    const startCountdownWithOffset = () => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(120, 30); // 120 second countdown, started with 30 seconds already elapsed
      }
    };
    const startMeasuringWithOffset = () => {
      if (controlsRef.current) {
        controlsRef.current.startMeasuring(45); // Start measuring with 45 seconds already elapsed
      }
    };
    const startMeasuringHours = () => {
      if (controlsRef.current) {
        controlsRef.current.startMeasuring(7384); // ~2h 3m 4s elapsed
      }
    };
    const startCountdownHours = () => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(7200); // 2 hour countdown
      }
    };
    const startCountdownDays = () => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(90000); // ~25 hour countdown (1d 1h)
      }
    };
    const pauseTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.pause();
      }
    };
    const resumeTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.resume();
      }
    };
    const toggleError = () => {
      setHasError(!hasError);
    };
    return <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3
    }}>
        <CycleTimer {...args} onCycleComplete={handleCycleComplete} hasError={hasError} />

        <Box sx={{
        display: "flex",
        gap: 1,
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
          <Button variant="contained" onClick={setIdle} size="small">
            Set Idle
          </Button>
          <Button variant="contained" onClick={startMeasuring} size="small">
            Start Measuring
          </Button>
          <Button variant="contained" onClick={startMeasuringWithOffset} size="small">
            Start Measuring (45s)
          </Button>
          <Button variant="contained" onClick={completeMeasuring} size="small">
            Complete Measuring
          </Button>
          <Button variant="contained" onClick={startCountdown} size="small">
            Start 90s Countdown
          </Button>
          <Button variant="contained" onClick={startCountdownWithOffset} size="small">
            Start 120s (30s elapsed)
          </Button>
          <Button variant="contained" onClick={startMeasuringHours} size="small" color="secondary">
            Measuring ~2h 3m
          </Button>
          <Button variant="contained" onClick={startCountdownHours} size="small" color="secondary">
            Countdown 2h
          </Button>
          <Button variant="contained" onClick={startCountdownDays} size="small" color="secondary">
            Countdown ~25h
          </Button>
          <Button variant="outlined" onClick={pauseTimer} size="small">
            Pause
          </Button>
          <Button variant="outlined" onClick={resumeTimer} size="small">
            Resume
          </Button>
          <Button variant={hasError ? "contained" : "outlined"} color="error" onClick={toggleError} size="small">
            {hasError ? "Clear Error" : "Trigger Error"}
          </Button>
        </Box>
      </Box>;
  }
}`,...($=(q=E.parameters)==null?void 0:q.docs)==null?void 0:$.source},description:{story:`Interactive demonstration of all CycleTimer states and functionality.
Use the buttons to switch between different states: idle, measuring, countdown, and success.
Test pause/resume controls and error state behavior.`,...(L=(O=E.parameters)==null?void 0:O.docs)==null?void 0:L.description}}};var G,U,K,J,Q;D.parameters={...D.parameters,docs:{...(G=D.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    variant: "small",
    autoStart: true
  },
  render: function Render(args) {
    const controlsRef = React.useRef<{
      startNewCycle: (maxTimeSeconds: number, elapsedSeconds?: number) => void;
      startMeasuring: (elapsedSeconds?: number) => void;
      setIdle: () => void;
      completeMeasuring: () => void;
      pause: () => void;
      resume: () => void;
      isPaused: () => boolean;
    } | null>(null);
    const handleCycleComplete = (controls: {
      startNewCycle: (maxTimeSeconds: number, elapsedSeconds?: number) => void;
      startMeasuring: (elapsedSeconds?: number) => void;
      setIdle: () => void;
      completeMeasuring: () => void;
      pause: () => void;
      resume: () => void;
      isPaused: () => boolean;
    }) => {
      controlsRef.current = controls;
      args.onCycleComplete(controls);
    };
    const startMeasuring = () => {
      if (controlsRef.current) {
        controlsRef.current.startMeasuring();
      }
    };
    const startMeasuringHours = () => {
      if (controlsRef.current) {
        controlsRef.current.startMeasuring(7384); // ~2h 3m 4s elapsed
      }
    };
    const startCountdown = () => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(60); // 60 second countdown
      }
    };
    const startCountdownHours = () => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(7200); // 2 hour countdown
      }
    };
    const startCountdownDays = () => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(90000); // ~25 hour countdown (1d 1h)
      }
    };
    return <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 3
    }}>
        <CycleTimer {...args} onCycleComplete={handleCycleComplete} />

        <Box sx={{
        display: "flex",
        gap: 1,
        flexWrap: "wrap"
      }}>
          <Button variant="contained" onClick={startMeasuring} size="small">
            Start Measuring
          </Button>
          <Button variant="contained" onClick={startCountdown} size="small">
            Start 60s Countdown
          </Button>
          <Button variant="contained" onClick={startMeasuringHours} size="small" color="secondary">
            Measuring ~2h 3m
          </Button>
          <Button variant="contained" onClick={startCountdownHours} size="small" color="secondary">
            Countdown 2h
          </Button>
          <Button variant="contained" onClick={startCountdownDays} size="small" color="secondary">
            Countdown ~25h
          </Button>
        </Box>
      </Box>;
  }
}`,...(K=(U=D.parameters)==null?void 0:U.docs)==null?void 0:K.source},description:{story:`Small variant with animated progress icon next to text.
Shows cycle-specific information in a compact format.`,...(Q=(J=D.parameters)==null?void 0:J.docs)==null?void 0:Q.description}}};var X,Y,Z,ee,te;N.parameters={...N.parameters,docs:{...(X=N.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    variant: "small",
    compact: true,
    autoStart: true
  },
  render: function Render(args) {
    const controlsRef = React.useRef<{
      startNewCycle: (maxTimeSeconds: number, elapsedSeconds?: number) => void;
      startMeasuring: (elapsedSeconds?: number) => void;
      setIdle: () => void;
      completeMeasuring: () => void;
      pause: () => void;
      resume: () => void;
      isPaused: () => boolean;
    } | null>(null);
    const handleCycleComplete = (controls: {
      startNewCycle: (maxTimeSeconds: number, elapsedSeconds?: number) => void;
      startMeasuring: (elapsedSeconds?: number) => void;
      setIdle: () => void;
      completeMeasuring: () => void;
      pause: () => void;
      resume: () => void;
      isPaused: () => boolean;
    }) => {
      controlsRef.current = controls;
      args.onCycleComplete(controls);
    };
    const startMeasuring = () => {
      if (controlsRef.current) {
        controlsRef.current.startMeasuring();
      }
    };
    const startMeasuringHours = () => {
      if (controlsRef.current) {
        controlsRef.current.startMeasuring(7384); // ~2h 3m 4s elapsed
      }
    };
    const startCountdown = () => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(60); // 60 second countdown
      }
    };
    const startCountdownHours = () => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(7200); // 2 hour countdown
      }
    };
    const startCountdownDays = () => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(90000); // ~25 hour countdown (1d 1h)
      }
    };
    return <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 3
    }}>
        <CycleTimer {...args} onCycleComplete={handleCycleComplete} />

        <Box sx={{
        display: "flex",
        gap: 1,
        flexWrap: "wrap"
      }}>
          <Button variant="contained" onClick={startMeasuring} size="small">
            Start Measuring
          </Button>
          <Button variant="contained" onClick={startCountdown} size="small">
            Start 60s Countdown
          </Button>
          <Button variant="contained" onClick={startMeasuringHours} size="small" color="secondary">
            Measuring ~2h 3m
          </Button>
          <Button variant="contained" onClick={startCountdownHours} size="small" color="secondary">
            Countdown 2h
          </Button>
          <Button variant="contained" onClick={startCountdownDays} size="small" color="secondary">
            Countdown ~25h
          </Button>
        </Box>
      </Box>;
  }
}`,...(Z=(Y=N.parameters)==null?void 0:Y.docs)==null?void 0:Z.source},description:{story:`Compact small variant showing only the localized time without additional labels.
Perfect for space-constrained UIs where you need just the essential time display.`,...(te=(ee=N.parameters)==null?void 0:ee.docs)==null?void 0:te.description}}};const Ne=["Default","SmallVariant","CompactVariant"];export{N as CompactVariant,E as Default,D as SmallVariant,Ne as __namedExportsOrder,De as default};
