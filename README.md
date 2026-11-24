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

The parts use the theme of your app. Create it with `createNovaMuiTheme` of `@wandelbots/mui`:

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
- **`/core`** — The parts without 3D (jogging, `SafetyBar`, `AppHeader`, `LoadingCover`, `NoMotionGroupModal`), the NOVA connections and `JoggingStore`, the motion state helpers and `i18n`.
- **`/3d`** — The 3D parts (`Robot`, `MotionGroupVisualizer`, `SafetyZonesRenderer`, …). Requires in addition three, three-stdlib, @react-three/fiber and @react-three/drei.
- **`/nats`** — A robot's live controller state over NOVA's NATS server (`natsControllerStateSource`, `natsUrlOf`), a source for `ControllerStateStream` of `/core` instead of its websocket (`controllerStateWebsocket`). Requires in addition nats.ws; no other entry point loads it.
- **`/SafetyBar`** — Only `SafetyBar` (also as the default export).
- **`/JoggingGizmo`** — Only `JoggingGizmo` (also as the default export) and `JoggingGizmoOrientation`. Requires in addition three and @react-three/fiber.
- **`/JoggingButtons`** — Only `JoggingButtons` (also as the default export). No 3D packages needed.
- **`/JoggingJointSlider`** — Only `JoggingJointSlider` (also as the default export). No 3D packages needed.
- **`/RobotControlPanel`** — The whole Robot control panel, `RobotControlPanel` (also as the default export). It shows the jog gizmo, so it requires in addition three and @react-three/fiber, as `/JoggingGizmo` does.

A component's own entry point brings only what that component needs, e.g. `/JoggingButtons` no three.js and no NOVA client, unlike `/core`. The entry points share their common code, so an app that imports a component from both `/core` and its own entry point gets one copy of it:

```tsx
import JoggingJointSlider from "@wandelbots/wandelbots-js-react-components/JoggingJointSlider"
```

### Peer dependencies

