import{j as n,r as c,R as j}from"./iframe-bBEJQEds.js";import{o as Z}from"./index-DoEeHceI.js";import{e as ee}from"./externalizeComponent-DLrNwbvW.js";import{u as K}from"./useTranslation-C9zVIkME.js";import{u as J}from"./useTheme-BdsD46aS.js";import{B as g}from"./Box-BAC3Irbd.js";import{F as I}from"./Fade-CuIw1BRt.js";import{T as E}from"./Typography-Dwqy70mz.js";import{G as te}from"./Gauge-BPVgUwUD.js";import{u as re}from"./interpolation-CgXhfxDr.js";import{B as x}from"./Button-N07hVmnv.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./context-DLuZ7TM-.js";import"./utils-DYmQ7Bdk.js";import"./useTimeout-DHf2iQkr.js";import"./ButtonBase-CFfTI7X0.js";import"./isFocusVisible-B8k4qzLc.js";import"./fastObjectShallowCompare-C4oz6moK.js";import"./with-selector-Cm4r2eIn.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useThemeProps-BR_7Qw_j.js";import"./getThemeProps-B674xtKh.js";import"./CircularProgress-Cw7se-Mx.js";const ne=u=>{const o=Math.floor(u/86400),t=Math.floor(u%86400/3600),l=Math.floor(u%3600/60),r=u%60,e=[];return o>0?(e.push(o.toString()),e.push(t.toString().padStart(2,"0")),e.push(l.toString().padStart(2,"0")),e.push(r.toString().padStart(2,"0"))):t>0?(e.push(t.toString()),e.push(l.toString().padStart(2,"0")),e.push(r.toString().padStart(2,"0"))):(e.push(l.toString()),e.push(r.toString().padStart(2,"0"))),e.join(":")},z=(u,o)=>{const t=Math.floor(u/86400),l=Math.floor(u%86400/3600),r=Math.floor(u%3600/60),e=u%60;if(typeof Intl<"u"&&"DurationFormat"in Intl)try{const i={};return t>0&&(i.days=t),l>0&&(i.hours=l),r>0&&(i.minutes=r),(e>0||Object.keys(i).length===0)&&(i.seconds=e),new Intl.DurationFormat(o,{style:"narrow"}).format(i)}catch{}const a=[];return t>0&&a.push(`${t}d`),l>0&&a.push(`${l}h`),r>0&&a.push(`${r}m`),(e>0||a.length===0)&&a.push(`${e}s`),a.join(" ")},B=({timerState:u,animationState:o,hasError:t,className:l})=>{const{t:r}=K(),e=J(),{elapsedTime:a,currentProgress:i}=u,{showErrorAnimation:d,showPauseAnimation:f,showMainText:p}=o;return n.jsxs(g,{className:l,sx:{position:"relative",width:264,height:264,display:"flex",alignItems:"center",justifyContent:"center"},children:[n.jsx(te,{width:264,height:264,value:i,valueMin:0,valueMax:100,innerRadius:"85%",outerRadius:"100%",margin:0,skipAnimation:!0,text:()=>"",sx:{opacity:f||d?.6:1,transition:"opacity 0.5s ease-out","& .MuiGauge-valueArc":{fill:t?e.palette.error.light:e.palette.success.main,transition:"fill 0.5s ease-out"},"& .MuiGauge-referenceArc":{fill:"#171927",stroke:"transparent",strokeWidth:0,transition:"fill 0.5s ease-out, stroke 0.5s ease-out, stroke-width 0.5s ease-out"},"& .MuiGauge-valueText":{display:"none"},"& .MuiGauge-text":{display:"none"}}}),n.jsx(g,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:225,height:225,borderRadius:"50%",backgroundColor:"#292B3F",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",gap:1,transition:"background-color 0.5s ease-out"},children:n.jsxs(g,{sx:{position:"relative",height:"48px",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:.5},children:[n.jsx(I,{in:p&&t,timeout:200,children:n.jsx(E,{variant:"h6",sx:{position:"absolute",fontSize:"16px",fontWeight:500,color:e.palette.error.light},children:r("timer.error")})}),n.jsx(I,{in:p&&!t,timeout:300,children:n.jsx(E,{variant:"h1",sx:{position:"absolute",fontSize:"48px",fontWeight:500,color:e.palette.text.primary,lineHeight:1,letterSpacing:"-0.5px"},children:ne(a)})})]})})]})};try{B.displayName="TimerDefaultVariant",B.__docgenInfo={description:"",displayName:"TimerDefaultVariant",props:{timerState:{defaultValue:null,description:"",name:"timerState",required:!0,type:{name:"TimerState"}},animationState:{defaultValue:null,description:"",name:"animationState",required:!0,type:{name:"TimerAnimationState"}},hasError:{defaultValue:null,description:"",name:"hasError",required:!0,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const P=({timerState:u,animationState:o,hasError:t,compact:l,className:r})=>{const{t:e,i18n:a}=K(),i=J(),{elapsedTime:d,currentProgress:f}=u,{showErrorAnimation:p,showPauseAnimation:s}=o;return l?n.jsx(g,{className:r,sx:{display:"flex",alignItems:"center",m:0},children:n.jsx(E,{variant:"body2",sx:{color:t?i.palette.error.light:i.palette.text.primary,fontSize:"14px",transition:"color 0.5s ease-out"},children:t?e("timer.error"):z(d,a.language)})}):n.jsxs(g,{className:r,sx:{display:"flex",alignItems:"center",m:0,gap:1},children:[n.jsx(g,{sx:{width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",opacity:s||p?.6:1,transition:"opacity 0.5s ease-out"},children:n.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 20 20",style:{transform:"rotate(-90deg)"},role:"img","aria-label":"Timer progress",children:[n.jsx("circle",{cx:"10",cy:"10",r:"8",fill:"none",stroke:t?i.palette.error.light:i.palette.success.main,strokeWidth:"2",opacity:.3,style:{transition:"stroke 0.8s ease-in-out, opacity 2s ease-in-out"}}),n.jsx("circle",{cx:"10",cy:"10",r:"8",fill:"none",stroke:t?i.palette.error.light:i.palette.success.main,strokeWidth:"2",strokeLinecap:"round",strokeDasharray:`${2*Math.PI*8}`,strokeDashoffset:`${2*Math.PI*8*(1-f/100)}`,style:{transition:"stroke-dashoffset 0.1s ease-out, stroke 0.8s ease-in-out, opacity 2s ease-in-out"}})]})}),n.jsx(E,{variant:"body2",sx:{color:t?i.palette.error.light:i.palette.text.primary,fontSize:"14px",lineHeight:"normal",letterSpacing:"normal",transition:"color 0.8s ease-in-out, font-size 0.3s ease-out, opacity 2s ease-in-out"},children:t?e("timer.error"):z(d,a.language)})]})};try{P.displayName="TimerSmallVariant",P.__docgenInfo={description:"",displayName:"TimerSmallVariant",props:{timerState:{defaultValue:null,description:"",name:"timerState",required:!0,type:{name:"TimerState"}},animationState:{defaultValue:null,description:"",name:"animationState",required:!0,type:{name:"TimerAnimationState"}},hasError:{defaultValue:null,description:"",name:"hasError",required:!0,type:{name:"boolean"}},compact:{defaultValue:null,description:"",name:"compact",required:!0,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const ae=()=>{const[u,o]=c.useState({showPauseAnimation:!1,showErrorAnimation:!1,showMainText:!0}),t=c.useRef(null),l=c.useRef(null),r=c.useRef(null),e=c.useCallback(()=>{o(s=>({...s,showPauseAnimation:!0})),t.current&&clearTimeout(t.current),t.current=setTimeout(()=>{o(s=>({...s,showPauseAnimation:!1}))},800)},[]),a=c.useCallback(()=>{o(s=>({...s,showErrorAnimation:!0})),l.current&&clearTimeout(l.current),l.current=setTimeout(()=>{o(s=>({...s,showErrorAnimation:!1}))},600)},[]),i=c.useCallback(()=>{o(s=>({...s,showErrorAnimation:!1})),l.current&&clearTimeout(l.current)},[]),d=c.useCallback(()=>{o(s=>({...s,showMainText:!1})),r.current&&clearTimeout(r.current),r.current=setTimeout(()=>{o(s=>({...s,showMainText:!0}))},200)},[]),f=c.useCallback(()=>{o(s=>({...s,showMainText:!0}))},[]),p=c.useCallback(()=>{t.current&&clearTimeout(t.current),l.current&&clearTimeout(l.current),r.current&&clearTimeout(r.current)},[]);return{animationState:u,triggerPauseAnimation:e,triggerErrorAnimation:a,clearErrorAnimation:i,triggerFadeTransition:d,setInitialAnimationState:f,cleanup:p}},se=({autoStart:u,hasError:o,onPauseAnimation:t,onErrorAnimation:l,onClearErrorAnimation:r})=>{const[e,a]=c.useState({elapsedTime:0,isRunning:!1,isPausedState:!1,currentProgress:0,wasRunningBeforeError:!1}),i=c.useRef(null),d=c.useRef(null),f=c.useRef(0),p=c.useRef(0),[s]=re([0],{tension:80,friction:18,onChange:([m])=>{a(h=>({...h,currentProgress:m}))}}),T=c.useCallback((m=0)=>{const h=m/60%1*100;a(y=>({...y,elapsedTime:m,isPausedState:!1,currentProgress:h})),f.current=0,p.current=h,s.setImmediate([h]),u?(d.current=Date.now()-m*1e3,a(y=>({...y,isRunning:!0}))):d.current=null},[u,s]),R=c.useCallback(()=>{if(d.current&&e.isRunning){const h=(Date.now()-d.current)/1e3+f.current,y=h/60%1*100;s.setTarget([y]),a(w=>({...w,elapsedTime:Math.floor(h)}))}a(m=>({...m,isRunning:!1,isPausedState:!0})),t()},[e.isRunning,s,t]),S=c.useCallback(()=>{e.isPausedState&&(f.current=e.elapsedTime,d.current=Date.now(),a(m=>({...m,isRunning:!0,isPausedState:!1})))},[e.isPausedState,e.elapsedTime]),A=c.useCallback(()=>{a(m=>({...m,elapsedTime:0,isRunning:!1,isPausedState:!1,currentProgress:0})),f.current=0,d.current=null,p.current=0,s.setImmediate([0])},[s]),Q=c.useCallback(()=>e.isPausedState,[e.isPausedState]);return c.useEffect(()=>{o?(e.isRunning&&(a(m=>({...m,wasRunningBeforeError:!0})),R()),l()):(e.wasRunningBeforeError&&!e.isRunning&&(a(m=>({...m,wasRunningBeforeError:!1})),S()),r())},[o,e.isRunning,e.wasRunningBeforeError,R,S,l,r]),c.useEffect(()=>{if(e.isRunning){const m=()=>{if(d.current){const y=(Date.now()-d.current)/1e3+f.current,w=y/60%1*100;a(Y=>({...Y,elapsedTime:Math.floor(y)})),Math.abs(w-p.current)>.1&&(s.setTarget([w]),p.current=w)}i.current=requestAnimationFrame(m)};i.current=requestAnimationFrame(m)}else i.current&&(cancelAnimationFrame(i.current),i.current=null);return()=>{i.current&&(cancelAnimationFrame(i.current),i.current=null)}},[e.isRunning,s]),c.useEffect(()=>{let m=null;const h=()=>{s.update(),m=requestAnimationFrame(h)};return m=requestAnimationFrame(h),()=>{m&&cancelAnimationFrame(m)}},[s]),{timerState:e,controls:{start:T,pause:R,resume:S,reset:A,isPaused:Q}}},v=ee(Z(({onTimerReady:u,autoStart:o=!0,variant:t="default",compact:l=!1,className:r,hasError:e=!1})=>{const{animationState:a,triggerPauseAnimation:i,triggerErrorAnimation:d,clearErrorAnimation:f,setInitialAnimationState:p,cleanup:s}=ae(),{timerState:T,controls:R}=se({autoStart:o,hasError:e,onPauseAnimation:i,onErrorAnimation:d,onClearErrorAnimation:f});return c.useEffect(()=>{p()},[p]),c.useEffect(()=>{let S=!0;const A=setTimeout(()=>{S&&u(R)},0);return()=>{S=!1,clearTimeout(A)}},[u,R]),c.useEffect(()=>s,[s]),t==="small"?n.jsx(P,{timerState:T,animationState:a,hasError:e,compact:l,className:r}):n.jsx(B,{timerState:T,animationState:a,hasError:e,className:r})}));try{v.displayName="Timer",v.__docgenInfo={description:`A simple count-up timer component with visual progress indication

Features:
- Count-up timer that tracks elapsed time
- Visual progress gauge that cycles every minute
- Two display variants: large circular gauge (default) or small icon with text
- Full timer control: start, pause, resume, reset functionality
- Support for starting with elapsed time (resume mid-session)
- Error state support: pauses timer and shows error styling
- Smooth progress animations with spring physics
- Fully localized with i18next
- Material-UI theming integration`,displayName:"Timer",props:{onTimerReady:{defaultValue:null,description:"Callback that receives the timer control functions",name:"onTimerReady",required:!0,type:{name:"(controls: TimerControls) => void"}},autoStart:{defaultValue:null,description:"Whether the timer should start automatically when initialized",name:"autoStart",required:!1,type:{name:"boolean"}},variant:{defaultValue:null,description:"Visual variant of the timer",name:"variant",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"default"'}]}},compact:{defaultValue:null,description:"For small variant: whether to show compact display",name:"compact",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"Additional CSS classes",name:"className",required:!1,type:{name:"string"}},hasError:{defaultValue:null,description:"Whether the timer is in an error state (pauses timer and shows error styling)",name:"hasError",required:!1,type:{name:"boolean"}}}}}catch{}const Ie={title:"Components/Timer",component:v,tags:["!dev"],parameters:{layout:"centered",docs:{description:{component:`
A simple count-up timer component with visual progress indication.

**Key Features:**
- **Count-up timer** that tracks elapsed time continuously
- **Visual progress gauge** that cycles every minute (264px diameter for default variant)
- **Two display variants:** large circular gauge or small icon with text
- **Timer control interface** (start, pause, resume, reset)
- **Error state support:** pauses timer and shows error styling with automatic resume
- **Smooth progress animations** with spring physics
- **Two variants:** default (large gauge) or small (animated icon with text)
- **Compact mode:** for small variant, shows only essential information
- Fully localized with i18next
- Material-UI theming integration

**Control Functions:**
- \`start(elapsedSeconds?)\` - Start timer with optional elapsed time
- \`pause()\` / \`resume()\` - Pause and resume timer
- \`reset()\` - Reset timer to zero
- \`isPaused()\` - Check pause state
        `},story:{inline:!1,iframeHeight:400}}},args:{autoStart:!0,onTimerReady:()=>{}},argTypes:{onTimerReady:{action:"onTimerReady",description:"Callback that receives timer control functions (start, pause, resume, reset, isPaused)"},autoStart:{control:"boolean",description:"Whether the timer should start automatically when initialized",table:{defaultValue:{summary:"true"}}},variant:{control:"select",options:["default","small"],description:"Visual variant: 'default' (large gauge) or 'small' (animated icon with text)",table:{defaultValue:{summary:"default"}}},compact:{control:"boolean",description:"For small variant: whether to show compact display",table:{defaultValue:{summary:"false"}}},className:{control:"text",description:"Additional CSS classes"},hasError:{control:"boolean",description:"Whether the timer is in an error state (pauses timer and shows error styling)",table:{defaultValue:{summary:"false"}}}}},C={args:{autoStart:!0},render:function(o){const[t,l]=j.useState(!1),r=j.useRef(null),e=T=>{r.current=T,o.onTimerReady(T)},a=()=>{r.current&&r.current.start()},i=()=>{r.current&&r.current.start(45)},d=()=>{r.current&&r.current.pause()},f=()=>{r.current&&r.current.resume()},p=()=>{r.current&&r.current.reset()},s=()=>{l(!t)};return n.jsxs(g,{sx:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[n.jsx(v,{...o,onTimerReady:e,hasError:t}),n.jsxs(g,{sx:{display:"flex",gap:1,flexWrap:"wrap",justifyContent:"center"},children:[n.jsx(x,{variant:"contained",onClick:a,size:"small",children:"Start Fresh"}),n.jsx(x,{variant:"contained",onClick:i,size:"small",children:"Start from 45s"}),n.jsx(x,{variant:"outlined",onClick:d,size:"small",children:"Pause"}),n.jsx(x,{variant:"outlined",onClick:f,size:"small",children:"Resume"}),n.jsx(x,{variant:"outlined",onClick:p,size:"small",children:"Reset"}),n.jsx(x,{variant:t?"contained":"outlined",color:"error",onClick:s,size:"small",children:t?"Clear Error":"Trigger Error"})]})]})}},k={args:{variant:"small",autoStart:!0},render:function(o){const t=j.useRef(null),l=a=>{t.current=a,o.onTimerReady(a)},r=()=>{t.current&&t.current.reset()},e=()=>{t.current&&t.current.start()};return n.jsxs(g,{sx:{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:3},children:[n.jsx(v,{...o,onTimerReady:l}),n.jsxs(g,{sx:{display:"flex",gap:1},children:[n.jsx(x,{variant:"contained",onClick:e,size:"small",children:"Start"}),n.jsx(x,{variant:"outlined",onClick:r,size:"small",children:"Reset"})]})]})}},b={args:{variant:"small",compact:!0,autoStart:!0},render:function(o){const t=j.useRef(null),l=a=>{t.current=a,o.onTimerReady(a)},r=()=>{t.current&&t.current.reset()},e=()=>{t.current&&t.current.start()};return n.jsxs(g,{sx:{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:2},children:[n.jsx(v,{...o,onTimerReady:l}),n.jsxs(g,{sx:{display:"flex",gap:1},children:[n.jsx(x,{variant:"contained",onClick:e,size:"small",children:"Start"}),n.jsx(x,{variant:"outlined",onClick:r,size:"small",children:"Reset"})]})]})}};var V,_,M,D,F;C.parameters={...C.parameters,docs:{...(V=C.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    autoStart: true
  },
  render: function Render(args) {
    const [hasError, setHasError] = React.useState(false);
    const controlsRef = React.useRef<{
      start: (elapsedSeconds?: number) => void;
      pause: () => void;
      resume: () => void;
      reset: () => void;
      isPaused: () => boolean;
    } | null>(null);
    const handleTimerReady = (controls: {
      start: (elapsedSeconds?: number) => void;
      pause: () => void;
      resume: () => void;
      reset: () => void;
      isPaused: () => boolean;
    }) => {
      controlsRef.current = controls;
      args.onTimerReady(controls);
    };
    const startTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.start();
      }
    };
    const startWithElapsed = () => {
      if (controlsRef.current) {
        controlsRef.current.start(45); // Start with 45 seconds elapsed
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
    const resetTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.reset();
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
        <Timer {...args} onTimerReady={handleTimerReady} hasError={hasError} />

        <Box sx={{
        display: "flex",
        gap: 1,
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
          <Button variant="contained" onClick={startTimer} size="small">
            Start Fresh
          </Button>
          <Button variant="contained" onClick={startWithElapsed} size="small">
            Start from 45s
          </Button>
          <Button variant="outlined" onClick={pauseTimer} size="small">
            Pause
          </Button>
          <Button variant="outlined" onClick={resumeTimer} size="small">
            Resume
          </Button>
          <Button variant="outlined" onClick={resetTimer} size="small">
            Reset
          </Button>
          <Button variant={hasError ? "contained" : "outlined"} color="error" onClick={toggleError} size="small">
            {hasError ? "Clear Error" : "Trigger Error"}
          </Button>
        </Box>
      </Box>;
  }
}`,...(M=(_=C.parameters)==null?void 0:_.docs)==null?void 0:M.source},description:{story:`Interactive demonstration of Timer functionality.
Use the buttons to control the timer: start, pause, resume, reset.
Test error state behavior and see how the timer handles different scenarios.`,...(F=(D=C.parameters)==null?void 0:D.docs)==null?void 0:F.description}}};var q,N,W,G,H;k.parameters={...k.parameters,docs:{...(q=k.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    variant: "small",
    autoStart: true
  },
  render: function Render(args) {
    const controlsRef = React.useRef<{
      start: (elapsedSeconds?: number) => void;
      pause: () => void;
      resume: () => void;
      reset: () => void;
      isPaused: () => boolean;
    } | null>(null);
    const handleTimerReady = (controls: {
      start: (elapsedSeconds?: number) => void;
      pause: () => void;
      resume: () => void;
      reset: () => void;
      isPaused: () => boolean;
    }) => {
      controlsRef.current = controls;
      args.onTimerReady(controls);
    };
    const resetTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
    };
    const startTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.start();
      }
    };
    return <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 3
    }}>
        <Timer {...args} onTimerReady={handleTimerReady} />

        <Box sx={{
        display: "flex",
        gap: 1
      }}>
          <Button variant="contained" onClick={startTimer} size="small">
            Start
          </Button>
          <Button variant="outlined" onClick={resetTimer} size="small">
            Reset
          </Button>
        </Box>
      </Box>;
  }
}`,...(W=(N=k.parameters)==null?void 0:N.docs)==null?void 0:W.source},description:{story:`Small variant with animated progress icon next to text.
Shows the format: [ANIMATED_ICON] X:XX
The icon is a gauge border only (no fill) that animates with progress.`,...(H=(G=k.parameters)==null?void 0:G.docs)==null?void 0:H.description}}};var X,$,O,L,U;b.parameters={...b.parameters,docs:{...(X=b.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    variant: "small",
    compact: true,
    autoStart: true
  },
  render: function Render(args) {
    const controlsRef = React.useRef<{
      start: (elapsedSeconds?: number) => void;
      pause: () => void;
      resume: () => void;
      reset: () => void;
      isPaused: () => boolean;
    } | null>(null);
    const handleTimerReady = (controls: {
      start: (elapsedSeconds?: number) => void;
      pause: () => void;
      resume: () => void;
      reset: () => void;
      isPaused: () => boolean;
    }) => {
      controlsRef.current = controls;
      args.onTimerReady(controls);
    };
    const resetTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
    };
    const startTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.start();
      }
    };
    return <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 2
    }}>
        <Timer {...args} onTimerReady={handleTimerReady} />

        <Box sx={{
        display: "flex",
        gap: 1
      }}>
          <Button variant="contained" onClick={startTimer} size="small">
            Start
          </Button>
          <Button variant="outlined" onClick={resetTimer} size="small">
            Reset
          </Button>
        </Box>
      </Box>;
  }
}`,...(O=($=b.parameters)==null?void 0:$.docs)==null?void 0:O.source},description:{story:`Small compact variant that only shows elapsed time with animated icon.
Format: [ANIMATED_ICON] X:XX
The icon shows progress animation without any additional text details.`,...(U=(L=b.parameters)==null?void 0:L.docs)==null?void 0:U.description}}};const ze=["Default","SmallVariant","SmallCompact"];export{C as Default,b as SmallCompact,k as SmallVariant,ze as __namedExportsOrder,Ie as default};
