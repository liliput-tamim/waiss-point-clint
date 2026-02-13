import { FiFacebook, FiTwitter, FiYoutube, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-green-50 via-green-100 to-green-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-6 hover:bg-white shadow-lg transition-all duration-300 border border-green-200">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/481191097_622757057179962_971591103180726496_n-removebg-preview.png" 
                alt="Waiss Point Blog" 
                className="w-auto h-[200px] object-contain"
              />
              {/* <span className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">Waiss Point Blog</span> */}
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              বাংলাদেশের শিক্ষার্থীদের জন্য একাডেমিক, ভর্তি, চাকরি ও বৃত্তির সকল তথ্য এক জায়গায়।
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FiFacebook, color: "hover:bg-blue-600" },
                { Icon: FiTwitter, color: "hover:bg-sky-500" },
                { Icon: FiYoutube, color: "hover:bg-red-600" },
                { Icon: FiInstagram, color: "hover:bg-pink-600" }
              ].map(({ Icon, color }, i) => (
                <a key={i} href="#" className={`w-11 h-11 bg-green-100 ${color} rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg shadow-lg/20`}>
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 hover:bg-white shadow-lg transition-all duration-300 border border-green-200">
            <h4 className="text-lg font-bold mb-6 text-green-700">দ্রুত লিংক</h4>
            <nav className="space-y-3">
              {['হোম', 'আমাদের সম্পর্কে', 'যোগাযোগ', 'প্রাইভেসি পলিসি', 'শর্তাবলী'].map((link, i) => (
                <a key={i} href="#" className="block text-gray-700 hover:text-green-600 hover:translate-x-2 transition-all duration-300">{link}</a>
              ))}
            </nav>
          </div>

          <div className="bg-white rounded-2xl p-6 hover:bg-white shadow-lg transition-all duration-300 border border-green-200">
            <h4 className="text-lg font-bold mb-6 text-green-700">ক্যাটাগরি</h4>
            <nav className="space-y-3">
              {['একাডেমিক', 'ভর্তি পরীক্ষা', 'চাকরি', 'বৃত্তি', 'আইসিটি', 'বিসিএস'].map((cat, i) => (
                <a key={i} href="#" className="block text-gray-700 hover:text-green-600 hover:translate-x-2 transition-all duration-300">{cat}</a>
              ))}
            </nav>
          </div>

          <div className="bg-white rounded-2xl p-6 hover:bg-white shadow-lg transition-all duration-300 border border-green-200">
            <h4 className="text-lg font-bold mb-6 text-green-700">যোগাযোগ</h4>
            <div className="space-y-4">
              <a href="mailto:waisspoint@gmail.com" className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-all duration-300 hover:translate-x-1">
                <FiMail className="text-green-600" /> waisspoint@gmail.com
              </a>
              <a href="tel:+8801677118081" className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-all duration-300 hover:translate-x-1">
                <FiPhone className="text-green-600" /> +880 1677118081
              </a>
              <p className="flex items-start gap-3 text-gray-700">
                <FiMapPin className="text-green-600 mt-1" /> ৪৫, দক্ষিণ বাসাবো (প্রথম তলা), (বাসাবো কাজী অফিসের বিপরীতে) ঢাকা ১২১৪, বাংলাদেশ
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-green-200 pt-8 text-center">
          <p className="text-gray-600">© 2026 Waiss Point. All rights reserved. <span className="inline-flex items-center gap-2 font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-pulse">Made with <span className="text-red-500 animate-bounce">❤️</span> <span className="bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">TABED</span></span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
