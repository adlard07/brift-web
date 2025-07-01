"use client";
import { useMemo, useState } from "react";
import MonthHeatMap from "./MonthHeatMap";
import ExpensesTable from "./ExpensesTable";
import OverallSpendingGraph from "./OverallSpending";
import {
  IndianRupee,
  Wallet,
  PiggyBank,
  ReceiptText,
  TrendingUp,
} from "lucide-react";

/* ---------------- dummy expense rows ---------------- */
const dummyData = [
  { id: "EXP001", title: "Groceries",        amount: 400, category: "Food",      date: "2025-01-15", method: "Credit Card" },
  { id: "EXP002", title: "Electricity Bill", amount: 350, category: "Utilities", date: "2025-02-05", method: "Bank Transfer"},
  { id: "EXP003", title: "Dining Out",       amount: 500, category: "Food",      date: "2025-03-10", method: "UPI"          },
  { id: "EXP004", title: "Internet Bill",    amount: 450, category: "Utilities", date: "2025-04-03", method: "Credit Card"  },
  { id: "EXP005", title: "Shopping",         amount: 300, category: "Lifestyle", date: "2025-05-22", method: "Debit Card"   },
  { id: "EXP006", title: "Fuel",             amount: 420, category: "Transport", date: "2025-06-12", method: "Cash"         },
  { id: "EXP007", title: "Groceries",        amount: 400, category: "Food",      date: "2025-01-25", method: "Credit Card"  },
  { id: "EXP008", title: "Electricity Bill", amount: 350, category: "Utilities", date: "2025-02-14", method: "Bank Transfer"},
];

/* --------------- KPI helpers (static) --------------- */
const totalSpent      = dummyData.reduce((t, r) => t + r.amount, 0);
const totalBudget     = 5000;
const remainingBudget = totalBudget - totalSpent;
const txCnt           = dummyData.length;
const avgPerTx        = Math.round(totalSpent / txCnt);

const cards = [
  { name: "Total Spent",       amount: totalSpent,      icon: IndianRupee },
  { name: "Total Budget",      amount: totalBudget,     icon: Wallet },
  { name: "Remaining Budget",  amount: remainingBudget, icon: PiggyBank },
  { name: "Transactions",      amount: txCnt,           icon: ReceiptText },
  { name: "Avg / Transaction", amount: avgPerTx,        icon: TrendingUp },
];

const monthNames = [
  "January","February","March","April",
  "May","June","July","August",
  "September","October","November","December",
];

/* ---------------- component ---------------- */
export default function BudgetExpensePage() {
  const [monthIx, setMonthIx] = useState(new Date().getMonth()); // 0-11

  /* Build data array for the selected month (memoised) */
  const heatMapDays = useMemo(() => {
    const now    = new Date();
    const year   = now.getFullYear();               // use current year
    const days   = new Date(year, monthIx + 1, 0).getDate(); // #days in month

    /* sum expenses per day */
    const bucket = Array(days).fill(0);             // index 0 = day 1
    dummyData.forEach((row) => {
      const d = new Date(row.date);
      if (d.getMonth() === monthIx && d.getFullYear() === year) {
        bucket[d.getDate() - 1] += row.amount;
      }
    });

    return bucket.map((v, i) => ({ day: i + 1, value: v }));
  }, [monthIx]);

  /* ₹ formatter */
  const fmt = (v) =>
    typeof v === "number"
      ? v.toLocaleString("en-IN",{style:"currency",currency:"INR"})
      : v;

  return (
    <section className="space-y-8">
      {/* KPI cards */}
      <div className="flex flex-wrap sm:flex-nowrap gap-4">
        {cards.map(({ name, amount, icon:Icon }) => (
          <div key={name} className="flex-1 min-w-[150px] bg-zinc-800 text-white p-4 rounded-md">
            <div className="flex items-center gap-2 text-zinc-400">
              <Icon className="w-4 h-4"/> <span className="text-xs uppercase">{name}</span>
            </div>
            <h2 className="mt-1 text-lg font-semibold">
              {name==="Transactions" ? amount : fmt(amount)}
            </h2>
          </div>
        ))}
      </div>

      <div className="flex">
        <div className="bg-zinc-900 p-4">
          {/* Month selector */}
          <div className="flex items-center gap-3">
            <label className="text-sm text-zinc-300">Month:</label>
            <select
              value={monthIx}
              onChange={(e)=>setMonthIx(Number(e.target.value))}
              className="bg-zinc-800 text-white p-2 rounded-md"
            >
              {monthNames.map((m, i)=>(
                <option key={m} value={i}>{m}</option>
              ))}
            </select>
          </div>

          {/* Heat-map */}
          <div className="max-w-sm rounded-md">
            <MonthHeatMap days={heatMapDays}/>
          </div>
        </div>

        {/* Line Graph */}
        <div className="max-w-sm rounded-md">
          <OverallSpendingGraph days={dummyData}/>
        </div>
      </div>

      {/* Table */}
      <ExpensesTable data={dummyData}/>
    </section>
  );
}
