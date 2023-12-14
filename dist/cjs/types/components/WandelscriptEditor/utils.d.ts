import { editor, Uri } from 'monaco-editor/esm/vs/editor/editor.api.js';
import { IReference, ITextFileEditorModel } from 'vscode/monaco';
import 'vscode/default-extensions/theme-defaults';
import { MonacoLanguageClient } from 'monaco-languageclient';
import { MessageTransports } from 'vscode-languageclient';
export declare const createLanguageClient: (transports: MessageTransports) => MonacoLanguageClient;
export declare const createUrl: (hostname: string, port: number, path: string) => string;
export declare const createWebSocket: (url: string) => WebSocket;
export type EditorCreationResult = {
    languageId: string;
    editor: editor.IStandaloneCodeEditor;
    uri: Uri;
    modelRef: IReference<ITextFileEditorModel>;
};
export declare const performInit: () => Promise<void>;
export declare const createEditor: (config: {
    htmlElement: HTMLElement;
    content: string;
}) => Promise<EditorCreationResult>;
