"use client";

import React, { useState } from 'react';
import { QrCode, Download, Copy, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function MenuLandingPage() {
  const [selectedTable, setSelectedTable] = useState('1');
  const [copied, setCopied] = useState(false);

  const tables = Array.from({ length: 20 }, (_, i) => (i + 1).toString());
  const menuUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/menu/${selectedTable}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(menuUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `table-${selectedTable}-qr.png`;
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            QR Menu Generator
          </h1>
          <p className="text-xl text-gray-600">
            Generate QR codes for contactless table ordering
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left Side - Controls */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Select Table Number
                </label>
                <select
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                >
                  {tables.map((table) => (
                    <option key={table} value={table}>
                      Table {table}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Menu URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={menuUrl}
                    readOnly
                    className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleDownloadQR}
                  className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Download className="h-6 w-6" />
                  Download QR Code
                </button>
                <a
                  href={menuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center border-2 border-orange-600 text-orange-600 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all"
                >
                  Preview Menu
                </a>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  How to Use
                </h3>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Select the table number</li>
                  <li>Download the QR code</li>
                  <li>Print and place on the table</li>
                  <li>Customers scan to order</li>
                </ol>
              </div>
            </div>

            {/* Right Side - QR Code Preview */}
            <div className="flex flex-col items-center justify-center">
              <div className="bg-white p-8 rounded-2xl shadow-xl border-4 border-orange-200">
                <QRCodeSVG value={menuUrl} size={256} level="H" includeMargin />
              </div>
              <p className="mt-6 text-center text-gray-600 font-medium">
                Table {selectedTable} QR Code
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Scan to place an order
              </p>
            </div>
          </div>

          {/* Footer Info */}
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 px-8 py-6 border-t border-orange-200">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-orange-600">{tables.length}</p>
                <p className="text-sm text-gray-600">Tables Available</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-orange-600">∞</p>
                <p className="text-sm text-gray-600">Contactless Orders</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-orange-600">100%</p>
                <p className="text-sm text-gray-600">Safe & Hygienic</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
