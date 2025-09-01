import React, { useState } from 'react';
import { ChevronRight, Clock, User, Tag } from 'lucide-react';
import { blogPosts, getBlogsByAudience, BlogPost } from '../data/blogData';
import { trackBlogClick } from '../utils/analytics';

interface BlogSectionProps {
  onOpenWaitlist: () => void;
  onBlogClick: (blogId: number) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ onOpenWaitlist, onBlogClick }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'women' | 'men' | 'children'>('all');

  const filterOptions = [
    { key: 'all' as const, label: 'All Articles', count: blogPosts.length },
    { key: 'women' as const, label: "Women's Skincare", count: getBlogsByAudience('women').length },
    { key: 'men' as const, label: "Men's Skincare", count: getBlogsByAudience('men').length },
    { key: 'children' as const, label: "Children's Care", count: getBlogsByAudience('children').length },
  ];

  const getFilteredBlogs = () => {
    if (activeFilter === 'all') return blogPosts;
    return getBlogsByAudience(activeFilter);
  };

  const handleBlogClick = (blog: BlogPost) => {
    trackBlogClick(blog.id, blog.title, blog.category, blog.targetAudience);
    onBlogClick(blog.id);
  };

  const filteredBlogs = getFilteredBlogs();
  const featuredBlogs = filteredBlogs.filter(blog => blog.featured);
  const regularBlogs = filteredBlogs.filter(blog => !blog.featured);

  return (
    <section id="tips" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-amber-100 to-rose-100 px-6 py-2 rounded-full mb-6">
            <span className="text-amber-800 font-semibold text-sm tracking-wide">EXPERT INSIGHTS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Skincare Insights & Tips
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover expert advice, scientific insights, and practical tips to transform your skincare journey for every member of your family
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setActiveFilter(option.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeFilter === option.key
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-amber-300'
              }`}
            >
              {option.label}
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeFilter === option.key 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {option.count}
              </span>
            </button>
          ))}
        </div>

        {/* Featured Articles */}
        {featuredBlogs.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <span className="text-amber-500">⭐</span>
              Featured Articles
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
                  onClick={() => handleBlogClick(blog)}
                >
                  <div className="relative h-64">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                        blog.targetAudience === 'women' ? 'bg-pink-500/90 text-white' :
                        blog.targetAudience === 'men' ? 'bg-blue-500/90 text-white' :
                        'bg-green-500/90 text-white'
                      }`}>
                        {blog.category}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-amber-500/90 text-white px-2 py-1 rounded-full text-xs font-bold">
                        FEATURED
                      </span>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-4 text-sm mb-3">
                        <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full font-medium">
                          <User size={14} />
                          {blog.author}
                        </span>
                        <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full font-medium">
                          <Clock size={14} />
                          {blog.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-amber-300 transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-200 text-sm leading-relaxed line-clamp-2">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        {regularBlogs.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              All Articles
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {regularBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
                  onClick={() => handleBlogClick(blog)}
                >
                  <div className="flex flex-col lg:flex-row h-full">
                    <div className="lg:w-2/5 relative">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-48 lg:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                          blog.targetAudience === 'women' ? 'bg-pink-500/90 text-white' :
                          blog.targetAudience === 'men' ? 'bg-blue-500/90 text-white' :
                          'bg-green-500/90 text-white'
                        }`}>
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="lg:w-3/5 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-sm mb-4">
                          <span className="flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-semibold">
                            <User size={14} />
                            {blog.author}
                          </span>
                          <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                            <Clock size={14} />
                            {blog.readTime}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
                          {blog.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                          {blog.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              <Tag size={10} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-amber-600 font-medium text-sm group-hover:text-amber-700 transition-colors duration-300">
                          Read More
                        </span>
                        <ChevronRight 
                          size={16} 
                          className="text-amber-600 group-hover:text-amber-700 group-hover:translate-x-1 transition-all duration-300" 
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-amber-50 to-rose-50 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Want Personalized Skincare Advice?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Join our waitlist to be the first to experience AI-powered skincare recommendations tailored specifically for your skin type and concerns.
            </p>
            <button 
              onClick={onOpenWaitlist}
              className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Join Waitlist Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;