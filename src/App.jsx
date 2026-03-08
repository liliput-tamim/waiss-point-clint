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
import Class6 from './pages/Class6';
import Class7 from './pages/Class7';
import Class8 from './pages/Class8';
import Class9_10 from './pages/Class9_10';
import Class9_10Group from './pages/Class9_10Group';
import Hsc from './pages/Hsc';
import HscGroup from './pages/HscGroup';
import SubjectPage from './pages/SubjectPage';
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
          
          {/* Categories Page */}
          <Route path="/categories" element={
            <>
              <Navbar />
              <ContentFadeIn>
                <Category />
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
          
          {/* Class 6 Page */}
          <Route path="/class-6" element={
            <>
              <Navbar />
              <ContentFadeIn>
                <Class6 />
              </ContentFadeIn>
              <Newsletter />
              <Footer />
            </>
          } />
          
          {/* Class 7 Page */}
          <Route path="/class-7" element={
            <>
              <Navbar />
              <ContentFadeIn>
                <Class7 />
              </ContentFadeIn>
              <Newsletter />
              <Footer />
            </>
          } />
          
          {/* Class 8 Page */}
          <Route path="/class-8" element={
            <>
              <Navbar />
              <ContentFadeIn>
                <Class8 />
              </ContentFadeIn>
              <Newsletter />
              <Footer />
            </>
          } />
          
          {/* Class 6 Subject Pages */}
          <Route path="/class-6/:subject" element={
            <>
              <Navbar />
              <ContentFadeIn>
                <SubjectPage />
              </ContentFadeIn>
              <Newsletter />
              <Footer />
            </>
          } />
          
          {/* Class 7 Subject Pages */}
          <Route path="/class-7/:subject" element={
            <>
              <Navbar />
              <ContentFadeIn>
                <SubjectPage />
              </ContentFadeIn>
              <Newsletter />
              <Footer />
            </>
          } />
          
          {/* Class 8 Subject Pages */}
          <Route path="/class-8/:subject" element={
            <>
              <Navbar />
              <ContentFadeIn>
                <SubjectPage />
              </ContentFadeIn>
              <Newsletter />
              <Footer />
            </>
          } />
          
          {/* Class 9-10 Page */}
          <Route path="/class-9-10" element={
            <>
              <Navbar />
              <ContentFadeIn>
                <Class9_10 />
              </ContentFadeIn>
              <Newsletter />
              <Footer />
            </>
          } />
          
          {/* Class 9-10 Group Pages */}
          <Route path="/class-9-10/:group" element={
            <>
              <Navbar />
              <ContentFadeIn>
                <Class9_10Group />
              </ContentFadeIn>
              <Newsletter />
              <Footer />
            </>
          } />
          
          {/* Class 9-10 Subject Pages */}
          <Route path="/class-9-10/:group/:subject" element={
            <>
              <Navbar />
              <ContentFadeIn>
                <SubjectPage />
              </ContentFadeIn>
              <Newsletter />
              <Footer />
            </>
          } />
          
          {/* HSC Page */}
          <Route path="/hsc" element={
            <>
              <Navbar />
              <ContentFadeIn>
                <Hsc />
              </ContentFadeIn>
              <Newsletter />
              <Footer />
            </>
          } />
          
          {/* HSC Group Pages */}
          <Route path="/hsc/:group" element={
            <>
              <Navbar />
              <ContentFadeIn>
                <HscGroup />
              </ContentFadeIn>
              <Newsletter />
              <Footer />
            </>
          } />
          
          {/* HSC Subject Pages */}
          <Route path="/hsc/:group/:subject" element={
            <>
              <Navbar />
              <ContentFadeIn>
                <SubjectPage />
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
