"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { 
  DollarSign, 
  TrendingUp, 
  ShoppingBag, 
  Users,
  Package,
  Clock,
  Target,
  Award,
  ArrowUp,
  ArrowDown,
  Activity,
  Calendar,
  Star,
  Zap
} from 'lucide-react';
import { useSalesStore } from '../../stores/salesStore';
import { useProductStore } from '../../stores/productStore';
import { useOrderStore } from '../../stores/orderStore';
import { useMemberStore } from '../../stores/memberStore';
import { useInvoiceStore } from '../../stores/invoiceStore';
import { QrCode, Brain, FileText } from 'lucide-react';

const COLORS = ['#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`;

// Sample data for charts
const salesTrendData = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 18 },
  { name: 'Wed', sales: 5000, orders: 32 },
  { name: 'Thu', sales: 4500, orders: 28 },
  { name: 'Fri', sales: 6000, orders: 38 },
  { name: 'Sat', sales: 8000, orders: 52 },
  { name: 'Sun', sales: 7000, orders: 45 }
];

const categoryData = [
  { name: 'Pizza', value: 35, sales: 15400 },
  { name: 'Burgers', value: 25, sales: 11200 },
  { name: 'Drinks', value: 20, sales: 8900 },
  { name: 'Desserts', value: 15, sales: 6700 },
  { name: 'Others', value: 5, sales: 2200 }
];

const hourlyData = [
  { hour: '9AM', orders: 5 },
  { hour: '10AM', orders: 12 },
  { hour: '11AM', orders: 18 },
  { hour: '12PM', orders: 35 },
  { hour: '1PM', orders: 42 },
  { hour: '2PM', orders: 28 },
  { hour: '3PM', orders: 15 },
  { hour: '4PM', orders: 8 },
  { hour: '5PM', orders: 22 },
  { hour: '6PM', orders: 38 },
  { hour: '7PM', orders: 45 },
  { hour: '8PM', orders: 32 }
];

