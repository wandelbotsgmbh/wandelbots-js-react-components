# @wandelbots/wandelbots-js-react-components

[![NPM version](https://img.shields.io/npm/v/@wandelbots/wandelbots-js-react-components.svg)](https://npmjs.org/package/@wandelbots/wandelbots-js-react-components) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@wandelbots/wandelbots-js-react-components)](https://bundlephobia.com/package/@wandelbots/wandelbots-js-react-components) [![Release](https://github.com/wandelbotsgmbh/wandelbots-js-react-components/actions/workflows/release.yml/badge.svg)](https://github.com/wandelbotsgmbh/wandelbots-js-react-components/actions/workflows/release.yml)

React UI components for robotics applications on the [Wandelbots NOVA platform](https://www.wandelbots.com/).

The library contains robotics parts (jogging, a 3D view of the robot, the safety state) and the logic that connects them to a NOVA instance. All styles come from the Nova Design System ([`@wandelbots/mui`](https://www.npmjs.com/package/@wandelbots/mui)): the parts use the MUI theme of the app. Built with TypeScript, MUI, React Three Fiber and MobX.

To see the parts on a NOVA instance, start the [playground](#playground).

## Install

```bash
pnpm add @wandelbots/wandelbots-js-react-components \
 react react-dom \
 @mui/material @mui/icons-material @emotion/react @emotion/styled \
 @wandelbots/mui mobx mobx-react-lite
```

The 3D parts need three.js and React Three Fiber in addition. If you don't need 3D rendering in your application, always import from `/core`.

```typescript
import {
  JoggingPanel,
  SafetyBar,
} from "@wandelbots/wandelbots-js-react-components/core"
```

For 3D-enabled components, use `/3d`, and add the 3D packages:

```typescript
import {
  MotionGroupVisualizer,
  Robot,
} from "@wandelbots/wandelbots-js-react-components/3d"
```

```bash
pnpm add three three-stdlib @react-three/fiber @react-three/drei
```

You can also import from the top-level package, but then you'll need to provide all optional dependencies.

The parts use the theme of your app. Without the Nova theme they still work, in the default colours of MUI. For the Nova look, create the theme with `createNovaMuiTheme` of `@wandelbots/mui`:

```tsx
import { ThemeProvider } from "@mui/material/styles"
import { createNovaMuiTheme } from "@wandelbots/mui"

const theme = createNovaMuiTheme()

export function App() {
  return <ThemeProvider theme={theme}>{/* your app */}</ThemeProvider>
}
```

For icons, use the dedicated [`@wandelbots/icons`](https://www.npmjs.com/package/@wandelbots/icons) package (the `/wb-icons` entry point has been removed). Each icon is imported from its own subpath — there is no bulk export:

```typescript
import { Home } from "@wandelbots/icons/Home"
import { Robot } from "@wandelbots/icons/Robot"
```

Browse the full icon set at https://wandelbotsgmbh.github.io/nova-design-system/#icons

**Available Entry Points:**

- **`.`** (Main) — All components. Requires the peer dependencies of `/core` and `/3d`.
- **`/core`** — The parts without 3D (jogging, `RobotHeader`, `CurrentPose`, `SafetyBar`, `AppHeader`, `LoadingCover`, `NoMotionGroupModal`), the NOVA connections and `JoggingStore`, the motion state helpers, the deprecated `ConnectedMotionGroup` and `i18n`. It also exports everything of `/session`.
- **`/3d`** — The 3D parts (`Robot`, `MotionGroupVisualizer`, `SafetyZonesRenderer`, …). Requires in addition three, three-stdlib, @react-three/fiber and @react-three/drei.
- **`/session`** (beta) — The library without React: a robot of a NOVA cell, loaded and connected (`loadRobotSession`, `RobotSession` with its description, live state, safety, activation, jogging and Move to), `JoggingStore`, the NOVA connections and the pose math on plain numbers. It loads no React, no MUI and no three.js, and needs only `mobx`.
- **`/nats`** — A robot's live controller state over NOVA's NATS server (`natsControllerStateSource`, `natsUrlOf`): the `stateSource` of `loadRobotSession` instead of NOVA's websocket. Requires in addition nats.ws; no other entry point loads it.
- **`/SafetyBar`** — Only `SafetyBar` (also as the default export), also for a robot session (`session`).
- **`/JoggingGizmo`** — Only `JoggingGizmo` (also as the default export) and `JoggingGizmoOrientation`. Requires in addition three and @react-three/fiber.
- **`/JoggingButtons`** — Only `JoggingButtons` (also as the default export). No 3D packages needed.
- **`/JoggingJointSlider`** — Only `JoggingJointSlider` (also as the default export). No 3D packages needed.
- **`/RobotControlPanel`** — The whole Robot control panel, `RobotControlPanel` (also as the default export). It shows the jog gizmo, so it requires in addition three and @react-three/fiber, as `/JoggingGizmo` does.
- **`/RobotControl`** — `RobotControl` (also as the default export), the Robot control panel of a robot session. Requires in addition three and @react-three/fiber, as `/RobotControlPanel` does.
- **`/CurrentPose`** — `CurrentPose` (also as the default export), the current pose bar of a robot session. No 3D packages needed.
- **`/CurrentPoseBar`** — Only `CurrentPoseBar` (also as the default export). No 3D packages needed.
- **`/RobotHeader`** — `RobotHeader` (also as the default export), and its parts for an app's own header: `SafetyBar`, `ActivationSwitch` and `ConnectionWarning`. No 3D packages needed.

Each part of a robot session (`RobotControl`, `CurrentPose`, and `RobotHeader` with its parts) takes its robot as `session` and follows it by itself: the app passes the session, nothing else. Several robots on a page: each part gets its own.

A component's own entry point brings only what that component needs, e.g. `/JoggingButtons` no three.js and no NOVA client, unlike `/core`. The entry points share their common code, so an app that imports a component from both `/core` and its own entry point gets one copy of it:

```tsx
import JoggingJointSlider from "@wandelbots/wandelbots-js-react-components/JoggingJointSlider"
```

### The simple parts on their own

`JoggingGizmo`, `JoggingButtons`, `JoggingJointSlider`, `CurrentPoseBar`, `SafetyBar` and `RobotControlPanel`, which is built from them, take plain props and report through callbacks: no store, no provider and no i18n setup of the app. The app keeps its own connection to the robot and moves it in `onJogStart` and `onJogStop`. While a control is held the robot moves; it stops when the control is let go, when the pointer leaves it, when the window loses focus or the tab is hidden, on any key, and when the part becomes disabled or unmounts. The keyboard starts no motion.

What each one loads, besides `react` and `@mui/material` (checked by `src/test/bare.test.tsx`):

| Entry point | Also needs |
| --- | --- |
| `/JoggingGizmo` | `three`, `@react-three/fiber`, `@wandelbots/design-tokens` |
| `/JoggingButtons` | `@wandelbots/mui`, `@wandelbots/icons`, `@wandelbots/design-tokens` |
| `/JoggingJointSlider` | nothing else |
| `/CurrentPoseBar` | `@wandelbots/mui`, `@wandelbots/icons` |
| `/SafetyBar` | `mobx-react-lite`, `axios` |
| `/RobotControlPanel` | `three`, `@react-three/fiber`, `@wandelbots/mui`, `@wandelbots/icons`, `@wandelbots/design-tokens` |

All of them load i18next and react-i18next, which come with the library.

### The robot session (beta)

`loadRobotSession` loads one robot of a cell and keeps it connected: its description, its live state, its safety, its activation, jogging and Move to, as MobX stores. It is **beta** in 7.x: the props and callbacks of the parts are the stable promise, while the classes of `/session` may still change in a minor version. An app that builds on them pins the minor version. An app that owns its robot connection does not need a session: the simple parts take plain props.

### Without three.js or without React

- **An app without a 3D view** needs no three.js. It takes the robot from `/session` and its parts from the component entry points that draw nothing in 3D: `/RobotHeader`, `/CurrentPose`, `/CurrentPoseBar`, `/SafetyBar`, `/JoggingButtons` and `/JoggingJointSlider`.
- **`/core` needs three.js installed**, although it draws nothing in 3D: `ConnectedMotionGroup`, which it exports, gives a three.js quaternion (`mountingQuaternion`).
- **An app without React**, or with a UI of its own, uses `/session` alone (and `/nats`). Of the peer dependencies it needs only `mobx` (see [Peer dependencies](#peer-dependencies)). The parts of a session are MobX stores: such an app follows them with `autorun` or `reaction` of MobX. What it calls returns a promise that rejects when it fails (a jog that may not start rejects with a `JoggingRefusedError`), and what fails in the background goes to `onError`.

```typescript
import { autorun } from "mobx"
import { loadRobotSession } from "@wandelbots/wandelbots-js-react-components/session"

const load = loadRobotSession("https://my-instance.wandelbots.io", "0@ur5e", {
  onError: (error) => console.warn(error.kind, error.message),
})
// Rejects when the load fails; load.retry() loads again
const session = await load.ready

const stopFollowing = autorun(() => {
  console.log(session.safety.canBeMoved, session.state.displayedTcpPose)
})

// Jog along X while a key of the app's own UI is held
await session.activation.activate()
await session.jogging.startCartesianJogging("translate", "x", "+")
// … and when it is let go
await session.jogging.stopJogging()

stopFollowing()
load.dispose()
```

### Peer dependencies

| Package | Version | Needed by |
| --- | --- | --- |
| `mobx` | ^6.13.6 | Every entry point |
| `react`, `react-dom` | ^19 | Every entry point with UI: all but `/session` and `/nats` |
| `@mui/material`, `@mui/icons-material` | ^7 | Every entry point with UI |
| `@emotion/react`, `@emotion/styled` | ^11 | Every entry point with UI |
| `@wandelbots/mui` | ^2 | Every entry point with UI (each simple part's needs are in [The simple parts on their own](#the-simple-parts-on-their-own)) |
| `mobx-react-lite` | ^4.1.0 | Every entry point with UI |
| `three` | >=0.182 | `.`, `/3d`, `/JoggingGizmo`, `/RobotControlPanel`, `/RobotControl`, and `/core` (`ConnectedMotionGroup`) |
| `@react-three/fiber` | ^9 | `.`, `/3d`, `/JoggingGizmo`, `/RobotControlPanel`, `/RobotControl` |
| `three-stdlib` | >=2 | `.`, `/3d` |
| `@react-three/drei` | ^10 | `.`, `/3d` |
| `nats.ws` | ^1.30.3 | `/nats` |

Only `mobx` is a required peer. The others are optional in `package.json`, so an app installs those of the entry points it imports: an app that takes only `/session` (and `/nats`) installs `mobx` (and `nats.ws`), and no React, MUI or three.js.

These packages are peer dependencies because the app and the library must use the same copy: React, the MUI theme of the app, the MobX stores that the app reads with its own `observer`, and the `<Canvas>` of React Three Fiber.

`@wandelbots/nova-js` is a normal dependency with an exact version: the library has its own copy, see [Connecting to NOVA](#connecting-to-nova).

## Migration & Breaking Changes

### From 6.x to 7.0.0

7.0.0 keeps only the robotics parts and the logic that connects them to NOVA. All styles come from the Nova Design System.

**Removed exports.** A removed component also takes its `…Props` type with it.

| Removed in 7.0.0 | Use instead |
| --- | --- |
| `createNovaTheme`, `createNovaMuiTheme` | `createNovaMuiTheme` of `@wandelbots/mui` (same name). The parts use the theme of the app. |
| The `componentsExt` extension of the MUI types `Theme` and `ThemeOptions` | No replacement. The jogging parts have their colors built in. `JoggingCartesianAxisControl` keeps its `colors` prop. |
| `AdornedTextField` | `AdornedTextField` of `@wandelbots/mui` |
| `SelectableFab` | No replacement |
| `useAnimationFrame`, `useAutorun`, `useMounted`, `useReaction` | No replacement |
| `PoseCartesianValues`, `PoseJointValues` | No replacement in 7.0.0. Copy them from 6.3.0 until a 7.x version has a replacement. |
| `MANUFACTURER_HOME_CONFIGS`, `getDefaultHomeConfig`, `extractManufacturer` | `nova.api.motionGroupModels.getMotionGroupHomejoints(model)` of `@wandelbots/nova-js`: the home joints of a motion group model, from the NOVA instance |
| `AxisConfig`, `defaultAxisConfig` | No replacement |
| `ProgramControl`, `ProgramState`, `ProgramStateIndicator`, `Timer`, `TimerControls`, `CycleTimer`, `CycleTimerControls`, `CycleTimerState`, `RobotCard`, `RobotListItem`, `RobotSetupReadinessIndicator`, `RobotSetupReadinessState`, `TabBar`, `TabItem`, `WandelbotsDataGrid`, `LogPanel`, `LogViewer`, `LogStore`, `LogLevel`, `LogMessage`, `createLogMessage`, `createInfoMessage`, `createWarningMessage`, `createErrorMessage`, `createDebugMessage` | No replacement. Copy them from 6.3.0 if your app needs them. |

**Other changes:**

- **Peer dependencies** (see [Peer dependencies](#peer-dependencies)): React 19, MUI 7, `@react-three/fiber` 9 and `@react-three/drei` 10. New peers: `@wandelbots/mui` ^2 (an app with `@wandelbots/mui` 1.x must update it), `mobx` ^6.13.6 and `mobx-react-lite` ^4.1.0.
- **nova-js:** `@wandelbots/nova-js` 4.13.0 is a normal dependency with an exact version. The library creates its own NOVA client: from the client of the app (it reads only the URL and the access token), or from a URL string. The type of this parameter is `NovaConnection`. The calls of your app stay the same, also with another nova-js version in the app. `ConnectedMotionGroup`, `MotionStreamConnection` and `JoggerConnection` have no public `nova` field any more: use the client of your app.
- **`defaultGetModel(model, connection?)`:** the second parameter is a `NovaConnection`. A URL string works as before; a NOVA client also gives the access token. `Robot` and `LinearAxis` without `getModel` download the model with the connection of their `ConnectedMotionGroup`.
- **Model download without the token:** in an app that its NOVA instance does not serve (for example in local development with an access token), `MotionGroupVisualizer`, `SupportedRobot` and `SupportedLinearAxis` download the model without the token. Give them a `getModel` that uses the client of your app, `(model) => defaultGetModel(model, nova)` (as the playground does), or put the token into `localStorage["wbjs.access_token"]`.
- **Jogging:** a press of a jog button that ends before NOVA confirms the jogging connection (about 0.1 to 0.5 s) moves nothing. Before, such a press could move the robot briefly.
- **Websockets:** `JoggerConnection.dispose()` also closes the motion stream that `JoggerConnection.open()` opened (a motion stream that you give to the constructor stays open). `ConnectedMotionGroup.dispose()` also closes the websocket of the controller state.
- **Look:** `AppHeader` and `LoadingCover` use the styles of the design system, so they look a little different.
- **Release asset:** `no-draco-models.zip` is gone. The models come from the NOVA API (since 4.0.0).

### From ConnectedMotionGroup to RobotSession

`ConnectedMotionGroup` is deprecated. `RobotSession` replaces it: one robot of a cell, loaded and connected, with its description, live state, safety, activation, jogging and Move to. `ConnectedMotionGroup` keeps working until a later major version removes it, and `Robot` and `LinearAxis` still take it.

```tsx
// Before
const motionGroup = await ConnectedMotionGroup.connect(nova, "0@ur5e", { cellId })
<Robot connectedMotionGroup={motionGroup} />
motionGroup.dispose()

// After
const load = loadRobotSession(nova, "0@ur5e", { cellId })
const session = await load.ready
<RobotControl session={session} />
load.dispose()
```

What changes besides the names:

- **Loading:** `loadRobotSession` returns at once. `load.state` ("loading", "ready", "failed") and `load.progress` tell how far it is, `load.retry()` loads again after a failure, `await load.ready` gives the session. A failed step is retried on its own, after 1 and 2 seconds unless `retryDelaysMs` says otherwise.
- **Jogging comes with it:** `session.jogging` is the robot's `JoggingStore`. An app no longer opens it with `JoggerConnection.open` and `JoggingStore.loadFor`. It starts no jog while the robot may not move (`safety.canBeMoved` is false, so also while the robot is activating): the start rejects with a `JoggingRefusedError`.
- **The activation follows the controller:** `activation.state` is the mode that the controller reports ("inactive" while its live state does not come), or the mode change in progress. A change that the controller has not confirmed after 30 seconds is over, and can be asked for again.
- **Nothing happens unasked:** without `storage` the jogging settings are not kept (pass `localStorage` to keep them), and a virtual robot is activated only with `autoActivateVirtual: true`.
- **Errors:** what the app calls rejects (`session.activation.activate()` with a `RobotModeChangeError`); what fails in the background (a jog, a message of the live state) goes to `onError`.
- **Several robots:** load one session per robot instead of `ConnectedMotionGroup.connectMultiple`.

| `ConnectedMotionGroup` | `RobotSession` |
| --- | --- |
| `motionGroupId`, `controllerId` | `motionGroupId`, `controllerId` (and `cellId`) |
| `modelFromController` | `description.motionGroupModel` |
| `dhParameters` | `description.dhParameters` |
| `safetyZones` | `description.safetyZones` |
| `description` | `description.motionGroupDescription` |
| `isVirtual` | `description.isVirtual` |
| `tcps` | `description.tcps` (id and name), `description.tcpOffsetsById` (position and orientation) |
| `joints` | One per joint: `description.dhParameters`, or the joint limits in `description.jointLimits` |
| `mountingPosition`, `mountingQuaternion` | `description.mounting` (mm and a rotation vector) |
| `rapidlyChangingMotionState` | `state.rapidlyChangingMotionState` |
| `controllerState` | `state.controllerState` |
| `initialMotionState`, `controller`, `motionGroup`, `motionStateSocket` | No replacement: the session keeps its connections. Read `state` instead. |
| `activationState` | `activation.state` |
| `activate()`, `deactivate()`, `toggleActivation()` | `activation.activate()`, `activation.deactivate()`, `activation.toggle()` |
| `isEstopActive`, `isMoveableSafetyState`, `isMoveableOperationMode`, `canBeMoved` | `safety.isEstopActive`, `safety.isMoveableSafetyState`, `safety.isMoveableOperationMode`, `safety.canBeMoved`; why the robot may not move: `safety.notMoveableReason` |
| `joggingVelocity`, `joggingVelocityRads`, `setJoggingVelocity()` | The velocities of `jogging`: `rotationVelocityDegPerSec`, `rotationVelocityRadsPerSec`, `translationVelocityMmPerSec`, `setVelocityFromSlider()` |
| `connectedJoggingSocket`, `planData` | No replacement (unused) |
| `dispose()` | `load.dispose()`, or `session.dispose()` |
| `<Robot connectedMotionGroup={…}>`, `<LinearAxis connectedMotionGroup={…}>` | No replacement yet: keep a `ConnectedMotionGroup` for the 3D view until the 3D parts of a session come |

### From JoggingPanel to RobotControl

`JoggingPanel` and the older parts it is built from (`JoggingCartesianAxisControl`, `JoggingJointValueControl`, `VelocitySlider`, which reads a `JoggingStore`, and `VelocitySliderLabel`) are deprecated. They keep working until a later major version removes them. `RobotControl` replaces the panel: the Robot control panel of the design (Translate, Rotate, Joint and Move to) for a [robot session](#from-connectedmotiongroup-to-robotsession).

```tsx
// Before
<JoggingPanel nova={nova} motionGroupId="0@ur5e" cellId={cellId} locked={programRuns} />

// After
const load = loadRobotSession(nova, "0@ur5e", { cellId, storage: localStorage })
const session = await load.ready
<RobotControl session={session} disabled={programRuns} />
```

| `JoggingPanel` | Instead |
| --- | --- |
| `nova`, `motionGroupId`, `cellId` | `loadRobotSession(nova, motionGroupId, { cellId })`; its session goes to `session` |
| `locked` | `disabled` |
| `onSetup(store)`, `store` | `session.jogging`, the session's `JoggingStore`. It lives as long as the session, also while the panel is hidden. |
| The jogging settings in `localStorage` | Only with `storage: localStorage` (or a storage of the app) for `loadRobotSession`; without it nothing is kept |
| `sx` | `sx` |
| `children` | No replacement: the app puts its own parts next to the panel, see [Placing the parts](#placing-the-parts) |
| The `show…` flags of `JoggingStore` (`showTcpSelect`, `showIncrementSelect`, …), its `tabs` and `onTabChange` | The props of `RobotControlPanel`, given to `RobotControl`: each replaces the session's, e.g. `<RobotControl session={session} increments={undefined} />` for no Increment mode |
| `JoggingCartesianAxisControl` | `JoggingButtons` (a minus and a plus button per axis), or `JoggingGizmo` |
| `JoggingJointValueControl` | `JoggingJointSlider` |
| `VelocitySlider`, `VelocitySliderLabel` | The velocity of `RobotControlPanel` |
| `JoggingStore.activate()` | `startCartesianJogging`, `startJointJogging` and `runIncrementalCartesianJog` of `JoggingStore` activate what they need; `session.ensureMovementOwnership("jogging")` hands the robot to jogging |

What changes besides the names:

- **Props in, callbacks out:** `RobotControlPanel`, `JoggingButtons`, `JoggingGizmo` and `JoggingJointSlider` take no store and move nothing themselves (`onJogStart`, `onJogStop`). `RobotControl` is `RobotControlPanel` wired to a session: it jogs the session's robot.
- **The gizmo** needs the camera of the app's 3D view: `gizmoOrientation`, written by a `JoggingGizmoOrientation` in the view. Without it the panel jogs with buttons.
- **Jogging is off** while the robot may not move (not activated, its safety, no live state), while a trajectory moves it or another client jogs it: `RobotControl` says why in the panel. `disabled` is only the app's own lock.

### 4.x Core Changes

Robot data is now fetched from a running nova instance. This eliminates the need of shipping every react application with the robot data attached.

It is still possible to load robot models from other files: give `Robot`, `SupportedRobot`, `MotionGroupVisualizer` or `LinearAxis` a `getModel` function that returns a promise of the URL of the model file.

The `wandelbots-js-react-components` library can be used both with and without a Nova connection. For details on connecting to a Nova instance, see [Connecting to NOVA](#connecting-to-nova).

The list of available robots will now be automatically updated along with the nova version. There is no more need to update nova apps whenever there is a new supported robot the app wants to feature.

Robot dh-parameters are now using a new format.

```
interface DHParameter {
  'alpha': number;
  'theta': number;
  'a': number;
  'd': number;
  'reverse_rotation_direction': boolean;
}
```

### Other versions

Breaking changes for each major version are documented in the [GitHub Releases](https://github.com/wandelbotsgmbh/wandelbots-js-react-components/releases).

## Components

### Robot Control & Jogging

Manual robot control interfaces.

**JoggingPanel** (deprecated, see [From JoggingPanel to RobotControl](#from-joggingpanel-to-robotcontrol)) - The jogging panel of earlier versions, with cartesian and joint controls. The older parts it is built from are deprecated with it: **JoggingCartesianAxisControl** (use `JoggingButtons`), **JoggingJointValueControl** (use `JoggingJointSlider`), **VelocitySlider** and **VelocitySliderLabel** (use the velocity of `RobotControlPanel`).

**JoggingStore** - The state of the jogging (velocity, coordinate system, the jogging connection). A robot session has one (`session.jogging`), and `JoggingStore.loadFor` creates one for your own controls. It also jogs for them: `startCartesianJogging(motion, axis, direction)` or `startJointJogging(joint, direction)` when a control is pressed and `stopJogging()` when it is let go, and `runIncrementalCartesianJog(motion, axis, direction, increment)` for one step. The store keeps the order that hold-to-jog needs: a press that ends before the jogging connection is ready moves nothing, and one step runs at a time. While the store is locked, or its owner says that the robot may not move (the option `notMoveableReason`, which a `RobotSession` gives its store), or after NOVA refused the jogging connection because another client jogs (`blocked`, until `unblock()`), it starts no jog: the start rejects with a `JoggingRefusedError`, whose `reason.code` says why. The same holds for everything else that opens the jogging connection, a TCP change (`requestTcpChange`) and `session.ensureMovementOwnership("jogging")`: NOVA switches a controller to control mode by itself for it. The store asks again once the connection is open, and closes it when the robot may no longer move by then.

**Simple jogging parts** (plain props and callbacks, see [The simple parts on their own](#the-simple-parts-on-their-own))

- **JoggingGizmo** - Handles in 3D to move the TCP along or turn it about the X, Y and Z axes
- **JoggingButtons** - A minus and a plus button per axis
- **JoggingJointSlider** - A joint on its range between its limits: hold a point to move the joint toward it
- **CurrentPoseBar** - The current pose of the TCP, its TCP and coordinate system, and the orientation format

**RobotControlPanel** (from `/3d` or `/RobotControlPanel`) - The Robot control panel of the design, built from the parts above: the tabs Translate and Rotate, with the TCP and the frame to jog along, Continuous or Increment, the velocity, the step size, and the gizmo or the buttons with a switch between them; the tab Joint, with a `JoggingJointSlider` per joint and the joint velocity; and the tab Move to, with a typed target (a pose of the TCP or joint values; else the current pose), the frame it is relative to, and a button to hold to move there. An app that wants the whole panel imports this; an app that wants one part imports that part.

- It moves nothing itself, as its parts: `onJogStart(motion, axis, direction)` and `onJogStop` for jogging while held, and `increments.onStep(motion, axis, direction, distance)` for one step per press. The app keeps the velocity and the selects in its own store; the panel keeps the tab, the mode, the step size and the view.
- Velocities and step sizes are in NOVA's units: mm and mm/s to translate, rad and rad/s to rotate. The panel shows mm/s and °/s. The velocity has a slider, in whole units, and a field to type it into: Enter, or leaving the field, applies it (`onVelocityChange`). A text that is no number, or a velocity outside `min` to `max`, is flagged at the field and neither applied nor corrected.
- `tcp` and `jogFrame` show a select each, filled by the app. Without `increments`, there is no Continuous/Increment toggle. Without `gizmoOrientation` (from a `JoggingGizmoOrientation` in the app's 3D scene), it jogs with buttons only.
- `onJogStop` also comes when the tab, the mode or the view changes while a control is held: the jog of that press must not go on.
- `disabled` turns off every control: nothing may move and no setting may change (the app's lock). `jogDisabled` turns off only what jogs on Translate, Rotate and Joint (the gizmo, the buttons, the joint sliders) and the TCP select, whose change needs the jogging connection: e.g. while the robot is not activated or a trajectory moves it. The settings that move nothing stay usable then (Move relative to, Continuous or Increment, the step size, the velocity), and so does Move to, so a move of its own does not end when the app locks jogging during it. An app that used to pass `disabled={locked || !canBeMoved}` passes `disabled={locked}` and leaves the robot's state to `jogDisabled`, which `RobotControl` sets. `jogDisabledReason` is the text that says why jogging is off: Translate and Rotate show it in place of their hint of how to jog, Joint under its joints. `RobotControl` fills it with the robot's reason (not activated, its safety state or operation mode, no connection), with a trajectory that moves the robot, or with another client that jogs it. With `onJogRetry`, a Try again button shows under the reason: `RobotControl` gives it after another client held the jogging connection, and the next jog then asks NOVA for it again.
- The panel keeps its tab, jog mode and step size itself. An app that keeps them in its own store (to remember them, or because its jogging depends on them) gives `tab`, `jogMode` and `increments.step`, and gets `onTabChange`, `onJogModeChange` and `increments.onStepChange`; each also works alone, to follow a choice without keeping it.
- `joints` gives the Joint tab: the joints' values and limits (rad, or mm with `linear`), their names, the joint velocity, and `onJogStart(index, direction)` and `onJogStop`. The panel jogs one joint at a time; the turn-around of a slider brings `onJogStop` and `onJogStart` in the same event, as described for `JoggingJointSlider`. Without `joints`, there is no Joint tab.
- `moveTo` gives the Move to tab. It works as RobotPad's pose field: the coordinates `(x, y, z, rx, ry, rz)` (mm, rotation vector in rad: the format RobotPad copies and pastes) show the TCP's current pose (`getCurrentPose`, read every animation frame), with Copy and Edit pose, and Move to, off until a pose is the target. Edit pose, or a click on the field, makes it editable; Save pose edit (Enter) makes the typed pose the target (`onTargetChange(pose)`): the app plans the move and loads it, and reports `state` (`"planning"`, `"planned"`, `"moving"`, `"stopping"` or `"idle"`, as RobotPad's trajectory) and an `error` (e.g. out of reach, or why the move to it failed). With `getCurrentJoints` (the joints' positions now, in rad, or mm for a linear axis), the field also takes joint values as the target, in square brackets and as many as the robot has joints: `[j1, …, jn]`. `onTargetChange` and `onMoveStart` then get `{ joints }` in place of a pose (`RobotControlTarget`). A robot that takes no TCP poses (`cartesian` is false: a linear axis, a turntable) moves to joint values only: the field shows its joints, live, and reads numbers without brackets as joint values. Then Reset shows, and with an `error` also Plan again, which gives the app the same pose once more (`onTargetChange(pose)`), so a failed move needs no typing. Held with a pointer for 200 ms while `"planned"`, Move to calls `onMoveStart(pose)`; the release, or the pointer leaving the button, calls `onMoveStop`: the app starts and pauses its trajectory (the keyboard starts no move); the button says Moving… and Stopping…. At the target (within 0.5 mm and 0.01 rad) it turns off; once the move no longer runs, the field shows the current pose again (`onTargetChange(null)`), as do Reset, another tab and another TCP or frame (a held move gets its `onMoveStop` first). While another pose is typed, Move to stays off. `notMoveableReason` is why the robot may not move now, whatever the target (e.g. it is not activated): the field says so with a target and also while one is typed, and Move to stays off. Typing stays possible, and a typed target still comes (`onTargetChange`), to plan once the robot may move. `frame` is the "Relative to" select. The tab shows the velocity of the move to its target: `velocity.translate` for a pose of the TCP, and for joint values the velocity of the Joint tab (`joints.velocity`), or without that tab `velocity.rotate`. Without `moveTo`, there is no Move to tab.

```tsx
const orientation = useRef<Quaternion | null>(null)

<RobotControlPanel
  gizmoOrientation={orientation}
  tcp={{ options: tcps, value: tcp, onChange: setTcp }}
  jogFrame={{ options: frames, value: frame, onChange: setFrame }}
  velocity={{
    translate: { value: mmPerSec, min: 1, max: 250 },
    rotate: { value: radPerSec, min: 0.02, max: 1 },
  }}
  onVelocityChange={(motion, value) => setVelocity(motion, value)}
  onJogStart={(motion, axis, direction) => startJogging(motion, axis, direction)}
  onJogStop={() => stopJogging()}
  increments={{
    steps: { translate: [0.1, 1, 5, 10], rotate: [0.001, 0.01, 0.05] },
    onStep: (motion, axis, direction, distance) =>
      jogStep(motion, axis, direction, distance),
  }}
  joints={{
    joints: jointValues.map((value, index) => ({
      value,
      min: limits[index].lower_limit,
      max: limits[index].upper_limit,
    })),
    velocity: { value: jointRadPerSec, min: 0.02, max: 1 },
    onVelocityChange: setJointVelocity,
    onJogStart: (index, direction) => startJointJogging(index, direction),
    onJogStop: () => stopJogging(),
  }}
  moveTo={{
    getCurrentPose: () => currentTcpPose(),
    getCurrentJoints: () => currentJoints(), // the field takes [j1, …, jn] too
    onTargetChange: (target) => planAndLoad(target), // a pose or { joints }, or drop the plan (null)
    state: trajectoryState, // "planning" | "planned" | "moving" | "stopping" | "idle"
    error,
    onMoveStart: () => startTrajectory(),
    onMoveStop: () => pauseTrajectory(),
  }}
/>
```

### The parts of a robot session

`RobotControl` and `CurrentPose` are connected components: a UI component, which takes props and reports through callbacks, filled from the `RobotSession` given as `session`. A prop given to the connected component replaces the session's: `<RobotControl session={session} increments={undefined} />` has no Increment mode. An app without a `RobotSession` uses the UI component with props of its own.

| Connected component | UI component |
| --- | --- |
| `RobotControl` | `RobotControlPanel` |
| `CurrentPose` | `CurrentPoseBar` |

**RobotControl** (from `/3d` or `/RobotControl`) - The Robot control panel (see `RobotControlPanel` above) of a session: Translate and Rotate jog the TCP with the session's jogging store, Joint jogs the joints, and Move to plans the typed pose and moves along it while held. `disabled` is the app's lock; jogging is also off, with the reason in the panel, while the robot may not move. `gizmoOrientation` gives the gizmo the camera of the app's 3D view; without it, the panel jogs with buttons. Another session gets a new panel: what the panel held for the old robot ends.

**CurrentPose** (from `/core` or `/CurrentPose`) - The current pose bar of a session: the TCP's pose in a TCP and a coordinate system of the bar's own, the state of the motion stream and the last jog error. `CurrentPoseBar` is its UI component.

**RobotHeader** and **ConnectionWarning** (from `/core` or `/RobotHeader`) - The header of a robot app, as Figma's top bar: the app menu and the app's name, the motion group select, the robot's `SafetyBar` and activation switch, and the app's own `actions`. Given a `session` it shows the robot's safety state, operation mode and controller type and follows them, e.g. an emergency stop as soon as NOVA reports it; its switch is off while NOVA would refuse a mode change, and a refused change goes to the session's `onError`. Without a robot, e.g. while none is loaded, it shows the app's name and menu only. `ConnectionWarning` goes into its `actions`: an icon that shows once the robot's live state stops arriving, also for its `session`. An app that builds its own header places `SafetyBar`, `ActivationSwitch` and `ConnectionWarning` itself, each with `session`; an app without a `RobotSession` gives the header `safety` and `activation` as plain props instead.

#### Placing the parts

The library has no layout: an app puts `RobotHeader`, `RobotControl` and `CurrentPose` where it wants, next to its own 3D view, and each fills the box that the app gives it. Here they are placed as the Figma design does: the header on top, the 3D view under it, the panel floating at the view's top right and the pose bar along its bottom.

```tsx
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import {
  ConnectionWarning,
  CurrentPose,
  JoggingGizmoOrientation,
  RobotControl,
  RobotHeader,
  type RobotSession,
} from "@wandelbots/wandelbots-js-react-components"
import { Canvas } from "@react-three/fiber"
import { useRef } from "react"
import type { Quaternion } from "three"

export function RobotApp({ session }: { session: RobotSession }) {
  // The camera of the 3D view, for the panel's gizmo
  const orientation = useRef<Quaternion | null>(null)

  return (
    <Stack sx={{ height: "100vh" }}>
      <RobotHeader
        appName="My robot app"
        session={session}
        actions={<ConnectionWarning session={session} />}
      />
      <Box sx={{ position: "relative", flex: 1, minHeight: 0 }}>
        <Box sx={{ position: "absolute", inset: 0 }}>
          {/* The app's 3D view of the robot */}
          <Canvas>
            <JoggingGizmoOrientation target={orientation} />
          </Canvas>
        </Box>
        <Box sx={{ position: "absolute", top: 12, right: 12, width: 444 }}>
          <RobotControl session={session} gizmoOrientation={orientation} />
        </Box>
        <Box sx={{ position: "absolute", left: 12, right: 12, bottom: 12 }}>
          <CurrentPose session={session} />
        </Box>
      </Box>
    </Stack>
  )
}
```

### 3D Visualization & Robotics

3D components for robot visualization. They render inside the `<Canvas>` of React Three Fiber.

**Robot** - Real-time 3D robot rendering

- Live pose updates from a `ConnectedMotionGroup`
- The model of the motion group from the NOVA instance (`defaultGetModel`)

**LinearAxis** - The same for a linear axis

**SupportedRobot**, **SupportedLinearAxis** and **MotionGroupVisualizer** - The same without a `ConnectedMotionGroup`: they take a motion state, the model name and the DH parameters. `MotionGroupVisualizer` picks the robot or the linear axis. The `…Exact` variants show the pose without smoothing.

**SafetyZonesRenderer** - 3D safety visualization

- Real-time safety zone rendering
- Visual collision boundaries

**CollisionSceneRenderer** - The colliders of a collision setup

**TrajectoryRenderer** - Motion path visualization

- Real-time trajectory display
- Path planning visualization

**JointLimitGizmo** - The joint axes of a robot and their position ranges (the joint limits)

**PresetEnvironment** - Lights and an environment for the 3D scene

### Safety & Monitoring

Safety components for production environments.

**SafetyBar** - Centralized safety status

- Real-time safety monitoring
- Emergency stop integration
- Each indicator has a stable `data-testid` (`safety-state-indicator`, `operation-mode-indicator`, `controller-type-indicator`) and, as an image, a name that says its state, e.g. "Safety state: E-Stop", "Operation mode: Manual" or "Controller type: Virtual": the compact bar shows only icons, with their texts in a popover on hover
- Given a `session` (`<SafetyBar session={session} />`) it shows and follows the robot of that session; an app without a `RobotSession` gives the states as plain props

### App Frame

- **AppHeader** - Application header with an app menu
- **LoadingCover** (and **LoadingErrorMessage**) - A loading screen, with the error when the loading fails
- **NoMotionGroupModal** - A modal for a cell without a motion group

### Logic

- **loadRobotSession** and **RobotSession** - A robot of a cell, loaded and connected: its description, live state, safety, activation, jogging and Move to. In a React app, its UI is [the parts of a robot session](#the-parts-of-a-robot-session); without React, see [Without three.js or without React](#without-threejs-or-without-react).
- **TrajectoryExecutionStore** (`session.trajectory`) and **RobotTargetPose** (`session.targetPose`) - Move to without a UI. `planTrajectory(pose)` plans a trajectory and loads it; `hold(pose)` moves along it while a button is held and `release()` stops the robot, whatever the order of NOVA's messages, and both are safe to repeat. Both take a pose as the app saves it (`RobotPose`: joints, or a TCP pose in a coordinate system, planned for the selected TCP), or a `TrajectoryTarget`; a pose of another motion group is refused. `hold` starts nothing along a trajectory that was planned for another target, or with another velocity than the jogging store has now (`isPlanOutdated`: plan it again). `targetPose.plan(pose)`, `holdMove(pose)` and `releaseMove()` do the same for the typed pose that the Robot control shows, which also keeps why its plan or its move failed (`staged.errorKey`, `staged.errorMessage`)
- **ConnectedMotionGroup** (deprecated, see [From ConnectedMotionGroup to RobotSession](#from-connectedmotiongroup-to-robotsession)) - A motion group with its live motion state, safety state and operation mode
- **MotionStreamConnection** and **JoggerConnection** - The motion state stream and the jogging connection of a motion group
- **jointValuesEqual**, **poseEqual**, **tcpMotionEqual**, **unwrapRotationVector** (deprecated) - Helpers of the library's motion stream
- **ValueInterpolator**, **useInterpolation**, **useSmoothedMotionState** - Smooth joint values for the 3D view
- **i18n** - The translations of the library

## Architecture & Integration

### Connecting to NOVA

Components integrate with the Wandelbots Nova ecosystem:

- **NovaConnection** - Where the library connects to NOVA (`nova` of `JoggingPanel`, `ConnectedMotionGroup.connect`, `MotionStreamConnection.open`, `JoggerConnection.open`, `defaultGetModel`), it takes a `NovaConnection`: the URL of the instance, or the NOVA client of the app (`Nova` of `@wandelbots/nova-js`, of any version). The library reads only the URL and the access token of the client, and connects with its own client (nova-js 4.13.0). So the app configures the connection in one place.
- **Real-time Updates** - WebSocket connections for live robot state updates
- **Motion Group Management** - Direct integration with `ConnectedMotionGroup` objects
- **State Synchronization** - Automatic state management with MobX reactivity

### Technical Foundation

- **TypeScript** - Full type safety and enhanced developer experience
- **MUI 7 and the Nova Design System** - The theme of the app, from `@wandelbots/mui`
- **React Three Fiber** - High-performance 3D rendering for robotics visualization
- **MobX** - Reactive state management for real-time updates
- **i18next** - Internationalization support for global deployment

## Development

To set up the project for development:

```bash
git clone https://github.com/wandelbotsgmbh/wandelbots-js-react-components.git
cd wandelbots-js-react-components
pnpm install
```

### A NOVA instance

The playground and the e2e tests need a real NOVA instance. They read it from:

- `NOVA_INSTANCE_URL`, and `NOVA_ACCESS_TOKEN` for a cloud instance, or
- `WANDELAPI_BASE_URL` in `.env.local`.

`pnpm td <instanceProviderURL>` reserves a test instance for 12 hours and writes it into `.env.local`. Its cell `cell` gets a virtual UR5e. The instance provider URL can also come from an `instanceProviderConfig.json` file:

```
{
  "url": "yourURL"
}
```

.env.local file:

```
WANDELAPI_BASE_URL=http://<instance-ip>
```

### Playground

The playground (`playground/`) is a small Vite app that shows the parts of the library on a NOVA instance. It has no mock data. It imports the library from `src/`, so a change shows at once. It is not part of the npm package.

```bash
pnpm playground           # dev server on http://localhost:5180
pnpm playground:build     # builds playground/dist
pnpm playground:preview   # serves playground/dist on http://localhost:4180
```

Vite reads these values when it starts (see [A NOVA instance](#a-nova-instance)). `CELL_ID` in the environment selects the cell (default `cell`). The cell needs a robot: without a motion group, the playground shows `NoMotionGroupModal`.

The pages are Jogging, Joint limits, Safety and collisions, Robot models and Building blocks. Each page combines parts that work together. The app menu of the `AppHeader` switches the pages, and the URL selects the page and the motion group, for example `?page=jogging&motionGroup=0@ur5e`. The dev server uses React StrictMode, so a part that leaves a connection open shows up.

The built playground contains the URL and the access token of the instance: never publish or upload `playground/dist`.

### Tests

```bash
pnpm test:unit          # unit tests in src/ (vitest, jsdom), in watch mode
pnpm test:unit:run      # the same, one run (the check "test" of each pull request)
pnpm test:consumer      # builds the package and imports it as an app does
pnpm test:e2e           # against a NOVA instance, see "e2e Tests"
pnpm test:playground    # against a NOVA instance, see "e2e Tests"
```

`pnpm api:check` compares the public API with the reports in `etc/api-extractor/`. After an intended change of the public API, `pnpm api:update` writes the reports again; commit them with the change. [etc/public-names.md](etc/public-names.md) lists every public name and why it is public (`pnpm api:names` writes it).

### e2e Tests

The e2e tests run against a real NOVA instance. There are two kinds:

- The vitest tests in `e2e/` test the NOVA connections of the library (motion state, jogging), without a browser.
- The Playwright tests in `e2e/playground/` test the playground app in Chromium. First they add a virtual robot with 2 safety zones and a stored collision setup to the cell. Then they open each page of the playground, jog the robot, check the values, the 3D view and the safety bar, and take screenshots. At the end, they remove the robot and the collision setup again.

Both kinds use the same instance values:

- `NOVA_INSTANCE_URL`, and `NOVA_ACCESS_TOKEN` for a cloud instance, or
- `WANDELAPI_BASE_URL` in `.env.local`, which `pnpm td` writes for a test instance (see above).

Without an instance, the tests fail. To run them on your computer:

```bash
pnpm exec playwright install chromium  # once, for the Playwright tests
pnpm run test:e2e                      # vitest
pnpm run test:playground               # builds the playground, then runs Playwright
```

The built playground (`playground/dist`) contains the URL and the access token of the instance, so `test:playground` builds it again each time. Never publish or upload it. The browser calls the instance through the server of the playground, which forwards `/api` to the instance, so a cloud instance works too (it does not allow requests from another origin). The results and the screenshots of the Playwright tests are in `e2e-results/`.

For each pull request, the workflow `e2e` creates a NOVA cloud instance with the newest released NOVA version, runs both kinds of tests, and deletes the instance again. The results are in the artifact `e2e-results` of the run: the output and the reports of the tests, the screenshots of the playground (`screenshots/`), and the state of the instance after the tests. The summary of the job lists the tests and the screenshots.

### Local Testing

Build and test the package locally:

```bash
pnpm build
pnpm pack
pnpm add /path/to/wandelbots-wandelbots-js-react-components-x.x.x.tgz
```

> **Note:** Use `pnpm add` with the `.tgz` file instead of `pnpm link` due to peer dependency requirements with React Three Fiber components.

## Contributing

We welcome contributions! Please see our contributing guidelines and feel free to submit issues and pull requests. The checks before a pull request and the rules for commit messages are in [AGENTS.md](AGENTS.md).

## License

This project is licensed under the terms specified in the LICENSE file.

---

[Visit Wandelbots.com](https://www.wandelbots.com/)
