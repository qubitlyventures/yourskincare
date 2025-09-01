// Google Analytics 4 Integration
export const GA_TRACKING_ID = 'G-ZTXMB17ERZ'; // Your Skin Care GA4 tracking ID

// Declare global window properties for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined') {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args: any[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: title,
      page_location: url,
    });
  }
};

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track blog clicks
export const trackBlogClick = (blogId: number, blogTitle: string, category: string, audience: string) => {
  trackEvent('blog_click', 'engagement', `${blogId}-${blogTitle}`, blogId);
  trackEvent('blog_category_click', 'engagement', category);
  trackEvent('blog_audience_click', 'engagement', audience);
};

// Track waitlist signups
export const trackWaitlistSignup = (userData: any) => {
  trackEvent('waitlist_signup', 'conversion', 'success');
  trackEvent('user_skin_type', 'user_data', userData.skinType);
  trackEvent('user_region', 'user_data', userData.country);
  userData.concerns.forEach((concern: string) => {
    trackEvent('user_concern', 'user_data', concern);
  });
};

// Track video plays
export const trackVideoPlay = (videoName: string) => {
  trackEvent('video_play', 'engagement', videoName);
};

// Track navigation clicks
export const trackNavigation = (section: string) => {
  trackEvent('navigation_click', 'engagement', section);
};