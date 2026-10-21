// src/pages/SingleArticle.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaEye, FaComment, FaShare, FaCheck, FaArrowLeft, FaClock, FaCalendarAlt, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import api, { API_URL, engagementAPI, commentsAPI, fetchApprovedArticles } from '../services/api';
import ArticleCard from '../components/ArticleCard';
import ArticleContentRenderer from '../components/ArticleContentRenderer';
import { getValidImageUrl, handleImageError } from '../utils/imageUtils';

const SingleArticle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [article, setArticle] = useState(() => {
    try {
      const cached = localStorage.getItem('ravindu_labs_cached_articles');
      if (cached) {
        const list = JSON.parse(cached);
        const match = list.find(a => a.slug === slug);
        if (match) return match;
      }
    } catch (e) {}
    return null;
  });
  const [loading, setLoading] = useState(() => {
    try {
      const cached = localStorage.getItem('ravindu_labs_cached_articles');
      if (cached) {
        const list = JSON.parse(cached);
        if (list.find(a => a.slug === slug)) return false;
      }
    } catch (e) {}
    return true;
  });
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(() => article?.likesCount || 0);
  const [viewCount, setViewCount] = useState(() => article?.viewCount || 0);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [shareCopied, setShareCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Reading scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let isMounted = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchArticle = async () => {
      try {
        if (!article) {
          setLoading(true);
        }
        const response = await api.get(`/articles/${slug}`);
        if (isMounted) {
          setArticle(response.data);
          setLikesCount(response.data.likesCount || 0);
          setViewCount(response.data.viewCount || 0);
        }

        // Load comments
        const articleId = response.data.id || response.data._id;
        if (articleId) {
          try {
            setCommentsLoading(true);
            const commentsData = await commentsAPI.getArticleComments(articleId);
            setComments(commentsData || []);
          } catch (err) {
            console.error('Error loading comments:', err);
          } finally {
            setCommentsLoading(false);
          }
        }

        // Track view
        try {
          const viewResult = await engagementAPI.recordView(slug);
          if (viewResult?.viewCount !== undefined) {
            setViewCount(viewResult.viewCount);
          }
        } catch (err) {
          console.error('Error recording view:', err);
        }

        // Fetch related articles using shared cache
        try {
          const items = await fetchApprovedArticles();
          const related = (items || []).filter(a => a.slug !== slug).slice(0, 3);
          setRelatedArticles(related);
        } catch (e) {
          // ignore
        }

        // Set document title
        if (response.data.title) {
          document.title = `${response.data.title} | Ravindu Labs`;
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching article:', err);
          if (!article) {
            setError(err.response?.status === 404 ? 'Article not found' : 'Failed to load article');
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchArticle();
    return () => { isMounted = false; };
  }, [slug]);

  const handleLikeClick = async () => {
    const prevLiked = liked;
    const prevCount = likesCount;
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);

    try {
      const result = await engagementAPI.toggleLike(slug);
      setLiked(result.liked);
      setLikesCount(result.likesCount);
    } catch (err) {
      setLiked(prevLiked);
      setLikesCount(prevCount);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const articleId = article?.id || article?._id;
      if (!articleId) return;
      const created = await commentsAPI.createComment(
        articleId,
        newComment.trim(),
        commentAuthor.trim() || 'Reader'
      );
      setComments([created, ...comments]);
      setNewComment('');
      setCommentAuthor('');
    } catch (err) {
      console.error('Error creating comment:', err);
    }
  };

  const handleShareClick = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-slate-300 font-mono text-sm">Loading article deep dive...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white pt-20 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-extrabold text-white mb-3">404 - Article Not Found</h1>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            {error || 'The technical article you are looking for might have been moved or removed.'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-teal-500/20"
          >
            ← Return to Publication
          </button>
        </div>
      </div>
    );
  }

  const authorName = (article.author || 'Ravindu Tharusha').replace(/\b([A-Za-z]+)'s\b/g, '$1').trim();
  const authorImage =
    getValidImageUrl(article.authorImage || article.profile_image) ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=00A39C&color=fff`;

  const displayDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : article.date || 'Recent';

  return (
    <div className="bg-[#0b0f19] text-slate-100 min-h-screen">
      {/* Realtime Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-500 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="pt-28 md:pt-36 pb-20 px-4 max-w-4xl mx-auto">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 text-xs">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-mono transition-colors"
          >
            <FaArrowLeft size={12} />
            <span>Back to All Articles</span>
          </button>

          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1 font-mono">
              <FaEye size={12} /> {viewCount} views
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-mono">
              <FaClock size={12} /> {article.readingTime || '5 min read'}
            </span>
          </div>
        </div>

        {/* Category Pill */}
        <div className="mb-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-teal-500/10 text-teal-300 border border-teal-500/30">
            {article.category || 'Tech'}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.18] tracking-tight mb-6">
          {article.title}
        </h1>

        {/* Author & Published Info Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 mb-8 border-y border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={authorImage}
              alt={authorName}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=00A39C&color=fff`;
              }}
              className="w-11 h-11 rounded-full object-cover border-2 border-teal-500/40"
            />
            <div>
              <p className="font-bold text-slate-200 text-sm">{authorName}</p>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>{displayDate}</span>
                <span>•</span>
                <span className="text-teal-400 font-semibold">{article.readingTime || '5 min read'}</span>
              </div>
            </div>
          </div>

          {/* Social Reaction and Share Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleLikeClick}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                liked
                  ? 'bg-rose-500/10 border-rose-500/40 text-rose-400'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:border-rose-500/30 hover:text-rose-400'
              }`}
            >
              {liked ? <FaHeart size={14} className="text-rose-500" /> : <FaRegHeart size={14} />}
              <span>{likesCount} Likes</span>
            </button>

            <button
              onClick={handleShareClick}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors"
              title="Copy link"
            >
              {shareCopied ? (
                <>
                  <FaCheck size={12} className="text-teal-400" />
                  <span className="text-teal-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <FaShare size={12} />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="relative rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl bg-slate-950 aspect-video max-h-[460px]">
            <img
              src={getValidImageUrl(article.featuredImage, article.category)}
              alt={article.title}
              onError={(e) => handleImageError(e, article.category)}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Short Summary Callout */}
        {article.shortDescription && (
          <div className="p-5 sm:p-6 rounded-2xl bg-teal-950/20 border-l-4 border-teal-400 border-y border-r border-white/5 mb-10 text-base sm:text-lg text-slate-300 font-light leading-relaxed italic">
            "{article.shortDescription}"
          </div>
        )}

        {/* Article Full Content (Rich HTML & Styled Typography) */}
        <div className="mb-14">
          <ArticleContentRenderer content={article.content} />
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-white/10 mb-12">
            <span className="text-xs font-mono text-slate-400 mr-2">Tags:</span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-teal-300 hover:border-teal-500/30 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Compact Author Signature Box */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-16">
          <img
            src={authorImage}
            alt={authorName}
            className="w-16 h-16 rounded-full object-cover border-2 border-teal-400 shadow-md flex-shrink-0"
          />
          <div className="text-center sm:text-left flex-grow">
            <div className="flex items-center justify-center sm:justify-between mb-1">
              <h3 className="font-bold text-white text-base">Written by {authorName}</h3>
              <span className="hidden sm:inline-block text-xs font-mono text-teal-400">Author & Engineer</span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-3">
              Full-Stack Software Engineer exploring web development, scalable backends, and cloud architectures.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-slate-400">
              <a
                href="https://github.com/Ravindu08"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-teal-300 transition-colors"
              >
                <FaGithub size={13} /> GitHub
              </a>
              <span>•</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-teal-300 transition-colors"
              >
                <FaLinkedin size={13} /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span> Keep Reading More Articles
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedArticles.map((relArt, index) => (
                <ArticleCard key={relArt.slug || index} article={relArt} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div id="comments" className="pt-8 border-t border-white/10">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FaComment className="text-teal-400" size={18} />
            Discussion ({comments.length})
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="p-5 rounded-2xl bg-white/5 border border-white/10 mb-8 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Name (optional)"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
              />
            </div>
            <textarea
              placeholder="Leave a thought, question, or feedback..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="3"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-400"
              required
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-teal-500/20"
            >
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          {commentsLoading ? (
            <p className="text-slate-400 text-xs font-mono">Loading discussions...</p>
          ) : comments.length === 0 ? (
            <p className="text-slate-500 text-sm italic">No comments yet. Start the conversation!</p>
          ) : (
            <div className="space-y-3">
              {comments.map((c, i) => (
                <div key={c.id || i} className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm">
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="font-bold text-teal-300">{c.author || 'Reader'}</span>
                    <span className="text-slate-500 font-mono text-[11px]">
                      {c.created_at ? new Date(c.created_at).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                  <p className="text-slate-300 font-light leading-relaxed whitespace-pre-wrap">{c.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleArticle;