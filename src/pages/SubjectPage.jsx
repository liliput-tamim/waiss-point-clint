import { useParams, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Subject data for all classes including groups for Class 9-10
const subjectData = {
  'class-6': {
    'bangla': { title: 'বাংলা', icon: '📚', description: 'ষষ্ঠ শ্রেণি - বাংলা' },
    'english': { title: 'English', icon: '📖', description: 'Class 6 - English' },
    'math': { title: 'গণিত', icon: '🔢', description: 'ষষ্ঠ শ্রেণি - গণিত' },
    'science': { title: 'সাধারণ বিজ্ঞান', icon: '🔬', description: 'ষষ্ঠ শ্রেণি - সাধারণ বিজ্ঞান' },
    'social': { title: 'বাংলাদেশ ও বিশ্বপরিচয়', icon: '🌍', description: 'ষষ্ঠ শ্রেণি - বাংলাদেশ ও বিশ্বপরিচয়' },
    'islam': { title: 'ইসলাম ও নৈতিক শিক্ষা', icon: '🕌', description: 'ষষ্ঠ শ্রেণি - ইসলাম ও নৈতিক শিক্ষা' },
    'hindu': { title: 'হিন্দুধর্ম ও নৈতিক শিক্ষা', icon: '🪔', description: 'ষষ্ঠ শ্রেণি - হিন্দুধর্ম ও নৈতিক শিক্ষা' },
    'buddha': { title: 'বৌদ্ধধর্ম ও নৈতিক শিক্ষা', icon: '☸️', description: 'ষষ্ঠ শ্রেণি - বৌদ্ধধর্ম ও নৈতিক শিক্ষা' },
    'christian': { title: 'খ্রিস্টধর্ম ও নৈতিক শিক্ষা', icon: '✝️', description: 'ষষ্ঠ শ্রেণি - খ্রিস্টধর্ম ও নৈতিক শিক্ষা' },
    'ict': { title: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', icon: '💻', description: 'ষষ্ঠ শ্রেণি - ICT' },
    'art': { title: 'শিল্প ও সংস্কৃতি', icon: '🎨', description: 'ষষ্ঠ শ্রেণি - শিল্প ও সংস্কৃতি' },
    'health': { title: 'শারীরিক শিক্ষা ও স্বাস্থ্য', icon: '🏃', description: 'ষষ্ঠ শ্রেণি - শারীরিক শিক্ষা ও স্বাস্থ্য' },
    'agriculture': { title: 'কৃষি শিক্ষা / গার্হস্থ্য বিজ্ঞান', icon: '🌾', description: 'ষষ্ঠ শ্রেণি - কৃষি শিক্ষা' },
  },
  'class-7': {
    'bangla': { title: 'বাংলা', icon: '📚', description: 'সপ্তম শ্রেণি - বাংলা' },
    'english': { title: 'English', icon: '📖', description: 'Class 7 - English' },
    'math': { title: 'গণিত', icon: '🔢', description: 'সপ্তম শ্রেণি - গণিত' },
    'science': { title: 'সাধারণ বিজ্ঞান', icon: '🔬', description: 'সপ্তম শ্রেণি - সাধারণ বিজ্ঞান' },
    'social': { title: 'বাংলাদেশ ও বিশ্বপরিচয়', icon: '🌍', description: 'সপ্তম শ্রেণি - বাংলাদেশ ও বিশ্বপরিচয়' },
    'religion': { title: 'ধর্ম ও নৈতিক শিক্ষা', icon: '🙏', description: 'সপ্তম শ্রেণি - ধর্ম ও নৈতিক শিক্ষা' },
    'islam': { title: 'ইসলাম ও নৈতিক শিক্ষা', icon: '🕌', description: 'সপ্তম শ্রেণি - ইসলাম ও নৈতিক শিক্ষা' },
    'hindu': { title: 'হিন্দুধর্ম ও নৈতিক শিক্ষা', icon: '🪔', description: 'সপ্তম শ্রেণি - হিন্দুধর্ম ও নৈতিক শিক্ষা' },
    'buddha': { title: 'বৌদ্ধধর্ম ও নৈতিক শিক্ষা', icon: '☸️', description: 'সপ্তম শ্রেণি - বৌদ্ধধর্ম ও নৈতিক শিক্ষা' },
    'christian': { title: 'খ্রিস্টধর্ম ও নৈতিক শিক্ষা', icon: '✝️', description: 'সপ্তম শ্রেণি - খ্রিস্টধর্ম ও নৈতিক শিক্ষা' },
    'ict': { title: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', icon: '💻', description: 'সপ্তম শ্রেণি - ICT' },
    'art': { title: 'শিল্প ও সংস্কৃতি', icon: '🎨', description: 'সপ্তম শ্রেণি - শিল্প ও সংস্কৃতি' },
    'health': { title: 'শারীরিক শিক্ষা ও স্বাস্থ্য', icon: '🏃', description: 'সপ্তম শ্রেণি - শারীরিক শিক্ষা ও স্বাস্থ্য' },
    'agriculture': { title: 'কৃষি শিক্ষা / গার্হস্থ্য বিজ্ঞান', icon: '🌾', description: 'সপ্তম শ্রেণি - কৃষি শিক্ষা' },
  },
  'class-8': {
    'bangla': { title: 'বাংলা', icon: '📚', description: 'অষ্টম শ্রেণি - বাংলা' },
    'english': { title: 'English', icon: '📖', description: 'Class 8 - English' },
    'math': { title: 'গণিত', icon: '🔢', description: 'অষ্টম শ্রেণি - গণিত' },
    'science': { title: 'সাধারণ বিজ্ঞান', icon: '🔬', description: 'অষ্টম শ্রেণি - সাধারণ বিজ্ঞান' },
    'social': { title: 'বাংলাদেশ ও বিশ্বপরিচয়', icon: '🌍', description: 'অষ্টম শ্রেণি - বাংলাদেশ ও বিশ্বপরিচয়' },
    'religion': { title: 'ধর্ম ও নৈতিক শিক্ষা', icon: '🙏', description: 'অষ্টম শ্রেণি - ধর্ম ও নৈতিক শিক্ষা' },
    'islam': { title: 'ইসলাম ও নৈতিক শিক্ষা', icon: '🕌', description: 'অষ্টম শ্রেণি - ইসলাম ও নৈতিক শিক্ষা' },
    'hindu': { title: 'হিন্দুধর্ম ও নৈতিক শিক্ষা', icon: '🪔', description: 'অষ্টম শ্রেণি - হিন্দুধর্ম ও নৈতিক শিক্ষা' },
    'buddha': { title: 'বৌদ্ধধর্ম ও নৈতিক শিক্ষা', icon: '☸️', description: 'অষ্টম শ্রেণি - বৌদ্ধধর্ম ও নৈতিক শিক্ষা' },
    'christian': { title: 'খ্রিস্টধর্ম ও নৈতিক শিক্ষা', icon: '✝️', description: 'অষ্টম শ্রেণি - খ্রিস্টধর্ম ও নৈতিক শিক্ষা' },
    'ict': { title: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', icon: '💻', description: 'অষ্টম শ্রেণি - ICT' },
    'art': { title: 'শিল্প ও সংস্কৃতি', icon: '🎨', description: 'অষ্টম শ্রেণি - শিল্প ও সংস্কৃতি' },
    'health': { title: 'শারীরিক শিক্ষা ও স্বাস্থ্য', icon: '🏃', description: 'অষ্টম শ্রেণি - শারীরিক শিক্ষা ও স্বাস্থ্য' },
    'agriculture': { title: 'কৃষি শিক্ষা / গার্হস্থ্য বিজ্ঞান', icon: '🌾', description: 'অষ্টম শ্রেণি - কৃষি শিক্ষা' },
  },
  'class-9-10': {
    'bangla': { title: 'বাংলা', icon: '📚', description: 'নবম-দশম শ্রেণি - বাংলা' },
    'english': { title: 'English', icon: '📖', description: 'Class 9-10 - English' },
    'math': { title: 'গণিত', icon: '🔢', description: 'নবম-দশম শ্রেণি - গণিত' },
    'physics': { title: 'পদার্থবিজ্ঞান', icon: '⚛️', description: 'নবম-দশম শ্রেণি - পদার্থবিজ্ঞান' },
    'chemistry': { title: 'রসায়ন', icon: '🧪', description: 'নবম-দশম শ্রেণি - রসায়ন' },
    'biology': { title: 'জীববিজ্ঞান', icon: '🧬', description: 'নবম-দশম শ্রেণি - জীববিজ্ঞান' },
    'higher-math': { title: 'উচ্চতর গণিত', icon: '📐', description: 'নবম-দশম শ্রেণি - উচ্চতর গণিত' },
    'ict': { title: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', icon: '💻', description: 'নবম-দশম শ্রেণি - ICT' },
    'social': { title: 'বাংলাদেশ ও বিশ্বপরিচয়', icon: '🌍', description: 'নবম-দশম শ্রেণি - বাংলাদেশ ও বিশ্বপরিচয়' },
    'religion': { title: 'ধর্ম ও নৈতিক শিক্ষা', icon: '🙏', description: 'নবম-দশম শ্রেণি - ধর্ম ও নৈতিক শিক্ষা' },
    'accounting': { title: 'হিসাববিজ্ঞান', icon: '📊', description: 'নবম-দশম শ্রেণি - হিসাববিজ্ঞান' },
    'business-entrepreneurship': { title: 'ব্যবসায় উদ্যোগ', icon: '🚀', description: 'নবম-দশম শ্রেণি - ব্যবসায় উদ্যোগ' },
    'finance-banking': { title: 'ফাইন্যান্স ও ব্যাংকিং', icon: '🏦', description: 'নবম-দশম শ্রেণি - ফাইন্যান্স ও ব্যাংকিং' },
    'geography': { title: 'ভূগোল', icon: '🌏', description: 'নবম-দশম শ্রেণি - ভূগোল' },
    'history': { title: 'ইতিহাস', icon: '📜', description: 'নবম-দশম শ্রেণি - ইতিহাস' },
    'economics': { title: 'অর্থনীতি', icon: '📈', description: 'নবম-দশম শ্রেণি - অর্থনীতি' },
    'civics': { title: 'নাগরিক ও নৈতিক শিক্ষা', icon: '🏛️', description: 'নবম-দশম শ্রেণি - নাগরিক ও নৈতিক শিক্ষা' },
  },
  'hsc': {
    // Science Group
    'bangla-1st': { title: 'বাংলা ১ম পত্র', icon: '📚', description: 'HSC - বাংলা ১ম পত্র' },
    'bangla-2nd': { title: 'বাংলা ২য় পত্র', icon: '📚', description: 'HSC - বাংলা ২য় পত্র' },
    'english-1st': { title: 'English ১ম পত্র', icon: '📖', description: 'HSC - English ১ম পত্র' },
    'english-2nd': { title: 'English ২য় পত্র', icon: '📖', description: 'HSC - English ২য় পত্র' },
    'physics-1st': { title: 'পদার্থবিজ্ঞান ১ম পত্র', icon: '⚛️', description: 'HSC - পদার্থবিজ্ঞান ১ম পত্র' },
    'physics-2nd': { title: 'পদার্থবিজ্ঞান ২য় পত্র', icon: '⚛️', description: 'HSC - পদার্থবিজ্ঞান ২য় পত্র' },
    'chemistry-1st': { title: 'রসায়ন ১ম পত্র', icon: '🧪', description: 'HSC - রসায়ন ১ম পত্র' },
    'chemistry-2nd': { title: 'রসায়ন ২য় পত্র', icon: '🧪', description: 'HSC - রসায়ন ২য় পত্র' },
    'biology-1st': { title: 'জীববিজ্ঞান ১ম পত্র', icon: '🧬', description: 'HSC - জীববিজ্ঞান ১ম পত্র' },
    'biology-2nd': { title: 'জীববিজ্ঞান ২য় পত্র', icon: '🧬', description: 'HSC - জীববিজ্ঞান ২য় পত্র' },
    'higher-math-1st': { title: 'উচ্চতর গণিত ১ম পত্র', icon: '📐', description: 'HSC - উচ্চতর গণিত ১ম পত্র' },
    'higher-math-2nd': { title: 'উচ্চতর গণিত ২য় পত্র', icon: '📐', description: 'HSC - উচ্চতর গণিত ২য় পত্র' },
    'ict': { title: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', icon: '💻', description: 'HSC - ICT' },
    // Business Group
    'accounting-1st': { title: 'হিসাববিজ্ঞান ১ম পত্র', icon: '📊', description: 'HSC - হিসাববিজ্ঞান ১ম পত্র' },
    'accounting-2nd': { title: 'হিসাববিজ্ঞান ২য় পত্র', icon: '📊', description: 'HSC - হিসাববিজ্ঞান ২য় পত্র' },
    'business-org-1st': { title: 'ব্যবসায় সংগঠন ও ব্যবস্থাপনা ১ম পত্র', icon: '🚀', description: 'HSC - ব্যবসায় সংগঠন ও ব্যবস্থাপনা ১ম পত্র' },
    'business-org-2nd': { title: 'ব্যবসায় সংগঠন ও ব্যবস্থাপনা ২য় পত্র', icon: '🚀', description: 'HSC - ব্যবসায় সংগঠন ও ব্যবস্থাপনা ২য় পত্র' },
    'finance-1st': { title: 'ফাইন্যান্স, ব্যাংকিং ও বীমা ১ম পত্র', icon: '🏦', description: 'HSC - ফাইন্যান্স, ব্যাংকিং ও বীমা ১ম পত্র' },
    'finance-2nd': { title: 'ফাইন্যান্স, ব্যাংকিং ও বীমা ২য় পত্র', icon: '🏦', description: 'HSC - ফাইন্যান্স, ব্যাংকিং ও বীমা ২য় পত্র' },
    // Humanities Group
    'history-1st': { title: 'ইতিহাস ১ম পত্র', icon: '📜', description: 'HSC - ইতিহাস ১ম পত্র' },
    'history-2nd': { title: 'ইতিহাস ২য় পত্র', icon: '📜', description: 'HSC - ইতিহাস ২য় পত্র' },
    'islamic-history': { title: 'ইসলামের ইতিহাস', icon: '☪️', description: 'HSC - ইসলামের ইতিহাস' },
    'politics': { title: 'পৌরনীতি ও সুশাসন', icon: '🏛️', description: 'HSC - পৌরনীতি ও সুশাসন' },
    'sociology': { title: 'সমাজবিজ্ঞান', icon: '👥', description: 'HSC - সমাজবিজ্ঞান' },
    'social-work': { title: 'সমাজকর্ম', icon: '🤝', description: 'HSC - সমাজকর্ম' },
    'logic': { title: 'যুক্তিবিদ্যা', icon: '🧠', description: 'HSC - যুক্তিবিদ্যা' },
    'geography': { title: 'ভূগোল', icon: '🌍', description: 'HSC - ভূগোল' },
  },
};

// Group info for Class 9-10 and HSC
const groupInfo = {
  science: { title: 'বিজ্ঞান বিভাগ', titleEn: 'Science Group', icon: '🔬' },
  business: { title: 'ব্যবসায় শিক্ষা বিভাগ', titleEn: 'Business Studies Group', icon: '💼' },
  humanities: { title: 'মানবিক বিভাগ', titleEn: 'Humanities Group', icon: '📚' },
};

// Sample chapters for subjects
const chapterData = {
  physics: [
    { id: 1, title: 'ভৌত রাশি ও পরিমাপ' },
    { id: 2, title: 'গতি' },
    { id: 3, title: 'বল' },
    { id: 4, title: 'কাজ, শক্তি ও ক্ষমতা' },
    { id: 5, title: 'তরঙ্গ ও শব্দ' },
    { id: 6, title: 'আলো' },
    { id: 7, title: 'তাপ' },
    { id: 8, title: 'বিদ্যুৎ' },
  ],
  chemistry: [
    { id: 1, title: 'গুণগত রসায়ন' },
    { id: 2, title: 'মৌলের পর্যায়বৃত্তি' },
    { id: 3, title: 'রাসায়নিক বন্ধন' },
    { id: 4, title: 'রাসায়নিক গণনা' },
    { id: 5, title: 'পানি' },
    { id: 6, title: 'দ্রবণ' },
    { id: 7, title: 'প্রভাববিদ্যুৎ' },
    { id: 8, title: 'জৈব রসায়ন' },
  ],
  biology: [
    { id: 1, title: 'জীবনের প্রয়োজনীয়তা' },
    { id: 2, title: 'কোষ ও টিস্যু' },
    { id: 3, title: 'প্রথম শ্রেণির উদ্ভিদ' },
    { id: 4, title: 'দ্বিতীয় শ্রেণির উদ্ভিদ' },
    { id: 5, title: 'প্রাণী' },
    { id: 6, title: 'মানব শরীর' },
    { id: 7, title: 'পরিবেশ' },
    { id: 8, title: 'জীব প্রযুক্তি' },
  ],
  math: [
    { id: 1, title: 'বাস্তব সংখ্যা' },
    { id: 2, title: 'সেট ও ফাংশন' },
    { id: 3, title: 'বীজগণিতীয় রাশি' },
    { id: 4, title: 'সূচক ও লগারিদম' },
    { id: 5, title: 'সমান্তর ও গুণোত্তর অনুক্রম' },
    { id: 6, title: 'জ্যামিতি' },
    { id: 7, title: 'ত্রিকোণোমিতি' },
    { id: 8, title: 'সম্ভাবনা' },
  ],
  'higher-math': [
    { id: 1, title: 'ম্যাট্রিক্স' },
    { id: 2, title: 'ভেক্টর' },
    { id: 3, title: 'সমতলীয় জ্যামিতি' },
    { id: 4, title: 'অন্তরীকরণ' },
    { id: 5, title: 'সমাকলন' },
    { id: 6, title: 'জ্যামিতিক প্রয়োগ' },
  ],
};

const SubjectPage = () => {
  const { class: classLevel, group, subject } = useParams();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Determine class key - handle both class-9-10 and hsc routes
  let classKey = '';
  if (classLevel === '9-10') {
    classKey = 'class-9-10';
  } else if (classLevel) {
    classKey = `class-${classLevel}`;
  } else if (location.pathname.startsWith('/hsc/')) {
    // HSC route - class key is 'hsc'
    classKey = 'hsc';
  }

  // Get subject info
  const subjectInfo = subjectData[classKey]?.[subject];

  // Get group info for class 9-10
  const currentGroup = group ? groupInfo[group] : null;

  useEffect(() => {
    const token = localStorage.getItem('waisspointUser');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    if (comment.trim()) {
      setComments([...comments, { text: comment, date: new Date().toLocaleDateString() }]);
      setComment('');
    }
  };

  const classNames = {
    'class-6': 'Class 6',
    'class-7': 'Class 7',
    'class-8': 'Class 8',
    'class-9-10': 'Class 9-10',
    'hsc': 'HSC (Class 11-12)',
  };

  // Filter options
  const filters = [
    { id: 'all', label: 'সব', icon: '📚' },
    { id: 'notes', label: 'নোটস', icon: '📝' },
    { id: 'video', label: 'ভিডিও', icon: '🎥' },
    { id: 'mcq', label: 'MCQ', icon: '❓' },
    { id: 'cq', label: 'CQ', icon: '📋' },
    { id: 'suggestion', label: 'সাজেশন', icon: '⭐' },
  ];

  if (!subjectInfo) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">বিষয়টি পাওয়া যায়নি</h2>
            <p className="text-gray-600 mb-6">আপনি যে বিষয়টি খুঁজছেন সেটি আমাদের সিস্টেমে নেই।</p>
            <Link to="/" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get chapters for this subject
  const chapters = chapterData[subject] || [
    { id: 1, title: 'প্রথম অধ্যায়' },
    { id: 2, title: 'দ্বিতীয় অধ্যায়' },
    { id: 3, title: 'তৃতীয় অধ্যায়' },
    { id: 4, title: 'চতুর্থ অধ্যায়' },
    { id: 5, title: 'পঞ্চম অধ্যায়' },
    { id: 6, title: 'ষষ্ঠ অধ্যায়' },
    { id: 7, title: 'সপ্তম অধ্যায়' },
    { id: 8, title: 'অষ্টম অধ্যায়' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-6">
        <nav className="flex items-center text-sm text-gray-600 flex-wrap">
          <Link to="/" className="hover:text-green-600 transition-colors">হোম</Link>
          <span className="mx-2">/</span>
          {classKey === 'hsc' ? (
            <>
              <Link to="/hsc" className="hover:text-green-600 transition-colors">HSC</Link>
              <span className="mx-2">/</span>
              {currentGroup && (
                <>
                  <Link to={`/hsc/${group}`} className="hover:text-green-600 transition-colors">
                    {currentGroup.title}
                  </Link>
                  <span className="mx-2">/</span>
                </>
              )}
            </>
          ) : (
            <>
              <Link to={`/${classKey}`} className="hover:text-green-600 transition-colors">
                {classNames[classKey]}
              </Link>
              <span className="mx-2">/</span>
              {currentGroup && (
                <>
                  <Link to={`/class-9-10/${group}`} className="hover:text-green-600 transition-colors">
                    {currentGroup.title}
                  </Link>
                  <span className="mx-2">/</span>
                </>
              )}
            </>
          )}
          <span className="text-green-600 font-medium">{subjectInfo.title}</span>
        </nav>
      </div>

      {/* Subject Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">
              {subjectInfo.icon}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{subjectInfo.title}</h1>
              <p className="text-green-100 text-lg">{subjectInfo.description}</p>
              {currentGroup && (
                <p className="text-green-200 text-sm mt-1">{currentGroup.titleEn}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="container mx-auto px-4 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="বিষয়বস্তু খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chapters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                📖 অধ্যায়সমূহ
              </h3>
              <div className="space-y-2">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => setSelectedChapter(chapter.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                      selectedChapter === chapter.id
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-green-50 hover:text-green-600'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      selectedChapter === chapter.id
                        ? 'bg-white/20 text-white'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {chapter.id}
                    </span>
                    <span className="font-medium">{chapter.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* PDF Notes Section */}
            {(activeFilter === 'all' || activeFilter === 'notes') && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  📚 PDF নোটস
                </h3>
                <div className="space-y-4">
                  <div className="border-2 border-gray-100 rounded-lg p-4 hover:border-green-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl">📄</div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Chapter 1 - সম্পূর্ণ নোটস</h4>
                          <p className="text-sm text-gray-500">PDF • 2.5 MB</p>
                        </div>
                      </div>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                        <span>⬇️</span>
                        <span>ডাউনলোড</span>
                      </button>
                    </div>
                  </div>
                  <div className="border-2 border-gray-100 rounded-lg p-4 hover:border-green-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl">📄</div>
                        <div>
                          <h4 className="font-semibold text-gray-800">সৃজনশীল প্রশ্ন সমাধান</h4>
                          <p className="text-sm text-gray-500">PDF • 1.8 MB</p>
                        </div>
                      </div>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                        <span>⬇️</span>
                        <span>ডাউনলোড</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Suggestion Section */}
            {(activeFilter === 'all' || activeFilter === 'suggestion') && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  💡 সাজেশন
                </h3>
                <div className="space-y-4">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">২০২৪ সালের পরীক্ষার সাজেশন</h4>
                    <p className="text-gray-600 text-sm">এই সাজেশনটি বোর্ড পরীক্ষার জন্য অত্যন্ত গুরুত্বপূর্ণ। সমস্ত গুরুত্বপূর্ণ প্রশ্ন এখানে অন্তর্ভুক্ত করা হয়েছে।</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">অধ্যায় ভিত্তিক সাজেশন</h4>
                      <p className="text-gray-600 text-sm">প্রতিটি অধ্যায় থেকে গুরুত্বপূর্ণ প্রশ্ন</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">বোর্ড প্রশ্ন বিশ্লেষণ</h4>
                      <p className="text-gray-600 text-sm">গত ৫ বছরের বোর্ড প্রশ্নের বিশ্লেষণ</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MCQ Section */}
            {(activeFilter === 'all' || activeFilter === 'mcq') && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  ❓ MCQ প্রশ্ন
                </h3>
                <div className="space-y-4">
                  <div className="border-2 border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">সেট A</span>
                      <span className="text-gray-500 text-sm">২৫টি প্রশ্ন</span>
                    </div>
                    <p className="text-gray-600 mb-4">প্রতিটি প্রশ্নের চারটি উত্তর আছে। সঠিক উত্তরটি নির্বাচন করুন।</p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      অনুশীলন শুরু করুন
                    </button>
                  </div>
                  <div className="border-2 border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">সেট B</span>
                      <span className="text-gray-500 text-sm">২৫টি প্রশ্ন</span>
                    </div>
                    <p className="text-gray-600 mb-4">চ্যালেঞ্জিং MCQ প্রশ্ন। পূর্ণ নম্বর পেতে সব প্রশ্নের উত্তর দিন।</p>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      অনুশীলন শুরু করুন
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* CQ Section */}
            {(activeFilter === 'all' || activeFilter === 'cq') && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  📝 CQ (সৃজনশীল প্রশ্ন)
                </h3>
                <div className="space-y-4">
                  <div className="border-2 border-gray-100 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">সৃজনশীল প্রশ্ন সেট ১</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• প্রশ্ন ১: বিষয়বস্তুর উপর সংক্ষিপ্ত প্রশ্ন</li>
                      <li>• প্রশ্ন ২: বিশ্লেষণমূলক প্রশ্ন</li>
                      <li>• প্রশ্ন ৩: সমস্যা সমাধান</li>
                      <li>• প্রশ্ন ৪: সৃজনশীল চিন্তা</li>
                    </ul>
                    <div className="mt-4 flex gap-3">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        সমাধান দেখুন
                      </button>
                      <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        PDF ডাউনলোড
                      </button>
                    </div>
                  </div>
                  <div className="border-2 border-gray-100 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">সৃজনশীল প্রশ্ন সেট ২</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• প্রশ্ন ১: ধারণামূলক প্রশ্ন</li>
                      <li>• প্রশ্ন ২: তুলনামূলক প্রশ্ন</li>
                      <li>• প্রশ্ন ৩: প্রয়োগমূলক প্রশ্ন</li>
                    </ul>
                    <div className="mt-4 flex gap-3">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        সমাধান দেখুন
                      </button>
                      <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        PDF ডাউনলোড
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Video Lecture Section */}
            {(activeFilter === 'all' || activeFilter === 'video') && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  🎥 ভিডিও ক্লাস
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer">
                    <div className="aspect-video bg-gray-800 flex items-center justify-center relative group">
                      <span className="text-4xl">▶️</span>
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                        <span className="text-white text-4xl">▶</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-white mb-1">অধ্যায় ১: পূর্ণ বিষয়বস্তু</h4>
                      <p className="text-gray-400 text-sm">৪৫ মিনিট • ২,৫০০+ দেখেছেন</p>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer">
                    <div className="aspect-video bg-gray-800 flex items-center justify-center relative group">
                      <span className="text-4xl">▶️</span>
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                        <span className="text-white text-4xl">▶</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-white mb-1">গুরুত্বপূর্ণ সমস্যা সমাধান</h4>
                      <p className="text-gray-400 text-sm">৩০ মিনিট • ১,৮০০+ দেখেছেন</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            মন্তব্য করুন
            <span className="text-sm font-normal text-gray-500 ml-2">(Login required to comment)</span>
          </h3>

          {showLoginPrompt && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700">
                মন্তব্য করতে আপনাকে প্রথমে <Link to="/login" className="font-bold text-green-600 hover:underline">লগইন</Link> করতে হবে।
              </p>
            </div>
          )}

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="আপনার মন্তব্য লিখুন..."
              className="w-full border-2 border-gray-200 rounded-lg p-4 focus:border-green-500 focus:outline-none transition-colors resize-none"
              rows="4"
            />
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {!isLoggedIn && 'মন্তব্য করতে লগইন করুন'}
              </p>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                মন্তব্য জমা দিন
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              মন্তব্য ({comments.length})
            </h4>
            
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                এখনো কোনো মন্তব্য করা হয়নি। প্রথম মন্তব্য করুন!
              </p>
            ) : (
              comments.map((c, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800">{c.text}</p>
                  <p className="text-sm text-gray-500 mt-2">{c.date}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
