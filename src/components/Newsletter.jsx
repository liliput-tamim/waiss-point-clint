import { useState } from 'react';
import { FiMail, FiSend } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-emerald-600 to-green-600">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiMail className="text-4xl text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">নিয়মিত আপডেট পান</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            শিক্ষা, ভর্তি, চাকরি ও বৃত্তির সর্বশেষ তথ্য সরাসরি আপনার ইমেইলে পান
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="আপনার ইমেইল লিখুন"
            className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
          />
          <button className="btn bg-white text-emerald-600 hover:bg-gray-100 border-0 px-8 py-4 rounded-xl font-bold gap-2">
            <FiSend /> সাবস্ক্রাইব
          </button>
        </div>
        <div className="flex items-center justify-center gap-8 text-white/90 text-sm">
          <span>✅ ১০০% ফ্রি</span>
          <span>🔒 নিরাপদ</span>
          <span>📧 স্পাম নেই</span>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
