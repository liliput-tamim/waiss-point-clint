import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FiTrash2, FiMessageSquare, FiSearch, FiFilter, FiX, FiMessageCircle, FiUser, FiCalendar } from 'react-icons/fi';

const CommentsManagement = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/comments');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const result = await Swal.fire({
      title: 'Delete Comment?',
      html: '<p class="text-gray-600">Are you sure you want to delete this comment? This action cannot be undone.</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete!',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/comments/${commentId}`);
        Swal.fire('Deleted!', 'Comment has been deleted', 'success');
        fetchComments();
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete comment', 'error');
      }
    }
  };

  const filteredComments = comments.filter(comment => {
    const searchLower = searchTerm.toLowerCase();
    return (
      comment.userName?.toLowerCase().includes(searchLower) ||
      comment.text?.toLowerCase().includes(searchLower) ||
      comment.postTitle?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading comments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Comments Management</h1>
          <p className="text-gray-500">Review and moderate user comments</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white px-4 py-2 rounded-xl shadow border border-gray-200">
            <span className="text-gray-500 text-sm">Total Comments:</span>
            <span className="font-bold text-gray-900 ml-2">{comments.length}</span>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-2xl shadow-purple-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <FiMessageSquare className="text-3xl" />
            </div>
            <div>
              <p className="text-purple-100 text-sm">Total Comments</p>
              <p className="text-4xl font-bold">{comments.length}</p>
            </div>
          </div>
          <div className="hidden md:block">
            <p className="text-purple-100 text-sm">Keep your community engaged</p>
            <p className="text-purple-200 text-xs">Moderate with care</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Search comments by user, content or post..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-purple-500/50 transition"
          />
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <FiMessageCircle className="text-8xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No comments yet</p>
            <p className="text-gray-400 text-sm">Comments will appear here once users start posting</p>
          </div>
        ) : (
          filteredComments.map((comment) => (
            <div 
              key={comment._id} 
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/30">
                    {comment.userName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-gray-900 text-lg">{comment.userName || 'Anonymous'}</span>
                    <span className="flex items-center gap-1 text-gray-500 text-sm">
                      <FiCalendar className="text-xs" />
                      {new Date(comment.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-3">{comment.text}</p>
                  {comment.postTitle && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-600">
                      <FiMessageCircle className="text-xs" />
                      <span>On: <strong>{comment.postTitle}</strong></span>
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition shadow-sm hover:shadow group"
                  >
                    <FiTrash2 className="text-lg group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsManagement;
