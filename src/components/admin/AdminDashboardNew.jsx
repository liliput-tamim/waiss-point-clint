import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FiFileText, FiUsers, FiMessageSquare, FiTrendingUp, 
  FiPlus, FiArrowRight, FiActivity, FiClock, FiEye, FiHeart 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AdminDashboardNew = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalUsers: 0,
    totalComments: 0,
    totalCategories: 0
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchRecentPosts();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:3000/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/posts');
      setRecentPosts(response.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching recent posts:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      icon: FiFileText,
      bgColor: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
      textColor: 'text-emerald-600',
      shadowColor: 'shadow-emerald-500/30',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: FiUsers,
      bgColor: 'bg-gradient-to-br from-blue-400 to-blue-600',
      textColor: 'text-blue-600',
      shadowColor: 'shadow-blue-500/30',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Total Comments',
      value: stats.totalComments,
      icon: FiMessageSquare,
      bgColor: 'bg-gradient-to-br from-purple-400 to-purple-600',
      textColor: 'text-purple-600',
      shadowColor: 'shadow-purple-500/30',
      change: '+23%',
      changeType: 'positive'
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: FiTrendingUp,
      bgColor: 'bg-gradient-to-br from-orange-400 to-orange-600',
      textColor: 'text-orange-600',
      shadowColor: 'shadow-orange-500/30',
      change: '+5%',
      changeType: 'positive'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-2xl shadow-emerald-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h2>
            <p className="text-emerald-100 text-lg">Here's what's happening with your portal today</p>
          </div>
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 text-emerald-100">
                <FiActivity />
                <span className="text-sm">System Status: Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 ${stat.bgColor} rounded-2xl flex items-center justify-center shadow-lg ${stat.shadowColor}`}>
                  <Icon className="text-2xl text-white" />
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  stat.changeType === 'positive' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
              <p className="text-4xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
            <span className="text-sm text-gray-500">Frequently used</span>
          </div>
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/admin/posts')}
              className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 rounded-xl transition-all group"
            >
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                <FiPlus className="text-xl text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">Create New Post</p>
                <p className="text-sm text-gray-500">Write fresh content</p>
              </div>
              <FiArrowRight className="text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => navigate('/admin/users')}
              className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all group"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <FiUsers className="text-xl text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">Manage Users</p>
                <p className="text-sm text-gray-500">View & edit accounts</p>
              </div>
              <FiArrowRight className="text-blue-500 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => navigate('/admin/comments')}
              className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all group"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <FiMessageSquare className="text-xl text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">Review Comments</p>
                <p className="text-sm text-gray-500">Moderate discussions</p>
              </div>
              <FiArrowRight className="text-purple-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Posts</h3>
            <button 
              onClick={() => navigate('/admin/posts')}
              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1"
            >
              View All <FiArrowRight />
            </button>
          </div>
          
          {recentPosts.length === 0 ? (
            <div className="text-center py-12">
              <FiFileText className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No posts yet</p>
              <button 
                onClick={() => navigate('/admin/posts')}
                className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
              >
                Create First Post
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div 
                  key={post._id} 
                  className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition group cursor-pointer"
                  onClick={() => navigate('/admin/posts')}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                    {post.title.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate group-hover:text-emerald-600 transition">{post.title}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FiUsers /> {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock /> {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    post.status === 'Published' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Activity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <FiEye className="text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Total Views</h4>
          </div>
          <p className="text-3xl font-bold text-gray-900">12,845</p>
          <p className="text-sm text-gray-500 mt-1">+15% from last month</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <FiHeart className="text-red-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Engagements</h4>
          </div>
          <p className="text-3xl font-bold text-gray-900">3,421</p>
          <p className="text-sm text-gray-500 mt-1">+8% from last month</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <FiActivity className="text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Active Users</h4>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
          <p className="text-sm text-gray-500 mt-1">Currently online</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardNew;
