"use client";

import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle, XCircle, User, TrendingUp, Download } from 'lucide-react';
import { useAttendanceStore } from '../../../stores/attendanceStore';

export default function AttendancePage() {
  const { attendanceRecords, loading, fetchAttendance } = useAttendanceStore();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'today' | 'week' | 'month'>('today');

  useEffect(() => {
    fetchAttendance(selectedDate);
  }, [fetchAttendance, selectedDate]);

  const todayAttendance = attendanceRecords.filter(
    (record) => record.date.startsWith(selectedDate)
  );

  const stats = {
    present: todayAttendance.filter((r) => r.status === 'present').length,
    absent: todayAttendance.filter((r) => r.status === 'absent').length,
    late: todayAttendance.filter((r) => r.status === 'late').length,
    halfDay: todayAttendance.filter((r) => r.status === 'half-day').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'absent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'late':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'half_day':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4" />;
      case 'absent':
        return <XCircle className="h-4 w-4" />;
      case 'late':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <Clock className="h-10 w-10 text-teal-600" />
          Attendance Management
        </h1>
        <p className="text-gray-600">Track and manage staff attendance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Present</p>
              <p className="text-3xl font-bold">{stats.present}</p>
            </div>
            <CheckCircle className="h-12 w-12 text-white/30" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Absent</p>
              <p className="text-3xl font-bold">{stats.absent}</p>
            </div>
            <XCircle className="h-12 w-12 text-white/30" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-600 to-amber-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Late</p>
              <p className="text-3xl font-bold">{stats.late}</p>
            </div>
            <Clock className="h-12 w-12 text-white/30" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Half Day</p>
              <p className="text-3xl font-bold">{stats.halfDay}</p>
            </div>
            <TrendingUp className="h-12 w-12 text-white/30" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('today')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'today'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'week'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'month'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              This Month
            </button>
          </div>
          <div className="flex gap-4 flex-1 justify-end">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
            />
            <button className="bg-teal-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700 transition-colors">
              <Download className="h-5 w-5" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-gray-600">Loading attendance...</div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-teal-600" />
              Attendance for {new Date(selectedDate).toLocaleDateString()}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-teal-600/10 to-cyan-600/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Hours Worked</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {todayAttendance.map((record) => (
                  <tr key={record.id} className="hover:bg-teal-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center text-white">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">{record.staffName || 'Unknown'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.punchIn || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.punchOut || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-teal-600">
                        {record.totalHours ? `${record.totalHours.toFixed(1)}h` : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex items-center gap-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          record.status
                        )}`}
                      >
                        {getStatusIcon(record.status)}
                        {record.status.replace('_', ' ').charAt(0).toUpperCase() +
                          record.status.replace('_', ' ').slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">{record.notes || '-'}</div>
                    </td>
                  </tr>
                ))}
                {todayAttendance.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No attendance records for this date
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
