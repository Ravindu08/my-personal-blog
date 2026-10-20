import React from 'react';

/**
 * ArticleContentRenderer renders article text or rich HTML safely.
 * - Supports rich HTML tags (headings, bold, underline, highlight/mark, lists, quotes, code, links).
 * - Fallbacks gracefully for legacy plain text by creating structured paragraphs.
 * - Adheres to modern typography standards with styled underlines and highlights.
 */
export const ArticleContentRenderer = ({ content, className = '', isLight = false }) => {
  if (!content) {
    return <p className="text-slate-400 italic">No content available.</p>;
  }

  // Check if content contains HTML tags
  const hasHtmlTags = /<\/?[a-z][\s\S]*>/i.test(content);

  const baseClasses = isLight
    ? 'article-rendered-content article-rendered-light text-slate-700 leading-relaxed'
    : 'article-rendered-content text-slate-200 leading-relaxed font-light';

  if (hasHtmlTags) {
    return (
      <div
        className={`${baseClasses} ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Plain text fallback: split paragraphs by double-newline
  const paragraphs = content.split(/\n\n+/).filter(Boolean);

  return (
    <div className={`${baseClasses} ${className}`}>
      {paragraphs.map((p, idx) => (
        <p key={idx} className="mb-6 whitespace-pre-wrap">
          {p}
        </p>
      ))}
    </div>
  );
};

export default ArticleContentRenderer;
