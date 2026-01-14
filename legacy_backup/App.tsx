import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Orders } from './pages/Orders';
import { Members } from './pages/Members';
import { Reports } from './pages/Reports';
import { TopSales } from './pages/TopSales';
import { StaffManagement } from './pages/StaffManagement';
import { Attendance } from './pages/Attendance';
import { Settings } from './pages/Settings';
import { AIInsights } from './pages/AIInsights';
import { SmartPOS } from './pages/SmartPOS';
import { Invoices } from './pages/Invoices';
import { Login } from './pages/Login';
import { CustomerMenu } from './pages/CustomerMenu';
import { QRCodeGenerator } from './pages/QRCodeGenerator';
import { AuthProvider } from './contexts/AuthContext';
import { Chatbot } from './components/Chatbot';
import { ChatbotToggle } from './components/ChatbotToggle';

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = React.useState(false);

  return (
    <Router>
      <AuthProvider>
        <div className="relative">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/menu/:tableNumber" element={<CustomerMenu />} />

            {/* Protected Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="members" element={<Members />} />
              <Route path="reports" element={<Reports />} />
              <Route path="top-sales" element={<TopSales />} />
              <Route path="ai-insights" element={<AIInsights />} />
              <Route path="smart-pos" element={<SmartPOS />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="staff" element={<StaffManagement />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="qr-codes" element={<QRCodeGenerator />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>

          {/* Chatbot Components */}
          <Chatbot
            isOpen={isChatbotOpen}
            onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
          />
          {!isChatbotOpen && (
            <ChatbotToggle onClick={() => setIsChatbotOpen(true)} />
          )}
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;