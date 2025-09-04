import React, { useState, useEffect } from 'react';
import { getWaitlistStats } from '../utils/emailStorage';

// Sample avatar data (you can replace with real user avatars later)
const avatarData = [
  { id: 1, src: '/avatar1.jpg', alt: 'User 1', name: 'Sarah' },
  { id: 2, src: '/avatar2.jpg', alt: 'User 2', name: 'Michael' },
  { id: 3, src: '/avatar3.jpg', alt: 'User 3', name: 'Emma' },
  { id: 4, src: '/avatar4.jpg', alt: 'User 4', name: 'David' },
  { id: 5, src: '/avatar5.jpg', alt: 'User 5', name: 'Lisa' },
  { id: 6, src: '/avatar6.jpg', alt: 'User 6', name: 'James' },
];

// Fallback avatars using initials with different colors
const generateFallbackAvatar = (name: string, index: number) => {
  const colors = [
    'bg-gradient-to-br from-pink-400 to-rose-500',
    'bg-gradient-to-br from-blue-400 to-indigo-500',
    'bg-gradient-to-br from-green-400 to-emerald-500',
    'bg-gradient-to-br from-purple-400 to-violet-500',
    'bg-gradient-to-br from-amber-400 to-orange-500',
    'bg-gradient-to-br from-teal-400 to-cyan-500',
  ];
  
  return (
    <div className={`w-12 h-12 rounded-full ${colors[index % colors.length]} flex items-center justify-center text-white font-bold text-sm`}>
      {name.charAt(0)}
    </div>
  );
};

const FloatingAvatars: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [visibleAvatars, setVisibleAvatars] = useState(avatarData.slice(0, 5));
  const [currentIndex, setCurrentIndex] = useState(5);

  useEffect(() => {
    // Load waitlist stats
    const loadStats = async () => {
      const stats = await getWaitlistStats();
      setTotalUsers(stats.totalUsers);
    };
    loadStats();

    // Set up avatar rotation
    const interval = setInterval(() => {
      setVisibleAvatars(prev => {
        const newAvatars = [...prev];
        const nextAvatar = avatarData[currentIndex % avatarData.length];
        
        // Remove first avatar and add new one at the end
        newAvatars.shift();
        newAvatars.push(nextAvatar);
        
        return newAvatars;
      });
      
      setCurrentIndex(prev => prev + 1);
    }, 2000); // Change avatar every 2 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-3 border border-white/20">
      {/* Animated Avatar Stack */}
      <div className="flex -space-x-2">
        {visibleAvatars.map((avatar, index) => (
          <div
            key={`${avatar.id}-${index}`}
            className="relative transition-all duration-500 ease-in-out transform hover:scale-110 hover:z-10"
            style={{
              animation: `fadeSlide 2s ease-in-out`,
              animationDelay: `${index * 0.1}s`
            }}
          >
            {/* Try to load real image, fallback to generated avatar */}
            <div className="w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white">
              <img
                src={avatar.src}
                alt={avatar.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Replace with fallback avatar if image fails to load
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.fallback-avatar')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'fallback-avatar absolute inset-0';
                    fallback.innerHTML = generateFallbackAvatar(avatar.name, index).props.children.toString();
                    fallback.classList.add(...generateFallbackAvatar(avatar.name, index).props.className.split(' '));
                    parent.appendChild(fallback);
                  }
                }}
              />
              {/* Fallback rendered in onError */}
            </div>
          </div>
        ))}
        
        {/* Plus indicator for more users */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs">
          +{Math.max(0, totalUsers - 5)}
        </div>
      </div>

      {/* Counter Text */}
      <div className="text-white font-semibold">
        <span className="text-lg font-bold">{totalUsers}</span>
        <span className="text-sm ml-1 opacity-90">Joined already</span>
      </div>

      {/* Floating dots animation */}
      <div className="flex gap-1">
        {[0, 1, 2].map((dot) => (
          <div
            key={dot}
            className="w-1 h-1 bg-white/60 rounded-full animate-pulse"
            style={{
              animationDelay: `${dot * 0.3}s`,
              animationDuration: '1.5s'
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeSlide {
          0% {
            opacity: 0;
            transform: translateX(-20px) scale(0.8);
          }
          50% {
            opacity: 0.7;
            transform: translateX(-5px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingAvatars;
