import{i as e}from"./preload-helper-Cs4UwXAW.js";import{Ga as t,c as n,d as r,l as i,o as a}from"./iframe-BvHxi_cZ.js";import{t as o}from"./mdx-react-shim-X3p0ODal.js";import{TrajectoryRendererSt as s,n as c,t as l}from"./TrajectoryRenderer.stories-CNiGDLaw.js";function u(e){let t={code:`code`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,...r(),...e.components};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(a,{of:l}),`
`,(0,f.jsx)(t.h1,{id:`trajectory-renderer`,children:`Trajectory Renderer`}),`
`,(0,f.jsxs)(t.p,{children:[`The `,(0,f.jsx)(t.code,{children:`TrajectoryRenderer`}),` component visualizes the planned trajectory of the robot.`]}),`
`,(0,f.jsxs)(t.p,{children:[`This component requires a `,(0,f.jsx)(t.code,{children:`Pose[]`}),` array representing TCP positions along a trajectory.`]}),`
`,(0,f.jsx)(t.h2,{id:`how-to-obtain-the-pose-array`,children:`How to obtain the Pose array`}),`
`,(0,f.jsxs)(t.ol,{children:[`
`,(0,f.jsxs)(t.li,{children:[`First, fetch the trajectory using `,(0,f.jsx)(t.code,{children:`getTrajectory`}),` request - this returns a response containing a position array of joints.`]}),`
`,(0,f.jsxs)(t.li,{children:[`Pass the joint positions to the `,(0,f.jsx)(t.code,{children:`forwardKinematics`}),` request.`]}),`
`,(0,f.jsxs)(t.li,{children:[`The `,(0,f.jsx)(t.code,{children:`forwardKinematics`}),` response contains `,(0,f.jsx)(t.code,{children:`tcp_poses`}),` - an array of `,(0,f.jsx)(t.code,{children:`Pose`}),` objects.`]}),`
`,(0,f.jsxs)(t.li,{children:[`Pass this `,(0,f.jsx)(t.code,{children:`tcp_poses`}),` array to the `,(0,f.jsx)(t.code,{children:`TrajectoryRenderer`}),` component.`]}),`
`]}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-tsx`,children:`// 1. Get trajectory (returns joint positions)
const trajectoryResponse = await apiClient.motion.getTrajectory(cell, controller, trajectory)

// 2. Convert joint positions to TCP poses via forward kinematics
const kinematicsResponse = await apiClient.kinematics.forwardKinematics(cell, {
  motion_group_model: motionGroup,
  joint_positions: trajectoryResponse.trajectory.joint_positions,
})

// 3. Render the trajectory using tcp_poses
<TrajectoryRenderer trajectory={kinematicsResponse.tcp_poses} />
`})}),`
`,(0,f.jsx)(n,{of:s})]})}function d(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(u,{...e})}):u(e)}var f;e((()=>{f=t(),o(),i(),c()}))();export{d as default};