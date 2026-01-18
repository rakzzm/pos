"use client";

import React, { useState, useEffect } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar
} from 'recharts';
import { Download, Loader, FileSpreadsheet, File as FilePdf, AlertTriangle, CheckCircle } from 'lucide-react';
import { useProductStore } from '../../../stores/productStore';
import { useOrderStore } from '../../../stores/orderStore';
import { useSalesStore } from '../../../stores/salesStore';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`;

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('week');
  const [showExportOptions, setShowExportOptions] = useState(false);
  const { products, fetchProducts } = useProductStore();
  const { orders, fetchOrders } = useOrderStore();
  const { summary, loading, error, calculateSummary } = useSalesStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [salesData, setSalesData] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categoryData, setCategoryData] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [topProducts, setTopProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, [fetchOrders, fetchProducts]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    calculateSummary(dateRange as any);
    calculateReportData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, products, orders]);



  const calculateReportData = () => {
    // Calculate daily sales data
    const dailyData = new Array(7).fill(0).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - index);
      const dayOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate.toDateString() === date.toDateString();
      });

      return {
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        sales: dayOrders.reduce((sum, order) => sum + order.total, 0),
        orders: dayOrders.length
      };
    }).reverse();
    setSalesData(dailyData);

    // Calculate category data
    const categories = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) +
        orders.filter(order => order.status === 'completed')
          .reduce((sum, order) => {
             // Basic fallback approximation if item-level data isn't easily mapped back to category
             // But let's try to be precise if products are linked
             return sum + (order.items?.filter((i: any) => i.name === product.name)
               .reduce((is: number, i: any) => is + (i.price * i.quantity), 0) || 0);
          }, 0);
      return acc;
    }, {} as Record<string, number>);

    setCategoryData(
      Object.entries(categories).map(([name, value]) => ({
        name,
        value
      })).filter(c => c.value > 0)
    );

    // Calculate top products from actual items
    const productStats = new Map<string, { units: number, revenue: number }>();
    let totalRevenue = 0;

    orders.filter(order => order.status === 'completed').forEach(order => {
      order.items?.forEach((item: any) => {
         const current = productStats.get(item.name) || { units: 0, revenue: 0 };
         const itemRevenue = item.price * item.quantity;
         productStats.set(item.name, {
           units: current.units + item.quantity,
           revenue: current.revenue + itemRevenue
         });
         totalRevenue += itemRevenue;
      });
    });

    const productSales = products.map(product => {
      const stats = productStats.get(product.name) || { units: 0, revenue: 0 };
      
      return {
        ...product, // Contains stock, price, etc.
        units: stats.units,
        revenue: stats.revenue,
        percentage: totalRevenue > 0 ? ((stats.revenue / totalRevenue) * 100).toFixed(1) : '0.0',
        growth: ((Math.random() * 30) - 10).toFixed(1), // Mock growth
        stockStatus: product.stock < 10 ? 'Low' : 'Good'
      };
    }).filter(p => p.revenue > 0);

    setTopProducts(productSales.sort((a, b) => b.revenue - a.revenue).slice(0, 10)); // Top 10
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Format currency values for Excel
    const summaryData = [
      ['Metric', 'Value'],
      ['Gross Amount', formatCurrency(summary?.grossAmount || 0)],
      ['Net Sales', formatCurrency(summary?.netSales || 0)],
      ['Discounts', formatCurrency(summary?.discounts || 0)],
      ['Tax', formatCurrency(summary?.tax || 0)],
      ['Charges', formatCurrency(summary?.charges || 0)],
      ['Net Total', formatCurrency(summary?.netTotal || 0)],
      ['Transaction Count', summary?.transactionCount || 0],
      ['Average Value', formatCurrency(summary?.averageValue || 0)],
      ['Daily Average Sales', formatCurrency(summary?.dailyAverageSales || 0)]
    ];
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

    // Sales Trend Sheet
    const salesSheet = XLSX.utils.json_to_sheet(salesData);
    XLSX.utils.book_append_sheet(workbook, salesSheet, 'Sales Trend');

    // Category Data Sheet
    const categorySheet = XLSX.utils.json_to_sheet(categoryData);
    XLSX.utils.book_append_sheet(workbook, categorySheet, 'Categories');

    // Top Products Sheet
    const topProductsSheet = XLSX.utils.json_to_sheet(topProducts);
    XLSX.utils.book_append_sheet(workbook, topProductsSheet, 'Top Products');

    // Generate Excel file
    XLSX.writeFile(workbook, `sales_report_${dateRange}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Set brand colors
    const skyBlue = '#87CEEB';
    const pink = '#FFB6C8';
    const darkBlue = '#1D63FF';

    // Helper function to create gradient backgrounds
    const addGradientBackground = (y: number, height: number) => {
      doc.setFillColor(skyBlue);
      doc.rect(0, y, pageWidth, height, 'F');
      doc.setFillColor(pink);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      doc.setGState(new (doc as any).GState({ opacity: 0.3 }));
      doc.rect(0, y, pageWidth, height, 'F');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      doc.setGState(new (doc as any).GState({ opacity: 1 }));
    };

    // Title Section with gradient background
    addGradientBackground(0, 40);
    doc.setFontSize(24);
    doc.setTextColor(darkBlue);
    doc.text('Sales Report', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Period: ${dateRange}`, pageWidth / 2, 30, { align: 'center' });

    // Summary Section
    let yPos = 50;
    doc.setFontSize(16);
    doc.setTextColor(darkBlue);
    doc.text('Financial Summary', 14, yPos);

    // Summary cards with alternating colors
    const summaryData = [
      ['Gross Amount', formatCurrency(summary?.grossAmount ?? 0)],
      ['Net Sales', formatCurrency(summary?.netSales ?? 0)],
      ['Discounts', formatCurrency(summary?.discounts ?? 0)],
      ['Tax', formatCurrency(summary?.tax ?? 0)],
      ['Net Total', formatCurrency(summary?.netTotal ?? 0)]
    ];

    autoTable(doc, {
      startY: yPos + 5,
      head: [['Metric', 'Value']],
      body: summaryData,
      theme: 'grid',
      styles: {
        fillColor: skyBlue,
        textColor: darkBlue,
        fontSize: 10,
        cellPadding: 5
      },
      alternateRowStyles: {
        fillColor: pink
      },
      headStyles: {
        fillColor: darkBlue,
        textColor: '#FFFFFF',
        fontSize: 12,
        fontStyle: 'bold'
      }
    });

    // Sales Trend Chart (Placeholder)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yPos = (doc as any).lastAutoTable.finalY + 20;
    
    // Category Distribution
    doc.setFontSize(16);
    doc.text('Sales by Category', 14, yPos);

    const categoryTableData = categoryData.map(cat => [
      cat.name,
      formatCurrency(cat.value),
      `${((cat.value / (summary?.grossAmount ?? 1)) * 100).toFixed(1)}%`
    ]);

    autoTable(doc, {
      startY: yPos + 5,
      head: [['Category', 'Revenue', 'Percentage']],
      body: categoryTableData,
      theme: 'grid',
      styles: {
        fillColor: skyBlue,
        textColor: darkBlue,
        fontSize: 10
      },
      alternateRowStyles: {
        fillColor: pink
      },
      headStyles: {
        fillColor: darkBlue,
        textColor: '#FFFFFF',
        fontSize: 12,
        fontStyle: 'bold'
      }
    });

    // Top Products Section
    doc.addPage();
    addGradientBackground(0, pageHeight);

    doc.setFontSize(16);
    doc.setTextColor(darkBlue);
    doc.text('Top Performing Products', 14, 20);

    autoTable(doc, {
      startY: 25,
      head: [['Product', 'Units', 'Revenue', '% of Sales', 'Stock']],
      body: topProducts.map(product => [
        product.name,
        product.units,
        formatCurrency(product.revenue),
        `${product.percentage}%`,
        product.stockStatus
      ]),
      theme: 'grid',
      styles: {
        fillColor: skyBlue,
        textColor: darkBlue,
        fontSize: 10
      },
      alternateRowStyles: {
        fillColor: pink
      },
      headStyles: {
        fillColor: darkBlue,
        textColor: '#FFFFFF',
        fontSize: 12,
        fontStyle: 'bold'
      }
    });

    // Footer with timestamp
    const timestamp = new Date().toLocaleString();
    doc.setFontSize(8);
    doc.setTextColor(darkBlue);
    doc.text(`Generated on: ${timestamp}`, pageWidth - 15, pageHeight - 10, { align: 'right' });

    // Save the PDF
    doc.save(`sales_report_${dateRange}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 text-accent animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-accent">{error}</div>
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <div className="relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-reports-primary/20 to-reports-secondary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-reports-accent/20 to-reports-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-reports-primary/10 to-reports-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-shimmer-gradient bg-[length:200%_100%] rounded-full animate-shimmer opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-radial-shine rounded-full animate-glow"></div>
      </div>

      <div className="w-full space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <div className="flex gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
            <div className="relative">
              <button
                onClick={() => setShowExportOptions(!showExportOptions)}
                className="bg-accent text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-accent/90"
              >
                <Download className="h-5 w-5" />
                Export Report
              </button>
              {showExportOptions && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        exportToExcel();
                        setShowExportOptions(false);
                      }}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FileSpreadsheet className="h-4 w-4" />
                      Export as Excel
                    </button>
                    <button
                      onClick={() => {
                        exportToPDF();
                        setShowExportOptions(false);
                      }}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FilePdf className="h-4 w-4" />
                      Export as PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Sales</dt>
                    <dd className="text-lg font-medium text-accent">{formatCurrency(summary.grossAmount)}</dd>
                    <dd className="text-sm text-green-600">+12.5% vs last period</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                    <dd className="text-lg font-medium text-accent">{summary.transactionCount}</dd>
                    <dd className="text-sm text-green-600">+8.2% vs last period</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Average Order Value</dt>
                    <dd className="text-lg font-medium text-accent">{formatCurrency(summary.averageValue)}</dd>
                    <dd className="text-sm text-red-600">-2.1% vs last period</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Daily Average Sales</dt>
                    <dd className="text-lg font-medium text-accent">{formatCurrency(summary.dailyAverageSales)}</dd>
                    <dd className="text-sm text-green-600">+15.8% vs last period</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Sales & Orders Trend</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#4F46E5" name="Sales (₹)" />
                  <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#059669" name="Orders" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Sales by Category</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
           {/* Top Products Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Top 5 Products by Revenue</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts.slice(0, 5)} layout="vertical" margin={{ left: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#4F46E5" name="Revenue (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Top Selling Products Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units Sold</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% of Sales</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stockStatus === 'Low' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {product.stockStatus === 'Low' ? <AlertTriangle className="inline h-3 w-3 mr-1"/> : <CheckCircle className="inline h-3 w-3 mr-1"/>}
                        {product.stock} ({product.stockStatus})
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.units}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product.revenue)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.percentage}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      {Number(product.growth) > 0 ? '+' : ''}{product.growth}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
