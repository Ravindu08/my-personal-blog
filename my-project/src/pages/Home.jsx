// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articlesData } from '../data';
import ArticleCard from '../components/ArticleCard';
import CommentsModal from '../components/CommentsModal';
import { useCountdown } from '../hooks/useCountdown';
import { FaTrophy, FaPencilAlt, FaUsers } from 'react-icons/fa';

const CountdownItem = ({ value, label }) => (
  <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-4 rounded-lg w-24">
    <span className="text-4xl font-bold text-white">{String(value).padStart(2, '0')}</span>
    <span className="text-xs text-gray-300 mt-1 uppercase tracking-wider">{label}</span>
  </div>
);

const Home = () => {
  // Find the first featured article (or fallback to first)
  const featuredArticle = articlesData.find(a => a.isFeatured) || articlesData[0];
  const [showAllArticles, setShowAllArticles] = React.useState(false);
  // Only show 6 non-featured articles by default, all after button click
  const nonFeaturedArticles = articlesData.filter(a => a !== featuredArticle);
  const otherArticles = showAllArticles ? nonFeaturedArticles : nonFeaturedArticles.slice(0, 6);
  const leadArticle = otherArticles[0];
  const remainingArticles = otherArticles.slice(1);
  const [days, hours, minutes, seconds] = useCountdown('2024-12-01T00:00:00');
  const googleFormLink = "https://forms.gle/A5K4WozmuZxkqDzw9";
  const [selectedArticle, setSelectedArticle] = React.useState(null);
  const [commentsArticle, setCommentsArticle] = React.useState(null);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[72vh] md:min-h-[82vh] bg-slate-900 text-white flex items-center px-4 py-10 md:py-4 overflow-hidden">
        <div className="absolute -inset-40 bg-[radial-gradient(circle_at_20%_30%,_rgba(0,163,156,0.3),_transparent_40%)]" />
        <div className="absolute -inset-40 bg-[radial-gradient(circle_at_80%_70%,_rgba(0,98,155,0.3),_transparent_40%)]" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 to-transparent" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="text-sm sm:text-lg font-semibold text-[#00A39C]">WELCOME TO RAVINDU LABS</span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold my-4 leading-tight">Hi, I'm Ravindu</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-lg mb-8">
              A passionate Software Engineer and AI enthusiast. I build digital experiences and write about technology, code, and innovation.
            </p>
            <Link to="projects" spy={true} smooth={true} duration={500} offset={-80} className="inline-flex items-center justify-center w-full sm:w-auto bg-[#00A39C] text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-teal-700 transition-colors cursor-pointer">
              View My Projects
            </Link>
          </motion.div>
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <ArticleCard
              article={featuredArticle}
              index={0}
              onClick={() => setSelectedArticle(featuredArticle)}
              onCommentClick={() => setCommentsArticle(featuredArticle)}
            />
          </motion.div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-14 md:py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] text-[#00A39C] uppercase">Read First</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">Latest Articles</h2>
            </div>
          </div>

          {leadArticle && (
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              onClick={() => setSelectedArticle(leadArticle)}
              className="cursor-pointer group mb-8"
            >
              <div className="grid lg:grid-cols-2 gap-0 bg-slate-900 rounded-2xl overflow-hidden shadow-xl">
                <div className="relative h-72 md:h-80 lg:h-full overflow-hidden">
                  <img
                    src={leadArticle.featuredImage}
                    alt={leadArticle.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/15 to-transparent" />
                  <span className="absolute top-4 left-4 bg-[#00A39C] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    First To Read
                  </span>
                </div>
                <div className="p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                  <p className="text-[#00A39C] text-sm font-semibold uppercase tracking-[0.15em] mb-3">Top Story</p>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight mb-4 group-hover:text-[#7ce2dd] transition-colors">
                    {leadArticle.title}
                  </h3>
                  <p className="text-slate-300 mb-6 line-clamp-3">
                    {leadArticle.shortDescription || 'Open this article to explore the full story.'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(leadArticle.tags || []).slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs font-semibold bg-white/10 text-slate-200 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {remainingArticles.map((article, index) => (
              <ArticleCard
                key={article.slug}
                article={article}
                index={index + 1}
                onClick={() => setSelectedArticle(article)}
                onCommentClick={() => setCommentsArticle(article)}
              />
            ))}
          </div>
          <div className="text-center mt-12 sm:mt-16">
            {!showAllArticles && nonFeaturedArticles.length > 6 && (
              <button
                className="bg-[#00A39C] text-white px-6 py-2 rounded-full font-bold text-lg hover:bg-teal-700 transition-colors"
                onClick={() => setShowAllArticles(true)}
              >
                Explore More Articles
              </button>
            )}
            {showAllArticles && (
              <Link to="/articles" className="text-[#00A39C] font-bold text-lg hover:underline transition-all duration-300 inline-block group mt-4">
                Explore All Articles <span className="inline-block transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* About Me Section Placeholder */}
      <section id="about" className="py-24 bg-slate-50 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">About Me</h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-3xl mx-auto mb-12">
            I am a full-stack developer with a deep passion for building scalable web applications and exploring Artificial Intelligence. Welcome to my personal space where I share my journey, projects, and thoughts.
          </p>
        </div>
      </section>

      {/* Projects Section Placeholder */}
      <section id="projects" className="py-24 bg-white px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">My Projects</h2>
          <p className="text-base sm:text-lg text-gray-500 mb-12">Here are some of the interesting things I've built recently.</p>
          <div className="p-10 border-2 border-dashed border-gray-300 rounded-xl text-gray-400">
            [Projects Grid Will Go Here]
          </div>
        </div>
      </section>

      {/* Modal for selected article */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-[calc(100vw-1rem)] sm:w-full relative shadow-2xl mx-2 sm:mx-4 my-4 sm:my-8">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold z-10"
              onClick={() => setSelectedArticle(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="w-full h-80 md:h-96 rounded-t-xl overflow-hidden">
              <img
                src={selectedArticle.featuredImage}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 sm:p-8 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <img
                  src={selectedArticle.authorImage || selectedArticle.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent((selectedArticle.author || 'Anonymous').replace(/\b([A-Za-z]+)'s\b/g, '$1').trim())}&background=00A39C&color=fff`}
                  alt={(selectedArticle.author || 'Anonymous').replace(/\b([A-Za-z]+)'s\b/g, '$1').trim()}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div className="text-sm">
                  <p className="font-semibold text-slate-700">{(selectedArticle.author || 'Anonymous').replace(/\b([A-Za-z]+)'s\b/g, '$1').trim()}</p>
                  <p className="text-gray-500">{selectedArticle.date}</p>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">{selectedArticle.title}</h1>
              <div className="mb-6">
                {selectedArticle.tags && selectedArticle.tags.map(tag => (
                  <span key={tag} className="inline-block text-xs font-semibold bg-[#00A39C]/10 text-[#00A39C] px-3 py-1 rounded-full mr-2 mb-1">{tag}</span>
                ))}
              </div>
              <div className="prose max-w-none text-gray-800 text-lg" style={{ whiteSpace: 'pre-line' }}>
                {selectedArticle.content || selectedArticle.body || 'No content available.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {commentsArticle && (
        <CommentsModal
          article={commentsArticle}
          onClose={() => setCommentsArticle(null)}
        />
      )}
    </div>
  );
};
export default Home;