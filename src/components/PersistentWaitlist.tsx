import React, { useState, useEffect } from 'react';
import { X, Sparkles, Users, Clock } from 'lucide-react';
import { getWaitlistStats, subscribeToWaitlistUpdates } from '../utils/emailStorage';

interface PersistentWaitlistProps {
  onOpenModal: () => void;
}

const PersistentWaitlist: React.FC<PersistentWaitlistProps> = ({ onOpenModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [stats, setStats] = useState({ totalUsers: 0 });

  useEffect(() => {
    // 🎯 NEW: Check if user has already joined
    const userJoined = localStorage.getItem('glow_ai_user_joined');
    if (userJoined) {
      setIsDismissed(true);
      return;
    }

    // Check if previously dismissed
    const dismissed = localStorage.getItem('glow_ai_persistent_dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show after 3 seconds of page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Load initial stats
    const loadStats = async () => {
      const initialStats = await getWaitlistStats();
      setStats(initialStats);
    };
    loadStats();

    // Subscribe to real-time updates
    const subscription = subscribeToWaitlistUpdates((count) => {
      setStats(prev => ({ ...prev, totalUsers: count }));
    });

    return () => {
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Auto-show every 2 minutes if not dismissed permanently
    if (!isDismissed) {
      const interval = setInterval(() => {
        setIsVisible(true);
      }, 120000); // 2 minutes

      return () => clearInterval(interval);
    }
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handlePermanentDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('glow_ai_persistent_dismissed', 'true');
  };

  const handleJoinClick = () => {
    setIsVisible(false);
    onOpenModal();
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <div className="bg-gradient-to-r from-amber-500 to-rose-500 rounded-2xl shadow-2xl p-6 text-white transform animate-slide-up">
        {/* Close Buttons */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-amber-200" />
            <span className="font-bold text-sm">LIMITED EARLY ACCESS</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={handleDismiss}
              className="text-white/70 hover:text-white p-1 transition-colors duration-200"
              title="Hide for now"
            >
              <Clock size={16} />
            </button>
            <button
              onClick={handlePermanentDismiss}
              className="text-white/70 hover:text-white p-1 transition-colors duration-200"
              title="Don't show again"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className="font-bold text-lg mb-2">Join the Skincare Revolution</h3>
          <p className="text-white/90 text-sm leading-relaxed mb-3">
            Be among the first to experience personalized skincare recommendations.
          </p>
          
          {/* Stats */}
          <div className="flex items-center gap-4 text-xs mb-4">
            <div className="flex items-center gap-1">
              <Users size={12} />
              <span>{stats.totalUsers} joined</span>
            </div>
            <div className="bg-white/20 px-2 py-1 rounded-full">
              <span>Early Access</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleJoinClick}
          className="w-full bg-white text-amber-600 hover:bg-gray-50 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <Sparkles size={16} />
          Join Waitlist
        </button>

        {/* Small print */}
        <p className="text-white/60 text-xs mt-3 text-center">
          No spam, just early access and skincare tips
        </p>
      </div>
    </div>
  );
};

export default PersistentWaitlist;