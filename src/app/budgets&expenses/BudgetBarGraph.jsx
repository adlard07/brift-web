import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const budgetData = [
  { name: "Jan", budget: 5000, actual: 4500 },
  { name: "Feb", budget: 4500, actual: 4200 },
  { name: "Mar", budget: 6000, actual: 5800 },
  { name: "Apr", budget: 5500, actual: 5000 },
  { name: "May", budget: 7000, actual: 6800 },
  { name: "June", budget: 7500, actual: 7400 },
  { name: "July", budget: 7500, actual: 7400 },
  { name: "Aug", budget: 7500, actual: 7400 },
  { name: "Sep", budget: 7500, actual: 7400 },
  { name: "Oct", budget: 7500, actual: 7400 },
  { name: "Nov", budget: 7500, actual: 7400 },
  { name: "Dec", budget: 7500, actual: 7400 },
];

const BudgetBarGraph = () => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={budgetData}
        barCategoryGap={20}
        barGap={-20} // allows bars to overlap
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" 
            tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
        <YAxis 
            tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
        <Tooltip />
        <Legend />

        {/* Background bar: Budget (wider and lighter) */}
        <Bar
          dataKey="budget"
          fill="green"
          name="Budget"
          barSize={25}
          radius={[4, 4, 0, 0]}
        >
          <LabelList
            dataKey="budget"
            content={({ x, y, value }) => (
              <text x={x} y={y - 6} fill="white" fontSize={13} textAnchor="middle">
                {value}
              </text>
            )}
          />
        </Bar>

        {/* Foreground bar: Actual (narrower and colored) */}
        <Bar
          dataKey="actual"
          fill="red"
          name="Spent"
          barSize={25}
          radius={[4, 4, 0, 0]}
        >
          <LabelList
            dataKey="actual"
            content={({ x, y, value }) => (
              <text x={x} y={y - 6} fill="white" fontSize={13} textAnchor="middle">
                {value}
              </text>
            )}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetBarGraph;
