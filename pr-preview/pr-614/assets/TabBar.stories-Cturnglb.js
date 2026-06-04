import{r as h,j as e}from"./iframe-BktpLyFG.js";import{c as I}from"./createSvgIcon-3XXHrKCW.js";import{E as ne}from"./Error-BKOxo_T0.js";import{P as de}from"./PlayArrow-BnyyJBUE.js";import{S as te}from"./Settings-Csm1entO.js";import{o as pe}from"./index-Bu7iQjly.js";import{e as me}from"./externalizeComponent-BkYu4_0b.js";import{B as t}from"./Box-6_1luqr6.js";import{T as xe,a as be}from"./Tab-CXbn_kY8.js";import{B as he,L as Z,a as v}from"./Badge-Ccnqx8Eb.js";import{T as n}from"./Typography-Voa_F59U.js";import{A as x}from"./Alert-CvY8Cfq_.js";import{B as d}from"./Button-DUdd8WAk.js";import{C as R}from"./Card-DN1ZgJdO.js";import{C as L}from"./CardContent-Arg7Xqnx.js";import{L as oe}from"./listItemTextClasses-DTgc7c2b.js";import{L as f}from"./ListItem-BR3_uU9g.js";import"./preload-helper-Dp1pzeXC.js";import"./SvgIcon-DVr8FpOn.js";import"./mobx.esm-D1cTsgoC.js";import"./context-Cblz76sC.js";import"./useTheme-vGz388W0.js";import"./getActiveElement-DA87hiaC.js";import"./ownerWindow-HkKU3E4x.js";import"./ownerDocument-DW-IO8s5.js";import"./useSlot-HeRHl38G.js";import"./mergeSlotProps-Dw9MGOG8.js";import"./useSlotProps-9D-wZKDg.js";import"./ButtonBase-D0Z-haiV.js";import"./useTimeout-DalGcRLt.js";import"./isFocusVisible-B8k4qzLc.js";import"./IconButton--tvB0ucb.js";import"./CircularProgress-sS5KrYs0.js";import"./Paper-D3YakWmv.js";function ue(a){const{children:r,value:i,index:c,...s}=a;return e.jsx("div",{role:"tabpanel",hidden:i!==c,id:`tabpanel-${c}`,"aria-labelledby":`tab-${c}`,...s,children:i===c&&e.jsx(t,{children:r})})}function ye({children:a,...r}){const{fullWidth:i,indicator:c,onChange:s,orientation:u,scrollButtons:j,selectionFollowsFocus:b,textColor:y,value:C,variant:g,...P}=r;return e.jsx(t,{...P,children:a})}const T=me(pe(a=>{const{items:r,activeTab:i,defaultActiveTab:c=0,onTabChange:s,sx:u,ref:j}=a,b=i!==void 0,[y,C]=h.useState(c),g=b?i:y;h.useEffect(()=>{b||r.length!==0&&(y<0||y>r.length-1)&&C(0)},[r.length,b,y]);const P=(o,p)=>{b||C(p),s==null||s(p)};return e.jsxs(t,{ref:j,sx:{height:"100%",display:"flex",flexDirection:"column",...u},children:[e.jsx(t,{sx:{px:0,py:0,overflow:"visible",position:"relative",paddingTop:o=>o.spacing(2),paddingRight:o=>o.spacing(2.5)},children:e.jsx(xe,{value:g,onChange:P,sx:{minHeight:"32px",backgroundColor:"transparent",overflow:"visible","& .MuiTabs-indicator":{display:"none"},"& .MuiTabs-flexContainer":{gap:2,overflow:"visible",paddingTop:0,paddingBottom:0},"& .MuiTabs-scroller":{overflow:"visible !important"},"& .MuiTab-root":{overflow:"visible"}},children:r.map((o,p)=>{var H,z,D;const re=()=>{if(!o.badge)return;const m=o.badge.content,l=o.badge.max;return typeof m=="number"&&l&&m>l?`${l}+`:m},se=()=>{if(!o.badge)return!1;const m=o.badge.content,l=o.badge.showZero;return!(m===0&&!l)},ie=re(),ce=se(),le=()=>{b||C(p),s==null||s(p)},E=e.jsx(be,{label:o.label,icon:o.icon,iconPosition:"start",disableRipple:!0,onClick:le,sx:{minHeight:"32px",height:"32px",padding:"0px 10px",borderRadius:"12px",backgroundColor:m=>{var l;return((l=m.palette.backgroundPaperElevation)==null?void 0:l[11])||"#32344B"},color:"text.primary",opacity:g===p?1:.38,fontSize:"13px",transition:"all 0.2s ease-in-out",position:"relative",overflow:"visible","&:hover":{opacity:g===p?1:.6},"&.Mui-selected":{opacity:1,backgroundColor:m=>{var l;return((l=m.palette.backgroundPaperElevation)==null?void 0:l[11])||"#32344B"},color:"text.primary"},"&:focus":{outline:"none"},"&:active":{transform:"none"}}},o.id);return ce?e.jsx(ye,{component:"span",sx:{display:"inline-flex"},children:e.jsx(he,{badgeContent:ie,color:((H=o.badge)==null?void 0:H.color)||"error",max:(z=o.badge)==null?void 0:z.max,showZero:(D=o.badge)==null?void 0:D.showZero,anchorOrigin:{vertical:"top",horizontal:"right"},overlap:"rectangular",sx:{"& .MuiBadge-badge":{opacity:"1 !important"}},children:E})},o.id):E})})}),e.jsx(t,{sx:{mt:o=>o.spacing(2),borderBottom:1,borderColor:"divider"}}),e.jsx(t,{sx:{flex:1,overflow:"auto"},children:r.map((o,p)=>e.jsx(ue,{value:g,index:p,children:o.content},o.id))})]})}));try{T.displayName="TabBar",T.__docgenInfo={description:`A styled tab bar component with configurable tabs and content.
Features the same styling as the Wandelbots design system with rounded tabs
and smooth transitions.`,displayName:"TabBar",props:{items:{defaultValue:null,description:"Array of tab items to display",name:"items",required:!0,type:{name:"TabItem[]"}},activeTab:{defaultValue:null,description:"Controlled active tab index",name:"activeTab",required:!1,type:{name:"number"}},defaultActiveTab:{defaultValue:null,description:"Default active tab index",name:"defaultActiveTab",required:!1,type:{name:"number"}},onTabChange:{defaultValue:null,description:"Callback when tab changes",name:"onTabChange",required:!1,type:{name:"(index: number) => void"}},sx:{defaultValue:null,description:"Additional styling",name:"sx",required:!1,type:{name:"SxProps"}},ref:{defaultValue:null,description:"Ref to the root container element",name:"ref",required:!1,type:{name:"Ref<HTMLDivElement>"}}}}}catch{}const M=I(e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"})),q=I(e.jsx("path",{d:"M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9m-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8z"})),ae=I(e.jsx("path",{d:"M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3M7.5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 13 9 13s-1.5-.67-1.5-1.5M16 17H8v-2h8zm-1-4c-.83 0-1.5-.67-1.5-1.5S14.17 10 15 10s1.5.67 1.5 1.5S15.83 13 15 13"})),tn={title:"Navigation/TabBar",component:T,tags:["!dev"],parameters:{docs:{description:{component:`
A styled tab bar component with configurable tabs and content. 
Features the Wandelbots design system styling with rounded tabs and smooth transitions.

**Features:**
- Configurable tab items with labels and content
- Optional icons for tabs
- Internationalization support (i18next)
- Smooth hover and selection animations
- Responsive design with overflow handling
        `}}},argTypes:{items:{description:"Array of tab items to display",control:{type:"object"}},activeTab:{description:"Controlled active tab index (overrides defaultActiveTab)",control:{type:"number",min:0,max:10}},defaultActiveTab:{description:"Index of the tab that should be active by default",control:{type:"number",min:0,max:10}},onTabChange:{description:"Callback function called when tab selection changes",action:"tab changed"},sx:{description:"Additional MUI styling",control:{type:"object"}}}},ge=()=>e.jsxs(t,{sx:{p:0},children:[e.jsx(R,{sx:{mb:3,backgroundColor:"transparent"},elevation:0,children:e.jsxs(L,{sx:{p:0},children:[e.jsx(n,{variant:"h6",gutterBottom:!0,children:"3D Preview"}),e.jsx(t,{sx:{height:300,bgcolor:"grey.900",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:1,border:"2px dashed",borderColor:"grey.300"},children:e.jsx(n,{color:"text.secondary",children:"3D Preview will be implemented here"})})]})}),e.jsx(n,{variant:"body2",color:"text.secondary",children:"This tab shows a preview of the robot program with 3D visualization and trajectory display."})]}),ve=()=>e.jsxs(t,{sx:{p:0},children:[e.jsx(R,{sx:{mb:3,backgroundColor:"transparent"},elevation:0,children:e.jsxs(L,{sx:{p:0},children:[e.jsx(n,{variant:"h6",gutterBottom:!0,children:"Robot Information"}),e.jsxs(oe,{children:[e.jsxs(f,{sx:{px:0},children:[e.jsx(Z,{children:e.jsx(ae,{color:"success"})}),e.jsx(v,{primary:"UR5e Robot Arm",secondary:"Status: Connected and Ready"})]}),e.jsxs(f,{sx:{px:0},children:[e.jsx(Z,{children:e.jsx(M,{color:"success"})}),e.jsx(v,{primary:"Safety Systems",secondary:"All safety checks passed"})]})]})]})}),e.jsx(n,{variant:"body2",color:"text.secondary",children:"Detailed information about the program configuration, robot status, and system requirements."})]}),fe=()=>e.jsx(t,{sx:{p:3},children:e.jsx(R,{sx:{backgroundColor:"transparent"},elevation:0,children:e.jsxs(L,{sx:{p:0},children:[e.jsxs(n,{variant:"h6",gutterBottom:!0,sx:{display:"flex",alignItems:"center",gap:1},children:[e.jsx(q,{}),"Change Log"]}),e.jsxs(t,{sx:{display:"grid",gap:2,gridTemplateColumns:"auto 1fr"},children:[e.jsx(n,{variant:"body2",color:"text.secondary",children:"2025-03-03"}),e.jsx(n,{variant:"body2",children:"v2.0 release - Major performance improvements"}),e.jsx(n,{variant:"body2",color:"text.secondary",children:"2025-01-28"}),e.jsx(n,{variant:"body2",children:"v1.08 release - Bug fixes and stability improvements"}),e.jsx(n,{variant:"body2",color:"text.secondary",children:"2024-12-15"}),e.jsx(n,{variant:"body2",children:"v1.05 release - Initial release with basic functionality"})]})]})})}),Te=()=>e.jsxs(t,{sx:{p:3},children:[e.jsx(x,{severity:"info",sx:{mb:2},children:"Configuration settings would be displayed here"}),e.jsx(n,{variant:"body2",color:"text.secondary",children:"This tab contains various configuration options and settings for the application."})]}),B={args:{items:[{id:"tab1",label:"First Tab",content:e.jsx(t,{sx:{p:2},children:e.jsx(n,{variant:"body2",color:"text.secondary",children:"Content for first tab"})})},{id:"tab2",label:"Second Tab",content:e.jsx(t,{sx:{p:2},children:e.jsx(n,{variant:"body2",color:"text.secondary",children:"Content for second tab"})})},{id:"tab3",label:"Third Tab",content:e.jsx(t,{sx:{p:2},children:e.jsx(n,{variant:"body2",color:"text.secondary",children:"Content for third tab"})})}],defaultActiveTab:0},parameters:{docs:{description:{story:"Interactive TabBar component with controls. Adjust the tab items, default active tab, and other properties using the controls panel below."}}}},w={args:{items:[{id:"preview",label:"Program Preview",content:e.jsx(ge,{}),icon:e.jsx(de,{})},{id:"details",label:"Details",content:e.jsx(ve,{}),icon:e.jsx(ae,{})},{id:"history",label:"Update History",content:e.jsx(fe,{}),icon:e.jsx(q,{})}],defaultActiveTab:0},parameters:{docs:{description:{story:"TabBar with icons and rich content. Shows how tabs can include icons and more complex content sections."}}}},k={args:{items:[{id:"overview",label:"Overview",content:e.jsxs(t,{sx:{p:3},children:[e.jsx(x,{severity:"success",sx:{mb:2},children:"System is running normally"}),e.jsx(n,{children:"All systems operational"})]}),icon:e.jsx(M,{})},{id:"errors",label:"Errors",content:e.jsxs(t,{sx:{p:3},children:[e.jsx(x,{severity:"error",sx:{mb:2},children:"Critical error detected"}),e.jsx(n,{color:"error",children:"Robot communication timeout"})]}),icon:e.jsx(ne,{})},{id:"settings",label:"Settings",content:e.jsx(Te,{}),icon:e.jsx(te,{})}],defaultActiveTab:1},parameters:{docs:{description:{story:"Example with error states and different severity levels. The error tab is selected by default."}}}},A={render:()=>{const[a,r]=h.useState(3),[i,c]=h.useState(150),[s,u]=h.useState(0),j=[{id:"overview",label:"Overview",content:e.jsxs(t,{sx:{p:3},children:[e.jsx(x,{severity:"success",sx:{mb:2},children:"Configuration overview"}),e.jsx(n,{children:"All configured parameters are shown here"}),e.jsx(n,{variant:"body2",sx:{mt:2},children:"This tab has no badge configured."})]}),icon:e.jsx(M,{})},{id:"parameters",label:"Parameters",content:e.jsxs(t,{sx:{p:3},children:[e.jsx(x,{severity:a>0?"error":"success",sx:{mb:2},children:a>0?`${a} parameter(s) missing`:"All parameters completed!"}),e.jsx(n,{children:a>0?"Please fill in all required parameters:":"Great! All parameters are configured."}),a>0&&e.jsxs(oe,{children:[e.jsx(f,{children:e.jsx(v,{primary:"Robot IP Address",secondary:"Required"})}),e.jsx(f,{children:e.jsx(v,{primary:"Motion Group ID",secondary:"Required"})}),e.jsx(f,{children:e.jsx(v,{primary:"Safety Configuration",secondary:"Required"})})]}),e.jsxs(t,{sx:{mt:2,display:"flex",gap:1},children:[e.jsx(d,{variant:"contained",onClick:()=>r(0),disabled:a===0,children:"Complete Parameters"}),e.jsx(d,{variant:"outlined",onClick:()=>r(3),disabled:a===3,children:"Reset Parameters"})]}),e.jsx(n,{variant:"caption",sx:{mt:2,display:"block"},children:"Badge: showZero=false (hidden when count is 0)"})]}),icon:e.jsx(ne,{}),badge:{content:a,color:"error",showZero:!1}},{id:"notifications",label:"Notifications",content:e.jsxs(t,{sx:{p:3},children:[e.jsxs(x,{severity:"info",sx:{mb:2},children:["You have ",i," unread notification(s)"]}),e.jsx(n,{children:"Check your notifications regularly"}),e.jsxs(t,{sx:{mt:2,display:"flex",gap:1},children:[e.jsx(d,{variant:"outlined",onClick:()=>c(0),children:"Mark All as Read"}),e.jsx(d,{variant:"outlined",onClick:()=>c(50),children:"Set to 50"}),e.jsx(d,{variant:"outlined",onClick:()=>c(150),children:"Set to 150"})]}),e.jsx(n,{variant:"caption",sx:{mt:2,display:"block"},children:'Badge: max=99 (shows "99+" when count exceeds 99)'})]}),icon:e.jsx(q,{}),badge:{content:i,color:"info",max:99}},{id:"tasks",label:"Completed Tasks",content:e.jsxs(t,{sx:{p:3},children:[e.jsxs(x,{severity:"success",sx:{mb:2},children:[s," tasks completed today"]}),e.jsx(n,{children:"Track your daily progress"}),e.jsxs(t,{sx:{mt:2,display:"flex",gap:1},children:[e.jsx(d,{variant:"contained",onClick:()=>u(s+1),children:"Add Task"}),e.jsx(d,{variant:"outlined",onClick:()=>u(0),children:"Reset"})]}),e.jsx(n,{variant:"caption",sx:{mt:2,display:"block"},children:"Badge: showZero=true (visible even when count is 0)"})]}),icon:e.jsx(te,{}),badge:{content:s,color:"success",showZero:!0}}];return e.jsx(T,{items:j,defaultActiveTab:1})},parameters:{docs:{description:{story:"TabBar with badges to indicate missing parameters, notifications, or other status information. The badge count updates dynamically. Use this pattern to draw attention to tabs that require user interaction."}}}},S={render:()=>{const[a,r]=h.useState(0),i=[{id:"tab1",label:"First Tab",content:e.jsx(t,{sx:{p:2},children:e.jsx(n,{variant:"body2",color:"text.secondary",children:"Content for first tab"})})},{id:"tab2",label:"Second Tab",content:e.jsx(t,{sx:{p:2},children:e.jsx(n,{variant:"body2",color:"text.secondary",children:"Content for second tab"})})},{id:"tab3",label:"Third Tab",content:e.jsx(t,{sx:{p:2},children:e.jsx(n,{variant:"body2",color:"text.secondary",children:"Content for third tab"})})}];return e.jsxs(t,{children:[e.jsxs(t,{sx:{mb:2,display:"flex",gap:1},children:[e.jsx(d,{variant:a===0?"contained":"outlined",onClick:()=>r(0),size:"small",children:"Go to Tab 1"}),e.jsx(d,{variant:a===1?"contained":"outlined",onClick:()=>r(1),size:"small",children:"Go to Tab 2"}),e.jsx(d,{variant:a===2?"contained":"outlined",onClick:()=>r(2),size:"small",children:"Go to Tab 3"})]}),e.jsx(T,{items:i,activeTab:a,onTabChange:r})]})},parameters:{docs:{description:{story:"Controlled TabBar example. The active tab is controlled externally via the `activeTab` prop. Use the buttons above to programmatically change the active tab, or click on the tabs directly."}}}};var U,W,_;B.parameters={...B.parameters,docs:{...(U=B.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    items: [{
      id: "tab1",
      label: "First Tab",
      content: <Box sx={{
        p: 2
      }}>
            <Typography variant="body2" color="text.secondary">
              Content for first tab
            </Typography>
          </Box>
    }, {
      id: "tab2",
      label: "Second Tab",
      content: <Box sx={{
        p: 2
      }}>
            <Typography variant="body2" color="text.secondary">
              Content for second tab
            </Typography>
          </Box>
    }, {
      id: "tab3",
      label: "Third Tab",
      content: <Box sx={{
        p: 2
      }}>
            <Typography variant="body2" color="text.secondary">
              Content for third tab
            </Typography>
          </Box>
    }],
    defaultActiveTab: 0
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive TabBar component with controls. Adjust the tab items, default active tab, and other properties using the controls panel below."
      }
    }
  }
}`,...(_=(W=B.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var G,N,F;w.parameters={...w.parameters,docs:{...(G=w.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    items: [{
      id: "preview",
      label: "Program Preview",
      content: <ProgramPreviewContent />,
      icon: <PlayArrow />
    }, {
      id: "details",
      label: "Details",
      content: <DetailsContent />,
      icon: <SmartToy />
    }, {
      id: "history",
      label: "Update History",
      content: <UpdateHistoryContent />,
      icon: <History />
    }],
    defaultActiveTab: 0
  },
  parameters: {
    docs: {
      description: {
        story: "TabBar with icons and rich content. Shows how tabs can include icons and more complex content sections."
      }
    }
  }
}`,...(F=(N=w.parameters)==null?void 0:N.docs)==null?void 0:F.source}}};var V,O,$;k.parameters={...k.parameters,docs:{...(V=k.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    items: [{
      id: "overview",
      label: "Overview",
      content: <Box sx={{
        p: 3
      }}>
            <Alert severity="success" sx={{
          mb: 2
        }}>
              System is running normally
            </Alert>
            <Typography>All systems operational</Typography>
          </Box>,
      icon: <CheckCircle />
    }, {
      id: "errors",
      label: "Errors",
      content: <Box sx={{
        p: 3
      }}>
            <Alert severity="error" sx={{
          mb: 2
        }}>
              Critical error detected
            </Alert>
            <Typography color="error">Robot communication timeout</Typography>
          </Box>,
      icon: <ErrorIcon />
    }, {
      id: "settings",
      label: "Settings",
      content: <SettingsContent />,
      icon: <Settings />
    }],
    defaultActiveTab: 1
  },
  parameters: {
    docs: {
      description: {
        story: "Example with error states and different severity levels. The error tab is selected by default."
      }
    }
  }
}`,...($=(O=k.parameters)==null?void 0:O.docs)==null?void 0:$.source}}};var Y,J,K;A.parameters={...A.parameters,docs:{...(Y=A.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => {
    const [missingParams, setMissingParams] = useState(3);
    const [notifications, setNotifications] = useState(150); // High number to test max
    const [completedTasks, setCompletedTasks] = useState(0);
    const items = [{
      id: "overview",
      label: "Overview",
      content: <Box sx={{
        p: 3
      }}>
            <Alert severity="success" sx={{
          mb: 2
        }}>
              Configuration overview
            </Alert>
            <Typography>All configured parameters are shown here</Typography>
            <Typography variant="body2" sx={{
          mt: 2
        }}>
              This tab has no badge configured.
            </Typography>
          </Box>,
      icon: <CheckCircle />
    }, {
      id: "parameters",
      label: "Parameters",
      content: <Box sx={{
        p: 3
      }}>
            <Alert severity={missingParams > 0 ? "error" : "success"} sx={{
          mb: 2
        }}>
              {missingParams > 0 ? \`\${missingParams} parameter(s) missing\` : "All parameters completed!"}
            </Alert>
            <Typography>
              {missingParams > 0 ? "Please fill in all required parameters:" : "Great! All parameters are configured."}
            </Typography>
            {missingParams > 0 && <List>
                <ListItem>
                  <ListItemText primary="Robot IP Address" secondary="Required" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Motion Group ID" secondary="Required" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Safety Configuration" secondary="Required" />
                </ListItem>
              </List>}
            <Box sx={{
          mt: 2,
          display: "flex",
          gap: 1
        }}>
              <Button variant="contained" onClick={() => setMissingParams(0)} disabled={missingParams === 0}>
                Complete Parameters
              </Button>
              <Button variant="outlined" onClick={() => setMissingParams(3)} disabled={missingParams === 3}>
                Reset Parameters
              </Button>
            </Box>
            <Typography variant="caption" sx={{
          mt: 2,
          display: "block"
        }}>
              Badge: showZero=false (hidden when count is 0)
            </Typography>
          </Box>,
      icon: <ErrorIcon />,
      badge: {
        content: missingParams,
        color: "error" as const,
        showZero: false // Badge will hide when count is 0
      }
    }, {
      id: "notifications",
      label: "Notifications",
      content: <Box sx={{
        p: 3
      }}>
            <Alert severity="info" sx={{
          mb: 2
        }}>
              You have {notifications} unread notification(s)
            </Alert>
            <Typography>Check your notifications regularly</Typography>
            <Box sx={{
          mt: 2,
          display: "flex",
          gap: 1
        }}>
              <Button variant="outlined" onClick={() => setNotifications(0)}>
                Mark All as Read
              </Button>
              <Button variant="outlined" onClick={() => setNotifications(50)}>
                Set to 50
              </Button>
              <Button variant="outlined" onClick={() => setNotifications(150)}>
                Set to 150
              </Button>
            </Box>
            <Typography variant="caption" sx={{
          mt: 2,
          display: "block"
        }}>
              Badge: max=99 (shows "99+" when count exceeds 99)
            </Typography>
          </Box>,
      icon: <History />,
      badge: {
        content: notifications,
        color: "info" as const,
        max: 99 // Will show "99+" when count exceeds 99
      }
    }, {
      id: "tasks",
      label: "Completed Tasks",
      content: <Box sx={{
        p: 3
      }}>
            <Alert severity="success" sx={{
          mb: 2
        }}>
              {completedTasks} tasks completed today
            </Alert>
            <Typography>Track your daily progress</Typography>
            <Box sx={{
          mt: 2,
          display: "flex",
          gap: 1
        }}>
              <Button variant="contained" onClick={() => setCompletedTasks(completedTasks + 1)}>
                Add Task
              </Button>
              <Button variant="outlined" onClick={() => setCompletedTasks(0)}>
                Reset
              </Button>
            </Box>
            <Typography variant="caption" sx={{
          mt: 2,
          display: "block"
        }}>
              Badge: showZero=true (visible even when count is 0)
            </Typography>
          </Box>,
      icon: <Settings />,
      badge: {
        content: completedTasks,
        color: "success" as const,
        showZero: true // Badge will show even when count is 0
      }
    }];
    return <TabBar items={items} defaultActiveTab={1} />;
  },
  parameters: {
    docs: {
      description: {
        story: "TabBar with badges to indicate missing parameters, notifications, or other status information. The badge count updates dynamically. Use this pattern to draw attention to tabs that require user interaction."
      }
    }
  }
}`,...(K=(J=A.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,ee;S.parameters={...S.parameters,docs:{...(Q=S.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => {
    const [activeTab, setActiveTab] = useState(0);
    const items = [{
      id: "tab1",
      label: "First Tab",
      content: <Box sx={{
        p: 2
      }}>
            <Typography variant="body2" color="text.secondary">
              Content for first tab
            </Typography>
          </Box>
    }, {
      id: "tab2",
      label: "Second Tab",
      content: <Box sx={{
        p: 2
      }}>
            <Typography variant="body2" color="text.secondary">
              Content for second tab
            </Typography>
          </Box>
    }, {
      id: "tab3",
      label: "Third Tab",
      content: <Box sx={{
        p: 2
      }}>
            <Typography variant="body2" color="text.secondary">
              Content for third tab
            </Typography>
          </Box>
    }];
    return <Box>
        <Box sx={{
        mb: 2,
        display: "flex",
        gap: 1
      }}>
          <Button variant={activeTab === 0 ? "contained" : "outlined"} onClick={() => setActiveTab(0)} size="small">
            Go to Tab 1
          </Button>
          <Button variant={activeTab === 1 ? "contained" : "outlined"} onClick={() => setActiveTab(1)} size="small">
            Go to Tab 2
          </Button>
          <Button variant={activeTab === 2 ? "contained" : "outlined"} onClick={() => setActiveTab(2)} size="small">
            Go to Tab 3
          </Button>
        </Box>
        <TabBar items={items} activeTab={activeTab} onTabChange={setActiveTab} />
      </Box>;
  },
  parameters: {
    docs: {
      description: {
        story: "Controlled TabBar example. The active tab is controlled externally via the \`activeTab\` prop. Use the buttons above to programmatically change the active tab, or click on the tabs directly."
      }
    }
  }
}`,...(ee=(X=S.parameters)==null?void 0:X.docs)==null?void 0:ee.source}}};const on=["Interactive","WithIcons","WithErrorStates","WithBadges","Controlled"];export{S as Controlled,B as Interactive,A as WithBadges,k as WithErrorStates,w as WithIcons,on as __namedExportsOrder,tn as default};