| Package | Version |
| --- | --- |
| `react`, `react-dom` | ^19 |
| `@mui/material`, `@mui/icons-material` | ^7 |
| `@emotion/react`, `@emotion/styled` | ^11 |
| `@wandelbots/mui` | ^2 |
| `mobx` | ^6.13.6 |
| `mobx-react-lite` | ^4.1.0 |
| `three` (only `/3d`, `/JoggingGizmo`, `/RobotControlPanel`) | >=0.182 |
| `three-stdlib` (only `/3d`) | >=2 |
| `@react-three/fiber` (only `/3d`, `/JoggingGizmo`, `/RobotControlPanel`) | ^9 |
| `@react-three/drei` (only `/3d`) | ^10 |
| `nats.ws` (only `/nats`) | ^1.30.3 |

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
<Robot motionGroup={robotModelOf(session)} />
load.dispose()
```

What changes besides the names:

- **Loading:** `loadRobotSession` returns at once. `load.state` ("loading", "ready", "failed") and `load.progress` tell how far it is, `load.retry()` loads again after a failure, `await load.ready` gives the session. A failed step is retried on its own, after 1 and 2 seconds unless `retryDelaysMs` says otherwise.
- **Jogging comes with it:** `session.jogging` is the robot's `JoggingStore`. An app no longer opens it with `JoggerConnection.open` and `JoggingStore.loadFor`. It starts no jog while the robot may not move (`safety.canBeMoved` is false, so also while the robot is activating): the start rejects with a `JoggingRefusedError`.
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
| `mountingPosition`, `mountingQuaternion` | `robotModelOf(session)` of `/3d` (metres and a quaternion), or `description.mounting` (mm and a rotation vector) |
| `rapidlyChangingMotionState` | `state.rapidlyChangingMotionState` |
| `controllerState` | `state.controllerState` |
| `initialMotionState`, `controller`, `motionGroup`, `motionStateSocket` | No replacement: the session keeps its connections. Read `state` instead. |
| `activationState` | `activation.state` |
| `activate()`, `deactivate()`, `toggleActivation()` | `activation.activate()`, `activation.deactivate()`, `activation.toggle()` |
| `isEstopActive`, `isMoveableSafetyState`, `isMoveableOperationMode`, `canBeMoved` | `safety.isEstopActive`, `safety.isMoveableSafetyState`, `safety.isMoveableOperationMode`, `safety.canBeMoved`; why the robot may not move: `safety.notMoveableReason` |
| `joggingVelocity`, `joggingVelocityRads`, `setJoggingVelocity()` | The velocities of `jogging`: `rotationVelocityDegPerSec`, `rotationVelocityRadsPerSec`, `translationVelocityMmPerSec`, `setVelocityFromSlider()` |
| `connectedJoggingSocket`, `planData` | No replacement (unused) |
| `dispose()` | `load.dispose()`, or `session.dispose()` |
| `<Robot connectedMotionGroup={…}>`, `<LinearAxis connectedMotionGroup={…}>` | `<Robot motionGroup={robotModelOf(session)}>`, the same for `LinearAxis`. `motionGroup` also takes a `ConnectedMotionGroup`, or the app's own data (see `RobotModelSource`). |

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

**JoggingPanel** - Complete jogging interface with cartesian and joint controls

- Dual-mode operation (Cartesian & Joint space)
- Real-time velocity control
- Multiple coordinate systems support (Robot base or Tool)

**Individual Jogging Controls**

- **JoggingCartesianAxisControl** - Single-axis cartesian movement
- **JoggingJointValueControl** - Individual joint controls
- **VelocitySlider** (and **VelocitySliderLabel**) - Speed adjustment interface
- **JoggingStore** - The state of the jogging (velocity, coordinate system, the jogging connection). `JoggingPanel` gives it to `onSetup`, and `JoggingStore.loadFor` creates one for your own controls. It also jogs for them: `startCartesianJogging(motion, axis, direction)` or `startJointJogging(joint, direction)` when a control is pressed and `stopJogging()` when it is let go, and `runIncrementalCartesianJog(motion, axis, direction, increment)` for one step. The store keeps the order that hold-to-jog needs: a press that ends before the jogging connection is ready moves nothing, and one step runs at a time. While the store is locked, or its owner says that the robot may not move (the option `notMoveableReason`, which a `RobotSession` gives its store), it starts no jog: the start rejects with a `JoggingRefusedError`, whose `reason.code` says why.

**JoggingGizmo** and **JoggingGizmoOrientation** (from `/3d` or `/JoggingGizmo`) - Jogging by the axes of the jog frame as the camera of the 3D view sees them: orbit the view and the gizmo turns with it, so the arrow pointing right on screen moves the robot right on screen. Hold a handle to jog.

- The gizmo draws in its own small canvas, so it can sit in a panel next to the 3D view. `JoggingGizmoOrientation` goes inside the app's `<Canvas>` and passes the camera's view to the gizmo through a shared ref. Until it has, the gizmo stays disabled.
- `JoggingGizmoOrientation` goes anywhere in the scene. It follows the camera's up: in a scene that is Y up, like that of this library's robots, it translates NOVA's axes (Z up), so NOVA's Z is the scene's Y. In a scene that is Z up like NOVA's world, whose camera has Z up, it takes NOVA's axes as they are.
- `frameQuaternion` of `JoggingGizmo` is the frame the gizmo jogs along, in NOVA's coordinates: by default NOVA's world frame. The app gives it to the gizmo where it picks the frame, e.g. "Move along the axes of: Tool". Only the camera's view comes from the 3D scene. A frame that turns, such as the tool's, can be a function: the gizmo calls it every animation frame.
- `motion` is `"translate"` (arrows, the default) or `"rotate"`: a circle about each axis with an arc per direction, whose arrowhead shows the way it turns (`+` counterclockwise seen from the tip of the axis). The handles are named as the jog buttons: "Jog X+", or "Jog Rx+" when rotating. A jog that runs when `motion` changes stops.
- The gizmo moves nothing itself: `onJogStart(axis, direction)` and `onJogStop` leave that to the app, in the frame it jogs in. The app knows its `motion`, so it knows whether to move along the axis or turn about it.
- A press jogs along the arrow drawn where it lands. Where a press could not tell two handles apart, it jogs neither: an arrow that points (almost) at or away from the viewer, or the farther of two arrowheads drawn over each other. The keyboard reaches every handle by its name.
- When rotating, a press turns the way the arc drawn there points: an arc is grabbed anywhere along it, an arrowhead above everything else. Where two arcs cross, the one drawn nearer there takes the press. An axis seen (almost) edge on, whose arcs lie over each other, takes no press.

```tsx
const orientation = useRef<Quaternion | null>(null)

