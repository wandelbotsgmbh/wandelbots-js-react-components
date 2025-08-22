# Development Workflow Guide

This guide explains the development workflow, tools, and best practices for contributing to the Wandelbots React Components library.

## Development Environment Setup

### Prerequisites

- Node.js 18+ or 20+
- npm or yarn
- Git

### Initial Setup

```bash
git clone https://github.com/wandelbotsgmbh/wandelbots-js-react-components.git
cd wandelbots-js-react-components
npm install
```

### Available Scripts

#### Development

```bash
# Start Storybook development server
npm run dev

# Build and pack components on file changes
npm run dev:pack

# Build components on file changes
npm run dev:build

# Develop with local nova-js changes
npm run dev:wbjs
```

#### Testing

```bash
# Type checking
npm run tsc

# Unit tests
npm run test:unit
npm run test:unit:run

# Visual regression tests (requires Storybook running)
npm run test

# Full CI test suite
npm run ci:test
```

#### Building

```bash
# Build library for production
npm run build

# Build Storybook for deployment
npm run build-storybook
```

## Project Structure Deep Dive

### Source Code Organization

```
src/
├── components/              # React components
│   ├── 3d-viewport/        # Three.js based 3D components
│   │   ├── EnvironmentSetup.tsx      # Environment configuration
│   │   ├── SafetyRenderer.tsx        # Safety zone visualization
│   │   └── PathRenderer.tsx          # Motion path display
│   ├── jogging/            # Robot jogging/manual control
│   │   ├── JoggingInterface.tsx       # Main jogging interface
│   │   ├── JoggingStore.ts            # MobX state management
│   │   ├── CartesianControls.tsx      # Cartesian space controls
│   │   └── JointControls.tsx          # Joint space controls
│   ├── robots/             # Robot visualization
│   │   ├── RobotRenderer.tsx          # Main robot component
│   │   ├── RobotModel.tsx             # Robot model renderer
│   │   └── robotUtilities.ts          # Robot model utilities
│   ├── safety/             # Safety status and controls
│   ├── editors/            # Code editors for robot programming
│   └── utils/              # Shared utilities
├── themes/                 # MUI theme configuration
├── i18n/                  # Internationalization
├── icons/                 # Custom SVG icons
└── index.ts              # Main export file
```

### Configuration Files

```
├── package.json           # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build configuration
├── vitest.config.ts      # Unit test configuration
├── vitest.workspace.ts   # Vitest workspace setup
├── rollup.config.dev.js  # Development build config
└── .storybook/           # Storybook configuration
```

## Component Development Workflow

### 1. Creating a New Component

```bash
# Create component file
touch src/components/MyComponent.tsx

# Create story file
touch stories/MyComponent.stories.tsx
```

### 2. Component Template

```typescript
import { observer } from "mobx-react-lite"
import { externalizeComponent } from "../externalizeComponent"
import type { SxProps } from "@mui/material"

export type MyComponentProps = {
  // Define props with clear types
  value: string
  onChange: (value: string) => void
  sx?: SxProps
}

/**
 * Brief description of what this component does
 *
 * @param props - Component props
 * @returns JSX.Element
 */
export const MyComponent = externalizeComponent(
  observer((props: MyComponentProps) => {
    // Component implementation
    return <div>Component content</div>
  })
)
```

### 3. Story Template

```typescript
import type { Meta, StoryObj } from "@storybook/react-vite"
import { MyComponent } from "../src/index"

const meta: Meta<typeof MyComponent> = {
  title: "Category/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
}
export default meta

export const Default: StoryObj<typeof MyComponent> = {
  args: {
    value: "default value",
    onChange: () => {},
  },
}

export const Variant: StoryObj<typeof MyComponent> = {
  args: {
    ...Default.args,
    // Override props for different variant
  },
}
```

### 4. Export from Index

```typescript
// Add to src/index.ts
export * from "./components/MyComponent"
```

## Testing Strategies

### Unit Testing with Vitest

