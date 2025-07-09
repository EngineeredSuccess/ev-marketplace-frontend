'use client'

import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { getAllPosts, getFeaturedPosts, searchPosts, getAllCategories } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog IVI Market
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Najnowsze informacje o pojazdach elektrycznych, technologiach i rynku EV w Polsce
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Szukaj artykułów..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && selectedCategory === 'Wszystkie' && !searchQuery && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Polecane artykuły</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {searchQuery ? `Wyniki wyszukiwania dla "${searchQuery}"` : 'Wszystkie artykuły'}
            </h2>
            <span className="text-gray-600">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'artykuł' : 'artykułów'}
            </span>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
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