<Canvas>
  {/* … the 3D view with the robot */}
  <JoggingGizmoOrientation target={orientation} />
</Canvas>

<JoggingGizmo
  orientation={orientation}
  frameQuaternion={jogFrame} // optional: NOVA's world frame by default
  motion={motion} // "translate" or "rotate"
  onJogStart={(axis, direction) =>
    motion === "rotate"
      ? startRotating(axis, direction)
      : startJogging(axis, direction)
  }
  onJogStop={() => stopJogging()}
/>
```

**JoggingButtons** (from `/core` or `/JoggingButtons`) - Jogging by buttons: a row per axis with a minus and a plus button, held to jog (X-, X+; or Rx-, Rx+ when `motion` is `"rotate"`). It takes the same props as `JoggingGizmo` (`JogControlsProps`: `motion`, `onJogStart`, `onJogStop`, `activeHandle`, `disabled`), so an app wires both the same way and can offer both. Unlike the gizmo, the buttons do not turn with the 3D view: X+ is X+ of the jog frame, wherever the camera looks from. They draw nothing in 3D, so they need no `<Canvas>` and no `JoggingGizmoOrientation`.

```tsx
<JoggingButtons
  motion={motion} // "translate" or "rotate"
  onJogStart={(axis, direction) =>
    motion === "rotate"
      ? startRotating(axis, direction)
      : startJogging(axis, direction)
  }
  onJogStop={() => stopJogging()}
/>
```

**JoggingJointSlider** (from `/core` or `/JoggingJointSlider`) - One joint as a slider across its limits, with the thumb at the joint's value and the limits below; an app shows one per joint. Hover the track to see the goal under the pointer, and press there to jog the joint toward it: it stops when it gets there or when the slider is let go. While held, the goal follows the pointer, and the joint turns around when the goal passes it. An arrow key held on the focused slider jogs toward that limit.

- `value`, `min` and `max` are in NOVA's units: radians, or mm with `linear`. A revolute joint with one limit spans one turn from it, and without limits the turn it stands in. A linear axis needs both limits to be jogged with the slider; without them it only shows its value. `angleUnit` shows degrees (default) or radians.
- `onJogStart(direction)` and `onJogStop` leave the jogging to the app, as for `JoggingGizmo` and `JoggingButtons`. One press can bring several starts and stops, always in turn: the joint stops at the goal, and starts again when the goal moves on. When the goal passes the joint, `onJogStop` and the `onJogStart` of the other way come in the same event: an app with asynchronous jog commands must apply them in that order, and must not tear down its jogging connection on that stop.
- One joint at a time is up to the app. Keep the jogging joint in a ref, which changes at once, and ignore the others' calls: `disabled` alone changes only with the next render, too late for two fingers that move in the same frame.

```tsx
const jogging = useRef<number | null>(null)
const [active, setActive] = useState<number | null>(null)

