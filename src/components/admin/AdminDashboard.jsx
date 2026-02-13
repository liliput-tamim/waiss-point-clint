import { FiFileText, FiUsers, FiMessageSquare, FiMail } from 'react-icons/fi';

const AdminDashboard = () => {
  const stats = [
    { icon: FiFileText, label: 'Total Posts', value: '245', color: 'bg-green-600' },
    { icon: FiUsers, label: 'Total Users', value: '1,234', color: 'bg-blue-600' },
    { icon: FiMessageSquare, label: 'Total Comments', value: '3,456', color: 'bg-purple-600' },
    { icon: FiMail, label: 'Active Subscribers', value: '892', color: 'bg-orange-600' }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                <stat.icon className="text-2xl" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Posts per Category</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Daily Visitors</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
