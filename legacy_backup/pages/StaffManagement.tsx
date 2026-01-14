import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Edit, 
  Trash2, 
  Search, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Award,
} from 'lucide-react';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useStaffStore } from '../stores/staffStore';

type StaffMember = {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on-leave';
  avatar?: string;
  leaveBalance: {
    annual: number;
    sick: number;
    personal: number;
  };
  performance: {
    rating: number;
    lastReview: string;
  };
};


export function StaffManagement() {
  const { staff, leaveRequests, fetchStaff, addStaff, updateStaff, deleteStaff, updateLeaveRequest } = useStaffStore();
  const [activeTab, setActiveTab] = useState<'staff' | 'leave'>('staff');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: '',
    hireDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const staffData = {
        ...formData,
        salary: parseFloat(formData.salary)
      };

      if (selectedStaff) {
        await updateStaff(selectedStaff.id, staffData);
        setIsEditModalOpen(false);
      } else {
        await addStaff(staffData);
        setIsAddModalOpen(false);
      }
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        salary: '',
        hireDate: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Failed to save staff:', error);
    }
  };

  const handleEdit = (staffMember: StaffMember) => {
    setSelectedStaff(staffMember);
    setFormData({
      name: staffMember.name,
      email: staffMember.email,
      phone: staffMember.phone,
      position: staffMember.position,
      department: staffMember.department,
      salary: staffMember.salary.toString(),
      hireDate: staffMember.hireDate
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (staffMember: StaffMember) => {
    setSelectedStaff(staffMember);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedStaff) {
      await deleteStaff(selectedStaff.id);
      setIsDeleteDialogOpen(false);
      setSelectedStaff(null);
    }
  };

  const handleLeaveAction = async (requestId: string, action: 'approved' | 'rejected') => {
    await updateLeaveRequest(requestId, { status: action });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const StaffForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-staff-primary focus:border-transparent transition-all duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-staff-primary focus:border-transparent transition-all duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-staff-primary focus:border-transparent transition-all duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-staff-primary focus:border-transparent transition-all duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <select
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-staff-primary focus:border-transparent transition-all duration-300"
            required
          >
            <option value="">Select Department</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Service">Service</option>
            <option value="Management">Management</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Security">Security</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Salary (INR)</label>
          <input
            type="number"
            step="0.01"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-staff-primary focus:border-transparent transition-all duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hire Date</label>
          <input
            type="date"
            value={formData.hireDate}
            onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-staff-primary focus:border-transparent transition-all duration-300"
            required
          />
        </div>
      </div>
      
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
          className="px-6 py-3 bg-gradient-to-r from-staff-primary to-staff-secondary text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium"
        >
          {selectedStaff ? 'Update Staff' : 'Add Staff'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-staff-bg via-staff-bg/30 to-staff-bg/80 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-staff-primary/20 to-staff-secondary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-staff-accent/20 to-staff-primary/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-staff-primary/10 to-staff-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-shimmer-gradient bg-[length:200%_100%] rounded-full animate-shimmer opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-radial-shine rounded-full animate-glow"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-staff-primary to-staff-secondary bg-clip-text text-transparent mb-2">
            Staff Management
          </h1>
          <p className="text-gray-600">Manage your restaurant staff and leave requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-staff-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-3xl font-bold text-staff-primary">{staff.length}</p>
              </div>
              <Users className="h-12 w-12 text-staff-primary/30" />
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Staff</p>
                <p className="text-3xl font-bold text-green-600">
                  {staff.filter(s => s.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-300" />
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On Leave</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {staff.filter(s => s.status === 'on-leave').length}
                </p>
              </div>
              <Calendar className="h-12 w-12 text-yellow-300" />
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                <p className="text-3xl font-bold text-blue-600">
                  {leaveRequests.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-12 w-12 text-blue-300" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('staff')}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'staff'
                ? 'bg-gradient-to-r from-staff-primary to-staff-secondary text-white shadow-glow transform scale-105'
                : 'bg-white/80 text-gray-700 hover:bg-white hover:scale-105 shadow-lg'
            }`}
          >
            <Users className="w-5 h-5 mr-2" />
            Staff Members
          </button>
          <button
            onClick={() => setActiveTab('leave')}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'leave'
                ? 'bg-gradient-to-r from-staff-primary to-staff-secondary text-white shadow-glow transform scale-105'
                : 'bg-white/80 text-gray-700 hover:bg-white hover:scale-105 shadow-lg'
            }`}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Leave Management
          </button>
        </div>

        {activeTab === 'staff' && (
          <>
            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl w-full focus:ring-2 focus:ring-staff-primary focus:border-transparent transition-all duration-300"
                />
              </div>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-staff-primary focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Departments</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Service">Service</option>
                <option value="Management">Management</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Security">Security</option>
              </select>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-gradient-to-r from-staff-primary to-staff-secondary text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-300 font-medium shadow-lg"
              >
                <UserPlus className="h-5 w-5" />
                Add Staff
              </button>
            </div>

            {/* Staff Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStaff.map((staffMember) => (
                <div key={staffMember.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-staff-primary/20 hover:scale-105 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-staff-primary to-staff-secondary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {staffMember.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{staffMember.name}</h3>
                        <p className="text-sm text-gray-600">{staffMember.employeeId}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(staffMember.status)}`}>
                      {staffMember.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm"><span className="font-medium">Position:</span> {staffMember.position}</p>
                    <p className="text-sm"><span className="font-medium">Department:</span> {staffMember.department}</p>
                    <p className="text-sm"><span className="font-medium">Email:</span> {staffMember.email}</p>
                    <p className="text-sm"><span className="font-medium">Salary:</span> ₹{staffMember.salary.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="w-4 h-4 mr-1" />
                      Rating: {staffMember.performance.rating}/5
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(staffMember)}
                        className="p-2 text-staff-primary hover:bg-staff-primary/10 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(staffMember)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'leave' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-staff-primary/20 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Leave Requests</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaveRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{request.staffName}</div>
                        <div className="text-sm text-gray-500">Applied: {request.appliedDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {request.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{request.startDate} to {request.endDate}</div>
                        <div className="text-xs text-gray-500">{request.days} days</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {request.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                          {request.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleLeaveAction(request.id, 'approved')}
                              className="text-green-600 hover:text-green-900 flex items-center"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleLeaveAction(request.id, 'rejected')}
                              className="text-red-600 hover:text-red-900 flex items-center"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modals */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Staff Member"
          size="large"
        >
          <StaffForm />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Staff Member"
          size="large"
        >
          <StaffForm />
        </Modal>

        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Staff Member"
          message="Are you sure you want to delete this staff member? This action cannot be undone."
        />
      </div>
    </div>
  );
}