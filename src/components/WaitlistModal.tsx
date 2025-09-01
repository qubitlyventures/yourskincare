import React, { useState } from 'react';
import { X, Mail, User, MapPin, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { addToWaitlist } from '../utils/emailStorage';
import { trackWaitlistSignup } from '../utils/analytics';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    skinType: '',
    concerns: [] as string[],
    source: 'website'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const skinTypes = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'];
  const skinConcerns = ['Acne', 'Aging', 'Dark Spots', 'Dryness', 'Sensitivity', 'Pores', 'Redness', 'Dullness'];
  const regions = ['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Australia', 'Middle East'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Validate form - only email is required
      if (!formData.email) {
        throw new Error('Please enter your email address');
      }

      // Save to waitlist
      await addToWaitlist(formData);
      
      // Track analytics
      trackWaitlistSignup(formData);
      
      setIsSubmitted(true);
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ 
          name: '', 
          email: '', 
          country: '', 
          skinType: '', 
          concerns: [],
          source: 'website'
        });
        onClose();
      }, 3000);
      
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConcernToggle = (concern: string) => {
    setFormData(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Join the Revolution</h2>
                <p className="text-gray-600 text-sm mt-1">Be first to experience skincare application that knows you the best</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User size={16} className="inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  Region
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select your region</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* Skin Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Skin Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {skinTypes.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, skinType: type })}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        formData.skinType === type
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg transform scale-105'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin Concerns */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Skin Concerns (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {skinConcerns.map(concern => (
                    <button
                      key={concern}
                      type="button"
                      onClick={() => handleConcernToggle(concern)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        formData.concerns.includes(concern)
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {concern}
                    </button>
                  ))}
                </div>
                {formData.concerns.length > 0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    Selected: {formData.concerns.join(', ')}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-8 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Joining the Revolution...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Sparkles size={20} />
                  Join the Waitlist
                </div>
              )}
            </button>

            {/* Privacy Note */}
            <p className="text-xs text-gray-500 mt-4 text-center leading-relaxed">
              By joining our waitlist, you agree to receive updates about Your Skin Care. 
              We respect your privacy and will never share your data.
            </p>
          </form>
        ) : (
          /* Success State */
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-white" size={40} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Future!</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              🎉 You're now on the waitlist for Your Skin Care! We'll notify you as soon as we launch with exclusive early access.
            </p>
            <div className="bg-gradient-to-r from-amber-50 to-rose-50 p-6 rounded-2xl mb-6">
              <h4 className="font-bold text-gray-900 mb-2">What's Next?</h4>
              <ul className="text-sm text-gray-700 space-y-1 text-left">
                <li>✨ Exclusive early access to Your Skin Care</li>
                <li>📧 Personalized skincare tips via email</li>
                <li>🎁 Special launch offers just for you</li>
                <li>📱 First to try our AI skin analysis</li>
              </ul>
            </div>
            <p className="text-amber-800 text-sm">
              Keep an eye on your inbox for exclusive content and updates!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistModal;