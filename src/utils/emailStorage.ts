// Email storage utility for waitlist management
import { supabase } from './supabase';

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

// Convert database row to WaitlistUser interface
const mapDbRowToUser = (row: any): WaitlistUser => ({
  id: row.id,
  name: row.name || '',
  email: row.email,
  country: row.country || '',
  skinType: row.skin_type || '',
  concerns: row.concerns || [],
  signupDate: row.signup_date,
  source: row.source || 'website'
});

// Get all waitlist users from Supabase
export const getWaitlistUsers = async (): Promise<WaitlistUser[]> => {
  try {
    const { data, error } = await supabase
      .from('waitlist_users')
      .select('*')
      .order('signup_date', { ascending: false });

    if (error) {
      console.error('Error fetching waitlist users:', error);
      return [];
    }

    return data?.map(mapDbRowToUser) || [];
  } catch (error) {
    console.error('Error fetching waitlist users:', error);
    return [];
  }
};

// Add user to waitlist
export const addToWaitlist = async (userData: Omit<WaitlistUser, 'id' | 'signupDate'>): Promise<WaitlistUser> => {
  try {
    // Check if email already exists
    const { data: existing } = await supabase
      .from('waitlist_users')
      .select('email')
      .eq('email', userData.email)
      .single();

    if (existing) {
      throw new Error('Email already registered in waitlist');
    }

    // Insert new user
    const { data, error } = await supabase
      .from('waitlist_users')
      .insert({
        name: userData.name,
        email: userData.email,
        country: userData.country,
        skin_type: userData.skinType,
        concerns: userData.concerns,
        source: userData.source
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to save to waitlist');
    }

    return mapDbRowToUser(data);
  } catch (error: any) {
    console.error('Error saving to waitlist:', error);
    throw error;
  }
};

// Export waitlist data (for admin use)
export const exportWaitlistData = async (): Promise<string> => {
  const users = await getWaitlistUsers();
  const csvHeader = 'Name,Email,Country,Skin Type,Concerns,Signup Date,Source\n';
  const csvData = users.map(user => 
    `"${user.name}","${user.email}","${user.country}","${user.skinType}","${user.concerns.join(';')}","${user.signupDate}","${user.source}"`
  ).join('\n');
  
  return csvHeader + csvData;
};

// Get waitlist statistics with real-time updates
export const getWaitlistStats = async () => {
  try {
    const { data: users, error } = await supabase
      .from('waitlist_users')
      .select('*');

    if (error) {
      console.error('Error fetching stats:', error);
      return {
        totalUsers: 0,
        byCountry: {},
        bySkinType: {},
        byConcerns: {},
        bySource: {},
        recentSignups: 0
      };
    }

    const stats = {
      totalUsers: users?.length || 0,
      byCountry: {} as Record<string, number>,
      bySkinType: {} as Record<string, number>,
      byConcerns: {} as Record<string, number>,
      bySource: {} as Record<string, number>,
      recentSignups: 0
    };

    if (users) {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      
      users.forEach(user => {
        // Count recent signups
        if (new Date(user.signup_date) > weekAgo) {
          stats.recentSignups++;
        }

        // Count by country
        if (user.country) {
          stats.byCountry[user.country] = (stats.byCountry[user.country] || 0) + 1;
        }
        
        // Count by skin type
        if (user.skin_type) {
          stats.bySkinType[user.skin_type] = (stats.bySkinType[user.skin_type] || 0) + 1;
        }
        
        // Count by source
        if (user.source) {
          stats.bySource[user.source] = (stats.bySource[user.source] || 0) + 1;
        }
        
        // Count by concerns
        if (user.concerns) {
          user.concerns.forEach((concern: string) => {
            stats.byConcerns[concern] = (stats.byConcerns[concern] || 0) + 1;
          });
        }
      });
    }

    return stats;
  } catch (error) {
    console.error('Error calculating stats:', error);
    return {
      totalUsers: 0,
      byCountry: {},
      bySkinType: {},
      byConcerns: {},
      bySource: {},
      recentSignups: 0
    };
  }
};

// Subscribe to real-time updates for waitlist count
export const subscribeToWaitlistUpdates = (callback: (count: number) => void) => {
  const subscription = supabase
    .channel('waitlist_changes')
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'waitlist_users' 
      }, 
      async () => {
        // Get updated count
        const { count } = await supabase
          .from('waitlist_users')
          .select('*', { count: 'exact', head: true });
        
        callback(count || 0);
      }
    )
    .subscribe();

  return subscription;
};
