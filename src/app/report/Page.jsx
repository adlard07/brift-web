'use client';
import React, { useState } from 'react';
import {
  Brain,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  BarChart3,
  Target,
  DollarSign,
  Calendar,
  Award,
} from 'lucide-react';

const AIInsights = () => {
  const [showTips, setShowTips] = useState(false);
  const [currentWeek, setCurrentWeek] = useState('current');

  const weeklyReport = {
    current: {
      weekEnding: '2025-01-12',
      financialHealthScore: 78,
      redundantExpenses: [
        { category: 'Subscriptions', amount: 45, description: 'Multiple streaming services' },
        { category: 'Food', amount: 120, description: 'Frequent restaurant visits' },
        { category: 'Transport', amount: 60, description: 'Unnecessary cab rides' }
      ],
      savingOpportunities: [
        { strategy: 'Reduce subscriptions', potential: 25, ease: 'Easy' },
        { strategy: 'Cook more at home', potential: 200, ease: 'Medium' },
        { strategy: 'Use public transport', potential: 150, ease: 'Medium' }
      ],
      cashFlowPrediction: {
        nextMonth: 'January',
        expectedIncome: 8500,
        predictedExpenses: 6800,
        netCashFlow: 1700,
        confidence: 85
      }
    },
    previous: {
      weekEnding: '2025-01-05',
      financialHealthScore: 75,
      redundantExpenses: [
        { category: 'Entertainment', amount: 80, description: 'Unused gym membership' },
        { category: 'Shopping', amount: 200, description: 'Impulse purchases' }
      ],
      savingOpportunities: [
        { strategy: 'Cancel unused memberships', potential: 80, ease: 'Easy' },
        { strategy: 'Create shopping budget', potential: 150, ease: 'Medium' }
      ],
      cashFlowPrediction: {
        nextMonth: 'December',
        expectedIncome: 8200,
        predictedExpenses: 6400,
        netCashFlow: 1800,
        confidence: 82
      }
    }
  };

  const smartTips = [
    {
      id: 1,
      category: 'Spending',
      tip: 'You spend 23% more on weekends. Consider planning weekend activities with a budget to avoid overspending.',
      impact: 'Could save ₹300-500 monthly',
      priority: 'High'
    },
    {
      id: 2,
      category: 'Saving',
      tip: 'Your emergency fund is 67% complete. Consider increasing your monthly savings by ₹500 to reach your goal 3 months earlier.',
      impact: 'Achieve 6-month emergency fund faster',
      priority: 'Medium'
    },
    {
      id: 3,
      category: 'Investment',
      tip: 'You have ₹5,000 sitting idle in savings. Consider investing in a liquid fund for better returns while maintaining liquidity.',
      impact: 'Potential 3-4% additional returns',
      priority: 'Medium'
    }
  ];

  const currentData = weeklyReport[currentWeek];

  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthScoreBackground = (score) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900';
    return 'bg-red-100 dark:bg-red-900';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getEaseColor = (ease) => {
    switch (ease) {
      case 'Easy': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Insights</h1>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <select
            value={currentWeek}
            onChange={(e) => setCurrentWeek(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="current">Current Week</option>
            <option value="previous">Previous Week</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Financial Health Score</h2>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Week ending {currentData.weekEnding}</span>
          </div>
        </div>
        <div className="flex items-center justify-center mb-6">
          <div className={`relative w-32 h-32 rounded-full ${getHealthScoreBackground(currentData.financialHealthScore)} flex items-center justify-center`}>
            <div className="text-center">
              <div className={`text-4xl font-bold ${getHealthScoreColor(currentData.financialHealthScore)}`}>
                {currentData.financialHealthScore}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">out of 100</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{currentData.redundantExpenses.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Redundant Categories</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{currentData.savingOpportunities.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Saving Opportunities</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{currentData.cashFlowPrediction.confidence}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Prediction Confidence</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingDown className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Redundant Expenses</h3>
          </div>
          <div className="space-y-3">
            {currentData.redundantExpenses.map((expense, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{expense.category}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{expense.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-600">₹{expense.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Saving Opportunities</h3>
          </div>
          <div className="space-y-3">
            {currentData.savingOpportunities.map((opportunity, index) => (
              <div key={index} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-gray-900 dark:text-white">{opportunity.strategy}</p>
                  <span className={`px-2 py-1 text-xs rounded ${getEaseColor(opportunity.ease)}`}>
                    {opportunity.ease}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Potential savings</span>
                  <span className="font-semibold text-green-600">₹{opportunity.potential}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cash Flow Prediction</h3>
          <span className="text-sm text-gray-600 dark:text-gray-400">• Next Month: {currentData.cashFlowPrediction.nextMonth}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Expected Income</span>
            </div>
            <p className="text-xl font-bold text-blue-600">₹{currentData.cashFlowPrediction.expectedIncome.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Predicted Expenses</span>
            </div>
            <p className="text-xl font-bold text-red-600">₹{currentData.cashFlowPrediction.predictedExpenses.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Net Cash Flow</span>
            </div>
            <p className="text-xl font-bold text-green-600">₹{currentData.cashFlowPrediction.netCashFlow.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Confidence</span>
            </div>
            <p className="text-xl font-bold text-purple-600">{currentData.cashFlowPrediction.confidence}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Smart Tips</h3>
          </div>
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Brain className="w-4 h-4" />
            <span>{showTips ? 'Hide Tips' : 'Get Smart Tips'}</span>
          </button>
        </div>
        {showTips && (
          <div className="space-y-4">
            {smartTips.map((tip) => (
              <div key={tip.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{tip.category}</span>
                    <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(tip.priority)}`}>
                      {tip.priority}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{tip.tip}</p>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">{tip.impact}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
