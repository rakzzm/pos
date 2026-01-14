import React, { useState, useEffect } from 'react';
import { Search, FileText, Edit, Trash2, Plus, Tag, User, MinusCircle, TrendingUp, Clock, CheckCircle, XCircle, Eye, Download } from 'lucide-react';
import { useOrderStore } from '../stores/orderStore';
import { useProductStore } from '../stores/productStore';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import * as XLSX from 'xlsx';

const SERVICE_TAX_RATE = 0.10; // 10% service tax

type OrderStatus = 'pending' | 'completed' | 'cancelled';

type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
  name: string;
};

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  memberId?: string;
  items: OrderItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  serviceTax: number;
  total: number;
  status: OrderStatus;
  date: string;
  paymentMethod: string;
  couponCode?: string;
};

export function Orders() {
  const { orders, fetchOrders, addOrder, updateOrder, deleteOrder } = useOrderStore();
  const { products, fetchProducts } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [editedItems, setEditedItems] = useState<OrderItem[]>([]);
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    memberId: '',
    items: [] as OrderItem[],
    paymentMethod: 'cash' as 'cash' | 'card',
    discount: 0,
    couponCode: ''
  });

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, [fetchOrders, fetchProducts]);

  const calculateOrderTotal = (items: OrderItem[], discount: number) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const afterDiscount = subtotal - discount;
    const serviceTax = afterDiscount * SERVICE_TAX_RATE;
    const total = afterDiscount + serviceTax;
    return { subtotal, serviceTax, total };
  };

  const handleAddItem = (productId: string, isNew: boolean = false) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const newItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    };

    if (isNew) {
      setNewOrder(prev => ({
        ...prev,
        items: [...prev.items, newItem]
      }));
    } else {
      setEditedItems(prev => [...prev, newItem]);
    }
  };

  const handleRemoveItem = (productId: string, isNew: boolean = false) => {
    if (isNew) {
      setNewOrder(prev => ({
        ...prev,
        items: prev.items.filter(item => item.productId !== productId)
      }));
    } else {
      setEditedItems(prev => prev.filter(item => item.productId !== productId));
    }
  };

  const handleUpdateQuantity = (productId: string, quantity: number, isNew: boolean = false) => {
    if (quantity < 1) return;

    if (isNew) {
      setNewOrder(prev => ({
        ...prev,
        items: prev.items.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        )
      }));
    } else {
      setEditedItems(prev => prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      ));
    }
  };

  const handleAddOrder = async () => {
    const totals = calculateOrderTotal(newOrder.items, newOrder.discount);
    try {
      await addOrder({
        ...newOrder,
        status: 'pending',
        subtotal: totals.subtotal,
        serviceTax: totals.serviceTax,
        total: totals.total,
        date: new Date().toISOString().slice(0, 16).replace('T', ' ')
      });
      setIsAddModalOpen(false);
      setNewOrder({
        customerName: '',
        memberId: '',
        items: [],
        paymentMethod: 'cash',
        discount: 0,
        couponCode: ''
      });
    } catch (error) {
      console.error('Failed to add order:', error);
    }
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setEditedItems(order.items);
    setIsEditModalOpen(true);
  };

  const handleView = (order: Order) => {
    setEditingOrder(order);
    setIsViewModalOpen(true);
  };

  const handleDelete = (order: Order) => {
    setEditingOrder(order);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateOrder = async () => {
    if (!editingOrder) return;

    const totals = calculateOrderTotal(editedItems, editingOrder.discount);
    try {
      await updateOrder(editingOrder.id, {
        items: editedItems,
        itemCount: editedItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: totals.subtotal,
        serviceTax: totals.serviceTax,
        total: totals.total,
        status: editingOrder.status
      });
      setIsEditModalOpen(false);
      setEditingOrder(null);
      setEditedItems([]);
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  const confirmDelete = async () => {
    if (editingOrder) {
      try {
        await deleteOrder(editingOrder.id);
        setIsDeleteDialogOpen(false);
        setEditingOrder(null);
      } catch (error) {
        console.error('Failed to delete order:', error);
      }
    }
  };

  const exportOrders = () => {
    const exportData = orders.map(order => ({
      'Order Number': order.orderNumber,
      'Customer': order.customerName,
      'Member ID': order.memberId || 'N/A',
      'Items': order.itemCount,
      'Subtotal': order.subtotal,
      'Discount': order.discount,
      'Service Tax': order.serviceTax,
      'Total': order.total,
      'Status': order.status,
      'Payment Method': order.paymentMethod,
      'Date': order.date
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');
    XLSX.writeFile(wb, `orders_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentMethod === paymentFilter;

    let matchesDate = true;
    if (dateFilter !== 'all') {
      const orderDate = new Date(order.date);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      switch (dateFilter) {
        case 'today':
          matchesDate = orderDate.toDateString() === today.toDateString();
          break;
        case 'yesterday':
          matchesDate = orderDate.toDateString() === yesterday.toDateString();
          break;
        case 'week': {
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          matchesDate = orderDate >= weekAgo;
          break;
        }
      }
    }

    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    todayRevenue: orders
      .filter(o => o.status === 'completed' && new Date(o.date).toDateString() === new Date().toDateString())
      .reduce((sum, o) => sum + o.total, 0)
  };

  const renderOrderForm = (isNew: boolean = false) => {
    const items = isNew ? newOrder.items : editedItems;
    const totals = calculateOrderTotal(items, isNew ? newOrder.discount : (editingOrder?.discount || 0));

    return (
      <div className="flex gap-8">
        {/* Left Column - Product Selection */}
        <div className="w-[45%] space-y-4">
          {isNew && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                <input
                  type="text"
                  value={newOrder.customerName}
                  onChange={(e) => setNewOrder(prev => ({ ...prev, customerName: e.target.value }))}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-orders-primary focus:border-orders-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Member ID (Optional)</label>
                <input
                  type="text"
                  value={newOrder.memberId}
                  onChange={(e) => setNewOrder(prev => ({ ...prev, memberId: e.target.value }))}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-orders-primary focus:border-orders-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <select
                  value={newOrder.paymentMethod}
                  onChange={(e) => setNewOrder(prev => ({ ...prev, paymentMethod: e.target.value as 'cash' | 'card' }))}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-orders-primary focus:border-orders-primary"
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                </select>
              </div>
            </>
          )}
          {!isNew && editingOrder && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Order Status</label>
              <div className="mt-1 flex gap-2">
                <button
                  onClick={() => setEditingOrder(prev => ({ ...prev!, status: 'pending' }))}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${editingOrder.status === 'pending'
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setEditingOrder(prev => ({ ...prev!, status: 'completed' }))}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${editingOrder.status === 'completed'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setEditingOrder(prev => ({ ...prev!, status: 'cancelled' }))}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${editingOrder.status === 'cancelled'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Cancelled
                </button>
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Add Products</label>
            <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleAddItem(product.id, isNew)}
                  className="flex items-center p-3 border rounded-xl hover:bg-gray-50 hover:border-orders-primary transition-all duration-300 group"
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="ml-3 text-left">
                    <div className="text-sm font-medium">{product.name}</div>
                    <div className="text-xs text-gray-500">₹{product.price.toFixed(2)}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Order Details */}
        <div className="w-[55%] space-y-4">
          {/* Selected Products */}
          <div className="border rounded-xl p-4 space-y-4 max-h-[400px] overflow-y-auto bg-gray-50">
            <h3 className="font-medium text-gray-900">Order Items</h3>
            {items.map((item) => (
              <div key={item.productId} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => handleRemoveItem(item.productId, isNew)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <MinusCircle className="h-5 w-5" />
                  </button>
                  <span className="text-sm flex-1">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1, isNew)}
                      className="text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.productId, parseInt(e.target.value) || 1, isNew)}
                      className="w-16 text-center border rounded-lg"
                    />
                    <button
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1, isNew)}
                      className="text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm font-medium w-24 text-right">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border rounded-xl p-4 space-y-4 bg-gradient-to-br from-orders-primary/5 to-orders-secondary/5">
            <h3 className="font-medium text-gray-900">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>₹{totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Discount:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={isNew ? newOrder.discount : (editingOrder?.discount || 0)}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      if (isNew) {
                        setNewOrder(prev => ({ ...prev, discount: value }));
                      }
                    }}
                    className="w-20 text-right border rounded-lg px-2 py-1"
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service Tax (10%):</span>
                <span>₹{totals.serviceTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t">
                <span>Total:</span>
                <span className="text-orders-primary">₹{totals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
            <button
              onClick={() => {
                if (isNew) {
                  setIsAddModalOpen(false);
                  setNewOrder({
                    customerName: '',
                    memberId: '',
                    items: [],
                    paymentMethod: 'cash',
                    discount: 0,
                    couponCode: ''
                  });
                } else {
                  setIsEditModalOpen(false);
                  setEditingOrder(null);
                  setEditedItems([]);
                }
              }}
              className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={isNew ? handleAddOrder : handleUpdateOrder}
              disabled={items.length === 0}
              className="px-6 py-3 bg-gradient-to-r from-orders-primary to-orders-secondary text-white rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isNew ? 'Create Order' : 'Update Order'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orders-bg via-orders-bg/30 to-orders-bg/80 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orders-primary/20 to-orders-secondary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orders-accent/20 to-orders-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orders-primary/10 to-orders-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-shimmer-gradient bg-[length:200%_100%] rounded-full animate-shimmer opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-radial-shine rounded-full animate-glow"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orders-primary to-orders-secondary bg-clip-text text-transparent mb-2">
              Order Management
            </h1>
            <p className="text-gray-600">Manage customer orders and track sales</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-orders-primary to-orders-secondary text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            New Order
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-gradient-to-r from-orders-primary to-orders-secondary rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold">{orderStats.total}</p>
              </div>
              <FileText className="h-12 w-12 text-white/30" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-blue-600">{orderStats.pending}</p>
              </div>
              <Clock className="h-12 w-12 text-blue-300" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-green-600">{orderStats.completed}</p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-300" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Cancelled</p>
                <p className="text-3xl font-bold text-red-600">{orderStats.cancelled}</p>
              </div>
              <XCircle className="h-12 w-12 text-red-300" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Today's Revenue</p>
                <p className="text-2xl font-bold text-orders-primary">₹{orderStats.todayRevenue.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-orders-primary/30" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl w-full focus:ring-2 focus:ring-orders-primary focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orders-primary focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orders-primary focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
              </select>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orders-primary focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Payments</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </select>
              <button
                onClick={exportOrders}
                className="bg-gradient-to-r from-orders-primary to-orders-secondary text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Download className="h-5 w-5" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-orders-primary/10 to-orders-secondary/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Tag className="w-3 h-3 mr-1" />
                        {order.paymentMethod}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-orders-primary to-orders-secondary rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {order.customerName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                          {order.memberId && (
                            <div className="text-sm text-gray-500 flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {order.memberId}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.itemCount} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{order.total.toFixed(2)}</div>
                      {order.discount > 0 && (
                        <div className="text-xs text-green-600">-₹{order.discount.toFixed(2)} discount</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(order)}
                          className="text-orders-primary hover:text-orders-secondary p-2 rounded-lg hover:bg-orders-primary/10 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(order)}
                          className="text-orders-primary hover:text-orders-secondary p-2 rounded-lg hover:bg-orders-primary/10 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(order)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setNewOrder({
              customerName: '',
              memberId: '',
              items: [],
              paymentMethod: 'cash',
              discount: 0,
              couponCode: ''
            });
          }}
          title="New Order"
          size="large"
        >
          {renderOrderForm(true)}
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingOrder(null);
            setEditedItems([]);
          }}
          title="Edit Order"
          size="large"
        >
          {renderOrderForm(false)}
        </Modal>

        <Modal
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setEditingOrder(null);
          }}
          title="Order Details"
          size="large"
        >
          {editingOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Order Number</label>
                    <div className="text-lg font-bold text-gray-900">{editingOrder.orderNumber}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Customer</label>
                    <div className="text-lg font-medium text-gray-900">{editingOrder.customerName}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(editingOrder.status)}`}>
                      {editingOrder.status.charAt(0).toUpperCase() + editingOrder.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date</label>
                    <div className="text-lg font-medium text-gray-900">{editingOrder.date}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Payment Method</label>
                    <div className="text-lg font-medium text-gray-900 capitalize">{editingOrder.paymentMethod}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Total Amount</label>
                    <div className="text-2xl font-bold text-orders-primary">₹{editingOrder.total.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-2">
                  {editingOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">Qty: {item.quantity}</div>
                        <div className="text-sm text-gray-500">₹{(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>

        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setEditingOrder(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Order"
          message="Are you sure you want to delete this order? This action cannot be undone."
        />
      </div>
    </div>
  );
}