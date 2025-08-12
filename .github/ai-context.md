# AI Assistant Context

This file provides essential context for AI assistants working with the Wandelbots React Components library.

## Project Summary

**Project Type**: React Component Library for Robotics Applications
**Primary Purpose**: Provide ready-made UI components for building applications on the Wandelbots robotics platform
**Target Users**: Developers building robotics applications using Wandelbots Nova

## Key Technologies

- **Frontend**: React 18/19, TypeScript
- **UI Framework**: Material-UI (MUI) v6/7
- **3D Graphics**: React Three Fiber, Three.js
- **State Management**: MobX
- **Robotics Integration**: @wandelbots/nova-js
- **Development**: Storybook, Vite, Vitest
- **Internationalization**: react-i18next

## Architecture Principles

1. **Loose Coupling**: Components accept NovaClient or URL strings for flexibility
2. **Error Boundaries**: All components wrapped with `externalizeComponent`
3. **Reactivity**: MobX observers for real-time robotics data
4. **Type Safety**: Full TypeScript coverage with strict types
5. **Accessibility**: MUI accessibility guidelines followed
6. **Internationalization**: All user-facing text translatable

## Component Categories

### Robot Control

- Manual robot control interfaces with jogging capabilities
- Program execution controls and status indicators
- Speed and velocity adjustment components
- Safety status monitoring and emergency controls

### 3D Visualization

- 3D robot models with real-time pose updates
- Motion trajectory and path visualization displays
- Safety zone and boundary rendering components
- 3D environment and scene setup utilities

### Development Tools

- Monaco-based code editors with syntax highlighting
- Language-specific tooling and development aids
- Various utility components and custom hooks

## Common Patterns

### Component Structure

```typescript
export const Component = externalizeComponent(
  observer((props: ComponentProps) => {
    // Implementation
  }),
)
```

### Nova Integration

```typescript
const nova = isString(props.nova)
  ? new NovaClient({ instanceUrl: props.nova })
  : props.nova
```

### State Management

```typescript
const store = useLocalObservable(() => new ComponentStore())
```

## Development Context

- **Testing**: Comprehensive visual regression and unit tests
- **Documentation**: Storybook with interactive examples
- **Build**: Vite-based with ESM/CJS outputs
- **Release**: Automated semantic versioning
- **Quality**: TypeScript strict mode, ESLint, Prettier

## Integration Points

- **Nova-JS**: Robotics API client integration
- **MUI Theme**: Custom theming with `createNovaMuiTheme`
- **React Three Fiber**: 3D robotics visualization
- **i18next**: Multi-language support

## Development Workflow

1. Create component with TypeScript interface
2. Add Storybook story with controls
3. Export from main index.ts
4. Add unit tests if complex logic
5. Update documentation

## Common Issues to Watch For

- Always wrap components with `externalizeComponent`
- Use `observer` wrapper for MobX reactivity
- Handle loading/error states gracefully
- Clean up subscriptions in useEffect
- Use semantic commit messages for versioning

## File Structure Context

- `src/components/`: All React components organized by category
- `src/themes/`: MUI theme configuration and utilities
- `src/i18n/`: Internationalization setup
- `stories/`: Storybook stories and documentation
- Root contains build/config files (vite.config.ts, tsconfig.json, etc.)

This library bridges the gap between React development and robotics applications, providing developers with production-ready components that integrate seamlessly with the Wandelbots platform.
