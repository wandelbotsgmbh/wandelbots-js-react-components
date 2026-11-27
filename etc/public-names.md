# Public names

Every name that the library exports, the entry points that export it, and why it is public. Generated from `etc/api-extractor/*.api.md` by `pnpm run api:names`; reasons that the script cannot find itself are in `scripts/publicNames.ts`.

| Name | Entry points | Why it is public |
| --- | --- | --- |
| `ActivationSwitch` | `.`, `/core`, `/RobotHeader` | A part |
| `ActivationSwitchOfSessionProps` | `.`, `/core`, `/RobotHeader` | The props of a part |
| `AppHeader` | `.`, `/core` | A part |
| `AppHeaderProps` | `.`, `/core` | The props of a part |
| `AppItem` | `.`, `/core`, `/RobotHeader` | A type that a public member needs |
| `AxisControlComponentColors` | `.`, `/core` | Deprecated: kept for apps that use it, removed in the next major version |
| `CollisionSceneRenderer` | `.`, `/3d` | A part |
| `ConnectedMotionGroup` | `.`, `/core` | Deprecated: kept for apps that use it, removed in the next major version |
| `ConnectedMotionGroupOptions` | `.`, `/core` | Deprecated: kept for apps that use it, removed in the next major version |
| `ConnectionLogger` | `.`, `/core`, `/session`, `/nats` | A type that a public member needs |
| `ConnectionQuality` | `.`, `/core`, `/RobotHeader` | A type that a public member needs |
| `ConnectionWarning` | `.`, `/core`, `/RobotHeader` | A part |
| `ConnectionWarningProps` | `.`, `/core`, `/RobotHeader` | The props of a part |
| `ConnectionWarningState` | `.`, `/core`, `/RobotHeader` | A type that a public member needs |
| `ControllerStateSource` | `.`, `/core`, `/session`, `/nats` | A type that a public member needs |
| `ControllerStateStream` | `.`, `/core`, `/session` | A type that a public member needs |
| `CurrentPose` | `.`, `/core`, `/CurrentPose` | A part |
| `CurrentPoseBar` | `.`, `/core`, `/CurrentPoseBar` | A part |
| `CurrentPoseBarProps` | `.`, `/core`, `/CurrentPoseBar` | The props of a part |
| `CurrentPoseBarState` | `.`, `/core`, `/CurrentPoseBar` | A type that a public member needs |
| `CurrentPoseProps` | `.`, `/core`, `/CurrentPose` | The props of a part |
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
| `JogAxis` | `.`, `/core`, `/3d`, `/JoggingButtons`, `/JoggingGizmo`, `/RobotControlPanel` | A type that a public member needs |
| `JogControlsProps` | `.`, `/core`, `/3d`, `/JoggingButtons`, `/JoggingGizmo` | The props of a part |
| `JogDirection` | `.`, `/core`, `/3d`, `/JoggingButtons`, `/JoggingGizmo`, `/JoggingJointSlider`, `/RobotControlPanel` | A type that a public member needs |
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
| `JoggingPanel` | `.`, `/core` | Deprecated: kept for apps that use it, removed in the next major version |
| `JoggingPanelProps` | `.`, `/core` | Deprecated: kept for apps that use it, removed in the next major version |
| `JoggingPanelTabId` | `.`, `/core` | Deprecated: kept for apps that use it, removed in the next major version |
| `JoggingRefusedError` | `.`, `/core`, `/session` | An error that a public member throws or rejects with |
| `JoggingRefusedReason` | `.`, `/core`, `/session` | A type that a public member needs |
| `JoggingStore` | `.`, `/core`, `/session` | A type that a public member needs |
| `JoggingStoreOptions` | `.`, `/core`, `/session` | A type that a public member needs |
| `JoggingStoreStorage` | `.`, `/core`, `/session` | A type that a public member needs |
| `JogHandle` | `.`, `/core`, `/3d`, `/JoggingButtons`, `/JoggingGizmo`, `/RobotControlPanel` | A type that a public member needs |
| `JogMotion` | `.`, `/3d`, `/RobotControlPanel` | A type that a public member needs |
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
| `RobotControl` | `.`, `/3d`, `/RobotControl` | A part |
| `RobotControlIncrements` | `.`, `/3d`, `/RobotControlPanel` | A type that a public member needs |
| `RobotControlJogMode` | `.`, `/3d`, `/RobotControlPanel` | A type that a public member needs |
| `RobotControlJoint` | `.`, `/3d`, `/RobotControlPanel` | A type that a public member needs |
| `RobotControlJoints` | `.`, `/3d`, `/RobotControlPanel` | A type that a public member needs |
| `RobotControlJointTarget` | `.`, `/3d`, `/RobotControlPanel` | A type that a public member needs |
| `RobotControlMoveState` | `.`, `/3d`, `/RobotControlPanel` | A type that a public member needs |
| `RobotControlMoveTo` | `.`, `/3d`, `/RobotControlPanel` | A type that a public member needs |
| `RobotControlOption` | `.`, `/core`, `/3d`, `/CurrentPoseBar`, `/RobotControlPanel`, `/RobotHeader` | A type that a public member needs |
| `RobotControlOptions` | `.`, `/3d`, `/RobotControl` | A type that a public member needs |
| `RobotControlPanel` | `.`, `/3d`, `/RobotControlPanel` | A part |
| `RobotControlPanelProps` | `.`, `/3d`, `/RobotControlPanel` | The props of a part |
| `RobotControlPose` | `.`, `/core`, `/3d`, `/CurrentPoseBar`, `/RobotControlPanel` | A type that a public member needs |
| `RobotControlProps` | `.`, `/3d`, `/RobotControl` | The props of a part |
| `RobotControlSelect` | `.`, `/core`, `/3d`, `/CurrentPoseBar`, `/RobotControlPanel`, `/RobotHeader` | A type that a public member needs |
| `RobotControlTab` | `.`, `/3d`, `/RobotControlPanel` | A type that a public member needs |
| `RobotControlTarget` | `.`, `/3d`, `/RobotControlPanel` | A type that a public member needs |
| `RobotControlVelocity` | `.`, `/3d`, `/RobotControlPanel` | A type that a public member needs |
| `RobotDescription` | `.`, `/core`, `/session` | A type that a public member needs |
| `RobotHeader` | `.`, `/core`, `/RobotHeader` | A part |
| `RobotHeaderActivation` | `.`, `/core`, `/RobotHeader` | A type that a public member needs |
| `RobotHeaderActivationState` | `.`, `/core`, `/RobotHeader` | A type that a public member needs |
| `RobotHeaderProps` | `.`, `/core`, `/RobotHeader` | The props of a part |
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
| `RobotTcpLike` | `.`, `/core` | Deprecated: kept for apps that use it, removed in the next major version |
| `SafetyBar` | `.`, `/core`, `/RobotHeader`, `/SafetyBar` | A part |
| `SafetyBarOfSessionProps` | `.`, `/core`, `/RobotHeader`, `/SafetyBar` | The props of a part |
| `SafetyBarProps` | `.`, `/core`, `/RobotHeader`, `/SafetyBar` | The props of a part |
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
| `VelocitySlider` | `.`, `/core` | Deprecated: kept for apps that use it, removed in the next major version |
| `VelocitySliderLabel` | `.`, `/core` | Deprecated: kept for apps that use it, removed in the next major version |
| `WebGLUnavailableContext` | `.`, `/3d`, `/JoggingGizmo` | A type that a public member needs |
