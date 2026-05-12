import{j as e,M as s,S as i}from"./iframe-CFL8p0Ds.js";import{useMDXComponents as n}from"./index-CUY-zwZ8.js";import{T as c,a}from"./TrajectoryRenderer.stories-tarHqizj.js";import"./preload-helper-Dp1pzeXC.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./Line-BJabC9go.js";import"./PresetEnvironment-CYj5Ppm_.js";import"./with-selector-D7bcTZS2.js";import"./index-Bb8JjhAW.js";import"./Setup-HCTD0HaU.js";function t(r){const o={code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...n(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
`,e.jsx(o.h1,{id:"trajectory-renderer",children:"Trajectory Renderer"}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"TrajectoryRenderer"})," component visualizes the planned trajectory of the robot."]}),`
`,e.jsxs(o.p,{children:["This component requires a ",e.jsx(o.code,{children:"Pose[]"})," array representing TCP positions along a trajectory."]}),`
`,e.jsx(o.h2,{id:"how-to-obtain-the-pose-array",children:"How to obtain the Pose array"}),`
`,e.jsxs(o.ol,{children:[`
`,e.jsxs(o.li,{children:["First, fetch the trajectory using ",e.jsx(o.code,{children:"getTrajectory"})," request - this returns a response containing a position array of joints."]}),`
`,e.jsxs(o.li,{children:["Pass the joint positions to the ",e.jsx(o.code,{children:"forwardKinematics"})," request."]}),`
`,e.jsxs(o.li,{children:["The ",e.jsx(o.code,{children:"forwardKinematics"})," response contains ",e.jsx(o.code,{children:"tcp_poses"})," - an array of ",e.jsx(o.code,{children:"Pose"})," objects."]}),`
`,e.jsxs(o.li,{children:["Pass this ",e.jsx(o.code,{children:"tcp_poses"})," array to the ",e.jsx(o.code,{children:"TrajectoryRenderer"})," component."]}),`
`]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-tsx",children:`// 1. Get trajectory (returns joint positions)
const trajectoryResponse = await apiClient.motion.getTrajectory(cell, controller, trajectory)

// 2. Convert joint positions to TCP poses via forward kinematics
const kinematicsResponse = await apiClient.kinematics.forwardKinematics(cell, {
  motion_group_model: motionGroup,
  joint_positions: trajectoryResponse.trajectory.joint_positions,
})

// 3. Render the trajectory using tcp_poses
<TrajectoryRenderer trajectory={kinematicsResponse.tcp_poses} />
`})}),`
`,e.jsx(i,{of:a})]})}function R(r={}){const{wrapper:o}={...n(),...r.components};return o?e.jsx(o,{...r,children:e.jsx(t,{...r})}):t(r)}export{R as default};
