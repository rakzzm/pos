import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Edit, Trash2, Award, Star, TrendingUp, Calendar, Gift, Crown, Download, Eye, Mail, Phone } from 'lucide-react';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useMemberStore } from '../stores/memberStore';
import * as XLSX from 'xlsx';

type MemberTier = 'bronze' | 'silver' | 'gold' | 'platinum';

type Member = {
  id: string;
  memberId: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  tier: MemberTier;
  points: number;
  totalSpent: number;
};

type NewMember = Omit<Member, 'id' | 'memberId' | 'points' | 'totalSpent'>;

export function Members() {
  const { members, addMember, updateMember, deleteMember, fetchMembers } = useMemberStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState<NewMember & { points?: number }>({
    name: '',
    email: '',
    phone: '',
    joinDate: new Date().toISOString().split('T')[0],
    tier: 'bronze'
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      phone: ''
    };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      errors.phone = 'Invalid phone number format';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (selectedMember) {
        const updateData = {
          ...formData,
          points: formData.points !== undefined ? formData.points : selectedMember.points
        };
        await updateMember(selectedMember.id, updateData);
        setIsEditModalOpen(false);
      } else {
        await addMember(formData);
        setIsAddModalOpen(false);
      }
      setFormData({
        name: '',
        email: '',
        phone: '',
        joinDate: new Date().toISOString().split('T')[0],
        tier: 'bronze'
      });
    } catch (error) {
      console.error('Failed to save member:', error);
    }
  };

  const handleEdit = (member: Member) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      joinDate: member.joinDate,
      tier: member.tier,
      points: member.points
    });
    setIsEditModalOpen(true);
  };

  const handleView = (member: Member) => {
    setSelectedMember(member);
    setIsViewModalOpen(true);
  };

  const handleDelete = (member: Member) => {
    setSelectedMember(member);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedMember) {
      await deleteMember(selectedMember.id);
      setIsDeleteDialogOpen(false);
      setSelectedMember(null);
    }
  };

  const exportMembers = () => {
    const exportData = members.map(member => ({
      'Member ID': member.memberId,
      'Name': member.name,
      'Email': member.email,
      'Phone': member.phone,
      'Join Date': member.joinDate,
      'Tier': member.tier,
      'Points': member.points,
      'Total Spent': member.totalSpent
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Members');
    XLSX.writeFile(wb, `members_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const getTierColor = (tier: MemberTier) => {
    switch (tier) {
      case 'platinum':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white';
      case 'gold':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
      case 'silver':
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
      case 'bronze':
        return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierIcon = (tier: MemberTier) => {
    switch (tier) {
      case 'platinum':
        return Crown;
      case 'gold':
        return Award;
      case 'silver':
        return Star;
      case 'bronze':
        return Gift;
      default:
        return Award;
    }
  };

  const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`;

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.memberId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === 'all' || member.tier === tierFilter;
    return matchesSearch && matchesTier;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'points':
        return b.points - a.points;
      case 'spent':
        return b.totalSpent - a.totalSpent;
      case 'tier': {
        const tierOrder = { platinum: 4, gold: 3, silver: 2, bronze: 1 };
        return tierOrder[b.tier] - tierOrder[a.tier];
      }
      case 'joinDate':
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const memberStats = {
    total: members.length,
    bronze: members.filter(m => m.tier === 'bronze').length,
    silver: members.filter(m => m.tier === 'silver').length,
    gold: members.filter(m => m.tier === 'gold').length,
    platinum: members.filter(m => m.tier === 'platinum').length,
    totalPoints: members.reduce((sum, m) => sum + m.points, 0),
    totalSpent: members.reduce((sum, m) => sum + m.totalSpent, 0)
  };

  const MemberForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
            }}
            className={`mt-1 block w-full rounded-xl shadow-sm focus:ring-members-primary focus:border-members-primary sm:text-sm transition-all duration-300
              ${formErrors.name ? 'border-red-300' : 'border-gray-300'}`}
          />
          {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
            }}
            className={`mt-1 block w-full rounded-xl shadow-sm focus:ring-members-primary focus:border-members-primary sm:text-sm transition-all duration-300
              ${formErrors.email ? 'border-red-300' : 'border-gray-300'}`}
          />
          {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
            }}
            className={`mt-1 block w-full rounded-xl shadow-sm focus:ring-members-primary focus:border-members-primary sm:text-sm transition-all duration-300
              ${formErrors.phone ? 'border-red-300' : 'border-gray-300'}`}
          />
          {formErrors.phone && <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Join Date</label>
          <input
            type="date"
            value={formData.joinDate}
            onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-members-primary focus:border-members-primary sm:text-sm transition-all duration-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Membership Tier</label>
          <select
            value={formData.tier}
            onChange={(e) => setFormData({ ...formData, tier: e.target.value as MemberTier })}
            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-members-primary focus:border-members-primary sm:text-sm transition-all duration-300"
          >
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
        </div>

        {selectedMember && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Points</label>
            <input
              type="number"
              value={formData.points}
              onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-members-primary focus:border-members-primary sm:text-sm transition-all duration-300"
              min="0"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
        <button
          type="button"
          onClick={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            setFormErrors({ name: '', email: '', phone: '' });
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
            <p className="text-gray-600">Manage customer loyalty and membership programs</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-members-primary to-members-secondary text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <UserPlus className="h-5 w-5" />
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
              <UserPlus className="h-12 w-12 text-white/30" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Points</p>
                <p className="text-3xl font-bold text-members-primary">{memberStats.totalPoints.toLocaleString()}</p>
              </div>
              <Award className="h-12 w-12 text-members-primary/30" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Spent</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(memberStats.totalSpent)}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-300" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Platinum Members</p>
                <p className="text-3xl font-bold text-purple-600">{memberStats.platinum}</p>
              </div>
              <Crown className="h-12 w-12 text-purple-300" />
            </div>
          </div>
        </div>

        {/* Tier Distribution */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Membership Tier Distribution</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { tier: 'bronze', count: memberStats.bronze, color: 'from-orange-400 to-orange-500' },
              { tier: 'silver', count: memberStats.silver, color: 'from-gray-400 to-gray-500' },
              { tier: 'gold', count: memberStats.gold, color: 'from-yellow-400 to-yellow-500' },
              { tier: 'platinum', count: memberStats.platinum, color: 'from-purple-500 to-purple-600' }
            ].map(({ tier, count, color }) => {
              const TierIcon = getTierIcon(tier as MemberTier);
              return (
                <div key={tier} className={`bg-gradient-to-r ${color} rounded-xl p-4 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm font-medium capitalize">{tier}</p>
                      <p className="text-2xl font-bold">{count}</p>
                    </div>
                    <TierIcon className="h-8 w-8 text-white/30" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search members..."
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
                <option value="platinum">Platinum</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="bronze">Bronze</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-members-primary focus:border-transparent transition-all duration-300"
              >
                <option value="name">Sort by Name</option>
                <option value="points">Sort by Points</option>
                <option value="spent">Sort by Total Spent</option>
                <option value="tier">Sort by Tier</option>
                <option value="joinDate">Sort by Join Date</option>
              </select>
              <button
                onClick={exportMembers}
                className="bg-gradient-to-r from-members-primary to-members-secondary text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Download className="h-5 w-5" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => {
            const TierIcon = getTierIcon(member.tier);
            return (
              <div key={member.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                {/* Header with tier */}
                <div className={`${getTierColor(member.tier)} p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <TierIcon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{member.name}</h3>
                        <p className="text-white/80 text-sm">{member.memberId}</p>
                      </div>
                    </div>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium text-white capitalize">
                      {member.tier}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {member.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {member.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Joined {member.joinDate}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-members-primary/10 rounded-xl">
                      <div className="text-2xl font-bold text-members-primary">{member.points}</div>
                      <div className="text-xs text-gray-600">Points</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-xl">
                      <div className="text-lg font-bold text-green-600">{formatCurrency(member.totalSpent)}</div>
                      <div className="text-xs text-gray-600">Total Spent</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(member)}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(member)}
                      className="flex-1 bg-gradient-to-r from-members-primary to-members-secondary text-white py-2 px-4 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modals */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setFormErrors({ name: '', email: '', phone: '' });
          }}
          title="Add New Member"
          size="large"
        >
          <MemberForm />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedMember(null);
            setFormErrors({ name: '', email: '', phone: '' });
          }}
          title="Edit Member"
          size="large"
        >
          <MemberForm />
        </Modal>

        <Modal
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedMember(null);
          }}
          title="Member Details"
          size="large"
        >
          {selectedMember && (
            <div className="space-y-6">
              <div className={`${getTierColor(selectedMember.tier)} rounded-2xl p-6 text-white`}>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    {React.createElement(getTierIcon(selectedMember.tier), { className: "h-8 w-8 text-white" })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
                    <p className="text-white/80">{selectedMember.memberId}</p>
                    <p className="text-white/80 capitalize">{selectedMember.tier} Member</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <div className="text-lg text-gray-900">{selectedMember.email}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <div className="text-lg text-gray-900">{selectedMember.phone}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Join Date</label>
                    <div className="text-lg text-gray-900">{selectedMember.joinDate}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Loyalty Points</label>
                    <div className="text-3xl font-bold text-members-primary">{selectedMember.points}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Total Spent</label>
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(selectedMember.totalSpent)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>

        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Member"
          message="Are you sure you want to delete this member? This action cannot be undone."
        />
      </div>
    </div>
  );
}