import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCategories from './components/FeaturedCategories';
import TrendingArticles from './components/TrendingArticles';
import LatestPosts from './components/LatestPosts';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanelNew from './components/admin/AdminPanelNew';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Category from './pages/Category';
import BlogPost from './components/BlogPost';
import BookOpening, { ContentFadeIn } from './components/BookOpening';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <Router>
      {showIntro && <BookOpening onComplete={handleIntroComplete} />}
      
      <div className={`min-h-screen bg-white ${showIntro ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<AdminPanelNew />} />
          
          {/* Single Blog Post */}
          <Route path="/post/:id" element={
            <>
              <Navbar />
              <BlogPost />
              <Newsletter />
              <Footer />
            </>
          } />
          
          {/* Blog Page */}
          <Route path="/blog" element={
            <>
              <Navbar />
              <ContentFadeIn>
                <Blog />
              </ContentFadeIn>
              <Newsletter />
              <Footer />
            </>
          } />
          
          {/* Contact Page */}
          <Route path="/contact" element={
            <>
              <Navbar />
              <ContentFadeIn>
                <Contact />
              </ContentFadeIn>
              <Newsletter />
              <Footer />
            </>
          } />
          
          {/* Category Pages */}
          <Route path="/category/:category" element={
            <>
              <Navbar />
              <ContentFadeIn>
                <Category />
              </ContentFadeIn>
              <Newsletter />
              <Footer />
            </>
          } />
          
          {/* Home Page */}
          <Route path="/" element={
            <>
              <Navbar />
              <ContentFadeIn>
                <Hero />
              </ContentFadeIn>
              <ContentFadeIn>
                <FeaturedCategories />
              </ContentFadeIn>
              <ContentFadeIn>
                <TrendingArticles />
              </ContentFadeIn>
              <ContentFadeIn>
                <LatestPosts />
              </ContentFadeIn>
              <Newsletter />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
