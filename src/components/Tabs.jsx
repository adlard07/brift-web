"use client";
import { useState } from "react";
import BudgetPage from "@/app/budgets/Page";
import IncomePage from "@/app/income/Page";
import CalculatorPage from "@/app/calculator/Page";
import ExpensePage from "@/app/transactions/Page";
import PortfolioPage from "@/app/portfolio/Page";
import ReportPage from "@/app/report/Page";
import SettingsPage from "@/app/settings/Page";
import {
  BarChart3,
  CreditCard,
  Target,
  DollarSign,
  Calculator,
  PieChart,
  Settings,
} from "lucide-react";
import React from "react";

function Tabs() {
  const [selectedTab, setSelectedTab] = useState("Report");

  const tabs = [
    {
      tab: <ReportPage />,
      tabName: "Report",
      title: "View expense reports",
      icon: BarChart3,
      color: "text-blue-400",
    },
    {
      tab: <ExpensePage />,
      tabName: "Transactions",
      title: "Track all your transactions",
      icon: CreditCard,
      color: "text-red-400",
    },
    {
      tab: <BudgetPage />,
      tabName: "Budgets",
      title: "Plan and review your budgets",
      icon: Target,
      color: "text-orange-400",
    },
    {
      tab: <IncomePage />,
      tabName: "Income",
      title: "Log your income sources",
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      tab: <CalculatorPage />,
      tabName: "Calculator",
      title: "Use built-in financial calculator",
      icon: Calculator,
      color: "text-cyan-400",
    },
    {
      tab: <PortfolioPage />,
      tabName: "Portfolio",
      title: "See your portfolio breakdown",
      icon: PieChart,
      color: "text-indigo-400",
    },
    {
      tab: <SettingsPage />,
      tabName: "Settings",
      title: "Adjust your preferences",
      icon: Settings,
      color: "text-zinc-400",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc px-6 py-4">
      {/* Top Header Row: Brift + Tabs */}
      <div className="flex items-center gap-20 mb-6">
        {/* Logo/Title */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
          Brift
        </h1>

        {/* Tab Navigation */}
        <div className="flex gap-1 p-1 bg-zinc-800/40 rounded-xl backdrop-blur-sm border border-zinc-700/50 overflow-x-auto">
          {tabs.map((tabObj) => {
            const isActive = tabObj.tabName === selectedTab;
            const IconComponent = tabObj.icon;

            return (
              <button
                key={tabObj.tabName}
                title={tabObj.title}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ease-out whitespace-nowrap min-w-fit ${
                  isActive
                    ? "bg-zinc-800 text-white shadow-lg shadow-zinc-900/25 scale-105"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-700/50"
                } hover:cursor-pointer`}
                onClick={() => setSelectedTab(tabObj.tabName)}
              >
                <IconComponent
                  className={`w-4 h-4 ${isActive ? tabObj.color : ""}`}
                />
                <span className="text-md font-medium">{tabObj.tabName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative">
        <div className="transition-all duration-500 ease-out">
          {tabs.find((tabObj) => tabObj.tabName === selectedTab)?.tab}
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-4 w-24 h-24 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl"></div>
        <div className="absolute -left-4 w-32 h-32 bg-gradient-to-r from-green-500/30 to-cyan-500/30 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}

export default Tabs;
