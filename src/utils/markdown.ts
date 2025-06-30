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