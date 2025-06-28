const IncomeCards = ({ incomeData }) => {
  return (
    <div className="bg-zinc-800/30 rounded-2xl p-6 shadow-xl">
      <h2 className="text-lg text-white">Income Sources</h2>

      <div className="grid gap-4 hover:gap-4">
        {incomeData.map((income, index) => (
          <div
            key={index}
            className="bg-zinc-900/40 border border-zinc-700/50 rounded-xl p-4 
            shadow hover:scale-102 transition-transform duration-300"
          >
            <h3 className="text-md text-white">{income.name}</h3>
            <p className="text-xs text-zinc-400">{income.companyName}</p>
            <p className="text-xs text-green-400 font-medium mt-2">₹ {income.salary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeCards;
