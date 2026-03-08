import { Link } from 'react-router-dom';
import SubjectCard from '../components/SubjectCard';

const subjects = [
  { id: 'bangla', title: 'বাংলা', icon: '📚' },
  { id: 'english', title: 'English', icon: '📖' },
  { id: 'math', title: 'গণিত', icon: '🔢' },
  { id: 'science', title: 'সাধারণ বিজ্ঞান', icon: '🔬' },
  { id: 'social', title: 'বাংলাদেশ ও বিশ্বপরিচয়', icon: '🌍' },
  { id: 'religion', title: 'ধর্ম ও নৈতিক শিক্ষা', icon: '🙏' },
  { id: 'islam', title: 'ইসলাম ও নৈতিক শিক্ষা', icon: '🕌' },
  { id: 'hindu', title: 'হিন্দুধর্ম ও নৈতিক শিক্ষা', icon: '🪔' },
  { id: 'buddha', title: 'বৌদ্ধধর্ম ও নৈতিক শিক্ষা', icon: '☸️' },
  { id: 'christian', title: 'খ্রিস্টধর্ম ও নৈতিক শিক্ষা', icon: '✝️' },
  { id: 'ict', title: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', icon: '💻' },
  { id: 'art', title: 'শিল্প ও সংস্কৃতি', icon: '🎨' },
  { id: 'health', title: 'শারীরিক শিক্ষা ও স্বাস্থ্য', icon: '🏃' },
  { id: 'agriculture', title: 'কৃষি শিক্ষা / গার্হস্থ্য বিজ্ঞান', icon: '🌾' },
];

const Class8 = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-6">
        <nav className="flex items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-green-600 transition-colors">হোম</Link>
          <span className="mx-2">/</span>
          <span className="text-green-600 font-medium">Class 8</span>
        </nav>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold mb-2">Class 8</h1>
          <p className="text-green-100 text-lg">অষ্টম শ্রেণি - সকল বিষয়সমূহ</p>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              title={subject.title}
              icon={subject.icon}
              link={`/class-8/${subject.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Class8;
