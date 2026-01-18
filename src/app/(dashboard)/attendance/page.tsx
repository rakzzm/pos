"use client";

import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, Trash2, Edit } from 'lucide-react';
import { useStaffStore, AttendanceRecord } from '../../../stores/staffStore';

export default function AttendancePage() {
  const { staff, attendanceRecords, fetchAttendance, clockIn, clockOut, deleteAttendance, addAttendance, updateAttendance, fetchStaff, leaveRequests, requestLeave, updateLeaveRequest } = useStaffStore();
  const [activeTab, setActiveTab] = useState<'today' | 'history' | 'leaves'>('today');
  const [loading, setLoading] = useState(false);
  const [selectedStaffForClockIn, setSelectedStaffForClockIn] = useState('');
  
  // For filtering history
  const [filterMonth, setFilterMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [filterStaff, setFilterStaff] = useState('all');

  // For manual Edit/Add (Admin)
  const [isEditMode, setIsEditMode] = useState(false);
  const [editRecord, setEditRecord] = useState<Partial<AttendanceRecord>>({});

  // For Leave Management
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
      staffId: '',
      type: 'annual' as const,
      startDate: '',
      endDate: '',
      reason: ''
  });

  useEffect(() => {
    fetchStaff(); // Fetches staff and leave requests
    fetchAttendance();
  }, []);
  
  // Refresh when month changes
  useEffect(() => {
      if(activeTab === 'history') {
          fetchAttendance(filterMonth);
      }
  }, [filterMonth, activeTab]);

  const handleClockIn = async () => {
      if (!selectedStaffForClockIn) return;
      setLoading(true);
      try {
          await clockIn(selectedStaffForClockIn);
          setSelectedStaffForClockIn('');
      } catch (e) {
          alert((e as Error).message);
      } finally {
          setLoading(false);
      }
  };

  const handleClockOut = async (record: AttendanceRecord) => {
      setLoading(true);
      try {
          const now = new Date();
          const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          let duration = record.punchIn ? 0 : 8; 
          await clockOut(record.id, time, duration);
      } catch (e) {
           alert('Failed to clock out');
      } finally {
          setLoading(false);
      }
  };
  
  const handleSaveEdit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editRecord.staffId) return;
      
      setLoading(true);
      try {
          if (editRecord.id) {
              await updateAttendance(editRecord.id, editRecord);
          } else {
              await addAttendance(editRecord);
          }
          setIsEditMode(false);
          setEditRecord({});
      } catch (e) {
          alert('Failed to save record');
      } finally {
          setLoading(false);
      }
  };

  const handleRequestLeave = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!leaveForm.staffId || !leaveForm.startDate || !leaveForm.endDate) return;
      
      setLoading(true);
      try {
          // Calculate days
          const start = new Date(leaveForm.startDate);
          const end = new Date(leaveForm.endDate);
          const diffTime = Math.abs(end.getTime() - start.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 

          await requestLeave({
              staffId: leaveForm.staffId,
              type: leaveForm.type,
              startDate: leaveForm.startDate,
              endDate: leaveForm.endDate,
              days: diffDays,
              reason: leaveForm.reason
          });
          setIsLeaveModalOpen(false);
          setLeaveForm({ staffId: '', type: 'annual', startDate: '', endDate: '', reason: '' });
      } catch (e) {
          alert('Failed to request leave');
      } finally {
          setLoading(false);
      }
  };

  const handleLeaveAction = async (id: string, status: 'approved' | 'rejected') => {
      if(confirm(`Are you sure you want to ${status} this request?`)) {
          await updateLeaveRequest(id, { status });
      }
  };

  // Get today's records
  const today = new Date().toISOString().split('T')[0];
  const todaysRecords = attendanceRecords.filter(r => r.date.startsWith(today));
  
  // Filtered History
  const historyRecords = attendanceRecords.filter(r => {
      return (filterStaff === 'all' || r.staffId === filterStaff);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance & Leaves</h1>
          <p className="text-gray-500 text-sm">Track daily attendance, manage records, and approve leaves.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 flex gap-1 w-full max-w-md">
        <button 
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'today' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('today')}
        >
            Today's Overview
        </button>
        <button 
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'history' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('history')}
        >
            History
        </button>
        <button 
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'leaves' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('leaves')}
        >
            Leave Management
        </button>
      </div>

      <div className="flex-1">
         {activeTab === 'today' && (
             <div className="space-y-6">
                 {/* Clock In Section */}
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                     <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-500" />
                        Quick Clock In
                     </h3>
                     <div className="flex flex-col md:flex-row gap-4 items-end">
                         <div className="flex-1 w-full">
                             <label className="block text-sm font-medium text-gray-700 mb-1">Select Staff Member</label>
                             <select 
                                 className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                 value={selectedStaffForClockIn}
                                 onChange={e => setSelectedStaffForClockIn(e.target.value)}
                             >
                                 <option value="">Choose staff...</option>
                                 {staff.filter(s => s.status === 'active' && !todaysRecords.some(r => r.staffId === s.id && !r.punchOut)).map(s => (
                                     <option key={s.id} value={s.id}>{s.name} ({s.position})</option>
                                 ))}
                             </select>
                         </div>
                         <button 
                             onClick={handleClockIn}
                             disabled={!selectedStaffForClockIn || loading}
                             className="w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition shadow"
                         >
                             {loading ? 'Processing...' : 'Clock In Now'}
                         </button>
                     </div>
                 </div>

                 {/* Today's List */}
                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                     <div className="p-4 border-b border-gray-100 font-semibold text-gray-700 flex justify-between items-center bg-gray-50/50">
                        <span>Today's Activity ({today})</span>
                        <span className="text-xs font-normal text-gray-500">Live Updates</span>
                     </div>
                     <table className="w-full text-sm text-left">
                         <thead className="bg-gray-50 text-gray-500 font-medium">
                             <tr>
                                 <th className="p-4">Staff Name</th>
                                 <th className="p-4">Punch In</th>
                                 <th className="p-4">Punch Out</th>
                                 <th className="p-4">Status</th>
                                 <th className="p-4 text-right">Action</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-100">
                             {todaysRecords.length === 0 ? (
                                 <tr><td colSpan={5} className="p-8 text-center text-gray-500">No active attendance records for today yet.</td></tr>
                             ) : (
                                 todaysRecords.map(record => (
                                     <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                                         <td className="p-4 font-medium text-gray-900">{record.staffName || 'Unknown'}</td>
                                         <td className="p-4 font-mono text-gray-600">{record.punchIn}</td>
                                         <td className="p-4 font-mono text-gray-500">{record.punchOut || '-'}</td>
                                         <td className="p-4">
                                             {record.punchOut ? (
                                                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    <CheckCircle className="w-3 h-3 mr-1"/> Completed
                                                 </span>
                                             ) : (
                                                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 animate-pulse">
                                                    <Clock className="w-3 h-3 mr-1"/> Active
                                                 </span>
                                             )}
                                         </td>
                                         <td className="p-4 text-right">
                                             {!record.punchOut && (
                                                 <button 
                                                     onClick={() => handleClockOut(record)}
                                                     disabled={loading}
                                                     className="text-xs bg-white text-amber-700 border border-amber-200 px-3 py-1.5 rounded-lg hover:bg-amber-50 font-medium transition-colors shadow-sm"
                                                 >
                                                     Clock Out
                                                 </button>
                                             )}
                                         </td>
                                     </tr>
                                 ))
                             )}
                         </tbody>
                     </table>
                 </div>
             </div>
         )}
         
         {activeTab === 'leaves' && (
             <div className="space-y-6">
                 <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800">Approval Queue</h3>
                    <button 
                        onClick={() => setIsLeaveModalOpen(true)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                    >
                        + Request Leave
                    </button>
                 </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                     <table className="w-full text-sm text-left">
                         <thead className="bg-gray-50 text-gray-500 font-medium">
                             <tr>
                                 <th className="p-4">Staff</th>
                                 <th className="p-4">Type</th>
                                 <th className="p-4">Duration</th>
                                 <th className="p-4">Reason</th>
                                 <th className="p-4">Status</th>
                                 <th className="p-4 text-center">Action</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-100">
                             {leaveRequests.length === 0 ? (
                                 <tr><td colSpan={6} className="p-8 text-center text-gray-500">No leave requests.</td></tr>
                             ) : (
                                 leaveRequests.map(req => (
                                     <tr key={req.id} className="hover:bg-gray-50">
                                         <td className="p-4 font-medium">{req.staffName}</td>
                                         <td className="p-4 capitalize">{req.type}</td>
                                         <td className="p-4">
                                            <div className="text-xs text-gray-500">{req.startDate} to {req.endDate}</div>
                                            <div className="font-semibold text-gray-700">{req.days} days</div>
                                         </td>
                                         <td className="p-4 text-gray-600 max-w-xs truncate" title={req.reason}>{req.reason}</td>
                                         <td className="p-4">
                                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                 req.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                 req.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                 'bg-yellow-100 text-yellow-700'
                                             }`}>
                                                 {req.status}
                                             </span>
                                         </td>
                                         <td className="p-4 text-center">
                                             {req.status === 'pending' && (
                                                <div className="flex justify-center gap-2">
                                                    <button 
                                                        onClick={() => handleLeaveAction(req.id, 'approved')}
                                                        className="text-green-600 hover:bg-green-50 px-2 py-1 rounded text-xs border border-green-200"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button 
                                                        onClick={() => handleLeaveAction(req.id, 'rejected')}
                                                        className="text-red-600 hover:bg-red-50 px-2 py-1 rounded text-xs border border-red-200"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                             )}
                                         </td>
                                     </tr>
                                 ))
                             )}
                         </tbody>
                     </table>
                  </div>
             </div>
         )}

         {activeTab === 'history' && (
             <div className="space-y-4">
                 {/* Filters */}
                 <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                     <div className="w-full md:w-auto">
                         <label className="block text-xs font-medium text-gray-500 mb-1">Month</label>
                         <input 
                             type="month" 
                             className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                             value={filterMonth}
                             onChange={e => setFilterMonth(e.target.value)} 
                         />
                     </div>
                     <div className="w-full md:w-auto">
                         <label className="block text-xs font-medium text-gray-500 mb-1">Staff Filter</label>
                         <select 
                             className="w-full p-2 border border-gray-200 rounded-lg text-sm md:w-48"
                             value={filterStaff}
                             onChange={e => setFilterStaff(e.target.value)}
                         >
                             <option value="all">All Staff</option>
                             {staff.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                         </select>
                     </div>
                     <div className="ml-auto w-full md:w-auto">
                          <button 
                              onClick={() => {
                                  setIsEditMode(true);
                                  setEditRecord({ date: new Date().toISOString().split('T')[0] });
                              }}
                              className="w-full md:w-auto px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
                          >
                              + Add Manual Record
                          </button>
                     </div>
                 </div>

                 {/* History Table */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                     <table className="w-full text-sm text-left">
                         <thead className="bg-gray-50 text-gray-500 font-medium">
                             <tr>
                                 <th className="p-4">Date</th>
                                 <th className="p-4">Staff</th>
                                 <th className="p-4">In / Out</th>
                                 <th className="p-4">Total Hrs</th>
                                 <th className="p-4">Status</th>
                                 <th className="p-4 text-center">Actions</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-100">
                             {historyRecords.length === 0 ? (
                                 <tr><td colSpan={6} className="p-8 text-center text-gray-500">No records found for this period.</td></tr>
                             ) : (
                                 historyRecords.map(record => (
                                     <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                                         <td className="p-4">{record.date}</td>
                                         <td className="p-4 font-medium text-gray-900">{record.staffName}</td>
                                         <td className="p-4 text-gray-600 font-mono text-xs">
                                             {record.punchIn} — {record.punchOut || '...'}
                                         </td>
                                         <td className="p-4 font-bold text-gray-800">{record.totalHours.toFixed(2)}</td>
                                         <td className="p-4">
                                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.status === 'present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                 {record.status}
                                             </span>
                                         </td>
                                         <td className="p-4 text-center">
                                             <div className="flex justify-center gap-2">
                                                 <button 
                                                     onClick={() => {
                                                         setEditRecord(record);
                                                         setIsEditMode(true);
                                                     }}
                                                     className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                  >
                                                     <Edit className="w-4 h-4" />
                                                 </button>
                                                 <button 
                                                      onClick={() => {
                                                          if(confirm('Delete this record?')) deleteAttendance(record.id);
                                                      }}
                                                     className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                  >
                                                     <Trash2 className="w-4 h-4" />
                                                 </button>
                                             </div>
                                         </td>
                                     </tr>
                                 ))
                             )}
                         </tbody>
                     </table>
                 </div>
             </div>
         )}
      </div>

      {/* Edit Modal Overlay */}
      {isEditMode && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">{editRecord.id ? 'Edit Attendance' : 'Add Attendance'}</h3>
                  </div>
                  <form onSubmit={handleSaveEdit} className="space-y-4">
                      <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Staff Member</label>
                          <select 
                              className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={editRecord.staffId || ''}
                              onChange={e => setEditRecord({...editRecord, staffId: e.target.value})}
                              required
                          >
                              <option value="">Select Staff</option>
                              {staff.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                          <input 
                              type="date"
                              className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={editRecord.date || ''}
                              onChange={e => setEditRecord({...editRecord, date: e.target.value})}
                              required
                          />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">Punch In</label>
                              <input 
                                  type="time"
                                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                  value={editRecord.punchIn || ''}
                                  onChange={e => setEditRecord({...editRecord, punchIn: e.target.value})}
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">Punch Out</label>
                              <input 
                                  type="time"
                                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                  value={editRecord.punchOut || ''}
                                  onChange={e => setEditRecord({...editRecord, punchOut: e.target.value})}
                              />
                          </div>
                      </div>
                       <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Total Hours</label>
                          <input 
                              type="number"
                              step="0.1"
                              className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={editRecord.totalHours || 0}
                              onChange={e => setEditRecord({...editRecord, totalHours: parseFloat(e.target.value)})}
                          />
                      </div>
                      
                      <div className="flex gap-3 mt-8">
                          <button 
                              type="button"
                              onClick={() => setIsEditMode(false)}
                              className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium transition-colors"
                          >
                              Cancel
                          </button>
                          <button 
                              type="submit"
                              className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors shadow-lg"
                          >
                              Save Record
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
      
       {/* Leave Modal */}
      {isLeaveModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Request Leave</h3>
                  <form onSubmit={handleRequestLeave} className="space-y-4">
                       <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Staff Member</label>
                          <select 
                              className="w-full p-2.5 border border-gray-200 rounded-lg"
                              value={leaveForm.staffId}
                              onChange={e => setLeaveForm({...leaveForm, staffId: e.target.value})}
                              required
                          >
                              <option value="">Select You...</option>
                              {staff.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Leave Type</label>
                          <select 
                              className="w-full p-2.5 border border-gray-200 rounded-lg"
                              value={leaveForm.type}
                              onChange={e => setLeaveForm({...leaveForm, type: e.target.value as any})}
                          >
                              <option value="annual">Annual Leave</option>
                              <option value="sick">Sick Leave</option>
                              <option value="personal">Personal Leave</option>
                              <option value="emergency">Emergency</option>
                          </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">Start Date</label>
                              <input 
                                  type="date"
                                  className="w-full p-2.5 border border-gray-200 rounded-lg"
                                  value={leaveForm.startDate}
                                  onChange={e => setLeaveForm({...leaveForm, startDate: e.target.value})}
                                  required
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">End Date</label>
                              <input 
                                  type="date"
                                  className="w-full p-2.5 border border-gray-200 rounded-lg"
                                  value={leaveForm.endDate}
                                  onChange={e => setLeaveForm({...leaveForm, endDate: e.target.value})}
                                  required
                              />
                          </div>
                      </div>
                      <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Reason</label>
                          <textarea 
                              className="w-full p-2.5 border border-gray-200 rounded-lg"
                              rows={3}
                              value={leaveForm.reason}
                              onChange={e => setLeaveForm({...leaveForm, reason: e.target.value})}
                              placeholder="Why are you taking leave?"
                          />
                      </div>
                      
                      <div className="flex gap-3 mt-6">
                           <button 
                              type="button"
                              onClick={() => setIsLeaveModalOpen(false)}
                              className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
                          >
                              Cancel
                          </button>
                          <button 
                              type="submit"
                              className="flex-1 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
                          >
                              Submit Request
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
}
