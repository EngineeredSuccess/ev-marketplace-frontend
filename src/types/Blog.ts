export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  contentType?: 'markdown' | 'html'
  htmlFile?: string
  author: string
  publishedAt: Date
  updatedAt?: Date
  category: string
  tags: string[]
  readingTime: number
  featured: boolean
  seo: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: string
  }
}

export interface BlogCategory {
  slug: string
  name: string
  description: string
  postCount: number
}

export interface BlogListingProps {
  posts: BlogPost[]
  categories: BlogCategory[]
  currentCategory?: string
  searchQuery?: string
}

export interface BlogPostProps {
  post: BlogPost
  relatedPosts?: BlogPost[]
}

export interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export interface BlogSEOProps {
  post?: BlogPost
  title?: string
  description?: string
  ogImage?: string
}