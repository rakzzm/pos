import React, { useState, useEffect } from 'react';
import { X, DollarSign, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useStaffStore } from '../stores/staffStore';

interface PayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PayrollModal({ isOpen, onClose }: PayrollModalProps) {
  const { staff, payrollRecords, fetchPayroll, runPayroll, markPayrollPaid } = useStaffStore();
  const [activeTab, setActiveTab] = useState<'run' | 'history'>('run');
  const [loading, setLoading] = useState(false);

  // Run Payroll State
  const [selectedStaff, setSelectedStaff] = useState('');
  const [periodStart, setPeriodStart] = useState('');
  const [periodEnd, setPeriodEnd] = useState('');
  const [bonuses, setBonuses] = useState(0);
  const [deductions, setDeductions] = useState(0);

  useEffect(() => {
    if (isOpen) {
      fetchPayroll();
      // Default dates to current month
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
      setPeriodStart(firstDay);
      setPeriodEnd(lastDay);
    }
  }, [isOpen, fetchPayroll]);

  const handleRunPayroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaff) return;
    
    setLoading(true);
    try {
      await runPayroll(selectedStaff, periodStart, periodEnd, bonuses, deductions);
      setSelectedStaff('');
      setBonuses(0);
      setDeductions(0);
      setActiveTab('history'); // Switch to history to see new record
    } catch (error) {
      console.error('Payroll failed:', error);
      alert('Failed to run payroll');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPaid = async (id: string) => {
      if (confirm('Mark this payroll as PAID?')) {
          await markPayrollPaid(id, 'Bank Transfer');
      }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col h-[80vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-green-600" />
                Payroll Management
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
            </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
            <button 
                className={`flex-1 py-3 text-sm font-medium ${activeTab === 'run' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('run')}
            >
                Process New Payroll
            </button>
            <button 
                className={`flex-1 py-3 text-sm font-medium ${activeTab === 'history' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('history')}
            >
                Payroll History
            </button>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-gray-50">
            {activeTab === 'run' ? (
                <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">Run Payroll for Staff</h3>
                    <form onSubmit={handleRunPayroll} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Staff Member</label>
                            <select 
                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                                value={selectedStaff}
                                onChange={e => setSelectedStaff(e.target.value)}
                                required
                            >
                                <option value="">Select a staff member...</option>
                                {staff.filter(s => s.status === 'active').map(s => (
                                    <option key={s.id} value={s.id}>{s.name} - {s.position} (Salary: ₹{s.salary})</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Period Start</label>
                                <input 
                                    type="date" 
                                    required
                                    className="w-full p-2.5 border border-gray-200 rounded-lg"
                                    value={periodStart}
                                    onChange={e => setPeriodStart(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Period End</label>
                                <input 
                                    type="date" 
                                    required
                                    className="w-full p-2.5 border border-gray-200 rounded-lg"
                                    value={periodEnd}
                                    onChange={e => setPeriodEnd(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bonuses</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                                    <input 
                                        type="number" 
                                        min="0"
                                        className="w-full pl-7 p-2.5 border border-gray-200 rounded-lg"
                                        value={bonuses}
                                        onChange={e => setBonuses(parseFloat(e.target.value))}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Deductions</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                                    <input 
                                        type="number" 
                                        min="0"
                                        className="w-full pl-7 p-2.5 border border-gray-200 rounded-lg"
                                        value={deductions}
                                        onChange={e => setDeductions(parseFloat(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Process Payment'}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                            <tr>
                                <th className="p-4">Date</th>
                                <th className="p-4">Staff Name</th>
                                <th className="p-4">Period</th>
                                <th className="p-4 text-right">Net Salary</th>
                                <th className="p-4 text-center">Status</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                             {payrollRecords.length === 0 ? (
                                <tr><td colSpan={6} className="p-8 text-center text-gray-500">No payroll records found</td></tr>
                             ) : (
                                 payrollRecords.map(record => (
                                     <tr key={record.id} className="hover:bg-gray-50">
                                         <td className="p-4">{record.payDate}</td>
                                         <td className="p-4 font-medium">{record.staffName}</td>
                                         <td className="p-4 text-gray-500 text-xs">
                                             {record.payPeriodStart} to {record.payPeriodEnd}
                                         </td>
                                         <td className="p-4 text-right font-bold">₹{record.netSalary.toLocaleString()}</td>
                                         <td className="p-4 text-center">
                                             <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                 record.status === 'paid' ? 'bg-green-100 text-green-700' : 
                                                 record.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                                             }`}>
                                                 {record.status.toUpperCase()}
                                             </span>
                                         </td>
                                         <td className="p-4 text-center">
                                             {record.status === 'pending' && (
                                                 <button 
                                                    onClick={() => handleMarkPaid(record.id)}
                                                    className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-lg border border-green-200 hover:bg-green-100"
                                                 >
                                                     Mark Paid
                                                 </button>
                                             )}
                                         </td>
                                     </tr>
                                 ))
                             )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
