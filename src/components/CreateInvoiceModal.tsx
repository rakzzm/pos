import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, User, Calendar, CreditCard } from 'lucide-react';
import { useInvoiceStore, InvoiceItem, PaymentMethod, InvoiceStatus } from '../stores/invoiceStore';
import { useMemberStore } from '../stores/memberStore';
import { useProductStore } from '../stores/productStore';

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateInvoiceModal({ isOpen, onClose }: CreateInvoiceModalProps) {
  const { createInvoice } = useInvoiceStore();
  const { members, fetchMembers } = useMemberStore();
  const { products, fetchProducts } = useProductStore();

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  
  // Form State
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    status: 'draft' as InvoiceStatus,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    paymentMethod: 'cash' as PaymentMethod,
    notes: '',
    terms: 'Payment due within 30 days.'
  });

  useEffect(() => {
    if (isOpen) {
      fetchMembers();
      fetchProducts();
      // Reset form
      setItems([]);
      setFormData({
        customerId: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        customerAddress: '',
        status: 'draft',
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        paymentMethod: 'cash',
        notes: '',
        terms: 'Payment due within 30 days.'
      });
    }
  }, [isOpen, fetchMembers, fetchProducts]);

  const handleCustomerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const memberId = e.target.value;
    if (memberId === 'manual') {
        setFormData(prev => ({ ...prev, customerId: '', customerName: '', customerEmail: '', customerPhone: '', customerAddress: '' }));
        return;
    }
    
    const member = members.find(m => m.id === memberId);
    if (member) {
      setFormData(prev => ({
        ...prev,
        customerId: member.id,
        customerName: member.name,
        customerEmail: member.email,
        customerPhone: member.phone,
        customerAddress: '' // Member store doesn't have address explicitly in types shown, leave blank or add field later
      }));
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Math.random().toString(36).substr(2, 9),
        description: '',
        quantity: 1,
        unitPrice: 0,
        taxRate: 0,
        discount: 0,
        total: 0
      }
    ]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-fill from product selection
        if (field === 'description') {
           const product = products.find(p => p.name === value); // Simple string match or ID if we used select
           if (product) {
               updatedItem.unitPrice = product.price;
           }
        }

        // Recalculate total
        const subtotal = updatedItem.quantity * updatedItem.unitPrice;
        const discountAmount = updatedItem.discount; // Assuming flat discount for simplicity, or calculation
        // For simplicity in this demo, let's treat discount as currency value, not percentage, or we need logic
        // The store type suggests 'discount: number', usually meaning amount. 
        
        // Let's implement tax
        const taxAmount = (subtotal - discountAmount) * (updatedItem.taxRate / 100);
        updatedItem.total = subtotal - discountAmount + taxAmount;
        
        return updatedItem;
      }
      return item;
    }));
  };
  
  const handleProductSelect = (itemId: string, productId: string) => {
      const product = products.find(p => p.id === productId);
      if (!product) return;
      
      setItems(items.map(item => {
          if (item.id === itemId) {
              const unitPrice = product.price;
              const quantity = item.quantity || 1;
              const discount = item.discount || 0;
              const taxRate = item.taxRate || 0;
              
              const subtotal = quantity * unitPrice;
              const taxAmount = (subtotal - discount) * (taxRate / 100);
              const total = subtotal - discount + taxAmount;

              return {
                  ...item,
                  description: product.name,
                  unitPrice,
                  quantity,
                  taxRate,
                  discount,
                  total
              };
          }
          return item;
      }));
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const totalDiscount = items.reduce((sum, item) => sum + item.discount, 0);
  const totalTax = items.reduce((sum, item) => sum + ((item.quantity * item.unitPrice - item.discount) * (item.taxRate / 100)), 0);
  const grandTotal = subtotal - totalDiscount + totalTax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createInvoice({
        ...formData,
        items,
        subtotal,
        totalDiscount,
        totalTax,
        grandTotal,
      });
      onClose();
    } catch (error) {
      console.error('Failed to create invoice:', error);
      alert('Failed to create invoice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">New Invoice</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8 flex-1">
            {/* Customer Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                        <User className="w-4 h-4" /> Customer Details
                    </h3>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Select Customer</label>
                        <select 
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                            onChange={handleCustomerSelect}
                            value={formData.customerId || 'manual'}
                        >
                            <option value="manual">Manual Entry</option>
                            {members.map(m => (
                                <option key={m.id} value={m.id}>{m.name} ({m.phone})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Customer Name</label>
                        <input
                            required 
                            type="text" 
                            className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                            value={formData.customerName}
                            onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                        <input 
                            type="email" 
                            className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                            value={formData.customerEmail}
                            onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Invoice Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Issue Date</label>
                            <input 
                                type="date" 
                                required
                                className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                                value={formData.issueDate}
                                onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Due Date</label>
                            <input 
                                type="date" 
                                required
                                className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                            <select 
                                className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value as InvoiceStatus})}
                            >
                                <option value="draft">Draft</option>
                                <option value="sent">Sent</option>
                                <option value="paid">Paid</option>
                                <option value="overdue">Overdue</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Payment Method</label>
                            <select 
                                className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                                value={formData.paymentMethod}
                                onChange={(e) => setFormData({...formData, paymentMethod: e.target.value as PaymentMethod})}
                            >
                                <option value="cash">Cash</option>
                                <option value="card">Card</option>
                                <option value="bank_transfer">Bank Transfer</option>
                                <option value="digital_wallet">Digital Wallet</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Items Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-gray-600">Line Items</h3>
                    <button 
                        type="button" 
                        onClick={addItem}
                        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" /> Add Item
                    </button>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                            <tr>
                                <th className="p-3 w-1/3">Item / Description</th>
                                <th className="p-3 w-20 text-center">Qty</th>
                                <th className="p-3 w-24 text-right">Price</th>
                                <th className="p-3 w-20 text-right">Tax (%)</th>
                                <th className="p-3 w-24 text-right">Disc.</th>
                                <th className="p-3 w-24 text-right">Total</th>
                                <th className="p-3 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="p-2">
                                        <div className="flex flex-col gap-1">
                                            <select 
                                                className="w-full p-1.5 border border-gray-200 rounded text-sm mb-1"
                                                onChange={(e) => handleProductSelect(item.id, e.target.value)}
                                                value=""
                                            >
                                                <option value="" disabled>Select Product...</option>
                                                {products.map(p => (
                                                    <option key={p.id} value={p.id}>{p.name} - ₹{p.price}</option>
                                                ))}
                                            </select>
                                            <input 
                                                type="text" 
                                                placeholder="Description"
                                                className="w-full p-1.5 border border-gray-200 rounded text-sm"
                                                value={item.description}
                                                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                            />
                                        </div>
                                    </td>
                                    <td className="p-2">
                                        <input 
                                            type="number" 
                                            min="1"
                                            className="w-full p-1.5 border border-gray-200 rounded text-center"
                                            value={item.quantity}
                                            onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value))}
                                        />
                                    </td>
                                    <td className="p-2">
                                        <input 
                                            type="number" 
                                            min="0"
                                            step="0.01"
                                            className="w-full p-1.5 border border-gray-200 rounded text-right"
                                            value={item.unitPrice}
                                            onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                                        />
                                    </td>
                                    <td className="p-2">
                                        <input 
                                            type="number" 
                                            min="0"
                                            max="100"
                                            className="w-full p-1.5 border border-gray-200 rounded text-right"
                                            value={item.taxRate}
                                            onChange={(e) => updateItem(item.id, 'taxRate', parseFloat(e.target.value))}
                                        />
                                    </td>
                                    <td className="p-2">
                                        <input 
                                            type="number" 
                                            min="0"
                                            step="0.01"
                                            className="w-full p-1.5 border border-gray-200 rounded text-right"
                                            value={item.discount}
                                            onChange={(e) => updateItem(item.id, 'discount', parseFloat(e.target.value))}
                                        />
                                    </td>
                                    <td className="p-3 text-right font-medium text-gray-900">
                                        ₹{item.total.toFixed(2)}
                                    </td>
                                    <td className="p-2 text-center">
                                        <button 
                                            type="button"
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {items.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-gray-400 text-sm">
                                        No items added. Click "Add Item" to start.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Summary */}
            <div className="flex justify-end pt-4 border-t border-gray-100">
                <div className="w-64 space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Discount</span>
                        <span>-₹{totalDiscount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Tax</span>
                        <span>+₹{totalTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                        <span>Grand Total</span>
                        <span>₹{grandTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            
             <div className="pt-6 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white z-10">
                <button 
                    type="button" 
                    onClick={onClose}
                    className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all font-medium flex items-center gap-2"
                >
                    {loading ? 'Saving...' : (
                        <>
                            <Save className="w-4 h-4" /> Save Invoice
                        </>
                    )}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
