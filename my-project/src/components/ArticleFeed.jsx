// src/components/ArticleFeed.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ArticleCard from './ArticleCard';
import ArticleModal from './ArticleModal';
import CommentsModal from './CommentsModal';
import api from '../services/api';

const ArticleFeed = ({ selectedCategory, selectedArticle, setSelectedArticle }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsArticle, setCommentsArticle] = useState(null);

  useEffect(() => {
    fetchApprovedArticles();
  }, []);

  const fetchApprovedArticles = async () => {
    try {
      setLoading(true);
      // Fetch only approved articles from backend
      const response = await api.get('/articles/', {
        params: { status: 'approved', limit: 100 }
      });
      setArticles(response.data.items);
    } catch (err) {
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  // Show only 6 articles by default, show all after clicking 'Show More'
  const navigate = useNavigate();
  const visibleArticles = filteredArticles.slice(0, 6);

  return (
    <>
      <section name="articles" className="py-16 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A39C] mx-auto"></div>
              <p className="mt-4 text-slate-600">Loading articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-16 col-span-full">
              <p className="text-slate-600 text-lg">No approved articles yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {visibleArticles.map((article, index) => (
                    <ArticleCard 
                      key={article.slug} 
                      article={article} 
                      index={index}
                      onClick={() => setSelectedArticle(article)} 
                      onCommentClick={() => setCommentsArticle(article)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
              {filteredArticles.length > 6 && (
                <div className="text-center mt-8">
                  <button
                    className="bg-[#00A39C] text-white px-6 py-2 rounded-full font-bold text-lg hover:bg-teal-700 transition-colors"
                    onClick={() => navigate('/articles')}
                  >
                    Show More Articles
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

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
export default ArticleFeed;