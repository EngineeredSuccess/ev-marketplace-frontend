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
    <article className="blog-card" style={{
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Featured Badge */}
      {post.featured && (
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          fontSize: '11px',
          fontWeight: '700',
          padding: '6px 12px',
          borderRadius: '16px',
          zIndex: 10,
          boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
          display: 'flex',
          alignItems: 'center'
        }}>
          ⭐ POLECANE
        </div>
      )}

      {/* Category */}
      <div style={{ marginBottom: '16px', marginTop: post.featured ? '32px' : '0' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '6px 12px',
          borderRadius: '16px',
          fontSize: '12px',
          fontWeight: '600',
          background: '#f0f9ff',
          color: '#10b981',
          border: '1px solid #10b981'
        }}>
          <Tag style={{ width: '12px', height: '12px', marginRight: '4px' }} />
          📚 {post.category}
        </span>
      </div>

      {/* Title */}
      <h2 style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '12px',
        lineHeight: '1.3',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        <Link
          href={`/blog/${post.slug}`}
          style={{
            color: '#1f2937',
            textDecoration: 'none',
            transition: 'color 0.2s'
          }}
          className="blog-title-link"
        >
          {post.title}
        </Link>
      </h2>

      {/* Excerpt */}
      <p style={{
        color: '#6b7280',
        marginBottom: '16px',
        lineHeight: '1.5',
        fontSize: '14px',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {post.excerpt}
      </p>

      {/* Meta Information */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '16px',
        fontSize: '12px',
        color: '#6b7280',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', fontWeight: '500' }}>
          <User style={{ width: '14px', height: '14px', marginRight: '4px', color: '#10b981' }} />
          {post.author}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Calendar style={{ width: '14px', height: '14px', marginRight: '4px', color: '#10b981' }} />
          <time dateTime={post.publishedAt.toISOString()}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontWeight: '600', color: '#10b981' }}>
          <Clock style={{ width: '14px', height: '14px', marginRight: '4px' }} />
          {post.readingTime} min
        </div>
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '20px'
        }}>
          {post.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '4px 8px',
                fontSize: '10px',
                fontWeight: '500',
                background: '#f0f9ff',
                color: '#10b981',
                borderRadius: '12px',
                border: '1px solid #10b981'
              }}
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span style={{
              fontSize: '10px',
              color: '#6b7280',
              fontWeight: '500',
              padding: '4px 8px'
            }}>
              +{post.tags.length - 3} więcej
            </span>
          )}
        </div>
      )}

      {/* Read More Button */}
      <Link
        href={`/blog/${post.slug}`}
        className="blog-read-more"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '10px 20px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '600',
          borderRadius: '8px',
          transition: 'all 0.2s',
          boxShadow: '0 2px 8px rgba(16, 185, 129, 0.2)'
        }}
      >
        Czytaj artykuł
        <svg style={{ width: '14px', height: '14px', marginLeft: '6px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .blog-card:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 12px 28px rgba(16, 185, 129, 0.15) !important;
            border-color: #10b981 !important;
          }
          .blog-title-link:hover {
            color: #10b981 !important;
          }
          .blog-read-more:hover {
            transform: translateY(-1px) !important;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3) !important;
          }
        `
      }} />
    </article>
  )
}

// DEFAULT EXPORT - This fixes the import error
export default BlogCard
