// src/utils/imageUtils.js

const CATEGORY_COVERS = {
  'web dev': [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200',
  ],
  'frontend': [
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200',
    'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200',
  ],
  'backend': [
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200',
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200',
  ],
  'python': [
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200',
  ],
  'ai': [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200',
  ],
  'cloud': [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200',
  ],
  'default': [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200',
  ],
};

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export const getFallbackCover = (category = '', seed = '') => {
  const cat = (category || '').toLowerCase().trim();
  let coversList = CATEGORY_COVERS.default;

  for (const [key, covers] of Object.entries(CATEGORY_COVERS)) {
    if (key !== 'default' && cat.includes(key)) {
      coversList = covers;
      break;
    }
  }

  if (!seed) {
    return coversList[0];
  }

  const index = hashString(seed) % coversList.length;
  return coversList[index];
};

/**
 * Resolves an article featured image URL so it works in both local and online production modes.
 * Ensures /uploads/... works via static Vercel CDN or Vite dev proxy.
 */
export const getValidImageUrl = (url, category = '', seed = '') => {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return getFallbackCover(category, seed);
  }

  const trimmed = url.trim();

  // Data URLs or Blob URLs
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed;
  }

  // Cloudinary, Unsplash, or other external CDN
  if (
    trimmed.startsWith('https://res.cloudinary.com') ||
    trimmed.startsWith('https://images.unsplash.com')
  ) {
    return trimmed;
  }

  // Any uploads filename (whether local, render, or relative)
  const uploadsMatch = trimmed.match(/uploads\/([a-zA-Z0-9_-]+\.[a-zA-Z0-9]+)/i);
  if (uploadsMatch) {
    return `/uploads/${uploadsMatch[1]}`;
  }

  // If already a relative path starting with /
  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  // If external HTTP / HTTPS URL
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  return trimmed;
};

/**
 * Resolves a user or author avatar image URL.
 * Falls back to UI Avatars (name-based badge) instead of a blog post cover.
 */
export const getValidAvatarUrl = (url, name = 'Ravindu Tharusha') => {
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=00A39C&color=fff`;
  if (!url || typeof url !== 'string' || !url.trim()) {
    return fallback;
  }

  const trimmed = url.trim();

  // Data URLs or Blob URLs
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed;
  }

  // Cloudinary or Unsplash
  if (
    trimmed.startsWith('https://res.cloudinary.com') ||
    trimmed.startsWith('https://images.unsplash.com')
  ) {
    return trimmed;
  }

  // Any uploads filename
  const uploadsMatch = trimmed.match(/uploads\/([a-zA-Z0-9_-]+\.[a-zA-Z0-9]+)/i);
  if (uploadsMatch) {
    return `/uploads/${uploadsMatch[1]}`;
  }

  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  return fallback;
};

export const handleImageError = (e, category = '', seed = '') => {
  e.currentTarget.onerror = null; // Prevent infinite fallback loops
  e.currentTarget.src = getFallbackCover(category, seed);
};
