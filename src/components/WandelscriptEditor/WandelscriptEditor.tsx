/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';
import React, { createRef, useEffect, useMemo, useRef } from 'react';
import { createEditor, createUrl, createWebSocket, performInit } from './utils';

import { buildWorkerDefinition } from 'monaco-editor-workers';
buildWorkerDefinition('workers', new URL('', window.location.href).href, false);

let init = true;

export type EditorProps = {
    defaultCode: string;
    hostname: string;
    port: number;
    path: string;
    className?: string;
}

export const WandelscriptEditor: React.FC<EditorProps> = ({
    defaultCode,
    hostname,
    path,
    port,
    className
}) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor>();
    const ref = createRef<HTMLDivElement>();
    const url = useMemo(() => createUrl(hostname, port, path), [hostname, port, path]);
    let lspWebSocket: WebSocket;

    useEffect(() => {
        const currentEditor = editorRef.current;

        if (ref.current !== null) {
            const divElement = ref.current;
            (async () => {
                if (init) { 
                    await performInit() 
                }
                await createEditor({
                    htmlElement: divElement,
                    content: defaultCode,
                });
                if (init) {
                    init = false;
                }
                lspWebSocket = createWebSocket(url);
            })();

            return () => {
                currentEditor?.dispose();
            };
        }

        window.onbeforeunload = () => {
            // On page reload/exit, close web socket connection
            lspWebSocket?.close();
        };
        return () => {
            // On component unmount, close web socket connection
            lspWebSocket?.close();
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{ height: '150vh' }}
            className={className}
        />
    );
};
