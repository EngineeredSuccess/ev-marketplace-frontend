import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, Tag } from 'lucide-react'
import { BlogPost } from '@/types/Blog'
import { formatDate } from '@/lib/blog'

interface BlogCardProps {
  post: BlogPost
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Featured Badge */}
      {post.featured && (
        <div className="bg-green-600 text-white text-xs font-semibold px-3 py-1 absolute top-4 left-4 rounded-full z-10">
          Polecane
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Tag className="w-3 h-3 mr-1" />
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link 
            href={`/blog/${post.slug}`}
            className="hover:text-green-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <time dateTime={post.publishedAt.toISOString()}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{post.readingTime} min</span>
          </div>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{post.tags.length - 3} więcej
              </span>
            )}
          </div>
        )}

        {/* Read More Link */}
        <Link 
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
        >
          Czytaj więcej
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}

// DEFAULT EXPORT - This fixes the import error
export default BlogCard
