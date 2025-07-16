'use client';
import React, { useState } from 'react';
import {
  Target,
  Plus,
  Calendar,
  DollarSign,
  TrendingUp,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
} from 'lucide-react';

const Goals = () => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const goals = [
    {
      id: 1,
      name: 'Emergency Fund',
      targetAmount: 150000,
      currentAmount: 100000,
      targetDate: '2025-06-01',
      category: 'Emergency',
      linkedAccount: 'Savings Account',
      monthlyContribution: 8000,
      priority: 'High',
      status: 'active'
    },
    {
      id: 2,
      name: 'Vacation to Europe',
      targetAmount: 200000,
      currentAmount: 45000,
      targetDate: '2025-12-01',
      category: 'Travel',
      linkedAccount: 'Travel Fund',
      monthlyContribution: 15000,
      priority: 'Medium',
      status: 'active'
    },
    {
      id: 3,
      name: 'House Down Payment',
      targetAmount: 1000000,
      currentAmount: 150000,
      targetDate: '2027-01-01',
      category: 'Real Estate',
      linkedAccount: 'Investment Account',
      monthlyContribution: 25000,
      priority: 'High',
      status: 'active'
    },
    {
      id: 4,
      name: 'New Car',
      targetAmount: 800000,
      currentAmount: 320000,
      targetDate: '2025-08-01',
      category: 'Transportation',
      linkedAccount: 'SIP Investment',
      monthlyContribution: 20000,
      priority: 'Medium',
      status: 'active'
    },
    {
      id: 5,
      name: 'Retirement Fund',
      targetAmount: 5000000,
      currentAmount: 280000,
      targetDate: '2045-01-01',
      category: 'Retirement',
      linkedAccount: 'Retirement Portfolio',
      monthlyContribution: 12000,
      priority: 'High',
      status: 'active'
    }
  ];

  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    targetDate: '',
    category: 'Other',
    monthlyContribution: '',
    priority: 'Medium'
  });

  const handleAddGoal = () => {
    console.log('Adding goal:', newGoal);
    setShowAddGoal(false);
    setNewGoal({ name: '', targetAmount: '', targetDate: '', category: 'Other', monthlyContribution: '', priority: 'Medium' });
  };

  const getCompletionPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getExpectedCompletionDate = (current, target, monthly) => {
    const remaining = target - current;
    const monthsLeft = Math.ceil(remaining / monthly);
    const completionDate = new Date();
    completionDate.setMonth(completionDate.getMonth() + monthsLeft);
    return completionDate.toISOString().split('T')[0];
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const categories = ['Emergency', 'Travel', 'Real Estate', 'Transportation', 'Education', 'Investment', 'Retirement', 'Other'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Goals & Planning</h1>
        <button
          onClick={() => setShowAddGoal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors mt-4 sm:mt-0"
        >
          <Plus className="w-5 h-5" />
          <span>Add Goal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Goals</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{goals.length}</p>
            </div>
            <Target className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Target</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{goals.reduce((sum, goal) => sum + goal.targetAmount, 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Saved</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{goals.reduce((sum, goal) => sum + goal.currentAmount, 0).toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Target</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0).toLocaleString()}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const completionPercentage = getCompletionPercentage(goal.currentAmount, goal.targetAmount);
          const expectedCompletion = getExpectedCompletionDate(goal.currentAmount, goal.targetAmount, goal.monthlyContribution);
          const isOnTrack = new Date(expectedCompletion) <= new Date(goal.targetDate);

          return (
            <div key={goal.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(goal.priority)}`}>
                      {goal.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{goal.category}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedGoal(goal)}
                    className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {completionPercentage.toFixed(1)}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(completionPercentage)}`}
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    ₹{goal.currentAmount.toLocaleString()}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ₹{goal.targetAmount.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Contribution</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      ₹{goal.monthlyContribution.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Target Date</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {goal.targetDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    {isOnTrack ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-500" />
                    )}
                    <span className={`text-xs ${isOnTrack ? 'text-green-600' : 'text-yellow-600'}`}>
                      {isOnTrack ? 'On Track' : 'Behind Schedule'}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Expected: {expectedCompletion}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Goal</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Goal Name
                </label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                  placeholder="e.g., Emergency Fund"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Amount (₹)
                </label>
                <input
                  type="number"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                  placeholder="100000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Date
                </label>
                <input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Contribution (₹)
                </label>
                <input
                  type="number"
                  value={newGoal.monthlyContribution}
                  onChange={(e) => setNewGoal({ ...newGoal, monthlyContribution: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                  placeholder="5000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddGoal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGoal}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;
