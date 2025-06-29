"use client";
import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { addDays, format, parseISO } from "date-fns";

const getColorClass = (count) => {
  if (count === 0) return "color-empty";
  if (count < 200) return "color-scale-1";
  if (count < 400) return "color-scale-2";
  if (count < 600) return "color-scale-3";
  return "color-scale-4";
};

const ExpenseHeatmap = ({ dummyData }) => {
  // Aggregate expenses by date
  const expenseMap = dummyData.reduce((map, item) => {
    const date = format(new Date(item.date), "yyyy-MM-dd");
    map[date] = (map[date] || 0) + item.amount;
    return map;
  }, {});

  // Convert to array for heatmap
  const heatmapData = Object.keys(expenseMap).map((date) => ({
    date,
    count: expenseMap[date],
  }));

  // Calculate date range (e.g., last 6 months)
  const endDate = new Date();
  const startDate = addDays(endDate, -31);

  return (
    <div className="p-6">
      <h3 className="text-white font-semibold mb-2">Expense Calendar</h3>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) return "color-empty";
          return getColorClass(value.count);
        }}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) return null;
          return {
            "data-tip": `${value.date}: ₹${value.count}`,
          };
        }}
        showWeekdayLabels
      />
    </div>
  );
};

export default ExpenseHeatmap;
