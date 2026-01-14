
import { create } from 'zustand';

type AuditLog = {
  id: string;
  user_id: string;
  action: string;
  table_name: string;
  record_id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  old_data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new_data: any;
  ip_address: string;
  created_at: string;
  user: {
    email: string;
    name: string;
  };
};

type AuditStore = {
  logs: AuditLog[];
  loading: boolean;
  error: string | null;
  fetchLogs: (filters?: {
    startDate?: string;
    endDate?: string;
    action?: string;
    table?: string;
  }) => Promise<void>;
};

export const useAuditStore = create<AuditStore>((set) => ({
  logs: [],
  loading: false,
  error: null,

  fetchLogs: async (filters) => {
    set({ loading: true, error: null });
    try {
      // In a real generic implementation, we would pass query params to API
      // For now, let's fetch all (or recent limited by API) and filter client side
      // or simplistic filtering. The API I created supports fetching recent 100.
      // If we want detailed filtering, we should update API.
      // For this phase, fetching all recent and filtering locally is acceptable prototype behavior.
      
      const response = await fetch('/api/audit');
      if (!response.ok) throw new Error('Failed to fetch audit logs');
      const data = await response.json();
      
      // Map Prisma camelCase to FE snake_case types
      const mappedLogs: AuditLog[] = data.map((log: any) => ({
        id: log.id,
        user_id: log.userId,
        action: log.action,
        table_name: log.tableName,
        record_id: log.recordId,
        old_data: log.oldData,
        new_data: log.newData,
        ip_address: log.ipAddress,
        created_at: log.createdAt,
        user: {
            email: log.user?.email || 'Unknown',
            name: log.user?.name || 'Unknown'
        }
      }));

      let filteredLogs = mappedLogs;

      if (filters?.startDate) {
        filteredLogs = filteredLogs.filter(log => 
          new Date(log.created_at) >= new Date(filters.startDate!)
        );
      }
      if (filters?.endDate) {
        filteredLogs = filteredLogs.filter(log => 
          new Date(log.created_at) <= new Date(filters.endDate!)
        );
      }
      if (filters?.action) {
        filteredLogs = filteredLogs.filter(log => 
          log.action === filters.action
        );
      }
      if (filters?.table) {
        filteredLogs = filteredLogs.filter(log => 
          log.table_name === filters.table
        );
      }

      set({ logs: filteredLogs });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));