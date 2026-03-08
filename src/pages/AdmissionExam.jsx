import { useState } from 'react';
import { Link } from 'react-router-dom';

// Quick tags for filtering
const tags = ["একাডেমিক", "ভর্তি", "চাকরি", "বৃত্তি", "আইসিটি", "বিসিএস", "নোটিশ", "ফলাফল"];

// Admission exam categories
const examCategories = [
  {
    id: 'university',
    title: 'বিশ্ববিদ্যালয় ভর্তি',
    titleEn: 'University Admission',
    icon: '🎓',
    color: 'from-blue-500 to-blue-600',
    exams: [
      { id: 'bu', title: 'বিশ্ববিদ্যালয় ভর্তি', titleEn: 'BU Admission' },
      { id: 'du', title: 'ঢাকা বিশ্ববিদ্যালয়', titleEn: 'DU Admission' },
      { id: 'cu', title: 'চট্টগ্রাম বিশ্ববিদ্যালয়', titleEn: 'CU Admission' },
      { id: 'ru', title: 'রাজশাহী বিশ্ববিদ্যালয়', titleEn: 'RU Admission' },
      { id: 'ku', title: 'খুলনা বিশ্ববিদ্যালয়', titleEn: 'KU Admission' },
      { id: 'medical', title: 'মেডিকেল কলেজ', titleEn: 'Medical College' },
      { id: 'engineering', title: 'ইঞ্জিনিয়ারিং বিশ্ববিদ্যালয়', titleEn: 'Engineering University' },
    ],
  },
  {
    id: 'bcs',
    title: 'বিসিএস প্রস্তুতি',
    titleEn: 'BCS Preparation',
    icon: '📋',
    color: 'from-purple-500 to-purple-600',
    exams: [
      { id: 'bcs-notice', title: 'বিসিএস নোটিশ', titleEn: 'BCS Notice' },
      { id: 'bcs-syllabus', title: 'সিলেবাস', titleEn: 'Syllabus' },
      { id: 'bcs-question', title: 'বিগত বছরের প্রশ্ন', titleEn: 'Previous Questions' },
      { id: 'bcs-notes', title: 'নোটস', titleEn: 'Notes' },
      { id: 'bcs-model-test', title: 'মডেল টেস্ট', titleEn: 'Model Test' },
      { id: 'bcs-interview', title: 'ইন্টারভিউ গাইড', titleEn: 'Interview Guide' },
    ],
  },
  {
    id: 'jobs',
    title: 'চাকরি খবর',
    titleEn: 'Job Circulars',
    icon: '💼',
    color: 'from-green-500 to-green-600',
    exams: [
      { id: 'bank-job', title: 'ব্যাংক জব', titleEn: 'Bank Job' },
      { id: 'govt-job', title: 'সরকারি চাকরি', titleEn: 'Government Job' },
      { id: 'ngo-job', title: 'এনজিও চাকরি', titleEn: 'NGO Job' },
      { id: 'private-job', title: 'প্রাইভেট চাকরি', titleEn: 'Private Job' },
      { id: 'defense', title: 'প্রতিরক্ষা বাহিনী', titleEn: 'Defense Forces' },
    ],
  },
  {
    id: 'scholarship',
    title: 'বৃত্তি',
    titleEn: 'Scholarships',
    icon: '🏆',
    color: 'from-yellow-500 to-yellow-600',
    exams: [
      { id: 'merit-scholarship', title: 'মেধা বৃত্তি', titleEn: 'Merit Scholarship' },
      { id: 'financial-aid', title: 'আর্থিক সহায়তা', titleEn: 'Financial Aid' },
      { id: 'int-scholarship', title: 'আন্তর্জাতিক বৃত্তি', titleEn: 'International Scholarship' },
    ],
  },
];

