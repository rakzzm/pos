import { useState } from 'react';
import { 
  Zap, 
  Brain, 
  Users, 
  Target,
  Cpu,
  Shield,
  Camera,
  Mic,
  CreditCard,
  Package,
  TrendingUp,
  MessageCircle,
  Scan,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3,
  Activity,
  Sparkles,
  Bot,
  Fingerprint,
  Smartphone
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Mock real-time data
const realtimeData = [
  { time: '09:00', sales: 120, customers: 15, recommendations: 8 },
  { time: '10:00', sales: 180, customers: 22, recommendations: 12 },
  { time: '11:00', sales: 240, customers: 28, recommendations: 18 },
  { time: '12:00', sales: 420, customers: 45, recommendations: 32 },
  { time: '13:00', sales: 380, customers: 38, recommendations: 28 },
  { time: '14:00', sales: 220, customers: 25, recommendations: 15 }
];

const customerInsights = [
  {
    id: 1,
    name: 'Sarah Johnson',
    type: 'VIP Customer',
    recommendation: 'Suggest premium dessert based on previous orders',
    confidence: 94,
    potentialValue: 'RM 45',
    status: 'active'
  },
  {
    id: 2,
    name: 'Mike Chen',
    type: 'Regular Customer',
    recommendation: 'Offer loyalty discount on favorite pizza',
    confidence: 87,
    potentialValue: 'RM 28',
    status: 'pending'
  },
  {
    id: 3,
    name: 'Anonymous Customer',
    type: 'New Visitor',
    recommendation: 'Welcome offer for first-time customer',
    confidence: 76,
    potentialValue: 'RM 15',
    status: 'new'
  }
];

const securityAlerts = [
  {
    type: 'success',
    title: 'Payment Verified',
    description: 'Biometric authentication successful for transaction #1234',
    time: '2 minutes ago',
    icon: CheckCircle
  },
  {
    type: 'warning',
    title: 'Unusual Pattern Detected',
    description: 'Multiple high-value transactions from same card',
    time: '15 minutes ago',
    icon: AlertTriangle
  },
  {
    type: 'info',
    title: 'Fraud Prevention Active',
    description: 'AI monitoring enabled for all transactions',
    time: '1 hour ago',
    icon: Shield
  }
];

export function SmartPOS() {
  const [activeFeature, setActiveFeature] = useState('analytics');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const FeatureCard = ({ title, description, icon: Icon, color, isActive, onClick }: any) => (
    <div 
      onClick={onClick}
      className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
        isActive 
          ? `bg-gradient-to-br ${color} text-white shadow-2xl` 
          : 'bg-white/80 backdrop-blur-md border border-gray-200 hover:shadow-xl'
      }`}
    >
      <Icon className={`h-12 w-12 mb-4 ${isActive ? 'text-white' : 'text-gray-600'}`} />
      <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>
      <p className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-600'}`}>
        {description}
      </p>
    </div>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MetricCard = ({ title, value, subtitle, icon: Icon, trend }: any) => (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-smartpos-primary/20">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-r from-smartpos-primary to-smartpos-secondary shadow-lg">
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
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold bg-gradient-to-r from-smartpos-primary to-smartpos-secondary bg-clip-text text-transparent">
        {value}
      </p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomerCard = ({ customer }: any) => (
    <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-smartpos-primary to-smartpos-secondary rounded-full flex items-center justify-center text-white font-bold mr-3">
            {customer.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{customer.name}</h4>
            <p className="text-xs text-gray-500">{customer.type}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          customer.status === 'active' ? 'bg-green-100 text-green-800' :
          customer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {customer.status}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-3">{customer.recommendation}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-smartpos-primary">{customer.potentialValue}</span>
        <div className="flex items-center">
          <Sparkles className="h-4 w-4 text-smartpos-primary mr-1" />
          <span className="text-xs text-smartpos-primary">{customer.confidence}%</span>
        </div>
      </div>
    </div>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SecurityAlert = ({ alert }: any) => {
    const Icon = alert.icon;
    const colorClasses = {
      success: 'border-green-200 bg-green-50',
      warning: 'border-yellow-200 bg-yellow-50',
      info: 'border-blue-200 bg-blue-50'
    };

    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <div className={`p-4 rounded-xl border ${(colorClasses as any)[alert.type]} mb-3`}>
        <div className="flex items-start space-x-3">
          <Icon className={`h-5 w-5 mt-0.5 ${
            alert.type === 'success' ? 'text-green-600' :
            alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
          }`} />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{alert.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
            <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-smartpos-bg via-smartpos-bg/30 to-smartpos-bg/80 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-smartpos-primary/20 to-smartpos-secondary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-smartpos-accent/20 to-smartpos-primary/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-smartpos-primary/10 to-smartpos-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-shimmer-gradient bg-[length:200%_100%] rounded-full animate-shimmer opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-radial-shine rounded-full animate-glow"></div>
      </div>
      
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-smartpos-primary to-smartpos-secondary bg-clip-text text-transparent mb-2 flex items-center">
              <Zap className="w-10 h-10 mr-3 text-smartpos-primary" />
              Smart POS System
            </h1>
            <p className="text-gray-600">AI-powered point of sale with intelligent automation</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center px-4 py-2 bg-smartpos-primary/10 rounded-xl">
              <Brain className="w-5 h-5 text-smartpos-primary mr-2" />
              <span className="text-sm font-medium text-smartpos-primary">AI Processing Active</span>
            </div>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Real-time Sales"
            value="RM 2,847"
            subtitle="Today's revenue"
            icon={DollarSign}
            trend={12.5}
          />
          <MetricCard
            title="AI Recommendations"
            value="156"
            subtitle="Suggestions made"
            icon={Target}
            trend={23.8}
          />
          <MetricCard
            title="Customer Insights"
            value="89"
            subtitle="Profiles analyzed"
            icon={Users}
            trend={15.2}
          />
          <MetricCard
            title="Fraud Prevention"
            value="100%"
            subtitle="Transactions secured"
            icon={Shield}
            trend={0}
          />
        </div>

        {/* Feature Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title="Analytics"
            description="Real-time data analytics and insights"
            icon={BarChart3}
            color="from-blue-500 to-blue-600"
            isActive={activeFeature === 'analytics'}
            onClick={() => setActiveFeature('analytics')}
          />
          <FeatureCard
            title="Personalization"
            description="AI-powered customer recommendations"
            icon={Users}
            color="from-purple-500 to-purple-600"
            isActive={activeFeature === 'personalization'}
            onClick={() => setActiveFeature('personalization')}
          />
          <FeatureCard
            title="Automation"
            description="Frictionless checkout and operations"
            icon={Cpu}
            color="from-green-500 to-green-600"
            isActive={activeFeature === 'automation'}
            onClick={() => setActiveFeature('automation')}
          />
          <FeatureCard
            title="Security"
            description="Advanced fraud detection and prevention"
            icon={Shield}
            color="from-red-500 to-red-600"
            isActive={activeFeature === 'security'}
            onClick={() => setActiveFeature('security')}
          />
        </div>

        {/* Dynamic Content Based on Active Feature */}
        {activeFeature === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-smartpos-primary/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Activity className="w-8 h-8 mr-3 text-smartpos-primary" />
                Real-time Performance
              </h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={realtimeData}>
                    <defs>
                      <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="time" stroke="#6B7280" />
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
                      stroke="#06B6D4" 
                      strokeWidth={3}
                      fill="url(#salesGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-smartpos-primary/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-8 h-8 mr-3 text-smartpos-primary" />
                Predictive Insights
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-smartpos-primary/10 to-smartpos-secondary/10 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-2">Peak Hour Prediction</h3>
                  <p className="text-sm text-gray-600 mb-2">Expected rush at 7:30 PM based on historical data</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-smartpos-primary">Confidence: 92%</span>
                    <span className="text-sm text-gray-500">+35% orders expected</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-2">Inventory Alert</h3>
                  <p className="text-sm text-gray-600 mb-2">Margherita Pizza ingredients running low</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600">Action Required</span>
                    <span className="text-sm text-gray-500">Reorder in 2 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeFeature === 'personalization' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-smartpos-primary/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-8 h-8 mr-3 text-smartpos-primary" />
                Customer Insights
              </h2>
              <div className="space-y-4">
                {customerInsights.map((customer) => (
                  <CustomerCard key={customer.id} customer={customer} />
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-smartpos-primary/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-8 h-8 mr-3 text-smartpos-primary" />
                Smart Recommendations
              </h2>
              <div className="space-y-4">
                <div className="p-4 border-2 border-dashed border-smartpos-primary/30 rounded-xl">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-smartpos-primary mx-auto mb-3" />
                    <h3 className="font-bold text-gray-900 mb-2">Facial Recognition Ready</h3>
                    <p className="text-sm text-gray-600">AI will identify returning customers and suggest personalized offers</p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-2">Dynamic Pricing Active</h3>
                  <p className="text-sm text-gray-600 mb-2">Prices adjusted based on demand and inventory</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-purple-600">3 items repriced</span>
                    <span className="text-sm text-gray-500">+8% revenue impact</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeFeature === 'automation' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-smartpos-primary/20">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Scan className="w-6 w-6 mr-3 text-smartpos-primary" />
                Smart Checkout
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-800">Computer Vision Active</span>
                  </div>
                  <p className="text-sm text-green-700">Automatic item recognition enabled</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center mb-2">
                    <Smartphone className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-800">Mobile Integration</span>
                  </div>
                  <p className="text-sm text-blue-700">Contactless payments ready</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-smartpos-primary/20">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Package className="w-6 h-6 mr-3 text-smartpos-primary" />
                Auto Inventory
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="font-medium text-yellow-800">Reorder Scheduled</span>
                  </div>
                  <p className="text-sm text-yellow-700">Pizza ingredients - Tomorrow 9 AM</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-800">Stock Optimized</span>
                  </div>
                  <p className="text-sm text-green-700">AI reduced waste by 23%</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-smartpos-primary/20">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <MessageCircle className="w-6 h-6 mr-3 text-smartpos-primary" />
                AI Assistant
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="flex items-center mb-2">
                    <Bot className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="font-medium text-purple-800">Voice Commands</span>
                  </div>
                  <p className="text-sm text-purple-700">Ready to assist customers</p>
                </div>
                <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-200">
                  <div className="flex items-center mb-2">
                    <Mic className="w-5 h-5 text-cyan-600 mr-2" />
                    <span className="font-medium text-cyan-800">Natural Language</span>
                  </div>
                  <p className="text-sm text-cyan-700">Processing customer queries</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeFeature === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-smartpos-primary/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-8 h-8 mr-3 text-smartpos-primary" />
                Security Dashboard
              </h2>
              <div className="space-y-4">
                {securityAlerts.map((alert, index) => (
                  <SecurityAlert key={index} alert={alert} />
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-smartpos-primary/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Fingerprint className="w-8 h-8 mr-3 text-smartpos-primary" />
                Biometric Security
              </h2>
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
                  <div className="flex items-center mb-4">
                    <UserCheck className="w-8 h-8 text-green-600 mr-3" />
                    <div>
                      <h3 className="font-bold text-green-800">Facial Recognition</h3>
                      <p className="text-sm text-green-600">Active and monitoring</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-700 font-medium">Accuracy:</span>
                      <span className="text-green-600 ml-2">99.7%</span>
                    </div>
                    <div>
                      <span className="text-green-700 font-medium">Speed:</span>
                      <span className="text-green-600 ml-2">0.3s</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl">
                  <div className="flex items-center mb-4">
                    <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
                    <div>
                      <h3 className="font-bold text-blue-800">Payment Security</h3>
                      <p className="text-sm text-blue-600">End-to-end encryption</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700 font-medium">Transactions:</span>
                      <span className="text-blue-600 ml-2">2,847</span>
                    </div>
                    <div>
                      <span className="text-blue-700 font-medium">Blocked:</span>
                      <span className="text-blue-600 ml-2">3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Features Overview */}
        <div className="bg-gradient-to-r from-smartpos-primary to-smartpos-secondary rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">AI-Powered Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Brain className="w-16 h-16 mx-auto mb-4 opacity-90" />
              <h3 className="text-xl font-bold mb-2">Intelligent Analytics</h3>
              <p className="text-white/80">Advanced machine learning algorithms provide deep insights into customer behavior and business performance.</p>
            </div>
            <div className="text-center">
              <Zap className="w-16 h-16 mx-auto mb-4 opacity-90" />
              <h3 className="text-xl font-bold mb-2">Real-time Automation</h3>
              <p className="text-white/80">Automated processes reduce manual work and improve efficiency across all operations.</p>
            </div>
            <div className="text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 opacity-90" />
              <h3 className="text-xl font-bold mb-2">Advanced Security</h3>
              <p className="text-white/80">Multi-layered security with biometric authentication and fraud detection keeps your business safe.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}