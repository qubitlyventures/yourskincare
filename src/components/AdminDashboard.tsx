import React, { useState, useEffect } from 'react';
import { Download, Users, TrendingUp, Mail, Globe, Calendar, Eye, BarChart3 } from 'lucide-react';
import { getWaitlistStats, exportWaitlistData, getWaitlistUsers } from '../utils/emailStorage';

// Define proper types for better TypeScript support
interface StatsData {
  totalUsers: number;
  byCountry: Record<string, number>;
  bySkinType: Record<string, number>;
  byConcerns: Record<string, number>;
  bySource: Record<string, number>;
  recentSignups: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    byCountry: {},
    bySkinType: {},
    byConcerns: {},
    bySource: {},
    recentSignups: 0
  });
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [statsData, usersData] = await Promise.all([
          getWaitlistStats(),
          getWaitlistUsers()
        ]);
        setStats(statsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleExport = async () => {
    try {
      const csvData = await exportWaitlistData();
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  // Helper function to calculate percentage safely
  const calculatePercentage = (count: number, total: number): number => {
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Skin Care Dashboard</h1>
          <p className="text-gray-600">Monitor your waitlist performance and user engagement</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
              <span className="text-green-500 text-sm font-medium">+{stats.recentSignups} this week</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
            <p className="text-gray-600">Total Waitlist Users</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <span className="text-blue-500 text-sm font-medium">Growing</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {Object.keys(stats.byCountry || {}).length}
            </h3>
            <p className="text-gray-600">Countries</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Mail className="text-purple-600" size={24} />
              </div>
              <span className="text-purple-500 text-sm font-medium">Active</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">95%</h3>
            <p className="text-gray-600">Email Engagement</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-amber-100 p-3 rounded-lg">
                <Calendar className="text-amber-600" size={24} />
              </div>
              <span className="text-amber-500 text-sm font-medium">Avg/day</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {Math.round(stats.totalUsers / 30) || 0}
            </h3>
            <p className="text-gray-600">Daily Signups</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Skin Types Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 size={20} />
              Skin Types Distribution
            </h3>
            <div className="space-y-3">
              {Object.entries(stats.bySkinType || {}).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-gray-700">{type}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-rose-500 h-2 rounded-full"
                        style={{ width: `${calculatePercentage(count, stats.totalUsers)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
                      {count} ({calculatePercentage(count, stats.totalUsers)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Countries */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Globe size={20} />
              Top Regions
            </h3>
            <div className="space-y-3">
              {Object.entries(stats.byCountry || {})
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([country, count]) => (
                  <div key={country} className="flex items-center justify-between">
                    <span className="text-gray-700">{country}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${calculatePercentage(count, stats.totalUsers)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
                        {count} ({calculatePercentage(count, stats.totalUsers)}%)
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Recent Users Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Eye size={20} />
              Recent Signups
            </h3>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white px-4 py-2 rounded-lg hover:from-amber-600 hover:to-rose-600 transition-all duration-300"
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Region</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Skin Type</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Signup Date</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 10).map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{user.name || 'N/A'}</td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4 text-gray-600">{user.country || 'N/A'}</td>
                    <td className="py-3 px-4">
                      <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                        {user.skinType || 'N/A'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(user.signupDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;