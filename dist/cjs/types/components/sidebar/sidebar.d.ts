import React from "react";
interface SidebarCategory {
    label?: string;
    items: (SidebarItem | SidebarCollapsibleItem)[];
}
interface SidebarItem {
    label: string;
    link: string;
    icon: React.ReactNode;
}
interface SidebarCollapsibleItem {
    label: string;
    icon: React.ReactNode;
    items: SidebarCollapsedItem[];
}
interface SidebarCollapsedItem {
    label: string;
    link: string;
}
type SidebarProps = {
    items: SidebarCategory[];
    expandedByDefault?: boolean;
};
export declare const Sidebar: ({ items, expandedByDefault }: SidebarProps) => React.JSX.Element;
export {};
