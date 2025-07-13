import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, Tag } from 'lucide-react'
import { BlogPost } from '@/types/Blog'
import { formatDate } from '@/lib/blog'
import { colors, typography, spacing, borderRadius, shadows } from '@/styles/design-system'
import { Card } from '@/components/ui'

interface BlogCardProps {
  post: BlogPost
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Card className="blog-card" padding="lg" style={{
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '400px' // Ensure minimum height for consistency
    }}>
      
      {/* Featured Badge */}
      {post.featured && (
        <div style={{
          position: 'absolute',
          top: spacing[4],
          left: spacing[4],
          background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%)`,
          color: colors.text.inverse,
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.bold,
          padding: `${spacing[2]} ${spacing[3]}`,
          borderRadius: borderRadius.full,
          zIndex: 10,
          boxShadow: `0 2px 8px ${colors.primary[500]}30`,
          display: 'flex',
          alignItems: 'center'
        }}>
          ⭐ POLECANE
        </div>
      )}

      {/* Category */}
      <div style={{ 
        marginBottom: spacing[4], 
        marginTop: post.featured ? spacing[8] : '0',
        flex: '0 0 auto'
      }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: `${spacing[2]} ${spacing[3]}`,
          borderRadius: borderRadius.full,
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.semibold,
          background: colors.primary[50],
          color: colors.primary[600],
          border: `1px solid ${colors.primary[300]}`
        }}>
          <Tag style={{ width: '12px', height: '12px', marginRight: spacing[1] }} />
          📚 {post.category}
        </span>
      </div>

      {/* Title */}
      <h2 style={{
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing[3],
        lineHeight: typography.lineHeight.tight,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        flex: '0 0 auto',
        minHeight: '2.5em' // Ensure consistent title height
      }}>
        <Link
          href={`/blog/${post.slug}`}
          style={{
            color: colors.text.primary,
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
        color: colors.text.secondary,
        marginBottom: spacing[4],
        lineHeight: typography.lineHeight.normal,
        fontSize: typography.fontSize.sm,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        flex: '1 1 auto',
        minHeight: '4.5em' // Ensure consistent excerpt height
      }}>
        {post.excerpt}
      </p>

      {/* Meta Information */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: spacing[3],
        fontSize: typography.fontSize.xs,
        color: colors.text.secondary,
        marginBottom: spacing[4],
        flex: '0 0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', fontWeight: typography.fontWeight.medium }}>
          <User style={{ width: '14px', height: '14px', marginRight: spacing[1], color: colors.primary[500] }} />
          {post.author}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Calendar style={{ width: '14px', height: '14px', marginRight: spacing[1], color: colors.primary[500] }} />
          <time dateTime={post.publishedAt.toISOString()}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontWeight: typography.fontWeight.semibold, color: colors.primary[500] }}>
          <Clock style={{ width: '14px', height: '14px', marginRight: spacing[1] }} />
          {post.readingTime} min
        </div>
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: spacing[2],
          marginBottom: spacing[5],
          flex: '0 0 auto',
          minHeight: '2em' // Ensure consistent tag area height
        }}>
          {post.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: `${spacing[1]} ${spacing[2]}`,
                fontSize: '10px',
                fontWeight: typography.fontWeight.medium,
                background: colors.primary[50],
                color: colors.primary[600],
                borderRadius: borderRadius.lg,
                border: `1px solid ${colors.primary[300]}`
              }}
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span style={{
              fontSize: '10px',
              color: colors.text.secondary,
              fontWeight: typography.fontWeight.medium,
              padding: `${spacing[1]} ${spacing[2]}`
            }}>
              +{post.tags.length - 3} więcej
            </span>
          )}
        </div>
      )}

      {/* Read More Button */}
      <div style={{ marginTop: 'auto', flex: '0 0 auto' }}>
        <Link
          href={`/blog/${post.slug}`}
          className="blog-read-more"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: `${spacing[3]} ${spacing[5]}`,
            background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%)`,
            color: colors.text.inverse,
            textDecoration: 'none',
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.semibold,
            borderRadius: borderRadius.lg,
            transition: 'all 0.2s',
            boxShadow: `0 2px 8px ${colors.primary[500]}33`,
            width: '100%',
            justifyContent: 'center'
          }}
        >
          Czytaj artykuł
          <svg style={{ width: '14px', height: '14px', marginLeft: spacing[2] }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .blog-title-link:hover {
            color: ${colors.primary[500]} !important;
          }
          .blog-read-more:hover {
            transform: translateY(-1px) !important;
            box-shadow: 0 4px 12px ${colors.primary[500]}4D !important;
            background: linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%) !important;
          }
          
          @media (max-width: 768px) {
            .blog-card {
              padding: ${spacing[5]} !important;
              min-height: 350px !important;
            }
            
            .blog-card h2 {
              font-size: ${typography.fontSize.lg} !important;
            }
            
            .blog-card p {
              font-size: ${typography.fontSize.xs} !important;
            }
          }
          
          @media (max-width: 480px) {
            .blog-card {
              padding: ${spacing[4]} !important;
              min-height: 320px !important;
            }
          }
        `
      }} />
    </Card>
  )
}

// DEFAULT EXPORT - This fixes the import error
export default BlogCard