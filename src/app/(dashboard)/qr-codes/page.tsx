"use client";

import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  QrCode,
  Download,
  Copy,
  Check,
  Menu,
  Globe,
  Smartphone,
  Wifi,
  CreditCard,
  Mail,
  Phone,
  Package,
  ShoppingCart,
  Link as LinkIcon,
  Share2,
  Palette,
  Zap,
} from 'lucide-react';

export default function QRCodesPage() {
  const [qrData, setQrData] = useState('https://restaurant-pos.example.com');
  const [qrType, setQrType] = useState('url');
  const [qrSize, setQrSize] = useState(256);
  const [qrColor, setQrColor] = useState('#000000');
  const [qrBgColor, setQrBgColor] = useState('#FFFFFF');
  const [includelogo, setIncludeLogo] = useState(false);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  // Form data for different QR types
  const [formData, setFormData] = useState({
    // URL
    url: 'https://restaurant-pos.example.com',
    // WiFi
    wifiSSID: 'Restaurant WiFi',
    wifiPassword: 'password123',
    wifiEncryption: 'WPA',
    // Contact (vCard)
    contactName: 'Restaurant Manager',
    contactPhone: '+91 1234567890',
    contactEmail: 'manager@restaurant.com',
    contactAddress: '123 Main St, City',
    // SMS
    smsNumber: '+91 1234567890',
    smsMessage: 'Hello from our restaurant!',
    // Email
    emailTo: 'info@restaurant.com',
    emailSubject: 'Inquiry',
    emailBody: 'Hello, I would like to...',
    // Menu
    menuURL: 'https://restaurant-pos.example.com/menu',
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
        return formData.url;
      case 'menu':
        return formData.menuURL;
      case 'wifi':
        return `WIFI:T:${formData.wifiEncryption};S:${formData.wifiSSID};P:${formData.wifiPassword};;`;
      case 'contact':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${formData.contactName}\nTEL:${formData.contactPhone}\nEMAIL:${formData.contactEmail}\nADR:${formData.contactAddress}\nEND:VCARD`;
      case 'sms':
        return `SMSTO:${formData.smsNumber}:${formData.smsMessage}`;
      case 'email':
        return `mailto:${formData.emailTo}?subject=${encodeURIComponent(formData.emailSubject)}&body=${encodeURIComponent(formData.emailBody)}`;
      case 'payment':
        const amountStr = formData.amount ? `&am=${formData.amount}` : '';
        return `upi://pay?pa=${formData.upiId}${amountStr}`;
      case 'product':
        return formData.url;
      default:
        return qrData;
    }
  };

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
    const data = generateQRData();
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentQRData = generateQRData();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <QrCode className="h-10 w-10 text-amber-600" />
          QR Code Generator
        </h1>
        <p className="text-gray-600">Create custom QR codes for your restaurant</p>
      </div>

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
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
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
                    value={formData.menuURL}
                    onChange={(e) => setFormData({ ...formData, menuURL: e.target.value })}
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
                      value={formData.wifiSSID}
                      onChange={(e) => setFormData({ ...formData, wifiSSID: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Password</label>
                    <input
                      type="text"
                      value={formData.wifiPassword}
                      onChange={(e) => setFormData({ ...formData, wifiPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Encryption</label>
                    <select
                      value={formData.wifiEncryption}
                      onChange={(e) => setFormData({ ...formData, wifiEncryption: e.target.value })}
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
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Phone</label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Address</label>
                    <input
                      type="text"
                      value={formData.contactAddress}
                      onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })}
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
                      value={formData.smsNumber}
                      onChange={(e) => setFormData({ ...formData, smsNumber: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
                    <textarea
                      value={formData.smsMessage}
                      onChange={(e) => setFormData({ ...formData, smsMessage: e.target.value })}
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
                      value={formData.emailTo}
                      onChange={(e) => setFormData({ ...formData, emailTo: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Subject</label>
                    <input
                      type="text"
                      value={formData.emailSubject}
                      onChange={(e) => setFormData({ ...formData, emailSubject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Body</label>
                    <textarea
                      value={formData.emailBody}
                      onChange={(e) => setFormData({ ...formData, emailBody: e.target.value })}
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
                      value={formData.upiId}
                      onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                      placeholder="merchant@upi"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Amount (Optional)</label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
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

      {/* Quick Templates */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-600" />
          Quick Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => {
              setQrType('menu');
              setFormData({ ...formData, menuURL: 'https://restaurant-pos.example.com/menu' });
            }}
            className="p-4 bg-white rounded-lg hover:shadow-lg transition-all text-left"
          >
            <Menu className="h-6 w-6 text-orange-600 mb-2" />
            <h3 className="font-bold text-gray-900">Digital Menu</h3>
            <p className="text-sm text-gray-600">QR code for contactless menu</p>
          </button>

          <button
            onClick={() => {
              setQrType('wifi');
              setFormData({ ...formData, wifiSSID: 'Restaurant WiFi', wifiPassword: 'password123' });
            }}
            className="p-4 bg-white rounded-lg hover:shadow-lg transition-all text-left"
          >
            <Wifi className="h-6 w-6 text-purple-600 mb-2" />
            <h3 className="font-bold text-gray-900">Guest WiFi</h3>
            <p className="text-sm text-gray-600">Easy WiFi connection for guests</p>
          </button>

          <button
            onClick={() => {
              setQrType('payment');
              setFormData({ ...formData, upiId: 'restaurant@upi', amount: '' });
            }}
            className="p-4 bg-white rounded-lg hover:shadow-lg transition-all text-left"
          >
            <CreditCard className="h-6 w-6 text-green-600 mb-2" />
            <h3 className="font-bold text-gray-900">Table Payment</h3>
            <p className="text-sm text-gray-600">UPI payment QR code</p>
          </button>
        </div>
      </div>
    </div>
  );
}
