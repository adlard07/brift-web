"use client";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/context/myContext";
import { Sun, Moon, PanelLeft } from "lucide-react";

function Sidebar() {
  const { tabs, supportTabs, selectedTab, setSelectedTab } = useContext(UserContext);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) setIsExpanded(false);
  }, [isMobile]);

  const toggleSidebar = () => setIsExpanded((prev) => !prev);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const renderTabButton = (tabObj, isActive) => {
    const Icon = tabObj.icon;
    return (
      <button
        key={tabObj.tabName}
        title={!isExpanded ? tabObj.title : ""}
        className={`flex items-center gap-3 px-3 py-2 mb-1 rounded-md w-full text-left
        ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-700/20 text-gray-400"}`}
        onClick={() => {
          setSelectedTab(tabObj.tabName);
          if (isMobile) setIsExpanded(false); // auto-collapse on mobile
        }}
      >
        <Icon className="w-5 h-5" />
        {isExpanded && <span className="text-sm truncate">{tabObj.tabName}</span>}
      </button>
    );
  };

  return (
    <aside
      className={`h-screen flex flex-col justify-between shadow-md transition-all duration-300
        ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}
        ${isExpanded ? "w-64" : "w-20"} p-4 fixed md:static z-50`}
    >
      {/* Top Section */}
      <div>
        {/* Branding and Toggle */}
        <div className="flex items-center justify-start mb-8 px-2">
          <button title={"Open"} onClick={toggleSidebar} className="text-white hover:bg-gray-500 hover:rounded">
            <PanelLeft />
          </button>
        </div>


        {/* Main Tabs */}
        <div>
          {isExpanded && <p className="text-xs font-semibold mb-2">MENU</p>}
          {tabs.map((tab) => renderTabButton(tab, tab.tabName === selectedTab))}
        </div>

        {/* Support Tabs */}
        <div className="mt-6">
          {isExpanded && <p className="text-xs font-semibold mb-2">SUPPORT</p>}
          {supportTabs.map((tab) => renderTabButton(tab, tab.tabName === selectedTab))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
