import React, { useState } from "react";
import { ArrowForwardFilledIcon, ExpandFilledIcon, WBLogoIcon } from "../../icons";
import { RunsOnWandelbotsOSLogo } from "../assets";

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

export const Sidebar = ({ items, expandedByDefault = true }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(expandedByDefault);
  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const [uncollapsedSection, setUncollapsedSection] = useState<number | undefined>(undefined);

  return (
    <div
      // To animate, use `transition-width duration-300`, but this will make several opacity animations necessary
      className={`h-full fixed top-0 left-0 bg-[#010B23] ${isExpanded ? "w-64" : "w-16"} flex flex-col justify-between`}
    >
      <div className="mx-4 my-6 flex flex-col justify-between h-full">
        <div className="flex-grow">
          <a href="/">
            <h1 className={`text-white text-xl mb-2 ${isExpanded ? "" : "hidden"}`}>
              Developer <span className="text-[#FF0E65]">Portal</span>
            </h1>
            <div className="flex justify-center items-center mb-2">{!isExpanded && <WBLogoIcon />}</div>
          </a>
          <ul className="list-none m-0 p-0">
            {items.map((category, index) => (
              <li key={index} className="my-4">
                {category.label && isExpanded && (
                  <div className="text-white uppercase mx-1 mt-7" style={{ fontSize: "10px" }}>
                    {category.label}
                  </div>
                )}
                {category.items.map((item, index) =>
                  item.hasOwnProperty("items") ? (
                    <SidebarCollapsibleItemComponent
                      key={index}
                      item={item as SidebarCollapsibleItem}
                      isCollapsed={uncollapsedSection !== index}
                      toggleIsCollapsed={() => {
                        setUncollapsedSection(uncollapsedSection === index ? undefined : index);
                      }}
                      sidebarIsExpanded={isExpanded}
                    />
                  ) : (
                    <SidebarItemComponent key={index} item={item as SidebarItem} sidebarIsExpanded={isExpanded} />
                  )
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={`flex ${isExpanded ? "justify-between" : "justify-center"}`}>
          {isExpanded && (
            <div className="ml-4">
              <RunsOnWandelbotsOSLogo />
            </div>
          )}
          <button onClick={toggleSidebar} className="text-white">
            {isExpanded ? (
              <div style={{ transform: "rotate(180deg)" }}>
                <ArrowForwardFilledIcon />
              </div>
            ) : (
              <ArrowForwardFilledIcon />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

function SidebarItemComponent({ item, sidebarIsExpanded }: { item: SidebarItem; sidebarIsExpanded: boolean }) {
  return (
    <li className="list-none mx-1 p-0 my-6">
      <a href={item.link} className="flex items-center text-white">
        <span className="mr-6">{item.icon}</span>
        {sidebarIsExpanded && item.label}
      </a>
    </li>
  );
}

function SidebarCollapsibleItemComponent({
  item,
  isCollapsed,
  toggleIsCollapsed,
  sidebarIsExpanded,
}: {
  item: SidebarCollapsibleItem;
  isCollapsed: boolean;
  toggleIsCollapsed: () => void;
  sidebarIsExpanded: boolean;
}) {
  return (
    <li className="text-white list-none mx-1 p-0 my-6">
      <button className="w-full" onClick={toggleIsCollapsed} disabled={!sidebarIsExpanded}>
        <div className="flex items-center">
          <span className="mr-6">{item.icon}</span>
          <div className="flex justify-between flex-1">
            {sidebarIsExpanded && item.label}

            {sidebarIsExpanded &&
              (isCollapsed ? (
                <ExpandFilledIcon />
              ) : (
                <div style={{ transform: "rotate(180deg)" }}>
                  <ExpandFilledIcon />
                </div>
              ))}
          </div>
        </div>
      </button>

      {sidebarIsExpanded && !isCollapsed && (
        <ul className="list-none">
          {item.items.map((collapsedItem, index) => (
            <li key={index} className="text-sm list-none ml-12 p-0 my-4">
              <a href={collapsedItem.link} className="text-white">
                {collapsedItem.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
