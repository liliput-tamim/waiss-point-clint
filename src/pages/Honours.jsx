import { useState } from 'react';
import { Link } from 'react-router-dom';

// Faculty data for Honours
const faculties = [
  {
    id: 'arts',
    title: "কলা অনুষদ",
    engTitle: "Faculty of Arts",
    icon: "🖋️",
    subjects: [
      { id: 'bangla', title: 'বাংলা', titleEn: 'Bangla' },
      { id: 'english', title: 'ইংরেজি', titleEn: 'English' },
      { id: 'history', title: 'ইতিহাস', titleEn: 'History' },
      { id: 'philosophy', title: 'দর্শন', titleEn: 'Philosophy' },
      { id: 'islamic-studies', title: 'ইসলামি শিক্ষা', titleEn: 'Islamic Studies' },
      { id: 'theater', title: 'নাটক ও নাট্যতত্ত্ব', titleEn: 'Theatre & Dramatics' },
      { id: 'music', title: 'সংগীত', titleEn: 'Music' },
    ],
  },
  {
    id: 'social-science',
    title: "সামাজিক বিজ্ঞান অনুষদ",
    engTitle: "Faculty of Social Science",
    icon: "🌍",
    subjects: [
      { id: 'economics', title: 'অর্থনীতি', titleEn: 'Economics' },
      { id: 'political-science', title: 'রাষ্ট্রবিজ্ঞান', titleEn: 'Political Science' },
      { id: 'sociology', title: 'সমাজবিজ্ঞান', titleEn: 'Sociology' },
      { id: 'geography', title: 'ভূগোল', titleEn: 'Geography' },
      { id: 'anthropology', title: 'নৃবিজ্ঞান', titleEn: 'Anthropology' },
      { id: 'journalism', title: 'সাংবাদিকতা', titleEn: 'Journalism' },
      { id: 'public-administration', title: 'জনপ্রশাসন', titleEn: 'Public Administration' },
    ],
  },
  {
    id: 'science',
    title: "বিজ্ঞান অনুষদ",
    engTitle: "Faculty of Science",
    icon: "🧪",
    subjects: [
      { id: 'math', title: 'গণিত', titleEn: 'Mathematics' },
      { id: 'physics', title: 'পদার্থবিজ্ঞান', titleEn: 'Physics' },
      { id: 'chemistry', title: 'রসায়ন', titleEn: 'Chemistry' },
      { id: 'botany', title: 'উদ্ভিদবিজ্ঞান', titleEn: 'Botany' },
      { id: 'zoology', title: 'প্রাণিবিজ্ঞান', titleEn: 'Zoology' },
      { id: 'microbiology', title: 'মাইক্রোবায়োলজি', titleEn: 'Microbiology' },
      { id: 'statistics', title: 'পরিসংখ্যান', titleEn: 'Statistics' },
    ],
  },
  {
    id: 'business',
    title: "ব্যবসায় শিক্ষা অনুষদ",
    engTitle: "Faculty of Business Studies",
    icon: "📊",
    subjects: [
      { id: 'management', title: 'ম্যানেজমেন্ট', titleEn: 'Management' },
      { id: 'accounting', title: 'অ্যাকাউন্টিং', titleEn: 'Accounting' },
      { id: 'marketing', title: 'মার্কেটিং', titleEn: 'Marketing' },
      { id: 'finance', title: 'ফিন্যান্স', titleEn: 'Finance' },
      { id: 'banking', title: 'ব্যাংকিং', titleEn: 'Banking' },
      { id: 'insurance', title: 'বীমা', titleEn: 'Insurance' },
      { id: 'hrm', title: 'মানব সম্পদ ব্যবস্থাপনা', titleEn: 'Human Resource Management' },
    ],
  },
  {
    id: 'law',
    title: "আইন অনুষদ",
    engTitle: "Faculty of Law",
    icon: "⚖️",
    subjects: [
      { id: 'constitutional-law', title: 'সংবিধান আইন', titleEn: 'Constitutional Law' },
      { id: 'criminal-law', title: 'ফৌজদারি আইন', titleEn: 'Criminal Law' },
      { id: 'civil-law', title: 'দেওয়ানি আইন', titleEn: 'Civil Law' },
      { id: 'international-law', title: 'আন্তর্জাতিক আইন', titleEn: 'International Law' },
      { id: 'corporate-law', title: 'কর্পোরেট আইন', titleEn: 'Corporate Law' },
    ],
  },
  {
    id: 'engineering',
    title: "প্রকৌশল অনুষদ",
    engTitle: "Faculty of Engineering",
    icon: "🔧",
    subjects: [
      { id: 'cse', title: 'কম্পিউটার সায়েন্স', titleEn: 'Computer Science & Engineering' },
      { id: 'eee', title: 'ইলেকট্রিক্যাল', titleEn: 'Electrical & Electronic Engineering' },
      { id: 'ce', title: 'সিভিল', titleEn: 'Civil Engineering' },
      { id: 'me', title: 'মেকানিক্যাল', titleEn: 'Mechanical Engineering' },
    ],
  },
];

const years = [
  { id: '1st-year', title: '১ম বর্ষ', titleEn: '1st Year' },
  { id: '2nd-year', title: '২য় বর্ষ', titleEn: '2nd Year' },
  { id: '3rd-year', title: '৩য় বর্ষ', titleEn: '3rd Year' },
  { id: '4th-year', title: '৪র্থ বর্ষ', titleEn: '4th Year' },
];

