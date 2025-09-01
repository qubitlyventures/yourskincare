import React from 'react';
import { X } from 'lucide-react';

interface AboutUsProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Your Skin Care</h1>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-gradient-to-r from-amber-50 to-rose-50 p-6 rounded-2xl mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                At Your Skin Care, we believe that everyone deserves personalized skincare that truly works. 
                Our AI-powered platform combines cutting-edge technology with dermatological expertise 
                to deliver customized skincare recommendations that adapt to your unique needs.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Who We Are</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We're a team of passionate technologists, dermatologists, and skincare enthusiasts 
              dedicated to revolutionizing the way people approach skincare. Our diverse backgrounds 
              in artificial intelligence, dermatology, and consumer beauty give us a unique perspective 
              on solving real skincare challenges.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Technology</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our proprietary AI algorithms analyze multiple factors including skin type, concerns, 
              lifestyle, climate, and UV exposure to create truly personalized skincare recommendations. 
              We continuously learn and adapt to provide you with the most effective skincare routine 
              for your evolving needs.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We're committed to transparency, scientific accuracy, and putting our users first. 
              Our recommendations are unbiased and based purely on what's best for your skin, 
              not on brand partnerships or sales incentives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
