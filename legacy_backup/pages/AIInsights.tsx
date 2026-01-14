import {
  Brain, 
  TrendingUp, 
  Users, 
  Target,
  Zap,
  BarChart3,
  PieChart,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  Star,
  Sparkles,
  Bot,
  Cpu,
  Database
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const COLORS = ['#7C3AED', '#A855F7', '#C084FC', '#DDD6FE', '#EDE9FE'];

// Mock AI-generated data
const demandForecast = [
  { date: '2024-02-26', predicted: 1200, actual: 1150, confidence: 92 },
  { date: '2024-02-27', predicted: 1350, actual: 1320, confidence: 89 },
  { date: '2024-02-28', predicted: 1100, actual: null, confidence: 94 },
  { date: '2024-02-29', predicted: 1450, actual: null, confidence: 87 },
  { date: '2024-03-01', predicted: 1600, actual: null, confidence: 91 }
];

const customerSegments = [
  { name: 'Frequent Diners', value: 35, revenue: 45000, growth: 12 },
  { name: 'Casual Visitors', value: 40, revenue: 32000, growth: 8 },
  { name: 'Premium Customers', value: 15, revenue: 28000, growth: 18 },
  { name: 'New Customers', value: 10, revenue: 8000, growth: 25 }
];

const productRecommendations = [
  { 
    product: 'Margherita Pizza', 
    confidence: 94, 
    reason: 'High demand predicted for Italian cuisine',
    action: 'Increase stock by 25%',
    impact: '+RM 2,400 revenue'
  },
  { 
    product: 'Iced Coffee', 
    confidence: 87, 
    reason: 'Weather forecast shows hot days ahead',
    action: 'Promote as combo deal',
    impact: '+15% upsell rate'
  },
  { 
    product: 'Chocolate Cake', 
    confidence: 91, 
    reason: 'Valentine\'s season approaching',
    action: 'Create special promotion',
    impact: '+RM 1,800 revenue'
  }
];

const aiInsights = [
  {
    type: 'opportunity',
    title: 'Peak Hour Optimization',
    description: 'AI detected 23% increase in orders between 7-9 PM. Consider adding staff during these hours.',
    impact: 'Potential +RM 3,200 weekly revenue',
    confidence: 89,
    icon: Clock
  },
  {
    type: 'warning',
    title: 'Inventory Alert',
    description: 'Pepperoni Pizza ingredients running low. Reorder recommended within 2 days.',
    impact: 'Prevent stockout losses',
    confidence: 96,
    icon: AlertTriangle
  },
  {
    type: 'success',
    title: 'Customer Retention',
    description: 'Loyalty program showing 18% increase in repeat customers this month.',
    impact: '+RM 5,600 recurring revenue',
    confidence: 92,
    icon: CheckCircle
  }
];

export function AIInsights() {


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MetricCard = ({ title, value, subtitle, icon: Icon, trend }: any) => (
    <div className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-ai-primary/20 hover:scale-105 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-ai-primary/5 to-ai-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute inset-0 bg-shine-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shine"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-ai-primary to-ai-secondary shadow-lg">
            <Icon className="h-6 w-6 text-white" />
          </div>
          {trend && (
            <div className={`flex items-center text-sm font-medium ${
              trend > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="h-4 w-4 mr-1" />
              {trend > 0 ? '+' : ''}{trend}%
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-ai-primary to-ai-secondary bg-clip-text text-transparent">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const InsightCard = ({ insight }: any) => {
    const Icon = insight.icon;
    const colorClasses = {
      opportunity: 'border-blue-200 bg-blue-50',
      warning: 'border-yellow-200 bg-yellow-50',
      success: 'border-green-200 bg-green-50'
    };

    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <div className={`p-6 rounded-2xl border-2 ${(colorClasses as any)[insight.type]} hover:scale-105 transition-all duration-300`}>
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-xl ${
            insight.type === 'opportunity' ? 'bg-blue-500' :
            insight.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
          }`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2">{insight.title}</h3>
            <p className="text-gray-700 mb-3">{insight.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">{insight.impact}</span>
              <div className="flex items-center">
                <Sparkles className="h-4 w-4 text-ai-primary mr-1" />
                <span className="text-sm font-medium text-ai-primary">{insight.confidence}% confidence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ai-bg via-ai-bg/30 to-ai-bg/80 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-ai-primary/20 to-ai-secondary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-ai-accent/20 to-ai-primary/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-ai-primary/10 to-ai-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-shimmer-gradient bg-[length:200%_100%] rounded-full animate-shimmer opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-radial-shine rounded-full animate-glow"></div>
      </div>
      
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-ai-primary to-ai-secondary bg-clip-text text-transparent mb-2 flex items-center">
              <Brain className="w-10 h-10 mr-3 text-ai-primary" />
              AI-Powered Insights
            </h1>
            <p className="text-gray-600">Intelligent analytics and predictive insights for your restaurant</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center px-4 py-2 bg-ai-primary/10 rounded-xl">
              <Bot className="w-5 h-5 text-ai-primary mr-2" />
              <span className="text-sm font-medium text-ai-primary">AI Engine Active</span>
            </div>
          </div>
        </div>

        {/* AI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Prediction Accuracy"
            value="94.2%"
            subtitle="Last 30 days average"
            icon={Target}
            trend={5.2}
          />
          <MetricCard
            title="Revenue Optimization"
            value="RM 12,400"
            subtitle="AI-driven improvements"
            icon={DollarSign}
            trend={18.5}
          />
          <MetricCard
            title="Customer Insights"
            value="2,847"
            subtitle="Profiles analyzed"
            icon={Users}
            trend={12.3}
          />
          <MetricCard
            title="Automated Actions"
            value="156"
            subtitle="This month"
            icon={Zap}
            trend={23.1}
          />
        </div>

        {/* AI Insights Cards */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-ai-primary/20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Lightbulb className="w-8 h-8 mr-3 text-ai-primary" />
            Real-time AI Insights
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {aiInsights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Demand Forecasting */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-ai-primary/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-ai-primary" />
              Demand Forecasting
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={demandForecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#7C3AED" 
                    strokeWidth={3}
                    name="Predicted"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Actual"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Customer Segmentation */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-ai-primary/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <PieChart className="w-8 h-8 mr-3 text-ai-primary" />
              Customer Segmentation
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={customerSegments}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {customerSegments.map((_, index) => (
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
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-ai-primary/20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Cpu className="w-8 h-8 mr-3 text-ai-primary" />
            AI Product Recommendations
          </h2>
          <div className="space-y-4">
            {productRecommendations.map((rec, index) => (
              <div key={index} className="flex items-center justify-between p-6 bg-gradient-to-r from-ai-primary/5 to-ai-secondary/5 rounded-xl border border-ai-primary/10 hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-ai-primary to-ai-secondary rounded-full flex items-center justify-center">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{rec.product}</h3>
                    <p className="text-sm text-gray-600">{rec.reason}</p>
                    <p className="text-sm font-medium text-ai-primary">{rec.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{rec.confidence}% confidence</span>
                  </div>
                  <p className="text-sm font-bold text-green-600">{rec.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <Database className="h-12 w-12 mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-2">Predictive Analytics</h3>
            <p className="text-blue-100">Advanced algorithms analyze patterns to predict future trends and optimize operations.</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <Brain className="h-12 w-12 mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-2">Machine Learning</h3>
            <p className="text-purple-100">Continuous learning from data to improve recommendations and automate decisions.</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <Zap className="h-12 w-12 mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-2">Real-time Optimization</h3>
            <p className="text-green-100">Instant adjustments to pricing, inventory, and operations based on live data.</p>
          </div>
        </div>
      </div>
    </div>
  );
}