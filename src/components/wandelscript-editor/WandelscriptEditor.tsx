import type { Monaco } from "@monaco-editor/react"
import { lazy, Suspense, useState } from "react"
import type { BundledLanguage, BundledTheme, HighlighterGeneric } from "shiki"

import { useTheme } from "@mui/material"
import type { editor } from "monaco-editor"
import { externalizeComponent } from "../../externalizeComponent"
import { LoadingCover } from "../LoadingCover"
import wandelscriptTextmateGrammar from "./wandelscript.tmLanguage"

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

const Editor = lazy(() => import("@monaco-editor/react"))

let preparedShiki: {
  shiki: HighlighterGeneric<BundledLanguage, BundledTheme>
  shikiToMonaco: (
    shiki: HighlighterGeneric<BundledLanguage, BundledTheme>,
    monaco: Monaco,
  ) => void
} | null = null

async function getShiki() {
  if (!preparedShiki) {
    const [{ createHighlighter }, { shikiToMonaco }] = await Promise.all([
      import("shiki"),
      import("@shikijs/monaco"),
    ])

    const shiki = await createHighlighter({
      // Our textmate grammar doesn't quite conform to the expected type
      // here; I'm not sure what the missing properties mean exactly
      langs: [wandelscriptTextmateGrammar as any],
      themes: ["dark-plus", "light-plus"],
    })

    preparedShiki = {
      shiki,
      shikiToMonaco,
    }
  }

  return preparedShiki
}

/** A Monaco (VSCode-style) embedded code editor with Wandelscript syntax highlighting */
export const WandelscriptEditor = externalizeComponent(
  (props: WandelscriptEditorProps) => {
    const theme = useTheme()
    const [activeShikiTheme, setActiveShikiTheme] =
      useState<BundledTheme>("dark-plus")
    const targetShikiTheme =
      theme.palette.mode === "dark" ? "dark-plus" : "light-plus"

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

      const { shiki, shikiToMonaco } = await getShiki()

      // Monaco doesn't support TextMate grammar config directly, so we
      // use Shiki as an intermediary
      shikiToMonaco(shiki, monaco)

      // Override the generated shiki theme to use shiki syntax highlighting
      // but vscode colors
      monaco.editor.defineTheme(
        targetShikiTheme,
        theme.componentsExt?.WandelscriptEditor?.monacoTheme ?? {
          base: theme.palette.mode === "dark" ? "vs-dark" : "vs",
          inherit: true,
          rules: [],
          colors: {},
        },
      )

      if (props.monacoSetup) {
        props.monacoSetup(monaco)
      }

      setActiveShikiTheme(targetShikiTheme)
    }

    return (
      <Suspense fallback={<LoadingCover />}>
        <Editor
          value={props.code}
          onMount={(_editor, monaco) => {
            setupEditor(monaco)
          }}
          onChange={props.onChange}
          defaultLanguage="wandelscript"
          theme={activeShikiTheme}
          options={{
            minimap: { enabled: false },
            wordWrap: "on",
            automaticLayout: true,
            ...props.monacoOptions,
          }}
        />
      </Suspense>
    )
  },
)
