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

export type AttendanceRecord = {
  id: string;
  staffId: string;
  staffName?: string;
  date: string;
  punchIn?: string;
  punchOut?: string;
  totalHours: number;
  status: string;
  notes?: string;
};

type StaffStore = {
  staff: StaffMember[];
  leaveRequests: LeaveRequest[];
  payrollRecords: PayrollRecord[];
  attendanceRecords: AttendanceRecord[];
  loading: boolean;
  error: string | null;
  fetchStaff: () => Promise<void>;
  addStaff: (staff: Omit<StaffMember, 'id' | 'employeeId' | 'status' | 'leaveBalance' | 'performance'>) => Promise<void>;
  updateStaff: (id: string, staff: Partial<StaffMember>) => Promise<void>;
  deleteStaff: (id: string) => Promise<void>;
  // Leave Actions
  requestLeave: (request: Omit<LeaveRequest, 'id' | 'staffName' | 'status' | 'appliedDate'>) => Promise<void>;
  updateLeaveRequest: (id: string, updates: Partial<LeaveRequest>) => Promise<void>;
  
  // Payroll Actions
  fetchPayroll: () => Promise<void>;
  runPayroll: (staffId: string, periodStart: string, periodEnd: string, bonuses: number, deductions: number) => Promise<void>;
  markPayrollPaid: (id: string, paymentMethod: string) => Promise<void>;

  // Attendance Actions
  fetchAttendance: (month?: string) => Promise<void>;
  clockIn: (staffId: string) => Promise<void>;
  clockOut: (id: string, time: string, totalHours: number) => Promise<void>;
  addAttendance: (record: any) => Promise<void>; // Manual add
  updateAttendance: (id: string, record: any) => Promise<void>;
  deleteAttendance: (id: string) => Promise<void>;
};

export const useStaffStore = create<StaffStore>((set, get) => ({
  staff: [],
  leaveRequests: [],
  payrollRecords: [],
  attendanceRecords: [],
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

  requestLeave: async (request) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/leave-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) throw new Error('Failed to submit leave request');
      await get().fetchStaff(); // Refresh to show new request
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
  },

  fetchAttendance: async (month) => {
    set({ loading: true, error: null });
    try {
      let url = '/api/attendance';
      if (month) url += `?month=${month}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch attendance');
      const data = await response.json();
      
      const mapped = data.map((r: any) => ({
          ...r,
          date: new Date(r.date).toISOString().split('T')[0],
          staffName: r.staff?.name
      }));
      
      set({ attendanceRecords: mapped });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  clockIn: async (staffId) => {
    set({ loading: true, error: null });
    try {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const response = await fetch('/api/attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'clock-in', staffId, time })
      });
      
      if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || 'Failed to clock in');
      }
      await get().fetchAttendance();
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  clockOut: async (id, time, totalHours) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/attendance/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'clock-out', time, totalHours })
      });
      if (!response.ok) throw new Error('Failed to clock out');
      await get().fetchAttendance();
    } catch (error) {
       set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  addAttendance: async (record) => {
     set({ loading: true });
     try {
         const response = await fetch('/api/attendance', {
             method: 'POST',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({ action: 'manual', ...record })
         });
         if(!response.ok) throw new Error('Failed to add record');
         await get().fetchAttendance();
     } catch (error) {
         set({error: (error as Error).message});
     } finally {
         set({loading: false});
     }
  },

  updateAttendance: async (id, record) => {
      set({ loading: true });
      try {
          const response = await fetch(`/api/attendance/${id}`, {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(record)
          });
          if(!response.ok) throw new Error('Failed to update record');
          await get().fetchAttendance();
      } catch (error) {
          set({error: (error as Error).message});
      } finally {
          set({loading: false});
      }
  },

  deleteAttendance: async (id) => {
      set({ loading: true });
      try {
          const response = await fetch(`/api/attendance/${id}`, { method: 'DELETE' });
          if(!response.ok) throw new Error('Failed to delete record');
          set(state => ({ attendanceRecords: state.attendanceRecords.filter(r => r.id !== id) }));
      } catch (error) {
          set({error: (error as Error).message});
      } finally {
          set({loading: false});
      }
  }
}));