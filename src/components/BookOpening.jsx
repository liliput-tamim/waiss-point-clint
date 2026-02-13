import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen } from 'react-icons/fi';

const mathSymbols = ['A', 'B', 'C', 'D', '1', '2', '3', '4', '∑', '√', 'π', '∞', 'x²', 'y', 'z', 'α', 'β', 'γ', 'θ', 'Δ', '+', '-', '×', '÷', '=', '%'];
const scienceSymbols = ['⚛️', '🧬', '⚗️', '🔬', '🧪', '⚡', '🌡️', '🔭', 'E=mc²', '⚛️', '🧬', '☢️', '🌍', '🌙', '⭐'];

const FloatingSymbol = ({ symbol, delay, duration, startY, endY, startX, endX, size, color }) => {
  return (
    <motion.div
      className={`absolute ${color} opacity-30 select-none`}
      style={{
        fontSize: `${size}rem`,
        fontWeight: 'bold',
        left: `${startX}%`,
        top: `${startY}%`,
      }}
      initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
      animate={{
        opacity: [0, 0.4, 0.2, 0],
        y: [0, endY],
        x: [0, endX],
        scale: [0.5, 1, 0.8],
        rotate: [0, Math.random() * 30 - 15, Math.random() * 60 - 30],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2 + 1,
        ease: "easeOut",
      }}
    >
      {symbol}
    </motion.div>
  );
};

