# @wandelbots/wandelbots-js-react-components

[![NPM version](https://img.shields.io/npm/v/@wandelbots/wandelbots-js-react-components.svg)](https://npmjs.org/package/@wandelbots/wandelbots-js-react-components) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@wandelbots/wandelbots-js-react-components)](https://bundlephobia.com/package/@wandelbots/wandelbots-js-react-components) [![Release](https://github.com/wandelbotsgmbh/wandelbots-js-react-components/actions/workflows/release.yml/badge.svg)](https://github.com/wandelbotsgmbh/wandelbots-js-react-components/actions/workflows/release.yml) [![](https://img.shields.io/badge/-storybook-%23ff69b4)](https://wandelbotsgmbh.github.io/wandelbots-js-react-components)

React UI components for building robotics applications on the [Wandelbots Nova platform](https://www.wandelbots.com/).

Built with TypeScript, Material-UI, and React Three Fiber. Provides robot control interfaces, 3D visualizations, and automation components that integrate with the Nova ecosystem.

## Interactive Documentation

See the [Storybook](https://wandelbotsgmbh.github.io/wandelbots-js-react-components) for interactive examples and API documentation.

## Install

```bash
npm install @wandelbots/wandelbots-js-react-components react react-dom @mui/material @emotion/react @emotion/styled
```

Some modules require extra dependencies, like three.js. If you don't need 3D rendering in your application, always import from `/core`.

```typescript
import {
  SafetyBar,
  JoggingPanel,
  DataGrid,
  Timer,
} from "@wandelbots/wandelbots-js-react-components/core"
```

For 3D-enabled components, use `/3d`:

```typescript
import { Robot, RobotCard } from "@wandelbots/wandelbots-js-react-components/3d"
```

For the code editor, use `/wandelscript`:

```typescript
import { WandelscriptEditor } from "@wandelbots/wandelbots-js-react-components/wandelscript"
```

You can also import from the top-level package, but then you'll need to provide all optional dependencies:

```bash
npm install @wandelbots/wandelbots-js-react-components \
 react react-dom \
 @mui/material @mui/icons-material @emotion/react @emotion/styled \
 three @react-three/fiber @react-three/drei three-stdlib \
 @monaco-editor/react shiki @shikijs/monaco
```

**Available Entry Points:**

| Entry Point         | Components                                                                                                                | Required Peer Dependencies                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Main** (`.`)      | All components                                                                                                            | React 18+, MUI v6/v7, @emotion/react, @emotion/styled, @mui/icons-material + all below |
| **`/core`**         | Base components (AppHeader, ProgramControl, SafetyBar, VelocitySlider, JoggingPanel, DataGrid, Timer, themes, i18n, etc.) | React 18+, MUI v6/v7, @emotion/react, @emotion/styled, @mui/icons-material             |
| **`/3d`**           | 3D visualization (Robot, RobotCard, CollisionSceneRenderer, SafetyZonesRenderer, TrajectoryRenderer)                      | All from `/core` + three, @react-three/fiber, @react-three/drei, three-stdlib          |
| **`/wandelscript`** | Code editor (WandelscriptEditor)                                                                                          | All from `/core` + @monaco-editor/react, shiki, @shikijs/monaco                        |

## 4.x Core Changes

Robot data is now fetched from a running nova instance. This eliminates the need of shipping every react application with the robot data attached.

It is still possible to fetch robot data from local files. (See https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/3d-view-robot-robot--docs)

The `wandelbots-js-react-components` library can be used both with and without a Nova connection. For details on connecting to a Nova instance, see the [Robot Model Testing](#robot-model-testing) section below.

The list of available robots will now be automatically updated along with the nova version. There is no more need to update nova apps whenether there is a new supported robot the app wants to feature.

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

## 2.x to 3.x Migration Guide

See [Migration Guide](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/migration-guide--docs) for assistance.

## Components

### Robot Control & Jogging

Manual robot control interfaces.

**[JoggingPanel](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/jogging-joggingpanel--docs)** - Complete jogging interface with cartesian and joint controls

- Dual-mode operation (Cartesian & Joint space)
- Real-time velocity control
- Multiple coordinate systems support (Robot base or Tool)

**Individual Jogging Controls**

- **[JoggingCartesianAxisControl](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/jogging-joggingcartesianaxiscontrol--docs)** - Single-axis cartesian movement
- **[JoggingJointRotationControl](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/jogging-joggingjointrotationcontrol--docs)** - Individual joint controls
- **[VelocitySlider](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/jogging-velocityslider--docs)** - Speed adjustment interface

### Program Execution

Program control and monitoring components.

**[ProgramControl](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/components-programcontrol--docs)** - Program lifecycle management

- Play, pause, stop functionality
- State machine integration
- Manual reset capabilities

**[ProgramStateIndicator](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/components-programstateindicator--docs)** - Visual program status

- Live execution state monitoring
- Error state visualization

### 3D Visualization & Robotics

3D components for robot visualization.

**[Robot](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/3d-view-robot--docs)** - Real-time 3D robot rendering

- Live pose updates from motion groups
- Extensive robot model support from major manufacturers
- [Supported Models](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/story/3d-view-robot-supported-models--abb-1010-037-15) - ABB, FANUC, KUKA, Universal Robots, Yaskawa (100+ models)
- Automatic model loading from CDN

**[SafetyZonesRenderer](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/3d-view-safetyzonesrenderer--docs)** - 3D safety visualization

- Real-time safety zone rendering
- Visual collision boundaries

**[TrajectoryRenderer](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/3d-view-trajectoryrenderer--docs)** - Motion path visualization

- Real-time trajectory display
- Path planning visualization

### Safety & Monitoring

Safety components for production environments.

**[SafetyBar](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/safety-safetybar--docs)** - Centralized safety status

- Real-time safety monitoring
- Emergency stop integration

### Code Editing

Code editing capabilities for robot programming.

**[WandelscriptEditor](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/wandelscript-wandelscripteditor--docs)** - Code editor

- Monaco editor integration
- Wandelscript syntax highlighting
- IntelliSense support

### Data & Interface Components

UI components for data display and user interaction.

**Data Components**

- **[DataGrid](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/components-datagrid--docs)** - Data tables with robotics data formatting
- **[LogPanel](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/components-logpanel--docs)** - Real-time log display and filtering
- **[CycleTimer](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/components-cycletimer--docs)** - Production cycle timing and metrics

**Robot Management**

- **[RobotCard](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/components-robotcard--docs)** - Robot overview cards with status
- **[RobotListItem](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/components-robotlistitem--docs)** - List view for multiple robots
- **[RobotSetupReadinessIndicator](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/components-robotsetupreadinessindicator--docs)** - Setup validation status

**Navigation**

- **[AppHeader](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/navigation-appheader--docs)** - Application header with branding
- **[TabBar](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/navigation-tabbar--docs)** - Multi-section navigation

### Theming & Styling

Styling system for consistent robotics applications.

**[Theming components](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/theming-theming-components--docs)** - Interactive theming examples

- Component theming demonstrations
- Customization patterns

**[Wandelbots MUI Theme](https://wandelbotsgmbh.github.io/wandelbots-js-react-components/?path=/docs/theming-wandelbots-mui-theme--docs)** - Material-UI theme

- Dark/light mode support
- Robotics-specific color schemes
- Material Design integration

## Architecture & Integration

### Nova Platform Integration

Components integrate with the Wandelbots Nova ecosystem:

- **NovaClient Integration** - Components accept either `NovaClient` instances or URL strings
- **Real-time Updates** - WebSocket connections for live robot state updates
- **Motion Group Management** - Direct integration with `ConnectedMotionGroup` objects
- **State Synchronization** - Automatic state management with MobX reactivity

### Technical Foundation

- **TypeScript** - Full type safety and enhanced developer experience
- **Material-UI v6/v7** - Professional design system and theming
- **React Three Fiber** - High-performance 3D rendering for robotics visualization
- **MobX** - Reactive state management for real-time updates
- **i18next** - Internationalization support for global deployment

## Installation & Setup

### Prerequisites

**Required for all entry points:**

- React 18+ or 19+
- Material-UI v6 or v7
- @emotion/react and @emotion/styled

### Additional Peer Dependencies

**For `/3d` (3D visualization components):**

- three
- @react-three/fiber
- @react-three/drei
- three-stdlib

**For `/wandelscript` (code editor):**

- @monaco-editor/react

## Development

To set up the project for development:

```bash
git clone https://github.com/wandelbotsgmbh/wandelbots-js-react-components.git
cd wandelbots-js-react-components
npm install
npm run dev  # Start Storybook development server
```

## Robot Model Testing

View Robot Models in web view:

```bash
git clone https://github.com/wandelbotsgmbh/wandelbots-js-react-components.git
cd wandelbots-js-react-components
npm install
npm run td <instanceProviderURL> # instanceProviderURL can be provided via an instanceProviderConfig.json file. The entire command can be substituted by writing a nova instance ip into a file named .env.local
npm run dev  # Start Storybook development server
```

instanceProviderConfig.json file:
```
{
  "url": "yourURL"
}
```

.env.local file:
```
WANDELAPI_BASE_URL=http://<instance-ip>
CELL_ID=cell
```

### Local Testing

Build and test the package locally:

```bash
npm run build
npm pack
npm install /path/to/wandelbots-wandelbots-js-react-components-x.x.x.tgz
```

> **Note:** Use `npm install` with the `.tgz` file instead of `npm link` due to peer dependency requirements with React Three Fiber components.

## Contributing

We welcome contributions! Please see our contributing guidelines and feel free to submit issues and pull requests.

## License

This project is licensed under the terms specified in the LICENSE file.

---

[Explore the Storybook](https://wandelbotsgmbh.github.io/wandelbots-js-react-components) • [Visit Wandelbots.com](https://www.wandelbots.com/)
