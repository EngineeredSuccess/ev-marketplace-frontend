// pages/BlogPage.tsx
import React, { useState } from ‘react’;
import {
ArrowLeft,
Calendar,
User,
Clock,
Share2,
BookOpen,
Tag,
TrendingUp,
Heart,
MessageCircle,
Search,
Filter
} from ‘lucide-react’;

export interface BlogPost {
id: number;
title: string;
excerpt: string;
content: string;
date: string;
author: string;
image: string;
slug: string;
tags: string[];
readTime?: number;
featured?: boolean;
category?: string;
}

interface BlogPageProps {
className?: string;
}

const BlogPage: React.FC<BlogPageProps> = ({ className = ‘’ }) => {
const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
const [selectedCategory, setSelectedCategory] = useState<string>(‘all’);
const [searchTerm, setSearchTerm] = useState(’’);

// Mock blog posts data
const blogPosts: BlogPost[] = [
{
id: 1,
title: “Tesla Model 3 - Pełny test 2024”,
excerpt: “Sprawdziliśmy najnowszą Teslę Model 3 w polskich warunkach. Zasięg, komfort i technologia.”,
date: “2024-01-15”,
author: “Zespół iVi Market”,
image: “https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600”,
slug: “tesla-model-3-test-2024”,
tags: [“tesla”, “test”, “ev”, “recenzja”],
readTime: 8,
featured: true,
category: “Testy”,
content: `
<h1>Tesla Model 3 - Pełny test 2024</h1>

```
    <img src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800" alt="Tesla Model 3" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 24px;" />
    
    <h2>Wprowadzenie</h2>
    <p>Tesla Model 3 to jeden z najpopularniejszych pojazdów elektrycznych na świecie. W naszym szczegółowym teście sprawdziliśmy, jak sprawdza się w polskich warunkach drogowych i klimatycznych.</p>
    
    <h2>Zasięg i bateria</h2>
    <p>W testach uzyskaliśmy zasięg <strong>420 km</strong> w mieszanych warunkach jazdy:</p>
    <ul>
      <li>Miasto: 480 km</li>
      <li>Trasa: 380 km</li>
      <li>Zima (-5°C): 340 km</li>
    </ul>
    
    <p>Bateria o pojemności <strong>75 kWh</strong> zapewnia wystarczającą autonomię na większość zastosowań.</p>
    
    <img src="https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=600" alt="Ładowanie Tesla" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px; margin: 24px 0;" />
    
    <h2>Komfort jazdy</h2>
    <ul>
      <li>Zawieszenie dostosowane do europejskich dróg</li>
      <li>Kabina przestronna i dobrze wyciszona</li>
      <li>Minimalistyczne wnętrze z ekranem dotykowym 15"</li>
    </ul>
    
    <h2>Technologia</h2>
    <p><strong>Autopilot</strong> działa dobrze na autostradach, ale wymaga uwagi w mieście. <strong>Over-the-air updates</strong> regularnie dodają nowe funkcje.</p>
    
    <h2>Podsumowanie</h2>
    <p>Tesla Model 3 to doskonały wybór dla osób szukających:</p>
    <ul>
      <li>Praktycznego pojazdu elektrycznego</li>
      <li>Zaawansowanej technologii</li>
      <li>Dobrego stosunku jakości do ceny</li>
    </ul>
    
    <p><strong>Ocena: 9/10</strong></p>
  `
},
{
  id: 2,
  title: "Jak ładować pojazd elektryczny w domu?",
  excerpt: "Praktyczny poradnik instalacji wallboxa i optymalizacji kosztów ładowania w domu.",
  date: "2024-01-10",
  author: "Ekspert iVi Market",
  image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=600",
  slug: "jak-ladowac-pojazd-elektryczny-w-domu",
  tags: ["ładowanie", "wallbox", "dom", "poradnik"],
  readTime: 6,
  category: "Poradniki",
  content: `
    <h1>Jak ładować pojazd elektryczny w domu?</h1>
    
    <img src="https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800" alt="Ładowanie w domu" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 24px;" />
    
    <h2>Rodzaje ładowarek domowych</h2>
    
    <h3>1. Gniazdko 230V (2,3 kW)</h3>
    <ul>
      <li>Najwolniejsze ładowanie</li>
      <li>Nie wymaga dodatkowej instalacji</li>
      <li>Czas ładowania: 24-36 godzin</li>
    </ul>
    
    <h3>2. Wallbox AC (7,4-22 kW)</h3>
    <ul>
      <li><strong>Najlepsze rozwiązanie</strong> dla większości użytkowników</li>
      <li>Wymaga instalacji przez elektryka</li>
      <li>Czas ładowania: 4-8 godzin</li>
    </ul>
    
    <h2>Podsumowanie</h2>
    <p>Wallbox to inwestycja, która zwraca się w 1-2 lata dzięki oszczędnościom na ładowaniu!</p>
  `
},
{
  id: 3,
  title: "Mapa ładowarek w Polsce 2024",
  excerpt: "Przegląd najważniejszych sieci ładowania i aplikacji do znajdowania stacji ładowania.",
  date: "2024-01-05",
  author: "Redakcja iVi Market",
  image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600",
  slug: "mapa-ladowarek-polska-2024",
  tags: ["ładowarki", "mapa", "aplikacje", "podróże"],
  readTime: 5,
  category: "Infrastruktura",
  content: `
    <h1>Mapa ładowarek w Polsce 2024</h1>
    
    <img src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800" alt="Mapa ładowarek" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 24px;" />
    
    <h2>Główne sieci ładowania</h2>
    <p>W Polsce działają następujące największe sieci ładowania:</p>
    
    <h3>1. Ionity</h3>
    <ul>
      <li>Moc: 150-350 kW</li>
      <li>Lokalizacje: autostrady i główne trasy</li>
      <li>Cena: 1,89 zł/kWh</li>
    </ul>
    
    <h2>Przyszłość ładowania w Polsce</h2>
    <p>Do 2025 roku planowane jest <strong>podwojenie liczby stacji</strong> szybkiego ładowania w Polsce.</p>
  `
}
```

];

// Get unique categories
const categories = [‘all’, …Array.from(new Set(blogPosts.map(post => post.category).filter(Boolean)))];

// Filter posts based on category and search
const filteredPosts = blogPosts.filter(post => {
const matchesCategory = selectedCategory === ‘all’ || post.category === selectedCategory;
const matchesSearch = !searchTerm ||
post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

```
return matchesCategory && matchesSearch;
```

});

const featuredPosts = blogPosts.filter(post => post.featured);

if (selectedPost) {
return (
<div className={className} style={{ maxWidth: ‘800px’, margin: ‘0 auto’, padding: ‘40px 20px’ }}>
{/* Back Button */}
<button
onClick={() => setSelectedPost(null)}
style={{
marginBottom: ‘24px’,
display: ‘flex’,
alignItems: ‘center’,
color: ‘#10b981’,
background: ‘transparent’,
border: ‘none’,
fontSize: ‘16px’,
cursor: ‘pointer’,
fontWeight: ‘600’,
padding: ‘8px 0’,
transition: ‘all 0.3s ease’
}}
onMouseEnter={(e) => {
e.currentTarget.style.transform = ‘translateX(-4px)’;
}}
onMouseLeave={(e) => {
e.currentTarget.style.transform = ‘translateX(0)’;
}}
>
<ArrowLeft style={{ height: ‘16px’, width: ‘16px’, marginRight: ‘8px’ }} />
Powrót do bloga
</button>

```
    {/* Article */}
    <article style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ padding: '40px' }}>
        {/* Article Meta */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '16px', 
          color: '#6b7280', 
          fontSize: '14px',
          marginBottom: '32px',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <User style={{ height: '14px', width: '14px' }} />
            <span style={{ fontWeight: '600' }}>{selectedPost.author}</span>
          </div>
          <span>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar style={{ height: '14px', width: '14px' }} />
            <span>{new Date(selectedPost.date).toLocaleDateString('pl-PL')}</span>
          </div>
          {selectedPost.readTime && (
            <>
              <span>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock style={{ height: '14px', width: '14px' }} />
                <span>{selectedPost.readTime} min czytania</span>
              </div>
            </>
          )}
          <span>•</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {selectedPost.tags?.map((tag, index) => (
              <span 
                key={index}
                style={{
                  background: '#10b981',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Article Content */}
        <div 
          style={{ 
            color: '#4b5563', 
            fontSize: '16px', 
            lineHeight: '1.7' 
          }}
          dangerouslySetInnerHTML={{ __html: selectedPost.content }}
        />
        
        {/* Article Footer */}
        <div style={{
          borderTop: '1px solid #e5e7eb',
          paddingTop: '24px',
          marginTop: '40px'
        }}>
          {/* Engagement */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                color: '#6b7280',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                <Heart style={{ height: '16px', width: '16px' }} />
                <span>42</span>
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                color: '#6b7280',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                <MessageCircle style={{ height: '16px', width: '16px' }} />
                <span>8</span>
              </button>
            </div>

            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              <Share2 style={{ height: '14px', width: '14px' }} />
              Udostępnij
            </button>
          </div>

          {/* Share Options */}
          <div style={{
            background: '#f8fafc',
            padding: '16px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <p style={{ 
              color: '#6b7280', 
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              Podobał Ci się artykuł? Podziel się nim!
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {[
                { platform: 'Email', color: '#10b981', emoji: '📧' },
                { platform: 'Twitter', color: '#1DA1F2', emoji: '🐦' },
                { platform: 'Facebook', color: '#4267B2', emoji: '📘' },
                { platform: 'LinkedIn', color: '#0077b5', emoji: '💼' }
              ].map(({ platform, color, emoji }) => (
                <button 
                  key={platform}
                  style={{
                    background: color,
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>{emoji}</span>
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
);
```

}

return (
<div className={className} style={{ maxWidth: ‘1000px’, margin: ‘0 auto’, padding: ‘40px 20px’ }}>
{/* Blog Header */}
<div style={{ marginBottom: ‘40px’ }}>
<h1 style={{
fontSize: ‘36px’,
fontWeight: ‘800’,
marginBottom: ‘16px’,
color: ‘#1f2937’
}}>
Blog iVi Market
</h1>
<p style={{
color: ‘#6b7280’,
fontSize: ‘18px’,
marginBottom: ‘32px’
}}>
Najnowsze artykuły o pojazdach elektrycznych, testy, porady i aktualności z branży EV
</p>

```
    {/* Search and Filter */}
    <div style={{
      display: 'flex',
      gap: '16px',
      marginBottom: '32px',
      flexWrap: 'wrap'
    }}>
      {/* Search */}
      <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
        <Search style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          height: '16px',
          width: '16px',
          color: '#9ca3af'
        }} />
        <input
          type="text"
          placeholder="Szukaj artykułów..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            paddingLeft: '40px',
            paddingRight: '16px',
            padding: '12px 40px 12px 40px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '14px',
            outline: 'none',
            background: 'white'
          }}
        />
      </div>

      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          padding: '12px 16px',
          border: '2px solid #e5e7eb',
          borderRadius: '12px',
          fontSize: '14px',
          outline: 'none',
          background: 'white',
          cursor: 'pointer',
          minWidth: '150px'
        }}
      >
        <option value="all">Wszystkie kategorie</option>
        {categories.slice(1).map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  </div>

  {/* Featured Posts */}
  {selectedCategory === 'all' && !searchTerm && featuredPosts.length > 0 && (
    <section style={{ marginBottom: '60px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '24px'
      }}>
        <TrendingUp style={{ height: '20px', width: '20px', color: '#10b981' }} />
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#1f2937',
          margin: '0'
        }}>
          Polecane artykuły
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        {featuredPosts.map(post => (
          <article 
            key={post.id}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '20px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onClick={() => setSelectedPost(post)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(16, 185, 129, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <img
              src={post.image}
              alt={post.title}
              style={{ 
                width: '100%', 
                height: '200px', 
                objectFit: 'cover',
                opacity: 0.8
              }}
            />
            
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#10b981',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <TrendingUp style={{ height: '12px', width: '12px' }} />
              Polecane
            </div>

            <div style={{ 
              padding: '24px',
              background: 'linear-gradient(to bottom, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.95))',
              color: 'white'
            }}>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '700',
                marginBottom: '12px',
                lineHeight: '1.4'
              }}>
                {post.title}
              </h3>
              
              <p style={{ 
                fontSize: '14px', 
                lineHeight: '1.5',
                marginBottom: '16px',
                opacity: 0.9
              }}>
                {post.excerpt}
              </p>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px',
                opacity: 0.8
              }}>
                <span>{post.author}</span>
                <span>{new Date(post.date).toLocaleDateString('pl-PL')}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )}

  {/* Regular Posts */}
  <section>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '700',
        color: '#1f2937',
        margin: '0'
      }}>
        {selectedCategory === 'all' && !searchTerm ? 'Wszystkie artykuły' : 
         searchTerm ? `Wyniki wyszukiwania: "${searchTerm}"` :
         `Kategoria: ${selectedCategory}`}
      </h2>
      
      {filteredPosts.length > 0 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: '#6b7280',
          fontSize: '14px'
        }}>
          <BookOpen style={{ height: '14px', width: '14px' }} />
          {filteredPosts.length} artykuł{filteredPosts.length === 1 ? '' : filteredPosts.length < 5 ? 'y' : 'ów'}
        </div>
      )}
    </div>
    
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '24px',
      marginBottom: '40px'
    }}>
      {filteredPosts.map(post => (
        <article 
          key={post.id}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
          onClick={() => setSelectedPost(post)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
          }}
        >
          <img
            src={post.image}
            alt={post.title}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          
          <div style={{ padding: '24px' }}>
            {/* Category and Tags */}
            <div style={{ 
              display: 'flex', 
              gap: '6px',
              marginBottom: '12px',
              flexWrap: 'wrap'
            }}>
              {post.category && (
                <span style={{
                  background: '#667eea',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: '600'
                }}>
                  {post.category}
                </span>
              )}
              {post.tags?.slice(0, 2).map((tag, index) => (
                <span 
                  key={index}
                  style={{
                    background: '#10b981',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              color: '#1f2937',
              marginBottom: '12px',
              lineHeight: '1.4'
            }}>
              {post.title}
            </h3>
            
            <p style={{ 
              color: '#6b7280', 
              fontSize: '14px', 
              lineHeight: '1.5',
              marginBottom: '16px'
            }}>
              {post.excerpt}
            </p>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px',
              color: '#9ca3af'
            }}>
              <span>{post.author}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {post.readTime && (
                  <span>{post.readTime} min</span>
                )}
                <span>•</span>
                <span>{new Date(post.date).toLocaleDateString('pl-PL')}</span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>

    {/* No Results */}
    {filteredPosts.length === 0 && (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <BookOpen style={{
          height: '48px',
          width: '48px',
          color: '#9ca3af',
          margin: '0 auto 16px'
        }} />
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '8px'
        }}>
          Brak artykułów
        </h3>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
          {searchTerm ? 
            'Nie znaleziono artykułów dla podanych kryteriów wyszukiwania' :
            'W tej kategorii nie ma jeszcze artykułów'
          }
        </p>
        {(searchTerm || selectedCategory !== 'all') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Pokaż wszystkie artykuły
          </button>
        )}
      </div>
    )}
  </section>

  {/* Content Management Guide */}
  <section style={{ marginTop: '60px' }}>
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '40px',
      textAlign: 'center',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        color: '#1f2937', 
        marginBottom: '16px' 
      }}>
        📝 Przewodnik po zarządzaniu treścią
      </h3>
      <div style={{ 
        textAlign: 'left',
        maxWidth: '600px',
        margin: '0 auto',
        background: '#f8fafc',
        padding: '24px',
        borderRadius: '12px'
      }}>
        <h4 style={{ color: '#1f2937', marginBottom: '12px' }}>Aby dodać nowy post:</h4>
        <ol style={{ color: '#6b7280', lineHeight: '1.6' }}>
          <li>Utwórz plik .md w folderze <code>src/posts/</code></li>
          <li>Dodaj metadata na górze (tytuł, data, autor, itp.)</li>
          <li>Napisz treść w Markdown</li>
          <li>Dodaj zdjęcia do <code>public/blog/</code></li>
          <li>Skonwertuj do HTML i dodaj do array'a</li>
        </ol>
        <p style={{ marginTop: '16px', fontSize: '14px', color: '#9ca3af' }}>
          💡 Wkrótce zautomatyzujemy ten proces z CMS!
        </p>
      </div>
    </div>
  </section>
</div>
```

);
};

export default BlogPage;