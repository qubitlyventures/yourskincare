import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import WaitlistModal from './WaitlistModal';
import FloatingAvatars from './FloatingAvatars';
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
              <span className="block">Your Personal</span>
              <span className="block bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
                Skincare Expert
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join the waitlist for the first conversational skincare app that remembers the details and updates routines automatically as life and skin change
            </p>

            {/* Floating Avatars */}
            <div className="flex justify-center mb-8">
              <FloatingAvatars />
            </div>

            {/* Single Join Waitlist Button */}
            <div className="flex justify-center">
              <button 
                onClick={() => setIsWaitlistOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-10 py-5 font-bold text-lg tracking-wider transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 rounded-full"
              >
                <Sparkles size={24} />
                JOIN WAITLIST
              </button>
            </div>
          </div>
        </div>

        <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      </section>

      {/* Video Demo Section - keeping this but removing the button reference */}
      <section id="video-demo" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            See How It Works
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Experience the future of personalized skincare
          </p>
          <div className="relative aspect-video bg-gradient-to-br from-amber-100 to-rose-100 rounded-2xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Sparkles size={32} className="text-amber-600" />
                </div>
                <p className="text-gray-700 font-medium">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;