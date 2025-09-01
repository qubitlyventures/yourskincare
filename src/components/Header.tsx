import React from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  onOpenWaitlist: () => void;
  onOpenAboutUs: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen, onOpenWaitlist, onOpenAboutUs }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Your Skin Care</h1>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-amber-600 transition-colors duration-200">Home</a>
            <a href="#skincare-101" className="text-gray-700 hover:text-amber-600 transition-colors duration-200">Skincare 101</a>
            <button 
              onClick={onOpenAboutUs}
              className="text-gray-700 hover:text-amber-600 transition-colors duration-200"
            >
              About Us
            </button>
            <button 
              onClick={onOpenWaitlist}
              className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors duration-200"
            >
              Join Waitlist
            </button>
          </nav>

          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-4">
            <a href="#home" className="block text-gray-700 hover:text-amber-600">Home</a>
            <a href="#skincare-101" className="block text-gray-700 hover:text-amber-600">Skincare 101</a>
            <a href="#tips" className="block text-gray-700 hover:text-amber-600">Beauty Tips</a>
            <button 
              onClick={onOpenAboutUs}
              className="block text-gray-700 hover:text-amber-600 text-left"
            >
              About Us
            </button>
            <button 
              onClick={onOpenWaitlist}
              className="w-full bg-amber-600 text-white py-2 rounded-full hover:bg-amber-700 transition-colors duration-200"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;