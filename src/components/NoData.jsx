import { motion } from 'framer-motion';
import { FiInbox, FiFile, FiUsers, FiSearch, FiMessageCircle, FiBell } from 'react-icons/fi';

const NoData = ({ 
  type = 'general', 
  title = 'কোনো ডেটা পাওয়া যায়নি', 
  message = 'এই মুহূর্তে কোনো তথ্য উপলব্ধ নেই।',
  actionLabel = 'রিফ্রেশ করুন',
  onAction,
  iconSize = 64
}) => {
  
  const getIcon = () => {
    switch (type) {
      case 'posts':
        return <FiFile size={iconSize} className="text-emerald-400" />;
      case 'users':
        return <FiUsers size={iconSize} className="text-blue-400" />;
      case 'comments':
        return <FiMessageCircle size={iconSize} className="text-amber-400" />;
      case 'search':
        return <FiSearch size={iconSize} className="text-purple-400" />;
      case 'notifications':
        return <FiBell size={iconSize} className="text-rose-400" />;
      default:
        return <FiInbox size={iconSize} className="text-gray-400" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'posts':
        return 'from-emerald-al-5050 to-te border-emerald-200';
      case 'users':
        return 'from-blue-50 to-indigo-50 border-blue-200';
      case 'comments':
        return 'from-amber-50 to-yellow-50 border-amber-200';
      case 'search':
        return 'from-purple-50 to-violet-50 border-purple-200';
      case 'notifications':
        return 'from-rose-50 to-pink-50 border-rose-200';
      default:
        return 'from-gray-50 to-slate-50 border-gray-200';
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case 'posts':
        return 'bg-emerald-600 hover:bg-emerald-700';
      case 'users':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'comments':
        return 'bg-amber-600 hover:bg-amber-700';
      case 'search':
        return 'bg-purple-600 hover:bg-purple-700';
      case 'notifications':
        return 'bg-rose-600 hover:bg-rose-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br ${getColors()} rounded-2xl border-2 border-dashed ${getColors().split(' ')[1].replace('to-', 'border-').replace('50', '300')}`}
    >
      <motion.div
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
        className="mb-6"
      >
        {getIcon()}
      </motion.div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center max-w-md mb-6">
        {message}
      </p>
      
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className={`px-6 py-3 ${getButtonColor()} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2`}
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

// Skeleton Loader Component
export const SkeletonLoader = ({ type = 'card', count = 3 }) => {
  const getSkeletonClass = () => {
    switch (type) {
      case 'card':
        return 'bg-white rounded-2xl p-6 shadow-lg';
      case 'table':
        return 'bg-white rounded-xl overflow-hidden';
      case 'banner':
        return 'bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl h-64';
      case 'list':
        return 'bg-white rounded-xl p-4';
      default:
        return 'bg-white rounded-xl p-4';
    }
  };

  return (
    <div className={`${getSkeletonClass()} animate-pulse`}>
      {type === 'card' && (
        <>
          <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
          <div className="h-20 bg-gray-200 rounded mb-4"></div>
          <div className="flex gap-2">
            <div className="h-8 bg-gray-200 rounded w-20"></div>
            <div className="h-8 bg-gray-200 rounded w-20"></div>
          </div>
        </>
      )}
      {type === 'table' && (
        <div className="space-y-4">
          {[...Array(count)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border-b border-gray-100">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {type === 'banner' && (
        <div className="flex items-center justify-center h-full">
          <div className="text-white text-center">
            <div className="h-8 bg-white/30 rounded w-48 mb-4 mx-auto"></div>
            <div className="h-4 bg-white/30 rounded w-64 mx-auto"></div>
          </div>
        </div>
      )}
      {type === 'list' && (
        <>
          <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default NoData;
