import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

// Type definitions
interface BlogPostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown content
  author: string;
  category: string;
  tags: string[];
  featured?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
}

interface PublishResponse {
  success: boolean;
  message: string;
  slug?: string;
  error?: string;
}

// Improved Markdown to HTML converter with breadcrumbs and semantic structure
function markdownToHtml(markdown: string, title: string): string {
  let html = markdown;
  
  // 1. Convert headers (must be done before paragraphs)
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  
  // 2. Convert inline formatting
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // 3. Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // 4. Convert images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto; border-radius: 8px; margin: 1.5rem 0;" />');
  
  // 5. Convert lists
  // First, identify list blocks
  const lines = html.split('\n');
  const processedLines: string[] = [];
  let inList = false;
  let listItems: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Check if this is a list item
    if (trimmed.match(/^[-*] (.+)$/)) {
      const match = trimmed.match(/^[-*] (.+)$/);
      if (match) {
        if (!inList) {
          inList = true;
          listItems = [];
        }
        listItems.push(`<li>${match[1]}</li>`);
      }
    } else {
      // Not a list item
      if (inList) {
        // Close the previous list
        processedLines.push('<ul>');
        processedLines.push(...listItems);
        processedLines.push('</ul>');
        inList = false;
        listItems = [];
      }
      processedLines.push(line);
    }
  }
  
  // Close list if we ended in one
  if (inList) {
    processedLines.push('<ul>');
    processedLines.push(...listItems);
    processedLines.push('</ul>');
  }
  
  html = processedLines.join('\n');
  
  // 6. Convert horizontal rules
  html = html.replace(/^---$/gm, '<hr style="border: none; border-top: 2px solid #e5e7eb; margin: 2rem 0;" />');
  
  // 7. Convert blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote style="border-left: 4px solid #10b981; padding-left: 1rem; margin: 1.5rem 0; color: #6b7280; font-style: italic;">$1</blockquote>');
  
  // 8. Convert paragraphs (only for lines that aren't already HTML tags)
  const finalLines = html.split('\n');
  const withParagraphs = finalLines.map(line => {
    const trimmed = line.trim();
    
    // Skip empty lines
    if (!trimmed) {
      return '';
    }
    
    // Skip lines that are already HTML tags
    if (trimmed.match(/^<(h[1-6]|ul|li|blockquote|hr|img|div|p|strong|em|a)/)) {
      return line;
    }
    
    // Wrap in paragraph
    return `<p>${trimmed}</p>`;
  });
  
  html = withParagraphs.join('\n');
  
  // 9. Clean up extra whitespace
  html = html.replace(/\n{3,}/g, '\n\n');
  
  // 10. Wrap content in semantic HTML with breadcrumbs
  const breadcrumbs = `<!-- Breadcrumb Navigation -->
<nav aria-label="Breadcrumb" role="navigation">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a href="/" itemprop="item"><span itemprop="name">Strona główna</span></a>
      <meta itemprop="position" content="1" />
      <span aria-label="separator"> › </span>
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a href="/blog" itemprop="item"><span itemprop="name">Blog</span></a>
      <meta itemprop="position" content="2" />
      <span aria-label="separator"> › </span>
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" aria-current="page">
      <span itemprop="name">${title}</span>
      <meta itemprop="position" content="3" />
    </li>
  </ol>
</nav>

<main>
  <article itemscope itemtype="https://schema.org/Article">`;
  
  const closingTags = `  </article>
</main>`;
  
  // Extract the first h1 and wrap it in a header
  const h1Match = html.match(/<h1>(.*?)<\/h1>/);
  if (h1Match) {
    html = html.replace(/<h1>(.*?)<\/h1>/, '<header>\n      <h1 itemprop="headline">$1</h1>\n    </header>');
  }
  
  return breadcrumbs + '\n' + html + '\n' + closingTags;
}

export async function POST(request: NextRequest) {
  try {
    const data: BlogPostData = await request.json();
    
    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: title, slug, or content'
      } as PublishResponse, { status: 400 });
    }

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });

    const owner = process.env.GITHUB_OWNER || 'EngineeredSuccess';
    const repo = process.env.GITHUB_REPO || 'ev-marketplace-frontend';
    const branch = process.env.GITHUB_BRANCH || 'main';

    // Create BOTH files: Markdown and HTML
    
    // 1. Create Markdown file
    const mdPath = `posts/${data.slug}.md`;
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
`;

    // 2. Create HTML file (automatically converted from Markdown)
    const htmlPath = `posts/${data.slug}.html`;
    const htmlContent = markdownToHtml(data.content, data.title);

    // Get current file SHAs if they exist (for updates)
    let mdSha: string | undefined;
    let htmlSha: string | undefined;

    try {
      const mdFile = await octokit.repos.getContent({
        owner, repo, path: mdPath, ref: branch
      });
      if ('sha' in mdFile.data) {
        mdSha = mdFile.data.sha;
      }
    } catch (error) {
      // File doesn't exist yet
    }

    try {
      const htmlFile = await octokit.repos.getContent({
        owner, repo, path: htmlPath, ref: branch
      });
      if ('sha' in htmlFile.data) {
        htmlSha = htmlFile.data.sha;
      }
    } catch (error) {
      // File doesn't exist yet
    }

    // Create or update BOTH files
    const mdResult = await octokit.repos.createOrUpdateFileContents({
      owner, repo, path: mdPath,
      message: mdSha ? `Update blog post: ${data.title}` : `Publish new blog post: ${data.title}`,
      content: Buffer.from(mdContent).toString('base64'),
      branch,
      ...(mdSha && { sha: mdSha })
    });

    const htmlResult = await octokit.repos.createOrUpdateFileContents({
      owner, repo, path: htmlPath,
      message: htmlSha ? `Update blog post HTML: ${data.title}` : `Publish new blog post HTML: ${data.title}`,
      content: Buffer.from(htmlContent).toString('base64'),
      branch,
      ...(htmlSha && { sha: htmlSha })
    });

    return NextResponse.json({
      success: true,
      message: mdSha ? `Blog post updated successfully: ${data.title}` : `Blog post published successfully: ${data.title}`,
      slug: data.slug,
      files: {
        markdown: mdResult.data.content?.html_url,
        html: htmlResult.data.content?.html_url
      }
    } as PublishResponse & { files: { markdown?: string; html?: string } });

  } catch (error) {
    console.error('Error publishing blog post:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    } as PublishResponse, { status: 500 });
  }
}
