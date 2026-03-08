import { FiEdit, FiTrash2, FiPlus, FiSearch, FiFilter, FiX, FiImage } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const API_URL = 'http://localhost:3000';

const categoriesList = [
  { id: 'class-6', name: 'Class 6' },
  { id: 'class-7', name: 'Class 7' },
  { id: 'class-8', name: 'Class 8' },
  { id: 'class-9-10', name: 'Class 9-10' },
  { id: 'hsc', name: 'HSC' },
  { id: 'honours', name: 'Honours' },
  { id: 'admission', name: 'Admission' },
  { id: 'job', name: 'Job' },
  { id: 'scholarship', name: 'Scholarship' },
  { id: 'bcs', name: 'BCS' },
  { id: 'ict', name: 'ICT' },
  { id: 'news', name: 'News' },
  { id: 'notice', name: 'Notice' },
  { id: 'general', name: 'General' }
];

const PostsManagement = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    excerpt: '',
    content: '',
    header: '',
    body: '',
    footer: '',
    image: '',
    fileUrl: '',
    status: 'Published',
    views: 0,
    likes: 0
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      Swal.fire('Error!', 'Failed to fetch posts', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        ...formData,
        createdAt: new Date(),
        date: new Date().toLocaleDateString('bn-BD')
      };
      
      await axios.post(`${API_URL}/posts`, postData);
      Swal.fire('Success!', 'Post added successfully', 'success');
      setShowAddModal(false);
      setFormData({
        title: '',
        author: '',
        category: '',
        excerpt: '',
        content: '',
        header: '',
        body: '',
        footer: '',
        image: '',
        fileUrl: '',
        status: 'Published',
        views: 0,
        likes: 0
      });
      fetchPosts();
    } catch (error) {
      console.error('Error adding post:', error);
      Swal.fire('Error!', 'Failed to add post', 'error');
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      author: post.author,
      category: post.category,
      excerpt: post.excerpt || '',
      content: post.content || '',
      header: post.header || '',
      body: post.body || '',
      footer: post.footer || '',
      image: post.image || '',
      fileUrl: post.fileUrl || '',
      status: post.status || 'Published',
      views: post.views || 0,
      likes: post.likes || 0
    });
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/posts/${editingPost._id}`, formData);
      Swal.fire('Success!', 'Post updated successfully', 'success');
      setEditingPost(null);
      setFormData({
        title: '',
        author: '',
        category: '',
        excerpt: '',
        content: '',
        header: '',
        body: '',
        footer: '',
        image: '',
        fileUrl: '',
        status: 'Published',
        views: 0,
        likes: 0
      });
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      Swal.fire('Error!', 'Failed to update post', 'error');
    }
  };

  const handleDeletePost = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/posts/${id}`);
        Swal.fire('Deleted!', 'Post has been deleted.', 'success');
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
        Swal.fire('Error!', 'Failed to delete post', 'error');
      }
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Posts Management</h1>
          <p className="text-gray-500">Manage your blog posts and content</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
        >
          <FiPlus className="text-xl" />
          Add New Post
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search posts by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500/50 transition"
            />
          </div>
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500/50 transition"
            >
              <option value="">All Categories</option>
              {categoriesList.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Post</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Author</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <FiSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No posts found</p>
                    <p className="text-gray-400 text-sm">Try adjusting your search or filter</p>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg overflow-hidden">
                          {post.image ? (
                            <img src={post.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            post.title?.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 max-w-xs truncate">{post.title}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">{post.excerpt || post.content?.substring(0, 50)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                          {post.author?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-gray-700">{post.author}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        post.status === 'Published' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {post.date || new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEditPost(post)}
                          className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition shadow-sm hover:shadow"
                          title="Edit"
                        >
                          <FiEdit className="text-lg" />
                        </button>
                        <button 
                          onClick={() => handleDeletePost(post._id)}
                          className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition shadow-sm hover:shadow"
                          title="Delete"
                        >
                          <FiTrash2 className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Post Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Add New Post</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleAddPost} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500/50 transition"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500/50 transition"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500/50 transition"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    {categoriesList.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                    <div className="relative">
                      <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="https://example.com/image.jpg"
                        className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500/50 transition"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">File URL (PDF/Drive)</label>
                    <div className="relative">
                      <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="https://drive.google.com/..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500/50 transition"
                        value={formData.fileUrl}
                        onChange={(e) => setFormData({...formData, fileUrl: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt (Short Description)</label>
                  <textarea 
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500/50 transition h-20"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    placeholder="Brief description of the post..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Header</label>
                      <textarea 
                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500/50 transition h-20"
                        value={formData.header}
                        onChange={(e) => setFormData({...formData, header: e.target.value})}
                        placeholder="Intro/Header content..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Body (Main Content)</label>
                      <textarea 
                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500/50 transition h-40"
                        value={formData.body}
                        onChange={(e) => setFormData({...formData, body: e.target.value})}
                        placeholder="Main content..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Footer</label>
                      <textarea 
                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500/50 transition h-20"
                        value={formData.footer}
                        onChange={(e) => setFormData({...formData, footer: e.target.value})}
                        placeholder="Conclusion/Footer content..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500/50 transition"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30 transition"
                >
                  Add Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEditingPost(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Edit Post</h3>
              <button 
                onClick={() => setEditingPost(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleUpdatePost} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/50 transition"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/50 transition"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/50 transition"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    {categoriesList.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                    <div className="relative">
                      <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="https://example.com/image.jpg"
                        className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/50 transition"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">File URL (PDF/Drive)</label>
                    <div className="relative">
                      <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="https://drive.google.com/..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/50 transition"
                        value={formData.fileUrl}
                        onChange={(e) => setFormData({...formData, fileUrl: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt (Short Description)</label>
                  <textarea 
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/50 transition h-20"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    placeholder="Brief description of the post..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Header</label>
                      <textarea 
                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/50 transition h-20"
                        value={formData.header}
                        onChange={(e) => setFormData({...formData, header: e.target.value})}
                        placeholder="Intro/Header content..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Body (Main Content)</label>
                      <textarea 
                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/50 transition h-40"
                        value={formData.body}
                        onChange={(e) => setFormData({...formData, body: e.target.value})}
                        placeholder="Main content..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Footer</label>
                      <textarea 
                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/50 transition h-20"
                        value={formData.footer}
                        onChange={(e) => setFormData({...formData, footer: e.target.value})}
                        placeholder="Conclusion/Footer content..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/50 transition"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setEditingPost(null)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 transition"
                >
                  Update Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsManagement;
