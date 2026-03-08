import { useState } from 'react';
import { Link } from 'react-router-dom';

// Masters Programs data
const programs = [
  {
    id: 'ma',
    title: "এম.এ (MA)",
    fullTitle: "Master of Arts",
    icon: "🏛️",
    color: "from-blue-500 to-blue-600",
    subjects: [
      { id: 'bangla', title: 'বাংলা', titleEn: 'Bangla' },
      { id: 'english', title: 'ইংরেজি', titleEn: 'English' },
      { id: 'history', title: 'ইতিহাস', titleEn: 'History' },
      { id: 'political-science', title: 'রাষ্ট্রবিজ্ঞান', titleEn: 'Political Science' },
      { id: 'philosophy', title: 'দর্শন', titleEn: 'Philosophy' },
      { id: 'islamic-studies', title: 'ইসলামি শিক্ষা', titleEn: 'Islamic Studies' },
    ],
  },
  {
    id: 'mss',
    title: "এম.এস.এস (MSS)",
    fullTitle: "Master of Social Science",
    icon: "🤝",
    color: "from-green-500 to-green-600",
    subjects: [
      { id: 'economics', title: 'অর্থনীতি', titleEn: 'Economics' },
      { id: 'sociology', title: 'সমাজবিজ্ঞান', titleEn: 'Sociology' },
      { id: 'public-administration', title: 'লোকপ্রশাসন', titleEn: 'Public Administration' },
      { id: 'anthropology', title: 'নৃবিজ্ঞান', titleEn: 'Anthropology' },
      { id: 'journalism', title: 'সাংবাদিকতা', titleEn: 'Journalism' },
      { id: 'social-work', title: 'সামাজিক কাজ', titleEn: 'Social Work' },
    ],
  },
  {
    id: 'msc',
    title: "এম.এস.সি (MSc)",
    fullTitle: "Master of Science",
    icon: "🔬",
    color: "from-red-500 to-red-600",
    subjects: [
      { id: 'math', title: 'গণিত', titleEn: 'Mathematics' },
      { id: 'physics', title: 'পদার্থবিজ্ঞান', titleEn: 'Physics' },
      { id: 'chemistry', title: 'রসায়ন', titleEn: 'Chemistry' },
      { id: 'botany', title: 'উদ্ভিদবিজ্ঞান', titleEn: 'Botany' },
      { id: 'zoology', title: 'প্রাণিবিজ্ঞান', titleEn: 'Zoology' },
      { id: 'statistics', title: 'পরিসংখ্যান', titleEn: 'Statistics' },
      { id: 'microbiology', title: 'মাইক্রোবায়োলজি', titleEn: 'Microbiology' },
    ],
  },
  {
    id: 'mba',
    title: "এম.বি.এ (MBA)",
    fullTitle: "Master of Business Administration",
    icon: "💼",
    color: "from-yellow-500 to-yellow-600",
    subjects: [
      { id: 'management', title: 'ম্যানেজমেন্ট', titleEn: 'Management' },
      { id: 'accounting', title: 'অ্যাকাউন্টিং', titleEn: 'Accounting' },
      { id: 'marketing', title: 'মার্কেটিং', titleEn: 'Marketing' },
      { id: 'finance', title: 'ফিন্যান্স', titleEn: 'Finance' },
      { id: 'banking', title: 'ব্যাংকিং', titleEn: 'Banking' },
      { id: 'hrm', title: 'মানব সম্পদ', titleEn: 'Human Resource Management' },
    ],
  },
  {
    id: 'llm',
    title: "এল.এল.এম (LLM)",
    fullTitle: "Master of Laws",
    icon: "⚖️",
    color: "from-gray-600 to-gray-700",
    subjects: [
      { id: 'constitutional-law', title: 'সংবিধান আইন', titleEn: 'Constitutional Law' },
      { id: 'criminal-law', title: 'ফৌজদারি আইন', titleEn: 'Criminal Law' },
      { id: 'international-law', title: 'আন্তর্জাতিক আইন', titleEn: 'International Law' },
      { id: 'corporate-law', title: 'কর্পোরেট আইন', titleEn: 'Corporate Law' },
      { id: 'environmental-law', title: 'পরিবেশ আইন', titleEn: 'Environmental Law' },
    ],
  },
  {
    id: 'meng',
    title: "এম.এনজি (MEng)",
    fullTitle: "Master of Engineering",
    icon: "🔧",
    color: "from-orange-500 to-orange-600",
    subjects: [
      { id: 'cse', title: 'কম্পিউটার সায়েন্স', titleEn: 'Computer Science' },
      { id: 'eee', title: 'ইলেকট্রিক্যাল', titleEn: 'Electrical Engineering' },
      { id: 'civil', title: 'সিভিল ইঞ্জিনিয়ারিং', titleEn: 'Civil Engineering' },
      { id: 'mechanical', title: 'মেকানিক্যাল', titleEn: 'Mechanical Engineering' },
    ],
  },
];

const years = [
  { id: '1st-semester', title: '১ম সেমিস্টার', titleEn: '1st Semester' },
  { id: '2nd-semester', title: '২য় সেমিস্টার', titleEn: '2nd Semester' },
  { id: '3rd-semester', title: '৩য় সেমিস্টার', titleEn: '3rd Semester' },
  { id: '4th-semester', title: '৪র্থ সেমিস্টার', titleEn: '4th Semester' },
];

const MastersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = 
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.fullTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.subjects.some(s => 
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.titleEn.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesSearch;
  });

  const handleProgramClick = (program) => {
    setSelectedProgram(selectedProgram?.id === program.id ? null : program);
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
          <span className="text-green-600 font-medium">Masters</span>
        </nav>
      </div>

      {/* 🟢 Hero Section */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Masters Academic Section</h1>
            <p className="text-xl md:text-2xl mb-2 font-medium">(স্নাতকোত্তর)</p>
            <p className="text-green-100 text-lg mb-8">
              "স্নাতকোত্তর পর্যায়ের সকল বিষয়, গবেষণা পেপার, থিসিস গাইড ও গুরুত্বপূর্ণ তথ্য এখানে পাওয়া যাবে।"
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link 
                to="#programs" 
                className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>📚</span>
                <span>View Programs</span>
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
              placeholder="🔍 প্রোগ্রাম বা সাবজেক্ট খুঁজুন / Search program or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-white rounded-2xl shadow-lg border-2 border-green-100 focus:border-green-500 focus:outline-none text-lg"
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
              {filteredPrograms.length}টি প্রোগ্রাম পাওয়া গেছে
            </p>
          )}
        </div>
      </div>

      {/* 🟢 Programs Section */}
      <div id="programs" className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          প্রোগ্রাম সমূহ <span className="text-green-600">Programs</span>
        </h2>
        
        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <div 
              key={program.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                selectedProgram?.id === program.id ? 'ring-4 ring-green-500' : ''
              }`}
            >
              <button
                onClick={() => handleProgramClick(program)}
                className={`w-full text-left bg-gradient-to-r ${program.color} p-6 text-white`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                    {program.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{program.title}</h3>
                    <p className="text-white/80 text-sm">{program.fullTitle}</p>
                  </div>
                </div>
              </button>
              
              {/* Expanded Subjects */}
              {selectedProgram?.id === program.id && (
                <div className="p-6 bg-gray-50">
                  <h4 className="font-semibold text-gray-800 mb-3">বিষয়সমূহ / Subjects:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {program.subjects.map((subject) => (
                      <div key={subject.id}>
                        <Link
                          to={`/masters/${program.id}/${subject.id}`}
                          className="block px-4 py-2 bg-white rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors text-gray-700"
                        >
                          <span className="font-medium">{subject.title}</span>
                          <span className="text-xs text-gray-400 ml-2">({subject.titleEn})</span>
                        </Link>
                        
                        {/* Semester Selection */}
                        {selectedSubject?.id === subject.id && (
                          <div className="ml-4 mt-2 p-3 bg-white rounded-lg border">
                            <p className="text-sm font-medium text-gray-600 mb-2">সেমিস্টার নির্বাচন করুন / Select Semester:</p>
                            <div className="grid grid-cols-2 gap-2">
                              {years.map((year) => (
                                <Link
                                  key={year.id}
                                  to={`/masters/${program.id}/${subject.id}/${year.id}`}
                                  className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-center hover:bg-green-200 transition-colors text-sm font-medium"
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

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">কোনো প্রোগ্রাম পাওয়া যায়নি।</p>
            <p className="text-gray-400">অন্য কিছু খুঁজে দেখুন।</p>
          </div>
        )}
      </div>

      {/* 🟢 Research & Thesis Section (Masters Special) */}
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          গবেষণা ও থিসিস <span className="text-green-600">Research & Thesis</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Research Paper */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-3xl mb-4">
              📑
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">রিসার্চ পেপার</h3>
            <p className="text-gray-600 text-sm mb-4">নমুনা ও ফরম্যাট</p>
            <Link to="/masters/research-papers" className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
              দেখুন <span>→</span>
            </Link>
          </div>

          {/* Thesis Guide */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-3xl mb-4">
              🎓
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">থিসিস গাইড</h3>
            <p className="text-gray-600 text-sm mb-4">সহায়ক গাইডলাইন</p>
            <Link to="/masters/thesis-guide" className="text-purple-600 font-medium hover:text-purple-700 flex items-center gap-1">
              দেখুন <span>→</span>
            </Link>
          </div>

          {/* Seminar Notes */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-3xl mb-4">
              🔍
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">সেমিনার নোটস</h3>
            <p className="text-gray-600 text-sm mb-4">বিভাগ ভিত্তিক</p>
            <Link to="/masters/seminar-notes" className="text-green-600 font-medium hover:text-green-700 flex items-center gap-1">
              দেখুন <span>→</span>
            </Link>
          </div>

          {/* Online Library */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-3xl mb-4">
              📡
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">অনলাইন লাইব্রেরি</h3>
            <p className="text-gray-600 text-sm mb-4">ই-বুক এক্সেস</p>
            <Link to="/masters/library" className="text-orange-600 font-medium hover:text-orange-700 flex items-center gap-1">
              দেখুন <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 🟢 Important Section */}
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          গুরুত্বপূর্ণ তথ্য <span className="text-green-600">Important</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Suggestion */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-3xl mb-4">
              🔥
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Masters Suggestion</h3>
            <p className="text-gray-600 text-sm mb-4">স্নাতকোত্তর পরীক্ষার সাজেশন</p>
            <Link to="/masters/suggestion" className="text-orange-600 font-medium hover:text-orange-700 flex items-center gap-1">
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
            <Link to="/masters/notices" className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
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
            <Link to="/masters/result" className="text-green-600 font-medium hover:text-green-700 flex items-center gap-1">
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

export default MastersPage;
