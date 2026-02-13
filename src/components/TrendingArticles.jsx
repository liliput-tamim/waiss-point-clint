import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiTrendingUp, FiEye, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import NoData, { SkeletonLoader } from './NoData';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const TrendingArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingArticles();
  }, []);

  const fetchTrendingArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/posts`);
      // Get published posts sorted by views
      const publishedPosts = response.data
        .filter(post => post.status === 'Published')
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5);
      setArticles(publishedPosts);
    } catch (err) {
      console.error('Error fetching trending articles:', err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const featuredArticle = articles.find(a => a.isFeatured) || articles[0];
  const trendingArticles = articles.filter(a => (a._id || a.id) !== (featuredArticle?._id || featuredArticle?.id));

  const formatViews = (views) => {
    if (!views) return '0';
    if (views >= 1000) return (views / 1000).toFixed(1) + 'k';
    return views.toString();
  };

  const formatDate = (date) => {
    if (!date) return 'আগে';
    if (typeof date === 'string') return date;
    return new Date(date).toLocaleDateString('bn-BD');
  };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
            <div>
              <div className="h-10 bg-gray-200 rounded w-64 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-40 animate-pulse mt-2"></div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SkeletonLoader type="banner" />
            </div>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <SkeletonLoader key={i} type="card" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
            <FiTrendingUp className="text-3xl text-emerald-600" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">ট্রেন্ডিং আর্টিকেল</h2>
            <p className="text-gray-600 mt-1">সবচেয়ে জনপ্রিয় কন্টেন্ট</p>
          </div>
        </motion.div>

        {articles.length === 0 ? (
          <NoData
            type="posts"
            title="কোনো ট্রেন্ডিং আর্টিকেল নেই"
            message="এখনো কোনো জনপ্রিয় আর্টিকেল প্রকাশিত হয়নি।"
            actionLabel="প্রথম আর্টিকেল প্রকাশ করুন"
          />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured Article */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              {featuredArticle && (
                <Link to={`/post/${featuredArticle._id}`} className="block">
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="relative h-[400px]">
                      <img
                        src={featuredArticle.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute top-6 left-6">
                        <span className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          {featuredArticle.category || 'একাডেমিক'}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 line-clamp-2">
                          {featuredArticle.title}
                        </h3>
                        <p className="text-gray-200 mb-4 line-clamp-2">
                          {featuredArticle.excerpt}
                        </p>
                        <div className="flex items-center gap-6 text-sm">
                          <span className="flex items-center gap-2">
                            <FiClock /> {formatDate(featuredArticle.date || featuredArticle.createdAt)}
                          </span>
                          <span className="flex items-center gap-2">
                            <FiEye /> {formatViews(featuredArticle.views)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )}
            </motion.div>

            {/* Trending Sidebar */}
            <div className="space-y-6">
              {trendingArticles.map((article, i) => (
                <motion.div
                  key={article._id || i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/post/${article._id}`} className="block">
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex gap-4 group"
                    >
                      <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
                        <img
                          src={article.image || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400'}
                          alt={article.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors duration-300"></div>
                      </div>
                      <div className="py-4 pr-4 flex-1 flex flex-col justify-center">
                        <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mb-2 w-fit">
                          {article.category}
                        </span>
                        <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-auto">
                          <span className="flex items-center gap-1">
                            <FiClock /> {formatDate(article.date || article.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiEye /> {formatViews(article.views)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}

              {/* View All Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/blog"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-gray-100 hover:bg-emerald-600 hover:text-white rounded-xl font-semibold text-gray-700 transition-all duration-300"
                >
                  সব আর্টিকেল দেখুন <FiArrowRight />
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingArticles;
