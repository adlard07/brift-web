import { useState } from 'react';
import { 
  Plus, 
  DollarSign, 
  TrendingUp, 
  Briefcase, 
  PiggyBank,
  BarChart3,
  Edit2,
  Trash2
} from 'lucide-react';

function Income() {
  const [activeTab, setActiveTab] = useState('income');
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddInvestment, setShowAddInvestment] = useState(false);

  const incomeEntries = [
    { id: 1, source: 'Salary', amount: 5000, type: 'monthly', date: '2025-01-01', category: 'primary' },
    { id: 2, source: 'Freelance Project', amount: 1500, type: 'one-time', date: '2025-01-10', category: 'freelance' },
    { id: 3, source: 'Stock Dividends', amount: 200, type: 'monthly', date: '2025-01-05', category: 'passive' },
    { id: 4, source: 'Rental Income', amount: 800, type: 'monthly', date: '2025-01-01', category: 'passive' },
  ];

  const investments = [
    { id: 1, name: 'SIP - Equity Fund', type: 'SIP', amount: 2000, currentValue: 25000, returns: 15.5, category: 'equity' },
    { id: 2, name: 'Fixed Deposit', type: 'FD', amount: 10000, currentValue: 10500, returns: 5.0, category: 'debt' },
    { id: 3, name: 'Tech Stocks', type: 'Stocks', amount: 5000, currentValue: 6200, returns: 24.0, category: 'equity' },
    { id: 4, name: 'Gold ETF', type: 'Gold', amount: 3000, currentValue: 3300, returns: 10.0, category: 'commodity' },
  ];

  const portfolioBreakdown = [
    { category: 'Equity', value: 31200, percentage: 62.4, color: '#3B82F6' },
    { category: 'Debt', value: 10500, percentage: 21.0, color: '#10B981' },
    { category: 'Commodity', value: 3300, percentage: 6.6, color: '#F59E0B' },
    { category: 'Cash', value: 5000, percentage: 10.0, color: '#6B7280' },
  ];

  const [newIncome, setNewIncome] = useState({
    source: '',
    amount: '',
    type: 'monthly',
    date: new Date().toISOString().split('T')[0],
    category: 'primary'
  });

  const [newInvestment, setNewInvestment] = useState({
    name: '',
    type: 'SIP',
    amount: '',
    category: 'equity'
  });

  const handleAddIncome = () => {
    console.log('Adding income:', newIncome);
    setShowAddIncome(false);
    setNewIncome({ source: '', amount: '', type: 'monthly', date: new Date().toISOString().split('T')[0], category: 'primary' });
  };

  const handleAddInvestment = () => {
    console.log('Adding investment:', newInvestment);
    setShowAddInvestment(false);
    setNewInvestment({ name: '', type: 'SIP', amount: '', category: 'equity' });
  };

  const totalIncome = incomeEntries.reduce((sum, entry) => sum + entry.amount, 0);
  const totalInvestments = investments.reduce((sum, inv) => sum + inv.currentValue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Income & Portfolio</h1>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setActiveTab('income')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'income'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'portfolio'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Portfolio
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Income</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalIncome.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Investments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalInvestments.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Net Worth</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${(totalIncome + totalInvestments).toLocaleString()}</p>
            </div>
            <PiggyBank className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Income Tab */}
      {activeTab === 'income' && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Income Sources</h2>
            <button
              onClick={() => setShowAddIncome(true)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Income</span>
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {incomeEntries.map((entry) => (
                <div key={entry.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{entry.source}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {entry.type} • {entry.date}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold text-green-600">
                      ${entry.amount.toLocaleString()}
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
        </>
      )}

      {/* Portfolio Tab */}
      {activeTab === 'portfolio' && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Investment Portfolio</h2>
            <button
              onClick={() => setShowAddInvestment(true)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Investment</span>
            </button>
          </div>

          {/* Portfolio Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Asset Allocation</h3>
              <div className="space-y-3">
                {portfolioBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">${item.value.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Portfolio Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Invested</span>
                  <span className="font-semibold text-gray-900 dark:text-white">$20,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Current Value</span>
                  <span className="font-semibold text-gray-900 dark:text-white">$25,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Returns</span>
                  <span className="font-semibold text-green-600">+$5,000 (25%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Investment List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Investment Holdings</h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {investments.map((investment) => (
                <div key={investment.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <BarChart3 className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{investment.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {investment.type} • {investment.category}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">${investment.currentValue.toLocaleString()}</p>
                    <p className={`text-sm ${investment.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {investment.returns >= 0 ? '+' : ''}{investment.returns}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Add Income Modal */}
      {showAddIncome && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Income Source</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Source
                </label>
                <input
                  type="text"
                  value={newIncome.source}
                  onChange={(e) => setNewIncome({...newIncome, source: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                  placeholder="e.g., Salary, Freelance"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={newIncome.amount}
                  onChange={(e) => setNewIncome({...newIncome, amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={newIncome.type}
                  onChange={(e) => setNewIncome({...newIncome, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                >
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="one-time">One-time</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddIncome(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddIncome}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add Income
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Investment Modal */}
      {showAddInvestment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Investment</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Investment Name
                </label>
                <input
                  type="text"
                  value={newInvestment.name}
                  onChange={(e) => setNewInvestment({...newInvestment, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                  placeholder="e.g., SIP - Large Cap Fund"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={newInvestment.type}
                  onChange={(e) => setNewInvestment({...newInvestment, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                >
                  <option value="SIP">SIP</option>
                  <option value="Stocks">Stocks</option>
                  <option value="FD">Fixed Deposit</option>
                  <option value="Gold">Gold</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={newInvestment.amount}
                  onChange={(e) => setNewInvestment({...newInvestment, amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddInvestment(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddInvestment}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add Investment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Income;