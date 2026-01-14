import { useState, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Download,
  Search,
  MapPin
} from 'lucide-react';
import { useAttendanceStore } from '../stores/attendanceStore';
import * as XLSX from 'xlsx';



export function Attendance() {
  const { 
    attendanceRecords, 
    fetchAttendance, 
    punchIn, 
    punchOut
  } = useAttendanceStore();
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showPunchModal, setShowPunchModal] = useState(false);
  const [punchType, setPunchType] = useState<'in' | 'out'>('in');
  const [currentLocation, setCurrentLocation] = useState<string>('');

  useEffect(() => {
    fetchAttendance(selectedDate);
    getCurrentLocation();
  }, [selectedDate, fetchAttendance]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          setCurrentLocation('Location not available');
        }
      );
    }
  };

  const handlePunch = async (type: 'in' | 'out') => {
    try {
      const now = new Date();
      const timeString = now.toTimeString().slice(0, 8);
      
      if (type === 'in') {
        await punchIn({
          time: timeString,
          location: currentLocation,
          date: selectedDate
        });
      } else {
        await punchOut({
          time: timeString,
          location: currentLocation,
          date: selectedDate
        });
      }
      
      setShowPunchModal(false);
    } catch (error) {
      console.error('Punch failed:', error);
    }
  };

  const exportAttendance = () => {
    const exportData = attendanceRecords.map(record => ({
      'Staff Name': record.staffName,
      'Date': record.date,
      'Punch In': record.punchIn || 'N/A',
      'Punch Out': record.punchOut || 'N/A',
      'Total Hours': record.totalHours,
      'Status': record.status.toUpperCase(),
      'Location': record.location || 'N/A',
      'Notes': record.notes || 'N/A'
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
    XLSX.writeFile(wb, `attendance_${selectedDate}.xlsx`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'half-day': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.staffName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    present: attendanceRecords.filter(r => r.status === 'present').length,
    absent: attendanceRecords.filter(r => r.status === 'absent').length,
    late: attendanceRecords.filter(r => r.status === 'late').length,
    total: attendanceRecords.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-attendance-bg via-attendance-bg/30 to-attendance-bg/80 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-attendance-primary/20 to-attendance-secondary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-attendance-accent/20 to-attendance-primary/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-attendance-primary/10 to-attendance-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-shimmer-gradient bg-[length:200%_100%] rounded-full animate-shimmer opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-radial-shine rounded-full animate-glow"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-attendance-primary to-attendance-secondary bg-clip-text text-transparent mb-2">
            Attendance Management
          </h1>
          <p className="text-gray-600">Track staff attendance and manage punch in/out records</p>
        </div>

        {/* Quick Punch Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-attendance-primary/20 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="w-8 h-8 mr-3 text-attendance-primary" />
            Quick Punch
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-attendance-primary mb-2">
                {new Date().toLocaleTimeString()}
              </div>
              <div className="text-gray-600">Current Time</div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setPunchType('in');
                  setShowPunchModal(true);
                }}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl flex items-center gap-3 hover:scale-105 transition-all duration-300 font-medium shadow-lg"
              >
                <CheckCircle className="w-6 h-6" />
                Punch In
              </button>
              <button
                onClick={() => {
                  setPunchType('out');
                  setShowPunchModal(true);
                }}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl flex items-center gap-3 hover:scale-105 transition-all duration-300 font-medium shadow-lg"
              >
                <XCircle className="w-6 h-6" />
                Punch Out
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Present</p>
                <p className="text-3xl font-bold text-green-600">{stats.present}</p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-300" />
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Absent</p>
                <p className="text-3xl font-bold text-red-600">{stats.absent}</p>
              </div>
              <XCircle className="h-12 w-12 text-red-300" />
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Late</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.late}</p>
              </div>
              <AlertCircle className="h-12 w-12 text-yellow-300" />
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-attendance-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-3xl font-bold text-attendance-primary">{stats.total}</p>
              </div>
              <Users className="h-12 w-12 text-attendance-primary/30" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-attendance-primary focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl w-full focus:ring-2 focus:ring-attendance-primary focus:border-transparent transition-all duration-300"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-attendance-primary focus:border-transparent transition-all duration-300"
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
            <option value="half-day">Half Day</option>
          </select>
          <button
            onClick={exportAttendance}
            className="bg-gradient-to-r from-attendance-primary to-attendance-secondary text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-300 font-medium shadow-lg"
          >
            <Download className="h-5 w-5" />
            Export
          </button>
        </div>

        {/* Attendance Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-attendance-primary/20 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Attendance Records</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Punch In</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Punch Out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-attendance-primary to-attendance-secondary rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {record.staffName.charAt(0)}
                        </div>
                        <div className="text-sm font-medium text-gray-900">{record.staffName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.punchIn || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.punchOut || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.totalHours.toFixed(1)}h
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                        {record.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {record.location || 'N/A'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Punch Modal */}
        {showPunchModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Punch {punchType === 'in' ? 'In' : 'Out'}
              </h2>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-attendance-primary mb-2">
                    {new Date().toLocaleTimeString()}
                  </div>
                  <div className="text-gray-600">{new Date().toLocaleDateString()}</div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {currentLocation || 'Getting location...'}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowPunchModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handlePunch(punchType)}
                    className={`flex-1 px-6 py-3 text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium ${
                      punchType === 'in' 
                        ? 'bg-gradient-to-r from-green-500 to-green-600' 
                        : 'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                  >
                    Confirm Punch {punchType === 'in' ? 'In' : 'Out'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}