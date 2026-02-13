import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiPlay, FiPause } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const Hero = () => {
  const [stats, setStats] = useState([
    { icon: '📚', number: '০', label: 'পোস্ট' },
    { icon: '👥', number: '০', label: 'পাঠক' },
    { icon: '💼', number: '০', label: 'চাকরি' },
    { icon: '🎁', number: '০', label: 'বৃত্তি' }
  ]);
  const [loading, setLoading] = useState(true);

  const images = [
    {
      src: "https://scontent.fdac24-1.fna.fbcdn.net/v/t39.30808-6/487811722_648733141249020_9015420688462383831_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEndF2ia2CTFK1DJ5hemIs-YmQf3fpI37tiZB_d-kjfu0Z7Vi_lJo6c18Dcs6FEkn4ipFowem27qrnTQz3GDu5f&_nc_ohc=xNEKuhgDFY0Q7kNvwE2OP27&_nc_oc=Adk4OrSn5lG7vB_-4JfQAiMrnDz30ZNc1-JV1qOpj9saNBdzNvczMcIza3CuO_1jcK0&_nc_zt=23&_nc_ht=scontent.fdac24-1.fna&_nc_gid=UWSv7VNGvlXxLfVXyUWhdQ&oh=00_Aft4_Q2t4NQ6kgEOERlLw8GSZwjKD8ui1u9u9vry_2hwKw&oe=6994FB7C",
      alt: "Education",
      title: "শিক্ষা",
      subtitle: "জ্ঞানের আলোয় আলোকিত"
    },
    {
      src: "https://scontent.fdac24-1.fna.fbcdn.net/v/t39.30808-6/515146056_720385374083796_5745346887489570972_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHWatqUxyWLRxAkzJmQKGrSzvQXypqqcvLO9BfKmqpy8uNkBpq5haWBq7hVQOsFMdKw2W6t8dVqQ7Z-8BZJD4AR&_nc_ohc=mXki2SEsiWIQ7kNvwG9npYI&_nc_oc=Adlz2mIWoxfUmexh0GL2j7tYS2IXGQTB8bVe65TGO5im3qrVm2niuLIikU3_4xyLs24&_nc_zt=23&_nc_ht=scontent.fdac24-1.fna&_nc_gid=kJ3We5ae8-V5hN-YHWzo9w&oh=00_AfvoJyweh8ncnr461ry9arLEjI7M8f0DYgSSkD3eXiXxfg&oe=6995048A",
      alt: "Students",
      title: "ছাত্র-ছাত্রী",
      subtitle: "ভবিষ্যতের নির্মাতা"
    },
    {
      src: "https://scontent.fdac24-2.fna.fbcdn.net/v/t39.30808-6/486167014_644119611710373_7086637694220967629_n.jpg?stp=c839.0.1373.1373a_cp6_dst-jpg_s206x206_tt6&_nc_cat=111&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeHBwutEKnm0aTaVAYF23itniALq-eH6Cm2IAur54foKbXSgkTU2DQUvijvsYBEtjuCsnNgQbpATbt2MilubcPaF&_nc_ohc=41tF7Bl9XukQ7kNvwGdpAqs&_nc_oc=AdlhaXnhQc9jwUdoYy0n8kP31r3KFGNoNWqxgBW0fDGEZHgIsXAh11xx_Hx-fZ6Y0f4&_nc_zt=23&_nc_ht=scontent.fdac24-2.fna&_nc_gid=HJIkC9Et2ZaOwZF-BeLnxQ&oh=00_Afsq2P8YEJiDY8hR7L3U5HzVwhoLFMIiF_4Jz2PuD3r2iQ&oe=6994EC07",
      alt: "Learning",
      title: "শিক্ষা",
      subtitle: "কর্মযোগী মানসিকতা"
    },
    {
      src: "https://scontent.fdac24-1.fna.fbcdn.net/v/t39.30808-6/480648044_620771947378473_1727475699099594546_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEEEyfDby8WfcblRZhkN_Rb4uUpbq7cLtfi5Slurtwu17HVti8bLlJiwDeZXmcLYbSySgsE3PsMX4FH8SVoa9jp&_nc_ohc=z4KfcNYTiOUQ7kNvwFjG9VA&_nc_oc=AdlNBFYPJrpayhgNriJV8RLbJerdiqdp6RzNCDzZgIZ1ZiFp1oGPaJTewlCftjby1G8&_nc_zt=23&_nc_ht=scontent.fdac24-1.fna&_nc_gid=r3SahzL3_mEaDhw6YXVZyw&oh=00_AfslwUXi-CRvGXDWzemqHgsNhO1KiPYa6Ylq6IZA5WLqhg&oe=6994F88F",
      alt: "Study",
      title: "পড়াশোনা",
      subtitle: "সাফল্যের মূল চাবিকাঠি"
    },
    {
      src: "https://scontent.fdac24-2.fna.fbcdn.net/v/t39.30808-6/479906253_613730628082605_3189280589909360027_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFZLzmyMs5MEfsTJDv97m6xTc2E-dFmG8VNzYT50WYbxZeUdQ32XyVQteDjo9a0_cwrm3bt-_8GW408OoTxHPQB&_nc_ohc=i_RU8phe-OMQ7kNvwGh2wF0&_nc_oc=AdmvVreRYBq-9dKyMz6umd17cKpVse5vA5MrHI6KeZa-uthLqNfZHDNgQvYp9CkaaF0&_nc_zt=23&_nc_ht=scontent.fdac24-2.fna&_nc_gid=zXwIx4WOWpfbsQi9tBPDLw&oh=00_AftRK8oGiNd8JOfq8QNsy_LlfyeMnBoFn-KNGKC7IYbBSg&oe=69950EBE",
      alt: "Books",
      title: "বই",
      subtitle: "জ্ঞানের ভাণ্ডার"
    },
    {
      src: "https://scontent.fdac198-2.fna.fbcdn.net/v/t39.30808-6/480006794_613730794749255_1563489837658635149_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGeAwivEFZt6zJ1tV_fAiHLnzwUCCf2OKqfPBQIJ_Y4qvWuTsq9j3Pk5Vkx9JCpJ9yMKTarjprlc7DQbYFNt7Q_&_nc_ohc=pkiZG6pp4d0Q7kNvwHp-Vrp&_nc_oc=AdkLg0Pusk-yEssjxpj9sbWfnZOedAV9WpY-8khI6rx9PtLpQqdPjp-n_RcszrKzPTY&_nc_zt=23&_nc_ht=scontent.fdac198-2.fna&_nc_gid=RuhPXsB92tH86EkD2u1zEA&oh=00_AftobKApn4wbXShOYuaKFxXUp-ACICrkHOiXuwZo_RzKlA&oe=6995097C",
      alt: "Graduation",
      title: "স্নাতক",
      subtitle: "স্বপ্নের পরিণতি"
    },
    {
      src: "https://scontent.fdac198-2.fna.fbcdn.net/v/t39.30808-6/479666022_613730904749244_6065156119990134027_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFwayiiKxTnOANegxZ0Fb0jNZUrgH01YWg1lSuAfTVhaCBlBIucReEp7hS2HSVO-HQ1PqfN3nQAR06AhIYcv093&_nc_ohc=UP0aJh87SMkQ7kNvwH53slz&_nc_oc=Adkt5ZlfpHJO7U7YRRhGqoOt52qbefW4PDJk0DUqmy8Iad4QEeVo9CeJD1gJsmd71-o&_nc_zt=23&_nc_ht=scontent.fdac198-2.fna&_nc_gid=XrE_YB2EKEuEfPGCm-d0UA&oh=00_AfvDrEsPgynAvFqjSMoA7smjmyNW2Tp7OXMUabCP916Cug&oe=6994E580",
      alt: "University",
      title: "বিশ্ববিদ্যালয়",
      subtitle: "উচ্চ শিক্ষার প্রতিষ্ঠান"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/stats`);
      const { totalPosts, totalUsers, totalComments } = response.data;
      
      const formatBengali = (num) => {
        if (!num) return '০';
        if (num >= 1000) {
          return '০' + (num / 1000).toFixed(0) + '০০০+';
        }
        const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return num.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('') || '০';
      };

      setStats([
        { icon: '📚', number: formatBengali(totalPosts), label: 'পোস্ট' },
        { icon: '👥', number: formatBengali(totalUsers), label: 'পাঠক' },
        { icon: '💼', number: formatBengali(totalComments), label: 'চাকরি' },
        { icon: '🎁', number: formatBengali(500), label: 'বৃত্তি' }
      ]);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isAutoPlay || isHovered) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlay, isHovered, nextSlide]);

  const currentImage = images[currentIndex];

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white pt-28 pb-20 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-[800px] h-[800px] bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-teal-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-3 rounded-full mb-8 shadow-lg"
          >
            <span className="text-2xl">🎓</span>
            <span className="text-white font-semibold">শিক্ষায় এগিয়ে থাকুন</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight"
          >
            আপনার সাফল্যের যাত্রা
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-6"
          >
            শুরু হোক আমাদের সাথে
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            একাডেমিক, ভর্তি, চাকরি ও বৃত্তির সকল তথ্য এক জায়গায়
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <Link
              to="/blog"
              className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              সর্বশেষ পোস্ট 
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-full shadow-lg hover:shadow-xl border-2 border-emerald-200 transition-all duration-300 hover:scale-105"
            >
              যোগাযোগ করুন
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-emerald-100 group"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-2xl md:text-3xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors">{stat.number}</p>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Image Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div 
            className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/9] group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Main Image */}
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{currentImage.title}</h3>
                    <p className="text-lg md:text-xl text-white/90 font-medium">{currentImage.subtitle}</p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.button
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1 }}
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <FiChevronLeft className="text-2xl" />
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1 }}
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <FiChevronRight className="text-2xl" />
            </motion.button>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            >
              {isAutoPlay ? <FiPause /> : <FiPlay />}
            </button>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <motion.div
                key={currentIndex}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: isAutoPlay ? 5 : 0, ease: "linear" }}
                className="h-full bg-gradient-to-r from-emerald-500 to-green-400"
              />
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white w-8'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                >
                  {index === currentIndex && (
                    <motion.div
                      layoutId="activeDot"
                      className="absolute inset-0 bg-white rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Slide Counter */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full">
              <span className="text-white text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {['একাডেমিক', 'ভর্তি', 'চাকরি', 'বৃত্তি', 'বিসিএস', 'আইসিটি'].map((item, i) => (
            <Link
              key={i}
              to={`/category/${item.toLowerCase()}`}
              className="px-6 py-2 bg-white text-gray-700 font-medium rounded-full shadow-md hover:shadow-lg hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300 border border-gray-100"
            >
              {item}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
