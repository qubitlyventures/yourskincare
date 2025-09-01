import React from 'react';
import { Instagram } from 'lucide-react';

// TikTok icon component with proper styling for visibility
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

interface FooterProps {
  onOpenAboutUs: () => void;
  onOpenPrivacyPolicy: () => void;
  onOpenTermsOfUse: () => void;
  onOpenContact: () => void;
}

const Footer: React.FC<FooterProps> = ({ 
  onOpenAboutUs, 
  onOpenPrivacyPolicy, 
  onOpenTermsOfUse, 
  onOpenContact 
}) => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Your Skin Care
            </h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                <TikTokIcon />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#skincare-101" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">Skincare 101</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">Expert Advice</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">Research</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={onOpenAboutUs}
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenPrivacyPolicy}
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenTermsOfUse}
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-left"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenContact}
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Your Skin Care. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            Designed for global beauty enthusiasts 🌍
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;