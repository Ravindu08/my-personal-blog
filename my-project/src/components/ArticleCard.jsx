// src/components/ArticleCard.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaEye, FaComment, FaClock, FaShareAlt, FaCheck, FaArrowRight } from 'react-icons/fa';
import { engagementAPI, commentsAPI, API_URL } from '../services/api';

const ArticleCard = ({ article, index }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(article.likesCount || 0);
  const [viewCount, setViewCount] = useState(article.viewCount || 0);
  const [commentsCount, setCommentsCount] = useState(article.commentsCount || 0);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const stats = await engagementAPI.getStats(article.slug);
        if (stats?.viewCount !== undefined) setViewCount(stats.viewCount);
        if (stats?.likesCount !== undefined) setLikesCount(stats.likesCount);
      } catch (err) {
        // silent fallback
      }

      try {
        const articleId = article.id || article._id;
        if (!articleId) return;
        const list = await commentsAPI.getArticleComments(articleId);
        setCommentsCount(Array.isArray(list) ? list.length : 0);
      } catch (err) {
        // silent fallback
      }
    };

    fetchCounts();
  }, [article]);

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    if (loading) return;
    setLoading(true);
    // Optimistic update
    const prevLiked = liked;
    const prevCount = likesCount;
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);

    try {
      const result = await engagementAPI.toggleLike(article.slug);
      setLiked(result.liked);
      setLikesCount(result.likesCount);
    } catch (err) {
      // rollback
      setLiked(prevLiked);
      setLikesCount(prevCount);
    } finally {
      setLoading(false);
    }
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/article/${article.slug}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCardClick = () => {
    navigate(`/article/${article.slug}`);
  };

  const authorName = (article.author || 'Ravindu Tharusha').replace(/\b([A-Za-z]+)'s\b/g, '$1').trim();
  const authorImage =
    article.authorImage ||
    article.profile_image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=00A39C&color=fff`;

  // Format date
  const displayDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : article.date || 'Recent';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-teal-500/10 hover:border-teal-500/40 transition-all duration-300 overflow-hidden"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        <img
          src={article.featuredImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800'}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

        {/* Floating Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-900/80 backdrop-blur-md text-teal-300 border border-white/10 shadow-sm">
            {article.category || 'Engineering'}
          </span>
        </div>

        {/* Reading Time Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[11px] font-mono text-slate-200 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10">
          <FaClock size={10} className="text-teal-400" />
          <span>{article.readingTime || '4 min read'}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Metadata Row: Date & Tags */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
            <span className="font-mono">{displayDate}</span>
            {article.tags?.[0] && (
              <span className="text-slate-500 font-mono text-[11px]">#{article.tags[0]}</span>
            )}
          </div>

          {/* Article Title */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug mb-2.5">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-600 text-sm font-light line-clamp-2 leading-relaxed mb-4">
            {article.shortDescription || article.content?.substring(0, 140) || 'Click to read this technical deep dive and explore the full explanation.'}
          </p>
        </div>

        {/* Bottom Section: Author & Engagement */}
        <div>
          {/* Author micro-row */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={authorImage}
                alt={authorName}
                className="w-6 h-6 rounded-full object-cover border border-slate-200"
              />
              <span className="text-xs font-medium text-slate-700 truncate">{authorName}</span>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 group-hover:translate-x-1 transition-transform">
              Read <FaArrowRight size={10} />
            </span>
          </div>

          {/* Metrics bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-50">
            <div className="flex items-center gap-3">
              {/* Views */}
              <div className="flex items-center gap-1 hover:text-slate-700 transition-colors" title="Views">
                <FaEye size={13} className="text-slate-400" />
                <span>{viewCount}</span>
              </div>

              {/* Comments */}
              <div className="flex items-center gap-1 hover:text-slate-700 transition-colors" title="Comments">
                <FaComment size={12} className="text-slate-400" />
                <span>{commentsCount}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Share copy button */}
              <button
                onClick={handleShareClick}
                className="p-1.5 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                title="Copy share link"
              >
                {copied ? <FaCheck size={12} className="text-teal-600" /> : <FaShareAlt size={12} />}
              </button>

              {/* Like Button */}
              <button
                onClick={handleLikeClick}
                className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-rose-50 transition-colors"
                title="Like article"
              >
                {liked ? (
                  <FaHeart size={14} className="text-rose-500 animate-pulse" />
                ) : (
                  <FaRegHeart size={14} className="text-slate-400 hover:text-rose-500" />
                )}
                <span className={`text-xs font-semibold ${liked ? 'text-rose-600' : 'text-slate-600'}`}>
                  {likesCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ArticleCard;