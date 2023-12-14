/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { editor, Uri } from 'monaco-editor/esm/vs/editor/editor.api.js';
import { createConfiguredEditor, createModelReference, IReference, ITextFileEditorModel } from 'vscode/monaco';
import 'vscode/default-extensions/theme-defaults';
import { initServices, MonacoLanguageClient } from 'monaco-languageclient';
import normalizeUrl from 'normalize-url';
import { CloseAction, ErrorAction, MessageTransports } from 'vscode-languageclient';
import { WebSocketMessageReader, WebSocketMessageWriter, toSocket } from 'vscode-ws-jsonrpc';
import { ExtensionHostKind, registerExtension } from 'vscode/extensions';

const languageId = "wandelscript";

export const createLanguageClient = (transports: MessageTransports): MonacoLanguageClient => {
    return new MonacoLanguageClient({
        name: 'Wandelscript Language Client',
        clientOptions: {
            // use a language id as a document selector
            documentSelector: [languageId],
            // disable the default error handler
            errorHandler: {
                error: () => ({ action: ErrorAction.Continue }),
                closed: () => ({ action: CloseAction.DoNotRestart })
            }
        },
        // create a language client connection from the JSON RPC connection on demand
        connectionProvider: {
            get: () => {
                return Promise.resolve(transports);
            }
        }
    });
};

export const createUrl = (hostname: string, port: number, path: string): string => {
    const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
    return normalizeUrl(`${protocol}://${hostname}:${port}${path}`);
};

export const createWebSocket = (url: string): WebSocket => {
    const webSocket = new WebSocket(url);
    webSocket.onopen = () => {
        const socket = toSocket(webSocket);
        const reader = new WebSocketMessageReader(socket);
        const writer = new WebSocketMessageWriter(socket);
        const languageClient = createLanguageClient({
            reader,
            writer
        });
        languageClient.start();
        reader.onClose(() => languageClient.stop());
    };
    return webSocket;
};

export type EditorCreationResult = {
    languageId: string;
    editor: editor.IStandaloneCodeEditor;
    uri: Uri;
    modelRef: IReference<ITextFileEditorModel>;
}

export const performInit = async () => {
    await initServices({
        // required for default themes
        enableThemeService: true,
        // required for textmate grammars
        enableTextmateService: true,
        // required for text model handling (here: /workspace/example.langium)
        enableModelService: true,
        // use editor mode
        configureEditorOrViewsService: {
        },
        // enable configuration services
        configureConfigurationService: {
            defaultWorkspaceUri: '/workspace'
        },
        // enable platform specific keybindings
        enableKeybindingsService: true,
        // enable language support
        enableLanguagesService: true,
    });
    
    // define this client as vscode extension, required for textmate grammars
    const extension = {
        name: 'wandelscript-client',
        publisher: 'Wandelbots GmbH',
        version: '1.0.0',
        engines: {
            vscode: '*'
        },
        contributes: {
            languages: [{
                id: languageId,
                extensions: ['.ws'],
                aliases: [
                    languageId
                ],
                // files are loaded below and bind below
                configuration: './wandelscript-configuration.json'
            }],
            grammars: [{
                language: languageId,
                scopeName: 'source.wandelscript',
                // files are loaded below and bind below
                path: './wandelscript-grammar.json'
            }]
        }
    };
    const { registerFileUrl } = registerExtension(extension, ExtensionHostKind.LocalProcess);

    // regiser the language configuration file url
    registerFileUrl('/wandelscript-configuration.json', new URL('language_configuration/wandelscript.configuration.json', window.location.href).href);
    // regiser the textmate grammar file url
    // using a textmate grammar requires the textmate and theme service to be enabled
    registerFileUrl('/wandelscript-grammar.json', new URL('language_configuration/wandelscript.tmLanguage.json', window.location.href).href);
};

export const createEditor = async (config: {
    htmlElement: HTMLElement,
    content: string,
}) => { 

    // create the model
    const uri = Uri.parse('/tmp/skill.ws');
    const modelRef = await createModelReference(uri, config.content);
    modelRef.object.setLanguageId(languageId);

    // create monaco editor
    const editor = createConfiguredEditor(config.htmlElement, {
        model: modelRef.object.textEditorModel,
        glyphMargin: true,
        lightbulb: {
            enabled: true
        },
        automaticLayout: true,
        theme: 'vs-dark'
    });

    const result: EditorCreationResult = {
        languageId: languageId,
        editor,
        uri,
        modelRef
    };
    return Promise.resolve(result);
};
