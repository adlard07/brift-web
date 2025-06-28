"use client";
import { useState } from "react";
import OverallSpendingGraph from "./OverallSpending";
import BudgetBarGraph from "./BudgetBarGraph"
import ExpensesTable from "./ExpensesTable";
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
];

function BudgetExpensePage() {
  const [selectedRange, setSelectedRange] = useState("Current quarter");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter expense
  const filteredData = dummyData.filter((item) => {});

  const handleCreateExpense = () => {};
  const handleCreateBudget = () => {};

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/*Create expense*/}
      <div className="flex gap-4 justify-end w-full">
        <button
          className="flex items-center justify-center bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 
          rounded-xl px-6 py-2 hover:scale-110 transition-all duration-300 hover:bg-zinc-800 ease-out hover:cursor-pointer"
          onClick={handleCreateExpense}
        >
          <p className="mr-2 text-lg">Add Expense</p>
          <span className="text-2xl font-extralight">+</span>
        </button>
      </div>

      {/* Chart Section */}
      <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-700/50 rounded-xl 
        overflow-hidden shadow-2xl">
        <div className="flex items-center px-6 py-2">
          <h2 className="text-md text-white">
            Overall Trend
          </h2>
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="bg-zinc-800/80 backdrop-blur-sm text-md text-white py-2 px-1 rounded-sm 
            border border-zinc-600/50 focus:outline-none hover:bg-zinc-700/80 ml-auto"
          >
            <option>Current quarter</option>
            <option>Current half</option>
            <option>Current Year</option>
            <option>Past 2 Years</option>
            <option>Max</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-6 border border-zinc-700/30 pt-4">
          <div className="flex-1 min-w-[300px]">
            <OverallSpendingGraph dummyData={dummyData} />
          </div>
          <div className="flex-1 min-w-[300px]">
            <BudgetBarGraph />
          </div>
        </div>
      </div>



      {/* Transactions Table */}
      <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-700/50 rounded-2xl 
        overflow-hidden shadow-2xl">
        <div className="px-6 py-2 border-b border-zinc-700/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-md font-semibold font-light text-white">
            Expenses
          </h2>

          <div className="flex gap-3 flex-wrap">
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search expense..."
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
        <div className="pb-4">
          <ExpensesTable dummyData={dummyData} />
        </div>
      </div>


      {/* Stats Cards */}
      {/*<div className="">
        <StatCards dummyData={dummyData} />
      </div>
      */}

    </div>
  );
}

export default BudgetExpensePage;