```typescript
import { render, screen } from '@testing-library/react'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(
      <MyComponent
        value="test"
        onChange={() => {}}
      />
    )

    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
```

### Visual Regression Testing

Components are automatically tested for visual regressions using Storybook test runner:

```bash
# Run visual tests
npm run test
```

### Integration Testing with Mock Nova

```typescript
// Create mock nova client for testing
const mockNova = {
  getMotionGroup: jest.fn(),
  connectMotionGroup: jest.fn(),
} as jest.Mocked<NovaClient>

// Test component with mock
render(
  <RobotControlComponent
    nova={mockNova}
    motionGroupId="0@test"
  />
)
```

## Storybook Development

### Best Practices for Stories

1. **Comprehensive Coverage**: Create stories for all major component states
2. **Interactive Controls**: Use argTypes for dynamic property testing
3. **Documentation**: Include meaningful descriptions and examples
4. **Accessibility**: Test with accessibility tools

```typescript
// Good story with controls
export const Interactive: StoryObj<typeof MyComponent> = {
  args: {
    value: "interactive",
  },
  argTypes: {
    value: {
      control: { type: "text" },
      description: "The current value of the component",
    },
    onChange: { action: "changed" },
  },
}
```

### Story Categories

- **Getting Started**: Introduction and setup guides
- **Robot Control**: Manual control and jogging components
- **3D Visualization**: Three.js-based rendering components
- **Program Management**: Program execution and monitoring
- **Theming**: Styling and theme customization examples
- **Utilities**: Helper components and shared functionality

## MobX State Management

### Store Pattern

```typescript
import { makeObservable, observable, action } from "mobx"

export class MyComponentStore {
  value = ""
  loading = false

  constructor() {
    makeObservable(this, {
      value: observable,
      loading: observable,
      setValue: action,
      setLoading: action,
    })
  }

  setValue = (newValue: string) => {
    this.value = newValue
  }

  setLoading = (loading: boolean) => {
    this.loading = loading
  }
}
```

### Using Stores in Components

```typescript
export const MyComponent = externalizeComponent(
  observer((props: MyComponentProps) => {
    const store = useLocalObservable(() => new MyComponentStore())

    // Store will automatically trigger re-renders when observables change
    return <div>{store.value}</div>
  })
)
```

## Build and Deployment

### Library Build Process

The library uses Vite for building with the following outputs:

- **ESM**: `dist/index.js` (main entry point)
- **CommonJS**: `dist/index.cjs` (for older environments)
- **TypeScript**: `dist/index.d.ts` (type definitions)

### Semantic Release

The project uses semantic-release for automatic versioning:

- **feat**: Minor version bump
- **fix**: Patch version bump
- **BREAKING CHANGE**: Major version bump

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-new-component

# Develop and commit with conventional commits
git commit -m "feat: add MyComponent with interactive controls"

# Push and create PR
git push origin feature/my-new-component
```

## Performance Considerations

### Bundle Size Optimization

- Use tree-shaking friendly exports
- Minimize peer dependencies
- Lazy load heavy components when possible

### Runtime Performance

- Use React.memo for expensive pure components
- Optimize MobX observables (avoid over-observation)
- Use useCallback/useMemo for expensive computations

### 3D Performance

- Optimize Three.js scenes
- Use instanced rendering for multiple robots
- Implement LOD (Level of Detail) for complex models

## Debugging Tips

### Storybook Debugging

```typescript
// Use Storybook actions for debugging callbacks
export const WithDebugging: StoryObj<typeof MyComponent> = {
  args: {
    onChange: action("onChange"),
    onError: action("onError"),
  },
}
```

### MobX Debugging

```typescript
import { trace } from "mobx"

// Debug what triggers re-renders
const MyComponent = observer(() => {
  trace() // Logs what observables are accessed
  return <div>{store.value}</div>
})
```

### Nova-JS Debugging

```typescript
// Enable debug logging
const nova = new NovaClient({
  instanceUrl: url,
  debug: true,
})
```

This workflow ensures consistent, high-quality component development while maintaining integration with the Wandelbots robotics platform.
