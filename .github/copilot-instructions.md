# GitHub Copilot Instructions for Wandelbots React Components

This repository contains React UI components for building applications on top of the Wandelbots platform. These components integrate with the `@wandelbots/nova-js` library to provide robotics-specific functionality.

## Project Overview

This is a TypeScript React component library that:
- Provides ready-made UI components for robotics applications
- Uses Material-UI (MUI) as the base design system
- Integrates with React Three Fiber for 3D robotics visualization
- Works with `@wandelbots/nova-js` for robot control and state management
- Uses Storybook for component development and documentation
- Uses i18next for internationalization

## Key Architecture Patterns

### Component Structure
- Components accept either a `NovaClient` instance or a string URL
- Components use MobX for state management with `observer` wrapper
- Components are externalized using `externalizeComponent` wrapper
- TypeScript interfaces define clear prop contracts

### Nova-JS Integration
Components integrate with nova-js through these key patterns:

```typescript
// Accept either NovaClient instance or URL string
nova: NovaClient | string

// Convert string to NovaClient if needed
const nova = isString(props.nova)
  ? new NovaClient({ instanceUrl: props.nova })
  : props.nova

// Use ConnectedMotionGroup for robot state
connectedMotionGroup: ConnectedMotionGroup
```

### State Management
- Use MobX `useLocalObservable` for component state
- Wrap components with `observer` for reactivity
- Create dedicated stores for complex components (e.g., JoggingStore)

## Component Categories

### 1. Robot Control Components
Components for manual robot control and program execution:
- Jogging interfaces for cartesian and joint space movement
- Program execution controls (play, pause, stop)
- Velocity and speed adjustment interfaces
- Safety status monitoring and controls

### 2. 3D Visualization Components
Three.js based components for robotics visualization:
- Robot model rendering with real-time pose updates
- Motion trajectory and path visualization
- Safety zone and boundary rendering
- Environment and scene setup utilities

### 3. Editor Components
Code editing interfaces for robot programming:
- Monaco-based editors with syntax highlighting
- Language-specific tooling and IntelliSense
- Integration with Wandelscript and other robotics languages

### 4. Utility Components
General-purpose UI components:
- Loading states and progress indicators
- Text utilities and interactive elements
- Modal dialogs and overlays
- Custom icons and visual elements

## Development Guidelines

### When Creating New Components

1. **Props Interface**: Always define a clear TypeScript interface
2. **Nova Integration**: Accept `NovaClient | string` when interfacing with robots
3. **Externalization**: Wrap with `externalizeComponent` for proper error boundaries
4. **Observability**: Use `observer` wrapper for MobX reactivity
5. **Theming**: Use MUI theme system and support custom theming
6. **i18n**: Use react-i18next for translatable strings
7. **Storybook**: Create single-page interactive stories with controls

### Storybook Guidelines

- **Single Story**: Create one main interactive story per component, not multiple variant stories
- **Single Docs Page**: Use `tags: ["!dev"]` in meta configuration to create a single docs page without expandable sections
- **Interactive Controls**: Use argTypes to provide controls that let users test different states
- **Explicit Options**: For enum controls, explicitly list enum values instead of using `Object.values()` to avoid extra entries
- **Left Alignment**: Components should be left-aligned and resize dynamically based on content
- **Descriptive Naming**: Name the story "Interactive" or use a descriptive name like "Robot Setup Readiness Indicator"
- **Documentation**: Include component description and story description explaining the interactive features

### Code Style Patterns

```typescript
import { observer } from "mobx-react-lite"
import { externalizeComponent } from "../../externalizeComponent"
import type { NovaClient } from "@wandelbots/nova-js/v2"

export type MyComponentProps = {
  nova: NovaClient | string
  // other props
}

export const MyComponent = externalizeComponent(
  observer((props: MyComponentProps) => {
    const nova = isString(props.nova)
      ? new NovaClient({ instanceUrl: props.nova })
      : props.nova
    
    // component implementation
  })
)
```

### Testing
- Unit tests with Vitest
- Visual regression tests with Storybook test runner
- Components should work with mock nova instances

### Peer Dependencies
The following are peer dependencies that consuming applications must provide:
- React 18+ or 19+
- Material-UI v6 or v7
- @emotion/react and @emotion/styled
- Optional: @react-three/fiber, @react-three/drei, three, three-stdlib (for 3D components)

## File Structure

```
src/
├── components/           # All React components
│   ├── 3d-viewport/     # 3D visualization components
│   ├── jogging/         # Robot jogging components
│   ├── robots/          # Robot rendering components
│   ├── safetyBar/       # Safety-related components
│   └── wandelscript-editor/ # Code editor components
├── themes/              # MUI theme configuration
├── i18n/               # Internationalization config
├── icons/              # Custom icon components
└── index.ts            # Main export file

stories/                 # Storybook stories
```

## Common Integration Patterns

### Working with Motion Groups
```typescript
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components"

// Get motion group from nova client
const motionGroup = await nova.getMotionGroup(motionGroupId)
const connectedMotionGroup = ConnectedMotionGroup.connect(nova, motionGroupId)

// Use in 3D robot components
<RobotComponent connectedMotionGroup={connectedMotionGroup} />
```

### Theming Integration
```typescript
import { createNovaMuiTheme } from '@wandelbots/wandelbots-js-react-components'

const theme = createNovaMuiTheme('dark') // or 'light'
```

### Error Handling
Components are wrapped with error boundaries through `externalizeComponent`. Always handle loading states and errors gracefully.

## Best Practices for AI Assistance

1. **Context Awareness**: Always consider the robotics domain when suggesting code
2. **Type Safety**: Leverage TypeScript for better code completion and error detection
3. **Component Reusability**: Follow established patterns for consistency
4. **Performance**: Consider MobX reactivity patterns for optimal re-renders
5. **Accessibility**: Ensure components follow MUI accessibility guidelines
6. **Documentation**: Update Storybook stories when adding new props or features
