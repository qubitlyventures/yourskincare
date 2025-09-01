import React from 'react';
import { ArrowLeft, Clock, User, Tag, Share2 } from 'lucide-react';
import { BlogPost, getRelatedBlogs } from '../data/blogData';
import { trackBlogClick } from '../utils/analytics';

interface BlogDetailProps {
  blog: BlogPost;
  onBack: () => void;
}

// Helper function to render formatted blog content
const renderBlogContent = (content: string) => {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let currentParagraph: string[] = [];
  let currentList: string[] = [];
  let listType: 'ordered' | 'unordered' | null = null;
  let key = 0;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const paragraphText = currentParagraph.join(' ').trim();
      if (paragraphText) {
        elements.push(
          <p key={key++} className="text-gray-700 leading-relaxed mb-6">
            {paragraphText}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList.length > 0) {
      if (listType === 'ordered') {
        elements.push(
          <ol key={key++} className="ml-6 mb-6 space-y-2">
            {currentList.map((item, index) => (
              <li key={index} className="text-gray-700 leading-relaxed list-decimal">
                {item}
              </li>
            ))}
          </ol>
        );
      } else if (listType === 'unordered') {
        elements.push(
          <ul key={key++} className="ml-6 mb-6 space-y-2">
            {currentList.map((item, index) => (
              <li key={index} className="text-gray-700 leading-relaxed list-disc">
                {item}
              </li>
            ))}
          </ul>
        );
      }
      currentList = [];
      listType = null;
    }
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    
    if (!trimmedLine) {
      // Empty line - flush current content
      flushParagraph();
      flushList();
      return;
    }

    // Handle headings
    if (trimmedLine.startsWith('## ')) {
      flushParagraph();
      flushList();
      elements.push(
        <h2 key={key++} className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          {trimmedLine.substring(3)}
        </h2>
      );
    } else if (trimmedLine.startsWith('### ')) {
      flushParagraph();
      flushList();
      elements.push(
        <h3 key={key++} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          {trimmedLine.substring(4)}
        </h3>
      );
    } else if (trimmedLine.startsWith('#### ')) {
      flushParagraph();
      flushList();
      elements.push(
        <h4 key={key++} className="text-xl font-bold text-gray-900 mt-8 mb-3">
          {trimmedLine.substring(5)}
        </h4>
      );
    } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
      // Bold text as subheading
      flushParagraph();
      flushList();
      elements.push(
        <h4 key={key++} className="text-lg font-bold text-gray-900 mt-6 mb-3">
          {trimmedLine.substring(2, trimmedLine.length - 2)}
        </h4>
      );
    } else if (trimmedLine.startsWith('- ')) {
      // Unordered list item
      flushParagraph();
      if (listType !== 'unordered') {
        flushList();
        listType = 'unordered';
      }
      currentList.push(trimmedLine.substring(2));
    } else if (trimmedLine.match(/^\d+\.\s/)) {
      // Ordered list item
      flushParagraph();
      if (listType !== 'ordered') {
        flushList();
        listType = 'ordered';
      }
      currentList.push(trimmedLine.replace(/^\d+\.\s/, ''));
    } else {
      // Regular paragraph line
      flushList();
      currentParagraph.push(trimmedLine);
    }
  });

  // Flush any remaining content
  flushParagraph();
  flushList();

  return elements;
};

const BlogDetail: React.FC<BlogDetailProps> = ({ blog, onBack }) => {
  const relatedBlogs = getRelatedBlogs(blog.id);

  const handleRelatedBlogClick = (relatedBlog: BlogPost) => {
    trackBlogClick(relatedBlog.id, relatedBlog.title, relatedBlog.category, relatedBlog.targetAudience);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Full-width Hero Image */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Back button */}
        <div className="absolute top-24 left-4 sm:left-8 z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-full transition-all duration-200 shadow-lg backdrop-blur-sm"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Back to Articles</span>
          </button>
        </div>

        {/* Content overlay on image */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-4 sm:px-8 pb-12">
            <div className="max-w-4xl mx-auto">
              {/* Category and meta info */}
              <div className="flex items-center gap-4 text-sm text-white/90 mb-4">
                <span className={`px-3 py-1 rounded-full text-white font-medium ${
                  blog.targetAudience === 'women' ? 'bg-pink-500/80' :
                  blog.targetAudience === 'men' ? 'bg-blue-500/80' :
                  'bg-green-500/80'
                } backdrop-blur-sm`}>
                  {blog.category}
                </span>
                <span className="flex items-center gap-1 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Clock size={14} />
                  {blog.readTime}
                </span>
                <span className="flex items-center gap-1 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                  <User size={14} />
                  {blog.author}
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                {blog.title}
              </h1>
              
              {/* Excerpt */}
              <p className="text-xl text-white/90 leading-relaxed max-w-3xl drop-shadow-md">
                {blog.excerpt}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          {/* Render formatted blog content */}
          <div className="text-gray-700 leading-relaxed">
            {renderBlogContent(blog.content)}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors duration-200 cursor-pointer"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
          
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white px-6 py-3 rounded-xl hover:from-amber-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105"
          >
            <Share2 size={18} />
            Share Article
          </button>
        </div>
      </div>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <article
                  key={relatedBlog.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => handleRelatedBlogClick(relatedBlog)}
                >
                  <div className="h-48 relative">
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                        relatedBlog.targetAudience === 'women' ? 'bg-pink-500' :
                        relatedBlog.targetAudience === 'men' ? 'bg-blue-500' :
                        'bg-green-500'
                      }`}>
                        {relatedBlog.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {relatedBlog.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-4">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {relatedBlog.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {relatedBlog.author}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
