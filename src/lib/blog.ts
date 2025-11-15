import { BlogPost } from '@/types/Blog'
import { processHTMLFile } from '@/utils/markdown'

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    // Wrap in paragraphs
    .replace(/^(.+)$/gm, '<p>$1</p>')
    // Clean up multiple paragraph tags
    .replace(/<p><\/p>/g, '')
    .replace(/<p><h([1-6])>/g, '<h$1>')
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
    .replace(/<p><strong>/g, '<p><strong>')
    .replace(/<\/strong><\/p>/g, '</strong></p>')
    // Tables
    .replace(/\|(.+)\|/g, (match, content) => {
      const cells = content.split('|').map((cell: string) => cell.trim())
      return '<tr>' + cells.map((cell: string) => `<td>${cell}</td>`).join('') + '</tr>'
    })
    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr>')
}

// Mock blog posts data with updated content from markdown files
const mockBlogPostsData: Array<Omit<BlogPost, 'publishedAt' | 'updatedAt'> & {
  publishedAt: string;
  updatedAt?: string;
}> = [
  {
    slug: 'renault-5-e-tech-legenda-wraca-jako-stylowy-samochod-ev',
    title: 'Renault 5 E-Tech: Legenda wraca jako stylowy samochód EV',
    excerpt: 'Poznaj nowe Renault 5 E-Tech – niedrogi, stylowy samochód elektryczny z zasięgiem do 400 km, idealny do polskich miast i z możliwym wsparciem z programu „Mój Elektryk”.',
    content: '',
    contentType: 'html' as const,
    htmlFile: '/src/posts/renault-5-e-tech-legenda-wraca-jako-stylowy-samochod-ev.html',
    author: 'iViMarket',
    publishedAt: '2025-11-15',
    updatedAt: '2025-11-15',
    category: 'Samochody elektryczne',
    tags: ['Renault 5 EV', 'Renault 5 E-Tech', 'samochody elektryczne', 'tani EV', 'auto elektryczne do miasta', 'zasięg EV', 'ładowanie samochodu', 'Mój Elektryk', 'nowe Renault'],
    readingTime: 4,
    featured: true,
    seo: {
      metaTitle: 'Renault 5 E-Tech: Legenda wraca jako stylowy samochód elektryczny',
      metaDescription: 'Poznaj nowe Renault 5 E-Tech: cena, zasięg do 400 km, retro design i potencjał z programu „Mój Elektryk”. Sprawdź, czy to idealny elektryk do polskiego miasta.',
      ogImage: 'https://www.ivimarket.pl/og-images/renault-5-e-tech.jpg'
    }
  },
  {
    slug: 'stacje-ladowania-w-polsce-2025',
    title: 'Stacje ładowania w Polsce 2025 – Kompletny przewodnik',
    excerpt: 'Mapa stacji ładowania w Polsce, koszty, aplikacje i praktyczne porady. Ponad 3000 punktów ładowania, sieci Ionity, Orlen, GreenWay. Planowanie tras EV.',
    content: '',
    contentType: 'html' as const,
    htmlFile: '/src/posts/charging-stations-poland.html',
    author: 'iViMarket',
    publishedAt: '2024-01-05',
    category: 'Infrastruktura',
    tags: ['stacje ładowania', 'infrastruktura', 'Polska', 'mapa', 'koszty', '2025'],
    readingTime: 20,
    featured: true,
    seo: {
      metaTitle: 'Stacje ładowania w Polsce 2025 – Kompletny przewodnik',
      metaDescription: 'Mapa stacji ładowania w Polsce, koszty, aplikacje i praktyczne porady. Ponad 3000 punktów ładowania, sieci Ionity, Orlen, GreenWay.',
      ogImage: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80'
    }
  },
  {
    slug: 'jak-ladowac-pojazd-elektryczny-w-domu',
    title: 'Jak ładować pojazd elektryczny w domu? – Kompletny poradnik 2025',
    excerpt: 'Praktyczny poradnik instalacji wallboxa i optymalizacji kosztów ładowania w domu. Wallbox 11 kW, oszczędności do 4000 zł rocznie, najlepsze modele 2025.',
    content: '',
    contentType: 'html' as const,
    htmlFile: '/src/posts/home-charging-guide.html',
    author: 'iViMarket',
    publishedAt: '2024-01-10',
    category: 'Poradniki',
    tags: ['ładowanie', 'wallbox', 'dom', 'poradnik', 'oszczędności', 'instalacja', '2025'],
    readingTime: 18,
    featured: false,
    seo: {
      metaTitle: 'Jak ładować pojazd elektryczny w domu? – Kompletny poradnik 2025',
      metaDescription: 'Praktyczny poradnik instalacji wallboxa i optymalizacji kosztów ładowania w domu. Wallbox 11 kW, oszczędności do 4000 zł rocznie.',
      ogImage: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80'
    }
  },
  {
    slug: 'tesla-model-3-test-2024',
    title: 'Tesla Model 3 – Pełny test 2024',
    excerpt: 'Sprawdziliśmy najnowszą Teslę Model 3 w polskich warunkach. Zasięg 420 km, zaawansowana technologia i doskonały komfort jazdy. Czy to najlepszy elektryczny sedan?',
    content: '',
    contentType: 'html' as const,
    htmlFile: '/src/posts/tesla-model-3-test-2024.html',
    author: 'iViMarket',
    publishedAt: '2024-01-15',
    category: 'Testy samochodów',
    tags: ['Tesla', 'Model 3', 'test', 'elektryczny', 'sedan', 'recenzja', '2024'],
    readingTime: 15,
    featured: true,
    seo: {
      metaTitle: 'Tesla Model 3 – Pełny test 2024',
      metaDescription: 'Sprawdziliśmy najnowszą Teslę Model 3 w polskich warunkach. Zasięg 420 km, zaawansowana technologia i doskonały komfort jazdy.',
      ogImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80'
    }
  },
  {
    slug: 'geely-ex5-elektryczny-suv-polska-premiera-2025',
    title: 'Geely EX5 – premiera w Polsce 2025',
    excerpt: 'Geely EX5 już w Q3 2025 w Polsce – 430 km zasięgu WLTP, od 129 900 zł z NaszEauto. Wersje Pro/Max, 5 gwiazdek Euro NCAP, specyfikacja techniczna.',
    content: '', // Will be loaded from HTML file
    contentType: 'html' as const, // Indicate this is HTML content
    htmlFile: '/src/posts/geely-ex5-elektryczny-suv-polska-premiera-2025.html',
    author: 'iViMarket',
    publishedAt: '2025-01-11',
    updatedAt: '2025-01-11',
    category: 'Samochody elektryczne',
    tags: ['Geely', 'EX5', 'SUV', 'elektryczny', 'nowość', 'Jameel Motors', '2025'],
    readingTime: 12,
    featured: true,
    seo: {
      metaTitle: 'Geely EX5 – polska premiera 2025, specyfikacja i cena | IVI Market',
      metaDescription: 'Geely EX5 już w Q3 2025 w Polsce – 430 km zasięgu WLTP, od 129 900 zł z NaszEauto. Wersje Pro/Max, 5 gwiazdek Euro NCAP, specyfikacja techniczna.',
      ogImage: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    }
  },
  {
    slug: 'byd-dolphin-surf-elektryczny-maluch',
    title: 'Czy BYD Dolphin Surf to nowy „Maluch"? Elektryczny kompakt, który może zmienić rynek EV w Polsce', // CHANGED: SUV → kompakt
    excerpt: 'Analiza, czy BYD Dolphin Surf – przystępny cenowo elektryk – może odegrać dla elektromobilności podobną rolę jak Fiat 126p w historii polskiej motoryzacji.',
    content: '',
    contentType: 'html' as const,
    htmlFile: '/src/posts/byd-dolphin-surf-elektryczny-maluch.html',
    author: 'iViMarket',
    publishedAt: '2025-01-12',
    updatedAt: '2025-01-12',
    category: 'Samochody elektryczne',
    tags: ['BYD Dolphin Surf', 'samochody elektryczne', 'EV w Polsce', 'elektryczny kompakt', 'budżetowe EV'], // CHANGED: elektryczny SUV → elektryczny kompakt
    readingTime: 10,
    featured: true,
    seo: {
      metaTitle: 'BYD Dolphin Surf – Czy to nowy Maluch ery elektromobilności?',
      metaDescription: 'Czy BYD Dolphin Surf może zostać ikoną elektryfikacji w Polsce? Sprawdź, jak ten przystępny kompakt zmienia zasady gry w świecie samochodów elektrycznych.', // SHOULD BE CHANGED: SUV → kompakt
      ogImage: 'https://agymzuliolgopwejswta.supabase.co/storage/v1/object/sign/fotkiblog/37DFDE05-CEC6-4098-8F04-3562A7084B24.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjRiM2IxNy04ZTc2LTQ4YjAtYTRiMi00ODE4OTJjZWM2OTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3RraWJsb2cvMzdERkRFMDUtQ0VDNi00MDk4LThGMDQtMzU2MkE3MDg0QjI0LnBuZyIsImlhdCI6MTc1MjMyNjM2OCwiZXhwIjoyMDY3Njg2MzY4fQ.IGdmN8nwmAdaFWbTylSKinKn0F-6nHPUGRxxU-bws_8'
  }
}
]

