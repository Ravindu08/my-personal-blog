// src/pages/Articles.jsx
import React, { useState, useEffect } from 'react';

import ArticleCard from '../components/ArticleCard';
import ArticleModal from '../components/ArticleModal';
import CommentsModal from '../components/CommentsModal';
import { motion, AnimatePresence } from 'framer-motion';
import api, { fetchApprovedArticles } from '../services/api';

const Articles = () => {
  const [articles, setArticles] = useState(() => {
    try {
      const cached = localStorage.getItem('ravindu_labs_cached_articles');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [];
  });
  const [loading, setLoading] = useState(() => {
    try {
      const cached = localStorage.getItem('ravindu_labs_cached_articles');
      if (cached && JSON.parse(cached)?.length > 0) return false;
    } catch (e) {}
    return true;
  });
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [commentsArticle, setCommentsArticle] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadArticles = async () => {
      try {
        if (articles.length === 0) {
          setLoading(true);
        }
        const items = await fetchApprovedArticles();
        if (isMounted && items && items.length > 0) {
          setArticles(items);
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadArticles();
    return () => { isMounted = false; };
  }, []);

  return (
    <>
      <div className="pt-32 pb-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A39C] mx-auto"></div>
              <p className="mt-4 text-slate-600">Loading articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-600 text-lg">No approved articles yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {articles.map((article, index) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  index={index}
                  onClick={() => setSelectedArticle(article)}
                  onCommentClick={() => setCommentsArticle(article)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
        {commentsArticle && (
          <CommentsModal
            article={commentsArticle}
            onClose={() => setCommentsArticle(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
export default Articles;