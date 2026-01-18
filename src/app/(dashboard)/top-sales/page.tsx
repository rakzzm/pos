"use client";

import React, { useEffect, useState } from 'react';
import { TrendingUp, Crown, Star, Award, AlertTriangle, CheckCircle } from 'lucide-react';
import { useOrderStore } from '../../../stores/orderStore';
import { useProductStore } from '../../../stores/productStore';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function TopSalesPage() {
  const { orders, fetchOrders } = useOrderStore();
  const { products, fetchProducts } = useProductStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    avgSaleValue: 0
  });

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, [fetchOrders, fetchProducts]);

  useEffect(() => {
    if (orders.length > 0 && products.length > 0) {
      calculateTopSales();
    }
  }, [orders, products]);

  const calculateTopSales = () => {
    const completedOrders = orders.filter(o => o.status === 'completed');
    
    // Calculate global stats
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);
    const totalSales = completedOrders.reduce((sum, order) => sum + (order.itemCount || 0), 0);
    const avgSaleValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;

    setStats({
      totalSales,
      totalRevenue,
      avgSaleValue
    });

    // Aggregate product sales
    const productStats = new Map<string, { units: number, revenue: number }>();
    
    completedOrders.forEach(order => {
      order.items?.forEach((item: any) => {
         const current = productStats.get(item.name) || { units: 0, revenue: 0 };
         const itemRevenue = item.price * item.quantity;
         productStats.set(item.name, {
           units: current.units + item.quantity,
           revenue: current.revenue + itemRevenue
         });
      });
    });

    const productSales = products.map(product => {
      const stats = productStats.get(product.name) || { units: 0, revenue: 0 };
      
      return {
        ...product,
        units: stats.units,
        revenue: stats.revenue,
        percentage: totalRevenue > 0 ? ((stats.revenue / totalRevenue) * 100).toFixed(1) : '0.0',
        rank: 0, // Will assign after sort
        stockStatus: product.stock < 10 ? 'Low' : 'Good'
      };
    }).filter(p => p.revenue > 0);

    // Sort and assign rank
    const sortedProducts = productSales.sort((a, b) => b.revenue - a.revenue).map((p, index) => ({
      ...p,
      rank: index + 1
    }));

    setTopProducts(sortedProducts.slice(0, 10));
  };


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
              <p className="text-white/80 text-sm font-medium">Total Sales (Units)</p>
              <p className="text-3xl font-bold">{stats.totalSales}</p>
            </div>
            <TrendingUp className="h-12 w-12 text-white/30" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-topsales-primary">₹{stats.totalRevenue.toFixed(0)}</p>
            </div>
            <TrendingUp className="h-12 w-12 text-topsales-primary/30" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg. Sale Value</p>
              <p className="text-3xl font-bold text-topsales-primary">₹{stats.avgSaleValue.toFixed(2)}</p>
            </div>
            <TrendingUp className="h-12 w-12 text-topsales-primary/30" />
          </div>
        </div>
      </div>

       {/* Top Products Bar Chart */}
       <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Revenue Leaders</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts.slice(0, 5)} layout="vertical" margin={{ left: 50, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 12}} />
                <Tooltip formatter={(value: number) => `₹${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="revenue" fill="#4F46E5" name="Revenue (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      {/* Top Products Table */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Top Selling Products Details</h2>
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
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % of Sales
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stockStatus === 'Low' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {product.stockStatus === 'Low' ? <AlertTriangle className="inline h-3 w-3 mr-1"/> : <CheckCircle className="inline h-3 w-3 mr-1"/>}
                        {product.stock} ({product.stockStatus})
                      </span>
                    </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-topsales-primary">{product.units} units</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">₹{product.revenue.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-500">{product.percentage}%</div>
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
