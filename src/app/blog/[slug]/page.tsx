import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';

// This tells Next.js to generate static pages for all blog posts at build time
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    
    const filenames = fs.readdirSync(postsDirectory);
    const htmlFiles = filenames.filter(filename => filename.endsWith('.html'));
    
    return htmlFiles.map(filename => ({
      slug: filename.replace('.html', ''),
    }));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${slug}.html`);
  
  try {
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    
    // Extract title from HTML (look for first h1)
    const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '') : 'iVi Market Blog';
    
    // Extract description (look for first p tag)
    const descMatch = htmlContent.match(/<p[^>]*>(.*?)<\/p>/i);
    const description = descMatch 
      ? descMatch[1].replace(/<[^>]+>/g, '').substring(0, 160) 
      : 'Artykuły o samochodach elektrycznych w Polsce';
    
    return {
      title: `${title} | iVi Market`,
      description,
      openGraph: {
        title: `${title} | iVi Market`,
        description,
        type: 'article',
      },
    };
  } catch (error) {
    return {
      title: 'Post nie znaleziony | iVi Market',
      description: 'Ten post nie został znaleziony',
    };
  }
}

// The actual page component
export default function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${slug}.html`);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  
  // Read the HTML file
  const htmlContent = fs.readFileSync(filePath, 'utf8');
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Back button */}
        <Link
          href="/blog"
          style={{
            marginBottom: '24px',
            display: 'inline-flex',
            alignItems: 'center',
            color: '#10b981',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          ← Powrót do bloga
        </Link>
        
        {/* Article content */}
        <article 
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            marginTop: '20px'
          }}
        >
          <div 
            style={{ 
              padding: '40px',
              color: '#4b5563', 
              fontSize: '16px', 
              lineHeight: '1.7'
            }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          
          {/* Share section */}
          <div style={{
            borderTop: '1px solid #e5e7eb',
            padding: '24px 40px',
            textAlign: 'center',
            background: '#f9fafb'
          }}>
            <p style={{ color: '#6b7280', marginBottom: '16px', fontSize: '14px' }}>
              Podobał Ci się artykuł? Podziel się nim!
            </p>
          </div>
        </article>
        
        {/* Related posts section */}
        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <Link 
            href="/blog"
            style={{
              color: '#10b981',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            ← Zobacz więcej artykułów
          </Link>
        </div>
      </div>
      
      {/* Global styles for article content */}
      <style dangerouslySetInnerHTML={{
        __html: `
          article h1 {
            font-size: 2.5rem;
            font-weight: 800;
            color: #1f2937;
            margin-bottom: 1.5rem;
            line-height: 1.2;
          }
          
          article h2 {
            font-size: 2rem;
            font-weight: 700;
            color: #1f2937;
            margin-top: 2rem;
            margin-bottom: 1rem;
          }
          
          article h3 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1f2937;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }
          
          article p {
            margin-bottom: 1rem;
            color: #4b5563;
          }
          
          article img {
            max-width: 100%;
            height: auto;
            border-radius: 12px;
            margin: 1.5rem 0;
          }
          
          article ul, article ol {
            margin-bottom: 1rem;
            padding-left: 1.5rem;
          }
          
          article li {
            margin-bottom: 0.5rem;
            color: #4b5563;
          }
          
          article a {
            color: #10b981;
            text-decoration: underline;
          }
          
          article a:hover {
            color: #059669;
          }
          
          article blockquote {
            border-left: 4px solid #10b981;
            padding-left: 1rem;
            margin: 1.5rem 0;
            color: #6b7280;
            font-style: italic;
          }
          
          article code {
            background: #f3f4f6;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-size: 0.9em;
            font-family: 'Courier New', monospace;
          }
          
          article pre {
            background: #1f2937;
            color: #f3f4f6;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            margin: 1.5rem 0;
          }
          
          article pre code {
            background: transparent;
            padding: 0;
            color: inherit;
          }
          
          @media (max-width: 768px) {
            article h1 {
              font-size: 2rem;
            }
            
            article h2 {
              font-size: 1.5rem;
            }
            
            article h3 {
              font-size: 1.25rem;
            }
            
            article div[style*="padding"] {
              padding: 20px !important;
            }
          }
        `
      }} />
    </div>
  );
}
