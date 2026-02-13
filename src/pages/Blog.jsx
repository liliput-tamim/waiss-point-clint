import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiClock, FiEye, FiHeart, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import NoData, { SkeletonLoader } from '../components/NoData';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories] = useState(['all', 'একাডেমিক', 'ভর্তি', 'চাকরি', 'বৃত্তি', 'আইসিটি', 'বিসিএস', 'নোটিশ']);

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/posts`);
      
      // Filter published posts
      let publishedPosts = response.data.filter(post => post.status === 'Published');
      
      // If category is selected, filter by category
      if (selectedCategory !== 'all') {
        publishedPosts = publishedPosts.filter(post => 
          post.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
      
      // Sort by date
      publishedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setPosts(publishedPosts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date) => {
    if (!date) return 'আগে';
    if (typeof date === 'string') return date;
    return new Date(date).toLocaleDateString('bn-BD');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            আমাদের ব্লগ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-emerald-100 mb-8"
          >
            সর্বশেষ আপডেট, টিপস এবং গুরুত্বপূর্ণ তথ্য
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto relative"
          >
            <input
              type="text"
              placeholder="পোস্ট খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-12 pr-20 rounded-full text-gray-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-emerald-50'
              }`}
            >
              {cat === 'all' ? 'সব ক্যাটাগরি' : cat}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <NoData
            type="posts"
            title="কোনো পোস্ট পাওয়া যায়নি"
            message={searchTerm ? `"${searchTerm}" এ কোনো পোস্ট পাওয়া যায়নি। অন্য কিছু খুঁজে দেখুন।` : 'এখনো কোনো পোস্ট প্রকাশিত হয়নি।'}
            actionLabel="সব পোস্ট দেখুন"
            onAction={() => { setSearchTerm(''); setSelectedCategory('all'); }}
          />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                <span className="font-semibold text-emerald-600">{filteredPosts.length}</span>টি পোস্ট পাওয়া গেছে
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group"
                >
                  <Link to={`/post/${post._id}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600'}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/95 backdrop-blur-sm text-emerald-700 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          {post.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                        <span className="flex items-center gap-1">
                          <FiClock /> {formatDate(post.date || post.createdAt)}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <FiEye /> {post.views || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiHeart /> {post.likes || 0}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-emerald-600 font-semibold text-sm">
                              {(post.author || 'W').charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{post.author}</span>
                        </div>
                        <span className="flex items-center gap-1 text-emerald-600 font-medium text-sm">
                          বিস্তারিত →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
