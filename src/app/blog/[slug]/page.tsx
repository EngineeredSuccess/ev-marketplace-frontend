'use client'

import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Head from 'next/head'
import { Calendar, Clock, User, Share2, Tag } from 'lucide-react'
import { getPostBySlug, getAllPosts, getRelatedPosts, formatDate } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import BlogNavigation from '@/components/blog/BlogNavigation'
import HTMLBlogPost from '@/components/blog/HTMLBlogPost'
import { BlogPostStructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'

// Force dynamic rendering to avoid serialization issues
export const dynamic = 'force-dynamic'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Note: Metadata and static params generation moved to layout.tsx for client component compatibility

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [currentUrl, setCurrentUrl] = useState('')
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
    }
  }, [])
  
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, 3)

  const breadcrumbItems = [
    { name: 'Strona główna', url: 'https://ivimarket.pl' },
    { name: 'Blog', url: 'https://ivimarket.pl/blog' },
    { name: post.title, url: `https://ivimarket.pl/blog/${post.slug}` }
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <Head>
        <title>{post.seo.metaTitle || `${post.title} - IVI Market`}</title>
        <meta name="description" content={post.seo.metaDescription || post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        {post.seo.ogImage && <meta property="og:image" content={post.seo.ogImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.seo.ogImage && <meta name="twitter:image" content={post.seo.ogImage} />}
      </Head>
      <BlogPostStructuredData
        title={post.title}
        description={post.excerpt}
        author={post.author}
        publishedAt={post.publishedAt.toISOString()}
        modifiedAt={post.updatedAt?.toISOString()}
        image={post.seo.ogImage}
        url={`https://ivimarket.pl/blog/${post.slug}`}
        readingTime={post.readingTime}
        tags={post.tags}
      />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
      {/* Navigation */}
      <BlogNavigation 
        showBackButton={true}
        showSearchIcon={true}
        showShareIcon={true}
        title="Blog"
        onShareClick={() => {
          if (typeof window !== 'undefined' && navigator.share) {
            navigator.share({
              title: post.title,
              text: post.excerpt,
              url: currentUrl
            })
          } else if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(currentUrl)
          }
        }}
      />

      {/* Article Header */}
      <article style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 24px)'
      }}>
        <header style={{ marginBottom: 'clamp(32px, 6vw, 48px)' }}>
          {/* Category */}
          <div style={{ marginBottom: '16px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)'
            }}>
              <Tag style={{ width: '16px', height: '16px', marginRight: '4px' }} />
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: 'clamp(16px, 4vw, 24px)',
            lineHeight: '1.1',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}>
            {post.title}
          </h1>

          {/* Meta Information */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 'clamp(16px, 3vw, 24px)',
            color: '#6b7280',
            marginBottom: 'clamp(16px, 4vw, 24px)',
            fontSize: 'clamp(14px, 2.5vw, 15px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <User style={{ width: '20px', height: '20px', marginRight: '8px', color: '#10b981' }} />
              <span style={{ fontWeight: '500' }}>{post.author}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Calendar style={{ width: '20px', height: '20px', marginRight: '8px', color: '#10b981' }} />
              <time dateTime={post.publishedAt.toISOString()}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Clock style={{ width: '20px', height: '20px', marginRight: '8px', color: '#10b981' }} />
              <span style={{ fontWeight: '600', color: '#10b981' }}>{post.readingTime} min czytania</span>
            </div>
          </div>

          {/* Share Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined' && navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: currentUrl
                  }).catch(console.error);
                } else if (typeof window !== 'undefined') {
                  navigator.clipboard.writeText(currentUrl).then(() => {
                    // Show temporary notification
                    const notification = document.createElement('div');
                    notification.textContent = 'Link skopiowany do schowka!';
                    notification.style.cssText = `
                      position: fixed;
                      top: 20px;
                      right: 20px;
                      background: #10b981;
                      color: white;
                      padding: 12px 24px;
                      border-radius: 8px;
                      font-size: 14px;
                      font-weight: 600;
                      z-index: 1000;
                      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                      animation: slideIn 0.3s ease-out;
                    `;
                    document.body.appendChild(notification);
                    setTimeout(() => {
                      notification.remove();
                    }, 3000);
                  });
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                border: '2px solid #10b981',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#10b981',
                background: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(16, 185, 129, 0.1)'
              }}
              className="share-button">
              <Share2 style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              Udostępnij
            </button>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              fontSize: '12px',
              color: '#6b7280'
            }}>
              <span>Podziel się:</span>
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  background: '#1DA1F2',
                  color: 'white',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                className="social-share-button"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  background: '#1877F2',
                  color: 'white',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                className="social-share-button"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  background: '#0077B5',
                  color: 'white',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                className="social-share-button"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div style={{
          maxWidth: 'none',
          fontSize: '18px',
          lineHeight: '1.7',
          color: '#374151'
        }}>
          {/* Use HTMLBlogPost for HTML content, fallback to regular content for markdown */}
          {post.contentType === 'html' ? (
            <HTMLBlogPost post={post} />
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="blog-content"
            />
          )}
          <style dangerouslySetInnerHTML={{
            __html: `
              .blog-content h1 {
                font-size: 36px;
                font-weight: 700;
                margin-top: 48px;
                margin-bottom: 24px;
                color: #1f2937;
              }
              .blog-content h2 {
                font-size: 28px;
                font-weight: 700;
                margin-top: 40px;
                margin-bottom: 16px;
                color: #1f2937;
              }
              .blog-content h3 {
                font-size: 22px;
                font-weight: 600;
                margin-top: 32px;
                margin-bottom: 12px;
                color: #1f2937;
              }
              .blog-content p {
                margin-bottom: 24px;
                line-height: 1.7;
                font-size: 18px;
                color: #374151;
              }
              .blog-content ul {
                margin-bottom: 24px;
                padding-left: 24px;
              }
              .blog-content ol {
                margin-bottom: 24px;
                padding-left: 24px;
              }
              .blog-content li {
                margin-bottom: 8px;
                font-size: 18px;
                color: #374151;
              }
              .blog-content blockquote {
                border-left: 4px solid #10b981;
                padding: 16px 24px;
                font-style: italic;
                margin: 24px 0;
                background: #f0f9ff;
                border-radius: 8px;
                font-size: 18px;
                color: #374151;
              }
              .blog-content code {
                background: #f3f4f6;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 14px;
                color: #1f2937;
                font-family: 'Courier New', monospace;
              }
              .blog-content pre {
                background: #1f2937;
                color: white;
                padding: 16px;
                border-radius: 8px;
                overflow-x: auto;
                margin: 24px 0;
                font-family: 'Courier New', monospace;
              }
              .blog-content pre code {
                background: transparent;
                padding: 0;
                color: white;
              }
              .blog-content strong {
                font-weight: 600;
                color: #1f2937;
              }
              .blog-content em {
                font-style: italic;
              }
              .blog-content a {
                color: #10b981;
                text-decoration: underline;
              }
              .blog-content a:hover {
                color: #059669;
              }
            `
          }} />
          <style dangerouslySetInnerHTML={{
            __html: `
              .share-button:hover {
                background: #10b981 !important;
                color: white !important;
              }
              .tag-hover:hover {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
                color: white !important;
              }
              .read-more-button:hover {
                transform: translateY(-2px) !important;
                box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4) !important;
              }
            `
          }} />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '2px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>Tagi:</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {post.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    fontSize: '14px',
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                    color: '#10b981',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    border: '1px solid #10b981',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                  className="tag-hover"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '2px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 8px rgba(16, 185, 129, 0.2)'
            }}>
              <User style={{ width: '32px', height: '32px', color: 'white' }} />
            </div>
            <div style={{ marginLeft: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>{post.author}</h3>
              <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.5' }}>
                Ekspert w dziedzinie pojazdów elektrycznych i zrównoważonej mobilności.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          padding: '64px 0',
          marginTop: '48px'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '32px',
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Powiązane artykuły
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '32px'
            }}>
              {relatedPosts.map(relatedPost => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}