{jointValues.map((value, index) => (
  <JoggingJointSlider
    key={index}
    label={`J${index + 1}`}
    value={value}
    min={limits[index].lower_limit}
    max={limits[index].upper_limit}
    onJogStart={(direction) => {
      if (jogging.current !== null && jogging.current !== index) return
      jogging.current = index
      setActive(index)
      startJointJogging(index, direction)
    }}
    onJogStop={() => {
      if (jogging.current !== index) return
      jogging.current = null
      setActive(null)
      stopJogging()
    }}
    // Shows the others as unavailable; the ref does the excluding
    disabled={active !== null && active !== index}
  />
))}
```

**RobotControlPanel** (from `/3d` or `/RobotControlPanel`) - The Robot control panel of the design, built from the parts above: the tabs Translate and Rotate, with the TCP and the frame to jog along, Continuous or Increment, the velocity, the step size, and the gizmo or the buttons with a switch between them; the tab Joint, with a `JoggingJointSlider` per joint and the joint velocity; and the tab Move to, with a typed target pose (or the current one), the frame it is relative to, and a button to hold to move there. An app that wants the whole panel imports this; an app that wants one part imports that part.

- It moves nothing itself, as its parts: `onJogStart(motion, axis, direction)` and `onJogStop` for jogging while held, and `increments.onStep(motion, axis, direction, distance)` for one step per press. The app keeps the velocity and the selects in its own store; the panel keeps the tab, the mode, the step size and the view.
- Velocities and step sizes are in NOVA's units: mm and mm/s to translate, rad and rad/s to rotate. The panel shows mm/s and °/s.
- `tcp` and `jogFrame` show a select each, filled by the app. Without `increments`, there is no Continuous/Increment toggle. Without `gizmoOrientation` (from a `JoggingGizmoOrientation` in the app's 3D scene), it jogs with buttons only.
- `onJogStop` also comes when the tab, the mode or the view changes while a control is held: the jog of that press must not go on.
- `disabled` turns off every control: nothing may move. `jogDisabled` turns off only the jogging of Translate, Rotate and Joint, e.g. while a trajectory moves the robot; Move to stays usable, so a move of its own does not end when the app locks jogging during it.
- The panel keeps its tab, jog mode and step size itself. An app that keeps them in its own store (to remember them, or because its jogging depends on them) gives `tab`, `jogMode` and `increments.step`, and gets `onTabChange`, `onJogModeChange` and `increments.onStepChange`; each also works alone, to follow a choice without keeping it.
- `joints` gives the Joint tab: the joints' values and limits (rad, or mm with `linear`), their names, the joint velocity, and `onJogStart(index, direction)` and `onJogStop`. The panel jogs one joint at a time; the turn-around of a slider brings `onJogStop` and `onJogStart` in the same event, as described for `JoggingJointSlider`. Without `joints`, there is no Joint tab.
- `moveTo` gives the Move to tab. It works as RobotPad's pose field: the coordinates `(x, y, z, rx, ry, rz)` (mm, rotation vector in rad: the format RobotPad copies and pastes) show the TCP's current pose (`getCurrentPose`, read every animation frame), with Copy and Edit pose, and Move to, off until a pose is the target. Edit pose, or a click on the field, makes it editable; Save pose edit (Enter) makes the typed pose the target (`onTargetChange(pose)`): the app plans the move and loads it, and reports `state` (`"planning"`, `"planned"`, `"moving"`, `"stopping"` or `"idle"`, as RobotPad's trajectory) and an `error` (e.g. out of reach). Then Reset shows. Held for 200 ms while `"planned"`, Move to calls `onMoveStart(pose)`, the release `onMoveStop`: the app starts and pauses its trajectory; the button says Moving… and Stopping…. At the target (within 0.5 mm and 0.01 rad) it turns off; once the move no longer runs, the field shows the current pose again (`onTargetChange(null)`), as do Reset, another tab and another TCP or frame (a held move gets its `onMoveStop` first). While another pose is typed, Move to stays off. `frame` is the "Relative to" select. It moves with `velocity.translate`. Without `moveTo`, there is no Move to tab.

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
    onTargetChange: (pose) => planAndLoad(pose), // or drop the plan (null)
    state: trajectoryState, // "planning" | "planned" | "moving" | "stopping" | "idle"
    error,
    onMoveStart: () => startTrajectory(),
    onMoveStop: () => pauseTrajectory(),
  }}
/>
```

