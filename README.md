# GlowAI - AI-Powered Skincare Landing Page

A modern, responsive landing page for an AI-powered skincare application with comprehensive blog management, waitlist functionality, and analytics tracking.

## Features

### 🎨 Modern Design
- Responsive design optimized for all devices
- Beautiful hero section with image and video showcase
- Gradient backgrounds and smooth animations
- Professional blog layout with category filtering

### 📝 Blog Management
- **15 Pre-written blogs** organized by audience:
  - 10 blogs for women's skincare
  - 3 blogs for men's skincare  
  - 2 blogs for children's skincare
- Easy content management system
- Category and tag filtering
- Featured articles highlighting
- Related articles suggestions

### 📧 Waitlist Management
- **Persistent waitlist component** that appears periodically
- Comprehensive signup form with skin type and concerns
- **Local storage** with CSV export functionality
- **Email integration ready** for backend services
- Real-time statistics and analytics

### 📊 Analytics & Tracking
- **Google Analytics 4** integration
- Custom event tracking for:
  - Blog clicks and engagement
  - Waitlist conversions
  - User behavior patterns
  - Video interactions
- Admin dashboard with detailed insights

### 🔧 Technical Features
- Built with **React 18** and **TypeScript**
- **Tailwind CSS** for styling
- **Vite** for fast development
- **ESLint** for code quality
- Fully typed with comprehensive interfaces

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd skincare-web

# Install dependencies
npm install

# Start development server
npm run dev
```

### Setup Google Analytics
1. Create a Google Analytics 4 property
2. Copy your tracking ID (format: G-XXXXXXXXXX)
3. Replace the placeholder in:
   - `src/utils/analytics.ts` (line 2)
   - `index.html` (line 22)

### Environment Setup
```bash
# Optional: Create .env file for backend integration
VITE_API_URL=your-backend-url
VITE_GA_TRACKING_ID=your-ga-tracking-id
```

## File Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── HeroSection.tsx  # Main hero with video
│   ├── BlogSection.tsx  # Blog grid with filtering
│   ├── WaitlistModal.tsx # Signup modal
│   ├── PersistentWaitlist.tsx # Floating waitlist
│   ├── BlogDetail.tsx   # Individual blog page
│   └── AdminDashboard.tsx # Analytics dashboard
├── data/
│   └── blogData.ts      # Blog content and management
├── utils/
│   ├── analytics.ts     # Google Analytics integration
│   └── emailStorage.ts  # Waitlist data management
└── App.tsx              # Main application
```

## Blog Management

### Adding New Blogs
Edit `src/data/blogData.ts`:

```typescript
{
  id: 16,
  title: "Your New Blog Title",
  excerpt: "Brief description...",
  content: "Full blog content...",
  image: "https://your-image-url.jpg",
  category: "Category Name",
  targetAudience: "women" | "men" | "children",
  tags: ["tag1", "tag2"],
  author: "Author Name",
  publishDate: "2024-01-15",
  readTime: "5 min read",
  featured: true | false
}
```

### Blog Categories
- **Women's Skincare**: Anti-aging, hormonal care, pregnancy-safe products
- **Men's Skincare**: Grooming basics, post-shave care, anti-aging
- **Children's Care**: Gentle products, sun protection, sensitive skin

## Waitlist Features

### Data Collection
- Name and email (required)
- Geographic region
- Skin type selection
- Multiple skin concerns
- Signup source tracking

### Data Storage
- **Local Storage**: Immediate storage with localStorage
- **CSV Export**: Admin can download user data
- **Backend Ready**: Easy integration with your API

### Email Integration
Update `src/utils/emailStorage.ts` to connect with:
- **Mailchimp**
- **ConvertKit** 
- **Your custom backend API**
- **SendGrid**

## Analytics Tracking

## 📊 Analytics Events

The following events are automatically tracked:
- `blog_click` - When users click on blog articles
- `waitlist_signup` - When users join the waitlist
- `video_play` - When users play the hero video
- `navigation_click` - Menu and navigation interactions
- `user_skin_type` - User demographic data
- `user_region` - Geographic data

## 🔌 Email Service Integration

Update `src/utils/emailStorage.ts` to integrate with:
- **Mailchimp**
- **ConvertKit** 
- **SendGrid**
- **Your custom backend API**

Example integration:
```typescript
const sendToExternalService = async (user: WaitlistUser) => {
  // Your email service integration
  await fetch('https://api.mailchimp.com/3.0/lists/LIST_ID/members', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: user.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: user.name,
        SKINTYPE: user.skinType,
        REGION: user.country
      }
    }),
  });
};
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables for Google Analytics

## 📈 Performance Tips

1. **Images**: Optimize all images before adding them
2. **SEO**: Update meta tags in `index.html`
3. **Analytics**: Monitor Core Web Vitals in Google Analytics
4. **Caching**: Use CDN for static assets

## 🎨 Customization

### Colors
The design uses a warm color palette with amber and rose gradients. Update in Tailwind classes:
- Primary: `amber-500` to `rose-500`
- Secondary: `gray-900` and `gray-50`

### Typography
Uses Inter font family loaded from Google Fonts.

### Animations
Custom animations defined in `index.html` and Tailwind classes.

## 🆘 Troubleshooting

### Common Issues

1. **TypeScript Errors**: Ensure all dependencies are installed
2. **Module Not Found**: Check import paths and file names
3. **Analytics Not Working**: Verify Google Analytics tracking ID
4. **Waitlist Not Saving**: Check browser console for localStorage errors

### Development Server Issues
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
npm run dev
```

## 📄 License

This project is for educational and commercial use. Customize as needed for your skincare application.

---

**Built with ❤️ for the skincare community**

Need help? Create an issue or check the documentation above.