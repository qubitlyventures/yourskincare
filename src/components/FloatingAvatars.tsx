import React, { useState, useEffect } from 'react';
import { getWaitlistStats } from '../utils/emailStorage';

// Sample avatar data with 12 avatars (you can replace with real user avatars later)
const avatarData = [
  { id: 1, src: '/avatar1.jpg', alt: 'User 1', name: 'Sarah' },
  { id: 2, src: '/avatar2.jpg', alt: 'User 2', name: 'Michael' },
  { id: 3, src: '/avatar3.jpg', alt: 'User 3', name: 'Emma' },
  { id: 4, src: '/avatar4.jpg', alt: 'User 4', name: 'David' },
  { id: 5, src: '/avatar5.jpg', alt: 'User 5', name: 'Lisa' },
  { id: 6, src: '/avatar6.jpg', alt: 'User 6', name: 'James' },
  { id: 7, src: '/avatar7.jpg', alt: 'User 7', name: 'Sophie' },
  { id: 8, src: '/avatar8.jpg', alt: 'User 8', name: 'Ryan' },
  { id: 9, src: '/avatar9.jpg', alt: 'User 9', name: 'Maya' },
  { id: 10, src: '/avatar10.jpg', alt: 'User 10', name: 'Alex' },
  { id: 11, src: '/avatar11.jpg', alt: 'User 11', name: 'Zoe' },
  { id: 12, src: '/avatar12.jpg', alt: 'User 12', name: 'Carlos' },
];

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

  // Generate fallback avatar with initials and gradient colors
  const renderAvatar = (avatar: typeof avatarData[0], index: number) => {
    const colors = [
      'from-pink-400 to-rose-500',
      'from-blue-400 to-indigo-500',
      'from-green-400 to-emerald-500',
      'from-purple-400 to-violet-500',
      'from-amber-400 to-orange-500',
      'from-teal-400 to-cyan-500',
      'from-red-400 to-pink-500',
      'from-cyan-400 to-blue-500',
      'from-lime-400 to-green-500',
      'from-violet-400 to-purple-500',
      'from-orange-400 to-red-500',
      'from-emerald-400 to-teal-500',
    ];

    return (
      <div className="w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden relative">
        <img
          src={avatar.src}
          alt={avatar.alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Hide the image and show fallback
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) {
              fallback.style.display = 'flex';
            }
          }}
        />
        {/* Fallback avatar with initials */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${colors[avatar.id % colors.length]} flex items-center justify-center text-white font-bold text-sm`}
          style={{ display: 'none' }}
        >
          {avatar.name.charAt(0)}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Add CSS keyframes to the document head */}
      <style>
        {`
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
          .avatar-animation {
            animation: fadeSlide 2s ease-in-out;
          }
        `}
      </style>
      
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-3 border border-white/20">
        {/* Animated Avatar Stack */}
        <div className="flex -space-x-2">
          {visibleAvatars.map((avatar, index) => (
            <div
              key={`${avatar.id}-${index}`}
              className="relative transition-all duration-500 ease-in-out transform hover:scale-110 hover:z-10 avatar-animation"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {renderAvatar(avatar, index)}
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
      </div>
    </>
  );
};

export default FloatingAvatars;
