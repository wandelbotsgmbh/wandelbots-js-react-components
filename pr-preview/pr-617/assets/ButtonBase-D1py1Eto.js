var Vt=Object.defineProperty;var Bt=(n,t,e)=>t in n?Vt(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var it=(n,t,e)=>Bt(n,typeof t!="symbol"?t+"":t,e);import{r as l,R as H,c as x,j as N,a as lt,U as Z}from"./iframe-DchEWV59.js";import{g as ut,s as tt,b as St,u as st,e as _,a as wt}from"./Typography-DMtLnw89.js";import{b as Dt,_ as jt,a as Lt,T as rt,u as vt}from"./useTimeout-Dx8AlRKo.js";import{i as at}from"./isFocusVisible-B8k4qzLc.js";function J(){return J=Object.assign?Object.assign.bind():function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var a in e)({}).hasOwnProperty.call(e,a)&&(n[a]=e[a])}return n},J.apply(null,arguments)}class G{constructor(){it(this,"mountEffect",()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())});this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}static create(){return new G}static use(){const t=Dt(G.create).current,[e,a]=l.useState(!1);return t.shouldMount=e,t.setShouldMount=a,l.useEffect(t.mountEffect,[e]),t}mount(){return this.mounted||(this.mounted=Nt(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}start(...t){this.mount().then(()=>{var e;return(e=this.ref.current)==null?void 0:e.start(...t)})}stop(...t){this.mount().then(()=>{var e;return(e=this.ref.current)==null?void 0:e.stop(...t)})}pulsate(...t){this.mount().then(()=>{var e;return(e=this.ref.current)==null?void 0:e.pulsate(...t)})}}function kt(){return G.use()}function Nt(){let n,t;const e=new Promise((a,o)=>{n=a,t=o});return e.resolve=n,e.reject=t,e}function $t(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function et(n,t){var e=function(i){return t&&l.isValidElement(i)?t(i):i},a=Object.create(null);return n&&l.Children.map(n,function(o){return o}).forEach(function(o){a[o.key]=e(o)}),a}function Ft(n,t){n=n||{},t=t||{};function e(d){return d in t?t[d]:n[d]}var a=Object.create(null),o=[];for(var i in n)i in t?o.length&&(a[i]=o,o=[]):o.push(i);var s,p={};for(var u in t){if(a[u])for(s=0;s<a[u].length;s++){var f=a[u][s];p[a[u][s]]=e(f)}p[u]=e(u)}for(s=0;s<o.length;s++)p[o[s]]=e(o[s]);return p}function k(n,t,e){return e[t]!=null?e[t]:n.props[t]}function It(n,t){return et(n.children,function(e){return l.cloneElement(e,{onExited:t.bind(null,e),in:!0,appear:k(e,"appear",n),enter:k(e,"enter",n),exit:k(e,"exit",n)})})}function Ut(n,t,e){var a=et(n.children),o=Ft(t,a);return Object.keys(o).forEach(function(i){var s=o[i];if(l.isValidElement(s)){var p=i in t,u=i in a,f=t[i],d=l.isValidElement(f)&&!f.props.in;u&&(!p||d)?o[i]=l.cloneElement(s,{onExited:e.bind(null,s),in:!0,exit:k(s,"exit",n),enter:k(s,"enter",n)}):!u&&p&&!d?o[i]=l.cloneElement(s,{in:!1}):u&&p&&l.isValidElement(f)&&(o[i]=l.cloneElement(s,{onExited:e.bind(null,s),in:f.props.in,exit:k(s,"exit",n),enter:k(s,"enter",n)}))}}),o}var Ot=Object.values||function(n){return Object.keys(n).map(function(t){return n[t]})},zt={component:"div",childFactory:function(t){return t}},nt=(function(n){jt(t,n);function t(a,o){var i;i=n.call(this,a,o)||this;var s=i.handleExited.bind($t(i));return i.state={contextValue:{isMounting:!0},handleExited:s,firstRender:!0},i}var e=t.prototype;return e.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},e.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(o,i){var s=i.children,p=i.handleExited,u=i.firstRender;return{children:u?It(o,p):Ut(o,s,p),firstRender:!1}},e.handleExited=function(o,i){var s=et(this.props.children);o.key in s||(o.props.onExited&&o.props.onExited(i),this.mounted&&this.setState(function(p){var u=J({},p.children);return delete u[o.key],{children:u}}))},e.render=function(){var o=this.props,i=o.component,s=o.childFactory,p=Lt(o,["component","childFactory"]),u=this.state.contextValue,f=Ot(this.state.children).map(s);return delete p.appear,delete p.enter,delete p.exit,i===null?H.createElement(rt.Provider,{value:u},f):H.createElement(rt.Provider,{value:u},H.createElement(i,p,f))},t})(H.Component);nt.propTypes={};nt.defaultProps=zt;function At(n){const{className:t,classes:e,pulsate:a=!1,rippleX:o,rippleY:i,rippleSize:s,in:p,onExited:u,timeout:f}=n,[d,h]=l.useState(!1),M=x(t,e.ripple,e.rippleVisible,a&&e.ripplePulsate),V={width:s,height:s,top:-(s/2)+i,left:-(s/2)+o},g=x(e.child,d&&e.childLeaving,a&&e.childPulsate);return!p&&!d&&h(!0),l.useEffect(()=>{if(!p&&u!=null){const D=setTimeout(u,f);return()=>{clearTimeout(D)}}},[u,p,f]),N.jsx("span",{className:M,style:V,children:N.jsx("span",{className:g})})}const b=ut("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),Q=550,Xt=80,Yt=Z`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,Kt=Z`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,Wt=Z`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,Ht=tt("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),_t=tt(At,{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${b.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${Yt};
    animation-duration: ${Q}ms;
    animation-timing-function: ${({theme:n})=>n.transitions.easing.easeInOut};
  }

  &.${b.ripplePulsate} {
    animation-duration: ${({theme:n})=>n.transitions.duration.shorter}ms;
  }

  & .${b.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${b.childLeaving} {
    opacity: 0;
    animation-name: ${Kt};
    animation-duration: ${Q}ms;
    animation-timing-function: ${({theme:n})=>n.transitions.easing.easeInOut};
  }

  & .${b.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${Wt};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:n})=>n.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,Gt=l.forwardRef(function(t,e){const a=lt({props:t,name:"MuiTouchRipple"}),{center:o=!1,classes:i={},className:s,...p}=a,[u,f]=l.useState([]),d=l.useRef(0),h=l.useRef(null);l.useEffect(()=>{h.current&&(h.current(),h.current=null)},[u]);const M=l.useRef(!1),V=vt(),g=l.useRef(null),D=l.useRef(null),C=l.useCallback(c=>{const{pulsate:y,rippleX:R,rippleY:I,rippleSize:j,cb:O}=c;f(E=>[...E,N.jsx(_t,{classes:{ripple:x(i.ripple,b.ripple),rippleVisible:x(i.rippleVisible,b.rippleVisible),ripplePulsate:x(i.ripplePulsate,b.ripplePulsate),child:x(i.child,b.child),childLeaving:x(i.childLeaving,b.childLeaving),childPulsate:x(i.childPulsate,b.childPulsate)},timeout:Q,pulsate:y,rippleX:R,rippleY:I,rippleSize:j},d.current)]),d.current+=1,h.current=O},[i]),$=l.useCallback((c={},y={},R=()=>{})=>{const{pulsate:I=!1,center:j=o||y.pulsate,fakeElement:O=!1}=y;if((c==null?void 0:c.type)==="mousedown"&&M.current){M.current=!1;return}(c==null?void 0:c.type)==="touchstart"&&(M.current=!0);const E=O?null:D.current,B=E?E.getBoundingClientRect():{width:0,height:0,left:0,top:0};let S,T,w;if(j||c===void 0||c.clientX===0&&c.clientY===0||!c.clientX&&!c.touches)S=Math.round(B.width/2),T=Math.round(B.height/2);else{const{clientX:z,clientY:L}=c.touches&&c.touches.length>0?c.touches[0]:c;S=Math.round(z-B.left),T=Math.round(L-B.top)}if(j)w=Math.sqrt((2*B.width**2+B.height**2)/3),w%2===0&&(w+=1);else{const z=Math.max(Math.abs((E?E.clientWidth:0)-S),S)*2+2,L=Math.max(Math.abs((E?E.clientHeight:0)-T),T)*2+2;w=Math.sqrt(z**2+L**2)}c!=null&&c.touches?g.current===null&&(g.current=()=>{C({pulsate:I,rippleX:S,rippleY:T,rippleSize:w,cb:R})},V.start(Xt,()=>{g.current&&(g.current(),g.current=null)})):C({pulsate:I,rippleX:S,rippleY:T,rippleSize:w,cb:R})},[o,C,V]),Y=l.useCallback(()=>{$({},{pulsate:!0})},[$]),F=l.useCallback((c,y)=>{if(V.clear(),(c==null?void 0:c.type)==="touchend"&&g.current){g.current(),g.current=null,V.start(0,()=>{F(c,y)});return}g.current=null,f(R=>R.length>0?R.slice(1):R),h.current=y},[V]);return l.useImperativeHandle(e,()=>({pulsate:Y,start:$,stop:F}),[Y,$,F]),N.jsx(Ht,{className:x(b.root,i.root,s),ref:D,...p,children:N.jsx(nt,{component:null,exit:!0,children:u})})});function qt(n){return St("MuiButtonBase",n)}const Jt=ut("MuiButtonBase",["root","disabled","focusVisible"]),Qt=n=>{const{disabled:t,focusVisible:e,focusVisibleClassName:a,classes:o}=n,s=wt({root:["root",t&&"disabled",e&&"focusVisible"]},qt,o);return e&&a&&(s.root+=` ${a}`),s},Zt=tt("button",{name:"MuiButtonBase",slot:"Root"})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${Jt.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),se=l.forwardRef(function(t,e){const a=lt({props:t,name:"MuiButtonBase"}),{action:o,centerRipple:i=!1,children:s,className:p,component:u="button",disabled:f=!1,disableRipple:d=!1,disableTouchRipple:h=!1,focusRipple:M=!1,focusVisibleClassName:V,LinkComponent:g="a",onBlur:D,onClick:C,onContextMenu:$,onDragLeave:Y,onFocus:F,onFocusVisible:c,onKeyDown:y,onKeyUp:R,onMouseDown:I,onMouseLeave:j,onMouseUp:O,onTouchEnd:E,onTouchMove:B,onTouchStart:S,tabIndex:T=0,TouchRippleProps:w,touchRippleRef:z,type:L,...U}=a,A=l.useRef(null),m=kt(),ct=st(m.ref,z),[v,K]=l.useState(!1);f&&v&&K(!1),l.useImperativeHandle(o,()=>({focusVisible:()=>{K(!0),A.current.focus()}}),[]);const pt=m.shouldMount&&!d&&!f;l.useEffect(()=>{v&&M&&!d&&m.pulsate()},[d,M,v,m]);const ft=P(m,"start",I,h),dt=P(m,"stop",$,h),ht=P(m,"stop",Y,h),mt=P(m,"stop",O,h),gt=P(m,"stop",r=>{v&&r.preventDefault(),j&&j(r)},h),bt=P(m,"start",S,h),Mt=P(m,"stop",E,h),Rt=P(m,"stop",B,h),yt=P(m,"stop",r=>{at(r.target)||K(!1),D&&D(r)},!1),Et=_(r=>{A.current||(A.current=r.currentTarget),at(r.target)&&(K(!0),c&&c(r)),F&&F(r)}),q=()=>{const r=A.current;return u&&u!=="button"&&!(r.tagName==="A"&&r.href)},xt=_(r=>{M&&!r.repeat&&v&&r.key===" "&&m.stop(r,()=>{m.start(r)}),r.target===r.currentTarget&&q()&&r.key===" "&&r.preventDefault(),y&&y(r),r.target===r.currentTarget&&q()&&r.key==="Enter"&&!f&&(r.preventDefault(),C&&C(r))}),Ct=_(r=>{M&&r.key===" "&&v&&!r.defaultPrevented&&m.stop(r,()=>{m.pulsate(r)}),R&&R(r),C&&r.target===r.currentTarget&&q()&&r.key===" "&&!r.defaultPrevented&&C(r)});let W=u;W==="button"&&(U.href||U.to)&&(W=g);const X={};if(W==="button"){const r=!!U.formAction;X.type=L===void 0&&!r?"button":L,X.disabled=f}else!U.href&&!U.to&&(X.role="button"),f&&(X["aria-disabled"]=f);const Tt=st(e,A),ot={...a,centerRipple:i,component:u,disabled:f,disableRipple:d,disableTouchRipple:h,focusRipple:M,tabIndex:T,focusVisible:v},Pt=Qt(ot);return N.jsxs(Zt,{as:W,className:x(Pt.root,p),ownerState:ot,onBlur:yt,onClick:C,onContextMenu:dt,onFocus:Et,onKeyDown:xt,onKeyUp:Ct,onMouseDown:ft,onMouseLeave:gt,onMouseUp:mt,onDragLeave:ht,onTouchEnd:Mt,onTouchMove:Rt,onTouchStart:bt,ref:Tt,tabIndex:f?-1:T,type:L,...X,...U,children:[s,pt?N.jsx(Gt,{ref:ct,center:i,...w}):null]})});function P(n,t,e,a=!1){return _(o=>(e&&e(o),a||n[t](o),!0))}export{se as B,J as _};
