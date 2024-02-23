import React from "react";
interface SidebarCategory {
    label?: string;
    items: (SidebarItem | SidebarCollapsibleItem)[];
}
interface SidebarItem {
    label: string;
    link: string;
    icon: React.ReactNode;
    isSelected: boolean;
}
interface SidebarCollapsibleItem {
    label: string;
    icon: React.ReactNode;
    items: SidebarCollapsedItem[];
}
interface SidebarCollapsedItem {
    label: string;
    link: string;
    isSelected: boolean;
}
type SidebarProps = {
    items: SidebarCategory[];
    expandedByDefault?: boolean;
    setSelectedItemPath: (path: string) => void;
};
export declare const Sidebar: ({ items, setSelectedItemPath, expandedByDefault }: SidebarProps) => React.JSX.Element;
export {};
