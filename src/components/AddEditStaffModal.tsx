import React, { useState, useEffect } from 'react';
import { X, Save, User, Mail, Phone, Briefcase, DollarSign, Calendar } from 'lucide-react';
import { useStaffStore } from '../stores/staffStore';

interface AddEditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffId?: string; // If provided, edit mode
}

export function AddEditStaffModal({ isOpen, onClose, staffId }: AddEditStaffModalProps) {
  const { staff, addStaff, updateStaff } = useStaffStore();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    position: string;
    department: string;
    hireDate: string;
    salary: number;
    status: 'active' | 'inactive' | 'on-leave';
  }>({
    name: '',
    email: '',
    phone: '',
    position: 'waiter',
    department: 'Service',
    hireDate: new Date().toISOString().split('T')[0],
    salary: 0,
    status: 'active'
  });

  useEffect(() => {
    if (isOpen) {
      if (staffId) {
        const member = staff.find(s => s.id === staffId);
        if (member) {
          setFormData({
            name: member.name,
            email: member.email,
            phone: member.phone,
            position: member.position,
            department: member.department,
            hireDate: member.hireDate,
            salary: member.salary,
            status: member.status
          });
        }
      } else {
        // Reset for add mode
        setFormData({
            name: '',
            email: '',
            phone: '',
            position: 'waiter',
            department: 'Service',
            hireDate: new Date().toISOString().split('T')[0],
            salary: 0,
            status: 'active'
        });
      }
    }
  }, [isOpen, staffId, staff]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (staffId) {
        await updateStaff(staffId, formData);
      } else {
        await addStaff(formData);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save staff:', error);
      alert('Failed to save staff details.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
                {staffId ? 'Edit Staff Member' : 'Add New Staff'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
            </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Personal Info</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                required
                                type="text"
                                className="w-full pl-9 p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                placeholder="John Doe"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                         <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                required
                                type="email"
                                className="w-full pl-9 p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                         <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                required
                                type="tel"
                                className="w-full pl-9 p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500"
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                                placeholder="+1 234 567 890"
                            />
                        </div>
                    </div>
                </div>

                {/* Employment Info */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Employment Details</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Position / Role</label>
                         <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select 
                                className="w-full pl-9 p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500"
                                value={formData.position}
                                onChange={e => setFormData({...formData, position: e.target.value})}
                            >
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="waiter">Waiter</option>
                                <option value="chef">Chef</option>
                                <option value="cleaner">Cleaner</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <input 
                            type="text"
                            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500"
                            value={formData.department}
                            onChange={e => setFormData({...formData, department: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date</label>
                         <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                required
                                type="date"
                                className="w-full pl-9 p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500"
                                value={formData.hireDate}
                                onChange={e => setFormData({...formData, hireDate: e.target.value})}
                            />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Salary (Monthly)</label>
                         <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                required
                                type="number"
                                min="0"
                                className="w-full pl-9 p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500"
                                value={formData.salary}
                                onChange={e => setFormData({...formData, salary: parseFloat(e.target.value)})}
                            />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select 
                            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500"
                            value={formData.status}
                            onChange={e => setFormData({...formData, status: e.target.value as 'active' | 'inactive' | 'on-leave'})}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="on-leave">On Leave</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
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
                    className="px-5 py-2.5 text-white bg-gradient-to-r from-pink-600 to-rose-600 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all font-medium flex items-center gap-2"
                >
                    {loading ? 'Saving...' : (
                        <>
                            <Save className="w-4 h-4" /> Save Details
                        </>
                    )}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
