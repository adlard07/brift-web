import { createContext, useState } from "react";
import IncomeInvestmentPage from "@/app/income&investment/Page";
import ToolsPage from "@/app/tools/Page";
import BudgetExpensePage from "@/app/budgets&expenses/Page";
import ReportPage from "@/app/report/Page";
import SettingsPage from "@/app/settings/Page";
import HelpPage from "@/app/help/Page";
import {
  BarChart3,
  CreditCard,
  DollarSign,
  Drill,
  Settings,
  MessageCircleQuestionMark,
} from "lucide-react";

export const UserContext = createContext(null);

function MyContext({ children }) {
  const tabs = [
    {
      tab: <ReportPage />,
      tabName: "Dashboard",
      title: "View expense reports",
      icon: BarChart3,
    },
    {
      tab: <BudgetExpensePage />,
      tabName: "Budgets & Expenses",
      title: "Track all your expenses",
      icon: CreditCard,
    },
    {
      tab: <IncomeInvestmentPage />,
      tabName: "Income & Investments",
      title: "Log your income sources",
      icon: DollarSign,
    },
    {
      tab: <ToolsPage />,
      tabName: "Tools",
      title: "Use built-in financial calculator",
      icon: Drill,
    },
  ];

  const supportTabs = [
    {
      tab: <SettingsPage />,
      tabName: "Setting",
      title: "Account settings",
      icon: Settings,
    },
    {
      tab: <HelpPage />,
      tabName: "Help",
      title: "Get help",
      icon: MessageCircleQuestionMark,
    },
  ];

  const [selectedTab, setSelectedTab] = useState("Dashboard");

  return (
    <UserContext.Provider value={{ tabs, supportTabs, selectedTab, setSelectedTab }}>
      {children}
    </UserContext.Provider>
  );
}

export default MyContext;
