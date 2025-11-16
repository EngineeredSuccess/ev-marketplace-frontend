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
    
    // Extract first image for og:image
    const imageMatch = htmlContent.match(/<img[^>]+src="([^">]+)"/i);
    const ogImage = imageMatch ? imageMatch[1] : undefined;
    
    return {
      title: `${title} | iVi Market`,
      description,
      openGraph: {
        title: `${title} | iVi Market`,
        description,
        type: 'article',
        ...(ogImage && { images: [ogImage] }),
      },
    };
  } catch (error) {
    return {
      title: 'iVi Market Blog',
      description: 'Artykuły o samochodach elektrycznych w Polsce',
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
  
  // Extract hero image (first image in content)
  const imageMatch = htmlContent.match(/<img[^>]+src="([^">]+)"/i);
  const heroImage = imageMatch ? imageMatch[1] : undefined;
  
  // Extract title for hero image alt text
  const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '') : 'Blog post';
  
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
        
        {/* Hero Image */}
        {heroImage && (
          <div style={{
            marginTop: '20px',
            marginBottom: '30px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <img
              src={heroImage}
              alt={title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
        )}
        
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
    </div>
  );
}
