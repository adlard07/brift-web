import {createContext, useContext, useState} from "react";
import IncomeInvestmentPage from "@/app/income&investment/Page";
import ToolsPage from "@/app/tools/Page";
import BudgetExpensePage from "@/app/budgets&expenses/Page";
import ReportPage from "@/app/report/Page";
import SettingsPage from "@/app/settings/Page";
import {
  BarChart3,
  CreditCard,
  Target,
  DollarSign,
  Drill,
  PieChart,
  Settings,
} from "lucide-react";

export const UserContext = createContext(null)

function MyContext({children}) {
	const tabs = [
	{
	  tab: <ReportPage />,
	  tabName: "AI Report",
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
	{
	  tab: <SettingsPage />,
	  tabName: "Settings",
	  title: "Adjust your preferences",
	  icon: Settings,
	},
	];

  	const [selectedTab, setSelectedTab] = useState("AI Report");

	return(
		<UserContext.Provider value={{
			tabs,
			selectedTab, setSelectedTab,
		}}>
			{children}
		</UserContext.Provider>
	)
}
export default MyContext;