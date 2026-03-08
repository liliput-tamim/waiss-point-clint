import { FiSearch, FiMenu, FiX, FiBell, FiChevronDown, FiSun, FiMoon, FiUser } from 'react-icons/fi';
import { HiSpeakerphone } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const megaMenuData = [
    { title: 'Academic', items: ['Class 6–8', 'Class 9–10', 'HSC', 'Honours', 'Masters'] },
    { title: 'Jobs', items: ['BCS Preparation', 'Govt Job', 'Bank Job', 'Private Job', 'ICT Tutorials'] },
    { title: 'Admission', items: ['Admission Exam', 'Scholarship', 'Study Tips', 'Career Guideline', 'PDF Notes'] }
  ];

  // Individual dropdown data for Academic, Admission, Jobs
  const academicDropdown = [
    { name: 'Class 6', link: '/class-6' },
    { name: 'Class 7', link: '/class-7' },
    { name: 'Class 8', link: '/class-8' },
    { name: 'Class 9-10', link: '/class-9-10' },
    { name: 'HSC', link: '/hsc' },
    { name: 'Honours', link: '/honours' },
    { name: 'Masters', link: '/masters' }
  ];

  const admissionDropdown = [
    { name: 'Admission Exam', link: '/admission' },
    { name: 'Scholarship', link: '/category/scholarship' },
    { name: 'Study Tips', link: '/category/study-tips' },
    { name: 'Career Guideline', link: '/category/career-guideline' },
    { name: 'PDF Notes', link: '/category/pdf-notes' }
  ];

  const jobsDropdown = [
    { name: 'BCS Preparation', link: '/category/bcs-preparation' },
    { name: 'Govt Job', link: '/category/govt-job' },
    { name: 'Bank Job', link: '/category/bank-job' },
    { name: 'Private Job', link: '/category/private-job' },
    { name: 'ICT Tutorials', link: '/category/ict-tutorials' }
  ];

  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'Academic', dropdown: 'academic', items: academicDropdown },
    { name: 'Admission', dropdown: 'admission', items: admissionDropdown },
    { name: 'Jobs', dropdown: 'jobs', items: jobsDropdown },
    { name: 'Results', link: '/category/results' },
    { name: 'Scholarships', link: '/category/scholarships' },
    { name: 'ICT & Tech', link: '/category/ict' },
    { name: 'Contact', link: '/contact' }
  ];

  const categories = ['Academic', 'Admission', 'Jobs', 'Results', 'Scholarships', 'ICT', 'BCS', 'Notice'];

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 border-b border-emerald-600 py-2 px-4 text-xs">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6 text-white/90">
            <span className="hidden md:flex items-center gap-2">
              <HiSpeakerphone className="text-white" />
              Breaking: New Admission Circular 2024
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/90">
            <span className="hidden sm:inline">📞 +880 1234-567890</span>
            <div className="flex gap-3">
              <a href="#" className="hover:text-white transition text-sm">📱</a>
              <a href="#" className="hover:text-white transition text-sm">🐦</a>
              <a href="#" className="hover:text-white transition text-sm">📺</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'} border-b border-gray-200`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[70px]">
            {/* Logo */}
            <div className="flex-none">
              <Link to="/" className="flex items-center cursor-pointer">
                <img 
                  src="/481191097_622757057179962_971591103180726496_n-removebg-preview.png" 
                  alt="Waiss Point Logo" 
                  className="h-[250px] w-auto"
                />

              </Link>
            </div>

            {/* Center Menu */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-1">
                {menuItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.link && !item.dropdown ? (
                      <Link 
                        to={item.link}
                        className={`px-4 py-2 flex items-center gap-1 transition-all text-sm font-medium ${
                          location.pathname === item.link ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button className="px-4 py-2 flex items-center gap-1 text-gray-700 hover:text-emerald-600 font-medium transition-all text-sm cursor-pointer">
                        {item.name}
                        {item.dropdown && <FiChevronDown className="text-xs transition-transform group-hover:rotate-180" />}
                      </button>
                    )}

                    {/* Mega Menu (Categories) */}
                    {item.dropdown === 'mega' && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[700px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100"
                      >
                        <div className="grid grid-cols-3 gap-6">
                          {megaMenuData.map((col, i) => (
                            <div key={i}>
                              <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3">{col.title}</h4>
                              {col.items.map((subItem, j) => (
                                <Link 
                                  key={j} 
                                  to={`/category/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                                  className="block py-2 px-3 -mx-3 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition text-sm text-gray-700"
                                >
                                  {subItem}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Academic Dropdown */}
                    {item.dropdown === 'academic' && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl p-2 border border-gray-100"
                      >
                        {item.items.map((subItem, j) => (
                          <Link 
                            key={j} 
                            to={subItem.link}
                            className="block py-2.5 px-4 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition text-sm text-gray-700 font-medium"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}

                    {/* Admission Dropdown */}
                    {item.dropdown === 'admission' && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl p-2 border border-gray-100"
                      >
                        {item.items.map((subItem, j) => (
                          <Link 
                            key={j} 
                            to={subItem.link}
                            className="block py-2.5 px-4 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition text-sm text-gray-700 font-medium"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}

                    {/* Jobs Dropdown */}
                    {item.dropdown === 'jobs' && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl p-2 border border-gray-100"
                      >
                        {item.items.map((subItem, j) => (
                          <Link 
                            key={j} 
                            to={subItem.link}
                            className="block py-2.5 px-4 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition text-sm text-gray-700 font-medium"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side */}
            <div className="flex-none flex items-center gap-2">
              <button 
                onClick={() => navigate('/blog')}
                className="btn btn-ghost btn-circle btn-sm hidden md:flex"
                title="Search"
              >
                <FiSearch className="text-lg" />
              </button>

              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.name || 'User'}</span>
                  </div>
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="hidden md:flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all text-sm"
                    >
                      <span className="text-xs">⚡</span>
                      Admin
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="hidden md:flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 font-medium rounded-lg transition-all text-sm"
                  >
                    <FiUser className="text-sm" />
                    Logout
                  </button>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    to="/login" 
                    className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:from-emerald-700 hover:to-emerald-600"
                  >
                    <FiUser className="text-lg" /> 
                    <span>Login</span>
                  </Link>
                </motion.div>
              )}

              <button 
                className="lg:hidden btn btn-ghost btn-square btn-sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
              </button>
            </div>
          </div>

          {/* Sticky Category Scroll */}
          <div className="border-t border-gray-100 overflow-x-auto scrollbar-hide py-2">
            <div className="flex gap-1 min-w-max">
              {categories.map((cat, i) => (
                <Link
                  key={i}
                  to={`/category/${cat.toLowerCase()}`}
                  className="px-4 py-1.5 text-xs whitespace-nowrap rounded-full bg-gray-100 hover:bg-emerald-600 hover:text-white text-gray-600 hover:shadow-lg transition-all duration-300 font-medium"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-white lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <img 
                      src="/481191097_622757057179962_971591103180726496_n-removebg-preview.png" 
                      alt="Logo" 
                      className="h-10 w-auto"
                    />
                    <span className="text-xl font-bold text-emerald-600">Waiss Point</span>
                  </Link>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="btn btn-ghost btn-circle"
                  >
                    <FiX className="text-2xl" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                  {menuItems.map((item, idx) => (
                    <li key={idx}>
                      {item.link && !item.dropdown ? (
                        <Link
                          to={item.link}
                          className="block w-full px-4 py-3 text-left hover:bg-emerald-50 rounded-xl font-medium text-gray-700 hover:text-emerald-600 transition"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <div className="border-b border-gray-100 pb-2">
                          <span className="block px-4 py-3 font-medium text-gray-400 text-xs uppercase">{item.name}</span>
                          {item.dropdown === 'mega' && (
                            <div className="pl-4 space-y-1">
                              {megaMenuData.flatMap(col => col.items).map((subItem, j) => (
                                <Link
                                  key={j}
                                  to={`/category/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                                  className="block px-4 py-2 hover:bg-emerald-50 rounded-lg text-sm text-gray-600 hover:text-emerald-600 transition"
                                >
                                  {subItem}
                                </Link>
                              ))}
                            </div>
                          )}
                          {item.dropdown === 'academic' && (
                            <div className="pl-4 space-y-1">
                              {item.items.map((subItem, j) => (
                                <Link
                                  key={j}
                                  to={subItem.link}
                                  className="block px-4 py-2 hover:bg-emerald-50 rounded-lg text-sm text-gray-600 hover:text-emerald-600 transition"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                          {item.dropdown === 'admission' && (
                            <div className="pl-4 space-y-1">
                              {item.items.map((subItem, j) => (
                                <Link
                                  key={j}
                                  to={subItem.link}
                                  className="block px-4 py-2 hover:bg-emerald-50 rounded-lg text-sm text-gray-600 hover:text-emerald-600 transition"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                          {item.dropdown === 'jobs' && (
                            <div className="pl-4 space-y-1">
                              {item.items.map((subItem, j) => (
                                <Link
                                  key={j}
                                  to={subItem.link}
                                  className="block px-4 py-2 hover:bg-emerald-50 rounded-lg text-sm text-gray-600 hover:text-emerald-600 transition"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-sm">
                      <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name || 'User'}</p>
                        <p className="text-xs text-gray-500">{user.email || 'user@email.com'}</p>
                      </div>
                    </div>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block w-full py-3 bg-emerald-600 text-white text-center font-semibold rounded-xl hover:bg-emerald-700 transition"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiUser className="text-lg" />
                    Login / Register
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