### 3D Visualization & Robotics

3D components for robot visualization. They render inside the `<Canvas>` of React Three Fiber.

**Robot** - Real-time 3D robot rendering

- Takes the robot as plain data (`RobotModelSource`): `robotModelOf(session)` of a `RobotSession`, a `ConnectedMotionGroup`, or the app's own data
- Live pose updates from its motion state, at its mounting
- The model of the motion group from the NOVA instance (`defaultGetModel`)

**LinearAxis** - The same for a linear axis

**SupportedRobot**, **SupportedLinearAxis** and **MotionGroupVisualizer** - The same with single props: they take a motion state, the model name and the DH parameters. `MotionGroupVisualizer` picks the robot or the linear axis. The `…Exact` variants show the pose without smoothing.

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

### App Frame

- **AppHeader** - Application header with an app menu
- **LoadingCover** (and **LoadingErrorMessage**) - A loading screen, with the error when the loading fails
- **NoMotionGroupModal** - A modal for a cell without a motion group

### Logic

- **loadRobotSession** and **RobotSession** - A robot of a cell, loaded and connected: its description, live state, safety, activation, jogging and Move to
- **ConnectedMotionGroup** (deprecated, see [From ConnectedMotionGroup to RobotSession](#from-connectedmotiongroup-to-robotsession)) - A motion group with its live motion state, safety state and operation mode
- **MotionStreamConnection** and **JoggerConnection** - The motion state stream and the jogging connection of a motion group
- **jointValuesEqual**, **poseEqual**, **tcpMotionEqual**, **unwrapRotationVector** - Helpers for the motion state
- **ValueInterpolator**, **useInterpolation**, **useSmoothedMotionState** - Smooth joint values for the 3D view
- **i18n** - The translations of the library

## Architecture & Integration

### Connecting to NOVA

Components integrate with the Wandelbots Nova ecosystem:

- **NovaConnection** - Where the library connects to NOVA (`nova` of `JoggingPanel`, `loadRobotSession`, `ConnectedMotionGroup.connect`, `MotionStreamConnection.open`, `JoggerConnection.open`, `defaultGetModel`), it takes a `NovaConnection`: the URL of the instance, or the NOVA client of the app (`Nova` of `@wandelbots/nova-js`, of any version). The library reads only the URL and the access token of the client, and connects with its own client (nova-js 4.13.0). So the app configures the connection in one place.
- **Real-time Updates** - WebSocket connections for live robot state updates
- **Motion Group Management** - One `RobotSession` per robot (`ConnectedMotionGroup` in earlier versions)
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

The pages are Jogging, Joint limits, Safety and collisions, Robot models, Layouts and Building blocks. Each page combines parts that work together. Layouts puts `RobotControlPanel` and `CurrentPoseBar` over the robot's 3D view as the Figma design does; Building blocks shows the smaller parts alone. The app menu of the `AppHeader` switches the pages, and the URL selects the page and the motion group, for example `?page=jogging&motionGroup=0@ur5e`. The dev server uses React StrictMode, so a part that leaves a connection open shows up.

The built playground contains the URL and the access token of the instance: never publish or upload `playground/dist`.

### Tests

```bash
pnpm test:unit          # unit tests in src/ (vitest, jsdom), in watch mode
pnpm test:unit:run      # the same, one run (the check "test" of each pull request)
pnpm test:consumer      # builds the package and imports it as an app does
pnpm test:e2e           # against a NOVA instance, see "e2e Tests"
pnpm test:playground    # against a NOVA instance, see "e2e Tests"
```

`pnpm api:check` compares the public API with the reports in `etc/api-extractor/`. After an intended change of the public API, `pnpm api:update` writes the reports again; commit them with the change.

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
