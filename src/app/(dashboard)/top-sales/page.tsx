"use client";

import React from 'react';
import { TrendingUp, Crown, Star, Award } from 'lucide-react';

export default function TopSalesPage() {
  // Mock top sales data
  const topProducts = [
    { id: 1, name: 'Margherita Pizza', sales: 450, revenue: 6750, rank: 1 },
    { id: 2, name: 'Chicken Burger', sales: 380, revenue: 5320, rank: 2 },
    { id: 3, name: 'Pepperoni Pizza', sales: 320, revenue: 5760, rank: 3 },
    { id: 4, name: 'Caesar Salad', sales: 280, revenue: 3360, rank: 4 },
    { id: 5, name: 'Chocolate Shake', sales: 250, revenue: 1875, rank: 5 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Award className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <Star className="h-6 w-6 text-topsales-primary" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-topsales-primary to-topsales-secondary bg-clip-text text-transparent mb-2">
          Top Sales
        </h1>
        <p className="text-gray-600">Best performing products this month</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-topsales-primary to-topsales-secondary rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Total Sales</p>
              <p className="text-3xl font-bold">1,680</p>
            </div>
            <TrendingUp className="h-12 w-12 text-white/30" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-topsales-primary">₹23,065</p>
            </div>
            <TrendingUp className="h-12 w-12 text-topsales-primary/30" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg. Sale Value</p>
              <p className="text-3xl font-bold text-topsales-primary">₹13.73</p>
            </div>
            <TrendingUp className="h-12 w-12 text-topsales-primary/30" />
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Top Selling Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-topsales-primary/10 to-topsales-secondary/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topProducts.map((product) => (
                <tr
                  key={product.id}
                  className={`hover:bg-topsales-primary/5 transition-colors ${
                    product.rank <= 3 ? 'bg-gradient-to-r from-topsales-primary/5 to-topsales-secondary/5' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getRankIcon(product.rank)}
                      <span className="text-lg font-bold text-gray-900">#{product.rank}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-topsales-primary">{product.sales} units</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">₹{product.revenue.toFixed(2)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
