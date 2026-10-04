import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaComment } from 'react-icons/fa';
import { commentsAPI } from '../services/api';

const CommentsModal = ({ article, onClose }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const articleId = article?.id || article?._id;

  useEffect(() => {
    const fetchComments = async () => {
      if (!articleId) {
        setComments([]);
        return;
      }
      try {
        setLoading(true);
        const data = await commentsAPI.getArticleComments(articleId);
        setComments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error loading comments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [articleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !articleId) return;

    try {
      setSubmitting(true);
      const created = await commentsAPI.createComment(articleId, newComment.trim());
      setComments((prev) => [created, ...prev]);
      setNewComment('');
    } catch (err) {
      console.error('Error creating comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!article) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 p-4 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4">
          <div>
            <p className="text-[#00A39C] font-semibold text-sm uppercase tracking-wider">Comments</p>
            <h2 className="text-xl font-bold text-slate-800">{article.title}</h2>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          {!articleId ? (
            <div className="text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-4">
              Comments are not available for this article.
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-3 mb-6">
                <textarea
                  rows="4"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your comment..."
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#00A39C] focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#00A39C] text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-60"
                >
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </form>

              {loading ? (
                <p className="text-slate-600">Loading comments...</p>
              ) : comments.length === 0 ? (
                <div className="text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center gap-2">
                  <FaComment />
                  <span>Be the first to comment.</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id || comment._id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-slate-800">{comment.author || 'Guest'}</p>
                        <span className="text-xs text-slate-500">
                          {(comment.created_at || comment.createdAt)
                            ? new Date(comment.created_at || comment.createdAt).toLocaleString()
                            : ''}
                        </span>
                      </div>
                      <p className="text-slate-700 whitespace-pre-wrap">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CommentsModal;