import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost } from '@/types/Blog'

const postsDirectory = path.join(process.cwd(), 'src/posts')

// Get all blog posts
export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      return getPostBySlug(slug)
    })
    .filter(post => post !== null) as BlogPost[]

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
}

// Get a single blog post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Calculate reading time (average 200 words per minute)
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)

    return {
      slug,
      title: data.title || slug.replace(/-/g, ' '),
      excerpt: data.excerpt || content.substring(0, 160) + '...',
      content,
      author: data.author || 'IVI Market',
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
      category: data.category || 'Ogólne',
      tags: data.tags || [],
      readingTime,
      featured: data.featured || false,
      seo: {
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription || data.excerpt,
        ogImage: data.ogImage
      }
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// Get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  )
}

// Get featured posts
export function getFeaturedPosts(): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.featured)
}

// Search posts
export function searchPosts(query: string): BlogPost[] {
  const allPosts = getAllPosts()
  const searchTerm = query.toLowerCase()
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    post.category.toLowerCase().includes(searchTerm)
  )
}

// Get related posts
export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const allPosts = getAllPosts()
  
  // Filter out current post and find related by category and tags
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      let score = 0
      
      // Same category gets higher score
      if (post.category === currentPost.category) {
        score += 3
      }
      
      // Shared tags get points
      const sharedTags = post.tags.filter(tag => 
        currentPost.tags.includes(tag)
      )
      score += sharedTags.length
      
      return { post, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post)
  
  return relatedPosts
}

// Get all categories - FIXED VERSION
export function getAllCategories(): string[] {
  const allPosts = getAllPosts()
  const categoriesSet = new Set<string>()
  
  // Add each category to the set
  allPosts.forEach(post => {
    categoriesSet.add(post.category)
  })
  
  // Convert set to array and sort
  return Array.from(categoriesSet).sort()
}

// Format date for display
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9ąćęłńóśźż\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}