const BookOpening = ({ onComplete }) => {
  const [isOpening, setIsOpening] = useState(true);
  const [pageFlipped, setPageFlipped] = useState(0);
  const [showSymbols, setShowSymbols] = useState(true);

  useEffect(() => {
    // Start opening animation
    const timer1 = setTimeout(() => {
      setPageFlipped(1);
    }, 500);

    const timer2 = setTimeout(() => {
      setPageFlipped(2);
    }, 1500);

    const timer3 = setTimeout(() => {
      setIsOpening(false);
      setShowSymbols(false);
      if (onComplete) onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isOpening && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center overflow-hidden"
        >
          {/* Floating Math & Science Symbols */}
          {showSymbols && (
            <>
              {/* Math Symbols - Left side (halka movement) */}
              {mathSymbols.map((symbol, i) => (
                <FloatingSymbol
                  key={`math-${i}`}
                  symbol={symbol}
                  delay={i * 0.1}
                  duration={4 + Math.random() * 3}
                  startY={30 + Math.random() * 40}
                  endY={-20 - Math.random() * 30}
                  startX={5 + Math.random() * 25}
                  endX={-10 + Math.random() * 20}
                  size={0.8 + Math.random() * 1.2}
                  color="text-emerald-300"
                />
              ))}

              {/* Science Symbols - Right side */}
              {scienceSymbols.map((symbol, i) => (
                <FloatingSymbol
                  key={`science-${i}`}
                  symbol={symbol}
                  delay={i * 0.15}
                  duration={5 + Math.random() * 4}
                  startY={20 + Math.random() * 50}
                  endY={-30 - Math.random() * 40}
                  startX={70 + Math.random() * 25}
                  endX={-5 + Math.random() * 15}
                  size={1 + Math.random() * 1.5}
                  color="text-teal-300"
                />
              ))}

              {/* Center symbols */}
              {['∑', '√', 'π', '⚛️', '🧬'].map((symbol, i) => (
                <FloatingSymbol
                  key={`center-${i}`}
                  symbol={symbol}
                  delay={i * 0.2 + 0.5}
                  duration={6 + Math.random() * 3}
                  startY={10 + Math.random() * 60}
                  endY={-40 - Math.random() * 20}
                  startX={40 + Math.random() * 20}
                  endX={-5 + Math.random() * 10}
                  size={1.2 + Math.random() * 0.8}
                  color="text-white/40"
                />
              ))}
            </>
          )}

          {/* Ambient particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  y: [null, -100 - Math.random() * 50],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* 3D Book Container */}
          <div className="perspective-1000 z-10">
            <motion.div
              className="relative w-80 h-96 transform-style-3d cursor-pointer"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Book Spine */}
              <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-amber-800 to-amber-700 transform-style-3d transform rotate-y-90 origin-left z-20 shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-amber-200 writing-vertical text-sm font-bold tracking-wider">WAISS POINT</div>
                </div>
              </div>

              {/* Back Cover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 rounded-lg shadow-2xl transform-style-3d back"
                style={{
                  transform: `translateZ(-20px) rotateY(${pageFlipped >= 1 ? '-160deg' : '0deg'})`,
                  transformOrigin: 'left center',
                  transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div className="absolute inset-2 bg-gradient-to-br from-amber-950/50 to-transparent rounded-md" />
              </motion.div>

              {/* Inside Left Page */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg shadow-inner transform-style-3d"
                style={{
                  transform: `translateZ(-10px) rotateY(${pageFlipped >= 1 ? '-160deg' : '0deg'})`,
                  transformOrigin: 'left center',
                  transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div className="p-8 h-full flex flex-col justify-center items-center text-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: pageFlipped >= 1 ? 1 : 0, x: pageFlipped >= 1 ? 0 : -20 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <FiBookOpen className="text-6xl text-amber-800 mb-4 mx-auto" />
                    <h2 className="text-2xl font-bold text-amber-900 mb-2">Welcome to</h2>
                    <h1 className="text-3xl font-black text-emerald-700">Waiss Point</h1>
                    <p className="text-amber-700 mt-4 text-sm">Education Portal</p>
                  </motion.div>
                </div>
                <div className="absolute right-8 top-20 bottom-20 w-px bg-amber-300/50" />
              </motion.div>

              {/* Front Cover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-lg shadow-2xl transform-style-3d"
                style={{
                  transform: `translateZ(10px) rotateY(${pageFlipped >= 2 ? '160deg' : '0deg'})`,
                  transformOrigin: 'right center',
                  transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div className="absolute inset-4 border-2 border-emerald-400/30 rounded-md" />
                <div className="absolute inset-8 bg-gradient-to-br from-emerald-800/30 to-transparent rounded-sm" />
                
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 border-4 border-emerald-400/50 rounded-full mx-auto mb-4 flex items-center justify-center"
                  >
                    <div className="w-20 h-20 border-4 border-emerald-400/30 rounded-full flex items-center justify-center">
                      <span className="text-4xl">📚</span>
                    </div>
                  </motion.div>
                </div>
                
                <div className="absolute bottom-16 left-0 right-0 text-center px-8">
                  <h1 className="text-3xl font-black text-white mb-2">শিক্ষায় এগিয়ে থাকুন</h1>
                  <p className="text-emerald-200 text-sm">Your Success Starts Here</p>
                </div>

                <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400/50 rounded-full" />
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-emerald-400/50 rounded-full" />
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-emerald-400/50 rounded-full" />
              </motion.div>

              {/* Right Page */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-l from-amber-50 to-amber-100 rounded-lg shadow-inner transform-style-3d"
                style={{
                  transform: `translateZ(-5px) rotateY(${pageFlipped >= 2 ? '160deg' : '0deg'})`,
                  transformOrigin: 'right center',
                  transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div className="p-8 h-full flex flex-col justify-center items-center text-center">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: pageFlipped >= 2 ? 1 : 0, x: pageFlipped >= 2 ? 0 : 20 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-amber-900 mb-4">Explore</h2>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-2 text-amber-800">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-sm">Academic Resources</span>
                      </div>
                      <div className="flex items-center gap-2 text-amber-800">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-sm">Job Preparations</span>
                      </div>
                      <div className="flex items-center gap-2 text-amber-800">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-sm">Scholarships</span>
                      </div>
                      <div className="flex items-center gap-2 text-amber-800">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-sm">Career Guidance</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="absolute left-8 top-20 bottom-20 w-px bg-amber-300/50" />
              </motion.div>
            </motion.div>
          </div>

          {/* Loading text */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-emerald-200 text-sm font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {pageFlipped === 0 && 'Opening...'}
            {pageFlipped === 1 && 'Turning page...'}
            {pageFlipped === 2 && 'Loading content...'}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Content Fade In Component
export const ContentFadeIn = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default BookOpening;
