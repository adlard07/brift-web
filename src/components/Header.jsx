"use client";
import React, { useState, useContext } from "react";
import { UserContext } from "@/app/context/myContext";

function Header() {
  const {
    tabs, 
    selectedTab, 
    setSelectedTab
  } = useContext(UserContext)


  return (
    <div className="absolute bg-[#2A2A2A] px-6 py-1/5 border-b-1 border-gray-900 w-full">
      {/*Header*/}
      <div className="flex justify-between items-center gap-20 w-full">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text 
          text-transparent">
          brift 
          <span className="text-orange-600">.</span>
        </h1>

        {/* Tab Navigation */}
        <div className="flex gap-2">
          {tabs.map((tabObj) => {
            const isActive = tabObj.tabName === selectedTab;
            const IconComponent = tabObj.icon;

            return (
              <button
                key={tabObj.tabName}
                title={tabObj.title}
                className={`flex items-center gap-2 px-6 py-4 rounded-xs transition-all duration-300 
                ease-out whitespace-nowrap min-w-fit ${
                  isActive
                    ? "bg-zinc-700/25 text-white shadow-lg shadow-zinc-900/25"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-700/50"
                } hover:cursor-pointer`}
                onClick={() => setSelectedTab(tabObj.tabName)}
              >
                <IconComponent
                  className={`w-4 h-4 ${isActive ? "text-orange-500" : ""}`}
                />
                <span className="text-sm">{tabObj.tabName}</span>
              </button>
            );
          })}
        </div>

        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text 
          text-transparent">
          Profile
          <span className="text-orange-600">.</span>
        </h1>
      </div>
    </div>
  );
}

export default Header;
 