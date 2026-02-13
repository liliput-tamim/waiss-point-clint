import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F0FDF4' }}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#16A34A' }}>EduBlog</h1>
          <p className="text-gray-600">আপনার অ্যাকাউন্টে লগইন করুন</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ইমেইল</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
              style={{ borderColor: '#D1FAE5' }}
              onFocus={(e) => e.target.style.borderColor = '#16A34A'}
              onBlur={(e) => e.target.style.borderColor = '#D1FAE5'}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600">মনে রাখুন</span>
            </label>
            <a href="/forgot-password" className="hover:underline" style={{ color: '#16A34A' }}>
              পাসওয়ার্ড ভুলে গেছেন?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold transition-all hover:shadow-lg"
            style={{ backgroundColor: '#16A34A' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#15803D'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#16A34A'}
          >
            লগইন করুন
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            অ্যাকাউন্ট নেই?{' '}
            <a href="/register" className="font-semibold hover:underline" style={{ color: '#16A34A' }}>
              রেজিস্টার করুন
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

export default Login;
