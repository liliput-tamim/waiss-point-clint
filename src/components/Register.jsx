import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const response = await axios.post('http://localhost:3000/register', {
        name: user.displayName,
        email: user.email,
        password: user.uid,
        role: 'user'
      });

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'রেজিস্ট্রেশন সফল!',
          text: 'এখন লগইন করুন',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (error) {
      console.error('Google register error:', error);
      if (error.response?.data?.message === 'User already exists') {
        Swal.fire({
          icon: 'info',
          title: 'ইউজার ইতিমধ্যে বিদ্যমান',
          text: 'লগইন করুন'
        });
        setTimeout(() => navigate('/login'), 1500);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'রেজিস্ট্রেশন ব্যর্থ!',
          text: error.message || 'Google registration এ সমস্যা'
        });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'পাসওয়ার্ড মিলছে না!',
        text: 'পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড একই হতে হবে'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'user'
      });

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'রেজিস্ট্রেশন সফল!',
          text: 'এখন লগইন করুন',
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'রেজিস্ট্রেশন ব্যর্থ!',
        text: error.response?.data?.message || 'ইউজার ইতিমধ্যে বিদ্যমান'
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
          <h2 className="text-3xl font-bold text-gray-900">রেজিস্টার করুন</h2>
          <p className="text-gray-600 mt-2">নতুন অ্যাকাউন্ট তৈরি করুন</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Social Login */}
          <div className="mb-6">
            <button 
              onClick={handleGoogleRegister}
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

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">নাম</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                  placeholder="আপনার নাম লিখুন"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ইমেইল</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                  placeholder="পাসওয়ার্ড লিখুন"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">পাসওয়ার্ড নিশ্চিত করুন</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                  placeholder="পাসওয়ার্ড আবার লিখুন"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold py-3.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 mt-6 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <span>রেজিস্টার করুন</span>
                  <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
              <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                লগইন করুন
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
