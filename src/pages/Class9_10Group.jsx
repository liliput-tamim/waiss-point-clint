import { Link, useParams } from 'react-router-dom';
import SubjectCard from '../components/SubjectCard';

// Group data for Class 9-10
const groups = {
  science: {
    id: 'science',
    title: 'বিজ্ঞান বিভাগ',
    titleEn: 'Science Group',
    icon: '🔬',
    description: 'পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান এবং উচ্চতর গণিত',
    subjects: [
      { id: 'bangla', title: 'বাংলা', icon: '📚' },
      { id: 'english', title: 'English', icon: '📖' },
      { id: 'math', title: 'গণিত', icon: '🔢' },
      { id: 'higher-math', title: 'উচ্চতর গণিত', icon: '📐' },
      { id: 'physics', title: 'পদার্থবিজ্ঞান', icon: '⚛️' },
      { id: 'chemistry', title: 'রসায়ন', icon: '🧪' },
      { id: 'biology', title: 'জীববিজ্ঞান', icon: '🧬' },
      { id: 'ict', title: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', icon: '💻' },
      { id: 'social', title: 'বাংলাদেশ ও বিশ্বপরিচয়', icon: '🌍' },
      { id: 'religion', title: 'ধর্ম ও নৈতিক শিক্ষা', icon: '🙏' },
    ],
  },
  business: {
    id: 'business',
    title: 'ব্যবসায় শিক্ষা বিভাগ',
    titleEn: 'Business Studies Group',
    icon: '💼',
    description: 'হিসাববিজ্ঞান, ব্যবসায় উদ্যোগ এবং ফাইন্যান্স ও ব্যাংকিং',
    subjects: [
      { id: 'bangla', title: 'বাংলা', icon: '📚' },
      { id: 'english', title: 'English', icon: '📖' },
      { id: 'math', title: 'গণিত', icon: '🔢' },
      { id: 'accounting', title: 'হিসাববিজ্ঞান', icon: '📊' },
      { id: 'business-entrepreneurship', title: 'ব্যবসায় উদ্যোগ', icon: '🚀' },
      { id: 'finance-banking', title: 'ফাইন্যান্স ও ব্যাংকিং', icon: '🏦' },
      { id: 'ict', title: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', icon: '💻' },
      { id: 'social', title: 'বাংলাদেশ ও বিশ্বপরিচয়', icon: '🌍' },
      { id: 'religion', title: 'ধর্ম ও নৈতিক শিক্ষা', icon: '🙏' },
    ],
  },
  humanities: {
    id: 'humanities',
    title: 'মানবিক বিভাগ',
    titleEn: 'Humanities Group',
    icon: '📚',
    description: 'ভূগোল, ইতিহাস, অর্থনীতি এবং নাগরিক শিক্ষা',
    subjects: [
      { id: 'bangla', title: 'বাংলা', icon: '📚' },
      { id: 'english', title: 'English', icon: '📖' },
      { id: 'math', title: 'গণিত', icon: '🔢' },
      { id: 'geography', title: 'ভূগোল', icon: '🌍' },
      { id: 'history', title: 'ইতিহাস', icon: '📜' },
      { id: 'economics', title: 'অর্থনীতি', icon: '📈' },
      { id: 'civics', title: 'নাগরিক ও নৈতিক শিক্ষা', icon: '🏛️' },
      { id: 'ict', title: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', icon: '💻' },
      { id: 'religion', title: 'ধর্ম ও নৈতিক শিক্ষা', icon: '🙏' },
    ],
  },
};

const Class9_10Group = () => {
  const { group } = useParams();
  
  // If no group is specified, show all groups
  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 mb-6">
          <nav className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-green-600 transition-colors">হোম</Link>
            <span className="mx-2">/</span>
            <Link to="/class-9-10" className="hover:text-green-600 transition-colors">Class 9-10</Link>
            <span className="mx-2">/</span>
            <span className="text-green-600 font-medium">বিভাগসমূহ</span>
          </nav>
        </div>

        {/* Header */}
        <div className="container mx-auto px-4 mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-lg">
            <h1 className="text-4xl font-bold mb-2">Class 9-10</h1>
            <p className="text-green-100 text-lg">নবম ও দশম শ্রেণি - সিভাগসকল বমূহ</p>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">শিক্ষা বিভাগ</h2>
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
                    <span>বিষয় দেখুন</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
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
  }

  // Show specific group
  const groupInfo = groups[group];
  
  if (!groupInfo) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">বিভাগটি পাওয়া যায়নি</h2>
            <p className="text-gray-600 mb-6">আপনি যে বিভাগটি খুঁজছেন সেটি আমাদের সিস্টেমে নেই।</p>
            <Link to="/class-9-10" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Class 9-10 পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-6">
        <nav className="flex items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-green-600 transition-colors">হোম</Link>
          <span className="mx-2">/</span>
          <Link to="/class-9-10" className="hover:text-green-600 transition-colors">Class 9-10</Link>
          <span className="mx-2">/</span>
          <span className="text-green-600 font-medium">{groupInfo.title}</span>
        </nav>
      </div>

      {/* Group Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">
              {groupInfo.icon}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{groupInfo.title}</h1>
              <p className="text-green-100 text-lg">{groupInfo.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">বিষয়সমূহ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {groupInfo.subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              title={subject.title}
              icon={subject.icon}
              link={`/class-9-10/${groupInfo.id}/${subject.id}`}
            />
          ))}
        </div>
      </div>

      {/* Study Resources */}
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">স্টাডি রিসোর্স</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-green-50 rounded-xl p-6 text-center hover:bg-green-100 transition-colors cursor-pointer">
              <div className="text-4xl mb-3">📚</div>
              <h4 className="font-semibold text-gray-800">নোটস</h4>
              <p className="text-sm text-gray-600">PDF ডাউনলোড</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 text-center hover:bg-blue-100 transition-colors cursor-pointer">
              <div className="text-4xl mb-3">❓</div>
              <h4 className="font-semibold text-gray-800">MCQ</h4>
              <p className="text-sm text-gray-600">Multiple Choice</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 text-center hover:bg-purple-100 transition-colors cursor-pointer">
              <div className="text-4xl mb-3">📝</div>
              <h4 className="font-semibold text-gray-800">CQ</h4>
              <p className="text-sm text-gray-600">Creative Question</p>
            </div>
            <div className="bg-red-50 rounded-xl p-6 text-center hover:bg-red-100 transition-colors cursor-pointer">
              <div className="text-4xl mb-3">🎥</div>
              <h4 className="font-semibold text-gray-800">ভিডিও</h4>
              <p className="text-sm text-gray-600">Lecture Videos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class9_10Group;
