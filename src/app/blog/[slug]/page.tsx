import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
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
    const htmlFiles = filenames.filter((filename) => filename.endsWith('.html'));
    return htmlFiles.map((filename) => ({
      slug: filename.replace('.html', ''),
    }));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

// Helper: read both .md and .html for a post
function getPostData(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const htmlPath = path.join(postsDirectory, `${slug}.html`);

  let frontmatter: any = {};
  let htmlContent = '';

  // Try to read .md for frontmatter
  if (fs.existsSync(mdPath)) {
    const mdFile = fs.readFileSync(mdPath, 'utf8');
    const parsed = matter(mdFile);
    frontmatter = parsed.data;
  }

  // Read .html for content
  if (fs.existsSync(htmlPath)) {
    htmlContent = fs.readFileSync(htmlPath, 'utf8');
  } else {
    return null;
  }

  return { frontmatter, htmlContent };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const postData = getPostData(slug);

  if (!postData) {
    return {
      title: 'Post nie znaleziony | iVi Market',
      description: 'Ten post nie został znaleziony',
    };
  }

  const { frontmatter, htmlContent } = postData;

  // Use frontmatter if available, otherwise extract from HTML
  const title = frontmatter.title || frontmatter.seo?.metaTitle || 'iVi Market Blog';
  const description =
    frontmatter.excerpt ||
    frontmatter.seo?.metaDescription ||
    'Artykuły o samochodach elektrycznych w Polsce';
  const ogImage = frontmatter.ogImage || frontmatter.seo?.ogImage;

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
}

// The actual page component
export default function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const postData = getPostData(slug);

  // Check if post exists
  if (!postData) {
    notFound();
  }

  const { frontmatter, htmlContent } = postData;

  // Get hero image from frontmatter
  const heroImage = frontmatter.ogImage || frontmatter.seo?.ogImage;
  const title = frontmatter.title || 'Bez tytułu';

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">
          ← Powrót do bloga
        </Link>
      </div>

      {/* Hero Image */}
      {heroImage && (
        <div className="mb-8">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-auto rounded-2xl object-cover shadow-lg"
            style={{ maxHeight: '500px' }}
          />
        </div>
      )}

      {/* Article content */}
      <article
        className="prose prose-lg prose-slate max-w-none
          prose-headings:font-bold prose-headings:text-gray-900
          prose-h1:text-4xl prose-h1:mb-4
          prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-ul:list-disc prose-ul:pl-6
          prose-li:text-gray-700
          prose-img:rounded-xl prose-img:shadow-md"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Share section */}
      <section className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-lg font-semibold text-gray-900 mb-4">
          Podobał Ci się artykuł? Podziel się nim!
        </p>
        {/* Możesz tu dodać przyciski social media */}
      </section>

      {/* Related posts section */}
      <section className="mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          ← Zobacz więcej artykułów
        </Link>
      </section>
    </main>
  );
}
