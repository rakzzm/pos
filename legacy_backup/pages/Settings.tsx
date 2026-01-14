import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Users, 
  History, 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Webhook, 
  Globe,
  Save,
  Eye,
  EyeOff,
  Copy,
  RefreshCw
} from 'lucide-react';
import { UserManagement } from './UserManagement';
import { AuditTrail } from './AuditTrail';

type SettingsTab = 'general' | 'integrations' | 'users' | 'audit';

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    restaurantName: 'My Restaurant',
    address: '123 Main Street, City',
    phone: '+1234567890',
    email: 'info@restaurant.com',
    timezone: 'UTC',
    currency: 'INR',
    
    // Social Media
    facebook: '',
    twitter: '',
    instagram: '',
    
    // Email Settings
    emailProvider: 'smtp',
    smtpHost: '',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    
    // API Settings
    apiKey: 'sk_live_51234567890abcdef',
    webhookUrl: '',
    webhookSecret: '',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'integrations', name: 'Integrations', icon: Globe },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'audit', name: 'Audit Trail', icon: History },
  ];

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
  };

  const generateApiKey = () => {
    const newKey = 'sk_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setSettings(prev => ({ ...prev, apiKey: newKey }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-settings-primary/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-settings-primary to-settings-secondary rounded-lg mr-3"></div>
          Restaurant Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
            <input
              type="text"
              value={settings.restaurantName}
              onChange={(e) => setSettings(prev => ({ ...prev, restaurantName: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-settings-primary focus:border-transparent transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-settings-primary focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-settings-primary focus:border-transparent transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-settings-primary focus:border-transparent transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-settings-primary focus:border-transparent transition-all duration-300"
            >
              <option value="MYR">Malaysian Ringgit (INR)</option>
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="GBP">British Pound (GBP)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-settings-primary/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-settings-accent to-settings-primary rounded-lg mr-3"></div>
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive notifications via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-settings-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-settings-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Push Notifications</h4>
              <p className="text-sm text-gray-600">Receive push notifications in browser</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => setSettings(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-settings-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-settings-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-8">
      {/* Social Media Integration */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-settings-primary/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3"></div>
          Social Media Integration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Facebook className="w-5 h-5 mr-2 text-blue-600" />
              Facebook Page URL
            </label>
            <input
              type="url"
              value={settings.facebook}
              onChange={(e) => setSettings(prev => ({ ...prev, facebook: e.target.value }))}
              placeholder="https://facebook.com/yourpage"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="space-y-3">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Twitter className="w-5 h-5 mr-2 text-blue-400" />
              Twitter Handle
            </label>
            <input
              type="text"
              value={settings.twitter}
              onChange={(e) => setSettings(prev => ({ ...prev, twitter: e.target.value }))}
              placeholder="@yourhandle"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="space-y-3">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Instagram className="w-5 h-5 mr-2 text-pink-600" />
              Instagram Profile
            </label>
            <input
              type="text"
              value={settings.instagram}
              onChange={(e) => setSettings(prev => ({ ...prev, instagram: e.target.value }))}
              placeholder="@yourprofile"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Email Configuration */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-settings-primary/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Mail className="w-8 h-8 mr-3 text-red-500" />
          Email Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
            <input
              type="text"
              value={settings.smtpHost}
              onChange={(e) => setSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
              placeholder="smtp.gmail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
            <input
              type="text"
              value={settings.smtpPort}
              onChange={(e) => setSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
              placeholder="587"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={settings.smtpUsername}
              onChange={(e) => setSettings(prev => ({ ...prev, smtpUsername: e.target.value }))}
              placeholder="your-email@gmail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={settings.smtpPassword}
              onChange={(e) => setSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* API & Webhooks */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-settings-primary/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Webhook className="w-8 h-8 mr-3 text-green-500" />
          API & Webhooks
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type={showApiKey ? "text" : "password"}
                  value={settings.apiKey}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 font-mono text-sm"
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <button
                onClick={() => copyToClipboard(settings.apiKey)}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={generateApiKey}
                className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
            <input
              type="url"
              value={settings.webhookUrl}
              onChange={(e) => setSettings(prev => ({ ...prev, webhookUrl: e.target.value }))}
              placeholder="https://your-app.com/webhook"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Webhook Secret</label>
            <input
              type="password"
              value={settings.webhookSecret}
              onChange={(e) => setSettings(prev => ({ ...prev, webhookSecret: e.target.value }))}
              placeholder="Enter webhook secret"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-settings-bg via-settings-bg/30 to-settings-bg/80 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-settings-primary/20 to-settings-secondary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-settings-accent/20 to-settings-primary/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-settings-primary/10 to-settings-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-shimmer-gradient bg-[length:200%_100%] rounded-full animate-shimmer opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-radial-shine rounded-full animate-glow"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-settings-primary to-settings-secondary bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-gray-600">Manage your restaurant settings and integrations</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-settings-primary to-settings-secondary text-white shadow-glow transform scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:scale-105 shadow-lg'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'integrations' && renderIntegrations()}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'audit' && <AuditTrail />}
        </div>

        {/* Save Button */}
        {(activeTab === 'general' || activeTab === 'integrations') && (
          <div className="fixed bottom-8 right-8">
            <button
              onClick={handleSave}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-settings-primary to-settings-secondary text-white rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 animate-float"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}