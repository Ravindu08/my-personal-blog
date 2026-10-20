import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api, { uploadAPI } from '../services/api';
import RichTextEditor from '../components/RichTextEditor';

const categories = [
  'Technology',
  'Engineering',
  'Innovation',
  'Research',
  'Industry',
  'Sustainability',
  'Other'
];

const ArticleSubmissionForm = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { showWarning } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    tags: '',
    featuredImage: '',
    shortDescription: '',
    content: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      showWarning('Please sign in to submit the article. Only registered users can submit articles.');
      navigate('/login');
    }
  }, [isAuthenticated, navigate, showWarning]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleFeaturedImageUpload = async (file) => {
    if (!file) return;
    try {
      setUploadingImage(true);
      setError('');
      const data = await uploadAPI.uploadImage(file);
      const url = data.url || data.path || '';
      if (!url) throw new Error('Upload failed');
      setFormData((prev) => ({ ...prev, featuredImage: url }));
    } catch (err) {
      console.error('Featured image upload error:', err);
      const detail = err.response?.data?.detail;
      setError(detail ? `Failed to upload image: ${detail}` : 'Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      setError('You must be logged in to submit an article');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    if (!formData.title || !formData.category || !formData.content) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        featuredImage: formData.featuredImage || null,
        shortDescription: formData.shortDescription,
        content: formData.content
      };

      await api.post('/articles/', payload);
      
      setSuccess(true);
      setFormData({
        title: '',
        category: '',
        tags: '',
        featuredImage: '',
        shortDescription: '',
        content: ''
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.response?.data?.detail || 'Failed to submit article. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-2 text-center">Submit Your Article</h2>
          <p className="text-slate-600 mb-8 text-center">Share your knowledge with the IAS UWU community</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              Article submitted successfully! Redirecting to dashboard...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter article title"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#00A39C] focus:outline-none transition-colors text-slate-900 bg-white placeholder-slate-400 font-medium"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#00A39C] focus:outline-none transition-colors text-slate-900 bg-white font-medium"
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., AI, Machine Learning, Python"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#00A39C] focus:outline-none transition-colors text-slate-900 bg-white placeholder-slate-400 font-medium"
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Featured Image (Upload from computer or paste URL)
              </label>
              <div className="space-y-3">
                <input
                  type="url"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#00A39C] focus:outline-none transition-colors text-slate-900 bg-white placeholder-slate-400 font-medium"
                />
                <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer text-sm font-semibold text-slate-700">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFeaturedImageUpload(e.target.files?.[0])}
                  />
                  {uploadingImage ? 'Uploading...' : 'Choose Image From Computer'}
                </label>
                {formData.featuredImage && (
                  <img
                    src={formData.featuredImage}
                    alt="Featured preview"
                    className="w-full max-h-52 object-contain bg-slate-50 rounded-lg border border-slate-200"
                  />
                )}
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Brief summary of your article (2-3 sentences)"
                rows={3}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#00A39C] focus:outline-none transition-colors resize-none text-slate-900 bg-white placeholder-slate-400 font-medium"
              />
            </div>

            {/* Content (Rich Text Editor) */}
            <div>
              <RichTextEditor
                value={formData.content}
                onChange={(html) => setFormData((prev) => ({ ...prev, content: html }))}
                placeholder="Write your article content here with formatting, headings, highlights, and underlines..."
                required={true}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#00A39C] text-white py-4 rounded-lg font-semibold hover:bg-[#008a83] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Submitting...' : 'Submit Article'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default ArticleSubmissionForm;
