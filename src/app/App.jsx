import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Home, 
  CreditCard, 
  TrendingUp, 
  Calculator, 
  Brain, 
  Target, 
  User, 
  Menu, 
  X,
  Sun,
  Moon
} from 'lucide-react';

// Using React.lazy for code splitting to load components only when needed
const Dashboard = React.lazy(() => import('@/app/dashboard/Page'));
const Expenses = React.lazy(() => import('@/app/expenses/Page'));
const Income = React.lazy(() => import('@/app/income/Page'));
const Calculators = React.lazy(() => import('@/app/tools/Page'));
const AIInsights = React.lazy(() => import('@/app/report/Page'));
const Goals = React.lazy(() => import('@/app/goals/Page'));
const Profile = React.lazy(() => import('@/app/settings/Page'));

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Effect for dark mode management, runs only when darkMode changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Memoize navigation data to prevent re-creation on every render
  const navigation = useMemo(() => [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'expenses', label: 'Expenses', icon: CreditCard },
    { id: 'income', label: 'Income', icon: TrendingUp },
    { id: 'calculators', label: 'Calculators', icon: Calculator },
    { id: 'insights', label: 'AI Insights', icon: Brain },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'profile', label: 'Profile', icon: User },
  ], []);

  // Callback for handling tab changes
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false); // Close mobile menu on tab selection
  }, []);

  // Memoize renderContent to prevent unnecessary re-renders of components
  const renderContent = useMemo(() => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'expenses':
        return <Expenses />;
      case 'income':
        return <Income />;
      case 'calculators':
        return <Calculators />;
      case 'insights':
        return <AIInsights />;
      case 'goals':
        return <Goals />;
      case 'profile':
        return <Profile darkMode={darkMode} setDarkMode={setDarkMode} />;
      default:
        return <Dashboard />;
    }
  }, [activeTab, darkMode, setDarkMode]); // Dependencies for memoization

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Brift</h1>
              </div>
            </div>
            
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(prevMode => !prevMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(prevOpen => !prevOpen)}
                  className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  aria-expanded={isMobileMenuOpen}
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <React.Suspense fallback={<div>Loading...</div>}>
            {renderContent}
          </React.Suspense>
        </div>
      </main>
    </div>
  );
}

export default App;