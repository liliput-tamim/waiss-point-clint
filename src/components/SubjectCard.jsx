import { Link } from 'react-router-dom';

const SubjectCard = ({ title, icon, link, description }) => {
  return (
    <Link
      to={link}
      className="group block bg-white border-2 border-green-600 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-green-500"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
          {icon ? (
            <span className="text-3xl">{icon}</span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600 group-hover:text-white transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          )}
        </div>
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-300 mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
            {description}
          </p>
        )}
        <div className="mt-4 flex items-center text-green-600 font-medium text-sm group-hover:text-green-700">
          <span>বিস্তারিত দেখুন</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;
