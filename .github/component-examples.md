# Component Usage Examples

This file provides practical examples of how to use the React components with nova-js integration.

## Basic Setup

```typescript
import { NovaClient } from "@wandelbots/nova-js/v2"
import {
  JoggingPanel,
  Robot,
  SafetyBar,
  createNovaMuiTheme,
} from "@wandelbots/wandelbots-js-react-components"

// Setup Nova client
const nova = new NovaClient({ instanceUrl: "https://your-nova-instance.com" })

// Setup theme
const theme = createNovaMuiTheme("dark")
```

## Common Component Patterns

### Robot Jogging Interface

```typescript
function MyRobotApp() {
  return (
    <JoggingInterface
      nova={nova}
      motionGroupId="0@ur5e"
      onSetup={(store) => {
        // Configure jogging behavior
        store.setVelocityScale(0.5)
      }}
      locked={programRunning} // Disable during program execution
    >
      {/* Custom controls can be added here */}
      <CustomJoggingControls />
    </JoggingInterface>
  )
}
```

### Robot 3D Visualization

```typescript
import { Canvas } from '@react-three/fiber'
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/lib/ConnectedMotionGroup"

function Robot3D({ motionGroupId }: { motionGroupId: string }) {
  const [connectedMotionGroup, setConnectedMotionGroup] = useState<ConnectedMotionGroup>()

  useEffect(() => {
    async function setup() {
      const connected = ConnectedMotionGroup.connect(nova, motionGroupId)
      setConnectedMotionGroup(connected)
    }
    setup()
  }, [motionGroupId])

  if (!connectedMotionGroup) return <div>Loading...</div>

  return (
    <Canvas>
      <RobotRenderer
        connectedMotionGroup={connectedMotionGroup}
        flangeRef={flangeRef} // Optional ref to flange group
      />
      <EnvironmentSetup /> {/* Optional environment setup */}
    </Canvas>
  )
}
```

### Program Control with State Indicators

```typescript
function ProgramInterface() {
  const [program, setProgram] = useState<Program>()
  const [execution, setExecution] = useState<ProgramExecution>()

  return (
    <Stack spacing={2}>
      {/* Program state visualization */}
      <ProgramStatusIndicator
        program={program}
        execution={execution}
      />

      {/* Program control buttons */}
      <ProgramControlPanel
        nova={nova}
        program={program}
        onExecutionChange={setExecution}
      />

      {/* Safety status */}
      <SafetyStatusBar
        nova={nova}
        motionGroupId="0@ur5e"
      />
    </Stack>
  )
}
```

### Code Editor Integration

```typescript
function CodeEditor() {
  const [code, setCode] = useState('')

  return (
    <ScriptEditor
      value={code}
      onChange={setCode}
      height="400px"
      theme="dark"
    />
  )
}
```

### Velocity Control

```typescript
function VelocityControl() {
  const [velocity, setVelocity] = useState(50)

  return (
    <VelocityControlSlider
      value={velocity}
      onChange={setVelocity}
      max={100}
      unit="%"
    />
  )
}
```

## Advanced Patterns

### Custom Jogging Store

```typescript
import { JoggingStore } from '@wandelbots/wandelbots-js-react-components'

function AdvancedJogging() {
  const store = useMemo(() => new JoggingStore(), [])

  useEffect(() => {
    // Custom configuration
    store.setCartesianStep(1.0) // 1mm steps
    store.setJointStep(Math.PI / 180) // 1 degree steps
  }, [store])

  return (
    <JoggingInterface
      nova={nova}
      motionGroupId="0@ur5e"
      store={store} // Use persistent store
    />
  )
}
```

### Multiple Robot Visualization

```typescript
function MultiRobotView() {
  return (
    <Canvas>
      {robotIds.map(id => (
        <RobotRenderer
          key={id}
          connectedMotionGroup={connectedMotionGroups[id]}
          position={robotPositions[id]}
        />
      ))}
      <SafetyZoneRenderer safetyZones={safetyZones} />
      <MotionPathRenderer trajectories={trajectories} />
    </Canvas>
  )
}
```

### Error Handling

```typescript
function RobotControlWithErrorHandling() {
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong with robot control</div>}
    >
      <JoggingInterface
        nova={nova}
        motionGroupId="0@ur5e"
        onSetup={(store) => {
          store.onError = (error) => {
            console.error('Jogging error:', error)
            // Handle error appropriately
          }
        }}
      />
    </ErrorBoundary>
  )
}
```

### Theming Customization

```typescript
import { ThemeProvider } from '@mui/material/styles'
import { createNovaMuiTheme } from '@wandelbots/wandelbots-js-react-components'

function ThemedApp() {
  const theme = createNovaMuiTheme('dark', {
    // Custom theme overrides
    palette: {
      primary: {
        main: '#your-brand-color',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <YourApp />
    </ThemeProvider>
  )
}
```

### Internationalization

```typescript
import { useTranslation } from 'react-i18next'

function LocalizedComponent() {
  const { t } = useTranslation()

  return (
    <Stack>
      <Typography>{t('robot.status')}</Typography>
      <JoggingInterface
        nova={nova}
        motionGroupId="0@ur5e"
      />
    </Stack>
  )
}
```

## Testing Examples

### Mock Nova Client for Stories

```typescript
// In Storybook stories
export const MockExample: StoryObj<typeof JoggingInterface> = {
  args: {
    nova: "https://mock.example.com", // Mock URL for testing
    motionGroupId: "0@mock-ur5e",
  },
}
```

### Unit Testing with Mock

```typescript
import { render } from '@testing-library/react'
import { JoggingInterface } from '../JoggingInterface'

test('renders jogging interface', () => {
  const mockNova = {
    // Mock NovaClient methods
  } as NovaClient

  render(
    <JoggingInterface
      nova={mockNova}
      motionGroupId="0@test"
    />
  )
})
```
