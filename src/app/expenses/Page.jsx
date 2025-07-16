'use client';
import React, { useState } from 'react';
import {
  Plus,
  Filter,
  Search,
  Calendar,
  DollarSign,
  Tag,
  AlertTriangle,
  TrendingUp,
  Edit2,
  Trash2,
} from 'lucide-react';

const Expenses = () => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'food', name: 'Food & Dining', budget: 1000, spent: 850, color: '#10B981' },
    { id: 'housing', name: 'Housing', budget: 2000, spent: 1800, color: '#3B82F6' },
    { id: 'transport', name: 'Transportation', budget: 600, spent: 520, color: '#F59E0B' },
    { id: 'entertainment', name: 'Entertainment', budget: 400, spent: 450, color: '#EF4444' },
    { id: 'utilities', name: 'Utilities', budget: 300, spent: 280, color: '#8B5CF6' },
    { id: 'health', name: 'Healthcare', budget: 500, spent: 320, color: '#06B6D4' },
  ];

  const expenses = [
    { id: 1, description: 'Grocery Shopping', amount: 125, category: 'food', date: '2025-01-10', type: 'expense' },
    { id: 2, description: 'Netflix Subscription', amount: 15, category: 'entertainment', date: '2025-01-09', type: 'expense' },
    { id: 3, description: 'Gas Station', amount: 45, category: 'transport', date: '2025-01-08', type: 'expense' },
    { id: 4, description: 'Restaurant Dinner', amount: 85, category: 'food', date: '2025-01-07', type: 'expense' },
    { id: 5, description: 'Electricity Bill', amount: 120, category: 'utilities', date: '2025-01-06', type: 'expense' },
  ];

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'food',
    date: new Date().toISOString().split('T')[0],
  });

  const handleAddExpense = () => {
    // Add expense logic here
    console.log('Adding expense:', newExpense);
    setShowAddExpense(false);
    setNewExpense({ description: '', amount: '', category: 'food', date: new Date().toISOString().split('T')[0] });
  };

  const getBudgetStatus = (category) => {
    const percentage = (category.spent / category.budget) * 100;
    if (percentage > 100) return 'exceeded';
    if (percentage > 80) return 'warning';
    return 'good';
  };

  const getBudgetColor = (status) => {
    switch (status) {
      case 'exceeded': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const filteredExpenses = expenses.filter(expense =>
    (selectedCategory === 'all' || expense.category === selectedCategory) &&
    expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Expenses & Budgets</h1>
        <button
          onClick={() => setShowAddExpense(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors mt-4 sm:mt-0"
        >
          <Plus className="w-5 h-5" />
          <span>Add Expense</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const status = getBudgetStatus(category);
          const percentage = Math.min((category.spent / category.budget) * 100, 100);

          return (
            <div key={category.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                {status === 'exceeded' && <AlertTriangle className="w-5 h-5 text-red-500" />}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Spent</span>
                  <span className="font-medium text-gray-900 dark:text-white">${category.spent}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Budget</span>
                  <span className="font-medium text-gray-900 dark:text-white">${category.budget}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getBudgetColor(status)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className={`font-medium ${
                    status === 'exceeded' ? 'text-red-600' :
                    status === 'warning' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {percentage.toFixed(1)}% used
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ${category.budget - category.spent} left
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {categories.some(cat => getBudgetStatus(cat) === 'exceeded') && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Budget Exceeded</h3>
              <p className="text-sm text-red-700 dark:text-red-300">
                You've exceeded your budget in {categories.filter(cat => getBudgetStatus(cat) === 'exceeded').length} categories.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Expenses</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Tag className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{expense.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {categories.find(cat => cat.id === expense.category)?.name} • {expense.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  ${expense.amount}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Expense</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                  placeholder="Enter expense description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddExpense(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExpense}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
