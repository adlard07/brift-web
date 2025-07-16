'use client';

import React, { useState, memo } from 'react';
import {
  DollarSign,
  CreditCard,
  PiggyBank,
  TrendingUp,
  Calendar,
  AlertCircle,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

// --- Constants & Data Definitions ---

// Hardcoded data for demonstration purposes
const DASHBOARD_STATS = {
  totalIncome: 8500,
  totalExpenses: 6200,
  totalSavings: 2300,
  totalInvestments: 15400,
};

const UPCOMING_BILLS = [
  { name: 'Rent', amount: 1200, date: '2025-01-15', category: 'Housing' },
  { name: 'Utilities', amount: 280, date: '2025-01-18', category: 'Utilities' },
  { name: 'Insurance', amount: 450, date: '2025-01-20', category: 'Insurance' },
  { name: 'Phone Bill', amount: 85, date: '2025-01-22', category: 'Utilities' },
];

const EXPENSE_CATEGORIES = [
  { name: 'Housing', amount: 1800, percentage: 29, color: '#3B82F6' }, // Blue
  { name: 'Food', amount: 1200, percentage: 19, color: '#10B981' },    // Green
  { name: 'Transportation', amount: 800, percentage: 13, color: '#F59E0B' }, // Amber
  { name: 'Entertainment', amount: 600, percentage: 10, color: '#EF4444' }, // Red
  { name: 'Utilities', amount: 500, percentage: 8, color: '#8B5CF6' }, // Purple
  { name: 'Others', amount: 1300, percentage: 21, color: '#6B7280' },   // Gray
];

const TREND_DATA = [
  { month: 'Jul', income: 7800, expenses: 5900 },
  { month: 'Aug', income: 8200, expenses: 6100 },
  { month: 'Sep', income: 8000, expenses: 5800 },
  { month: 'Oct', income: 8500, expenses: 6200 },
  { month: 'Nov', income: 8300, expenses: 6000 },
  { month: 'Dec', income: 8700, expenses: 6400 },
];

// --- Reusable Components ---

const StatCard = memo(({ title, amount, icon: Icon, trend, trendValue }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">${amount.toLocaleString()}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center">
        {trend === 'up' ? (
          <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
        ) : (
          <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
        )}
        <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trendValue}% from last month
        </span>
      </div>
    )}
  </div>
));

const SimpleChart = memo(({ data }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Spending Trends</h3>
    <div className="flex h-64 items-end space-x-4">
      {data.map((item, index) => (
        <div key={index} className="flex flex-1 flex-col items-center">
          <div className="w-full space-y-1">
            {/* Income Bar */}
            <div
              className="rounded-t bg-blue-500"
              style={{ height: `${(item.income / Math.max(...data.map(d => d.income))) * 150}px` }} // Scaled relative to max income
            />
            {/* Expenses Bar */}
            <div
              className="rounded-b bg-red-400"
              style={{ height: `${(item.expenses / Math.max(...data.map(d => d.expenses))) * 150}px` }} // Scaled relative to max expenses
            />
          </div>
          <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">{item.month}</span>
        </div>
      ))}
    </div>
    <div className="mt-4 flex justify-center space-x-6">
      <div className="flex items-center">
        <div className="mr-2 h-3 w-3 rounded bg-blue-500" />
        <span className="text-sm text-gray-600 dark:text-gray-400">Income</span>
      </div>
      <div className="flex items-center">
        <div className="mr-2 h-3 w-3 rounded bg-red-400" />
        <span className="text-sm text-gray-600 dark:text-gray-400">Expenses</span>
      </div>
    </div>
  </div>
));

const PieChart = memo(({ data }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Expense Categories</h3>
    <div className="space-y-3">
      {data.map((category, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">${category.amount}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{category.percentage}%</p>
          </div>
        </div>
      ))}
    </div>
  </div>
));

// --- Main Dashboard Component ---

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('monthly');

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8"> {/* Added padding for overall layout */}
      {/* Header */}
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <div className="mt-4 flex items-center space-x-2 sm:mt-0">
          <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-400"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      ---

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Income"
          amount={DASHBOARD_STATS.totalIncome}
          icon={DollarSign}
          trend="up"
          trendValue={12}
        />
        <StatCard
          title="Total Expenses"
          amount={DASHBOARD_STATS.totalExpenses}
          icon={CreditCard}
          trend="down"
          trendValue={8}
        />
        <StatCard
          title="Total Savings"
          amount={DASHBOARD_STATS.totalSavings}
          icon={PiggyBank}
          trend="up"
          trendValue={15}
        />
        <StatCard
          title="Total Investments"
          amount={DASHBOARD_STATS.totalInvestments}
          icon={TrendingUp}
          trend="up"
          trendValue={23}
        />
      </div>

      ---

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SimpleChart data={TREND_DATA} />
        <PieChart data={EXPENSE_CATEGORIES} />
      </div>

      ---

      {/* Upcoming Bills */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Upcoming Bills & Goals</h3>
        <div className="space-y-3">
          {UPCOMING_BILLS.map((bill, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{bill.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{bill.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">${bill.amount}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{bill.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;