"use client";

import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Printer, QrCode, ArrowRight, LayoutGrid } from 'lucide-react';

export default function TablesPage() {
  const [startTable, setStartTable] = useState('1');
  const [endTable, setEndTable] = useState('25');
  const [qrCodes, setQrCodes] = useState<number[]>([]);
  const printRef = useRef<HTMLDivElement>(null);

  const generateQRCodes = () => {
    const start = parseInt(startTable);
    const end = parseInt(endTable);
    
    if (isNaN(start) || isNaN(end) || start > end) {
      alert('Please enter a valid range');
      return;
    }

    const tables = [];
    for (let i = start; i <= end; i++) {
        tables.push(i);
    }
    setQrCodes(tables);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* No-Print Header */}
      <div className="print:hidden mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <QrCode className="h-8 w-8 text-blue-600" />
              Table QR Codes
            </h1>
            <p className="text-gray-500 mt-1">Generate and print QR codes for your tables</p>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg font-medium"
            disabled={qrCodes.length === 0}
          >
            <Printer className="h-5 w-5" />
            Print QR Codes
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-w-2xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-gray-500" />
            Generate Range
          </h2>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">From Table</label>
              <input
                type="number"
                min="1"
                value={startTable}
                onChange={(e) => setStartTable(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="flex items-center pb-4 text-gray-400">
              <ArrowRight className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">To Table</label>
              <input
                type="number"
                min="1"
                value={endTable}
                onChange={(e) => setEndTable(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <button
              onClick={generateQRCodes}
              className="bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium h-[50px]"
            >
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* QR Codes Grid - Visible in Print */}
      <div ref={printRef} className="print:w-full">
        {qrCodes.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 print:grid-cols-3 gap-6 print:gap-8">
            {qrCodes.map((tableNum) => (
              <div 
                key={tableNum} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center print:break-inside-avoid print:border-2 print:border-gray-900"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Table {tableNum}</h3>
                  <p className="text-sm text-gray-500">Scan to Order</p>
                </div>
                <div className="p-2 bg-white rounded-lg">
                  <QRCodeSVG
                    value={`https://adavakkadpos.store/menu/table${tableNum}`}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 w-full">
                  <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">Adavakkad Collections</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 print:hidden">
            <QrCode className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>Generate QR codes to see preview</p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @media print {
          @page {
            margin: 1cm;
          }
          body * {
            visibility: hidden;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:w-full {
            width: 100% !important;
          }
          .print\\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
          .print\\:gap-8 {
            gap: 2rem !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid !important;
          }
          .print\\:border-2 {
            border-width: 2px !important;
          }
          .print\\:border-gray-900 {
            border-color: #111827 !important;
          }
        }
      `}</style>
    </div>
  );
}
