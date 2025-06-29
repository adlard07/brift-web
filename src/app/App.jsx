import { useContext } from "react";
import { UserContext } from "@/app/context/myContext";
import Sidebar from "@/components/Header"; // assuming Sidebar is here

export default function AppLayout() {
  const { tabs, supportTabs, selectedTab } = useContext(UserContext);

  const allTabs = [...tabs, ...supportTabs];
  const activeTab = allTabs.find((tab) => tab.tabName === selectedTab);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="px-4 w-full">
          <h3 className="text-2xl">
            brift
        	<span className="text-4xl text-orange-500">.</span>
          </h3>
        {activeTab?.tab}
        </div>
      </main>
    </div>
  );
}
