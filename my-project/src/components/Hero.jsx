// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section name="home" className="relative min-h-[88vh] md:min-h-screen flex items-center px-4 py-24 md:py-32 overflow-hidden bg-[#030712]">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712] z-0"></div>
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-10"></div>
        
        {/* Glowing Orbs using framer-motion */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00A39C] rounded-full mix-blend-screen filter blur-[120px] z-10"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] z-10"
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-20 w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-teal-500/30 bg-teal-500/10 backdrop-blur-md"
          >
            <span className="text-sm font-semibold text-[#00A39C] tracking-wider uppercase">WELCOME TO RAVINDU LABS</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold my-4 leading-tight text-white max-w-xl mx-auto md:mx-0">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A39C] to-indigo-400">Ravindu</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-lg mb-10 mx-auto md:mx-0 leading-relaxed font-light">
            A passionate Software Engineer & AI Enthusiast. I build scalable digital experiences, explore cutting-edge tech, and write about innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Link 
              to="articles" 
              smooth={true} 
              duration={500} 
              offset={-80} 
              className="w-full sm:w-auto cursor-pointer bg-gradient-to-r from-[#00A39C] to-teal-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              Read My Articles
            </Link>
            <Link 
              to="about" 
              smooth={true} 
              duration={500} 
              offset={-80} 
              className="w-full sm:w-auto cursor-pointer bg-white/5 border border-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition-all duration-300"
            >
              About the Author
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden md:flex justify-center items-center relative"
        >
          {/* Abstract geometric shapes or personal photo placeholder */}
          <div className="relative w-80 h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00A39C] to-indigo-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
            <div className="absolute inset-4 bg-slate-900 rounded-full border border-white/10 backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-2xl">
              {/* Replace with your own image later, keeping a cool abstract placeholder for now */}
              <div className="text-slate-700 text-9xl">👨‍💻</div>
            </div>
            {/* Floating badges */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -left-6 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-xl flex items-center justify-center"
            >
              <span className="text-4xl" title="React">⚛️</span>
            </motion.div>
            <motion.div 
              animate={{ y: [10, -10, 10] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 -right-4 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-xl flex items-center justify-center"
            >
              <span className="text-4xl" title="Python">🐍</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;