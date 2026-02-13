import { FiHome, FiFileText, FiFolder, FiUsers, FiMessageSquare, FiBarChart2, FiSettings, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: FiHome, label: 'Dashboard' },
    { id: 'posts', icon: FiFileText, label: 'Posts' },
    { id: 'categories', icon: FiFolder, label: 'Categories' },
    { id: 'users', icon: FiUsers, label: 'Users' },
    { id: 'comments', icon: FiMessageSquare, label: 'Comments' },
    { id: 'analytics', icon: FiBarChart2, label: 'Analytics' },
    { id: 'settings', icon: FiSettings, label: 'Settings' }
  ];

  return (
    <div className={`bg-green-50 h-screen sticky top-0 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} border-r border-green-100`}>
      <div className="p-4 border-b border-green-100 flex items-center justify-between">
        {!isCollapsed && <h2 className="text-xl font-bold text-green-800">Admin Panel</h2>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="btn btn-ghost btn-sm btn-circle">
          {isCollapsed ? <FiMenu /> : <FiX />}
        </button>
      </div>
      
      <nav className="p-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
              activeTab === item.id
                ? 'bg-green-600 text-white'
                : 'text-gray-700 hover:bg-green-100'
            }`}
          >
            <item.icon className="text-xl" />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
