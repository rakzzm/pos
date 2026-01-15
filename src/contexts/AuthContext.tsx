"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type UserRole = 'admin' | 'manager' | 'user';

type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  locationId: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Local admin accounts
  const adminUsers = [
    {
      id: '1',
      email: 'rakesh@adavakkad.com',
      password: 'admin12345',
      name: 'Rakesh',
      role: 'admin' as UserRole,
      locationId: 'loc1'
    },
    {
      id: '2',
      email: 'sandeep@adavakkad.com',
      password: 'admin12345',
      name: 'Sandeep',
      role: 'admin' as UserRole,
      locationId: 'loc1'
    },
    // Keep other mock users for testing
    {
      id: '3',
      email: 'manager@adavakkad.com',
      password: 'manager123',
      name: 'Manager User',
      role: 'manager' as UserRole,
      locationId: 'loc1'
    },
    {
      id: '4',
      email: 'user@adavakkad.com',
      password: 'user123',
      name: 'Regular User',
      role: 'user' as UserRole,
      locationId: 'loc1'
    }
  ];

  const login = async (email: string, password: string) => {
    const user = adminUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...userData } = user;
      setUser(userData);
      // Store user data in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(userData));
      router.push('/');
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  // Check for stored user data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}