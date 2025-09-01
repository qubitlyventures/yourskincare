import React, { useState } from 'react';
import { Smartphone, Sparkles, Camera, MessageCircle, X } from 'lucide-react';

const AIConsultationSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Fixed Sidebar */}
      <div className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300 ${isExpanded ? 'w-80' : 'w-16'}`}>
        <div className="bg-gradient-to-br from-rose-500 to-amber-500 rounded-2xl shadow-2xl overflow-hidden">
          {!isExpanded ? (
            // Collapsed State
            <button
              onClick={() => setIsExpanded(true)}
              className="w-16 h-16 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
            >
              <Smartphone size={24} />
            </button>
          ) : (
            // Expanded State
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">SKIN CONSULT AI</h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <img
                    src="https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Skin analysis"
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <div className="text-white text-sm">
                    <p className="font-medium mb-2">Pioneer skin exposome science</p>
                    <p className="text-white/80 text-xs leading-relaxed">
                      Skin's health has always been a quest for Vichy. Our expertise relies on comprehensive study of elements that affect evolution over time.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                  <Camera size={18} />
                  Analyze Your Skin
                </button>
                
                <button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                  <MessageCircle size={18} />
                  Chat with AI
                </button>
                
                <button className="w-full bg-white text-rose-500 hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-semibold">
                  <Sparkles size={18} />
                  Get Started
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-white/60 text-xs">
                  Powered by advanced AI technology
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default AIConsultationSidebar;