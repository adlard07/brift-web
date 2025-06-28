import { useContext } from "react";
import Header from "@/components/Header";
import MyContext, { UserContext } from "@/app/context/myContext";

function MainContent() {
	const { tabs, selectedTab } = useContext(UserContext);

	return (
		<div className="">
			<Header />
			<div className="pt-10 bg-[#1A1A1A] min-h-screen">
				<div className="transition-all duration-500 ease-out p-6">
					{tabs.find((tabObj) => tabObj.tabName === selectedTab)?.tab}
				</div>
			</div>
		</div>
	);
}

function App() {
	return (
		<MyContext>
			<MainContent />
		</MyContext>
	);
}

export default App;
