"use client";

import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, User, Phone, Mail, Award, CheckCircle, Gift, Crown } from 'lucide-react';
import { useMemberStore } from '../../../stores/memberStore';
import { Modal } from '../../../components/Modal';
import { ConfirmDialog } from '../../../components/ConfirmDialog';

type MemberTier = 'bronze' | 'silver' | 'gold' | 'platinum';

type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  points: number;
  tier: MemberTier;
  status: 'active' | 'inactive';
  visits: number;
  totalSpent: number;
};

export default function MembersPage() {
  const { members, loading, error, fetchMembers, addMember, updateMember, deleteMember } = useMemberStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active' as 'active' | 'inactive',
    points: '',
    totalSpent: ''
  });

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const memberData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
        points: parseInt(formData.points) || 0,
        totalSpent: parseFloat(formData.totalSpent) || 0,
        // Calculate tier based on points/spent (simplified logic)
        tier: (parseFloat(formData.totalSpent) > 10000 ? 'gold' : parseFloat(formData.totalSpent) > 5000 ? 'silver' : 'bronze') as MemberTier,
        visits: selectedMember?.visits || 0,
        joinDate: selectedMember?.joinDate || new Date().toISOString().split('T')[0]
      };

      if (selectedMember) {
        await updateMember(selectedMember.id, memberData);
        setIsEditModalOpen(false);
      } else {
        await addMember(memberData);
        setIsAddModalOpen(false);
      }
      setFormData({
        name: '',
        email: '',
        phone: '',
        status: 'active',
        points: '',
        totalSpent: ''
      });
      setSelectedMember(null);
    } catch (err) {
      console.error('Failed to save member:', err);
    }
  };

  const handleEdit = (member: Member) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      status: member.status,
      points: member.points.toString(),
      totalSpent: member.totalSpent.toString()
    });
    setIsEditModalOpen(true);
  };



  const handleDelete = (member: Member) => {
    setSelectedMember(member);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedMember) {
      try {
        await deleteMember(selectedMember.id);
        setIsDeleteDialogOpen(false);
        setSelectedMember(null);
      } catch (err) {
        console.error('Failed to delete member:', err);
      }
    }
  };

  const getTierColor = (tier: MemberTier) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);
    const matchesTier = tierFilter === 'all' || member.tier === tierFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const memberStats = {
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    newThisMonth: members.filter(m => {
      const date = new Date(m.joinDate);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
    platinum: members.filter(m => m.tier === 'platinum').length
  };

  const MemberForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-members-primary focus:border-transparent transition-all duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-members-primary focus:border-transparent transition-all duration-300"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-members-primary focus:border-transparent transition-all duration-300"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-members-primary focus:border-transparent transition-all duration-300"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Points</label>
          <input
            type="number"
            value={formData.points}
            onChange={(e) => setFormData({ ...formData, points: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-members-primary focus:border-transparent transition-all duration-300"
            placeholder="0"
          />
        </div>
      </div>

      {selectedMember && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Spent (₹)</label>
            <input
              type="number"
              step="0.01"
              value={formData.totalSpent}
              onChange={(e) => setFormData({ ...formData, totalSpent: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-members-primary focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-4 pt-6 border-t">
        <button
          type="button"
          onClick={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
          }}
          className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-members-primary to-members-secondary text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium"
        >
          {selectedMember ? 'Update Member' : 'Add Member'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-members-bg via-members-bg/30 to-members-bg/80 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-members-primary/20 to-members-secondary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-members-accent/20 to-members-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-members-primary/10 to-members-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-shimmer-gradient bg-[length:200%_100%] rounded-full animate-shimmer opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-radial-shine rounded-full animate-glow"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-members-primary to-members-secondary bg-clip-text text-transparent mb-2">
              Member Management
            </h1>
            <p className="text-gray-600">Track customer loyalty and manage memberships</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-members-primary to-members-secondary text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            Add Member
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-members-primary to-members-secondary rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Members</p>
                <p className="text-3xl font-bold">{memberStats.total}</p>
              </div>
              <User className="h-12 w-12 text-white/30" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Members</p>
                <p className="text-3xl font-bold text-green-600">{memberStats.active}</p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-300" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">New This Month</p>
                <p className="text-3xl font-bold text-blue-600">{memberStats.newThisMonth}</p>
              </div>
              <Award className="h-12 w-12 text-blue-300" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Platinum Tier</p>
                <p className="text-3xl font-bold text-purple-600">{memberStats.platinum}</p>
              </div>
              <Crown className="h-12 w-12 text-purple-300" />
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
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl w-full focus:ring-2 focus:ring-members-primary focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-members-primary focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Tiers</option>
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-members-primary focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Members List */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading members...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-members-primary/10 to-members-secondary/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loyalty Tier</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-members-primary to-members-secondary rounded-full flex items-center justify-center text-white font-bold mr-3">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            <div className="text-xs text-gray-500">Joined {member.joinDate}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 space-y-1">
                          <div className="flex items-center">
                            <Mail className="h-3 w-3 mr-2" />
                            {member.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-2" />
                            {member.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getTierColor(member.tier)}`}>
                          {member.tier}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Gift className="h-4 w-4 text-members-primary mr-2" />
                          <span className="text-sm font-medium text-gray-900">{member.points} pts</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${member.status === 'active'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : 'bg-red-100 text-red-800 border-red-200'
                          }`}>
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(member)}
                            className="text-members-primary hover:text-members-secondary p-2 rounded-lg hover:bg-members-primary/10 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(member)}
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
          )}
        </div>

        {/* Modals */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Member"
          size="large"
        >
          <MemberForm />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Member"
          size="large"
        >
          <MemberForm />
        </Modal>

        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Member"
          message="Are you sure you want to delete this member? All loyalty points will be lost. This action cannot be undone."
        />
      </div>
    </div>
  );
}
