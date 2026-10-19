// src/utils/imageUtils.js

const CATEGORY_COVERS = {
  'web dev': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200',
  'frontend': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200',
  'backend': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200',
  'python': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200',
  'ai': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200',
  'cloud': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
  'default': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200',
};

export const getFallbackCover = (category = '') => {
  const cat = (category || '').toLowerCase().trim();
  for (const [key, cover] of Object.entries(CATEGORY_COVERS)) {
    if (cat.includes(key)) {
      return cover;
    }
  }
  return CATEGORY_COVERS.default;
};

/**
 * Resolves an image URL so it works in both local and online production modes.
 * Converts any local 'http://127.0.0.1:8000/uploads/...' or Render '/uploads/...'
 * to the CDN-hosted static path '/uploads/...'.
 */
export const getValidImageUrl = (url, category = '') => {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return getFallbackCover(category);
  }

  const trimmed = url.trim();

  // If already Cloudinary or Unsplash or external HTTPS (not localhost or backend uploads)
  if (trimmed.startsWith('https://res.cloudinary.com') || trimmed.startsWith('https://images.unsplash.com')) {
    return trimmed;
  }

  // Check if it's a localhost URL or Render backend uploads URL
  const uploadsMatch = trimmed.match(/uploads\/([a-zA-Z0-9_-]+\.[a-zA-Z0-9]+)/i);
  if (uploadsMatch) {
    // Return relative /uploads/filename path which is served directly by Vercel CDN
    return `/uploads/${uploadsMatch[1]}`;
  }

  // If already a relative path starting with /
  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  // If unencrypted http localhost or 127.0.0.1
  if (trimmed.includes('127.0.0.1') || trimmed.includes('localhost')) {
    return getFallbackCover(category);
  }

  return trimmed;
};

export const handleImageError = (e, category = '') => {
  e.currentTarget.onerror = null; // Prevent infinite fallback loops
  e.currentTarget.src = getFallbackCover(category);
};
