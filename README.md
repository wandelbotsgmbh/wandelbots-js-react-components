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
- **`/SafetyBar`** — Only `SafetyBar` (also as the default export).

### Peer dependencies

| Package | Version |
| --- | --- |
| `react`, `react-dom` | ^19 |
| `@mui/material`, `@mui/icons-material` | ^7 |
| `@emotion/react`, `@emotion/styled` | ^11 |
| `@wandelbots/mui` | ^2 |
| `mobx` | ^6.13.6 |
| `mobx-react-lite` | ^4.1.0 |
| `three` (only `/3d`) | >=0.182 |
| `three-stdlib` (only `/3d`) | >=2 |
| `@react-three/fiber` (only `/3d`) | ^9 |
| `@react-three/drei` (only `/3d`) | ^10 |

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
- **JoggingStore** - The state of the jogging (velocity, coordinate system, the jogging connection). `JoggingPanel` gives it to `onSetup`, and `JoggingStore.loadFor` creates one for your own controls.

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

### App Frame

- **AppHeader** - Application header with an app menu
- **LoadingCover** (and **LoadingErrorMessage**) - A loading screen, with the error when the loading fails
- **NoMotionGroupModal** - A modal for a cell without a motion group

### Logic

- **ConnectedMotionGroup** - A motion group with its live motion state, safety state and operation mode
- **MotionStreamConnection** and **JoggerConnection** - The motion state stream and the jogging connection of a motion group
- **jointValuesEqual**, **poseEqual**, **tcpMotionEqual**, **unwrapRotationVector** - Helpers for the motion state
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
