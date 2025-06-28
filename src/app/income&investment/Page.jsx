import IncomeCards from "./IncomeCards";
import IncomePie from "./IncomePie";

function IncomePage() {
  const incomeData = [
    {
      name: "Full Stack Software Engineer",
      companyName: "EduvanceAI",
      salary: "33000",
      startedOn: "03/2025",
      contract: false,
    },
    {
      name: "AI Developer",
      companyName: "Vanmat Technologies",
      salary: "15000",
      startedOn: "03/2025",
      contract: false,
    }
  ]

  const d = new Date()
  let netWorth = 0
  incomeData.map((income) => {
      netWorth += parseFloat(income.salary)
    })  
  console.log(netWorth)

  return (
    <div className="p-1">
      <div className="flex">
        {/*Net worth card*/}
        <div className="bg-gradient-to-br from-zinc-700/70 to-zinc-500/60 text-white p-6 rounded-2xl shadow-lg max-w-xs">
          <h2 className="text-sm font-medium uppercase tracking-wider text-white/80 mb-1">Net Worth</h2>
          <p className="text-3xl font-bold">₹ {netWorth.toLocaleString()}</p>
        </div>

        {/*List of incomes*/}
        <div>
          <IncomeCards incomeData={incomeData}/>
        </div>
      </div>

      {/*Pie chart distribution*/}
      <div>
        <IncomePie incomeData={incomeData}/>
      </div>

      {/*Payments recieved list*/}
      <div></div>

    </div>
    )
}
export default IncomePage;
