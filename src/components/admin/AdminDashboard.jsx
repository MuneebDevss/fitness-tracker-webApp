import React, { useState } from 'react';
import { 
  FaUsers, 
  FaChartBar, 
  FaCog, 
  FaBell, 
  FaSignOutAlt 
} from 'react-icons/fa';
import UserManagement from './UserManagement';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch(activeSection) {
      case 'users':
        return <UserManagement />;
      case 'overview':
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <SidebarItem 
              icon={<FaChartBar />} 
              label="Dashboard" 
              active={activeSection === 'overview'}
              onClick={() => setActiveSection('overview')}
            />
            <SidebarItem 
              icon={<FaUsers />} 
              label="User Management" 
              active={activeSection === 'users'}
              onClick={() => setActiveSection('users')}
            />
            <SidebarItem 
              icon={<FaCog />} 
              label="Settings" 
              active={activeSection === 'settings'}
              onClick={() => setActiveSection('settings')}
            />
            <SidebarItem 
              icon={<FaBell />} 
              label="Notifications" 
              active={activeSection === 'notifications'}
              onClick={() => setActiveSection('notifications')}
            />
            <SidebarItem 
              icon={<FaSignOutAlt />} 
              label="Logout" 
              active={false}
              onClick={() => {/* Implement logout logic */}}
            />
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, label, active, onClick }) => (
  <li 
    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
      active 
        ? 'bg-indigo-100 text-indigo-600' 
        : 'hover:bg-gray-100 text-gray-600'
    }`}
    onClick={onClick}
  >
    <span className="mr-3">{icon}</span>
    <span className="font-medium">{label}</span>
  </li>
);

// Dashboard Overview Component
const DashboardOverview = () => {
  const stats = [
    { 
      icon: <FaUsers className="text-blue-500" />, 
      title: 'Total Users', 
      value: '2,543' 
    },
    { 
      icon: <FaChartBar className="text-green-500" />, 
      title: 'Active Users', 
      value: '1,256' 
    },
    { 
      icon: <FaBell className="text-yellow-500" />, 
      title: 'Pending Registrations', 
      value: '87' 
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-lg shadow-md flex items-center"
          >
            <div className="mr-4 text-3xl">{stat.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <h2 className="text-2xl font-bold text-gray-800">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-md">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Activity</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  user: 'John Doe', 
                  activity: 'Profile Update', 
                  date: '2023-08-15', 
                  status: 'Completed' 
                },
                { 
                  user: 'Jane Smith', 
                  activity: 'Goal Setting', 
                  date: '2023-08-14', 
                  status: 'In Progress' 
                }
              ].map((activity, index) => (
                <tr key={index} className="border-t">
                  <td className="p-4">{activity.user}</td>
                  <td className="p-4">{activity.activity}</td>
                  <td className="p-4">{activity.date}</td>
                  <td className="p-4">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-semibold
                      ${activity.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'}
                    `}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;

cout << "what color do you want to change to? ";