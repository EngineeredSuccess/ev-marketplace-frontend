import fs from 'fs';
import path from 'path';
import Link from 'next/link';

// Helper function to extract metadata from HTML
function extractMetadata(htmlContent: string, slug: string) {
  // Extract title from first h1
  const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '') : 'Bez tytułu';
  
  // Extract first paragraph as excerpt
  const paragraphMatch = htmlContent.match(/<p[^>]*>(.*?)<\/p>/i);
  const excerpt = paragraphMatch 
    ? paragraphMatch[1].replace(/<[^>]+>/g, '').substring(0, 160) + '...'
    : 'Przeczytaj więcej...';
  
  // Extract first image if available
  const imageMatch = htmlContent.match(/<img[^>]+src="([^">]+)"/i);
  const image = imageMatch ? imageMatch[1] : null;
  
  return { title, excerpt, image, slug };
}

// Get all blog posts from /posts/ directory
function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    
    const filenames = fs.readdirSync(postsDirectory);
    const htmlFiles = filenames.filter(filename => filename.endsWith('.html'));
    
    const posts = htmlFiles.map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const htmlContent = fs.readFileSync(filePath, 'utf8');
      const slug = filename.replace('.html', '');
      
      return extractMetadata(htmlContent, slug);
    });
    
    return posts;
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export default function BlogIndexPage() {
  const posts = getAllPosts();
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        padding: 'clamp(30px, 8vw, 60px) 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontWeight: '800',
            marginBottom: '24px',
            margin: '0 0 24px 0',
            lineHeight: '1.2'
          }}>
            Blog iVi Market
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 3vw, 20px)',
            marginBottom: '0',
            maxWidth: '600px',
            margin: '0 auto',
            opacity: '0.9',
            lineHeight: '1.5'
          }}>
            Najnowsze informacje o pojazdach elektrycznych, technologiach i rynku EV w Polsce
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <Link 
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: '#10b981',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '20px'
          }}
        >
          ← Powrót do strony głównej
        </Link>
      </div>

      {/* Posts Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 60px' }}>
        <h2 style={{
          fontSize: 'clamp(24px, 4vw, 32px)',
          fontWeight: '800',
          marginBottom: '32px',
          color: '#1f2937'
        }}>
          Wszystkie artykuły ({posts.length})
        </h2>

        {posts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'clamp(24px, 4vw, 32px)',
            alignItems: 'stretch'
          }}>
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <article style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}>
                  {post.image && (
                    <div style={{
                      width: '100%',
                      height: '200px',
                      overflow: 'hidden',
                      background: '#f3f4f6'
                    }}>
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  )}
                  
                  <div style={{
                    padding: '24px',
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      marginBottom: '12px',
                      color: '#1f2937',
                      lineHeight: '1.4'
                    }}>
                      {post.title}
                    </h3>
                    
                    <p style={{
                      color: '#6b7280',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      marginBottom: '16px',
                      flex: '1'
                    }}>
                      {post.excerpt}
                    </p>
                    
                    <div style={{
                      color: '#10b981',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      Czytaj więcej →
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <p style={{
              color: '#6b7280',
              fontSize: '18px',
              margin: '0'
            }}>
              Brak artykułów. Dodaj swój pierwszy post!
            </p>
          </div>
        )}
      </div>

      {/* Hover effect styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          article:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15) !important;
          }
        `
      }} />
    </div>
  );
}
