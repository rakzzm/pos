"use client";

import React, { useState } from 'react';
import {
  Settings,
  Store,
  Bell,
  Lock,
  Palette,
  Database,
  Globe,
  Mail,
  Smartphone,
  CreditCard,
  Receipt,
  Clock,
  Shield,
  Key,
  Save,
  RefreshCw,
  Download,
  Upload,
  Zap,
  Printer,
  Wifi,
  DollarSign,
  Percent,
  FileText,
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('business');
  const [settings, setSettings] = useState({
    // Business Settings
    businessName: 'Adavakkad Collections',
    businessAddress: '123 Main Street, City',
    businessPhone: '+91 1234567890',
    businessEmail: 'info@adavakkad.com',
    currency: 'INR',
    taxRate: '18',
    timezone: 'Asia/Kolkata',
    
    // System Settings
    theme: 'dark',
    language: 'en',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    lowStockAlerts: true,
    orderNotifications: true,
    dailyReports: true,
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    ipWhitelist: '',
    
    // Integrations
    stripeEnabled: false,
    stripeKey: '',
    smsProvider: 'twilio',
    smsApiKey: '',
    emailProvider: 'smtp',
    
    // Printer Settings
    printerEnabled: true,
    printerName: 'Default',
    printReceipts: true,
    printKitchen: true,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'business', name: 'Business Info', icon: Store },
    { id: 'system', name: 'System', icon: Settings },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'integrations', name: 'Integrations', icon: Zap },
    { id: 'printer', name: 'Printer', icon: Printer },
    { id: 'backup', name: 'Backup & Restore', icon: Database },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <Settings className="h-10 w-10 text-slate-600" />
          Settings
        </h1>
        <p className="text-gray-600">Manage your restaurant POS system settings</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-thin scrollbar-thumb-gray-300">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-slate-50 text-slate-700 border-b-2 border-slate-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.name}
              </button>
            );
          })}
        </div>

        <div className="p-8">
          {/* Business Info Tab */}
          {activeTab === 'business' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Store className="h-4 w-4" />
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={settings.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Smartphone className="h-4 w-4" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={settings.businessPhone}
                    onChange={(e) => handleInputChange('businessPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={settings.businessEmail}
                    onChange={(e) => handleInputChange('businessEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Globe className="h-4 w-4" />
                    Address
                  </label>
                  <input
                    type="text"
                    value={settings.businessAddress}
                    onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="h-4 w-4" />
                    Currency
                  </label>
                  <select
                    value={settings.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Percent className="h-4 w-4" />
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => handleInputChange('taxRate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Clock className="h-4 w-4" />
                    Timezone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">System Preferences</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Palette className="h-4 w-4" />
                    Theme
                  </label>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleInputChange('theme', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Globe className="h-4 w-4" />
                    Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="ta">Tamil</option>
                    <option value="ml">Malayalam</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FileText className="h-4 w-4" />
                    Date Format
                  </label>
                  <select
                    value={settings.dateFormat}
                    onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Clock className="h-4 w-4" />
                    Time Format
                  </label>
                  <select
                    value={settings.timeFormat}
                    onChange={(e) => handleInputChange('timeFormat', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  >
                    <option value="12h">12 Hour</option>
                    <option value="24h">24 Hour</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Settings</h2>
              
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', icon: Mail, desc: 'Receive updates via email' },
                  { key: 'smsNotifications', label: 'SMS Notifications', icon: Smartphone, desc: 'Receive updates via SMS' },
                  { key: 'lowStockAlerts', label: 'Low Stock Alerts', icon: Bell, desc: 'Get notified when stock is low' },
                  { key: 'orderNotifications', label: 'Order Notifications', icon: Receipt, desc: 'Receive notifications for new orders' },
                  { key: 'dailyReports', label: 'Daily Reports', icon: FileText, desc: 'Receive daily sales reports' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-slate-600" />
                        <div>
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[item.key as keyof typeof settings] as boolean}
                          onChange={(e) => handleInputChange(item.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Clock className="h-4 w-4" />
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Key className="h-4 w-4" />
                      Password Expiry (days)
                    </label>
                    <input
                      type="number"
                      value={settings.passwordExpiry}
                      onChange={(e) => handleInputChange('passwordExpiry', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Wifi className="h-4 w-4" />
                    IP Whitelist (comma-separated)
                  </label>
                  <textarea
                    value={settings.ipWhitelist}
                    onChange={(e) => handleInputChange('ipWhitelist', e.target.value)}
                    placeholder="192.168.1.1, 192.168.1.2"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Integrations</h2>
              
              <div className="space-y-6">
                {/* Stripe Integration */}
                <div className="p-6 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-6 w-6 text-purple-600" />
                      <div>
                        <h3 className="font-bold text-gray-900">Stripe Payment Gateway</h3>
                        <p className="text-sm text-gray-600">Accept card payments</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.stripeEnabled}
                        onChange={(e) => handleInputChange('stripeEnabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  {settings.stripeEnabled && (
                    <input
                      type="text"
                      value={settings.stripeKey}
                      onChange={(e) => handleInputChange('stripeKey', e.target.value)}
                      placeholder="sk_test_..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  )}
                </div>

                {/* SMS Provider */}
                <div className="p-6 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Smartphone className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-bold text-gray-900">SMS Provider</h3>
                      <p className="text-sm text-gray-600">Send SMS notifications</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <select
                      value={settings.smsProvider}
                      onChange={(e) => handleInputChange('smsProvider', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="twilio">Twilio</option>
                      <option value="msg91">MSG91</option>
                      <option value="sns">AWS SNS</option>
                    </select>
                    <input
                      type="text"
                      value={settings.smsApiKey}
                      onChange={(e) => handleInputChange('smsApiKey', e.target.value)}
                      placeholder="API Key"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Email Provider */}
                <div className="p-6 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-bold text-gray-900">Email Provider</h3>
                      <p className="text-sm text-gray-600">Configure email service</p>
                    </div>
                  </div>
                  <select
                    value={settings.emailProvider}
                    onChange={(e) => handleInputChange('emailProvider', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="smtp">SMTP</option>
                    <option value="sendgrid">SendGrid</option>
                    <option value="mailgun">Mailgun</option>
                    <option value="ses">AWS SES</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Printer Tab */}
          {activeTab === 'printer' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Printer Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Printer className="h-5 w-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-gray-900">Enable Printer</p>
                      <p className="text-sm text-gray-600">Turn on printer functionality</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.printerEnabled}
                      onChange={(e) => handleInputChange('printerEnabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
                  </label>
                </div>

                {settings.printerEnabled && (
                  <>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Printer className="h-4 w-4" />
                        Printer Name
                      </label>
                      <input
                        type="text"
                        value={settings.printerName}
                        onChange={(e) => handleInputChange('printerName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Receipt className="h-5 w-5 text-slate-600" />
                          <div>
                            <p className="font-medium text-gray-900">Auto-print Receipts</p>
                            <p className="text-sm text-gray-600">Automatically print customer receipts</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.printReceipts}
                            onChange={(e) => handleInputChange('printReceipts', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-slate-600" />
                          <div>
                            <p className="font-medium text-gray-900">Auto-print Kitchen Orders</p>
                            <p className="text-sm text-gray-600">Automatically print kitchen tickets</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.printKitchen}
                            onChange={(e) => handleInputChange('printKitchen', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Backup Tab */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Backup & Restore</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Backup Section */}
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-slate-500 transition-colors">
                  <div className="text-center">
                    <Database className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">Create Backup</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Download a complete backup of your data
                    </p>
                    <button className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                      <Download className="h-5 w-5" />
                      Download Backup
                    </button>
                  </div>
                </div>

                {/* Restore Section */}
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                  <div className="text-center">
                    <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">Restore from Backup</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Upload a backup file to restore data
                    </p>
                    <button className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Upload className="h-5 w-5" />
                      Upload Backup
                    </button>
                  </div>
                </div>
              </div>

              {/* Auto Backup */}
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-4">
                  <RefreshCw className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Automatic Backups</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Your data is automatically backed up daily at 2:00 AM. Last backup: Today at 2:00 AM
                    </p>
                    <div className="flex gap-4">
                      <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
                        ✓ Enabled
                      </span>
                      <span className="px-3 py-1 bg-white text-green-700 text-sm font-medium rounded-full">
                        Next: Tomorrow 2:00 AM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-slate-600 to-gray-600 text-white rounded-xl hover:from-slate-700 hover:to-gray-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <RefreshCw className="h-5 w-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              Save Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
}
