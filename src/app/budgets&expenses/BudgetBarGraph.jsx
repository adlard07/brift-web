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
} from "recharts";

const budgetData = [
  { name: "January", budget: 5000, actual: 4500 },
  { name: "February", budget: 4500, actual: 4200 },
  { name: "March", budget: 6000, actual: 5800 },
  { name: "April", budget: 5500, actual: 5000 },
  { name: "May", budget: 7000, actual: 6800 },
  { name: "June", budget: 7500, actual: 7400 },
];

const BudgetExpensePage = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={budgetData} barCategoryGap={10}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="budget" fill="#8884d8" name="Budget" />
        <Bar dataKey="actual" fill="#82ca9d" name="Actual Spend" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetExpensePage;
