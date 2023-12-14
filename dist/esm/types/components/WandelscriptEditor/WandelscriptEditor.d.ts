import React from 'react';
export type EditorProps = {
    defaultCode: string;
    hostname: string;
    port: number;
    path: string;
    className?: string;
};
export declare const WandelscriptEditor: React.FC<EditorProps>;
