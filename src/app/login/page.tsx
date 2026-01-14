"use client";

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, LogIn, AlertCircle, User, Shield, Settings } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
    } catch {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const demoCredentials = [
    {
      role: 'Admin',
      email: 'rakesh@teleaon.ai',
      password: 'admin12345',
      description: 'Full system access',
      icon: Shield,
      color: 'from-red-500 to-red-600'
    },
    {
      role: 'Admin',
      email: 'sandeep@teleaon.ai',
      password: 'admin12345',
      description: 'Full system access',
      icon: Shield,
      color: 'from-red-500 to-red-600'
    },
    {
      role: 'Manager',
      email: 'manager@example.com',
      password: 'manager123',
      description: 'Management access',
      icon: Settings,
      color: 'from-blue-500 to-blue-600'
    },
    {
      role: 'User',
      email: 'user@example.com',
      password: 'user123',
      description: 'Basic POS access',
      icon: User,
      color: 'from-green-500 to-green-600'
    }
  ];

  const fillCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-400 via-pink-100 to-sky-200">
      <div className="max-w-6xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-sky-900 mb-2">
            Teleaon.AI
          </h1>
          <h2 className="text-2xl font-semibold text-sky-800">
            Adavakkad Collections
          </h2>
          <p className="mt-2 text-sm text-sky-700">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Sign In</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-white/50"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-white/50"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-sky-500 to-pink-500 hover:from-sky-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${
                    isLoading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LogIn className="h-5 w-5 text-white" />
                  </span>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>

          {/* Demo Credentials */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Demo Credentials</h3>
            <p className="text-sm text-gray-600 mb-6">
              Click on any credential below to auto-fill the login form:
            </p>
            
            <div className="space-y-4">
              {demoCredentials.map((cred, index) => {
                const Icon = cred.icon;
                return (
                  <button
                    key={index}
                    onClick={() => fillCredentials(cred.email, cred.password)}
                    className="w-full p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${cred.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">{cred.role}</h4>
                          <span className="text-xs text-gray-500">Click to use</span>
                        </div>
                        <p className="text-sm text-gray-600">{cred.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{cred.email}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Access Levels:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li><strong>Admin:</strong> Full system access including user management and audit trails</li>
                <li><strong>Manager:</strong> Access to most features except user management</li>
                <li><strong>User:</strong> Basic POS functions and order management</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Restaurant POS Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Dashboard', desc: 'Real-time analytics' },
              { name: 'Orders', desc: 'Order management' },
              { name: 'Products', desc: 'Menu & inventory' },
              { name: 'Staff', desc: 'Team management' },
              { name: 'Reports', desc: 'Sales analytics' },
              { name: 'Members', desc: 'Customer loyalty' },
              { name: 'Attendance', desc: 'Time tracking' },
              { name: 'Settings', desc: 'System config' }
            ].map((feature, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gradient-to-br from-sky-50 to-pink-50 hover:from-sky-100 hover:to-pink-100 transition-all duration-300">
                <h4 className="font-semibold text-gray-900">{feature.name}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
