import{n as e}from"./chunk-DnJy8xQt.js";import{Di as t,Hr as n,Ma as r,Mn as i,Nn as a,Oi as o,Rr as s,Tr as c,Vr as l,yi as u,zr as d}from"./iframe-BYoHjiUl.js";import{i as f,n as p,r as m,t as h}from"./Grid-a27LRm5Z.js";import{n as g,t as _}from"./Settings-CvoG9XIj.js";import{n as v,t as y}from"./CardContent-DeOVXHfL.js";var b,x,S=e((()=>{c(),b=r(),x=u((0,b.jsx)(`path`,{d:`M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z`}),`Home`)})),C,w,T=e((()=>{c(),C=r(),w=u((0,C.jsx)(`path`,{d:`M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m-6 0h-4V4h4z`}),`Work`)})),E,D,O,k,A,j,M,N;e((()=>{S(),f(),g(),T(),t(),l(),y(),h(),s(),a(),E=r(),D={title:`Navigation/AppHeader`,component:i,tags:[`!dev`],parameters:{layout:`fullscreen`,docs:{description:{component:`A top navigation header component that displays the current app and provides a dropdown menu to navigate to other apps. Features a blur backdrop when the dropdown is open.`}}},argTypes:{appIcon:{description:`Icon component for the current app`,control:!1},appName:{description:`Display name of the current app`,control:`text`},apps:{description:`Array of available apps to navigate to`,control:!1},disabled:{description:`Disable the menu button`,control:`boolean`},onAppSelect:{description:`Callback when an app is selected from the dropdown`,action:`app selected`},sx:{description:`Additional MUI styling`,control:!1}}},O=[{id:`home`,name:`Dashboard`,icon:(0,E.jsx)(x,{}),href:`/dashboard`},{id:`settings`,name:`Settings`,icon:(0,E.jsx)(_,{}),href:`/settings`},{id:`profile`,name:`Profile`,icon:(0,E.jsx)(m,{}),onClick:()=>console.log(`Navigate to profile`)},{id:`workspace`,name:`Workspace`,icon:(0,E.jsx)(w,{}),href:`/workspace`}],k={args:{appIcon:(0,E.jsx)(x,{}),appName:`Robot Control Studio`,apps:O,disabled:!1},parameters:{docs:{description:{story:`Interactive example showing the app header with a dropdown menu. Click the dropdown arrow to see the available apps. The background will blur when the menu is open. Toggle the 'disabled' control to disable the menu button.`}}}},A={args:{appIcon:(0,E.jsx)(w,{}),appName:`Single App Mode`,apps:[]},parameters:{docs:{description:{story:`App header without dropdown menu when no other apps are available.`}}}},j={args:{appIcon:(0,E.jsx)(_,{}),appName:`Very Long Application Name That Might Overflow`,apps:O},parameters:{docs:{description:{story:`Example with a longer app name to test text handling.`}}}},M={args:{appIcon:(0,E.jsx)(w,{}),appName:`Robot Control Studio`,apps:O},render:e=>(0,E.jsxs)(o,{sx:{minHeight:`100vh`,backgroundColor:`#1F2233`},children:[(0,E.jsx)(i,{...e}),(0,E.jsxs)(o,{sx:{p:3},children:[(0,E.jsx)(d,{variant:`h4`,gutterBottom:!0,sx:{color:`white`},children:`Welcome to Robot Control Studio`}),(0,E.jsx)(d,{variant:`body1`,sx:{mb:3,color:`rgba(255, 255, 255, 0.7)`},children:`This is a full page example showing how the AppHeader looks in a real application context. Click the dropdown arrow to see the blur backdrop effect over the page content.`}),(0,E.jsxs)(p,{container:!0,spacing:3,children:[(0,E.jsx)(p,{size:{xs:12,md:6},children:(0,E.jsx)(n,{sx:{backgroundColor:`rgba(255, 255, 255, 0.1)`},children:(0,E.jsxs)(v,{children:[(0,E.jsx)(d,{variant:`h6`,gutterBottom:!0,sx:{color:`white`},children:`Robot Status`}),(0,E.jsx)(d,{variant:`body2`,sx:{color:`rgba(255, 255, 255, 0.7)`},children:`Current robot is online and ready for operations. All systems are functioning normally.`})]})})}),(0,E.jsx)(p,{size:{xs:12,md:6},children:(0,E.jsx)(n,{sx:{backgroundColor:`rgba(255, 255, 255, 0.1)`},children:(0,E.jsxs)(v,{children:[(0,E.jsx)(d,{variant:`h6`,gutterBottom:!0,sx:{color:`white`},children:`Recent Activities`}),(0,E.jsxs)(d,{variant:`body2`,sx:{color:`rgba(255, 255, 255, 0.7)`},children:[`• Program execution completed successfully`,(0,E.jsx)(`br`,{}),`• Safety zones updated`,(0,E.jsx)(`br`,{}),`• Motion group calibrated`]})]})})}),(0,E.jsx)(p,{size:12,children:(0,E.jsx)(n,{sx:{backgroundColor:`rgba(255, 255, 255, 0.1)`},children:(0,E.jsxs)(v,{children:[(0,E.jsx)(d,{variant:`h6`,gutterBottom:!0,sx:{color:`white`},children:`System Overview`}),(0,E.jsx)(d,{variant:`body2`,sx:{color:`rgba(255, 255, 255, 0.7)`},children:`This dummy content demonstrates how the AppHeader integrates with a full application layout. The blur backdrop effect becomes visible when you open the app selection dropdown menu, providing focus on the navigation options while keeping the page content subtly visible in the background.`})]})})})]})]})]}),parameters:{docs:{description:{story:`Full page example showing the AppHeader in a realistic application context with dummy content. This demonstrates the blur backdrop effect when the dropdown menu is opened.`}}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}},N=[`Interactive`,`WithoutDropdown`,`LongAppName`,`WithFullPageContext`]}))();export{k as Interactive,j as LongAppName,M as WithFullPageContext,A as WithoutDropdown,N as __namedExportsOrder,D as default};