const Honours = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const filteredFaculties = faculties.filter(faculty => {
    const matchesSearch = 
      faculty.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.engTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.subjects.some(s => 
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.titleEn.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesSearch;
  });

  const handleFacultyClick = (faculty) => {
    setSelectedFaculty(selectedFaculty?.id === faculty.id ? null : faculty);
    setSelectedSubject(null);
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(selectedSubject?.id === subject.id ? null : subject);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-6">
        <nav className="flex items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-green-600 transition-colors">হোম</Link>
          <span className="mx-2">/</span>
          <span className="text-green-600 font-medium">Honours</span>
        </nav>
      </div>

      {/* 🟢 Hero Section */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Honours Academic Section</h1>
            <p className="text-xl md:text-2xl mb-2 font-medium">(স্নাতক সম্মান)</p>
            <p className="text-purple-100 text-lg mb-8">
              "স্নাতক (সম্মান) পর্যায়ের সকল বিষয়, নোট, সাজেশন ও গুরুত্বপূর্ণ তথ্য এখানে পাওয়া যাবে।"
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link 
                to="#faculties" 
                className="bg-white text-purple-700 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>📚</span>
                <span>View Faculties</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 🟢 Search Bar */}
      <div className="container mx-auto px-4 mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 সাবজেক্ট বা অনুষদ খুঁজুন / Search subject or faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-white rounded-2xl shadow-lg border-2 border-purple-100 focus:border-purple-500 focus:outline-none text-lg"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-center text-gray-500 mt-2">
              {filteredFaculties.length}টি অনুষদ পাওয়া গেছে
            </p>
          )}
        </div>
      </div>

      {/* 🟢 Faculty Selection Section */}
      <div id="faculties" className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          অ্যাকাডেমিক অনুষদ <span className="text-purple-600">Academic Faculties</span>
        </h2>
        
        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculties.map((faculty) => (
            <div 
              key={faculty.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                selectedFaculty?.id === faculty.id ? 'ring-4 ring-purple-500' : ''
              }`}
            >
              <button
                onClick={() => handleFacultyClick(faculty)}
                className={`w-full text-left bg-gradient-to-r ${faculty.id === 'arts' ? 'from-blue-500 to-blue-600' : faculty.id === 'social-science' ? 'from-green-500 to-green-600' : faculty.id === 'science' ? 'from-red-500 to-red-600' : faculty.id === 'business' ? 'from-yellow-500 to-yellow-600' : faculty.id === 'law' ? 'from-gray-600 to-gray-700' : 'from-orange-500 to-orange-600'} p-6 text-white`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                    {faculty.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{faculty.title}</h3>
                    <p className="text-white/80 text-sm">{faculty.engTitle}</p>
                  </div>
                </div>
              </button>
              
              {/* Expanded Subjects */}
              {selectedFaculty?.id === faculty.id && (
                <div className="p-6 bg-gray-50">
                  <h4 className="font-semibold text-gray-800 mb-3">বিষয়সমূহ / Subjects:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {faculty.subjects.map((subject) => (
                      <div key={subject.id}>
                        <Link
                          to={`/honours/${faculty.id}/${subject.id}`}
                          className="block px-4 py-2 bg-white rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors text-gray-700"
                        >
                          <span className="font-medium">{subject.title}</span>
                          <span className="text-xs text-gray-400 ml-2">({subject.titleEn})</span>
                        </Link>
                        
                        {/* Year Selection */}
                        {selectedSubject?.id === subject.id && (
                          <div className="ml-4 mt-2 p-3 bg-white rounded-lg border">
                            <p className="text-sm font-medium text-gray-600 mb-2">বর্ষ নির্বাচন করুন / Select Year:</p>
                            <div className="grid grid-cols-2 gap-2">
                              {years.map((year) => (
                                <Link
                                  key={year.id}
                                  to={`/honours/${faculty.id}/${subject.id}/${year.id}`}
                                  className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-center hover:bg-purple-200 transition-colors text-sm font-medium"
                                >
                                  {year.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFaculties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">কোনো অনুষদ পাওয়া যায়নি।</p>
            <p className="text-gray-400">অন্য কিছু খুঁজে দেখুন।</p>
          </div>
        )}
      </div>

      {/* 🟢 Important Section */}
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          গুরুত্বপূর্ণ তথ্য <span className="text-purple-600">Important</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Suggestion */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-3xl mb-4">
              🔥
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Honours Suggestion</h3>
            <p className="text-gray-600 text-sm mb-4">স্নাতক পরীক্ষার জন্য গুরুত্বপূর্ণ সাজেশন</p>
            <Link to="/honours/suggestion" className="text-orange-600 font-medium hover:text-orange-700 flex items-center gap-1">
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
            <Link to="/honours/notices" className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
              দেখুন <span>→</span>
            </Link>
          </div>

          {/* Routine */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-3xl mb-4">
              📅
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Exam Routine</h3>
            <p className="text-gray-600 text-sm mb-4">পরীক্ষার রুটিন ও সময়সূচি</p>
            <Link to="/honours/routine" className="text-purple-600 font-medium hover:text-purple-700 flex items-center gap-1">
              দেখুন <span>→</span>
            </Link>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-3xl mb-4">
              📊
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Result Section</h3>
            <p className="text-gray-600 text-sm mb-4">ফলাফল ও গ্রেড পয়েন্ট</p>
            <Link to="/honours/result" className="text-green-600 font-medium hover:text-green-700 flex items-center gap-1">
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
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
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
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                📝
              </div>
              <h4 className="font-semibold text-gray-800">CQ প্রশ্ন</h4>
              <p className="text-sm text-gray-600">সমাধান দেখুন</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
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

export default Honours;
