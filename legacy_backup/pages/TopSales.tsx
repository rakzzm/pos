import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, DollarSign, Package, ShoppingCart, Star, Award, Target, Download } from 'lucide-react';
import { useProductStore } from '../stores/productStore';
import { useOrderStore } from '../stores/orderStore';
import * as XLSX from 'xlsx';

const COLORS = ['#10B981', '#059669', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5'];
const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`;

export function TopSales() {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('day');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'revenue' | 'quantity'>('revenue');
  const { products } = useProductStore();
  const { orders } = useOrderStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [topProducts, setTopProducts] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categoryData, setCategoryData] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [trendData, setTrendData] = useState<any[]>([]);
  const [salesMetrics, setSalesMetrics] = useState({
    totalRevenue: 0,
    averageOrderValue: 0,
    totalOrders: 0,
    topSellingProduct: '',
    growthRate: 0,
    bestCategory: ''
  });

  useEffect(() => {
    calculateTopSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPeriod, products, orders, categoryFilter, viewMode]);

  const calculateTopSales = () => {
    // Calculate product sales based on actual orders
    const productSales = products.map(product => {
      const productOrders = orders.filter(order =>
        order.status === 'completed' &&
        order.items.some(item => item.productId === product.id)
      );

      const revenue = productOrders.reduce((sum, order) => {
        const productItem = order.items.find(item => item.productId === product.id);
        return sum + (productItem ? productItem.price * productItem.quantity : 0);
      }, 0);

      const quantity = productOrders.reduce((sum, order) => {
        const productItem = order.items.find(item => item.productId === product.id);
        return sum + (productItem ? productItem.quantity : 0);
      }, 0);

      return {
        id: product.id,
        name: product.name,
        category: product.category,
        revenue,
        quantity,
        price: product.price,
        image: product.image_url,
        growth: ((Math.random() * 30) - 10).toFixed(1) // Simulated growth
      };
    });

    // Filter by category if selected
    const filteredProducts = categoryFilter === 'all'
      ? productSales
      : productSales.filter(p => p.category === categoryFilter);

    // Sort by selected view mode
    const sortedProducts = [...filteredProducts].sort((a, b) =>
      viewMode === 'revenue' ? b.revenue - a.revenue : b.quantity - a.quantity
    );

    setTopProducts(sortedProducts.slice(0, 10));

    // Calculate category totals
    const categoryTotals = productSales.reduce((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = { revenue: 0, quantity: 0 };
      }
      acc[curr.category].revenue += curr.revenue;
      acc[curr.category].quantity += curr.quantity;
      return acc;
    }, {} as Record<string, { revenue: number; quantity: number }>);

    setCategoryData(
      Object.entries(categoryTotals).map(([name, data]) => ({
        name,
        value: viewMode === 'revenue' ? data.revenue : data.quantity,
        revenue: data.revenue,
        quantity: data.quantity
      }))
    );

    // Generate trend data for the last 7 days
    const trendData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));

      const dayOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate.toDateString() === date.toDateString() && order.status === 'completed';
      });

      return {
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        revenue: dayOrders.reduce((sum, order) => sum + order.total, 0),
        orders: dayOrders.length
      };
    });
    setTrendData(trendData);

    // Set overall metrics
    const totalRevenue = productSales.reduce((sum, item) => sum + item.revenue, 0);
    // const totalQuantity = productSales.reduce((sum, item) => sum + item.quantity, 0);
    const completedOrders = orders.filter(o => o.status === 'completed');

    setSalesMetrics({
      totalRevenue,
      averageOrderValue: completedOrders.length ? totalRevenue / completedOrders.length : 0,
      totalOrders: completedOrders.length,
      topSellingProduct: sortedProducts[0]?.name || 'N/A',
      growthRate: 12.5, // Simulated growth rate
      bestCategory: Object.entries(categoryTotals).sort((a, b) => b[1].revenue - a[1].revenue)[0]?.[0] || 'N/A'
    });
  };

  const exportData = () => {
    const exportData = topProducts.map(product => ({
      'Product Name': product.name,
      'Category': product.category,
      'Revenue': formatCurrency(product.revenue),
      'Quantity Sold': product.quantity,
      'Unit Price': formatCurrency(product.price),
      'Growth Rate': `${product.growth}%`
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Top Sales');
    XLSX.writeFile(wb, `top_sales_${selectedPeriod}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MetricCard = ({ title, value, subtitle, icon: Icon, color = 'topsales' }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">
            {typeof value === 'number' && title.toLowerCase().includes('revenue') || title.toLowerCase().includes('value')
              ? formatCurrency(value)
              : typeof value === 'number'
                ? value.toLocaleString()
                : value}
          </p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-r from-${color}-primary to-${color}-secondary`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-topsales-bg via-topsales-bg/30 to-topsales-bg/80 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-topsales-primary/20 to-topsales-secondary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-topsales-accent/20 to-topsales-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-topsales-primary/10 to-topsales-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-shimmer-gradient bg-[length:200%_100%] rounded-full animate-shimmer opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-radial-shine rounded-full animate-glow"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-topsales-primary to-topsales-secondary bg-clip-text text-transparent mb-2">
              Top Sales Analysis
            </h1>
            <p className="text-gray-600">Analyze your best-performing products and categories</p>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as 'day' | 'week' | 'month')}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-topsales-primary focus:border-transparent transition-all duration-300"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <button
              onClick={exportData}
              className="bg-gradient-to-r from-topsales-primary to-topsales-secondary text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Download className="h-5 w-5" />
              Export
            </button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Revenue"
            value={salesMetrics.totalRevenue}
            subtitle={`+${salesMetrics.growthRate}% vs last period`}
            icon={DollarSign}
          />
          <MetricCard
            title="Average Order Value"
            value={salesMetrics.averageOrderValue}
            subtitle="Per transaction"
            icon={TrendingUp}
          />
          <MetricCard
            title="Total Orders"
            value={salesMetrics.totalOrders}
            subtitle="Completed orders"
            icon={ShoppingCart}
          />
          <MetricCard
            title="Top Product"
            value={salesMetrics.topSellingProduct}
            subtitle="Best performer"
            icon={Star}
          />
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex gap-4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-topsales-primary focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Categories</option>
                <option value="Pizza">Pizza</option>
                <option value="Burgers">Burgers</option>
                <option value="Drinks">Drinks</option>
                <option value="Desserts">Desserts</option>
              </select>

              <div className="flex border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('revenue')}
                  className={`px-4 py-3 transition-colors ${viewMode === 'revenue'
                      ? 'bg-topsales-primary text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setViewMode('quantity')}
                  className={`px-4 py-3 transition-colors ${viewMode === 'quantity'
                      ? 'bg-topsales-primary text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  Quantity
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Trend */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-topsales-primary" />
              Sales Trend (7 Days)
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    formatter={(value, name) => [
                      name === 'revenue' ? formatCurrency(value as number) : value,
                      name === 'revenue' ? 'Revenue' : 'Orders'
                    ]}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10B981"
                    strokeWidth={3}
                    fill="url(#salesGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-topsales-primary" />
              {viewMode === 'revenue' ? 'Revenue' : 'Sales'} by Category
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      viewMode === 'revenue' ? formatCurrency(value as number) : value,
                      name
                    ]}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Products Chart */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Award className="w-8 h-8 mr-3 text-topsales-primary" />
            Top 10 Products by {viewMode === 'revenue' ? 'Revenue' : 'Quantity'}
          </h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topProducts}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" stroke="#6B7280" />
                <YAxis dataKey="name" type="category" stroke="#6B7280" />
                <Tooltip
                  formatter={(value) => [
                    viewMode === 'revenue' ? formatCurrency(value as number) : value,
                    viewMode === 'revenue' ? 'Revenue' : 'Quantity'
                  ]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar
                  dataKey={viewMode}
                  fill="#10B981"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Package className="w-8 h-8 mr-3 text-topsales-primary" />
              Detailed Product Performance
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-topsales-primary/10 to-topsales-secondary/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Sold</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="w-12 h-12 rounded-lg object-cover mr-4"
                          src={product.image}
                          alt={product.name}
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">Rank #{index + 1}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-topsales-primary/10 text-topsales-primary rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(product.revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`font-medium ${Number(product.growth) > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {Number(product.growth) > 0 ? '+' : ''}{product.growth}%
                      </span>
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