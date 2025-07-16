import React, { useState } from 'react';
import { Calculator, TrendingUp, Home, Shield, DollarSign } from 'lucide-react';

const Calculators = () => {
  const [activeCalculator, setActiveCalculator] = useState('sip');

  const calculators = [
    { id: 'sip', name: 'SIP Calculator', icon: TrendingUp },
    { id: 'emi', name: 'EMI Calculator', icon: Home },
    { id: 'emergency', name: 'Emergency Fund', icon: Shield },
    { id: 'tax', name: 'Tax Estimator', icon: DollarSign },
  ];

  // SIP Calculator
  const [sipData, setSipData] = useState({
    monthlyInvestment: 5000,
    annualReturn: 12,
    investmentPeriod: 10
  });

  const calculateSIP = () => {
    const P = sipData.monthlyInvestment;
    const r = sipData.annualReturn / 100 / 12;
    const n = sipData.investmentPeriod * 12;
    
    const futureValue = P * (((1 + r) ** n - 1) / r) * (1 + r);
    const totalInvestment = P * n;
    const totalReturns = futureValue - totalInvestment;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns)
    };
  };

  // EMI Calculator
  const [emiData, setEmiData] = useState({
    loanAmount: 1000000,
    interestRate: 8.5,
    loanTenure: 20
  });

  const calculateEMI = () => {
    const P = emiData.loanAmount;
    const r = emiData.interestRate / 100 / 12;
    const n = emiData.loanTenure * 12;
    
    const emi = P * r * (1 + r) ** n / ((1 + r) ** n - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;
    
    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest)
    };
  };

  // Emergency Fund Calculator
  const [emergencyData, setEmergencyData] = useState({
    monthlyExpenses: 50000,
    dependents: 2,
    jobSecurity: 'stable'
  });

  const calculateEmergencyFund = () => {
    let multiplier = 6; // Base months
    
    if (emergencyData.jobSecurity === 'unstable') multiplier = 12;
    if (emergencyData.dependents > 2) multiplier += 2;
    
    const recommendedFund = emergencyData.monthlyExpenses * multiplier;
    const currentSavings = 75000; // Mock current savings
    const shortfall = Math.max(0, recommendedFund - currentSavings);
    
    return {
      recommendedFund: Math.round(recommendedFund),
      currentSavings,
      shortfall: Math.round(shortfall),
      months: multiplier
    };
  };

  // Tax Calculator
  const [taxData, setTaxData] = useState({
    annualIncome: 800000,
    investments: 150000,
    regime: 'old'
  });

  const calculateTax = () => {
    const income = taxData.annualIncome;
    const deductions = taxData.regime === 'old' ? taxData.investments : 0;
    const taxableIncome = Math.max(0, income - deductions - 50000); // Standard deduction
    
    let tax = 0;
    if (taxableIncome > 250000) tax += Math.min(taxableIncome - 250000, 250000) * 0.05;
    if (taxableIncome > 500000) tax += Math.min(taxableIncome - 500000, 500000) * 0.10;
    if (taxableIncome > 1000000) tax += Math.min(taxableIncome - 1000000, 500000) * 0.20;
    if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.30;
    
    const cess = tax * 0.04;
    const totalTax = tax + cess;
    const takeHome = income - totalTax;
    
    return {
      taxableIncome: Math.round(taxableIncome),
      totalTax: Math.round(totalTax),
      takeHome: Math.round(takeHome),
      effectiveRate: income > 0 ? ((totalTax / income) * 100).toFixed(2) : 0
    };
  };

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'sip':
        const sipResult = calculateSIP();
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">SIP Calculator</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monthly Investment (₹)
                  </label>
                  <input
                    type="number"
                    value={sipData.monthlyInvestment}
                    onChange={(e) => setSipData({...sipData, monthlyInvestment: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expected Annual Return (%)
                  </label>
                  <input
                    type="number"
                    value={sipData.annualReturn}
                    onChange={(e) => setSipData({...sipData, annualReturn: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Investment Period (Years)
                  </label>
                  <input
                    type="number"
                    value={sipData.investmentPeriod}
                    onChange={(e) => setSipData({...sipData, investmentPeriod: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Results</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Investment</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹{sipResult.totalInvestment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Returns</span>
                    <span className="font-semibold text-green-600">₹{sipResult.totalReturns.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-gray-600 dark:text-gray-400">Future Value</span>
                    <span className="font-bold text-lg text-blue-600">₹{sipResult.futureValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'emi':
        const emiResult = calculateEMI();
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">EMI Calculator</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Loan Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={emiData.loanAmount}
                    onChange={(e) => setEmiData({...emiData, loanAmount: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Interest Rate (% per annum)
                  </label>
                  <input
                    type="number"
                    value={emiData.interestRate}
                    onChange={(e) => setEmiData({...emiData, interestRate: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Loan Tenure (Years)
                  </label>
                  <input
                    type="number"
                    value={emiData.loanTenure}
                    onChange={(e) => setEmiData({...emiData, loanTenure: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Results</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Monthly EMI</span>
                    <span className="font-bold text-lg text-blue-600">₹{emiResult.emi.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Payment</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹{emiResult.totalPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Interest</span>
                    <span className="font-semibold text-red-600">₹{emiResult.totalInterest.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'emergency':
        const emergencyResult = calculateEmergencyFund();
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Emergency Fund Calculator</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monthly Expenses (₹)
                  </label>
                  <input
                    type="number"
                    value={emergencyData.monthlyExpenses}
                    onChange={(e) => setEmergencyData({...emergencyData, monthlyExpenses: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of Dependents
                  </label>
                  <input
                    type="number"
                    value={emergencyData.dependents}
                    onChange={(e) => setEmergencyData({...emergencyData, dependents: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Job Security
                  </label>
                  <select
                    value={emergencyData.jobSecurity}
                    onChange={(e) => setEmergencyData({...emergencyData, jobSecurity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
                  >
                    <option value="stable">Stable</option>
                    <option value="unstable">Unstable</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Recommendation</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Recommended Fund</span>
                    <span className="font-bold text-lg text-blue-600">₹{emergencyResult.recommendedFund.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Current Savings</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹{emergencyResult.currentSavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shortfall</span>
                    <span className="font-semibold text-red-600">₹{emergencyResult.shortfall.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-gray-600 dark:text-gray-400">Months Covered</span>
                    <span className="font-bold text-green-600">{emergencyResult.months} months</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'tax':
        const taxResult = calculateTax();
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tax Calculator</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Annual Income (₹)
                  </label>
                  <input
                    type="number"
                    value={taxData.annualIncome}
                    onChange={(e) => setTaxData({...taxData, annualIncome: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tax Regime
                  </label>
                  <select
                    value={taxData.regime}
                    onChange={(e) => setTaxData({...taxData, regime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
                  >
                    <option value="old">Old Regime</option>
                    <option value="new">New Regime</option>
                  </select>
                </div>
                
                {taxData.regime === 'old' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      80C Investments (₹)
                    </label>
                    <input
                      type="number"
                      value={taxData.investments}
                      onChange={(e) => setTaxData({...taxData, investments: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
                    />
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Tax Calculation</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Taxable Income</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹{taxResult.taxableIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Tax</span>
                    <span className="font-semibold text-red-600">₹{taxResult.totalTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Effective Tax Rate</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{taxResult.effectiveRate}%</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-gray-600 dark:text-gray-400">Take Home</span>
                    <span className="font-bold text-lg text-green-600">₹{taxResult.takeHome.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Calculators</h1>
      </div>

      {/* Calculator Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2 mb-6">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <button
                key={calc.id}
                onClick={() => setActiveCalculator(calc.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeCalculator === calc.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{calc.name}</span>
              </button>
            );
          })}
        </div>

        {renderCalculator()}
      </div>
    </div>
  );
};

export default Calculators;