'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, ArrowLeft } from 'lucide-react'
import { getAllPosts, getFeaturedPosts, searchPosts, getAllCategories } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import BlogNavigation from '@/components/blog/BlogNavigation'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie')
  
  const allPosts = getAllPosts()
  const featuredPosts = getFeaturedPosts()
  const categories = ['Wszystkie', ...getAllCategories()]
  
  // Filter posts based on search and category
  const filteredPosts = React.useMemo(() => {
    let posts = searchQuery ? searchPosts(searchQuery) : allPosts
    
    if (selectedCategory !== 'Wszystkie') {
      posts = posts.filter(post => post.category === selectedCategory)
    }
    
    return posts
  }, [searchQuery, selectedCategory, allPosts])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Navigation */}
      <BlogNavigation 
        showBackButton={false}
        showSearchIcon={true}
        showShareIcon={false}
        title="Blog"
        onSearchClick={() => {
          // Focus on search input
          const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
          }
        }}
      />

      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        padding: 'clamp(30px, 8vw, 60px) 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontWeight: '800',
            marginBottom: '24px',
            margin: '0 0 24px 0',
            lineHeight: '1.2'
          }}>
            Blog IVI Market
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 3vw, 20px)',
            marginBottom: '0',
            maxWidth: '600px',
            margin: '0 auto',
            opacity: '0.9',
            lineHeight: '1.5'
          }}>
            Najnowsze informacje o pojazdach elektrycznych, technologiach i rynku EV w Polsce
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '24px',
          borderRadius: '20px',
          marginBottom: '32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                height: '16px',
                width: '16px',
                color: '#9ca3af'
              }} />
              <input
                type="text"
                placeholder="Szukaj artykułów..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '40px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none',
                  background: 'white'
                }}
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '200px',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && selectedCategory === 'Wszystkie' && !searchQuery && (
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: '40px',
              color: '#1f2937'
            }}>
              Polecane artykuły
            </h2>
            
            {/* Dynamic Layout for Featured Posts */}
            {featuredPosts.length >= 3 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
                marginBottom: '32px'
              }}>
                {/* Main Featured Article - takes full width on mobile */}
                <div style={{ 
                  gridColumn: 'span 2',
                  minHeight: '300px'
                }}>
                  <BlogCard post={featuredPosts[0]} />
                </div>

                {/* Secondary Featured Articles - stack on mobile */}
                {featuredPosts.slice(1, 3).map(post => (
                  <div key={post.slug} style={{ 
                    minHeight: '200px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px'
              }}>
                {featuredPosts.map(post => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* All Posts */}
        <section>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <h2 style={{
              fontSize: 'clamp(20px, 4vw, 28px)',
              fontWeight: '800',
              color: '#1f2937',
              margin: 0
            }}>
              {searchQuery ? `Wyniki wyszukiwania dla "${searchQuery}"` : 'Wszystkie artykuły'}
            </h2>
            <span style={{
              color: '#6b7280',
              fontSize: '14px',
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '6px 12px',
              borderRadius: '20px',
              fontWeight: '600',
              whiteSpace: 'nowrap'
            }}>
              {filteredPosts.length} {filteredPosts.length === 1 ? 'artykuł' : 'artykułów'}
            </span>
          </div>

          {filteredPosts.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {filteredPosts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              <p style={{
                color: '#6b7280',
                fontSize: '18px',
                margin: '0'
              }}>
                {searchQuery
                  ? 'Nie znaleziono artykułów pasujących do wyszukiwania.'
                  : 'Brak artykułów w tej kategorii.'
                }
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}