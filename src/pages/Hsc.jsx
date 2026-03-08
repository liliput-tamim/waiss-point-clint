import { Link } from 'react-router-dom';
import SubjectCard from '../components/SubjectCard';

// Group data for HSC
const groups = {
  science: {
    id: 'science',
    title: 'বিজ্ঞান বিভাগ',
    titleEn: 'Science Group',
    icon: '🔬',
    description: 'পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান এবং উচ্চতর গণিত',
    color: 'from-green-600 to-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  business: {
    id: 'business',
    title: 'ব্যবসায় শিক্ষা বিভাগ',
    titleEn: 'Business Studies Group',
    icon: '💼',
    description: 'হিসাববিজ্ঞান, ব্যবসায় সংগঠন ও ব্যবস্থাপনা এবং ফাইন্যান্স',
    color: 'from-purple-600 to-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  humanities: {
    id: 'humanities',
    title: 'মানবিক বিভাগ',
    titleEn: 'Humanities Group',
    icon: '📚',
    description: 'ইতিহাস, সমাজবিজ্ঞান, অর্থনীতি এবং যুক্তিবিদ্যা',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
};

const Hsc = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-6">
        <nav className="flex items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-green-600 transition-colors">হোম</Link>
          <span className="mx-2">/</span>
          <span className="text-green-600 font-medium">HSC</span>
        </nav>
      </div>

      {/* 🟢 1. Hero Section */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">HSC Academic Section</h1>
            <p className="text-xl md:text-2xl mb-2 font-medium">(Class 11-12)</p>
            <p className="text-green-100 text-lg mb-8">
              "একাদশ ও দ্বাদশ শ্রেণির সকল বিষয়, নোট, সাজেশন ও গুরুত্বপূর্ণ তথ্য এখানে পাওয়া যাবে।"
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/hsc/science" 
                className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>📚</span>
                <span>View Subjects</span>
              </Link>
              <Link 
                to="#download-notes" 
                className="bg-green-500 bg-opacity-20 border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
              >
                <span>⬇️</span>
                <span>Download Notes</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 🟢 2. Stream Selection Section */}
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          শিক্ষা বিভাগসমূহ <span className="text-green-600">Select Your Stream</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(groups).map((groupInfo) => (
            <Link
              key={groupInfo.id}
              to={`/hsc/${groupInfo.id}`}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`bg-gradient-to-r ${groupInfo.color} p-6 text-white`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                    {groupInfo.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{groupInfo.title}</h3>
                    <p className="text-white/80 text-sm">{groupInfo.titleEn}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{groupInfo.description}</p>
                <div className={`flex items-center font-medium ${groupInfo.id === 'science' ? 'text-green-600' : groupInfo.id === 'business' ? 'text-purple-600' : 'text-yellow-600'}`}>
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

      {/* 🟢 4. Important Section */}
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          গুরুত্বপূর্ণ তথ্য <span className="text-green-600">Important</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* HSC Suggestion 2026 */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-3xl mb-4">
              🔥
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">HSC Suggestion 2026</h3>
            <p className="text-gray-600 text-sm mb-4">এইচএসসি পরীক্ষার জন্য গুরুত্বপূর্ণ সাজেশন</p>
            <Link to="/hsc/suggestion-2026" className="text-orange-600 font-medium hover:text-orange-700 flex items-center gap-1">
              দেখুন <span>→</span>
            </Link>
          </div>

          {/* Notice Board */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-3xl mb-4">
              📢
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Notice Board</h3>
            <p className="text-gray-600 text-sm mb-4">গুরুত্বপূর্ণ নোটিশ ও আপডেট</p>
            <Link to="/hsc/notices" className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
              দেখুন <span>→</span>
            </Link>
          </div>

          {/* Exam Routine */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-3xl mb-4">
              📅
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Exam Routine</h3>
            <p className="text-gray-600 text-sm mb-4">পরীক্ষার রুটিন ও সময়সূচি</p>
            <Link to="/hsc/routine" className="text-purple-600 font-medium hover:text-purple-700 flex items-center gap-1">
              দেখুন <span>→</span>
            </Link>
          </div>

          {/* Result Section */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-3xl mb-4">
              📊
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Result Section</h3>
            <p className="text-gray-600 text-sm mb-4">ফলাফল ও গ্রেড পয়েন্ট</p>
            <Link to="/hsc/result" className="text-green-600 font-medium hover:text-green-700 flex items-center gap-1">
              দেখুন <span>→</span>
            </Link>
          </div>
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

export default Hsc;
