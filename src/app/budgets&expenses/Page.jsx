"use client";
import { useState } from "react";
import OverallSpendingGraph from "./OverallSpending";
import BudgetBarGraph from "./BudgetBarGraph"
import ExpensesTable from "./ExpensesTable";
import ExpenseHeatmap from "./ExpenseHeatmap";

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
];

function BudgetExpensePage() {
  const [selectedRange, setSelectedRange] = useState("Current quarter");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const handleCreateExpense = () => {};
  const handleCreateBudget = () => {};

  return (
    <div className="">
      
    </div>
  );
}

export default BudgetExpensePage;
