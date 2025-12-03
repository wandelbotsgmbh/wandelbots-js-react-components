# Nova-JS Integration Guide

This document explains how React components integrate with the `@wandelbots/nova-js` library for robotics functionality.

## Core Nova-JS Concepts

### NovaClient

The main client for communicating with Wandelbots Nova instances.

```typescript
import { NovaClient } from "@wandelbots/nova-js/v2"

const nova = new NovaClient({
  instanceUrl: "https://your-nova-instance.com",
  // Optional configuration
})
```

### Motion Groups

Motion groups represent controllable robot units.

```typescript
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components"

// Get motion group information
const motionGroup = await nova.getMotionGroup("0@ur5e")

// Create a connected motion group for real-time state
const connectedMotionGroup = ConnectedMotionGroup.connect(nova, "0@ur5e")
```

### Programs and Execution

Programs contain robot instructions and can be executed.

```typescript
// Create or get a program
const program = await nova.createProgram("my-program", wandelscriptCode)

// Execute the program
const execution = await nova.executeProgram(program.id)
```

## Component Integration Patterns

### 1. Accepting Nova Client or URL

Most components accept either a `NovaClient` instance or a URL string:

```typescript
export type ComponentProps = {
  nova: NovaClient | string
  // other props...
}

// Inside component:
const nova = isString(props.nova)
  ? new NovaClient({ instanceUrl: props.nova })
  : props.nova
```

**Benefits:**

- Flexibility for different use cases
- Easy testing with mock URLs
- Shared client instances for performance

### 2. Motion Group State Binding

Components that control or visualize robots use ConnectedMotionGroup:

```typescript
// JoggingPanel internally:
const motionGroup = await nova.getMotionGroup(motionGroupId)
const connectedMotionGroup = nova.connectMotionGroup(motionGroup)

// Real-time pose updates
connectedMotionGroup.onPoseChanged((pose) => {
  // Update UI with current robot position
})
```

### 3. Program State Management

Program-related components track execution state:

```typescript
// ProgramControl component pattern:
const [execution, setExecution] = useState<ProgramExecution>()

useEffect(() => {
  if (execution) {
    const unsubscribe = execution.onStateChanged((state) => {
      // Update UI based on program state
      setExecutionState(state)
    })
    return unsubscribe
  }
}, [execution])
```

## Error Handling Patterns

### Network Errors

```typescript
try {
  const motionGroup = await nova.getMotionGroup(motionGroupId)
} catch (error) {
  if (error instanceof NetworkError) {
    // Handle connectivity issues
    setConnectionError(error.message)
  }
}
```

### Permission Errors

```typescript
try {
  await nova.jogMotionGroup(motionGroupId, jogCommand)
} catch (error) {
  if (error.code === "PERMISSION_DENIED") {
    // Handle insufficient permissions
    showPermissionError()
  }
}
```

### Safety Violations

```typescript
try {
  await nova.executeProgram(programId)
} catch (error) {
  if (error.code === "SAFETY_VIOLATION") {
    // Handle safety-related failures
    showSafetyWarning(error.details)
  }
}
```

## Real-time Data Patterns

### Pose Monitoring

```typescript
// Robot component subscribes to pose updates
useEffect(() => {
  if (!connectedMotionGroup) return

  const unsubscribe = connectedMotionGroup.onPoseChanged((pose) => {
    // Update 3D robot visualization
    robotRef.current?.setPose(pose)
  })

  return unsubscribe
}, [connectedMotionGroup])
```

### Safety State Monitoring

```typescript
// SafetyBar component monitors safety state
useEffect(() => {
  const unsubscribe = nova.onSafetyStateChanged((state) => {
    setSafetyState(state)
    if (state.emergencyStop) {
      // Handle emergency stop
      setEmergencyMode(true)
    }
  })

  return unsubscribe
}, [nova])
```

### Program Execution Monitoring

```typescript
// Monitor program execution progress
useEffect(() => {
  if (!execution) return

  const unsubscribe = execution.onProgressChanged((progress) => {
    setExecutionProgress(progress)
  })

  return unsubscribe
}, [execution])
```

## Performance Considerations

### Connection Reuse

```typescript
// Don't create multiple NovaClient instances
// ❌ Bad
const Component1 = () => {
  const nova = new NovaClient({ instanceUrl: url })
  // ...
}

// ✅ Good - Share client instance
const App = () => {
  const nova = useMemo(() => new NovaClient({ instanceUrl: url }), [url])
  return (
    <NovaProvider value={nova}>
      <Component1 />
      <Component2 />
    </NovaProvider>
  )
}
```

### Subscription Management

```typescript
// Always clean up subscriptions
useEffect(() => {
  const subscriptions = [
    nova.onConnectionStateChanged(handleConnectionChange),
    connectedMotionGroup.onPoseChanged(handlePoseChange),
    execution?.onStateChanged(handleStateChange),
  ].filter(Boolean)

  return () => {
    subscriptions.forEach((unsub) => unsub())
  }
}, [nova, connectedMotionGroup, execution])
```

### Batched Updates

```typescript
// Use MobX runInAction for batched state updates
runInAction(() => {
  state.pose = newPose
  state.velocity = newVelocity
  state.safetyState = newSafetyState
})
```

## Common Nova-JS Objects in Components

### MotionGroup

```typescript
interface MotionGroup {
  id: string
  name: string
  robotType: string
  state: MotionGroupState
  // ...
}
```

### ConnectedMotionGroup

```typescript
interface ConnectedMotionGroup extends MotionGroup {
  onPoseChanged(callback: (pose: Pose) => void): () => void
  onStateChanged(callback: (state: MotionGroupState) => void): () => void
  // ...
}
```

### Program

```typescript
interface Program {
  id: string
  name: string
  code: string
  motionGroupIds: string[]
  // ...
}
```

### ProgramExecution

```typescript
interface ProgramExecution {
  id: string
  programId: string
  state: ExecutionState
  onStateChanged(callback: (state: ExecutionState) => void): () => void
  onProgressChanged(callback: (progress: number) => void): () => void
  // ...
}
```

### Pose

```typescript
interface Pose {
  position: { x: number; y: number; z: number }
  orientation: { x: number; y: number; z: number; w: number }
  joints?: number[]
  // ...
}
```

## Testing with Nova-JS

### Mock NovaClient

```typescript
const mockNova = {
  getMotionGroup: jest.fn().mockResolvedValue(mockMotionGroup),
  connectMotionGroup: jest.fn().mockReturnValue(mockConnectedMotionGroup),
  // ... other methods
} as jest.Mocked<NovaClient>
```

### Mock ConnectedMotionGroup

```typescript
const mockConnectedMotionGroup = {
  ...mockMotionGroup,
  onPoseChanged: jest.fn((callback) => {
    // Simulate pose updates
    setTimeout(() => callback(mockPose), 100)
    return jest.fn() // unsubscribe function
  }),
} as jest.Mocked<ConnectedMotionGroup>
```

This integration approach ensures components are loosely coupled with nova-js while providing robust robotics functionality.
