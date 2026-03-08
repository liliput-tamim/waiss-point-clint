import { Link, useParams } from 'react-router-dom';
import SubjectCard from '../components/SubjectCard';

// Group data for HSC with subjects and color schemes
const groups = {
  science: {
    id: 'science',
    title: 'বিজ্ঞান বিভাগ',
    titleEn: 'Science Group',
    icon: '🔬',
    description: 'পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান এবং উচ্চতর গণিত',
    color: 'from-green-600 to-green-700',
    accentColor: 'text-green-600',
    bgLight: 'bg-green-50',
    borderColor: 'border-green-200',
    subjects: [
      { id: 'bangla-1st', title: 'বাংলা ১ম পত্র', icon: '📚', category: 'বাংলা' },
      { id: 'bangla-2nd', title: 'বাংলা ২য় পত্র', icon: '📚', category: 'বাংলা' },
      { id: 'english-1st', title: 'English 1st Paper', icon: '📖', category: 'English' },
      { id: 'english-2nd', title: 'English 2nd Paper', icon: '📖', category: 'English' },
      { id: 'ict', title: 'ICT (Single Paper)', icon: '💻', category: 'ICT' },
      { id: 'physics-1st', title: 'Physics 1st Paper', icon: '⚛️', category: 'পদার্থবিজ্ঞান' },
      { id: 'physics-2nd', title: 'Physics 2nd Paper', icon: '⚛️', category: 'পদার্থবিজ্ঞান' },
      { id: 'chemistry-1st', title: 'Chemistry 1st Paper', icon: '🧪', category: 'রসায়ন' },
      { id: 'chemistry-2nd', title: 'Chemistry 2nd Paper', icon: '🧪', category: 'রসায়ন' },
      { id: 'higher-math-1st', title: 'Higher Math 1st Paper', icon: '➕', category: 'উচ্চতর গণিত' },
      { id: 'higher-math-2nd', title: 'Higher Math 2nd Paper', icon: '➕', category: 'উচ্চতর গণিত' },
      { id: 'biology-1st', title: 'Biology 1st Paper', icon: '🧬', category: 'জীববিজ্ঞান' },
      { id: 'biology-2nd', title: 'Biology 2nd Paper', icon: '🧬', category: 'জীববিজ্ঞান' },
    ],
  },
  business: {
    id: 'business',
    title: 'ব্যবসায় শিক্ষা বিভাগ',
    titleEn: 'Commerce Group',
    icon: '💼',
    description: 'হিসাববিজ্ঞান, ব্যবসায় সংগঠন ও ব্যবস্থাপনা এবং ফাইন্যান্স',
    color: 'from-purple-600 to-purple-700',
    accentColor: 'text-purple-600',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-200',
    subjects: [
      { id: 'bangla-1st', title: 'বাংলা ১ম পত্র', icon: '📚', category: 'বাংলা' },
      { id: 'bangla-2nd', title: 'বাংলা ২য় পত্র', icon: '📚', category: 'বাংলা' },
      { id: 'english-1st', title: 'English 1st Paper', icon: '📖', category: 'English' },
      { id: 'english-2nd', title: 'English 2nd Paper', icon: '📖', category: 'English' },
      { id: 'accounting-1st', title: 'Accounting 1st Paper', icon: '📊', category: 'হিসাববিজ্ঞান' },
      { id: 'accounting-2nd', title: 'Accounting 2nd Paper', icon: '📊', category: 'হিসাববিজ্ঞান' },
      { id: 'business-org-1st', title: 'Management 1st Paper', icon: '🚀', category: 'ব্যবসায় সংগঠন ও ব্যবস্থাপনা' },
      { id: 'business-org-2nd', title: 'Management 2nd Paper', icon: '🚀', category: 'ব্যবসায় সংগঠন ও ব্যবস্থাপনা' },
      { id: 'finance-1st', title: 'Finance 1st Paper', icon: '🏦', category: 'ফিন্যান্স ও ব্যাংকিং' },
      { id: 'finance-2nd', title: 'Finance 2nd Paper', icon: '🏦', category: 'ফিন্যান্স ও ব্যাংকিং' },
      { id: 'economics', title: 'Economics', icon: '📈', category: 'অর্থনীতি' },
      { id: 'ict', title: 'ICT (Single Paper)', icon: '💻', category: 'ICT' },
    ],
  },
  humanities: {
    id: 'humanities',
    title: 'মানবিক বিভাগ',
    titleEn: 'Humanities Group',
    icon: '📚',
    description: 'ইতিহাস, সমাজবিজ্ঞান, অর্থনীতি এবং যুক্তিবিদ্যা',
    color: 'from-yellow-500 to-yellow-600',
    accentColor: 'text-yellow-600',
    bgLight: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    subjects: [
      { id: 'bangla-1st', title: 'বাংলা ১ম পত্র', icon: '📚', category: 'বাংলা' },
      { id: 'bangla-2nd', title: 'বাংলা ২য় পত্র', icon: '📚', category: 'বাংলা' },
      { id: 'english-1st', title: 'English 1st Paper', icon: '📖', category: 'English' },
      { id: 'english-2nd', title: 'English 2nd Paper', icon: '📖', category: 'English' },
      { id: 'history-1st', title: 'History 1st Paper', icon: '📜', category: 'ইতিহাস' },
      { id: 'history-2nd', title: 'History 2nd Paper', icon: '📜', category: 'ইতিহাস' },
      { id: 'islamic-history-1st', title: 'Islamic History 1st Paper', icon: '☪️', category: 'ইসলামের ইতিহাস ও সংস্কৃতি' },
      { id: 'islamic-history-2nd', title: 'Islamic History 2nd Paper', icon: '☪️', category: 'ইসলামের ইতিহাস ও সংস্কৃতি' },
      { id: 'geography-1st', title: 'Geography 1st Paper', icon: '🌍', category: 'ভূগোল' },
      { id: 'geography-2nd', title: 'Geography 2nd Paper', icon: '🌍', category: 'ভূগোল' },
      { id: 'sociology-1st', title: 'Sociology 1st Paper', icon: '👥', category: 'সমাজবিজ্ঞান' },
      { id: 'sociology-2nd', title: 'Sociology 2nd Paper', icon: '👥', category: 'সমাজবিজ্ঞান' },
      { id: 'logic-1st', title: 'Logic 1st Paper', icon: '🧠', category: 'যুক্তিবিদ্যা' },
      { id: 'logic-2nd', title: 'Logic 2nd Paper', icon: '🧠', category: 'যুক্তিবিদ্যা' },
    ],
  },
};

