"use client";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const chartColors = [
  "#10B981",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#F59E0B",
  "#EF4444",
];

export default function InsightsSection({ dummyData }) {
  const [trendType, setTrendType] = useState("Daily");

  const upcoming = dummyData.filter((item) => item.isUpcoming);
  const trendData = [
    { period: "Week 1", avg: 320 },
    { period: "Week 2", avg: 410 },
    { period: "Week 3", avg: 380 },
    { period: "Week 4", avg: 450 },
  ];

  const categoryTotals = Object.entries(
    dummyData.reduce((acc, item) => {
      if (!item.isUpcoming) {
        acc[item.category] = (acc[item.category] || 0) + item.amount;
      }
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Trend Chart */}
      <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm p-6 rounded-2xl border border-zinc-700/30 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            📈 Avg {trendType} Trends
          </h3>
          <select
            value={trendType}
            onChange={(e) => setTrendType(e.target.value)}
            className="bg-zinc-800/80 text-white px-3 py-2 rounded-lg text-sm border border-zinc-600/50 focus:ring-2 focus:ring-amber-500/50 transition-all"
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={trendData}>
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              opacity={0.3}
            />
            <XAxis dataKey="period" stroke="#9CA3AF" tick={{ fontSize: 11 }} />
            <YAxis stroke="#9CA3AF" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(24, 24, 27, 0.95)",
                borderColor: "#52525b",
                color: "#fff",
                borderRadius: "8px",
                backdropFilter: "blur(8px)",
              }}
            />
            <Line
              type="monotone"
              dataKey="avg"
              stroke="red"
              strokeWidth={1}
              dot={{ r: 4, fill: "#F59E0B", stroke: "#1f2937", strokeWidth: 2 }}
              fill="url(#trendGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm p-6 rounded-2xl border border-zinc-700/30 shadow-xl">
        <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
          🍰 Category Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={categoryTotals}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={85}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {categoryTotals.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(24, 24, 27, 0.95)",
                borderColor: "#52525b",
                color: "#fff",
                borderRadius: "8px",
                backdropFilter: "blur(8px)",
              }}
              formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Upcoming Expenses */}
      <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm p-6 rounded-2xl border border-zinc-700/30 shadow-xl">
        <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
          ⏰ Upcoming Expenses
        </h3>
        <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
          {upcoming.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-zinc-400">All caught up!</p>
            </div>
          ) : (
            upcoming.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-800/30 p-3 rounded-lg border border-zinc-700/30 hover:bg-zinc-700/20 transition-all"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-white font-medium">{item.title}</span>
                  <span className="text-amber-400 font-bold text-sm">
                    ₹{item.amount.toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-zinc-400 mb-1">
                  📅{" "}
                  {new Date(item.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <p className="text-xs text-zinc-500 truncate">
                  {item.description}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
