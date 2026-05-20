import{j as e,r as P,W as C}from"./iframe-CdHz7w5e.js";import{c as L}from"./createSvgIcon-Ds3ol630.js";import{A as q,P as U,G as a}from"./Grid-Ve2CfO5m.js";import{S as R}from"./Settings-B2FHI9Ox.js";import{o as Z}from"./index-y9YD2Xww.js";import{e as J}from"./externalizeComponent-hxlgDZiE.js";import{S as K}from"./SvgIcon-B6gk0W3H.js";import{T as Q}from"./Toolbar-BNuKgJlZ.js";import{B as t}from"./Box-CE_763cl.js";import{T as n}from"./Typography-Ca7p4FzY.js";import{I as X}from"./IconButton-DIGZqcJH.js";import{B as Y}from"./Popover-COo_Sg5X.js";import{M as $,a as ee}from"./MenuItem-DxyEOFxC.js";import{C as h}from"./Card-CcHJocI2.js";import{C as u}from"./CardContent-CQ0Oj4US.js";import"./preload-helper-Dp1pzeXC.js";import"./Paper-CbAXsvFZ.js";import"./useTheme-BaH26PvS.js";import"./styled-sd3eOX1V.js";import"./listItemTextClasses-Bd4CRAv6.js";import"./useThemeProps-ZIiox3IC.js";import"./getThemeProps-CLvbHdkH.js";import"./mobx.esm-DvxsEwe8.js";import"./context-DS34pASV.js";import"./ButtonBase-D6-zmjRJ.js";import"./useTimeout-ChaJoZfL.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-9kq8-4kc.js";import"./useSlot-BrNGdnED.js";import"./mergeSlotProps-DyYx1Khf.js";import"./ownerDocument-DW-IO8s5.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-x1ZQknCn.js";import"./utils-D3bkdeHa.js";import"./Fade-DTmTm7rz.js";import"./useSlotProps-C0GKuS3Y.js";import"./dividerClasses-C1aaSyut.js";const g=r=>e.jsx(K,{...r,viewBox:"0 0 10 8",children:e.jsx("path",{d:"M8.825 0.9125L5 4.72917L1.175 0.9125L0 2.0875L5 7.0875L10 2.0875L8.825 0.9125Z",fill:"currentColor",fillOpacity:"0.56"})});try{g.displayName="DropdownArrowIcon",g.__docgenInfo={description:"",displayName:"DropdownArrowIcon",props:{component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}}}}}catch{}const d=J(Z(r=>{const{appIcon:V,appName:G,apps:y=[],onAppSelect:c,disabled:O=!1,sx:D}=r,[f,w]=P.useState(null),v=!!f,E=o=>{w(o.currentTarget)},m=()=>{w(null)},F=o=>{m(),o.onClick?o.onClick():o.href&&(window.location.href=o.href),c==null||c(o)};return e.jsxs(e.Fragment,{children:[e.jsx(q,{position:"static",sx:{boxShadow:"none",backgroundImage:"none","& .MuiAppBar-root":{backgroundImage:"none",backgroundColor:"transparent"},...D},children:e.jsxs(Q,{sx:{minHeight:"62px !important"},children:[e.jsx(t,{sx:{mr:1,display:"flex",alignItems:"center"},children:V}),e.jsxs(t,{sx:{display:"flex",alignItems:"center",flexGrow:1},children:[e.jsx(n,{component:"h1",sx:{fontWeight:"bold",fontSize:"1rem"},children:G}),y.length>0&&e.jsx(X,{color:"inherit","aria-label":"switch app","aria-controls":"app-menu","aria-haspopup":"true",onClick:E,disabled:O,sx:{ml:1,width:28,height:28,borderRadius:"6px",padding:0,backgroundColor:o=>C(o.palette.common.white,.1),opacity:1,"&:hover":{backgroundColor:o=>C(o.palette.common.white,.16)},"& .MuiSvgIcon-root":{fontSize:"8px",width:"8px",height:"6px"}},children:e.jsx(g,{})})]})]})}),e.jsx(Y,{open:v,onClick:m,sx:{backdropFilter:"blur(4px)",backgroundColor:"rgba(0, 0, 0, 0.3)",zIndex:o=>o.zIndex.modal-1}}),e.jsx($,{id:"app-menu",anchorEl:f,open:v,onClose:m,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},sx:{zIndex:o=>o.zIndex.modal,"& .MuiPaper-root":{minWidth:200,mt:1}},children:y.map(o=>e.jsxs(ee,{onClick:()=>F(o),children:[e.jsx(t,{sx:{display:"flex",alignItems:"center"},children:o.icon}),e.jsx(n,{variant:"body1",sx:{ml:2},children:o.name})]},o.id))})]})}));try{d.displayName="AppHeader",d.__docgenInfo={description:`A top navigation header component that displays the current app and provides
a dropdown menu to navigate to other apps.`,displayName:"AppHeader",props:{appIcon:{defaultValue:null,description:"Current app icon",name:"appIcon",required:!0,type:{name:"ReactNode"}},appName:{defaultValue:null,description:"Current app name",name:"appName",required:!0,type:{name:"string"}},apps:{defaultValue:null,description:"List of other available apps",name:"apps",required:!1,type:{name:"AppItem[]"}},onAppSelect:{defaultValue:null,description:"Callback when an app is selected",name:"onAppSelect",required:!1,type:{name:"(app: AppItem) => void"}},disabled:{defaultValue:null,description:"Disable the menu button",name:"disabled",required:!1,type:{name:"boolean"}},sx:{defaultValue:null,description:"Additional styling",name:"sx",required:!1,type:{name:"SxProps"}}}}}catch{}const W=L(e.jsx("path",{d:"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"})),x=L(e.jsx("path",{d:"M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m-6 0h-4V4h4z"})),Ge={title:"Navigation/AppHeader",component:d,tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"A top navigation header component that displays the current app and provides a dropdown menu to navigate to other apps. Features a blur backdrop when the dropdown is open."}}},argTypes:{appIcon:{description:"Icon component for the current app",control:!1},appName:{description:"Display name of the current app",control:"text"},apps:{description:"Array of available apps to navigate to",control:!1},disabled:{description:"Disable the menu button",control:"boolean"},onAppSelect:{description:"Callback when an app is selected from the dropdown",action:"app selected"},sx:{description:"Additional MUI styling",control:!1}}},b=[{id:"home",name:"Dashboard",icon:e.jsx(W,{}),href:"/dashboard"},{id:"settings",name:"Settings",icon:e.jsx(R,{}),href:"/settings"},{id:"profile",name:"Profile",icon:e.jsx(U,{}),onClick:()=>console.log("Navigate to profile")},{id:"workspace",name:"Workspace",icon:e.jsx(x,{}),href:"/workspace"}],p={args:{appIcon:e.jsx(W,{}),appName:"Robot Control Studio",apps:b,disabled:!1},parameters:{docs:{description:{story:"Interactive example showing the app header with a dropdown menu. Click the dropdown arrow to see the available apps. The background will blur when the menu is open. Toggle the 'disabled' control to disable the menu button."}}}},i={args:{appIcon:e.jsx(x,{}),appName:"Single App Mode",apps:[]},parameters:{docs:{description:{story:"App header without dropdown menu when no other apps are available."}}}},s={args:{appIcon:e.jsx(R,{}),appName:"Very Long Application Name That Might Overflow",apps:b},parameters:{docs:{description:{story:"Example with a longer app name to test text handling."}}}},l={args:{appIcon:e.jsx(x,{}),appName:"Robot Control Studio",apps:b},render:r=>e.jsxs(t,{sx:{minHeight:"100vh",backgroundColor:"#1F2233"},children:[e.jsx(d,{...r}),e.jsxs(t,{sx:{p:3},children:[e.jsx(n,{variant:"h4",gutterBottom:!0,sx:{color:"white"},children:"Welcome to Robot Control Studio"}),e.jsx(n,{variant:"body1",sx:{mb:3,color:"rgba(255, 255, 255, 0.7)"},children:"This is a full page example showing how the AppHeader looks in a real application context. Click the dropdown arrow to see the blur backdrop effect over the page content."}),e.jsxs(a,{container:!0,spacing:3,children:[e.jsx(a,{size:{xs:12,md:6},children:e.jsx(h,{sx:{backgroundColor:"rgba(255, 255, 255, 0.1)"},children:e.jsxs(u,{children:[e.jsx(n,{variant:"h6",gutterBottom:!0,sx:{color:"white"},children:"Robot Status"}),e.jsx(n,{variant:"body2",sx:{color:"rgba(255, 255, 255, 0.7)"},children:"Current robot is online and ready for operations. All systems are functioning normally."})]})})}),e.jsx(a,{size:{xs:12,md:6},children:e.jsx(h,{sx:{backgroundColor:"rgba(255, 255, 255, 0.1)"},children:e.jsxs(u,{children:[e.jsx(n,{variant:"h6",gutterBottom:!0,sx:{color:"white"},children:"Recent Activities"}),e.jsxs(n,{variant:"body2",sx:{color:"rgba(255, 255, 255, 0.7)"},children:["• Program execution completed successfully",e.jsx("br",{}),"• Safety zones updated",e.jsx("br",{}),"• Motion group calibrated"]})]})})}),e.jsx(a,{size:12,children:e.jsx(h,{sx:{backgroundColor:"rgba(255, 255, 255, 0.1)"},children:e.jsxs(u,{children:[e.jsx(n,{variant:"h6",gutterBottom:!0,sx:{color:"white"},children:"System Overview"}),e.jsx(n,{variant:"body2",sx:{color:"rgba(255, 255, 255, 0.7)"},children:"This dummy content demonstrates how the AppHeader integrates with a full application layout. The blur backdrop effect becomes visible when you open the app selection dropdown menu, providing focus on the navigation options while keeping the page content subtly visible in the background."})]})})})]})]})]}),parameters:{docs:{description:{story:"Full page example showing the AppHeader in a realistic application context with dummy content. This demonstrates the blur backdrop effect when the dropdown menu is opened."}}}};var j,k,A;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    appIcon: <Home />,
    appName: "Robot Control Studio",
    apps: sampleApps,
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive example showing the app header with a dropdown menu. Click the dropdown arrow to see the available apps. The background will blur when the menu is open. Toggle the 'disabled' control to disable the menu button."
      }
    }
  }
}`,...(A=(k=p.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var I,T,S;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    appIcon: <Work />,
    appName: "Single App Mode",
    apps: []
  },
  parameters: {
    docs: {
      description: {
        story: "App header without dropdown menu when no other apps are available."
      }
    }
  }
}`,...(S=(T=i.parameters)==null?void 0:T.docs)==null?void 0:S.source}}};var N,B,z;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    appIcon: <Settings />,
    appName: "Very Long Application Name That Might Overflow",
    apps: sampleApps
  },
  parameters: {
    docs: {
      description: {
        story: "Example with a longer app name to test text handling."
      }
    }
  }
}`,...(z=(B=s.parameters)==null?void 0:B.docs)==null?void 0:z.source}}};var M,_,H;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    appIcon: <Work />,
    appName: "Robot Control Studio",
    apps: sampleApps
  },
  render: args => <Box sx={{
    minHeight: "100vh",
    backgroundColor: "#1F2233"
  }}>
      <AppHeader {...args} />
      <Box sx={{
      p: 3
    }}>
        <Typography variant="h4" gutterBottom sx={{
        color: "white"
      }}>
          Welcome to Robot Control Studio
        </Typography>
        <Typography variant="body1" sx={{
        mb: 3,
        color: "rgba(255, 255, 255, 0.7)"
      }}>
          This is a full page example showing how the AppHeader looks in a real
          application context. Click the dropdown arrow to see the blur backdrop
          effect over the page content.
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{
          xs: 12,
          md: 6
        }}>
            <Card sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)"
          }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{
                color: "white"
              }}>
                  Robot Status
                </Typography>
                <Typography variant="body2" sx={{
                color: "rgba(255, 255, 255, 0.7)"
              }}>
                  Current robot is online and ready for operations. All systems
                  are functioning normally.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{
          xs: 12,
          md: 6
        }}>
            <Card sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)"
          }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{
                color: "white"
              }}>
                  Recent Activities
                </Typography>
                <Typography variant="body2" sx={{
                color: "rgba(255, 255, 255, 0.7)"
              }}>
                  • Program execution completed successfully
                  <br />• Safety zones updated
                  <br />• Motion group calibrated
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={12}>
            <Card sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)"
          }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{
                color: "white"
              }}>
                  System Overview
                </Typography>
                <Typography variant="body2" sx={{
                color: "rgba(255, 255, 255, 0.7)"
              }}>
                  This dummy content demonstrates how the AppHeader integrates
                  with a full application layout. The blur backdrop effect
                  becomes visible when you open the app selection dropdown menu,
                  providing focus on the navigation options while keeping the
                  page content subtly visible in the background.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>,
  parameters: {
    docs: {
      description: {
        story: "Full page example showing the AppHeader in a realistic application context with dummy content. " + "This demonstrates the blur backdrop effect when the dropdown menu is opened."
      }
    }
  }
}`,...(H=(_=l.parameters)==null?void 0:_.docs)==null?void 0:H.source}}};const Oe=["Interactive","WithoutDropdown","LongAppName","WithFullPageContext"];export{p as Interactive,s as LongAppName,l as WithFullPageContext,i as WithoutDropdown,Oe as __namedExportsOrder,Ge as default};
