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
  let html = markdown;
  
  // 1. Inline formatting
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // 2. Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  
  // 3. Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // 4. Lists
  html = html.replace(/^\- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  
  // 5. Paragraphs
  const lines = html.split('\n');
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.match(/^<[^>]+>/)) {
      return `<p>${trimmed}</p>`;
    }
    return line;
  });
  
  html = processedLines.join('\n');
  return html;
}

export async function POST(request: NextRequest) {
  try {
    const data: BlogPostData = await request.json()
    
    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: title, slug, or content'
      } as PublishResponse, { status: 400 })
    }

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    })

    const owner = process.env.GITHUB_OWNER || 'EngineeredSuccess'
    const repo = process.env.GITHUB_REPO || 'ev-marketplace-frontend'
    const branch = process.env.GITHUB_BRANCH || 'main'

    // KLUCZOWA ZMIANA: Tworzymy OBA pliki
    
    // 1. Create Markdown file
    const mdPath = `posts/${data.slug}.md`
    const mdContent = `---
title: ${data.title}
slug: ${data.slug}
excerpt: ${data.excerpt}
author: ${data.author}
category: ${data.category}
tags: ${data.tags.join(', ')}
featured: ${data.featured || false}
date: ${new Date().toISOString()}
${data.seo ? `seo:
  metaTitle: ${data.seo.metaTitle || ''}
  metaDescription: ${data.seo.metaDescription || ''}
  ogImage: ${data.seo.ogImage || ''}` : ''}
---

${data.content}
`

    // 2. Create HTML file (AUTOMATYCZNIE)
    const htmlPath = `posts/${data.slug}.html`
    const htmlContent = markdownToHtml(data.content)

    // Get current file SHAs if they exist (for updates)
    let mdSha: string | undefined
    let htmlSha: string | undefined

    try {
      const mdFile = await octokit.repos.getContent({
        owner, repo, path: mdPath, ref: branch
      })
      if ('sha' in mdFile.data) {
        mdSha = mdFile.data.sha
      }
    } catch (error) {}

    try {
      const htmlFile = await octokit.repos.getContent({
        owner, repo, path: htmlPath, ref: branch
      })
      if ('sha' in htmlFile.data) {
        htmlSha = htmlFile.data.sha
      }
    } catch (error) {}

    // Create or update BOTH files
    const mdResult = await octokit.repos.createOrUpdateFileContents({
      owner, repo, path: mdPath,
      message: mdSha ? `Update blog post: ${data.title}` : `Publish new blog post: ${data.title}`,
      content: Buffer.from(mdContent).toString('base64'),
      branch,
      ...(mdSha && { sha: mdSha })
    })

    const htmlResult = await octokit.repos.createOrUpdateFileContents({
      owner, repo, path: htmlPath,
      message: htmlSha ? `Update blog post HTML: ${data.title}` : `Publish new blog post HTML: ${data.title}`,
      content: Buffer.from(htmlContent).toString('base64'),
      branch,
      ...(htmlSha && { sha: htmlSha })
    })

    return NextResponse.json({
      success: true,
      message: mdSha ? `Blog post updated successfully: ${data.title}` : `Blog post published successfully: ${data.title}`,
      slug: data.slug,
      files: {
        markdown: mdResult.data.content?.html_url,
        html: htmlResult.data.content?.html_url
      }
    } as PublishResponse & { files: { markdown?: string, html?: string } })

  } catch (error) {
    console.error('Error publishing blog post:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    } as PublishResponse, { status: 500 })
  }
}
