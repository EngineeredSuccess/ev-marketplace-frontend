import { marked } from 'marked';
import matter from 'gray-matter';

// Configure marked for better HTML output
marked.setOptions({
  breaks: true,
  gfm: true
});

export function parseMarkdown(markdownContent: string) {
  const { data, content } = matter(markdownContent);
  const htmlContent = marked(content);
  
  return {
    metadata: data,
    content: htmlContent
  };
}

export function processMarkdownFile(fileContent: string) {
  const { metadata, content } = parseMarkdown(fileContent);
  
  return {
    id: generateId(metadata.slug),
    title: metadata.title,
    excerpt: metadata.excerpt,
    date: metadata.date,
    author: metadata.author,
    image: metadata.image,
    slug: metadata.slug,
    tags: metadata.tags || [],
    content: content
  };
}

function generateId(slug: string): number {
  return slug ? hashCode(slug) : Math.random();
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function processHTMLFile(htmlContent: string) {
  // Extract basic metadata from HTML
  const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
  const descriptionMatch = htmlContent.match(/<meta\s+name="description"\s+content="(.*?)"/i);
  const keywordsMatch = htmlContent.match(/<meta\s+name="keywords"\s+content="(.*?)"/i);
  
  // Extract the main content (everything inside <body>)
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : htmlContent;
  
  return {
    title: titleMatch ? titleMatch[1] : 'Untitled',
    description: descriptionMatch ? descriptionMatch[1] : '',
    keywords: keywordsMatch ? keywordsMatch[1].split(',').map(k => k.trim()) : [],
    content: bodyContent,
    fullHTML: htmlContent
  };
}

export function extractHTMLMetadata(htmlContent: string) {
  const metadata: any = {};
  
  // Extract title
  const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
  if (titleMatch) metadata.title = titleMatch[1];
  
  // Extract meta description
  const descMatch = htmlContent.match(/<meta\s+name="description"\s+content="(.*?)"/i);
  if (descMatch) metadata.description = descMatch[1];
  
  // Extract meta keywords
  const keywordsMatch = htmlContent.match(/<meta\s+name="keywords"\s+content="(.*?)"/i);
  if (keywordsMatch) metadata.keywords = keywordsMatch[1];
  
  // Extract canonical URL
  const canonicalMatch = htmlContent.match(/<link\s+rel="canonical"\s+href="(.*?)"/i);
  if (canonicalMatch) metadata.canonical = canonicalMatch[1];
  
  // Extract Open Graph data
  const ogTitleMatch = htmlContent.match(/<meta\s+property="og:title"\s+content="(.*?)"/i);
  if (ogTitleMatch) metadata.ogTitle = ogTitleMatch[1];
  
  const ogDescMatch = htmlContent.match(/<meta\s+property="og:description"\s+content="(.*?)"/i);
  if (ogDescMatch) metadata.ogDescription = ogDescMatch[1];
  
  const ogImageMatch = htmlContent.match(/<meta\s+property="og:image"\s+content="(.*?)"/i);
  if (ogImageMatch) metadata.ogImage = ogImageMatch[1];
  
  // Extract article dates
  const publishedMatch = htmlContent.match(/<meta\s+property="article:published_time"\s+content="(.*?)"/i);
  if (publishedMatch) metadata.publishedTime = publishedMatch[1];
  
  const modifiedMatch = htmlContent.match(/<meta\s+property="article:modified_time"\s+content="(.*?)"/i);
  if (modifiedMatch) metadata.modifiedTime = modifiedMatch[1];
  
  return metadata;
}