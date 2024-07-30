import { ThemeOptions } from '@mui/material/styles';
type ThemeName = 'wandelbots';
export declare const allThemes: {
    wb: import("@mui/material/styles").Theme;
};
export interface NamedThemeOptions extends ThemeOptions {
    name: ThemeName;
}
declare module '@mui/material/styles' {
    interface Theme {
        backgrounds: {
            light1: string;
            light2: string;
            medium: string;
            dark1: string;
            dark2: string;
        };
        buttonPrimary: {
            background: string;
            text: string;
        };
        buttonSecondary: {
            background: string;
            text: string;
        };
        buttonBack: {
            background: string;
            text: string;
        };
        inputField: {
            background: string;
            text: string;
            unitBackground: string;
            unitText: string;
        };
        sidebar: {
            background: string;
            backgroundSelected: string;
            selected: string;
        };
        actionPanel: {
            background: string;
            backgroundSelected: string;
            text: string;
        };
        controlPanel: {
            background: string;
            text: string;
        };
        listItem: {
            background: string;
            backgroundSelected: string;
            textTitle: string;
            textTitleSelected: string;
            textDesc: string;
            textDescSelected: string;
        };
        breadcrumb: {
            background: string;
            text: string;
            textSelected: string;
        };
        axes: {
            x: string;
            y: string;
            z: string;
        };
        viewport: {
            background: string;
            controlBackground: string;
        };
        tabIcon: {
            color: string;
        };
    }
    interface ThemeOptions {
        backgrounds?: {
            light1?: string;
            light2?: string;
            medium?: string;
            dark1?: string;
            dark2?: string;
        };
        buttonPrimary?: {
            background?: string;
            text?: string;
        };
        buttonSecondary?: {
            background?: string;
            text?: string;
        };
        buttonBack?: {
            background?: string;
            text?: string;
        };
        inputField?: {
            background?: string;
            text?: string;
            unitBackground?: string;
            unitText?: string;
        };
        sidebar?: {
            background?: string;
            backgroundSelected?: string;
            selected?: string;
        };
        actionPanel?: {
            background?: string;
            backgroundSelected?: string;
            text?: string;
        };
        controlPanel?: {
            background?: string;
            text?: string;
        };
        listItem?: {
            background?: string;
            backgroundSelected?: string;
            textTitle?: string;
            textTitleSelected?: string;
            textDesc?: string;
            textDescSelected?: string;
        };
        breadcrumb?: {
            background?: string;
            text?: string;
            textSelected?: string;
        };
        axes?: {
            x?: string;
            y?: string;
            z?: string;
        };
        viewport?: {
            background?: string;
            controlBackground?: string;
        };
        tabIcon?: {
            color?: string;
        };
    }
}
export {};
