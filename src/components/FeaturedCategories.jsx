import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NoData from './NoData';
import { FiBookOpen, FiAward, FiBriefcase, FiGift, FiCode, FiFileText, FiBarChart2, FiBell } from 'react-icons/fi';

const FeaturedCategories = () => {
  const categories = [
    { icon: <FiBookOpen className="text-4xl" />, title: 'একাডেমিক', count: 245, color: 'bg-blue-100 text-blue-600', link: '/blog?category=একাডেমিক' },
    { icon: <FiAward className="text-4xl" />, title: 'ভর্তি পরীক্ষা', count: 189, color: 'bg-emerald-100 text-emerald-600', link: '/blog?category=ভর্তি' },
    { icon: <FiBriefcase className="text-4xl" />, title: 'চাকরি', count: 312, color: 'bg-amber-100 text-amber-600', link: '/blog?category=চাকরি' },
    { icon: <FiGift className="text-4xl" />, title: 'বৃত্তি', count: 98, color: 'bg-purple-100 text-purple-600', link: '/blog?category=বৃত্তি' },
    { icon: <FiCode className="text-4xl" />, title: 'আইসিটি', count: 156, color: 'bg-cyan-100 text-cyan-600', link: '/blog?category=আইসিটি' },
    { icon: <FiFileText className="text-4xl" />, title: 'বিসিএস', count: 203, color: 'bg-rose-100 text-rose-600', link: '/blog?category=বিসিএস' },
    { icon: <FiBarChart2 className="text-4xl" />, title: 'রেজাল্ট', count: 134, color: 'bg-indigo-100 text-indigo-600', link: '/blog?category=Result' },
    { icon: <FiBell className="text-4xl" />, title: 'নোটিশ', count: 87, color: 'bg-orange-100 text-orange-600', link: '/blog?category=নোটিশ' }
  ];

  const colors = [
    'from-blue-400 to-blue-600',
    'from-emerald-400 to-emerald-600',
    'from-amber-400 to-amber-600',
    'from-purple-400 to-purple-600',
    'from-cyan-400 to-cyan-600',
    'from-rose-400 to-rose-600',
    'from-indigo-400 to-indigo-600',
    'from-orange-400 to-orange-600'
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">জনপ্রিয় ক্যাটাগরি</h2>
          <p className="text-lg text-gray-600">আপনার পছন্দের বিষয় খুঁজে নিন</p>
        </motion.div>

        {categories.length === 0 ? (
          <NoData
            type="general"
            title="কোনো ক্যাটাগরি নেই"
            message="এখনো কোনো ক্যাটাগরি তৈরি হয়নি।"
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={cat.link}
                  className="block bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <div className="transform group-hover:rotate-12 transition-transform duration-300">
                      {cat.icon}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      <span className="text-emerald-600 font-bold">{cat.count}</span> পোস্ট
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            সব ক্যাটাগরি দেখুন
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
