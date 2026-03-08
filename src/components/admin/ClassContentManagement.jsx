import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiBook, FiSave, FiX, FiUpload, FiImage } from 'react-icons/fi';

const ClassContentManagement = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('class-6');
  const [subjects, setSubjects] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const classOptions = [
    { id: 'class-6', name: 'Class 6', nameBn: 'ষষ্ঠ শ্রেণি' },
    { id: 'class-7', name: 'Class 7', nameBn: 'সপ্তম শ্রেণি' },
    { id: 'class-8', name: 'Class 8', nameBn: 'অষ্টম শ্রেণি' },
    { id: 'class-9-10', name: 'Class 9-10', nameBn: 'নবম-দশম শ্রেণি' },
    { id: 'hsc', name: 'HSC', nameBn: 'একাদশ-দ্বাদশ শ্রেণি' },
    { id: 'honours', name: 'Honours', nameBn: 'স্নাতক সম্মান' },
  ];

  const defaultSubjects = {
    'class-6': [
      { id: 'bangla', title: 'বাংলা', titleEn: 'Bangla', icon: '📚' },
      { id: 'english', title: 'English', titleEn: 'English', icon: '📖' },
      { id: 'math', title: 'গণিত', titleEn: 'Math', icon: '🔢' },
      { id: 'science', title: 'সাধারণ বিজ্ঞান', titleEn: 'General Science', icon: '🔬' },
      { id: 'social', title: 'বাংলাদেশ ও বিশ্বপরিচয়', titleEn: 'Bangladesh & Global Studies', icon: '🌍' },
      { id: 'islam', title: 'ইসলাম ও নৈতিক শিক্ষা', titleEn: 'Islam & Moral Education', icon: '🕌' },
      { id: 'hindu', title: 'হিন্দুধর্ম ও নৈতিক শিক্ষা', titleEn: 'Hinduism & Moral Education', icon: '🪔' },
      { id: 'buddha', title: 'বৌদ্ধধর্ম ও নৈতিক শিক্ষা', titleEn: 'Buddhism & Moral Education', icon: '☸️' },
      { id: 'christian', title: 'খ্রিস্টধর্ম ও নৈতিক শিক্ষা', titleEn: 'Christianity & Moral Education', icon: '✝️' },
      { id: 'ict', title: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', titleEn: 'ICT', icon: '💻' },
      { id: 'art', title: 'শিল্প ও সংস্কৃতি', titleEn: 'Art & Culture', icon: '🎨' },
      { id: 'health', title: 'শারীরিক শিক্ষা ও স্বাস্থ্য', titleEn: 'Physical Education & Health', icon: '🏃' },
      { id: 'agriculture', title: 'কৃষি শিক্ষা / গার্হস্থ্য বিজ্ঞান', titleEn: 'Agriculture / Home Science', icon: '🌾' },
    ],
    'class-7': [
      { id: 'bangla', title: 'বাংলা', titleEn: 'Bangla', icon: '📚' },
      { id: 'english', title: 'English', titleEn: 'English', icon: '📖' },
      { id: 'math', title: 'গণিত', titleEn: 'Math', icon: '🔢' },
      { id: 'science', title: 'সাধারণ বিজ্ঞান', titleEn: 'General Science', icon: '🔬' },
      { id: 'social', title: 'বাংলাদেশ ও বিশ্বপরিচয়', titleEn: 'Bangladesh & Global Studies', icon: '🌍' },
      { id: 'religion', title: 'ধর্ম ও নৈতিক শিক্ষা', titleEn: 'Religion & Moral Education', icon: '🙏' },
      { id: 'islam', title: 'ইসলাম ও নৈতিক শিক্ষা', titleEn: 'Islam & Moral Education', icon: '🕌' },
      { id: 'hindu', title: 'হিন্দুধর্ম ও নৈতিক শিক্ষা', titleEn: 'Hinduism & Moral Education', icon: '🪔' },
      { id: 'buddha', title: 'বৌদ্ধধর্ম ও নৈতিক শিক্ষা', titleEn: 'Buddhism & Moral Education', icon: '☸️' },
      { id: 'christian', title: 'খ্রিস্টধর্ম ও নৈতিক শিক্ষা', titleEn: 'Christianity & Moral Education', icon: '✝️' },
      { id: 'ict', title: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', titleEn: 'ICT', icon: '💻' },
      { id: 'art', title: 'শিল্প ও সংস্কৃতি', titleEn: 'Art & Culture', icon: '🎨' },
      { id: 'health', title: 'শারীরিক শিক্ষা ও স্বাস্থ্য', titleEn: 'Physical Education & Health', icon: '🏃' },
      { id: 'agriculture', title: 'কৃষি শিক্ষা / গার্হস্থ্য বিজ্ঞান', titleEn: 'Agriculture / Home Science', icon: '🌾' },
    ],
    'class-8': [
      { id: 'bangla', title: 'বাংলা', titleEn: 'Bangla', icon: '📚' },
      { id: 'english', title: 'English', titleEn: 'English', icon: '📖' },
      { id: 'math', title: 'গণিত', titleEn: 'Math', icon: '🔢' },
      { id: 'science', title: 'সাধারণ বিজ্ঞান', titleEn: 'General Science', icon: '🔬' },
      { id: 'social', title: 'বাংলাদেশ ও বিশ্বপরিচয়', titleEn: 'Bangladesh & Global Studies', icon: '🌍' },
      { id: 'religion', title: 'ধর্ম ও নৈতিক শিক্ষা', titleEn: 'Religion & Moral Education', icon: '🙏' },
      { id: 'islam', title: 'ইসলাম ও নৈতিক শিক্ষা', titleEn: 'Islam & Moral Education', icon: '🕌' },
      { id: 'hindu', title: 'হিন্দুধর্ম ও নৈতিক শিক্ষা', titleEn: 'Hinduism & Moral Education', icon: '🪔' },
      { id: 'buddha', title: 'বৌদ্ধধর্ম ও নৈতিক শিক্ষা', titleEn: 'Buddhism & Moral Education', icon: '☸️' },
      { id: 'christian', title: 'খ্রিস্টধর্ম ও নৈতিক শিক্ষা', titleEn: 'Christianity & Moral Education', icon: '✝️' },
      { id: 'ict', title: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', titleEn: 'ICT', icon: '💻' },
      { id: 'art', title: 'শিল্প ও সংস্কৃতি', titleEn: 'Art & Culture', icon: '🎨' },
      { id: 'health', title: 'শারীরিক শিক্ষা ও স্বাস্থ্য', titleEn: 'Physical Education & Health', icon: '🏃' },
      { id: 'agriculture', title: 'কৃষি শিক্ষা / গার্হস্থ্য বিজ্ঞান', titleEn: 'Agriculture / Home Science', icon: '🌾' },
    ],
    'class-9-10': [
      { id: 'bangla', title: 'বাংলা', titleEn: 'Bangla', icon: '📚' },
      { id: 'english', title: 'English', titleEn: 'English', icon: '📖' },
      { id: 'math', title: 'গণিত', titleEn: 'Math', icon: '🔢' },
      { id: 'physics', title: 'পদার্থবিজ্ঞান', titleEn: 'Physics', icon: '⚛️' },
      { id: 'chemistry', title: 'রসায়ন', titleEn: 'Chemistry', icon: '🧪' },
      { id: 'biology', title: 'জীববিজ্ঞান', titleEn: 'Biology', icon: '🧬' },
      { id: 'higher-math', title: 'উচ্চতর গণিত', titleEn: 'Higher Math', icon: '📐' },
      { id: 'ict', title: 'ICT', titleEn: 'ICT', icon: '💻' },
    ],
    'hsc': [
      // Science Group
      { id: 'hsc-physics-1st', title: 'পদার্থবিজ্ঞান ১ম পত্র', titleEn: 'Physics 1st Paper', icon: '⚛️', group: 'science' },
      { id: 'hsc-physics-2nd', title: 'পদার্থবিজ্ঞান ২য় পত্র', titleEn: 'Physics 2nd Paper', icon: '⚛️', group: 'science' },
      { id: 'hsc-chemistry-1st', title: 'রসায়ন ১ম পত্র', titleEn: 'Chemistry 1st Paper', icon: '🧪', group: 'science' },
      { id: 'hsc-chemistry-2nd', title: 'রসায়ন ২য় পত্র', titleEn: 'Chemistry 2nd Paper', icon: '🧪', group: 'science' },
      { id: 'hsc-biology-1st', title: 'জীববিজ্ঞান ১ম পত্র', titleEn: 'Biology 1st Paper', icon: '🧬', group: 'science' },
      { id: 'hsc-biology-2nd', title: 'জীববিজ্ঞান ২য় পত্র', titleEn: 'Biology 2nd Paper', icon: '🧬', group: 'science' },
      { id: 'hsc-higher-math-1st', title: 'উচ্চতর গণিত ১ম পত্র', titleEn: 'Higher Math 1st Paper', icon: '📐', group: 'science' },
      { id: 'hsc-higher-math-2nd', title: 'উচ্চতর গণিত ২য় পত্র', titleEn: 'Higher Math 2nd Paper', icon: '📐', group: 'science' },
      { id: 'hsc-bangla-1st', title: 'বাংলা ১ম পত্র', titleEn: 'Bangla 1st Paper', icon: '📚', group: 'science' },
      { id: 'hsc-bangla-2nd', title: 'বাংলা ২য় পত্র', titleEn: 'Bangla 2nd Paper', icon: '📚', group: 'science' },
      { id: 'hsc-english-1st', title: 'English 1st Paper', titleEn: 'English 1st Paper', icon: '📖', group: 'science' },
      { id: 'hsc-english-2nd', title: 'English 2nd Paper', titleEn: 'English 2nd Paper', icon: '📖', group: 'science' },
      { id: 'hsc-ict', title: 'তথ্য ও যোগাযোগ প্রযুক্তি', titleEn: 'ICT', icon: '💻', group: 'science' },
      // Business Group
      { id: 'hsc-accounting-1st', title: 'হিসাববিজ্ঞান ১ম পত্র', titleEn: 'Accounting 1st Paper', icon: '📊', group: 'business' },
      { id: 'hsc-accounting-2nd', title: 'হিসাববিজ্ঞান ২য় পত্র', titleEn: 'Accounting 2nd Paper', icon: '📊', group: 'business' },
      { id: 'hsc-business-org-1st', title: 'ব্যবসায় সংগঠন ১ম পত্র', titleEn: 'Business Organization 1st Paper', icon: '💼', group: 'business' },
      { id: 'hsc-business-org-2nd', title: 'ব্যবসায় সংগঠন ২য় পত্র', titleEn: 'Business Organization 2nd Paper', icon: '💼', group: 'business' },
      { id: 'hsc-finance-1st', title: 'ফাইন্যান্স ১ম পত্র', titleEn: 'Finance 1st Paper', icon: '💰', group: 'business' },
      { id: 'hsc-finance-2nd', title: 'ফাইন্যান্স ২য় পত্র', titleEn: 'Finance 2nd Paper', icon: '💰', group: 'business' },
      { id: 'hsc-bangla-business', title: 'বাংলা', titleEn: 'Bangla', icon: '📚', group: 'business' },
      { id: 'hsc-english-business', title: 'English', titleEn: 'English', icon: '📖', group: 'business' },
      { id: 'hsc-ict-business', title: 'তথ্য ও যোগাযোগ প্রযুক্তি', titleEn: 'ICT', icon: '💻', group: 'business' },
      // Humanities Group
      { id: 'hsc-history-1st', title: 'ইতিহাস ১ম পত্র', titleEn: 'History 1st Paper', icon: '🏛️', group: 'humanities' },
      { id: 'hsc-history-2nd', title: 'ইতিহাস ২য় পত্র', titleEn: 'History 2nd Paper', icon: '🏛️', group: 'humanities' },
      { id: 'hsc-sociology-1st', title: 'সমাজবিজ্ঞান ১ম পত্র', titleEn: 'Sociology 1st Paper', icon: '👥', group: 'humanities' },
      { id: 'hsc-sociology-2nd', title: 'সমাজবিজ্ঞান ২য় পত্র', titleEn: 'Sociology 2nd Paper', icon: '👥', group: 'humanities' },
      { id: 'hsc-economics-1st', title: 'অর্থনীতি ১ম পত্র', titleEn: 'Economics 1st Paper', icon: '📈', group: 'humanities' },
      { id: 'hsc-economics-2nd', title: 'অর্থনীতি ২য় পত্র', titleEn: 'Economics 2nd Paper', icon: '📈', group: 'humanities' },
      { id: 'hsc-logic-1st', title: 'যুক্তিবিদ্যা ১ম পত্র', titleEn: 'Logic 1st Paper', icon: '🤔', group: 'humanities' },
      { id: 'hsc-logic-2nd', title: 'যুক্তিবিদ্যা ২য় পত্র', titleEn: 'Logic 2nd Paper', icon: '🤔', group: 'humanities' },
      { id: 'hsc-bangla-humanities', title: 'বাংলা', titleEn: 'Bangla', icon: '📚', group: 'humanities' },
      { id: 'hsc-english-humanities', title: 'English', titleEn: 'English', icon: '📖', group: 'humanities' },
      { id: 'hsc-ict-humanities', title: 'তথ্য ও যোগাযোগ প্রযুক্তি', titleEn: 'ICT', icon: '💻', group: 'humanities' },
    ],
    'honours': [
      // Arts Faculty
      { id: 'honours-bangla', title: 'বাংলা', titleEn: 'Bangla', icon: '📚', faculty: 'arts', year: 'all' },
      { id: 'honours-english', title: 'ইংরেজি', titleEn: 'English', icon: '📖', faculty: 'arts', year: 'all' },
      { id: 'honours-history', title: 'ইতিহাস', titleEn: 'History', icon: '🏛️', faculty: 'arts', year: 'all' },
      { id: 'honours-philosophy', title: 'দর্শন', titleEn: 'Philosophy', icon: '🤔', faculty: 'arts', year: 'all' },
      { id: 'honours-islamic-studies', title: 'ইসলামি শিক্ষা', titleEn: 'Islamic Studies', icon: '🕌', faculty: 'arts', year: 'all' },
      // Social Science Faculty
      { id: 'honours-economics', title: 'অর্থনীতি', titleEn: 'Economics', icon: '📈', faculty: 'social-science', year: 'all' },
      { id: 'honours-political-science', title: 'রাষ্ট্রবিজ্ঞান', titleEn: 'Political Science', icon: '🏛️', faculty: 'social-science', year: 'all' },
      { id: 'honours-sociology', title: 'সমাজবিজ্ঞান', titleEn: 'Sociology', icon: '👥', faculty: 'social-science', year: 'all' },
      { id: 'honours-geography', title: 'ভূগোল', titleEn: 'Geography', icon: '🌍', faculty: 'social-science', year: 'all' },
      { id: 'honours-anthropology', title: 'নৃবিজ্ঞান', titleEn: 'Anthropology', icon: '👤', faculty: 'social-science', year: 'all' },
      // Science Faculty
      { id: 'honours-math', title: 'গণিত', titleEn: 'Mathematics', icon: '🔢', faculty: 'science', year: 'all' },
      { id: 'honours-physics', title: 'পদার্থবিজ্ঞান', titleEn: 'Physics', icon: '⚛️', faculty: 'science', year: 'all' },
      { id: 'honours-chemistry', title: 'রসায়ন', titleEn: 'Chemistry', icon: '🧪', faculty: 'science', year: 'all' },
      { id: 'honours-botany', title: 'উদ্ভিদবিজ্ঞান', titleEn: 'Botany', icon: '🌱', faculty: 'science', year: 'all' },
      { id: 'honours-zoology', title: 'প্রাণিবিজ্ঞান', titleEn: 'Zoology', icon: '🐾', faculty: 'science', year: 'all' },
      // Business Faculty
      { id: 'honours-management', title: 'ম্যানেজমেন্ট', titleEn: 'Management', icon: '💼', faculty: 'business', year: 'all' },
      { id: 'honours-accounting', title: 'অ্যাকাউন্টিং', titleEn: 'Accounting', icon: '📊', faculty: 'business', year: 'all' },
      { id: 'honours-marketing', title: 'মার্কেটিং', titleEn: 'Marketing', icon: '📢', faculty: 'business', year: 'all' },
      { id: 'honours-finance', title: 'ফিন্যান্স', titleEn: 'Finance', icon: '💰', faculty: 'business', year: 'all' },
      { id: 'honours-banking', title: 'ব্যাংকিং', titleEn: 'Banking', icon: '🏦', faculty: 'business', year: 'all' },
      // Law Faculty
      { id: 'honours-constitutional-law', title: 'সংবিধান আইন', titleEn: 'Constitutional Law', icon: '⚖️', faculty: 'law', year: 'all' },
      { id: 'honours-criminal-law', title: 'ফৌজদারি আইন', titleEn: 'Criminal Law', icon: '🔨', faculty: 'law', year: 'all' },
      { id: 'honours-civil-law', title: 'দেওয়ানি আইন', titleEn: 'Civil Law', icon: '📜', faculty: 'law', year: 'all' },
    ],
  };

  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    icon: '📚',
    content: '',
    chapters: [],
  });

  const [newChapter, setNewChapter] = useState({ title: '', titleEn: '', content: '' });

  useEffect(() => {
    // Load from localStorage or use defaults
    const savedData = localStorage.getItem('classContent');
    if (savedData) {
      setClasses(JSON.parse(savedData));
      setSubjects(JSON.parse(savedData)[selectedClass] || defaultSubjects[selectedClass]);
    } else {
      setClasses(defaultSubjects);
      setSubjects(defaultSubjects[selectedClass]);
      localStorage.setItem('classContent', JSON.stringify(defaultSubjects));
    }
  }, []);

  useEffect(() => {
    if (classes[selectedClass]) {
      setSubjects(classes[selectedClass]);
    } else {
      setSubjects(defaultSubjects[selectedClass]);
    }
  }, [selectedClass, classes]);

  const handleClassChange = (classId) => {
    setSelectedClass(classId);
    setShowForm(false);
    setEditingSubject(null);
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setFormData({
      title: subject.title || '',
      titleEn: subject.titleEn || '',
      icon: subject.icon || '📚',
      content: subject.content || '',
      chapters: subject.chapters || [],
    });
    setShowForm(true);
  };

  const handleDelete = (subjectId) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      const updatedClasses = { ...classes };
      updatedClasses[selectedClass] = updatedClasses[selectedClass].filter(s => s.id !== subjectId);
      setClasses(updatedClasses);
      setSubjects(updatedClasses[selectedClass]);
      localStorage.setItem('classContent', JSON.stringify(updatedClasses));
      setSuccess('Subject deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleAddNew = () => {
    setEditingSubject(null);
    setFormData({
      title: '',
      titleEn: '',
      icon: '📚',
      content: '',
      chapters: [],
    });
    setShowForm(true);
  };

  const handleAddChapter = () => {
    if (newChapter.title) {
      setFormData({
        ...formData,
        chapters: [...formData.chapters, { ...newChapter, id: Date.now().toString() }],
      });
      setNewChapter({ title: '', titleEn: '', content: '' });
    }
  };

  const handleRemoveChapter = (chapterId) => {
    setFormData({
      ...formData,
      chapters: formData.chapters.filter(c => c.id !== chapterId),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedClasses = { ...classes };
    const subjectData = {
      ...formData,
      id: editingSubject ? editingSubject.id : `${formData.titleEn.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
    };

    if (editingSubject) {
      // Update existing subject
      updatedClasses[selectedClass] = updatedClasses[selectedClass].map(s =>
        s.id === editingSubject.id ? { ...s, ...subjectData } : s
      );
    } else {
      // Add new subject
      if (!updatedClasses[selectedClass]) {
        updatedClasses[selectedClass] = [];
      }
      updatedClasses[selectedClass].push(subjectData);
    }

    setClasses(updatedClasses);
    setSubjects(updatedClasses[selectedClass]);
    localStorage.setItem('classContent', JSON.stringify(updatedClasses));

    setLoading(false);
    setShowForm(false);
    setEditingSubject(null);
    setSuccess(editingSubject ? 'Subject updated successfully!' : 'Subject added successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const getClassName = () => {
    const cls = classOptions.find(c => c.id === selectedClass);
    return cls ? cls.name : selectedClass;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FiBook className="text-emerald-600" />
            Class Content Management
          </h2>
          <p className="text-gray-600">Add, edit, and manage class subject content</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          <FiPlus /> Add New Subject
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {/* Class Selector */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
        <div className="flex gap-2 flex-wrap">
          {classOptions.map((cls) => (
            <button
              key={cls.id}
              onClick={() => handleClassChange(cls.id)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedClass === cls.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cls.name} ({cls.nameBn})
            </button>
          ))}
        </div>
      </div>

      {/* Subjects List */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-lg">{getClassName()} - Subjects</h3>
        </div>
        <div className="divide-y">
          {subjects && subjects.length > 0 ? (
            subjects.map((subject) => (
              <div key={subject.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{subject.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{subject.title}</h4>
                    <p className="text-sm text-gray-500">{subject.titleEn}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {subject.chapters?.length || 0} chapters
                  </span>
                  <button
                    onClick={() => handleEdit(subject)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(subject.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              No subjects found. Click "Add New Subject" to create one.
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-bold">
                {editingSubject ? 'Edit Subject' : 'Add New Subject'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingSubject(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Title (Bengali) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Title (Bengali)
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="বাংলা"
                  required
                />
              </div>

              {/* Title (English) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Title (English)
                </label>
                <input
                  type="text"
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Bangla"
                  required
                />
              </div>

              {/* Icon Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon
                </label>
                <div className="flex flex-wrap gap-2">
                  {['📚', '📖', '🔢', '🔬', '🌍', '🕌', '🪔', '☸️', '✝️', '💻', '🎨', '🏃', '🌾', '🙏'].map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon })}
                      className={`w-10 h-10 text-xl rounded-lg flex items-center justify-center transition ${
                        formData.icon === icon
                          ? 'bg-emerald-100 border-2 border-emerald-500'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Description / Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows="4"
                  placeholder="Enter subject description..."
                />
              </div>

              {/* Chapters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chapters
                </label>
                <div className="space-y-2 mb-3">
                  {formData.chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded"
                    >
                      <span>{chapter.title}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveChapter(chapter.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={newChapter.title}
                    onChange={(e) => setNewChapter({ ...newChapter, title: e.target.value })}
                    className="px-3 py-2 border rounded-lg"
                    placeholder="Chapter Title (Bn)"
                  />
                  <input
                    type="text"
                    value={newChapter.titleEn}
                    onChange={(e) => setNewChapter({ ...newChapter, titleEn: e.target.value })}
                    className="px-3 py-2 border rounded-lg"
                    placeholder="Chapter Title (En)"
                  />
                  <button
                    type="button"
                    onClick={handleAddChapter}
                    className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
                  >
                    <FiPlus /> Add
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingSubject(null);
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
                >
                  {loading ? (
                    'Saving...'
                  ) : (
                    <>
                      <FiSave /> {editingSubject ? 'Update' : 'Save'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassContentManagement;
