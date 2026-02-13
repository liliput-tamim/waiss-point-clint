import { useState } from 'react';
import { FiSearch, FiBell, FiUser } from 'react-icons/fi';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import PostsManagement from './PostsManagement';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'posts':
        return <PostsManagement />;
      case 'categories':
        return <div className="p-8"><h1 className="text-3xl font-bold">Categories Management</h1></div>;
      case 'users':
        return <div className="p-8"><h1 className="text-3xl font-bold">Users Management</h1></div>;
      case 'comments':
        return <div className="p-8"><h1 className="text-3xl font-bold">Comments Management</h1></div>;
      case 'analytics':
        return <div className="p-8"><h1 className="text-3xl font-bold">Analytics</h1></div>;
      case 'settings':
        return <div className="p-8"><h1 className="text-3xl font-bold">Settings</h1></div>;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex-1 max-w-xl relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="input input-bordered w-full pr-10"
              />
              <FiSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="btn btn-ghost btn-circle relative">
                <FiBell className="text-xl" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-green-600 rounded-full"></span>
              </button>
              
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                    <FiUser />
                  </div>
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow-xl bg-white rounded-box w-52 border border-gray-100">
                  <li><a>Profile</a></li>
                  <li><a>Settings</a></li>
                  <li><a className="text-red-600">Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
