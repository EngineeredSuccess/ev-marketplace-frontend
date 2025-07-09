import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowLeft, Share2, Tag } from 'lucide-react'
import { getPostBySlug, getAllPosts, getRelatedPosts, formatDate } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'

// Force dynamic rendering to avoid serialization issues
export const dynamic = 'force-dynamic'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Artykuł nie znaleziony - IVI Market'
    }
  }

  return {
    title: post.seo.metaTitle || `${post.title} - IVI Market`,
    description: post.seo.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: [post.author],
      images: post.seo.ogImage ? [post.seo.ogImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.seo.ogImage ? [post.seo.ogImage] : undefined,
    }
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({
    slug: post.slug
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, 3)

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      {/* Navigation */}
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px' }}>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: 'white',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'opacity 0.2s'
            }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Powrót do bloga
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        <header style={{ marginBottom: '48px' }}>
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
            fontSize: '48px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '24px',
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
            gap: '24px',
            color: '#6b7280',
            marginBottom: '24px',
            fontSize: '15px'
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{
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
          </div>
        </header>

        {/* Article Content */}
        <div style={{
          maxWidth: 'none',
          fontSize: '18px',
          lineHeight: '1.7',
          color: '#374151'
        }}>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="blog-content"
          />
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
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                    (e.target as HTMLElement).style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.background = 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)';
                    (e.target as HTMLElement).style.color = '#10b981';
                  }}
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