# @wandelbots/wandelbots-js-react-components

[![NPM version](https://img.shields.io/npm/v/@wandelbots/wandelbots-js-react-components.svg)](https://npmjs.org/package/@wandelbots/wandelbots-js-react-components) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@wandelbots/wandelbots-js-react-components)](https://bundlephobia.com/package/@wandelbots/wandelbots-js-react-components) [![Release](https://github.com/wandelbotsgmbh/wandelbots-js-react-components/actions/workflows/release.yml/badge.svg)](https://github.com/wandelbotsgmbh/wandelbots-js-react-components/actions/workflows/release.yml) [![](https://img.shields.io/badge/-storybook-%23ff69b4)](https://wandelbotsgmbh.github.io/wandelbots-js-react-components)


A growing collection of ready-made React UI components based on MaterialUI and React Three Fiber for use with the Wandelbots platform.

```bash
npm install @wandelbots/wandelbots-js-react-components
```

### Basic usage:

Import your desired components or functions from the package:

```jsx
import { WandelscriptEditor, ... } from '@wandelbots/wandelbots-js-react-components'
```

### Index

<table>
  <tr>
    <td valign="top">
      <ul>
        <li><a href="#wandelscript">Wandelscript</a></li>
        <ul>
          <li><a href="#joggingpanel">JoggingPanel</a></li>
          <li><a href="#wandelscripteditor">WandelscriptEditor</a></li>
        </ul>
        <li><a href="#viewport">3D Viewport</a></li>
        <ul>
          <li><a href="#robot">Robot</a></li>
          <li><a href="#lightning">Lightning</a></li>
          <li><a href="#safety">Safety Zones</a></li>
        </ul>
      </ul>
    </td>
  </tr>
</table>

### Wandelscript

#### JoggingPanel

The JoggingPanel is a high-level user interface for manually moving a robot using the Wandelbots stack. It needs only a `NovaClient` instance from [wandelbots-js](https://github.com/wandelbotsgmbh/wandelbots-js) and the id of a motion group to connect to.

```tsx
type JoggingPanelProps = {
  /** Connection to a Nova instance to use for jogging */
  nova: NovaClient
  /** Id of the motion group to move e.g. 0@ur5e **/
  motionGroupId: string
  /** Callback with the jogging panel's state store for further customization/config */
  onSetup: (store: JoggingStore) => void
  /** Any children will go at the bottom of the panel under the default components */
  children?: React.ReactNode
}
```

#### WandelscriptEditor

The WandelscriptEditor provides an interface for editing snippets of Wandelscript code with the appropriate syntax highlighting. It uses the [Monaco](https://microsoft.github.io/monaco-editor/) editor under the hood.

```tsx
type WandelscriptEditorProps = {
  /** The current Wandelscript content of the code editor (controlled component) */
  code?: string
  /** What to do when the user edits the code */
  onChange?: (
    code: string | undefined,
    ev: editor.IModelContentChangedEvent,
  ) => void
  /** Callback to further configure monaco on startup if needed */
  monacoSetup?: (monaco: Monaco) => void
}
```

### Viewport

#### Robot

<img width="20%" alt="Screenshot 2024-08-08 at 14 17 55" src="https://github.com/user-attachments/assets/da661136-8b53-48ba-85de-63b09e3b51f3">

This `Robot` component adds the robot to the 3D viewport. Use it together with the `connectedMotionGroup` from `@wandelbots/wandelbots-js`.

```tsx
<Robot connectedMotionGroup={connectedMotionGroup} />
```

The robot model are loaded from the [jsdelivr CDN](https://cdn.jsdelivr.net/gh/wandelbotsgmbh/wandelbots-js-react-components/public/models/).

In case you want to use the application offline, you can download the models and host them locally. You can override the URL resolver of the `Robot` component by passing a `getModel` function like:

```tsx
<Robot
  getModel={() => `public/${connectedMotionGroup.modelFromController}.glb`}
  connectedMotionGroup={connectedMotionGroup}
/>
```

```tsx
export type ConnectecMotionGroupRobotProps = {
  connectedMotionGroup: ConnectedMotionGroup // The connected motion group from wandelbots-js
  getModel?: (modelFromController: string) => string // A function that returns the URL of the robot model
  isGhost?: boolean // Whether the robot should be displayed transparently
} & GroupProps
```

##### SupportedRobot

The `SupportedRobot` can be used to display a robot model without the need for a `connectedMotionGroup` from `@wandelbots/wandelbots-js`.

```tsx
<SupportedRobot
  rapidlyChangingMotionState={rapidlyChangingMotionState}
  dhParameters={dhParameters as any}
  modelFromController={modelFromController || ""}
  getModel={() => `./robot-pad/models/${modelFromController}.glb`}
/>
```

```tsx
export type SupportedRobotProps = {
  rapidlyChangingMotionState: MotionGroupStateResponse // The motion state of the robot
  modelFromController: string // The model name of the robot
  dhParameters: DHParameter[] // The DH parameters of the robot
  getModel?: (modelFromController: string) => string // A function that returns the URL of the robot model
  isGhost?: boolean // Whether the robot should be displayed transparently
} & GroupProps
```

#### Lighting

The `PresetEnvironment` component adds a default lighting setup to the 3D viewport.

```tsx
<PresetEnvironment>
```

#### Safety

The `SafetyZonesRenderer` component visualizes the safety zones of the controller.

```tsx
<SafetyZonesRenderer safetyZones={connectedMotionGroup.safetyZones || []} />
```

## Contributing

To set up wandelbots-js-react-components for development, first clone the repo and run:

```bash
npm install
```

Then you can run the storybook to develop the components:

```bash
npm run dev
```

### Local Testing

To test the package locally, you can run:

```bash
npm run build
npm pack
```

this will generate a `.tgz` file in the root of the project. You can then install this package in another project with:

```bash
npm install /path/to/wandelbots-wandelbots-js-react-components-0.0.1.tgz
```

`npm link` leads to issues with the react three fiber components (`peerDependencies` are not supported), so it is recommended to use `npm install` with the `.tgz` file.
