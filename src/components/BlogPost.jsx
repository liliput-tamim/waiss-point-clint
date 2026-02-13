import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiEye, FiHeart, FiMessageCircle, FiUser, FiCalendar, FiShare2, FiThumbsUp, FiSend } from 'react-icons/fi';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:3000';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchPost();
    fetchComments();
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing user data:', e);
        localStorage.removeItem('user');
      }
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      // Try to fetch single post first
      try {
        const response = await axios.get(`${API_URL}/posts/${id}`);
        setPost(response.data);
      } catch (firstError) {
        // Fallback: fetch all posts and find by ID
        const allPostsResponse = await axios.get(`${API_URL}/posts`);
        const foundPost = allPostsResponse.data.find(p => p._id === id);
        if (foundPost) {
          setPost(foundPost);
        }
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_URL}/comments/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleLike = async () => {
    try {
      await axios.put(`${API_URL}/posts/${id}/like`);
      fetchPost(); // Refresh to get updated like count
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleShare = async () => {
    try {
      await axios.put(`${API_URL}/posts/${id}/share`);
      fetchPost(); // Refresh to get updated share count
      
      // Copy link to clipboard
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      Swal.fire({
        title: 'শেয়ার হয়েছে!',
        text: 'পোস্টের লিংক কপি হয়েছে',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      Swal.fire({
        title: 'লগইন প্রয়োজন',
        text: 'কমেন্ট করার জন্য আপনাকে লগইন করতে হবে',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'লগইন করুন',
        cancelButtonText: 'বাতিল'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    if (!newComment.trim()) {
      Swal.fire('Error', 'অনুগ্রহ করে একটি কমেন্ট লিখুন', 'error');
      return;
    }

    try {
      const parsedUser = JSON.parse(localStorage.getItem('user'));
      const userId = parsedUser._id || parsedUser.id;
      
      await axios.post(`${API_URL}/comments`, {
        postId: id,
        userId: userId,
        userName: parsedUser.name,
        text: newComment
      });
      
      Swal.fire('সফল!', 'কমেন্ট যোগ হয়েছে', 'success');
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
      Swal.fire('Error!', 'কমেন্ট যোগ করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।', 'error');
    }
  };

  const handleDeleteComment = async (commentId) => {
    const result = await Swal.fire({
      title: 'কমেন্ট মুছবেন?',
      text: 'আপনি কি নিশ্চিত যে আপনি এই কমেন্টটি মুছতে চান?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'হ্যাঁ, মুছুন!',
      cancelButtonText: 'বাতিল'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/comments/${commentId}`);
        Swal.fire('মুছে হয়েছে!', 'কমেন্ট মুছে হয়েছে।', 'success');
        fetchComments();
      } catch (error) {
        Swal.fire('Error!', 'কমেন্ট মুছতে ব্যর্থ হয়েছে', 'error');
      }
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    if (typeof date === 'string') return date;
    return new Date(date).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">পোস্ট পাওয়া যায়নি</h2>
          <Link to="/blog" className="text-emerald-600 hover:underline">
            ব্লগে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={post.image || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200'}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <span className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/90 flex-wrap">
              <span className="flex items-center gap-2">
                <FiUser /> {post.author}
              </span>
              <span className="flex items-center gap-2">
                <FiCalendar /> {formatDate(post.date || post.createdAt)}
              </span>
              <span className="flex items-center gap-2">
                <FiEye /> {post.views || 0} ভিউ
              </span>
              <span className="flex items-center gap-2">
                <FiMessageCircle /> {comments.length} কমেন্ট
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-100">
            <button 
              onClick={handleLike}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              <FiThumbsUp className="text-emerald-600" />
              <span>{post.likes || 0} লাইক</span>
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              <FiShare2 className="text-emerald-600" />
              <span>শেয়ার করুন</span>
            </button>
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FiMessageCircle className="text-emerald-600" />
            কমেন্ট ({comments.length})
          </h2>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FiUser className="text-emerald-600" />
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={user ? "কমেন্ট লিখুন..." : "কমেন্ট করতে লগইন করুন..."}
                  disabled={!user}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500/50 transition resize-none h-24"
                />
                <button
                  type="submit"
                  disabled={!user || !newComment.trim()}
                  className="mt-2 px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <FiSend />
                  <span>পাঠান</span>
                </button>
              </div>
            </div>
            {!user && (
              <p className="text-gray-500 text-sm mt-2">
                কমেন্ট করার জন্য <Link to="/login" className="text-emerald-600 hover:underline">লগইন</Link> করুন
              </p>
            )}
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">এখনো কোনো কমেন্ট নেই। প্রথম কমেন্ট করুন!</p>
            ) : (
              comments.map((comment, i) => (
                <motion.div
                  key={comment._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {comment.userName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{comment.userName}</h4>
                      <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                    {(user?._id === comment.userId || user?.id === comment.userId || user?.role === 'admin') && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-red-500 text-sm mt-2 hover:underline"
                      >
                        মুছুন
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition"
          >
            ← ব্লগে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
