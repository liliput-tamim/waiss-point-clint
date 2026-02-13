import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Try to register first, if exists then login
      try {
        await axios.post('http://localhost:3000/register', {
          name: user.displayName,
          email: user.email,
          password: user.uid,
          role: 'user'
        });
      } catch (regError) {
        // User already exists, continue to login
      }

      // Login with Google credentials
      const loginResponse = await axios.post('http://localhost:3000/login', {
        email: user.email,
        password: user.uid
      });

      if (loginResponse.data.success) {
        localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
        
        Swal.fire({
          icon: 'success',
          title: 'লগইন সফল!',
          text: `স্বাগতম ${loginResponse.data.user.name}`,
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(() => navigate('/'), 1500);
      }
    } catch (error) {
      console.error('Google login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'লগইন ব্যর্থ!',
        text: error.message || 'Google login এ সমস্যা হয়েছে'
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        Swal.fire({
          icon: 'success',
          title: 'লগইন সফল!',
          text: `স্বাগতম ${response.data.user.name}`,
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(() => {
          if (response.data.user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }, 1500);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'লগইন ব্যর্থ!',
        text: 'ইমেইল বা পাসওয়ার্ড ভুল হয়েছে'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/481191097_622757057179962_971591103180726496_n-removebg-preview.png" 
            alt="Logo" 
            className="h-52 mx-auto mb-4 animate-pulse"
          />
          <h2 className="text-3xl font-bold text-gray-900">লগইন করুন</h2>
          <p className="text-gray-600 mt-2">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Social Login */}
          <div className="mb-6">
            <button 
              onClick={handleGoogleLogin}
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:border-emerald-500"
            >
              <FcGoogle className="text-2xl" />
              <span className="font-medium text-gray-700">Continue with Google</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">অথবা ইমেইল দিয়ে</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ইমেইল</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                  placeholder="আপনার ইমেইল লিখুন"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">পাসওয়ার্ড</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold py-3.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <span>লগইন করুন</span>
                  <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              নতুন ইউজার?{' '}
              <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                রেজিস্টার করুন
              </Link>
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Login;
