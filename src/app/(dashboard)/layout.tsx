"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart2,
  Settings,
  LogOut,
  TrendingUp,
  UserCheck,
  Clock,
  Menu,
  X,
  Brain,
  Zap,
  FileText,
  QrCode
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protected route check 
  // Note: Middleware or server components are better for this in production,
  // but for now, we keep the client-side check consistent with the previous logic.
  React.useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      if (!stored) {
        router.push('/login');
      }
    }
  }, [user, router]);

  if (!user) {
    // Return null or loader while redirection happens in AuthContext
    return null; 
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      glow: 'shadow-lg shadow-blue-500/20',
      glass: 'backdrop-blur-xl bg-white/10 border border-white/20'
    },
    {
      name: 'Products',
      href: '/products',
      icon: Package,
      gradient: 'from-purple-500/20 to-violet-500/20',
      glow: 'shadow-lg shadow-purple-500/20',
      glass: 'backdrop-blur-xl bg-white/10 border border-white/20'
    },
    {
      name: 'Orders',
      href: '/orders',
      icon: ShoppingCart,
      gradient: 'from-green-500/20 to-emerald-500/20',
      glow: 'shadow-lg shadow-green-500/20',
      glass: 'backdrop-blur-xl bg-white/10 border border-white/20'
    },
    {
      name: 'Members',
      href: '/members',
      icon: Users,
      gradient: 'from-orange-500/20 to-amber-500/20',
      glow: 'shadow-lg shadow-orange-500/20',
      glass: 'backdrop-blur-xl bg-white/10 border border-white/20'
    },
    {
      name: 'Top Sales',
      href: '/top-sales',
      icon: TrendingUp,
      gradient: 'from-cyan-500/20 to-teal-500/20',
      glow: 'shadow-lg shadow-cyan-500/20',
      glass: 'backdrop-blur-xl bg-white/10 border border-white/20'
    },
    {
      name: 'Reports',
      href: '/reports',
      icon: BarChart2,
      gradient: 'from-red-500/20 to-rose-500/20',
      glow: 'shadow-lg shadow-red-500/20',
      glass: 'backdrop-blur-xl bg-white/10 border border-white/20'
    },
    {
      name: 'AI Insights',
      href: '/ai-insights',
      icon: Brain,
      gradient: 'from-indigo-500/20 to-purple-500/20',
      glow: 'shadow-lg shadow-indigo-500/20',
      glass: 'backdrop-blur-xl bg-white/10 border border-white/20'
    },
    {
      name: 'Smart POS',
      href: '/smart-pos',
      icon: Zap,
      gradient: 'from-pink-500/20 to-rose-500/20',
      glow: 'shadow-lg shadow-pink-500/20',
      glass: 'backdrop-blur-xl bg-white/10 border border-white/20'
    },
    {
      name: 'E-Invoicing',
      href: '/invoices',
      icon: FileText,
      gradient: 'from-indigo-500/20 to-purple-500/20',
      glow: 'shadow-lg shadow-indigo-500/20',
      glass: 'backdrop-blur-xl bg-white/10 border border-white/20'
    },
    {
      name: 'Staff Management',
      href: '/staff',
      icon: UserCheck,
      gradient: 'from-emerald-500/20 to-green-500/20',
      glow: 'shadow-lg shadow-emerald-500/20',
      glass: 'backdrop-blur-xl bg-white/10 border border-white/20'
    },
    {
      name: 'Attendance',
      href: '/attendance',
      icon: Clock,
      gradient: 'from-teal-500/20 to-cyan-500/20',
      glow: 'shadow-lg shadow-teal-500/20',
      glass: 'backdrop-blur-xl bg-white/10 border border-white/20'
    },

    {
      name: 'Tables',
      href: '/tables',
      icon: QrCode,
      gradient: 'from-amber-500/20 to-orange-500/20',
      glow: 'shadow-lg shadow-amber-500/20',
      glass: 'backdrop-blur-xl bg-white/10 border border-white/20'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      gradient: 'from-slate-500/20 to-gray-500/20',
      glow: 'shadow-lg shadow-slate-500/20',
      glass: 'backdrop-blur-xl bg-white/10 border border-white/20'
    },
  ];

  const getPageTheme = (pathname: string | null) => {
    if (!pathname || pathname === '/') return 'dashboard';
    if (pathname.includes('/products')) return 'products';
    if (pathname.includes('/orders')) return 'orders';
    if (pathname.includes('/members')) return 'members';
    if (pathname.includes('/reports')) return 'reports';
    if (pathname.includes('/top-sales')) return 'topsales';
    if (pathname.includes('/staff')) return 'staff';
    if (pathname.includes('/attendance')) return 'attendance';
    if (pathname.includes('/tables')) return 'members'; // Reuse members theme (orange/amber)
    if (pathname.includes('/settings')) return 'settings';
    return 'dashboard';
  };

  const currentTheme = getPageTheme(pathname);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-${currentTheme}-bg via-${currentTheme}-bg/30 to-${currentTheme}-bg/80 relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-${currentTheme}-primary/20 to-${currentTheme}-secondary/20 rounded-full blur-3xl animate-float`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-${currentTheme}-accent/20 to-${currentTheme}-primary/20 rounded-full blur-3xl animate-float`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-${currentTheme}-primary/10 to-${currentTheme}-secondary/10 rounded-full blur-3xl animate-pulse-slow`}></div>
      </div>

      <div className="flex h-screen">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-white/10`}>

          {/* Header */}
          <div className="flex h-20 items-center justify-between px-4 pt-4 pb-2">
            <div className="flex items-center justify-center w-full">
              <div className="relative w-full h-12 bg-white rounded-lg shadow-lg p-1">
                <img
                  src="/images/logo.png"
                  alt="Adavakkad Collections"
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-5 px-2 space-y-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 overflow-hidden ${isActive
                    ? `${item.glass} text-white ${item.glow} transform scale-105 shadow-xl`
                    : 'text-gray-300 hover:text-white hover:backdrop-blur-xl hover:bg-white/5 hover:scale-105'
                    }`}
                >
                  {/* Shine effect */}
                  <div className={`absolute inset-0 bg-shine-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isActive ? 'animate-shine' : ''
                    }`}></div>

                  <Icon className={`mr-4 h-6 w-6 transition-transform duration-300 ${isActive ? 'animate-float' : 'group-hover:scale-110'
                    }`} />
                  <span className="relative z-10">{item.name}</span>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User info and logout */}
          <div className="mt-auto p-4 bg-gradient-to-t from-gray-900 to-transparent">
            <div className="mb-4 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-sm font-medium text-white">{user.name}</div>
              <div className="text-xs text-gray-300 capitalize">{user.role}</div>
            </div>
            <button
              onClick={logout}
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-red-500/20 w-full rounded-xl transition-all duration-300 group"
            >
              <LogOut className="mr-4 h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          {/* Mobile header */}
          <div className="lg:hidden bg-white/80 backdrop-blur-sm shadow-sm p-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="h-10">
              <img
                src="/images/logo.png"
                alt="Adavakkad Collections"
                className="h-full object-contain"
              />
            </div>
            <div className="w-6"></div>
          </div>

          <main className="p-6">
            <div className="w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
