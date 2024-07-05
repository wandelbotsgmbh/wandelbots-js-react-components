# WandelUI

A growing collection of ready-made React UI components for use with the Wandelbots Nova platform. 

```bash
npm install @wandelbots/wandelui
```

### Basic usage:

Import your desired components or functions from the package:

```jsx
import { WandelscriptEditor, ... } from '@wandelbots/wandelui'
```

### Index

<table>
  <tr>
    <td valign="top">
      <ul>
        <li><a href="#wandelscript">Wandelscript</a></li>
        <ul>
          <li><a href="#wandelscripteditor">WandelscriptEditor</a></li>
        </ul>
        <li><a href="#materialui">Material UI</a></li>
        <ul>
          <li><a href="#novatheme">getNovaThemeOptionsForMui</a></li>
        </ul>
      </ul>
    </td>
  </tr>
</table>

# Wandelscript

#### WandelscriptEditor

```tsx
type WandelscriptEditorProps = {
  /** The current Wandelscript content of the code editor (controlled component) */
  code?: string
  /** What to do when the user edits the code */
  onChange?: (code: string|undefined, ev: editor.IModelContentChangedEvent) => void
  /** Callback to further configure monaco on startup if needed */
  monacoSetup?: (monaco: Monaco) => void
}
```

The WandelscriptEditor provides an interface for editing snippets of Wandelscript code with the appropriate syntax highlighting. It uses the [Monaco](https://microsoft.github.io/monaco-editor/) editor under the hood.

# Material UI

#### createNovaMuiTheme

```tsx
declare function createNovaMuiTheme(mode: 'dark'|'light' = 'dark'): Theme
```

This function creates a [Material UI theme](https://mui.com/material-ui/customization/theming/) with the default Nova colors, typography, and MUI component configuration.

Example use in a MUI application:

```tsx
import { ThemeProvider } from "@mui/system"
import { createNovaMuiTheme } from "@wandelbots/wandelui"

const novaDarkTheme = createNovaMuiTheme('dark')

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={novaDarkTheme}>
    {children}
  </ThemeProvider>
}
```

## Contributing

To set up wandelui for development, first clone the repo and run:

```bash
npm install
``` 

Then you can run the storybook to develop the components:

```bash
npm run dev
```