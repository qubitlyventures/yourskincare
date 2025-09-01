import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import WaitlistModal from './WaitlistModal';
import { trackNavigation } from '../utils/analytics';

const HeroSection: React.FC = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      src: "/herosectionimagewoman.png",
      alt: "Beautiful woman with golden skin showcasing skincare results"
    },
    {
      src: "/herosectionimagemale.png", 
      alt: "Handsome man showcasing skincare results"
    }
  ];

  // Auto-scroll images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const navigationItems = [
    { id: 'skincare-101', label: 'Skincare 101' },
    { id: 'tips', label: 'Beauty Tips' },
    { id: 'about', label: 'Our Story' },
    { id: 'join-waitlist', label: 'Join Waitlist', action: () => setIsWaitlistOpen(true) }
  ];

  const handleNavClick = (item: any) => {
    trackNavigation(item.id);
    if (item.action) {
      item.action();
    } else {
      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section - Sliding Images */}
      <section id="home" className="min-h-screen relative overflow-hidden bg-black">
        {/* Background Images with Transition */}
        <div className="absolute inset-0">
          {images.map((image, index) => (
            <img 
              key={index}
              src={image.src}
              alt={image.alt}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ objectPosition: 'center 42%' }}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
          {/* Golden light overlay */}
          <div className="absolute inset-0"
               style={{
                 background: `
                   radial-gradient(circle at 30% 40%, rgba(251, 191, 36, 0.3) 0%, transparent 50%),
                   linear-gradient(45deg, transparent 0%, rgba(251, 191, 36, 0.1) 30%, transparent 70%)
                 `
               }}>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-amber-400 scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center lg:justify-start lg:pl-32">
          <div className="text-white text-center lg:text-left max-w-2xl px-8">
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-amber-400 to-rose-400 text-black px-6 py-3 rounded-full text-sm font-bold tracking-wide mb-8">
                AI-POWERED SKINCARE
              </span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
              Real conversation
              </span>
              <br />
              <span className="text-white">Truly skin care</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 mb-12 leading-relaxed max-w-xl">
            Join the waitlist for the first conversational skincare app that remembers the details and updates routines automatically as life and skin change
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <button 
                onClick={() => setIsWaitlistOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-10 py-5 font-bold text-lg tracking-wider transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 rounded-full"
              >
                <Sparkles size={24} />
                JOIN WAITLIST
              </button>
              <button 
                onClick={() => handleNavClick({ id: 'video-demo' })}
                className="border-2 border-white/50 hover:border-white text-white hover:bg-white/10 px-10 py-5 font-bold text-lg tracking-wider transition-all duration-300 backdrop-blur-sm rounded-full"
              >
                WATCH DEMO
              </button>
            </div>
          </div>
        </div>

        <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      </section>

      {/* Video Demo Section */}
      <section id="video-demo" className="relative min-h-screen overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/skincare-demo-video.mp4" type="video/mp4" />
          </video>
          {/* Video overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Content over video */}
        <div className="relative z-10 flex items-center justify-center min-h-screen text-white text-center px-8">
          <div className="max-w-4xl">
            <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              AI Skincare
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
                Analysis
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto">
            Reads skin in real time, learns patterns, and turns insights into routines. Personal to lifestyle, climate, and UVA/UVB exposure.
            </p>
            
            {/* Feature highlights */}
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-6xl mx-auto">
              <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-black/80 transition-all duration-300 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="text-amber-400 flex-shrink-0">
                    <Sparkles size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-white">Instant Skin Analysis</h3>
                    <p className="text-gray-200 text-sm">Instant scan reveals your top skin priorities and aging accelerators factors to reach your skin's visible beauty and vitality.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-black/80 transition-all duration-300 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="text-amber-400 flex-shrink-0">
                    <Sparkles size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-white">Your Skin Companion</h3>
                    <p className="text-gray-200 text-sm">Your 24/7 skin companion that understands your skin patterns and progress better than anyone</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-black/80 transition-all duration-300 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="text-amber-400 flex-shrink-0">
                    <Sparkles size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-white">Personalized Care</h3>
                    <p className="text-gray-200 text-sm">Custom routines tuned to skin type, climate, lifestyle, and UVA/UVB exposure.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-black/80 transition-all duration-300 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="text-amber-400 flex-shrink-0">
                    <Sparkles size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-white">Get the best product fit for your skin</h3>
                    <p className="text-gray-200 text-sm">Check cosmetics' fit with no brand affiliation</p>
                  </div>
                </div>
              </div>
            </div>

          </div>   
        </div>     
      </section>   
    </>
  );
};

export default HeroSection;