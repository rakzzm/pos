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


export type PayrollRecord = {
  id: string;
  staffId: string;
  staffName?: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  payDate: string;
  basicSalary: number;
  bonuses: number;
  deductions: number;
  netSalary: number;
  status: 'pending' | 'processed' | 'paid';
  paymentMethod?: string;
  notes?: string;
};

type StaffStore = {
  staff: StaffMember[];
  leaveRequests: LeaveRequest[];
  payrollRecords: PayrollRecord[];
  loading: boolean;
  error: string | null;
  fetchStaff: () => Promise<void>;
  addStaff: (staff: Omit<StaffMember, 'id' | 'employeeId' | 'status' | 'leaveBalance' | 'performance'>) => Promise<void>;
  updateStaff: (id: string, staff: Partial<StaffMember>) => Promise<void>;
  deleteStaff: (id: string) => Promise<void>;
  updateLeaveRequest: (id: string, updates: Partial<LeaveRequest>) => Promise<void>;
  
  // Payroll Actions
  fetchPayroll: () => Promise<void>;
  runPayroll: (staffId: string, periodStart: string, periodEnd: string, bonuses: number, deductions: number) => Promise<void>;
  markPayrollPaid: (id: string, paymentMethod: string) => Promise<void>;
};

export const useStaffStore = create<StaffStore>((set, get) => ({
  staff: [],
  leaveRequests: [],
  payrollRecords: [],
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

      // Extract leave requests
      const allLeaveRequests: LeaveRequest[] = [];
      data.forEach((s: any) => {
        if (s.leaveRequests && Array.isArray(s.leaveRequests)) {
          s.leaveRequests.forEach((lr: any) => {
             // ... existing mapping logic or improved
             allLeaveRequests.push({
               id: lr.id,
               staffId: s.id,
               staffName: s.name,
               type: lr.type,
               startDate: new Date(lr.startDate).toISOString().split('T')[0],
               endDate: new Date(lr.endDate).toISOString().split('T')[0],
               days: Math.ceil((new Date(lr.endDate).getTime() - new Date(lr.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1,
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
      await get().fetchStaff();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateStaff: async (id, staffData) => {
    set({ loading: true, error: null });
    try {
      // Flatten for API
      const payload: any = { ...staffData };
      if (staffData.leaveBalance) {
         payload.leaveBalance = { ...staffData.leaveBalance };
      }
      const response = await fetch(`/api/staff/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to update staff');
      await get().fetchStaff();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  deleteStaff: async (id) => {
    set({ loading: true, error: null });
    try {
       const response = await fetch(`/api/staff/${id}`, { method: 'DELETE' });
       if (!response.ok) throw new Error('Failed to delete staff');
       set(state => ({ staff: state.staff.filter(m => m.id !== id) }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateLeaveRequest: async (id, updates) => {
     // Existing logic... kept simple
     set({ loading: true });
     try {
       await fetch(`/api/leave-requests/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
        headers: {'Content-Type': 'application/json'}
       });
       await get().fetchStaff();
     } catch (e) {
       console.error(e);
     } finally {
       set({ loading: false });
     }
  },

  fetchPayroll: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/payroll');
      if (!response.ok) throw new Error('Failed to fetch payroll');
      const data = await response.json();
      
      const mappedPayroll = data.map((p: any) => ({
        ...p,
        payPeriodStart: new Date(p.payPeriodStart).toISOString().split('T')[0],
        payPeriodEnd: new Date(p.payPeriodEnd).toISOString().split('T')[0],
        payDate: new Date(p.payDate).toISOString().split('T')[0],
      }));
      
      set({ payrollRecords: mappedPayroll });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  runPayroll: async (staffId, periodStart, periodEnd, bonuses, deductions) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/payroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffId, periodStart, periodEnd, bonuses, deductions }),
      });
      if (!response.ok) throw new Error('Failed to run payroll');
      await get().fetchPayroll();
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  markPayrollPaid: async (id, paymentMethod) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/payroll/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'paid', paymentMethod }),
      });
      if (!response.ok) throw new Error('Failed to update payroll');
      await get().fetchPayroll();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  }
}));