import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BlogSection from './components/BlogSection';
import BlogDetail from './components/BlogDetail';
import PersistentWaitlist from './components/PersistentWaitlist';
import WaitlistModal from './components/WaitlistModal';
import Footer from './components/Footer';
import AboutUs from './components/pages/AboutUs';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import TermsOfUse from './components/pages/TermsOfUse';
import Contact from './components/pages/Contact';
import { initGA } from './utils/analytics';
import { BlogPost, getBlogById } from './data/blogData';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isTermsOfUseOpen, setIsTermsOfUseOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    // Initialize Google Analytics
    initGA();
  }, []);

  const handleBlogSelect = (blogId: number) => {
    const blog = getBlogById(blogId);
    if (blog) {
      setSelectedBlog(blog);
    }
  };

  const handleBackToBlog = () => {
    setSelectedBlog(null);
  };

  // Show blog detail view if a blog is selected
  if (selectedBlog) {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen}
          onOpenWaitlist={() => setIsWaitlistModalOpen(true)}
          onOpenAboutUs={() => setIsAboutUsOpen(true)}
        />
        <BlogDetail blog={selectedBlog} onBack={handleBackToBlog} />
        
        {/* Global Waitlist Modal */}
        <WaitlistModal 
          isOpen={isWaitlistModalOpen} 
          onClose={() => setIsWaitlistModalOpen(false)} 
        />

        {/* Page Modals */}
        <AboutUs isOpen={isAboutUsOpen} onClose={() => setIsAboutUsOpen(false)} />
        <PrivacyPolicy isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)} />
        <TermsOfUse isOpen={isTermsOfUseOpen} onClose={() => setIsTermsOfUseOpen(false)} />
        <Contact isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        
        <Footer 
          onOpenAboutUs={() => setIsAboutUsOpen(true)}
          onOpenPrivacyPolicy={() => setIsPrivacyPolicyOpen(true)}
          onOpenTermsOfUse={() => setIsTermsOfUseOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        onOpenWaitlist={() => setIsWaitlistModalOpen(true)}
        onOpenAboutUs={() => setIsAboutUsOpen(true)}
      />
      <main className="relative">
        <HeroSection />
        <BlogSection 
          onOpenWaitlist={() => setIsWaitlistModalOpen(true)}
          onBlogClick={handleBlogSelect}
        />
        
        {/* Persistent Waitlist Component */}
        <PersistentWaitlist onOpenModal={() => setIsWaitlistModalOpen(true)} />
        
        {/* Global Waitlist Modal */}
        <WaitlistModal 
          isOpen={isWaitlistModalOpen} 
          onClose={() => setIsWaitlistModalOpen(false)} 
        />

        {/* Page Modals */}
        <AboutUs isOpen={isAboutUsOpen} onClose={() => setIsAboutUsOpen(false)} />
        <PrivacyPolicy isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)} />
        <TermsOfUse isOpen={isTermsOfUseOpen} onClose={() => setIsTermsOfUseOpen(false)} />
        <Contact isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </main>
      <Footer 
        onOpenAboutUs={() => setIsAboutUsOpen(true)}
        onOpenPrivacyPolicy={() => setIsPrivacyPolicyOpen(true)}
        onOpenTermsOfUse={() => setIsTermsOfUseOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />
    </div>
  );
}

export default App;