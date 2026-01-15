"use client";

import React, { useState, useEffect } from 'react';
import { UserCheck, Plus, Search, Edit, Trash2, Mail, Phone, Calendar, DollarSign } from 'lucide-react';
import { useStaffStore } from '../../../stores/staffStore';
import { Modal } from '../../../components/Modal';
import { AddEditStaffModal } from '../../../components/AddEditStaffModal';
import { PayrollModal } from '../../../components/PayrollModal';

export default function StaffManagementPage() {
  const { staff, loading, fetchStaff } = useStaffStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPayrollModalOpen, setIsPayrollModalOpen] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | undefined>(undefined);
  const { deleteStaff } = useStaffStore();

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.position === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'manager':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'waiter':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'chef':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const stats = {
    total: staff.length,
    admin: staff.filter((s) => s.position === 'admin').length,
    manager: staff.filter((s) => s.position === 'manager').length,
    waiter: staff.filter((s) => s.position === 'waiter').length,
    chef: staff.filter((s) => s.position === 'chef').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <UserCheck className="h-10 w-10 text-pink-600" />
          Staff Management
        </h1>
        <p className="text-gray-600">Manage your restaurant team</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Total Staff</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
            <UserCheck className="h-12 w-12 text-white/30" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div>
            <p className="text-gray-600 text-sm font-medium">Admins</p>
            <p className="text-3xl font-bold text-purple-600">{stats.admin}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div>
            <p className="text-gray-600 text-sm font-medium">Managers</p>
            <p className="text-3xl font-bold text-blue-600">{stats.manager}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div>
            <p className="text-gray-600 text-sm font-medium">Waiters</p>
            <p className="text-3xl font-bold text-green-600">{stats.waiter}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div>
            <p className="text-gray-600 text-sm font-medium">Chefs</p>
            <p className="text-3xl font-bold text-orange-600">{stats.chef}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl w-full focus:ring-2 focus:ring-pink-600 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
             <button
              onClick={() => setIsPayrollModalOpen(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition-all shadow-lg"
            >
              <DollarSign className="h-5 w-5" />
              Payroll
            </button>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="waiter">Waiter</option>
              <option value="chef">Chef</option>
            </select>
            <button
              onClick={() => {
                  setEditingStaffId(undefined); // Ensure add mode
                  setIsAddModalOpen(true);
              }}
              className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
            >
              <Plus className="h-5 w-5" />
              Add Staff
            </button>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-gray-600">Loading staff...</div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-pink-600/10 to-rose-600/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Hire Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Salary</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStaff.map((member) => (
                  <tr key={member.id} className="hover:bg-pink-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full flex items-center justify-center text-white font-bold">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-xs text-gray-500">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full border ${getRoleBadgeColor(
                          member.position
                        )}`}
                      >
                        {member.position.charAt(0).toUpperCase() + member.position.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          {member.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {new Date(member.hireDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                        <DollarSign className="h-4 w-4" />
                        ₹{member.salary.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button 
                            onClick={() => {
                                setEditingStaffId(member.id);
                                setIsAddModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                            onClick={async () => {
                                if(confirm('Are you sure you want to delete this staff member?')) {
                                    await deleteStaff(member.id);
                                }
                            }}
                            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
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
      )}

      <AddEditStaffModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        staffId={editingStaffId}
      />
      
      <PayrollModal 
        isOpen={isPayrollModalOpen}
        onClose={() => setIsPayrollModalOpen(false)}
      />
    </div>
  );
}
