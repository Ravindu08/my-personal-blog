// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { isAuthenticated } = useAuth();
  const { showWarning } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setUserMenuOpen(false);
    navigate('/');
  };

  const handleSubmitArticleClick = () => {
    if (!isAuthenticated) {
      showWarning('Please sign in to submit the article. Only registered users can submit articles.');
      navigate('/login');
      setMobileMenuOpen(false);
      return;
    }

    navigate('/submit');
    setMobileMenuOpen(false);
  };

  const links = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About Me' },
    { id: 'articles', title: 'Articles' },
  ];
  
  const activeLinkClass = "text-[#00A39C]";
  const navClass = `fixed w-full h-16 md:h-20 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-md' : 'bg-slate-950/35 backdrop-blur-sm'}`;
  const textClass = scrolled ? 'text-slate-800' : 'text-white';
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  const handleHomeClick = () => {
    if (location.pathname === '/') {
      scrollToTop();
    } else {
      navigate('/');
    }
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  return (
    <motion.nav
      className={navClass}
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto h-full flex justify-between items-center px-4 gap-3">
        <button
          onClick={handleHomeClick}
          className={`text-lg md:text-2xl font-bold cursor-pointer transition-colors ${textClass} bg-none border-none p-0 tracking-tight leading-none`}
        >
          Ravindu Labs
        </button>
        
        <div className={`hidden md:flex items-center gap-8 font-semibold transition-colors ${textClass}`}>
          {links.map(link => (
            link.id === 'home' ? (
              <button
                key={link.id}
                onClick={handleHomeClick}
                className="hover:text-[#00A39C] cursor-pointer transition-colors bg-none border-none p-0"
              >
                {link.title}
              </button>
            ) : isHome ? (
              <Link key={link.id} to={link.id} spy={true} smooth={true} duration={500} offset={-80} activeClass={activeLinkClass} className="hover:text-[#00A39C] cursor-pointer transition-colors">
                {link.title}
              </Link>
            ) : (
              <button
                key={link.id}
                onClick={() => navigate('/')}
                className="hover:text-[#00A39C] cursor-pointer transition-colors bg-none border-none p-0"
              >
                {link.title}
              </button>
            )
          ))}
          {!isLoggedIn ? (
            <>
              <button 
                onClick={() => navigate('/login')}
                className={`px-5 py-2 rounded-full font-bold border-2 transition-all duration-300 hover:scale-105 ${scrolled ? 'border-slate-800 text-slate-800 hover:bg-slate-100' : 'border-white text-white hover:bg-white/20'}`}>
                Login
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold border-2 transition-all duration-300 hover:scale-105 ${scrolled ? 'border-slate-800 text-slate-800 hover:bg-slate-100' : 'border-white text-white hover:bg-white/20'}`}
              >
                {user?.profile_image ? (
                  <img src={user.profile_image} alt="Profile" className="w-6 h-6 rounded-full object-cover border border-white/40" />
                ) : (
                  <FaUser className="text-lg" />
                )}
                <span className="hidden lg:inline">{user?.full_name || 'User'}</span>
              </button>
              
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-xs sm:w-48 bg-white rounded-lg shadow-xl py-2 z-50"
                >
                  <button
                    onClick={() => {
                      // Navigate to admin dashboard if user is superuser, otherwise to regular dashboard
                      navigate(user?.is_superuser ? '/admin' : '/dashboard');
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-slate-800 hover:bg-slate-100 transition-colors flex items-center gap-2"
                  >
                    <FaUser />
                    {user?.is_superuser ? 'Admin Dashboard' : 'Dashboard'}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2">
          {!isLoggedIn ? (
            <button
              onClick={() => navigate('/login')}
              className={`text-xs font-bold px-3 py-2 rounded-full border transition-colors ${scrolled ? 'border-slate-800 text-slate-800 bg-white/70' : 'border-white/80 text-white bg-white/10'}`}
            >
              Login
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate(user?.is_superuser ? '/admin' : '/dashboard')}
                className={`max-w-[48vw] truncate text-xs font-bold px-3 py-2 rounded-full border transition-colors ${scrolled ? 'border-slate-800 text-slate-800 bg-white/70' : 'border-white/80 text-white bg-white/10'}`}
                title={user?.full_name || user?.email || 'Dashboard'}
              >
                {user?.full_name || user?.email || 'User'}
              </button>
            </>
          )}
          <button onClick={() => setMobileMenuOpen(true)} className={`transition-colors p-2 rounded-full ${scrolled ? 'text-slate-800 bg-white/70' : 'text-white bg-white/10'}`}>
            <FaBars size={24} />
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[88%] max-w-sm bg-white shadow-2xl p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <div className="text-slate-900 font-bold text-lg">Ravindu Labs</div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-800"><FaTimes size={24} /></button>
              </div>
              <nav className="flex flex-col items-stretch gap-4 text-lg font-semibold text-slate-800">
                {links.map(link => (
                  link.id === 'home' ? (
                    <button
                      key={link.id}
                      onClick={handleHomeClick}
                      className="w-full text-left bg-white border border-slate-200 shadow-sm px-4 py-3 rounded-xl cursor-pointer hover:bg-slate-50"
                    >
                      {link.title}
                    </button>
                  ) : isHome ? (
                    <Link
                      key={link.id}
                      to={link.id}
                      spy={true}
                      smooth={true}
                      duration={500}
                      offset={-80}
                      activeClass={activeLinkClass}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-left bg-white border border-slate-200 shadow-sm px-4 py-3 rounded-xl cursor-pointer hover:bg-slate-50"
                    >
                      {link.title}
                    </Link>
                  ) : (
                    <button
                      key={link.id}
                      onClick={() => {
                        navigate('/');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left bg-white border border-slate-200 shadow-sm px-4 py-3 rounded-xl cursor-pointer hover:bg-slate-50"
                    >
                      {link.title}
                    </button>
                  )
                ))}
                {!isLoggedIn ? (
                  <>
                    <button 
                      onClick={() => {
                        navigate('/login');
                        setMobileMenuOpen(false);
                      }}
                      className="border-2 border-slate-800 text-slate-800 px-6 py-3 rounded-full font-bold mt-4 hover:bg-slate-100 transition-all">
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 px-6 py-3 rounded-full font-bold mt-4 hover:bg-red-50 transition-all"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                    <button
                      onClick={() => {
                        // Navigate to admin dashboard if user is superuser, otherwise to regular dashboard
                        navigate(user?.is_superuser ? '/admin' : '/dashboard');
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 border-2 border-slate-800 text-slate-800 px-6 py-3 rounded-full font-bold mt-4 hover:bg-slate-100 transition-all"
                    >
                      <FaUser />
                      {user?.is_superuser ? 'Admin Dashboard' : 'Dashboard'}
                    </button>
                  </>
                )}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
export default Navbar;