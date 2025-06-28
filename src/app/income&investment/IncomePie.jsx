import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Define custom colors
const COLORS = ["#82ca9d", "#8884d8", "#ffc658", "#ff8042", "#a4de6c", "#d0ed57"];

const IncomePie = ({ incomeData }) => {
  // Convert salary to number for percentage calculation
  const formattedData = incomeData.map((item) => ({
    name: item.companyName,
    value: parseFloat(item.salary),
  }));

  return (
    <div className="bg-zinc-800/30 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">
        Income Contribution Distribution
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={formattedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomePie;
