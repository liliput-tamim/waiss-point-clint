import { Link } from 'react-router-dom';

// Group data for Class 9-10
const groups = {
  science: {
    id: 'science',
    title: 'বিজ্ঞান বিভাগ',
    titleEn: 'Science Group',
    icon: '🔬',
    description: 'পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান এবং উচ্চতর গণিত',
  },
  business: {
    id: 'business',
    title: 'ব্যবসায় শিক্ষা বিভাগ',
    titleEn: 'Business Studies Group',
    icon: '💼',
    description: 'হিসাববিজ্ঞান, ব্যবসায় উদ্যোগ এবং ফাইন্যান্স ও ব্যাংকিং',
  },
  humanities: {
    id: 'humanities',
    title: 'মানবিক বিভাগ',
    titleEn: 'Humanities Group',
    icon: '📚',
    description: 'ভূগোল, ইতিহাস, অর্থনীতি এবং নাগরিক শিক্ষা',
  },
};

const Class9_10 = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-6">
        <nav className="flex items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-green-600 transition-colors">হোম</Link>
          <span className="mx-2">/</span>
          <span className="text-green-600 font-medium">Class 9-10</span>
        </nav>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold mb-2">Class 9-10</h1>
          <p className="text-green-100 text-lg">নবম ও দশম শ্রেণি - সকল বিভাগসমূহ</p>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">শিক্ষা বিভাগসমূহ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(groups).map((groupInfo) => (
            <Link
              key={groupInfo.id}
              to={`/class-9-10/${groupInfo.id}`}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                    {groupInfo.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{groupInfo.title}</h3>
                    <p className="text-green-100 text-sm">{groupInfo.titleEn}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{groupInfo.description}</p>
                <div className="flex items-center text-green-600 font-medium">
                  <span>বিষয়সমূহ দেখুন</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Study Resources */}
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">আমাদের সেবাসমূহ</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                📚
              </div>
              <h4 className="font-semibold text-gray-800">PDF নোটস</h4>
              <p className="text-sm text-gray-600">ডাউনলোড করুন</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                ❓
              </div>
              <h4 className="font-semibold text-gray-800">MCQ প্রশ্ন</h4>
              <p className="text-sm text-gray-600">অনুশীলন করুন</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                📝
              </div>
              <h4 className="font-semibold text-gray-800">CQ প্রশ্ন</h4>
              <p className="text-sm text-gray-600">সমাধান দেখুন</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                🎥
              </div>
              <h4 className="font-semibold text-gray-800">ভিডিও লেকচার</h4>
              <p className="text-sm text-gray-600">শিখুন অনলাইনে</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class9_10;
