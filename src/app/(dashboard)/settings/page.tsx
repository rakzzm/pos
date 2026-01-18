"use client";

import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Settings as SettingsIcon,
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
  QrCode,
  Copy,
  Check,
  Menu,
  Phone,
  Package,
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

  // QR Code State
  const [qrData, setQrData] = useState('https://adavakkadpos.store');
  const [qrType, setQrType] = useState('url');
  const [qrSize, setQrSize] = useState(256);
  const [qrColor, setQrColor] = useState('#000000');
  const [qrBgColor, setQrBgColor] = useState('#FFFFFF');
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  // QR Form Data
  const [qrFormData, setQrFormData] = useState({
    // URL
    url: 'https://adavakkadpos.store',
    // WiFi
    wifiSSID: 'Restaurant WiFi',
    wifiPassword: 'password123',
    wifiEncryption: 'WPA',
    // Contact (vCard)
    contactName: 'Restaurant Manager',
    contactPhone: '+91 1234567890',
    contactEmail: 'manager@adavakkad.com',
    contactAddress: '123 Main St, City',
    // SMS
    smsNumber: '+91 1234567890',
    smsMessage: 'Hello from our restaurant!',
    // Email
    emailTo: 'info@adavakkad.com',
    emailSubject: 'Inquiry',
    emailBody: 'Hello, I would like to...',
    // Menu
    menuURL: 'https://adavakkadpos.store/menu/table1',
    // Payment
    upiId: 'restaurant@upi',
    amount: '',
  });

  const qrTypes = [
    { id: 'url', name: 'Website URL', icon: Globe, color: 'from-blue-500 to-cyan-500' },
    { id: 'menu', name: 'Digital Menu', icon: Menu, color: 'from-orange-500 to-amber-500' },
    { id: 'wifi', name: 'WiFi Network', icon: Wifi, color: 'from-purple-500 to-indigo-500' },
    { id: 'payment', name: 'UPI Payment', icon: CreditCard, color: 'from-green-500 to-emerald-500' },
    { id: 'contact', name: 'Contact Card', icon: Phone, color: 'from-pink-500 to-rose-500' },
    { id: 'sms', name: 'SMS', icon: Smartphone, color: 'from-teal-500 to-cyan-500' },
    { id: 'email', name: 'Email', icon: Mail, color: 'from-red-500 to-orange-500' },
    { id: 'product', name: 'Product Link', icon: Package, color: 'from-violet-500 to-purple-500' },
  ];

  const generateQRData = () => {
    switch (qrType) {
      case 'url':
        return qrFormData.url;
      case 'menu':
        return qrFormData.menuURL;
      case 'wifi':
        return `WIFI:T:${qrFormData.wifiEncryption};S:${qrFormData.wifiSSID};P:${qrFormData.wifiPassword};;`;
      case 'contact':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${qrFormData.contactName}\nTEL:${qrFormData.contactPhone}\nEMAIL:${qrFormData.contactEmail}\nADR:${qrFormData.contactAddress}\nEND:VCARD`;
      case 'sms':
        return `SMSTO:${qrFormData.smsNumber}:${qrFormData.smsMessage}`;
      case 'email':
        return `mailto:${qrFormData.emailTo}?subject=${encodeURIComponent(qrFormData.emailSubject)}&body=${encodeURIComponent(qrFormData.emailBody)}`;
      case 'payment':
        const amountStr = qrFormData.amount ? `&am=${qrFormData.amount}` : '';
        return `upi://pay?pa=${qrFormData.upiId}${amountStr}`;
      case 'product':
        return qrFormData.url;
      default:
        return qrData;
    }
  };

  const currentQRData = generateQRData();

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = qrSize;
    canvas.height = qrSize;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `qr-code-${qrType}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentQRData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


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
    { id: 'system', name: 'System', icon: SettingsIcon },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'integrations', name: 'Integrations', icon: Zap },
    { id: 'printer', name: 'Printer', icon: Printer },
    { id: 'backup', name: 'Backup & Restore', icon: Database },
    { id: 'qr', name: 'QR Menu', icon: QrCode },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <SettingsIcon className="h-10 w-10 text-slate-600" />
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

           {/* QR Code Tab */}
           {activeTab === 'qr' && (
               <div className="space-y-6">
                 {/* QR Content copied from previous page.tsx */}
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     {/* Left Section - QR Types */}
                     <div className="lg:col-span-1 space-y-6">
                       <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                         <h2 className="text-xl font-bold text-gray-900 mb-4">QR Code Type</h2>
                         <div className="space-y-2">
                           {qrTypes.map((type) => {
                             const Icon = type.icon;
                             return (
                               <button
                                 key={type.id}
                                 onClick={() => setQrType(type.id)}
                                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                   qrType === type.id
                                     ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                                     : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                 }`}
                               >
                                 <Icon className="h-5 w-5" />
                                 <span className="font-medium">{type.name}</span>
                               </button>
                             );
                           })}
                         </div>
                       </div>
             
                       {/* Customization */}
                       <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                         <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                           <Palette className="h-5 w-5" />
                           Customize
                         </h2>
                         <div className="space-y-4">
                           <div>
                             <label className="block text-sm font-medium text-gray-700 mb-2">Size (px)</label>
                             <input
                               type="range"
                               min="128"
                               max="512"
                               step="64"
                               value={qrSize}
                               onChange={(e) => setQrSize(Number(e.target.value))}
                               className="w-full"
                             />
                             <div className="text-sm text-gray-600 text-center mt-1">{qrSize}px</div>
                           </div>
             
                           <div className="grid grid-cols-2 gap-4">
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">Foreground</label>
                               <input
                                 type="color"
                                 value={qrColor}
                                 onChange={(e) => setQrColor(e.target.value)}
                                 className="w-full h-10 rounded border border-gray-300 cursor-pointer"
                               />
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">Background</label>
                               <input
                                 type="color"
                                 value={qrBgColor}
                                 onChange={(e) => setQrBgColor(e.target.value)}
                                 className="w-full h-10 rounded border border-gray-300 cursor-pointer"
                               />
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
             
                     {/* Middle Section - Form */}
                     <div className="lg:col-span-1">
                       <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                         <h2 className="text-xl font-bold text-gray-900 mb-4">Enter Details</h2>
                         
                         <div className="space-y-4">
                           {/* URL */}
                           {(qrType === 'url' || qrType === 'product') && (
                             <div>
                               <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                 <Globe className="h-4 w-4" />
                                 Website URL
                               </label>
                               <input
                                 type="url"
                                 value={qrFormData.url}
                                 onChange={(e) => setQrFormData({ ...qrFormData, url: e.target.value })}
                                 placeholder="https://example.com"
                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                               />
                             </div>
                           )}
             
                           {/* Menu */}
                           {qrType === 'menu' && (
                             <div>
                               <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                 <Menu className="h-4 w-4" />
                                 Menu URL
                               </label>
                               <input
                                 type="url"
                                 value={qrFormData.menuURL}
                                 onChange={(e) => setQrFormData({ ...qrFormData, menuURL: e.target.value })}
                                 placeholder="https://restaurant.com/menu"
                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                               />
                               <p className="text-xs text-gray-500 mt-1">Customers can scan to view your digital menu</p>
                             </div>
                           )}
             
                           {/* WiFi */}
                           {qrType === 'wifi' && (
                             <>
                               <div>
                                 <label className="text-sm font-medium text-gray-700 mb-2 block">Network Name (SSID)</label>
                                 <input
                                   type="text"
                                   value={qrFormData.wifiSSID}
                                   onChange={(e) => setQrFormData({ ...qrFormData, wifiSSID: e.target.value })}
                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                 />
                               </div>
                               <div>
                                 <label className="text-sm font-medium text-gray-700 mb-2 block">Password</label>
                                 <input
                                   type="text"
                                   value={qrFormData.wifiPassword}
                                   onChange={(e) => setQrFormData({ ...qrFormData, wifiPassword: e.target.value })}
                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                 />
                               </div>
                               <div>
                                 <label className="text-sm font-medium text-gray-700 mb-2 block">Encryption</label>
                                 <select
                                   value={qrFormData.wifiEncryption}
                                   onChange={(e) => setQrFormData({ ...qrFormData, wifiEncryption: e.target.value })}
                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                 >
                                   <option value="WPA">WPA/WPA2</option>
                                   <option value="WEP">WEP</option>
                                   <option value="nopass">None</option>
                                 </select>
                               </div>
                             </>
                           )}
             
                           {/* Contact */}
                           {qrType === 'contact' && (
                             <>
                               <div>
                                 <label className="text-sm font-medium text-gray-700 mb-2 block">Name</label>
                                 <input
                                   type="text"
                                   value={qrFormData.contactName}
                                   onChange={(e) => setQrFormData({ ...qrFormData, contactName: e.target.value })}
                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                 />
                               </div>
                               <div>
                                 <label className="text-sm font-medium text-gray-700 mb-2 block">Phone</label>
                                 <input
                                   type="tel"
                                   value={qrFormData.contactPhone}
                                   onChange={(e) => setQrFormData({ ...qrFormData, contactPhone: e.target.value })}
                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                 />
                               </div>
                               <div>
                                 <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                                 <input
                                   type="email"
                                   value={qrFormData.contactEmail}
                                   onChange={(e) => setQrFormData({ ...qrFormData, contactEmail: e.target.value })}
                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                 />
                               </div>
                               <div>
                                 <label className="text-sm font-medium text-gray-700 mb-2 block">Address</label>
                                 <input
                                   type="text"
                                   value={qrFormData.contactAddress}
                                   onChange={(e) => setQrFormData({ ...qrFormData, contactAddress: e.target.value })}
                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                 />
                               </div>
                             </>
                           )}
             
                           {/* SMS */}
                           {qrType === 'sms' && (
                             <>
                               <div>
                                 <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
                                 <input
                                   type="tel"
                                   value={qrFormData.smsNumber}
                                   onChange={(e) => setQrFormData({ ...qrFormData, smsNumber: e.target.value })}
                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                 />
                               </div>
                               <div>
                                 <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
                                 <textarea
                                   value={qrFormData.smsMessage}
                                   onChange={(e) => setQrFormData({ ...qrFormData, smsMessage: e.target.value })}
                                   rows={3}
                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                 />
                               </div>
                             </>
                           )}
             
                           {/* Email */}
                           {qrType === 'email' && (
                             <>
                               <div>
                                 <label className="text-sm font-medium text-gray-700 mb-2 block">Email To</label>
                                 <input
                                   type="email"
                                   value={qrFormData.emailTo}
                                   onChange={(e) => setQrFormData({ ...qrFormData, emailTo: e.target.value })}
                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                 />
                               </div>
                               <div>
                                 <label className="text-sm font-medium text-gray-700 mb-2 block">Subject</label>
                                 <input
                                   type="text"
                                   value={qrFormData.emailSubject}
                                   onChange={(e) => setQrFormData({ ...qrFormData, emailSubject: e.target.value })}
                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                 />
                               </div>
                               <div>
                                 <label className="text-sm font-medium text-gray-700 mb-2 block">Body</label>
                                 <textarea
                                   value={qrFormData.emailBody}
                                   onChange={(e) => setQrFormData({ ...qrFormData, emailBody: e.target.value })}
                                   rows={3}
                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                 />
                               </div>
                             </>
                           )}
             
                           {/* UPI Payment */}
                           {qrType === 'payment' && (
                             <>
                               <div>
                                 <label className="text-sm font-medium text-gray-700 mb-2 block">UPI ID</label>
                                 <input
                                   type="text"
                                   value={qrFormData.upiId}
                                   onChange={(e) => setQrFormData({ ...qrFormData, upiId: e.target.value })}
                                   placeholder="merchant@upi"
                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                 />
                               </div>
                               <div>
                                 <label className="text-sm font-medium text-gray-700 mb-2 block">Amount (Optional)</label>
                                 <input
                                   type="number"
                                   value={qrFormData.amount}
                                   onChange={(e) => setQrFormData({ ...qrFormData, amount: e.target.value })}
                                   placeholder="0.00"
                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                 />
                               </div>
                               <p className="text-xs text-gray-500">Leave amount empty for customer to enter</p>
                             </>
                           )}
                         </div>
                       </div>
                     </div>
             
                     {/* Right Section - Preview & Download */}
                     <div className="lg:col-span-1">
                       <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
                         <h2 className="text-xl font-bold text-gray-900 mb-4">Preview</h2>
                         
                         <div 
                           ref={qrRef}
                           className="flex justify-center items-center p-8 bg-gray-50 rounded-lg mb-6"
                         >
                           <QRCodeSVG
                             value={currentQRData}
                             size={qrSize}
                             level="H"
                             fgColor={qrColor}
                             bgColor={qrBgColor}
                             includeMargin={true}
                           />
                         </div>
             
                         {/* Actions */}
                         <div className="space-y-3">
                           <button
                             onClick={downloadQR}
                             className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg"
                           >
                             <Download className="h-5 w-5" />
                             Download QR Code
                           </button>
             
                           <button
                             onClick={copyToClipboard}
                             className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                           >
                             {copied ? (
                               <>
                                 <Check className="h-5 w-5 text-green-600" />
                                 Copied!
                               </>
                             ) : (
                               <>
                                 <Copy className="h-5 w-5" />
                                 Copy Data
                               </>
                             )}
                           </button>
                         </div>
             
                         {/* Generated Data Preview */}
                         <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                           <p className="text-xs font-medium text-gray-600 mb-2">Generated QR Data:</p>
                           <p className="text-xs text-gray-800 font-mono break-all">{currentQRData}</p>
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
