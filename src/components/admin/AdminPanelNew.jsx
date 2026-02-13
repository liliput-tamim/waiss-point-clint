import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiHome, FiFileText, FiUsers, FiMessageSquare, FiSettings, 
  FiLogOut, FiMenu, FiX, FiBarChart2, FiBell, FiSearch, FiChevronDown 
} from 'react-icons/fi';
import AdminDashboardNew from './AdminDashboardNew';
import PostsManagement from './PostsManagement';
import UsersManagement from './UsersManagement';
import CommentsManagement from './CommentsManagement';

const AdminPanelNew = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'admin' && parsedUser.role !== 'manager') {
        navigate('/');
      }
      setUser(parsedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: FiHome, path: '/admin', roles: ['admin', 'manager'] },
    { name: 'Posts', icon: FiFileText, path: '/admin/posts', roles: ['admin', 'manager'] },
    { name: 'Users', icon: FiUsers, path: '/admin/users', roles: ['admin'] },
    { name: 'Comments', icon: FiMessageSquare, path: '/admin/comments', roles: ['admin', 'manager'] },
    { name: 'Analytics', icon: FiBarChart2, path: '/admin/analytics', roles: ['admin'] },
    { name: 'Settings', icon: FiSettings, path: '/admin/settings', roles: ['admin'] },
  ];

  const filteredMenu = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const getPageTitle = () => {
    const currentItem = filteredMenu.find(item => item.path === location.pathname);
    if (currentItem) return currentItem.name;
    if (location.pathname.includes('posts')) return 'Posts Management';
    if (location.pathname.includes('users')) return 'Users Management';
    if (location.pathname.includes('comments')) return 'Comments Management';
    return 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <img 
                src="/481191097_622757057179962_971591103180726496_n-removebg-preview.png" 
                alt="AI Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <span className="font-bold text-lg block">AI Hub</span>
                <span className="text-xs text-slate-400">Admin Panel</span>
              </div>
            </div>
          )}
          {!sidebarOpen && (
            <img 
              src="/481191097_622757057179962_971591103180726496_n-removebg-preview.png" 
              alt="AI Logo" 
              className="w-12 h-12 object-contain mx-auto"
            />
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {filteredMenu.map((item, idx) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={idx}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
                    : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
                }`}
              >
                <Icon className={`text-xl ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                {sidebarOpen && (
                  <>
                    <span className="font-medium">{item.name}</span>
                    {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full shadow"></div>}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-700">
          {sidebarOpen ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center font-semibold text-lg shadow-lg">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-slate-400 capitalize">{user?.role || 'Admin'}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition"
                  title="Logout"
                >
                  <FiLogOut className="text-lg" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center font-semibold text-lg shadow-lg">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <button onClick={handleLogout} className="p-2 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition">
                <FiLogOut className="text-xl" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-8 py-4 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition shadow-sm"
              >
                {sidebarOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
                <p className="text-sm text-gray-500">Manage your content and settings</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-11 pr-4 py-2.5 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500/50 w-64 transition"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition shadow-sm">
                <FiBell className="text-xl text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow">
                    {notifications}
                  </span>
                )}
              </button>
              
              {/* User Menu */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center font-semibold text-white shadow-lg">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="hidden md:block">
                  <p className="font-semibold text-sm text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role || 'Admin'}</p>
                </div>
                <FiChevronDown className="text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<AdminDashboardNew />} />
              <Route path="/posts" element={<PostsManagement />} />
              <Route path="/users" element={<UsersManagement />} />
              <Route path="/comments" element={<CommentsManagement />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanelNew;
