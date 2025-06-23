"use client";
import { useState } from "react";
import OverallSpendingGraph from "./OverallSpending";
import ExpensesTable from "./ExpensesTables";
import StatCards from "./StatCards";

const dummyData = [
  {
    id: "EXP001",
    title: "Groceries",
    amount: 400,
    category: "Food",
    date: "2025-01-15",
    method: "Credit Card",
    description: "Weekly supermarket run",
    month: "Jan",
    expense: 400,
  },
  {
    id: "EXP002",
    title: "Electricity Bill",
    amount: 350,
    category: "Utilities",
    date: "2025-02-05",
    method: "Bank Transfer",
    description: "Monthly electricity charges",
    month: "Feb",
    expense: 350,
  },
  {
    id: "EXP003",
    title: "Dining Out",
    amount: 500,
    category: "Food",
    date: "2025-03-10",
    method: "UPI",
    description: "Dinner at restaurant",
    month: "Mar",
    expense: 500,
  },
  {
    id: "EXP004",
    title: "Internet Bill",
    amount: 450,
    category: "Utilities",
    date: "2025-04-03",
    method: "Credit Card",
    description: "Broadband bill",
    month: "Apr",
    expense: 450,
  },
  {
    id: "EXP005",
    title: "Shopping",
    amount: 300,
    category: "Lifestyle",
    date: "2025-05-22",
    method: "Debit Card",
    description: "Clothing purchase",
    month: "May",
    expense: 300,
  },
  {
    id: "EXP006",
    title: "Fuel",
    amount: 420,
    category: "Transport",
    date: "2025-06-12",
    method: "Cash",
    description: "Petrol refill",
    month: "Jun",
    expense: 420,
  },
  {
    id: "EXP007",
    title: "Groceries",
    amount: 400,
    category: "Food",
    date: "2025-01-15",
    method: "Credit Card",
    description: "Weekly supermarket run",
    month: "Jan",
    expense: 400,
  },
  {
    id: "EXP008",
    title: "Electricity Bill",
    amount: 350,
    category: "Utilities",
    date: "2025-02-05",
    method: "Bank Transfer",
    description: "Monthly electricity charges",
    month: "Feb",
    expense: 350,
  },
  {
    id: "EXP009",
    title: "Dining Out",
    amount: 500,
    category: "Food",
    date: "2025-03-10",
    method: "UPI",
    description: "Dinner at restaurant",
    month: "Mar",
    expense: 500,
  },
  {
    id: "EXP0010",
    title: "Internet Bill",
    amount: 450,
    category: "Utilities",
    date: "2025-04-03",
    method: "Credit Card",
    description: "Broadband bill",
    month: "Apr",
    expense: 450,
  },
  {
    id: "EXP0011",
    title: "Shopping",
    amount: 300,
    category: "Lifestyle",
    date: "2025-05-22",
    method: "Debit Card",
    description: "Clothing purchase",
    month: "May",
    expense: 300,
  },
  {
    id: "EXP0012",
    title: "Fuel",
    amount: 420,
    category: "Transport",
    date: "2025-06-12",
    method: "Cash",
    description: "Petrol refill",
    month: "Jun",
    expense: 420,
  },
  {
    id: "EXP013",
    title: "Car Insurance",
    amount: 1200,
    category: "Insurance",
    date: "2025-07-10",
    method: "Bank Transfer",
    description: "Annual premium due",
    month: "Jul",
    expense: 1200,
    isUpcoming: true,
  },
  {
    id: "EXP014",
    title: "Vacation Booking",
    amount: 3000,
    category: "Leisure",
    date: "2025-08-01",
    method: "Credit Card",
    description: "Advance hotel payment",
    month: "Aug",
    expense: 3000,
    isUpcoming: true,
  },
];

function ExpensePage() {
  const [selectedRange, setSelectedRange] = useState("Current quarter");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter expense
  const filteredData = dummyData.filter((item) => {
    const matchesTitle = item.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesTitle && matchesCategory;
  });

  const handleCreateExpense = () => {};

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Add expense card */}
      <button
        className="flex items-center justify-center bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 
          rounded-xl px-6 py-2 hover:scale-110 transition-all duration-300 hover:bg-zinc-800 ease-out hover:cursor-pointer ml-auto"
        onClick={handleCreateExpense}
      >
        <p className="mr-2 text-lg">Add Expense</p>
        <span className="text-2xl font-extralight">+</span>
      </button>

      {/* Stats Cards */}
      <div className="">
        <StatCards dummyData={dummyData} />
      </div>

      {/* Chart Section */}
      <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            Overall Spending
          </h2>
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="bg-zinc-800/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl border border-zinc-600/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-200 hover:bg-zinc-700/80"
          >
            <option>Current quarter</option>
            <option>Current half</option>
            <option>Current Year</option>
            <option>Past 2 Years</option>
            <option>Max</option>
          </select>
        </div>
        <OverallSpendingGraph dummyData={dummyData} />
      </div>

      {/* Transactions Table */}
      <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-700/50 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-zinc-700/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">Expenses</h2>

          <div className="flex gap-3 flex-wrap">
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search by title..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-zinc-800 text-white px-10 py-2 rounded-lg border border-zinc-600/50 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            />

            {/* Filter dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-600/50 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            >
              <option value="All">All Categories</option>
              {[...new Set(dummyData.map((item) => item.category))].map(
                (category) => (
                  <option key={category}>{category}</option>
                )
              )}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <ExpensesTable dummyData={dummyData} />
        </div>
      </div>
    </div>
  );
}

export default ExpensePage;
