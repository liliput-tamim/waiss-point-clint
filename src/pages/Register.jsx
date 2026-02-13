import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F0FDF4' }}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#16A34A' }}>EduBlog</h1>
          <p className="text-gray-600">নতুন অ্যাকাউন্ট তৈরি করুন</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">নাম</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
              style={{ borderColor: '#D1FAE5' }}
              onFocus={(e) => e.target.style.borderColor = '#16A34A'}
              onBlur={(e) => e.target.style.borderColor = '#D1FAE5'}
              placeholder="আপনার নাম"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ইমেইল</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
              style={{ borderColor: '#D1FAE5' }}
              onFocus={(e) => e.target.style.borderColor = '#16A34A'}
              onBlur={(e) => e.target.style.borderColor = '#D1FAE5'}
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">পাসওয়ার্ড</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
              style={{ borderColor: '#D1FAE5' }}
              onFocus={(e) => e.target.style.borderColor = '#16A34A'}
              onBlur={(e) => e.target.style.borderColor = '#D1FAE5'}
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">পাসওয়ার্ড নিশ্চিত করুন</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
              style={{ borderColor: '#D1FAE5' }}
              onFocus={(e) => e.target.style.borderColor = '#16A34A'}
              onBlur={(e) => e.target.style.borderColor = '#D1FAE5'}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold transition-all hover:shadow-lg"
            style={{ backgroundColor: '#16A34A' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#15803D'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#16A34A'}
          >
            রেজিস্টার করুন
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
            <a href="/login" className="font-semibold hover:underline" style={{ color: '#16A34A' }}>
              লগইন করুন
            </a>
          </p>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-500 hover:underline">
            ← হোমপেজে ফিরে যান
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
