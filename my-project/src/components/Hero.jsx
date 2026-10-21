// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaBookOpen, FaClock, FaArrowRight, FaTerminal } from 'react-icons/fa';
import api, { fetchApprovedArticles } from '../services/api';
import { articlesData } from '../data';
import { getValidImageUrl, handleImageError } from '../utils/imageUtils';

const Hero = () => {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState(() => {
    try {
      const cachedFeatured = localStorage.getItem('ravindu_labs_cached_featured');
      if (cachedFeatured) return JSON.parse(cachedFeatured);
      const cachedFeed = localStorage.getItem('ravindu_labs_cached_articles');
      if (cachedFeed) {
        const parsed = JSON.parse(cachedFeed);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.find(a => a.isFeatured) || parsed[0];
        }
      }
    } catch (e) {}
    return (articlesData && articlesData.length > 0) ? (articlesData.find(a => a.isFeatured) || articlesData[0]) : null;
  });

  useEffect(() => {
    let isMounted = true;
    const fetchTopArticle = async () => {
      try {
        const items = await fetchApprovedArticles();
        if (isMounted && items && items.length > 0) {
          const top = items.find(a => a.isFeatured) || items[0];
          setFeatured(top);
          try {
            localStorage.setItem('ravindu_labs_cached_featured', JSON.stringify(top));
          } catch (e) {}
        } else if (articlesData.length > 0 && !featured) {
          setFeatured(articlesData.find(a => a.isFeatured) || articlesData[0]);
        }
      } catch (err) {
        if (articlesData.length > 0 && !featured) {
          setFeatured(articlesData.find(a => a.isFeatured) || articlesData[0]);
        }
      }
    };
    fetchTopArticle();
    return () => { isMounted = false; };
  }, []);

  return (
    <section name="home" className="relative min-h-[85vh] md:min-h-[92vh] flex items-center px-4 pt-28 pb-16 md:py-32 overflow-hidden bg-[#070b14] text-white">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        {/* Radial glow orbs */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-[32rem] h-[32rem] bg-teal-500/30 rounded-full filter blur-[130px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            y: [0, -40, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-24 -right-24 w-[36rem] h-[36rem] bg-indigo-600/30 rounded-full filter blur-[140px]"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Publication Title & Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:col-span-7 text-center lg:text-left"
        >
          {/* Publication Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 backdrop-blur-md mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="text-xs font-mono font-medium text-teal-300 tracking-wider uppercase">
              TECH JOURNAL & ENGINEERING NOTES
            </span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
            Deep Dives into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-indigo-400">
              Code, Systems
            </span>{' '}
            & the Modern Web.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
            Curated articles on modern frontend architecture, scalable cloud APIs, Python backends, and practical developer insights. Written for engineers who value depth.
          </p>

          {/* Compact Author Micro-Badge */}
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl mb-8 shadow-inner">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-teal-400 to-indigo-500 flex items-center justify-center font-bold text-white text-sm shadow">
              RT
            </div>
            <div className="text-left text-xs">
              <p className="font-semibold text-slate-200">Written by Ravindu Tharusha</p>
              <p className="text-slate-400">Software Engineer • Sri Lanka</p>
            </div>
            <div className="h-6 w-px bg-white/10 mx-1"></div>
            <div className="flex items-center gap-2 text-slate-300">
              <a
                href="https://github.com/Ravindu08"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-teal-400 hover:bg-white/10 rounded-lg transition-colors"
                title="GitHub"
              >
                <FaGithub size={15} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-teal-400 hover:bg-white/10 rounded-lg transition-colors"
                title="LinkedIn"
              >
                <FaLinkedin size={15} />
              </a>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <ScrollLink
              to="articles-feed"
              smooth={true}
              duration={600}
              offset={-80}
              className="cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 font-bold text-base shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaBookOpen size={16} />
              <span>Explore All Articles</span>
              <FaArrowRight size={13} />
            </ScrollLink>

            <ScrollLink
              to="newsletter"
              smooth={true}
              duration={700}
              offset={-60}
              className="cursor-pointer inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-medium text-base hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Subscribe to Updates</span>
            </ScrollLink>
          </div>

          {/* Topic Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono text-slate-400">
            <span className="text-slate-500 flex items-center gap-1 mr-1">
              <FaTerminal size={11} /> Top Topics:
            </span>
            {['Web Dev', 'React', 'FastAPI', 'MongoDB', 'Cloud & Architecture'].map((topic) => (
              <span
                key={topic}
                className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-slate-300 hover:border-teal-500/40 hover:text-teal-300 transition-colors cursor-default"
              >
                #{topic}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Hero Featured Article Spotlight Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-5"
        >
          {featured ? (
            <div className="relative group">
              {/* Outer Card Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/30 to-indigo-500/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>

              {/* Spotlight Card */}
              <div
                onClick={() => navigate(`/article/${featured.slug}`)}
                className="relative bg-slate-900/90 border border-white/15 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl hover:border-teal-400/50 transition-all duration-300 cursor-pointer"
              >
                {/* Image Cover Container */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-950">
                  <img
                    src={getValidImageUrl(featured.featuredImage, featured.category)}
                    alt={featured.title}
                    onError={(e) => handleImageError(e, featured.category)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                  {/* Badge: Featured Spotlight */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-teal-500 text-slate-950 shadow-md">
                      FEATURED STORY
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-md text-teal-300 border border-white/10">
                      {featured.category || 'Tech'}
                    </span>
                  </div>

                  {/* Reading Time */}
                  <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                    <FaClock size={11} className="text-teal-400" />
                    <span>{featured.readingTime || '5 min read'}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-teal-300 transition-colors line-clamp-2 mb-3 leading-snug">
                    {featured.title}
                  </h3>
                  <p className="text-slate-300 text-sm font-light line-clamp-2 mb-6 leading-relaxed">
                    {featured.shortDescription || 'Click to explore the full technical guide and deep dive into the subject.'}
                  </p>

                  {/* Footer of Card */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2.5 text-xs text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                      <span>By {featured.author || 'Ravindu Tharusha'}</span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 group-hover:translate-x-1 transition-transform">
                      Read Article <FaArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400 mx-auto mb-3"></div>
              <p className="text-sm text-slate-400">Loading featured article...</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;