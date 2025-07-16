import React, { useState, useCallback, useMemo, memo } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Bell,
  Shield,
  Settings,
  Save,
  Edit2
} from 'lucide-react';

// --- Constants ---
const INCOME_RANGES = [
  '0-2 LPA',
  '2-5 LPA',
  '5-10 LPA',
  '10-15 LPA',
  '15-25 LPA',
  '25+ LPA'
];

const INITIAL_PROFILE_DATA = {
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+91 9876543210',
  location: 'Mumbai, India',
  incomeRange: '5-10 LPA',
  profession: 'Software Engineer',
  notifications: {
    email: true,
    push: true,
    budgetAlerts: true,
    goalReminders: true,
    weeklyReports: true
  }
};

// --- Reusable Components (Memoized) ---

const ProfileField = memo(({ label, value, type = 'text', isEditing, onChange, options }) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    {isEditing ? (
      type === 'select' ? (
        <select
          value={value}
          onChange={onChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-400"
        >
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-400"
        />
      )
    ) : (
      <p className="font-medium text-gray-900 dark:text-white">{value}</p>
    )}
  </div>
));

const ToggleSwitch = memo(({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between">
    <div>
      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{label}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
      }`}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
));

const SectionHeader = memo(({ icon: Icon, title }) => (
  <div className="mb-6 flex items-center space-x-2">
    <Icon className="h-5 w-5 text-blue-600" />
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
  </div>
));

const ActionButton = memo(({ label, onClick, icon: Icon, primary = false, danger = false }) => {
  const baseClasses = "px-4 py-2 rounded-lg transition-colors";
  const colorClasses = primary
    ? "bg-blue-600 hover:bg-blue-700 text-white"
    : danger
    ? "bg-red-600 hover:bg-red-700 text-white"
    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600";

  return (
    <button onClick={onClick} className={`${baseClasses} ${colorClasses} flex items-center space-x-2`}>
      {Icon && <Icon className="h-4 w-4" />}
      <span>{label}</span>
    </button>
  );
});

// --- Main Profile Component ---
function Profile({ darkMode, setDarkMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(INITIAL_PROFILE_DATA);

  const handleSave = useCallback(() => {
    // In a real app, you'd send this data to a backend
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  }, [profileData]);

  const handleNotificationChange = useCallback((key) => {
    setProfileData(prevData => ({
      ...prevData,
      notifications: {
        ...prevData.notifications,
        [key]: !prevData.notifications[key]
      }
    }));
  }, []);

  const handleProfileInputChange = useCallback((field, value) => {
    setProfileData(prevData => ({
      ...prevData,
      [field]: value
    }));
  }, []);

  // Memoize income ranges since they are static
  const incomeOptions = useMemo(() => INCOME_RANGES, []);

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile & Settings</h1>
        <ActionButton
          onClick={() => setIsEditing(!isEditing)}
          icon={Edit2}
          label={isEditing ? 'Cancel' : 'Edit Profile'}
          primary
          className="mt-4 sm:mt-0" // Apply margin for smaller screens
        />
      </div>

      {/* Profile Information */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <SectionHeader icon={User} title="Personal Information" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ProfileField
            label="Full Name"
            value={profileData.name}
            isEditing={isEditing}
            onChange={(e) => handleProfileInputChange('name', e.target.value)}
          />
          <ProfileField
            label="Email Address"
            value={profileData.email}
            type="email"
            isEditing={isEditing}
            onChange={(e) => handleProfileInputChange('email', e.target.value)}
          />
          <ProfileField
            label="Phone Number"
            value={profileData.phone}
            type="tel"
            isEditing={isEditing}
            onChange={(e) => handleProfileInputChange('phone', e.target.value)}
          />
          <ProfileField
            label="Location"
            value={profileData.location}
            isEditing={isEditing}
            onChange={(e) => handleProfileInputChange('location', e.target.value)}
          />
          <ProfileField
            label="Income Range"
            value={profileData.incomeRange}
            type="select"
            isEditing={isEditing}
            onChange={(e) => handleProfileInputChange('incomeRange', e.target.value)}
            options={incomeOptions}
          />
          <ProfileField
            label="Profession"
            value={profileData.profession}
            isEditing={isEditing}
            onChange={(e) => handleProfileInputChange('profession', e.target.value)}
          />
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end">
            <ActionButton onClick={handleSave} icon={Save} label="Save Changes" primary />
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <SectionHeader icon={Bell} title="Notification Settings" />
        <div className="space-y-4">
          <ToggleSwitch
            label="Email Notifications"
            description="Receive notifications via email"
            checked={profileData.notifications.email}
            onChange={() => handleNotificationChange('email')}
          />
          <ToggleSwitch
            label="Push Notifications"
            description="Receive push notifications"
            checked={profileData.notifications.push}
            onChange={() => handleNotificationChange('push')}
          />
          <ToggleSwitch
            label="Budget Alerts"
            description="Get notified when approaching budget limits"
            checked={profileData.notifications.budgetAlerts}
            onChange={() => handleNotificationChange('budgetAlerts')}
          />
          <ToggleSwitch
            label="Goal Reminders"
            description="Reminders about your financial goals"
            checked={profileData.notifications.goalReminders}
            onChange={() => handleNotificationChange('goalReminders')}
          />
          <ToggleSwitch
            label="Weekly Reports"
            description="Weekly financial summary reports"
            checked={profileData.notifications.weeklyReports}
            onChange={() => handleNotificationChange('weeklyReports')}
          />
        </div>
      </div>

      {/* App Settings */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <SectionHeader icon={Settings} title="App Settings" />
        <div className="space-y-4">
          <ToggleSwitch
            label="Dark Mode"
            description="Toggle between light and dark theme"
            checked={darkMode}
            onChange={() => setDarkMode(prev => !prev)}
          />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Data Export</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Export your financial data</p>
            </div>
            <ActionButton label="Export Data" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Privacy Settings</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage your privacy preferences</p>
            </div>
            <ActionButton label="Manage Privacy" />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <SectionHeader icon={Shield} title="Security" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Change Password</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Update your account password</p>
            </div>
            <ActionButton label="Change Password" primary />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
            </div>
            <ActionButton label="Enable 2FA" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Account Deletion</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account</p>
            </div>
            <ActionButton label="Delete Account" danger />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;