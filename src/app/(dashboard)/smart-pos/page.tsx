"use client";

import React, { useState, useEffect } from 'react';
import { Zap, ShoppingCart, CreditCard, Smartphone, QrCode, Check, X, Search, User } from 'lucide-react';
import { useProductStore } from '../../../stores/productStore';
import { useOrderStore } from '../../../stores/orderStore';
import Image from 'next/image';

export default function SmartPOSPage() {
  const { products, fetchProducts } = useProductStore();
  const { addOrder } = useOrderStore();
  
  const [cart, setCart] = useState<Array<{ id: string; name: string; price: number; qty: number }>>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'upi'>('cash');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customerName, setCustomerName] = useState('Walk-in Customer');
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: typeof products[0]) => {
    const existing = cart.find((c) => c.id === product.id);
    if (existing) {
      setCart(cart.map((c) => (c.id === product.id ? { ...c, qty: c.qty + 1 } : c)));
    } else {
      setCart([...cart, { id: product.id, name: product.name, price: product.price, qty: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((c) => c.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) {
      removeFromCart(id);
    } else {
      setCart(cart.map((c) => (c.id === id ? { ...c, qty } : c)));
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      await addOrder({
        customerName,
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.qty
        })),
        status: 'completed', // POS orders are typically completed immediately
        paymentMethod,
        subtotal,
        discount: 0,
        serviceTax: tax,
        total,
        date: new Date().toISOString(),
        source: 'POS'
      });
      
      alert(`Order placed successfully! Total: ₹${total.toFixed(2)}`);
      setCart([]);
      setCustomerName('Walk-in Customer');
    } catch (error) {
      alert('Failed to place order');
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-cyan-50 to-blue-50">
      {/* Products Side */}
      <div className="flex-1 p-6 flex flex-col h-full overflow-hidden">
        <div className="mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <Zap className="h-10 w-10 text-cyan-600" />
            Smart POS
          </h1>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-xl border-none shadow-sm focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                      ? 'bg-cyan-600 text-white shadow-lg' 
                      : 'bg-white text-gray-600 hover:bg-cyan-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all border-2 border-transparent hover:border-cyan-500 group text-left relative overflow-hidden"
              >
                <div className="aspect-square bg-gray-100 rounded-xl mb-3 relative overflow-hidden">
                  {product.image_url ? (
                    <Image 
                      src={product.image_url} 
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300">
                      <ShoppingCart className="h-12 w-12" />
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-cyan-600">₹{product.price.toFixed(2)}</p>
                  {cart.find(c => c.id === product.id) && (
                    <span className="bg-cyan-100 text-cyan-700 text-xs font-bold px-2 py-1 rounded-full">
                      {cart.find(c => c.id === product.id)?.qty}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Side */}
      <div className="w-96 bg-white shadow-2xl flex flex-col border-l border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Order</h2>
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
            <User className="h-5 w-5 text-gray-400" />
            <input 
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="bg-transparent border-none focus:ring-0 w-full font-medium text-gray-700"
              placeholder="Customer Name"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center justify-center h-full">
              <div className="bg-cyan-50 p-6 rounded-full mb-4">
                <ShoppingCart className="h-12 w-12 text-cyan-300" />
              </div>
              <p className="text-gray-500 font-medium">Cart is empty</p>
              <p className="text-sm text-gray-400 mt-2">Add items from the menu</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 group hover:bg-cyan-50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">₹{item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.qty - 1)}
                    className="w-8 h-8 bg-white border border-gray-200 rounded-lg hover:border-cyan-500 hover:text-cyan-600 flex items-center justify-center transition-all disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-gray-700">{item.qty}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.qty + 1)}
                    className="w-8 h-8 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 flex items-center justify-center transition-all shadow-md"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="p-6 space-y-3">
              <div className="space-y-2 pb-4 border-b border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (10%):</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-cyan-600">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'cash'
                      ? 'border-cyan-600 bg-cyan-50 text-cyan-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <DollarSign className="h-5 w-5" />
                  <span className="text-xs font-bold">Cash</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'card'
                      ? 'border-cyan-600 bg-cyan-50 text-cyan-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span className="text-xs font-bold">Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'upi'
                      ? 'border-cyan-600 bg-cyan-50 text-cyan-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <QrCode className="h-5 w-5" />
                  <span className="text-xs font-bold">UPI</span>
                </button>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2 active:scale-95"
              >
                <Check className="h-6 w-6" />
                Complete Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DollarSign(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );
}
