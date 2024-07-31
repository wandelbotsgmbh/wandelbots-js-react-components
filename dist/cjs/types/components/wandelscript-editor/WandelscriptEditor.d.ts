import { type Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
type WandelscriptEditorProps = {
    /** The current Wandelscript content of the code editor (controlled component) */
    code?: string;
    /** What to do when the user edits the code */
    onChange?: (code: string | undefined, ev: editor.IModelContentChangedEvent) => void;
    /** Callback to further configure monaco on startup if needed */
    monacoSetup?: (monaco: Monaco) => void;
};
export declare const WandelscriptEditor: (props: WandelscriptEditorProps) => import("react/jsx-runtime").JSX.Element;
export {};