// Convert string dates to Date objects and create BlogPost array
const mockBlogPosts: BlogPost[] = mockBlogPostsData.map(post => ({
  ...post,
  publishedAt: new Date(post.publishedAt),
  updatedAt: post.updatedAt ? new Date(post.updatedAt) : undefined
}))

// Client-side functions that don't use Node.js fs
export function getAllPosts(): BlogPost[] {
  return mockBlogPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | null {
  const post = mockBlogPosts.find(post => post.slug === slug);
  
  if (!post) return null;
  
  // If it's an HTML post and content is empty, return the post as-is
  // The HTMLBlogPost component will handle the content rendering
  if (post.contentType === 'html' && !post.content) {
    return {
      ...post,
      content: '' // Empty content - HTMLBlogPost component will handle rendering
    };
  }
  
  return post;
}

export function getFeaturedPosts(): BlogPost[] {
  return mockBlogPosts.filter(post => post.featured)
}

export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase()
  return mockBlogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export function getPostsByCategory(category: string): BlogPost[] {
  return mockBlogPosts.filter(post => post.category === category)
}

export function getAllCategories(): string[] {
  const categoriesSet = new Set<string>()
  mockBlogPosts.forEach(post => {
    categoriesSet.add(post.category)
  })
  return Array.from(categoriesSet).sort()
}

export function getAllTags(): string[] {
  const tagsSet = new Set<string>()
  mockBlogPosts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag))
  })
  return Array.from(tagsSet).sort()
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  const relatedPosts = mockBlogPosts
    .filter(post => post.slug !== currentSlug)
    .filter(post => 
      post.category === currentPost.category ||
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit)

  return relatedPosts
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}