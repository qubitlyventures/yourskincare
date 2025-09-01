// Email storage utility for waitlist management
export interface WaitlistUser {
  id: string;
  name: string;
  email: string;
  country: string;
  skinType: string;
  concerns: string[];
  signupDate: string;
  source: string;
}

// Local storage key
const WAITLIST_STORAGE_KEY = 'glow_ai_waitlist';

// Get all waitlist users from localStorage
export const getWaitlistUsers = (): WaitlistUser[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(WAITLIST_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading waitlist data:', error);
    return [];
  }
};

// Add user to waitlist
export const addToWaitlist = (userData: Omit<WaitlistUser, 'id' | 'signupDate'>): WaitlistUser => {
  const user: WaitlistUser = {
    ...userData,
    id: generateUserId(),
    signupDate: new Date().toISOString(),
  };

  const existingUsers = getWaitlistUsers();
  
  // Check if email already exists
  if (existingUsers.some(existingUser => existingUser.email === user.email)) {
    throw new Error('Email already registered in waitlist');
  }

  const updatedUsers = [...existingUsers, user];
  
  try {
    localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(updatedUsers));
    
    // Also send to external service (you can integrate with your backend here)
    sendToExternalService(user);
    
    return user;
  } catch (error) {
    console.error('Error saving to waitlist:', error);
    throw new Error('Failed to save to waitlist');
  }
};

// Generate unique user ID
const generateUserId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Send to external service (integrate with your backend/email service)
const sendToExternalService = async (user: WaitlistUser) => {
  try {
    // Example: Send to your backend API
    await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    
    // Example: Send to email service (like Mailchimp, ConvertKit, etc.)
    // await sendToEmailService(user);
    
  } catch (error) {
    console.log('External service not available, data saved locally:', error);
  }
};

// Export waitlist data (for admin use)
export const exportWaitlistData = (): string => {
  const users = getWaitlistUsers();
  const csvHeader = 'Name,Email,Country,Skin Type,Concerns,Signup Date,Source\n';
  const csvData = users.map(user => 
    `"${user.name}","${user.email}","${user.country}","${user.skinType}","${user.concerns.join(';')}","${user.signupDate}","${user.source}"`
  ).join('\n');
  
  return csvHeader + csvData;
};

// Get waitlist statistics
export const getWaitlistStats = () => {
  const users = getWaitlistUsers();
  
  const stats = {
    totalUsers: users.length,
    byCountry: {} as Record<string, number>,
    bySkinType: {} as Record<string, number>,
    byConcerns: {} as Record<string, number>,
    bySource: {} as Record<string, number>,
    recentSignups: users.filter(user => {
      const signupDate = new Date(user.signupDate);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return signupDate > weekAgo;
    }).length,
  };

  users.forEach(user => {
    // Count by country
    stats.byCountry[user.country] = (stats.byCountry[user.country] || 0) + 1;
    
    // Count by skin type
    stats.bySkinType[user.skinType] = (stats.bySkinType[user.skinType] || 0) + 1;
    
    // Count by source
    stats.bySource[user.source] = (stats.bySource[user.source] || 0) + 1;
    
    // Count by concerns
    user.concerns.forEach(concern => {
      stats.byConcerns[concern] = (stats.byConcerns[concern] || 0) + 1;
    });
  });

  return stats;
};
