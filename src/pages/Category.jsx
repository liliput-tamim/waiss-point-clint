import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiClock, FiEye, FiHeart, FiX, FiGrid, FiList } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import NoData, { SkeletonLoader } from '../components/NoData';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const categoryTranslations = {
  'academic': 'একাডেমিক',
  'admission': 'ভর্তি',
  'jobs': 'চাকরি',
  'results': 'ফলাফল',
  'scholarships': 'বৃত্তি',
  'ict': 'আইসিটি',
  'bcs': 'বিসিএস',
  'notice': 'নোটিশ'
};

const allCategories = ['একাডেমিক', 'ভর্তি', 'চাকরি', 'বৃত্তি', 'আইসিটি', 'বিসিএস', 'নোটিশ', 'ফলাফল'];

const Category = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  
  const categoryName = categoryTranslations[category?.toLowerCase()] || 
    category?.charAt(0).toUpperCase() + category?.slice(1) || category;

  useEffect(() => {
    fetchPostsByCategory();
  }, [category]);

  const fetchPostsByCategory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/posts`);
      
      // Filter published posts
      let filteredPosts = response.data.filter(post => post.status === 'Published');
      
      // Filter by category (case insensitive)
      if (categoryName) {
        filteredPosts = filteredPosts.filter(post => 
          post.category?.toLowerCase() === categoryName.toLowerCase()
        );
      }
      
      // Sort by date
      filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setPosts(filteredPosts);
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
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-3"
          >
            {categoryName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-emerald-100 mb-6"
          >
            সর্বশেষ আপডেট, টিপস এবং গুরুত্বপূর্ণ তথ্য
          </motion.p>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {allCategories.map((cat, i) => (
              <Link
                key={i}
                to={`/category/${cat.toLowerCase()}`}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  cat === categoryName
                    ? 'bg-white text-emerald-600 shadow-lg'
                    : 'bg-emerald-700/50 text-white hover:bg-emerald-700'
                }`}
              >
                {cat}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search & View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="পোস্ট খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-full bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <FiList />
            </button>
          </div>
        </motion.div>

        {/* Posts Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-emerald-600">{filteredPosts.length}</span>টি পোস্ট পাওয়া গেছে
          </p>
        </div>

        {loading ? (
          <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-4"}>
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader key={i} type={viewMode === 'grid' ? "card" : "list"} />
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <NoData
            type="posts"
            title="কোনো পোস্ট পাওয়া যায়নি"
            message={searchTerm ? `"${searchTerm}" এ কোনো পোস্ট পাওয়া যায়নি। অন্য কিছু খুঁজে দেখুন।` : `এখনো ${categoryName} ক্যাটাগরিতে কোনো পোস্ট প্রকাশিত হয়নি।`}
            actionLabel="সব পোস্ট দেখুন"
            onAction={() => window.location.href = '/blog'}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={viewMode === 'grid' 
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-4"
            }
          >
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={viewMode === 'grid' ? { y: -8 } : { x: 4 }}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group ${viewMode === 'list' ? 'flex' : ''}`}
              >
                <Link to={`/post/${post._id}`} className={`block ${viewMode === 'list' ? 'flex w-full' : ''}`}>
                  {/* Image */}
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'h-48'}`}>
                    <img
                      src={post.image || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600'}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/95 backdrop-blur-sm text-emerald-700 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {post.category || categoryName}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt || post.content?.substring(0, 100)}...
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
                        <span className="text-sm font-medium text-gray-700">{post.author || 'Waiss Point'}</span>
                      </div>
                      <span className="text-emerald-600 font-medium text-sm">
                        বিস্তারিত →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Category;
