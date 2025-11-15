import { NextRequest, NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'

// Type definitions
interface BlogPostData {
  title: string
  slug: string
  excerpt: string
  content: string // Markdown content
  author: string
  category: string
  tags: string[]
  featured?: boolean
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: string
  }
}

interface PublishResponse {
  success: boolean
  message: string
  slug?: string
  error?: string
}

// Markdown to HTML converter (simple version)
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
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    // Wrap in paragraphs
    .replace(/^(.+)$/gm, '<p>$1</p>')
    // Clean up
    .replace(/<p><\/p>/g, '')
    .replace(/<p><h([1-6])>/g, '<h$1>')
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
}

// Generate HTML file content
function generateHtmlContent(title: string, content: string): string {
  const htmlContent = markdownToHtml(content)
  
  return `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body>
    ${htmlContent}
</body>
</html>`
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

async function upsertFile(
  octokit: any,
  {
    owner,
    repo,
    path,
    content,
    message,
    branch = 'main',
  }: {
    owner: string
    repo: string
    path: string
    content: string
    message: string
    branch?: string
  }
) {
  let sha: string | undefined

  try {
    const res = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    })

    if (!Array.isArray(res.data)) {
      sha = res.data.sha
    }
  } catch (error: any) {
    // jeśli 404, to plik nie istnieje – tworzymy bez sha
    if (error.status !== 404) {
      throw error
    }
  }

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message,
    content: Buffer.from(content).toString('base64'),
    branch,
    ...(sha ? { sha } : {}), // sha tylko gdy istnieje
  })
}

// Generate slug from title if not provided
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    // 1. Verify API Key
    const apiKey = request.headers.get('x-api-key')
    const validApiKey = process.env.BLOG_API_KEY
    
    if (!apiKey || !validApiKey || apiKey !== validApiKey) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid API Key' },
        { status: 401 }
      )
    }

    // 2. Parse request body
    const data: BlogPostData = await request.json()
    
    // 3. Validate required fields
    if (!data.title || !data.content || !data.category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, content, category' },
        { status: 400 }
      )
    }

    // 4. Generate slug if not provided
    const slug = data.slug || generateSlug(data.title)
    
    // 5. Calculate reading time
    const readingTime = calculateReadingTime(data.content)
    
    // 6. Generate HTML content
    const htmlContent = generateHtmlContent(data.title, data.content)
    
    // 7. Prepare blog post metadata
    const publishedAt = new Date().toISOString().split('T')[0]
    
    const blogPostEntry = `  {
    slug: '${slug}',
    title: '${data.title.replace(/'/g, "\\'")}',
    excerpt: '${data.excerpt.replace(/'/g, "\\'")}',
    content: '',
    contentType: 'html' as const,
    htmlFile: '/src/posts/${slug}.html',
    author: '${data.author || 'iViMarket'}',
    publishedAt: '${publishedAt}',
    updatedAt: '${publishedAt}',
    category: '${data.category}',
    tags: [${data.tags.map(tag => `'${tag}'`).join(', ')}],
    readingTime: ${readingTime},
    featured: ${data.featured || false},
    seo: {
      metaTitle: '${data.seo?.metaTitle || data.title}',
      metaDescription: '${data.seo?.metaDescription || data.excerpt}',
      ogImage: '${data.seo?.ogImage || 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}'
    }
  }`

    // 8. Initialize Octokit (GitHub API client)
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    })

    const owner = process.env.GITHUB_OWNER || 'EngineeredSuccess'
    const repo = process.env.GITHUB_REPO || 'ev-marketplace-frontend'
    const branch = 'main'

    // 9. Get current blog.ts file
    const blogTsPath = 'src/lib/blog.ts'
    let blogTsContent = ''
    let blogTsSha = ''
    
    try {
      const { data: fileData } = await octokit.repos.getContent({
        owner,
        repo,
        path: blogTsPath,
        ref: branch
      })
      
      if ('content' in fileData) {
        blogTsContent = Buffer.from(fileData.content, 'base64').toString('utf-8')
        blogTsSha = fileData.sha
      }
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch blog.ts from GitHub' },
        { status: 500 }
      )
    }

    // 10. Insert new blog post entry into blog.ts
    const insertMarker = 'const mockBlogPostsData: Array<Omit<BlogPost, \'publishedAt\' | \'updatedAt\'> & {'
    const insertPosition = blogTsContent.indexOf(insertMarker)
    
    if (insertPosition === -1) {
      return NextResponse.json(
        { success: false, error: 'Could not find insertion point in blog.ts' },
        { status: 500 }
      )
    }
    
    const arrayStart = blogTsContent.indexOf('[', insertPosition)
    const updatedBlogTs = 
      blogTsContent.slice(0, arrayStart + 1) + 
      '\n' + blogPostEntry + ',' +
      blogTsContent.slice(arrayStart + 1)

    // 11. Create/Update files on GitHub
    try {
      // Create HTML file
       await upsertFile(octokit, {
       owner,
       repo,
       path: 'src/lib/blog.ts',
       content: updatedBlogFile,   // cały tekst blog.ts po dopisaniu nowego posta
       message: `Add blog post: ${title}`,
    })

       await upsertFile(octokit, {
       owner,
       repo,
       path: `src/posts/${slug}.html`,
       content: htmlContent,       // wygenerowany HTML artykułu
       message: `Add blog HTML for: ${title}`,
    })

      // 12. Trigger Vercel deployment (optional - Vercel auto-deploys on push)
      if (process.env.VERCEL_DEPLOY_HOOK) {
        await fetch(process.env.VERCEL_DEPLOY_HOOK, { method: 'POST' })
      }

      return NextResponse.json<PublishResponse>({
        success: true,
        message: `Blog post "${data.title}" published successfully!`,
        slug
      })

    } catch (error: any) {
      console.error('GitHub API Error:', error)
      return NextResponse.json(
        { success: false, error: `GitHub API error: ${error.message}` },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error('Publish Post Error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Blog Automation API is running',
    version: '1.0.0'
  })
}
