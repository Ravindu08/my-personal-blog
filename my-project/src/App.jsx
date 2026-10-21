// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Categories from './components/Categories';
import ArticleFeed from './components/ArticleFeed';
import Newsletter from './components/Newsletter';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import TermsAndConditions from './pages/TermsAndConditions';
import ArticleSubmission from './pages/ArticleSubmission';
import SingleArticle from './pages/SingleArticle';
import Articles from './pages/Articles';
import { pingBackend } from './services/api';

function HomeContent({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="bg-slate-50 min-h-screen">
      <main>
        <Hero />
        <ArticleFeed 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
        <Newsletter />
      </main>
    </div>
  );
}

function AppContent({ selectedCategory, setSelectedCategory, selectedArticle, setSelectedArticle }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isDashboard = location.pathname === '/dashboard';
  const isAdminDashboard = location.pathname === '/admin';

  // Wake up cold backend early on initial application load
  useEffect(() => {
    pingBackend();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="bg-slate-50">
      {!isDashboard && !isAdminDashboard && <Navbar />}
      <Routes>
        <Route 
          path="/" 
          element={
            <HomeContent 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit" element={<ArticleSubmission />} />
        <Route path="/article/:slug" element={<SingleArticle />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
      {!isAuthPage && !isDashboard && !isAdminDashboard && <Footer />}
    </div>
  );
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <AppContent 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedArticle={selectedArticle}
            setSelectedArticle={setSelectedArticle}
          />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}
export default App;