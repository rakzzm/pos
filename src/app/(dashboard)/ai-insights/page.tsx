"use client";

import React from 'react';
import { Brain, TrendingUp, Users, DollarSign, AlertCircle, Target, Lightbulb, BarChart3 } from 'lucide-react';

export default function AIInsightsPage() {
  const insights = [
    {
      id: 1,
      title: 'Peak Hours Detected',
      description: 'Lunch rush (12-2 PM) shows 40% higher sales. Consider increasing staff during these hours.',
      type: 'success',
      icon: TrendingUp,
      confidence: 95,
    },
    {
      id: 2,
      title: 'Popular Combo Opportunity',
      description: 'Customers buying Pizza often order Drinks within 5 minutes. Bundle discount recommended.',
      type: 'info',
      icon: Lightbulb,
      confidence: 87,
    },
    {
      id: 3,
      title: 'Inventory Alert',
      description: 'Based on trends, Margherita Pizza stock may run out by Friday. Order 30 units.',
      type: 'warning',
      icon: AlertCircle,
      confidence: 92,
    },
    {
      id: 4,
      title: 'Customer Retention',
      description: 'Members with loyalty points spend 35% more. Implement a points reminder system.',
      type: 'info',
      icon: Users,
      confidence: 88,
    },
  ];

  const metrics = [
    {
      label: 'Predicted Revenue',
      value: '₹45,890',
      change: '+12%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Customer Lifetime Value',
      value: '₹8,450',
      change: '+8%',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Churn Risk',
      value: '12%',
      change: '-3%',
      icon: AlertCircle,
      color: 'from-orange-500 to-amber-500',
    },
    {
      label: 'AI Accuracy',
      value: '94%',
      change: '+2%',
      icon: BarChart3,
      color: 'from-purple-500 to-indigo-500',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <Brain className="h-10 w-10 text-purple-600" />
          AI Insights
        </h1>
        <p className="text-gray-600">Powered by machine learning and predictive analytics</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${metric.color} rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-transform`}
          >
            <div className="flex items-center justify-between mb-2">
              <metric.icon className="h-8 w-8 text-white/80" />
              <span className="text-sm font-semibold bg-white/20 px-2 py-1 rounded-full">
                {metric.change}
              </span>
            </div>
            <p className="text-white/80 text-sm">{metric.label}</p>
            <p className="text-3xl font-bold">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* AI Insights Cards */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Actions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${getTypeColor(insight.type)}`}>
                  <insight.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{insight.title}</h3>
                    <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{insight.description}</p>
                  <button className="mt-4 text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center gap-1">
                    Apply Recommendation →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forecast Section */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-purple-600" />
          Sales Forecast (Next 7 Days)
        </h2>
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="bg-white rounded-lg p-4 text-center shadow">
              <p className="text-xs text-gray-500 mb-2">{day}</p>
              <p className="text-lg font-bold text-purple-600">
                ₹{(5000 + Math.random() * 3000).toFixed(0)}
              </p>
              <div className="mt-2 bg-purple-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-600 h-full rounded-full"
                  style={{ width: `${60 + Math.random() * 40}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