const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  trendValue,
  color = 'blue',
  isMonetary = false 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    cyan: 'from-cyan-500 to-cyan-600',
    pink: 'from-pink-500 to-pink-600'
  };

  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:scale-105 overflow-hidden">
      {/* Background gradient overlay */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div className={`absolute inset-0 bg-gradient-to-br ${(colorClasses as any)[color]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-shine-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shine"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <div className={`p-3 rounded-xl bg-gradient-to-r ${(colorClasses as any)[color]} shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          {trend && (
            <div className={`flex items-center text-sm font-medium ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              {trendValue}%
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-3xl font-bold text-gray-900">
            {isMonetary ? formatCurrency(value) : value.toLocaleString()}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const QuickActionCard = ({ title, description, icon: Icon, onClick, color = 'blue' }: any) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
  };

  return (
    <button
      onClick={onClick}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      className={`group relative bg-gradient-to-r ${(colorClasses as any)[color]} text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden`}
    >
      <div className="absolute inset-0 bg-shine-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shine"></div>
      <div className="relative z-10 text-left">
        <Icon className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>
      </div>
    </button>
  );
};

export default function DashboardPage() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'yesterday' | 'week' | 'month'>('today');
  const { getInvoiceStats, fetchInvoices } = useInvoiceStore();
  const { summary, loading, error, calculateSummary } = useSalesStore();
  const { products, fetchProducts } = useProductStore();
  const { orders, fetchOrders } = useOrderStore(); // Fetch orders for summary
  const { members, fetchMembers } = useMemberStore();
  // const { activeStaff } = useAttendanceStore(); // Assuming similar accessor or we count them

  useEffect(() => {
    // Initial Data Load
    fetchProducts();
    fetchOrders();
    fetchMembers();
    fetchInvoices();
  }, [fetchProducts, fetchOrders, fetchMembers, fetchInvoices]);

  useEffect(() => {
    // Recalculate summary when orders or period changes
    if (orders.length > 0) {
      calculateSummary(selectedPeriod);
    }
  }, [selectedPeriod, calculateSummary, orders]);
  
  const invoiceStats = getInvoiceStats();
  
  const quickActions = [
    {
      title: 'New Order',
      description: 'Create a new customer order',
      icon: ShoppingBag,
      color: 'blue',
      onClick: () => router.push('/orders')
    },
    {
      title: 'Smart POS',
      description: 'AI-powered Point of Sale',
      icon: Zap,
      color: 'purple',
      onClick: () => router.push('/smart-pos')
    },
    {
      title: 'Table Management',
      description: 'Manage tables & QR codes',
      icon: QrCode, // Changed from default
      color: 'orange',
      onClick: () => router.push('/tables')
    },
    {
      title: 'E-Invoicing',
      description: 'Create & send invoices',
      icon: FileText,
      color: 'green',
      onClick: () => router.push('/invoices')
    },
    {
      title: 'AI Insights',
      description: 'Business intelligence',
      icon: Brain,
      color: 'pink',
      onClick: () => router.push('/ai-insights')
    },
    {
      title: 'Add Product',
      description: 'Add new menu item',
      icon: Package,
      color: 'cyan',
      onClick: () => router.push('/products')
    },
    {
      title: 'View Reports',
      description: 'Check sales analytics',
      icon: BarChart,
      color: 'red',
      onClick: () => router.push('/reports')
    },
    {
      title: 'Manage Staff',
      description: 'Staff and attendance',
      icon: Users,
      color: 'blue',
      onClick: () => router.push('/staff')
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dashboard-bg via-white to-dashboard-bg/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dashboard-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dashboard-bg via-white to-dashboard-bg/50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-dashboard-primary/20 to-dashboard-secondary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-dashboard-accent/20 to-dashboard-primary/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-dashboard-primary/10 to-dashboard-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-shimmer-gradient bg-[length:200%_100%] rounded-full animate-shimmer opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-radial-shine rounded-full animate-glow"></div>
      </div>
      
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-dashboard-primary to-dashboard-secondary bg-clip-text text-transparent mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">Welcome back! Here's what's happening at your restaurant today.</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as 'today' | 'yesterday' | 'week' | 'month')}
              className="bg-white border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-dashboard-primary focus:border-transparent transition-all duration-300"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={index}
              title={action.title}
              description={action.description}
              icon={action.icon}
              color={action.color}
              onClick={action.onClick}
            />
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Revenue"
            value={summary.grossAmount}
            subtitle="Gross sales amount"
            icon={DollarSign}
            trend="up"
            trendValue="12.5"
            color="blue"
            isMonetary
          />
          <MetricCard
            title="Orders Today"
            value={summary.transactionCount}
            subtitle={`${summary.averageValue.toFixed(0)} avg order value`}
            icon={ShoppingBag}
            trend="up"
            trendValue="8.2"
            color="green"
          />
          <MetricCard
            title="Pending Invoices"
            value={invoiceStats.pending}
            subtitle={`${formatCurrency(invoiceStats.totalRevenue)} potential revenue`}
            icon={FileText}
            trend="neutral"
            color="orange"
          />
          <MetricCard
            title="Active Products"
            value={products.length}
            subtitle={`${products.filter(p => p.stock <= 10).length} low stock items`}
            icon={Package}
            trend="down"
            trendValue="2.1"
            color="purple"
          />

        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Trend */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-dashboard-primary" />
              Sales Trend
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesTrendData}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    fill="url(#salesGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-dashboard-primary" />
              Sales by Category
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
                    formatter={(value, name) => [`${value}%`, name]}
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

        {/* Hourly Orders & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hourly Orders */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="w-8 h-8 mr-3 text-dashboard-primary" />
              Orders by Hour
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="hour" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="orders" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Activity className="w-8 h-8 mr-3 text-dashboard-primary" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[
                { action: 'New order #ORD-045', time: '2 min ago', icon: ShoppingBag, color: 'text-blue-500' },
                { action: 'Product added: Chicken Wings', time: '15 min ago', icon: Package, color: 'text-green-500' },
                { action: 'Member registered: John Doe', time: '1 hour ago', icon: Users, color: 'text-purple-500' },
                { action: 'Order completed #ORD-044', time: '2 hours ago', icon: Award, color: 'text-orange-500' },
                { action: 'Staff check-in: Sarah', time: '3 hours ago', icon: Clock, color: 'text-cyan-500' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg bg-gray-100 ${activity.color}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Net Sales"
            value={summary.netSales}
            subtitle="After discounts & tax"
            icon={DollarSign}
            color="cyan"
            isMonetary
          />
          <MetricCard
            title="Service Tax"
            value={summary.tax}
            subtitle="10% service charge"
            icon={Target}
            color="pink"
            isMonetary
          />
          <MetricCard
            title="Daily Average"
            value={summary.dailyAverageSales}
            subtitle="Average daily sales"
            icon={Calendar}
            color="green"
            isMonetary
          />
          <MetricCard
            title="Customer Avg"
            value={summary.customerAverageValue}
            subtitle="Per customer spend"
            icon={Star}
            color="orange"
            isMonetary
          />
        </div>
      </div>
    </div>
  );
}
