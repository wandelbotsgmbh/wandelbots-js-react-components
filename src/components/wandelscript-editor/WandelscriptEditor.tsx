import Editor, { useMonaco, type Monaco } from "@monaco-editor/react"
import { useEffect } from "react"
import { createHighlighter, type BundledTheme } from "shiki"
import { shikiToMonaco } from "@shikijs/monaco"

import wandelscriptTextmateGrammar from "./wandelscript.tmLanguage"
import { useTheme } from "@mui/material"
import { editor } from "monaco-editor"

type WandelscriptEditorProps = {
  /** The current Wandelscript content of the code editor (controlled component) */
  code?: string
  /** What to do when the user edits the code */
  onChange?: (
    code: string | undefined,
    ev: editor.IModelContentChangedEvent,
  ) => void
  /** Options for monaco editor */
  monacoOptions?: editor.IEditorOptions
  /** Callback to further configure monaco on startup if needed */
  monacoSetup?: (monaco: Monaco) => void
}

const shikiTheme: BundledTheme = "dark-plus"

/** A Monaco (VSCode-style) embedded code editor with Wandelscript syntax highlighting */
export const WandelscriptEditor = (props: WandelscriptEditorProps) => {
  const monaco = useMonaco()
  const theme = useTheme()

  async function setupEditor(monaco: Monaco) {
    // Register and configure the Wandelscript language
    monaco.languages.register({ id: "wandelscript" })

    monaco.languages.setLanguageConfiguration("wandelscript", {
      comments: {
        lineComment: "#",
      },
      brackets: [
        ["(", ")"],
        ["[", "]"],
      ],
      autoClosingPairs: [
        { open: "[", close: "]" },
        { open: "(", close: ")" },
      ],
      surroundingPairs: [
        { open: "[", close: "]" },
        { open: "(", close: ")" },
      ],
    })

    // Monaco doesn't support TextMate grammar config directly, so we
    // use Shiki as an intermediary

    const highlighter = await createHighlighter({
      // Our textmate grammar doesn't quite conform to the expected type
      // here; I'm not sure what the missing properties mean exactly
      langs: [wandelscriptTextmateGrammar as any],
      themes: [shikiTheme],
    })

    shikiToMonaco(highlighter, monaco)

    // Override the generated shiki theme to use shiki syntax highlighting
    // but vscode colors
    monaco.editor.defineTheme(shikiTheme, {
      base: theme.palette.mode === "dark" ? "vs-dark" : "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#262F42",
        "editorLineNumber.foreground": "#797979",
        "editorLineNumber.activeForeground": "#e9e9e9",
        "editor.lineHighlightBorder": "#494949",
      },
    })

    if (props.monacoSetup) {
      props.monacoSetup(monaco)
    }
  }

  useEffect(() => {
    if (monaco) {
      setupEditor(monaco)
    }
  }, [monaco])

  if (!monaco) {
    return null
  }

  return (
    <Editor
      value={props.code}
      onChange={props.onChange}
      defaultLanguage="wandelscript"
      theme={shikiTheme}
      options={{
        minimap: { enabled: false },
        wordWrap: "on",
        automaticLayout: true,
        ...props.monacoOptions,
      }}
    />
  )
}
