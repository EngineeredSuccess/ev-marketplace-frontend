import fs from ‘fs’;
import path from ‘path’;
import type { Metadata } from ‘next’;

export const metadata: Metadata = {
title: ‘Blog | iVi Market - Wszystko o samochodach elektrycznych’,
description: ‘Najnowsze artykuły, porady i informacje o samochodach elektrycznych w Polsce. Dowiedz się więcej o EV, ładowaniu, zasięgu i nie tylko.’,
};

interface BlogPostMeta {
slug: string;
title: string;
excerpt: string;
date: string;
author: string;
readTime: string;
tags: string[];
}

// Function to extract metadata from HTML
function extractMetadata(htmlContent: string, filename: string): BlogPostMeta {
// Extract title from first h1
const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)</h1>/i);
const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, ‘’) : ‘Bez tytułu’;

// Extract excerpt from first p tag (first 160 chars)
const excerptMatch = htmlContent.match(/<p[^>]*>(.*?)</p>/i);
const excerpt = excerptMatch
? excerptMatch[1].replace(/<[^>]+>/g, ‘’).substring(0, 160) + ‘…’
: ‘Brak opisu’;

// Try to extract date from filename or default to current date
const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/);
const date = dateMatch ? dateMatch[1] : new Date().toISOString().split(‘T’)[0];

// Calculate read time based on content length
const wordCount = htmlContent.replace(/<[^>]+>/g, ‘’).split(/\s+/).length;
const readTime = Math.ceil(wordCount / 200) + ’ min czytania’;

// Extract tags from content or use defaults
const tags: string[] = [];
if (htmlContent.toLowerCase().includes(‘elektryczny’)) tags.push(‘samochody elektryczne’);
if (htmlContent.toLowerCase().includes(‘tesla’)) tags.push(‘Tesla’);
if (htmlContent.toLowerCase().includes(‘ładowanie’)) tags.push(‘ładowanie’);
if (htmlContent.toLowerCase().includes(‘zasięg’)) tags.push(‘zasięg’);
if (tags.length === 0) tags.push(‘EV’);

return {
slug: filename.replace(’.html’, ‘’),
title,
excerpt,
date,
author: ‘iViMarket’,
readTime,
tags
};
}

// Get all blog posts
function getAllPosts(): BlogPostMeta[] {
const postsDirectory = path.join(process.cwd(), ‘posts’);

try {
const filenames = fs.readdirSync(postsDirectory);
const htmlFiles = filenames.filter(filename => filename.endsWith(’.html’));

```
const posts = htmlFiles.map(filename => {
  const filePath = path.join(postsDirectory, filename);
  const htmlContent = fs.readFileSync(filePath, 'utf8');
  return extractMetadata(htmlContent, filename);
});

// Sort by date (newest first)
return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
```

} catch (error) {
console.error(‘Error reading posts:’, error);
return [];
}
}

export default function BlogPage() {
const posts = getAllPosts();

return (
<div style={{
minHeight: ‘100vh’,
background: ‘linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)’,
padding: ‘40px 20px’
}}>
<div style={{ maxWidth: ‘1200px’, margin: ‘0 auto’ }}>
{/* Header */}
<div style={{ textAlign: ‘center’, marginBottom: ‘60px’ }}>
<h1 style={{
fontSize: ‘48px’,
fontWeight: ‘800’,
color: ‘#1f2937’,
marginBottom: ‘16px’
}}>
📰 Blog iVi Market
</h1>
<p style={{
fontSize: ‘18px’,
color: ‘#6b7280’,
maxWidth: ‘600px’,
margin: ‘0 auto’
}}>
Wszystko o samochodach elektrycznych w Polsce
</p>
</div>

```
    {/* Posts Grid */}
    {posts.length > 0 ? (
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '24px',
        marginBottom: '60px'
      }}>
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{
              textDecoration: 'none',
              display: 'block'
            }}
          >
            <article style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
            }}
            >
              <div style={{ padding: '24px', flex: 1 }}>
                {/* Tags */}
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  marginBottom: '16px',
                  flexWrap: 'wrap'
                }}>
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      style={{
                        background: '#10b981',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 style={{ 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  color: '#1f2937',
                  marginBottom: '12px',
                  lineHeight: '1.4'
                }}>
                  {post.title}
                </h2>
                
                {/* Excerpt */}
                <p style={{ 
                  color: '#6b7280', 
                  fontSize: '14px', 
                  lineHeight: '1.5',
                  marginBottom: '16px'
                }}>
                  {post.excerpt}
                </p>
                
                {/* Meta */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#9ca3af',
                  marginTop: 'auto'
                }}>
                  <span>{post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString('pl-PL')}</span>
                </div>
                
                {/* Read time */}
                <div style={{ 
                  fontSize: '12px',
                  color: '#10b981',
                  fontWeight: '600',
                  marginTop: '8px'
                }}>
                  ⏱️ {post.readTime}
                </div>
              </div>
            </article>
          </a>
        ))}
      </div>
    ) : (
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '60px 40px',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '24px', color: '#1f2937', marginBottom: '16px' }}>
          Brak artykułów
        </h3>
        <p style={{ color: '#6b7280' }}>
          Dodaj pierwszy post używając API endpoint /api/publish-post
        </p>
      </div>
    )}

    {/* Back to home */}
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <a
        href="/"
        style={{
          color: '#10b981',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '16px'
        }}
      >
        ← Powrót do strony głównej
      </a>
    </div>
  </div>
</div>
```

);
}
