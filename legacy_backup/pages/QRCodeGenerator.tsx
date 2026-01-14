import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Printer, QrCode, Plus, Trash2, Copy } from 'lucide-react';

type Table = {
    id: string;
    number: string;
    name: string;
};

export function QRCodeGenerator() {
    const [tables, setTables] = useState<Table[]>([
        { id: '1', number: '1', name: 'Table 1' },
        { id: '2', number: '2', name: 'Table 2' },
        { id: '3', number: '3', name: 'Table 3' },
        { id: '4', number: '4', name: 'Table 4' },
        { id: '5', number: '5', name: 'Table 5' },
    ]);

    const [newTableNumber, setNewTableNumber] = useState('');
    const [newTableName, setNewTableName] = useState('');
    const [selectedTable, setSelectedTable] = useState<Table | null>(tables[0]);

    const getQRCodeURL = (tableNumber: string) => {
        const baseURL = window.location.origin;
        return `${baseURL}/menu/${tableNumber}`;
    };

    const addTable = () => {
        if (newTableNumber.trim() && newTableName.trim()) {
            const newTable: Table = {
                id: Date.now().toString(),
                number: newTableNumber.trim(),
                name: newTableName.trim(),
            };
            setTables([...tables, newTable]);
            setNewTableNumber('');
            setNewTableName('');
        }
    };

    const deleteTable = (id: string) => {
        setTables(tables.filter(t => t.id !== id));
        if (selectedTable?.id === id) {
            setSelectedTable(tables[0] || null);
        }
    };

    const downloadQRCode = (tableNumber: string, tableName: string) => {
        const svg = document.getElementById(`qr-${tableNumber}`);
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = 512;
            canvas.height = 512;
            ctx?.drawImage(img, 0, 0, 512, 512);

            const pngFile = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.download = `qr-code-${tableName.replace(/\s+/g, '-').toLowerCase()}.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    };

    const printQRCode = (tableNumber: string) => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        // const qrURL = getQRCodeURL(tableNumber);
        const svg = document.getElementById(`qr-${tableNumber}`);
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);

        printWindow.document.write(`
      <html>
        <head>
          <title>QR Code - Table ${tableNumber}</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
            }
            .qr-container {
              text-align: center;
              page-break-after: always;
            }
            h1 {
              color: #ea580c;
              margin-bottom: 10px;
            }
            h2 {
              color: #333;
              margin-bottom: 20px;
            }
            .instructions {
              margin-top: 20px;
              font-size: 14px;
              color: #666;
              max-width: 400px;
            }
            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <h1>Restaurant Menu</h1>
            <h2>Table ${tableNumber}</h2>
            ${svgData}
            <div class="instructions">
              <p><strong>Scan to Order</strong></p>
              <p>Open your camera app and scan this QR code to view our menu and place your order.</p>
            </div>
          </div>
        </body>
      </html>
    `);

        printWindow.document.close();
        setTimeout(() => {
            printWindow.print();
        }, 250);
    };

    const copyToClipboard = (tableNumber: string) => {
        const url = getQRCodeURL(tableNumber);
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    };

    const downloadAllQRCodes = () => {
        tables.forEach((table, index) => {
            setTimeout(() => {
                downloadQRCode(table.number, table.name);
            }, index * 500);
        });
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-yellow-600 rounded-2xl p-8 mb-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                        <QrCode className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">QR Code Generator</h1>
                        <p className="text-orange-100">Generate QR codes for table ordering</p>
                    </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-4">
                    <p className="text-sm">
                        <strong>How it works:</strong> Generate unique QR codes for each table. Customers scan the code to access the menu and place orders directly from their phones. Orders appear automatically in your Order Management system.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tables List */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Tables</h2>

                        {/* Add New Table */}
                        <div className="mb-4 p-4 bg-orange-50 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-3">Add New Table</h3>
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="Table Number (e.g., 1)"
                                    value={newTableNumber}
                                    onChange={(e) => setNewTableNumber(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                                <input
                                    type="text"
                                    placeholder="Table Name (e.g., Table 1)"
                                    value={newTableName}
                                    onChange={(e) => setNewTableName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                                <button
                                    onClick={addTable}
                                    disabled={!newTableNumber.trim() || !newTableName.trim()}
                                    className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Table
                                </button>
                            </div>
                        </div>

                        {/* Tables List */}
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {tables.map(table => (
                                <div
                                    key={table.id}
                                    onClick={() => setSelectedTable(table)}
                                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedTable?.id === table.id
                                            ? 'bg-gradient-to-r from-orange-600 to-yellow-600 text-white'
                                            : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold">{table.name}</div>
                                            <div className={`text-sm ${selectedTable?.id === table.id ? 'text-orange-100' : 'text-gray-500'}`}>
                                                Number: {table.number}
                                            </div>
                                        </div>
                                        {tables.length > 1 && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteTable(table.id);
                                                }}
                                                className={`p-2 rounded-lg transition-all ${selectedTable?.id === table.id
                                                        ? 'hover:bg-white/20'
                                                        : 'hover:bg-red-50 text-red-600'
                                                    }`}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bulk Actions */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <button
                                onClick={downloadAllQRCodes}
                                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                            >
                                <Download className="h-4 w-4" />
                                Download All QR Codes
                            </button>
                        </div>
                    </div>
                </div>

                {/* QR Code Preview and Actions */}
                <div className="lg:col-span-2">
                    {selectedTable ? (
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">{selectedTable.name}</h2>

                            {/* QR Code Display */}
                            <div className="flex flex-col items-center mb-8">
                                <div className="bg-white p-8 rounded-2xl shadow-xl border-4 border-orange-100">
                                    <QRCodeSVG
                                        id={`qr-${selectedTable.number}`}
                                        value={getQRCodeURL(selectedTable.number)}
                                        size={300}
                                        level="H"
                                        includeMargin={true}
                                        imageSettings={{
                                            src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ea580c' stroke-width='2'%3E%3Cpath d='M3 3h18v18H3z'/%3E%3Cpath d='M12 3v18'/%3E%3Cpath d='M3 12h18'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E",
                                            height: 40,
                                            width: 40,
                                            excavate: true,
                                        }}
                                    />
                                </div>
                                <p className="mt-4 text-sm text-gray-600 text-center max-w-md">
                                    Scan this QR code to access the menu and place orders for {selectedTable.name}
                                </p>
                            </div>

                            {/* URL Display */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Order URL</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={getQRCodeURL(selectedTable.number)}
                                        readOnly
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                                    />
                                    <button
                                        onClick={() => copyToClipboard(selectedTable.number)}
                                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
                                    >
                                        <Copy className="h-4 w-4" />
                                        Copy
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    onClick={() => downloadQRCode(selectedTable.number, selectedTable.name)}
                                    className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-yellow-700 transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                    <Download className="h-5 w-5" />
                                    Download QR Code
                                </button>
                                <button
                                    onClick={() => printQRCode(selectedTable.number)}
                                    className="bg-white border-2 border-orange-600 text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <Printer className="h-5 w-5" />
                                    Print QR Code
                                </button>
                            </div>

                            {/* Instructions */}
                            <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
                                <h3 className="font-bold text-gray-900 mb-3">Setup Instructions:</h3>
                                <ol className="space-y-2 text-sm text-gray-700">
                                    <li className="flex gap-2">
                                        <span className="font-bold text-orange-600">1.</span>
                                        <span>Download or print the QR code for this table</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-bold text-orange-600">2.</span>
                                        <span>Place the QR code on the table in a visible location</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-bold text-orange-600">3.</span>
                                        <span>Customers scan the code with their phone camera</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-bold text-orange-600">4.</span>
                                        <span>They can browse the menu and place orders directly</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-bold text-orange-600">5.</span>
                                        <span>Orders appear automatically in your Order Management page</span>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center h-96 text-gray-400">
                            <QrCode className="h-16 w-16 mb-4" />
                            <p className="text-lg">Select a table to view its QR code</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