// Group subjects by category for display
const groupSubjectsByCategory = (subjects) => {
  const categories = {};
  subjects.forEach((subject) => {
    if (!categories[subject.category]) {
      categories[subject.category] = [];
    }
    categories[subject.category].push(subject);
  });
  return categories;
};

const HscGroup = () => {
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
            <Link to="/hsc" className="hover:text-green-600 transition-colors">HSC</Link>
            <span className="mx-2">/</span>
            <span className="text-green-600 font-medium">বিভাগসমূহ</span>
          </nav>
        </div>

        {/* Header */}
        <div className="container mx-auto px-4 mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-lg">
            <h1 className="text-4xl font-bold mb-2">HSC (Class 11-12)</h1>
            <p className="text-green-100 text-lg">বোর্ড প্রস্তুতি, সাজেশন, নোট, MCQ ও গুরুত্বপূর্ণ আপডেট</p>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">শিক্ষা বিভাগ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(groups).map((groupInfo) => (
              <Link
                key={groupInfo.id}
                to={`/hsc/${groupInfo.id}`}
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
  const categorizedSubjects = groupSubjectsByCategory(groupInfo?.subjects || []);
  
  if (!groupInfo) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">বিভাগটি পাওয়া যায়নি</h2>
            <p className="text-gray-600 mb-6">আপনি যে বিভাগটি খুঁজছেন সেটি আমাদের সিস্টেমে নেই।</p>
            <Link to="/hsc" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              HSC পেজে ফিরে যান
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
          <Link to="/hsc" className="hover:text-green-600 transition-colors">HSC</Link>
          <span className="mx-2">/</span>
          <span className="text-green-600 font-medium">{groupInfo.title}</span>
        </nav>
      </div>

      {/* Group Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className={`bg-gradient-to-r ${groupInfo.color} rounded-2xl p-8 text-white shadow-lg`}>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">
              {groupInfo.icon}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{groupInfo.title}</h1>
              <p className="text-white/80 text-lg">{groupInfo.titleEn}</p>
              <p className="text-white/70 text-sm mt-1">{groupInfo.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 📘 Subject Structure: 1st Paper & 2nd Paper */}
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          📘 Subject Structure: 1st Paper & 2nd Paper
        </h2>
        
        {/* Subject Categories */}
        {Object.entries(categorizedSubjects).map(([category, subjects]) => (
          <div key={category} className={`${groupInfo.bgLight} rounded-2xl p-6 mb-6 border ${groupInfo.borderColor}`}>
            <h3 className={`text-xl font-bold ${groupInfo.accentColor} mb-4 flex items-center gap-2`}>
              <span>📖</span> {category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {subjects.map((subject) => (
                <Link
                  key={subject.id}
                  to={`/hsc/${groupInfo.id}/${subject.id}`}
                  className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                      {subject.icon}
                    </div>
                    <span className="font-medium text-gray-800">{subject.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 🟢 4. Important Section */}
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          গুরুত্বপূর্ণ তথ্য <span className={groupInfo.accentColor}>Important</span>
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
          <div className={`bg-gradient-to-br ${groupInfo.bgLight} to-teal-50 rounded-2xl p-6 border-2 ${groupInfo.borderColor} hover:border-green-400 transition-all duration-300 hover:shadow-lg`}>
            <div className={`w-14 h-14 ${groupInfo.bgLight} rounded-xl flex items-center justify-center text-3xl mb-4`}>
              📊
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Result Section</h3>
            <p className="text-gray-600 text-sm mb-4">ফলাফল ও গ্রেড পয়েন্ট</p>
            <Link to="/hsc/result" className={`${groupInfo.accentColor} font-medium hover:opacity-80 flex items-center gap-1`}>
              দেখুন <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Study Resources */}
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">স্টাডি রিসোর্স</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`${groupInfo.bgLight} rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer border ${groupInfo.borderColor}`}>
              <div className="text-4xl mb-3">📚</div>
              <h4 className="font-semibold text-gray-800">নোটস</h4>
              <p className="text-sm text-gray-600">PDF ডাউনলোড</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer border border-blue-200">
              <div className="text-4xl mb-3">❓</div>
              <h4 className="font-semibold text-gray-800">MCQ</h4>
              <p className="text-sm text-gray-600">Multiple Choice</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer border border-purple-200">
              <div className="text-4xl mb-3">📝</div>
              <h4 className="font-semibold text-gray-800">CQ</h4>
              <p className="text-sm text-gray-600">Creative Question</p>
            </div>
            <div className="bg-red-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer border border-red-200">
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

export default HscGroup;
