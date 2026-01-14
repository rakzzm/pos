import { create } from 'zustand';

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

type LeaveRequest = {
  id: string;
  staffId: string;
  staffName: string;
  type: 'annual' | 'sick' | 'personal' | 'emergency';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
};

type StaffStore = {
  staff: StaffMember[];
  leaveRequests: LeaveRequest[];
  loading: boolean;
  error: string | null;
  fetchStaff: () => Promise<void>;
  addStaff: (staff: Omit<StaffMember, 'id' | 'employeeId' | 'status' | 'leaveBalance' | 'performance'>) => Promise<void>;
  updateStaff: (id: string, staff: Partial<StaffMember>) => Promise<void>;
  deleteStaff: (id: string) => Promise<void>;
  updateLeaveRequest: (id: string, updates: Partial<LeaveRequest>) => Promise<void>;
};

export const useStaffStore = create<StaffStore>((set, get) => ({
  staff: [],
  leaveRequests: [],
  loading: false,
  error: null,

  fetchStaff: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/staff');
      if (!response.ok) throw new Error('Failed to fetch staff');
      const data = await response.json();
      
      const mappedStaff: StaffMember[] = data.map((s: any) => ({
        id: s.id,
        employeeId: s.employeeId,
        name: s.name,
        email: s.email,
        phone: s.phone,
        position: s.position,
        department: s.department,
        hireDate: new Date(s.hireDate).toISOString().split('T')[0],
        salary: s.salary,
        status: s.status,
        leaveBalance: {
          annual: s.leaveBalanceAnnual,
          sick: s.leaveBalanceSick,
          personal: s.leaveBalancePersonal
        },
        performance: {
          rating: s.performanceRating,
          lastReview: s.lastReview ? new Date(s.lastReview).toISOString().split('T')[0] : ''
        }
      }));

      // Extract leave requests from all staff
      const allLeaveRequests: LeaveRequest[] = [];
      data.forEach((s: any) => {
        if (s.leaveRequests && Array.isArray(s.leaveRequests)) {
          s.leaveRequests.forEach((lr: any) => {
            const start = new Date(lr.startDate);
            const end = new Date(lr.endDate);
            const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
            
            allLeaveRequests.push({
              id: lr.id,
              staffId: s.id,
              staffName: s.name,
              type: lr.type,
              startDate: start.toISOString().split('T')[0],
              endDate: end.toISOString().split('T')[0],
              days: days,
              reason: lr.reason,
              status: lr.status,
              appliedDate: new Date(lr.appliedDate).toISOString().split('T')[0]
            });
          });
        }
      });

      set({ staff: mappedStaff, leaveRequests: allLeaveRequests });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  addStaff: async (staffData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staffData),
      });

      if (!response.ok) throw new Error('Failed to create staff');
      const newStaff = await response.json();
      
      const mappedStaff: StaffMember = {
        id: newStaff.id,
        employeeId: newStaff.employeeId,
        name: newStaff.name,
        email: newStaff.email,
        phone: newStaff.phone,
        position: newStaff.position,
        department: newStaff.department,
        hireDate: new Date(newStaff.hireDate).toISOString().split('T')[0],
        salary: newStaff.salary,
        status: newStaff.status as any,
        leaveBalance: {
          annual: newStaff.leaveBalanceAnnual,
          sick: newStaff.leaveBalanceSick,
          personal: newStaff.leaveBalancePersonal
        },
        performance: {
          rating: newStaff.performanceRating,
          lastReview: newStaff.lastReview ? new Date(newStaff.lastReview).toISOString().split('T')[0] : ''
        }
      };

      set(state => ({
        staff: [...state.staff, mappedStaff]
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateStaff: async (id, staffData) => {
    set({ loading: true, error: null });
    try {
      // We need to flatten the structure back for the API
      const payload: any = { ...staffData };
      if (staffData.leaveBalance) {
        payload.leaveBalance = {
            annual: staffData.leaveBalance.annual,
            sick: staffData.leaveBalance.sick,
            personal: staffData.leaveBalance.personal
        };
      }
      
      const response = await fetch(`/api/staff/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to update staff');
      
      // Refresh list to get clean state or map manually. Refetching is safer for complex state.
      await useStaffStore.getState().fetchStaff();
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteStaff: async (id) => {
    set({ loading: true, error: null });
    try {
       const response = await fetch(`/api/staff/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete staff');
      
      set(state => ({
        staff: state.staff.filter(member => member.id !== id)
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateLeaveRequest: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/leave-requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error('Failed to update leave request');
      
      const updatedRequest = await response.json();
      
      // If approved, status might change for staff, so best to refetch everything
      if (updates.status === 'approved') {
         await useStaffStore.getState().fetchStaff();
      } else {
         // Optimistic update for others
         set(state => ({
            leaveRequests: state.leaveRequests.map(req => 
                req.id === id ? { ...req, ...updates } : req
            )
         }));
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));