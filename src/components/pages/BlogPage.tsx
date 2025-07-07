import React, { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  slug: string;
  tags: string[];
  content: string;
}

interface BlogPageProps {
  onViewChange?: (view: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onViewChange }) => {
  // Blog posts data with markdown content converted to HTML
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Tesla Model 3 - Pełny test 2024",
      excerpt: "Sprawdziliśmy najnowszą Teslę Model 3 w polskich warunkach. Zasięg, komfort i technologia.",
      date: "2024-01-15",
      author: "Zespół iVi Market",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600",
      slug: "tesla-model-3-test-2024",
      tags: ["tesla", "test", "ev", "recenzja"],
      content: `
        <h1>Tesla Model 3 - Pełny test 2024</h1>
        
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
        
        <h3>3. Ładowarka DC (50+ kW)</h3>
        <ul>
          <li>Bardzo szybkie ładowanie</li>
          <li>Drogie w instalacji</li>
          <li>Głównie dla flot i stacji publicznych</li>
        </ul>
        
        <h2>Instalacja wallboxa</h2>
        
        <img src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600" alt="Wallbox" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px; margin: 24px 0;" />
        
        <h3>Wymagania:</h3>
        <ul>
          <li>Przyłącze elektryczne min. 25A</li>
          <li>Instalacja przez uprawnionego elektryka</li>
          <li>Ubezpieczenie od przepięć</li>
          <li>Możliwość montażu w garażu/na zewnątrz</li>
        </ul>
        
        <h3>Koszty:</h3>
        <ul>
          <li>Wallbox: 2,000-5,000 zł</li>
          <li>Instalacja: 1,000-2,000 zł</li>
          <li><strong>Łącznie: 3,000-7,000 zł</strong></li>
        </ul>
        
        <h2>Koszty i oszczędności</h2>
        
        <h3>Taryfa domowa vs stacje publiczne:</h3>
        <ul>
          <li><strong>Dom (taryfa G11):</strong> 0,60 zł/kWh</li>
          <li><strong>Dom (taryfa G12 - noc):</strong> 0,40 zł/kWh</li>
          <li><strong>Stacje szybkie:</strong> 1,80-2,50 zł/kWh</li>
        </ul>
        
        <h3>Oszczędności roczne:</h3>
        <p>Przy przebiegu 15,000 km/rok można zaoszczędzić <strong>3,000-4,000 zł</strong> ładując w domu zamiast na stacjach publicznych.</p>
        
        <h2>Najlepsze wallboxy 2024</h2>
        <ol>
          <li><strong>KEBA KeContact P30</strong> - 3,500 zł</li>
          <li><strong>ABL Sursum eMH1</strong> - 2,800 zł</li>
          <li><strong>Easee Home</strong> - 4,200 zł</li>
        </ol>
        
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
        
        <h3>2. Orlen Charge</h3>
        <ul>
          <li>Najliczniejsza sieć w Polsce</li>
          <li>Stacje przy większości stacji Orlen</li>
          <li>Moc: 50-150 kW</li>
        </ul>
        
        <h3>3. GreenWay</h3>
        <ul>
          <li>Fokus na szybkie ładowanie DC</li>
          <li>Lokalizacje strategiczne na trasach</li>
          <li>Dobra dostępność aplikacji</li>
        </ul>
        
        <h3>4. Tauron</h3>
        <ul>
          <li>Rozbudowana sieć w południowej Polsce</li>
          <li>Integracja z aplikacją Tauron eMobility</li>
          <li>Konkurencyjne ceny</li>
        </ul>
        
        <h2>Aplikacje mobilne</h2>
        
        <h3>Najlepsze aplikacje do znajdowania ładowarek:</h3>
        
        <h4>1. PlugShare (⭐⭐⭐⭐⭐)</h4>
        <ul>
          <li>Globalna baza ładowarek</li>
          <li>Recenzje użytkowników</li>
          <li>Aktualne informacje o dostępności</li>
        </ul>
        
        <h4>2. ChargeMap (⭐⭐⭐⭐)</h4>
        <ul>
          <li>Europejska aplikacja</li>
          <li>Planowanie tras</li>
          <li>Płatności w aplikacji</li>
        </ul>
        
        <h4>3. Aplikacje operatorów</h4>
        <ul>
          <li>Orlen Charge App</li>
          <li>GreenWay App</li>
          <li>Tauron eMobility</li>
        </ul>
        
        <h2>Planowanie podróży</h2>
        
        <h3>Zasady planowania tras:</h3>
        <ul>
          <li><strong>Zasięg bezpieczeństwa:</strong> Planuj postoję co 200-250 km</li>
          <li><strong>Backup:</strong> Zawsze miej alternatywną stację</li>
          <li><strong>Czas ładowania:</strong> Uwzględnij 30-45 min na postój</li>
          <li><strong>Zima:</strong> Zakładaj 30% mniejszy zasięg</li>
        </ul>
        
        <h3>Popularne trasy:</h3>
        <ul>
          <li><strong>Warszawa-Kraków:</strong> Orlen Radom, Ionity Kielce</li>
          <li><strong>Warszawa-Gdańsk:</strong> Orlen Łomża, GreenWay Grudziądz</li>
          <li><strong>Kraków-Wrocław:</strong> Orlen Opole, Tauron Katowice</li>
        </ul>
        
        <h2>Porady praktyczne</h2>
        
        <h3>Przed wyjazdem:</h3>
        <ul>
          <li>Sprawdź aktualne ceny na różnych stacjach</li>
          <li>Pobierz aplikacje głównych operatorów</li>
          <li>Sprawdź kompatybilność złączy</li>
          <li>Załaduj kartę płatniczą w aplikacjach</li>
        </ul>
        
        <h3>Na stacji:</h3>
        <ul>
          <li>Sprawdź stan ładowarki przed rozpoczęciem</li>
          <li>Monitoruj proces ładowania</li>
          <li>Nie blokuj stacji po zakończeniu ładowania</li>
        </ul>
        
        <h2>Przyszłość ładowania w Polsce</h2>
        <p>Do 2025 roku planowane jest <strong>podwojenie liczby stacji</strong> szybkiego ładowania w Polsce. Inwestycje koncentrują się na:</p>
        <ul>
          <li>Autostrady i drogi ekspresowe</li>
          <li>Centra handlowe</li>
          <li>Parkingi przy hotelach</li>
          <li>Stacje benzynowe</li>
        </ul>
      `
    }
  ];

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <button
          onClick={() => setSelectedPost(null)}
          style={{
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            color: '#10b981',
            background: 'transparent',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          ← Powrót do bloga
        </button>

        <article style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ padding: '40px' }}>
            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              color: '#6b7280', 
              fontSize: '14px',
              marginBottom: '32px',
              alignItems: 'center'
            }}>
              <span style={{ fontWeight: '600' }}>{selectedPost.author}</span>
              <span>•</span>
              <span>{new Date(selectedPost.date).toLocaleDateString('pl-PL')}</span>
              <span>•</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {selectedPost.tags?.map((tag: string, index: number) => (
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
            
            <div 
              style={{ 
                color: '#4b5563', 
                fontSize: '16px', 
                lineHeight: '1.7' 
              }}
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />
            
            <div style={{
              borderTop: '1px solid #e5e7eb',
              paddingTop: '24px',
              marginTop: '40px',
              textAlign: 'center'
            }}>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                Podobał Ci się artykuł? Podziel się nim!
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button style={{
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  📧 Email
                </button>
                <button style={{
                  background: '#1DA1F2',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  🐦 Twitter
                </button>
                <button style={{
                  background: '#4267B2',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  📘 Facebook
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', color: '#1f2937' }}>
          Blog iVi Market
        </h1>
        <p style={{ color: '#6b7280', fontSize: '18px' }}>
          Najnowsze artykuły o pojazdach elektrycznych, testy, porady i aktualności z branży EV
        </p>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        {blogPosts.map(post => (
          <article 
            key={post.id}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
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
              <div style={{ 
                display: 'flex', 
                gap: '6px',
                marginBottom: '12px'
              }}>
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
              
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: '700', 
                color: '#1f2937',
                marginBottom: '12px',
                lineHeight: '1.4'
              }}>
                {post.title}
              </h2>
              
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
                <span>{new Date(post.date).toLocaleDateString('pl-PL')}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '40px',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
          📝 Przewodnik po dodawaniu postów
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
            💡 Wkrótce zautomatyzujemy ten proces!
          </p>
        </div>
      </div>
    </div>
  );
};