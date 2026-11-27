# Public names

Every name that the library exports, the entry points that export it, and why it is public. Generated from `etc/api-extractor/*.api.md` by `pnpm run api:names`; reasons that the script cannot find itself are in `scripts/publicNames.ts`.

| Name | Entry points | Why it is public |
| --- | --- | --- |
| `AppHeader` | `.`, `/core` | A part |
| `AppHeaderProps` | `.`, `/core` | The props of a part |
| `AppItem` | `.`, `/core` | A type that a public member needs |
| `AxisControlComponentColors` | `.`, `/core` | Deprecated: kept for apps that use it, removed in the next major version |
| `CollisionSceneRenderer` | `.`, `/3d` | A part |
| `ConnectedMotionGroup` | `.`, `/core` | A type that a public member needs |
| `ConnectedMotionGroupOptions` | `.`, `/core` | A type that a public member needs |
| `ConnectionLogger` | `.`, `/core`, `/session`, `/nats` | A type that a public member needs |
| `ControllerStateSource` | `.`, `/core`, `/session`, `/nats` | A type that a public member needs |
| `ControllerStateStream` | `.`, `/core`, `/session` | A type that a public member needs |
| `CurrentPoseBar` | `.`, `/core`, `/CurrentPoseBar` | A part |
| `CurrentPoseBarProps` | `.`, `/core`, `/CurrentPoseBar` | The props of a part |
| `CurrentPoseBarState` | `.`, `/core`, `/CurrentPoseBar` | A type that a public member needs |
| `defaultGetModel` | `.`, `/3d` | The model download that `Robot` uses by default, for an app that wraps it |
| `deriveSelectedTcpPose` | `.`, `/core`, `/session` | The pose of the selected TCP in a coordinate system, as the pose bar shows it |
| `DHLinearAxisProps` | `.`, `/3d` | The props of a part |
| `DHRobotProps` | `.`, `/3d` | The props of a part |
| `EulerConvention` | `.`, `/core`, `/CurrentPoseBar` | A type that a public member needs |
| `GizmoChainOffset` | `.`, `/3d` | A type that a public member needs |
| `GizmoDhParameter` | `.`, `/3d` | A type that a public member needs |
| `GizmoJointLimit` | `.`, `/3d` | A type that a public member needs |
| `i18n` | `.`, `/core` | The library's translations: an app sets their language with it |
| `IncrementalCartesianMotionRequest` | `.`, `/core`, `/session` | A type that a public member needs |
| `IncrementalMotion` | `.`, `/core`, `/session` | A type that a public member needs |
| `InterpolationOptions` | `.`, `/core`, `/3d` | A type that a public member needs |
| `isRobotLoadStepError` | `.`, `/core`, `/session` | Tells a failed step of a robot load from other errors, e.g. to offer `load.retry()` |
| `JogAxis` | `.`, `/core`, `/3d`, `/JoggingButtons`, `/JoggingGizmo` | A type that a public member needs |
| `JogControlsProps` | `.`, `/core`, `/3d`, `/JoggingButtons`, `/JoggingGizmo` | The props of a part |
| `JogDirection` | `.`, `/core`, `/3d`, `/JoggingButtons`, `/JoggingGizmo`, `/JoggingJointSlider` | A type that a public member needs |
| `JoggerConnection` | `.`, `/core`, `/session` | A type that a public member needs |
| `JoggerConnectionOptions` | `.`, `/core`, `/session` | A type that a public member needs |
| `JoggerMode` | `.`, `/core`, `/session` | A type that a public member needs |
| `JoggerOrientation` | `.`, `/core`, `/session` | A type that a public member needs |
| `JoggingButtons` | `.`, `/core`, `/JoggingButtons` | A part |
| `JoggingButtonsProps` | `.`, `/core`, `/JoggingButtons` | The props of a part |
| `JoggingCartesianAxisControl` | `.`, `/core` | Deprecated: kept for apps that use it, removed in the next major version |
| `JoggingGizmo` | `.`, `/3d`, `/JoggingGizmo` | A part |
| `JoggingGizmoOrientation` | `.`, `/3d`, `/JoggingGizmo` | A part |
| `JoggingGizmoOrientationProps` | `.`, `/3d`, `/JoggingGizmo` | The props of a part |
| `JoggingGizmoProps` | `.`, `/3d`, `/JoggingGizmo` | The props of a part |
| `JoggingJointSlider` | `.`, `/core`, `/JoggingJointSlider` | A part |
| `JoggingJointSliderProps` | `.`, `/core`, `/JoggingJointSlider` | The props of a part |
| `JoggingJointValueControl` | `.`, `/core` | Deprecated: kept for apps that use it, removed in the next major version |
| `JoggingPanel` | `.`, `/core` | A part |
| `JoggingPanelProps` | `.`, `/core` | The props of a part |
| `JoggingPanelTabId` | `.`, `/core` | The tabs of `JoggingPanel` |
| `JoggingRefusedError` | `.`, `/core`, `/session` | An error that a public member throws or rejects with |
| `JoggingRefusedReason` | `.`, `/core`, `/session` | A type that a public member needs |
| `JoggingStore` | `.`, `/core`, `/session` | A type that a public member needs |
| `JoggingStoreOptions` | `.`, `/core`, `/session` | A type that a public member needs |
| `JoggingStoreStorage` | `.`, `/core`, `/session` | A type that a public member needs |
| `JogHandle` | `.`, `/core`, `/3d`, `/JoggingButtons`, `/JoggingGizmo` | A type that a public member needs |
| `JointLimitGizmo` | `.`, `/3d` | A part |
| `JointLimitGizmoProps` | `.`, `/3d` | The props of a part |
| `jointsToText` | `.`, `/core`, `/session` | Joints as the text that Move to reads |
| `jointValuesEqual` | `.`, `/core`, `/session` | Deprecated: kept for apps that use it, removed in the next major version |
| `LinearAxis` | `.`, `/3d` | A part |
| `LinearAxisProps` | `.`, `/3d` | The props of a part |
| `LoadingCover` | `.`, `/core` | A part |
| `LoadingErrorMessage` | `.`, `/core` | A part |
| `loadRobotSession` | `.`, `/core`, `/session` | Loads a robot session: the way into `/session` |
| `LoadRobotSessionOptions` | `.`, `/core`, `/session` | A type that a public member needs |
| `MotionGroupOption` | `.`, `/core` | Deprecated: kept for apps that use it, removed in the next major version |
| `MotionGroupVisualizer` | `.`, `/3d` | A part |
| `MotionGroupVisualizerExact` | `.`, `/3d` | A part |
| `MotionGroupVisualizerProps` | `.`, `/3d` | The props of a part |
| `MotionStateReadout` | `.`, `/core`, `/session` | A type that a public member needs |
| `MotionStreamConnection` | `.`, `/core`, `/session` | A type that a public member needs |
| `MotionStreamConnectionOptions` | `.`, `/core`, `/session` | A type that a public member needs |
| `natsControllerStateSource` | `/nats` | The live controller state over NATS, as the `stateSource` of `loadRobotSession` |
| `NatsControllerStateSourceOptions` | `/nats` | A type that a public member needs |
| `natsUrlOf` | `/nats` | The NATS address of an instance, for `natsControllerStateSource` |
| `NoMotionGroupModal` | `.`, `/core` | A part |
| `NoMotionGroupModalProps` | `.`, `/core` | The props of a part |
| `NovaConnection` | `.`, `/core`, `/session`, `/nats` | A type that a public member needs |
| `OrientationFormat` | `.`, `/core`, `/CurrentPoseBar` | A type that a public member needs |
| `parseRotationToQuaternion` | `.`, `/3d` | Turns a NOVA rotation into a three.js quaternion, for an app with a 3D view |
| `planErrorTranslationKey` | `.`, `/core`, `/session` | The translation key of a planning error, for an app that shows it |
| `PlannedTrajectory` | `.`, `/core`, `/session` | A type that a public member needs |
| `PlanTrajectoryResult` | `.`, `/core`, `/session` | A type that a public member needs |
| `Pose3` | `.`, `/3d` | Pose math on three.js objects, for an app with a 3D view |
| `poseEqual` | `.`, `/core`, `/session` | Deprecated: kept for apps that use it, removed in the next major version |
| `poseToText` | `.`, `/core`, `/session` | A pose as the text that Move to reads and the pose bar copies |
| `PresetEnvironment` | `.`, `/3d` | A part |
| `ReferencedPose` | `.`, `/core`, `/session` | A type that a public member needs |
| `resolveCoordinateSystemInWorld` | `.`, `/core`, `/session` | A coordinate system in world, through the systems it is defined in |
| `Robot` | `.`, `/3d` | A part |
| `ROBOT_LOAD_STEP_IDS` | `.`, `/core`, `/session` | The steps of a robot load, for an app that shows the progress its own way |
| `RobotActivation` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotActivationState` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotControlOption` | `.`, `/core`, `/CurrentPoseBar` | A type that a public member needs |
| `RobotControlPose` | `.`, `/core`, `/CurrentPoseBar` | A type that a public member needs |
| `RobotControlSelect` | `.`, `/core`, `/CurrentPoseBar` | A type that a public member needs |
| `RobotDescription` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotLiveState` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotLoadProgress` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotLoadStep` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotLoadStepError` | `.`, `/core`, `/session` | An error that a public member throws or rejects with |
| `RobotLoadStepId` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotLoadStepStatus` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotModeChangeError` | `.`, `/core`, `/session` | An error that a public member throws or rejects with |
| `RobotNotMoveableReason` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotPose` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotProps` | `.`, `/3d` | The props of a part |
| `RobotSafety` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotSession` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotSessionError` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotSessionEvent` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotSessionLoad` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotSessionLoadState` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotSessionOptions` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotTargetPose` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotTcpLike` | `.`, `/core` | A type that a public member needs |
| `SafetyBar` | `.`, `/core`, `/SafetyBar` | A part |
| `SafetyBarProps` | `.`, `/core`, `/SafetyBar` | The props of a part |
| `SafetyZonesRenderer` | `.`, `/3d` | A part |
| `SafetyZonesRendererProps` | `.`, `/3d` | The props of a part |
| `StagedTargetPose` | `.`, `/core`, `/session` | A type that a public member needs |
| `SupportedLinearAxis` | `.`, `/3d` | A part |
| `SupportedLinearAxisExact` | `.`, `/3d` | A part |
| `SupportedLinearAxisProps` | `.`, `/3d` | The props of a part |
| `SupportedRobot` | `.`, `/3d` | A part |
| `SupportedRobotExact` | `.`, `/3d` | A part |
| `SupportedRobotProps` | `.`, `/3d` | The props of a part |
| `tcpMotionEqual` | `.`, `/core`, `/session` | Deprecated: kept for apps that use it, removed in the next major version |
| `TcpReferencedPose` | `.`, `/core`, `/session` | A type that a public member needs |
| `TrajectoryExecutionStore` | `.`, `/core`, `/session` | A type that a public member needs |
| `TrajectoryRenderer` | `.`, `/3d` | A part |
| `TrajectoryRendererProps` | `.`, `/3d` | The props of a part |
| `TrajectoryState` | `.`, `/core`, `/session` | A type that a public member needs |
| `TrajectoryTarget` | `.`, `/core`, `/session` | A type that a public member needs |
| `transformPoseToCoordinateSystem` | `.`, `/core`, `/session` | A pose in another coordinate system, on plain numbers |
| `unwrapRotationVector` | `.`, `/core`, `/session` | Deprecated: kept for apps that use it, removed in the next major version |
| `useInterpolation` | `.`, `/core` | Smooths a stream of joint values for a 3D view of the app's own |
| `useSmoothedMotionState` | `.`, `/core`, `/3d` | Smooths a motion state for the `*Exact` parts, which draw it as given |
| `ValueInterpolator` | `.`, `/core`, `/3d` | A type that a public member needs |
| `Vector3Simple` | `.`, `/core`, `/session` | A type that a public member needs |
| `VelocitySlider` | `.`, `/core` | A part |
| `VelocitySliderLabel` | `.`, `/core` | A part |
| `WebGLUnavailableContext` | `.`, `/3d`, `/JoggingGizmo` | A type that a public member needs |
