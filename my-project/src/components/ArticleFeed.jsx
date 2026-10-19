// src/components/ArticleFeed.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaFilter, FaFire, FaClock, FaCalendarAlt, FaLayerGroup } from 'react-icons/fa';
import ArticleCard from './ArticleCard';
import api from '../services/api';
import { articlesData } from '../data';

const ArticleFeed = ({ selectedCategory, setSelectedCategory }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // 'latest' | 'popular' | 'quick'

  // Fetch approved articles from API with fallback to local mock data
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await api.get('/articles/', {
          params: { status: 'approved', limit: 100 }
        });
        if (response.data?.items?.length > 0) {
          setArticles(response.data.items);
        } else {
          setArticles(articlesData || []);
        }
      } catch (err) {
        console.warn('API unavailable, using cached/sample articles:', err);
        setArticles(articlesData || []);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Extract unique categories from articles
  const availableCategories = useMemo(() => {
    const catSet = new Set(['All']);
    articles.forEach(a => {
      if (a.category) {
        catSet.add(a.category.trim());
      }
    });
    return Array.from(catSet);
  }, [articles]);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // Category filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(
        a => a.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(a => {
        const title = (a.title || '').toLowerCase();
        const desc = (a.shortDescription || '').toLowerCase();
        const content = (a.content || '').toLowerCase();
        const tags = Array.isArray(a.tags) ? a.tags.join(' ').toLowerCase() : '';
        return title.includes(q) || desc.includes(q) || content.includes(q) || tags.includes(q);
      });
    }

    // Sorting
    if (sortBy === 'popular') {
      result.sort((a, b) => ((b.likesCount || 0) + (b.viewCount || 0)) - ((a.likesCount || 0) + (a.viewCount || 0)));
    } else if (sortBy === 'quick') {
      const parseTime = (str) => parseInt((str || '5').replace(/\D/g, ''), 10) || 5;
      result.sort((a, b) => parseTime(a.readingTime) - parseTime(b.readingTime));
    } else {
      // Default: latest
      result.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    }

    return result;
  }, [articles, selectedCategory, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('latest');
  };

  return (
    <section id="articles-feed" className="py-16 md:py-24 px-4 bg-slate-50 min-h-[600px]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-mono uppercase tracking-wider mb-2">
              <FaLayerGroup size={11} /> Articles & Insights
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Browse All Publications
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-1 font-light">
              Explore in-depth engineering breakdowns, architecture guides, and tutorials.
            </p>
          </div>

          {/* Live Search Input */}
          <div className="w-full md:w-80 relative">
            <div className="relative flex items-center">
              <FaSearch className="absolute left-3.5 text-slate-400 pointer-events-none" size={14} />
              <input
                type="text"
                placeholder="Search articles by keyword or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors"
                  title="Clear search"
                >
                  <FaTimes size={13} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Discovery Control Bar: Category Pills + Sort Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {availableCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-teal-300 shadow-md border border-slate-800 ring-2 ring-teal-500/30'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort Selector & Count */}
          <div className="flex items-center justify-between lg:justify-end gap-4 text-xs sm:text-sm text-slate-500">
            <span className="font-mono text-xs">
              Showing <strong className="text-slate-800">{filteredArticles.length}</strong> articles
            </span>

            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setSortBy('latest')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  sortBy === 'latest' ? 'bg-teal-500 text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Sort by latest"
              >
                <FaCalendarAlt size={11} /> Latest
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  sortBy === 'popular' ? 'bg-teal-500 text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Sort by popular"
              >
                <FaFire size={11} /> Popular
              </button>
              <button
                onClick={() => setSortBy('quick')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  sortBy === 'quick' ? 'bg-teal-500 text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Sort by reading time"
              >
                <FaClock size={11} /> Quick
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          /* Loading Skeletons */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse">
                <div className="aspect-video w-full bg-slate-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-3"></div>
                <div className="h-6 bg-slate-200 rounded w-5/6 mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-4"></div>
                <div className="h-8 bg-slate-200 rounded-full w-full"></div>
              </div>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          /* Empty Search / Filter State */
          <div className="text-center py-20 px-4 bg-white rounded-3xl border border-dashed border-slate-300 max-w-xl mx-auto my-8">
            <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
              🔍
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Articles Found</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
              We couldn't find any articles matching "{searchQuery}" in category "{selectedCategory}".
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Article Cards Grid */
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredArticles.map((article, index) => (
                <ArticleCard
                  key={article.slug || article._id || article.id || index}
                  article={article}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ArticleFeed;