const AdmissionExam = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const filteredCategories = examCategories.filter(category => 
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.exams.some(exam => 
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.titleEn.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🟢 Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 py-16 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Admission Exam</h1>
        <p className="text-lg opacity-90 mb-8 font-light">সর্বশেষ আপডেট, টিপস এবং গুরুত্বপূর্ণ তথ্য</p>
        
        {/* Quick Tags */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {tags.map((tag, index) => (
            <button 
              key={index} 
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full text-sm backdrop-blur-md transition ${
                selectedTag === tag ? 'bg-white text-green-700' : ''
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 🟢 Search & Filter Bar */}
      <div className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-1/3">
            <input 
              type="text" 
              placeholder="🔍 পোস্ট খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full shadow-lg border-none focus:ring-2 focus:ring-green-500 outline-none text-gray-700"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* View Toggle (Grid/List) */}
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-3 bg-white shadow-md rounded-lg ${viewMode === 'grid' ? 'text-green-600' : 'text-gray-400'}`}
            >
              🔳
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-3 bg-white shadow-md rounded-lg ${viewMode === 'list' ? 'text-green-600' : 'text-gray-400'}`}
            >
              ≡
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 Categories Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          পরীক্ষার ধরন <span className="text-green-600">Exam Categories</span>
        </h2>

        {filteredCategories.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-4'}>
            {filteredCategories.map((category) => (
              <div 
                key={category.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <button
                  onClick={() => setSelectedCategory(selectedCategory?.id === category.id ? null : category)}
                  className={`w-full text-left bg-gradient-to-r ${category.color} p-6 text-white ${
                    viewMode === 'list' ? 'w-64 flex-shrink-0' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{category.title}</h3>
                      <p className="text-white/80 text-sm">{category.titleEn}</p>
                    </div>
                  </div>
                </button>
                
                {/* Expanded Exams List */}
                {selectedCategory?.id === category.id && (
                  <div className="p-4 bg-gray-50">
                    <div className="space-y-2">
                      {category.exams.map((exam) => (
                        <Link
                          key={exam.id}
                          to={`/admission/${category.id}/${exam.id}`}
                          className="block px-4 py-2 bg-white rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors text-gray-700"
                        >
                          <span className="font-medium">{exam.title}</span>
                          <span className="text-xs text-gray-400 ml-2">({exam.titleEn})</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">কোনো ক্যাটাগরি পাওয়া যায়নি।</p>
          </div>
        )}

        {searchQuery && (
          <p className="text-center text-gray-500 mt-4">
            {filteredCategories.length}টি ক্যাটাগরি পাওয়া গেছে
          </p>
        )}
      </div>

      {/* 🟢 Important Links Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          গুরুত্বপূর্ণ লিংক <span className="text-green-600">Important Links</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Recent Admissions */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-3xl mb-4">
              📢
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">সাম্প্রতিক ভর্তি</h3>
            <p className="text-gray-600 text-sm mb-4">সর্বশেষ ভর্তি বিজ্ঞপ্তি</p>
            <Link to="/admission/recent" className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
              দেখুন <span>→</span>
            </Link>
          </div>

          {/* Seat Plan */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-3xl mb-4">
              📋
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">সিট প্ল্যান</h3>
            <p className="text-gray-600 text-sm mb-4">পরীক্ষার সিট প্ল্যান</p>
            <Link to="/admission/seat-plan" className="text-purple-600 font-medium hover:text-purple-700 flex items-center gap-1">
              দেখুন <span>→</span>
            </Link>
          </div>

          {/* Admit Card */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-3xl mb-4">
              🎫
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">অ্যাডমিট কার্ড</h3>
            <p className="text-gray-600 text-sm mb-4">ডাউনলোড অ্যাডমিট কার্ড</p>
            <Link to="/admission/admit-card" className="text-green-600 font-medium hover:text-green-700 flex items-center gap-1">
              দেখুন <span>→</span>
            </Link>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-3xl mb-4">
              📊
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">ফলাফল</h3>
            <p className="text-gray-600 text-sm mb-4">পরীক্ষার ফলাফল</p>
            <Link to="/admission/result" className="text-orange-600 font-medium hover:text-orange-700 flex items-center gap-1">
              দেখুন <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 🟢 Tips & Tricks Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">প্রস্তুতি টিপস</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                📚
              </div>
              <h4 className="font-semibold text-gray-800">সিলেবাস পড়ুন</h4>
              <p className="text-sm text-gray-600">পূর্ণ সিলেবাস জানুন</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                ✍️
              </div>
              <h4 className="font-semibold text-gray-800">নিয়মিত লিখুন</h4>
              <p className="text-sm text-gray-600">হাতের লেখা ভালো রাখুন</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                ⏰
              </div>
              <h4 className="font-semibold text-gray-800">সময় ব্যবস্থাপনা</h4>
              <p className="text-sm text-gray-600">সময়মতো প্রশ্ন সমাধান</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                🔄
              </div>
              <h4 className="font-semibold text-gray-800">রিভিশন দিন</h4>
              <p className="text-sm text-gray-600">বারবার পুনরাবৃত্তি করুন</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionExam;
