import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiArrowRight, FiEye, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import NoData, { SkeletonLoader } from './NoData';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const LatestPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  const fetchLatestPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/posts`);
      // Filter only published posts and take latest 6
      const publishedPosts = response.data
        .filter(post => post.status === 'Published')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);
      setPosts(publishedPosts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.message);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'আগে';
    if (typeof date === 'string') return date;
    return new Date(date).toLocaleDateString('bn-BD');
  };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div>
              <div className="h-10 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-64 animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse hidden md:block"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">সর্বশেষ পোস্ট</h2>
            <p className="text-lg text-gray-600">আজকের সবচেয়ে গুরুত্বপূর্ণ আপডেট</p>
          </div>
          <Link to="/blog" className="hidden md:flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            সব দেখুন <FiArrowRight />
          </Link>
        </motion.div>

        {posts.length === 0 ? (
          <NoData
            type="posts"
            title="কোনো পোস্ট পাওয়া যায়নি"
            message="এখনো কোনো পোস্ট প্রকাশিত হয়নি। প্রথম পোস্টটি প্রকাশ করুন!"
            actionLabel="পোস্ট যোগ করুন"
            onAction={() => window.location.href = '/admin/posts'}
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.div
                key={post._id || i}
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
                        {post.category || 'একাডেমিক'}
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
                        <span className="text-sm font-medium text-gray-700">{post.author || 'Waiss Point'}</span>
                      </div>
                      <button className="btn btn-sm bg-emerald-600 text-white hover:bg-emerald-700 border-0 gap-2">
                        বিস্তারিত <FiArrowRight />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center md:hidden"
          >
            <Link to="/blog" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-lg">
              সব পোস্ট দেখুন <FiArrowRight />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LatestPosts;
