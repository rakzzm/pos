import { useState, useEffect } from 'react';
import { useAuditStore } from '../stores/auditStore';
import { Search, Download, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import * as XLSX from 'xlsx';

export function AuditTrail() {
  const { user } = useAuth();
  const { logs, loading, error, fetchLogs } = useAuditStore();
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    action: '',
    table: '',
    searchTerm: ''
  });

  useEffect(() => {
    fetchLogs({
      startDate: filters.startDate,
      endDate: filters.endDate,
      action: filters.action || undefined,
      table: filters.table || undefined
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.startDate, filters.endDate, filters.action, filters.table]);

  // Only admin can access this page
  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const exportToExcel = () => {
    const exportData = logs.map(log => ({
      'Date & Time': new Date(log.created_at).toLocaleString(),
      'User': log.user?.email || log.user_id,
      'Action': log.action,
      'Table': log.table_name,
      'Record ID': log.record_id,
      'IP Address': log.ip_address,
      'Old Data': JSON.stringify(log.old_data),
      'New Data': JSON.stringify(log.new_data)
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Audit Logs');
    XLSX.writeFile(wb, `audit_logs_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const filteredLogs = logs.filter(log => {
    if (!filters.searchTerm) return true;
    
    const searchTerm = filters.searchTerm.toLowerCase();
    return (
      log.action.toLowerCase().includes(searchTerm) ||
      log.table_name.toLowerCase().includes(searchTerm) ||
      log.record_id.toLowerCase().includes(searchTerm) ||
      log.user?.email?.toLowerCase().includes(searchTerm) ||
      log.ip_address?.toLowerCase().includes(searchTerm)
    );
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatData = (data: any) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-accent mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load audit logs</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => fetchLogs()}
            className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Audit Trail</h1>
        <button
          onClick={exportToExcel}
          className="bg-accent text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-accent/90"
        >
          <Download className="h-5 w-5" />
          Export Logs
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
          <select
            value={filters.action}
            onChange={(e) => setFilters(prev => ({ ...prev, action: e.target.value }))}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
          >
            <option value="">All Actions</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Table</label>
          <select
            value={filters.table}
            onChange={(e) => setFilters(prev => ({ ...prev, table: e.target.value }))}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
          >
            <option value="">All Tables</option>
            <option value="products">Products</option>
            <option value="orders">Orders</option>
            <option value="users">Users</option>
            <option value="members">Members</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search logs..."
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              className="pl-10 pr-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
            />
          </div>
        </div>
      </div>

      {/* Logs Table */}
      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <Loader className="h-8 w-8 text-accent animate-spin" />
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Table
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Record ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Changes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.user?.email || log.user_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        log.action === 'create' ? 'bg-green-100 text-green-800' :
                        log.action === 'update' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.table_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.record_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <details className="cursor-pointer">
                        <summary className="text-accent hover:text-accent/80">View Changes</summary>
                        <div className="mt-2 space-y-2">
                          {log.old_data && (
                            <div>
                              <div className="font-medium text-gray-700">Previous:</div>
                              <pre className="text-xs bg-gray-50 p-2 rounded-md overflow-auto">
                                {formatData(log.old_data)}
                              </pre>
                            </div>
                          )}
                          {log.new_data && (
                            <div>
                              <div className="font-medium text-gray-700">New:</div>
                              <pre className="text-xs bg-gray-50 p-2 rounded-md overflow-auto">
                                {formatData(log.new_data)}
                              </pre>
                            </div>
                          )}
                        </div>
                      </details>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.ip_address}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}