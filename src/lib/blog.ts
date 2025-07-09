import { BlogPost } from '@/types/Blog'

// Mock blog posts data (replace with your actual posts)
// Raw blog data with string dates to avoid serialization issues
const mockBlogPostsData = [
  {
    slug: 'charging-stations-poland',
    title: 'Stacje ładowania w Polsce - kompletny przewodnik 2024',
    excerpt: 'Wszystko co musisz wiedzieć o stacjach ładowania pojazdów elektrycznych w Polsce. Mapa, ceny, typy złączy i praktyczne porady.',
    content: `# Stacje ładowania w Polsce - kompletny przewodnik 2024

## Wprowadzenie

Polska dynamicznie rozwija infrastrukturę ładowania pojazdów elektrycznych. W 2024 roku mamy już ponad 3000 publicznych punktów ładowania w całym kraju.

## Typy stacji ładowania

### Ładowanie AC (prąd przemienny)
- Moc: 3.7 kW - 22 kW
- Czas ładowania: 4-8 godzin
- Najlepsze do ładowania nocnego

### Ładowanie DC (prąd stały)
- Moc: 50 kW - 350 kW
- Czas ładowania: 20-60 minut
- Idealne do podróży długodystansowych

## Główni operatorzy w Polsce

1. **Orlen Charge** - największa sieć w Polsce
2. **Ionity** - szybkie ładowarki na autostradach
3. **GreenWay** - rozwijająca się sieć
4. **Tauron** - silna pozycja w południowej Polsce

## Koszty ładowania

Ceny wahają się od 1,20 zł do 3,50 zł za kWh w zależności od:
- Mocy ładowarki
- Operatora
- Lokalizacji
- Typu abonamentu

## Praktyczne porady

- Zawsze miej plan B - alternatywną stację
- Pobierz aplikacje głównych operatorów
- Sprawdź dostępność przed wyjazdem
- Zaplanuj postoje na ładowanie w trasie`,
    author: 'IVI Market',
    publishedAt: '2024-06-15',
    updatedAt: '2024-06-20',
    category: 'Ładowanie',
    tags: ['stacje ładowania', 'infrastruktura', 'Polska', 'przewodnik'],
    readingTime: 8,
    featured: true,
    seo: {
      metaTitle: 'Stacje ładowania EV w Polsce 2024 - Kompletny przewodnik',
      metaDescription: 'Wszystko o stacjach ładowania pojazdów elektrycznych w Polsce. Mapa, ceny, operatorzy i praktyczne porady dla kierowców EV.',
      ogImage: '/images/blog/charging-stations-poland.jpg'
    }
  },
  {
    slug: 'home-charging-guide',
    title: 'Ładowanie domowe EV - jak wybrać najlepsze rozwiązanie',
    excerpt: 'Przewodnik po ładowaniu domowym pojazdów elektrycznych. Wallboxy, instalacja, koszty i najlepsze praktyki.',
    content: `# Ładowanie domowe EV - jak wybrać najlepsze rozwiązanie

## Dlaczego ładowanie domowe?

Ładowanie w domu to najwygodniejszy i często najtańszy sposób na uzupełnienie energii w pojeździe elektrycznym.

## Opcje ładowania domowego

### 1. Gniazdko domowe (230V)
- Moc: 2.3 kW
- Czas ładowania: 12-20 godzin
- Koszt: 0 zł (wykorzystanie istniejącego gniazdka)

### 2. Wallbox jednofazowy
- Moc: 3.7 kW - 7.4 kW
- Czas ładowania: 6-12 godzin
- Koszt: 2000-4000 zł

### 3. Wallbox trójfazowy
- Moc: 11 kW - 22 kW
- Czas ładowania: 3-6 godzin
- Koszt: 3000-6000 zł

## Najlepsze wallboxy 2024

1. **Tesla Wall Connector** - 11 kW, integracja z aplikacją
2. **Easee Home** - inteligentne ładowanie, design
3. **ABB Terra AC** - niezawodność, funkcje smart
4. **Wallbox Pulsar Plus** - dobry stosunek ceny do jakości

## Instalacja

### Wymagania techniczne:
- Osobny obwód elektryczny
- Zabezpieczenia różnicowoprądowe
- Odpowiednia moc przyłącza

### Koszty instalacji:
- Wallbox: 2000-6000 zł
- Instalacja: 1000-3000 zł
- Modernizacja instalacji: 2000-5000 zł

## Oszczędności

Ładowanie w domu kosztuje około 0.60-0.80 zł za kWh (taryfa nocna), co daje:
- 100 km zasięgu za ~6-8 zł
- Roczne oszczędności vs. benzyna: 3000-5000 zł`,
    author: 'IVI Market',
    publishedAt: '2024-06-10',
    category: 'Ładowanie',
    tags: ['ładowanie domowe', 'wallbox', 'instalacja', 'oszczędności'],
    readingTime: 6,
    featured: false,
    seo: {
      metaTitle: 'Ładowanie domowe EV - przewodnik po wallboxach 2024',
      metaDescription: 'Jak wybrać najlepszy wallbox do ładowania domowego? Porównanie, koszty instalacji i praktyczne porady.',
      ogImage: '/images/blog/home-charging-guide.jpg'
    }
  },
  {
    slug: 'tesla-model-3-test-2024',
    title: 'Tesla Model 3 2024 - test długodystansowy',
    excerpt: 'Szczegółowy test Tesli Model 3 po 6 miesiącach użytkowania. Zasięg, ładowanie, koszty eksploatacji i wrażenia z jazdy.',
    content: `# Tesla Model 3 2024 - test długodystansowy

## Wprowadzenie

Po 6 miesiącach i 25 000 km z Teslą Model 3 Long Range, czas na szczegółowe podsumowanie.

## Specyfikacja testowanego auta

- **Model**: Tesla Model 3 Long Range
- **Rok**: 2024
- **Zasięg WLTP**: 602 km
- **Moc**: 351 KM
- **Bateria**: 75 kWh
- **Cena**: 189 000 zł

## Zasięg w praktyce

### Warunki miejskie:
- Lato: 480-520 km
- Zima: 380-420 km
- Średnie zużycie: 16-18 kWh/100km

### Trasa autostradowa:
- 120 km/h: 350-400 km
- 140 km/h: 300-350 km
- Średnie zużycie: 20-24 kWh/100km

## Ładowanie

### Supercharger:
- 10-80%: 35-45 minut
- Moc szczytowa: 250 kW
- Koszt: ~2.50 zł/kWh

### Ładowanie domowe:
- 0-100%: 8 godzin (wallbox 11 kW)
- Koszt: ~0.70 zł/kWh (taryfa nocna)

## Koszty eksploatacji (6 miesięcy)

- **Energia**: 2400 zł
- **Serwis**: 0 zł
- **Ubezpieczenie**: 3600 zł
- **Opony**: 0 zł (brak zużycia)
- **Razem**: 6000 zł (1000 zł/miesiąc)

## Plusy

✅ Doskonała dynamika i prowadzenie
✅ Najlepsza sieć ładowania (Supercharger)
✅ Regularne aktualizacje oprogramowania
✅ Minimalne koszty eksploatacji
✅ Autopilot w codziennym użytkowaniu

## Minusy

❌ Jakość wykończenia mogłaby być lepsza
❌ Brak fizycznych przycisków
❌ Głośność na autostradzie
❌ Serwis tylko w większych miastach

## Podsumowanie

Tesla Model 3 to nadal benchmark w segmencie premium EV. Mimo drobnych wad, całość robi świetne wrażenie.

**Ocena**: 8.5/10`,
    author: 'IVI Market',
    publishedAt: '2024-06-05',
    category: 'Testy',
    tags: ['Tesla', 'Model 3', 'test', 'długodystansowy', 'zasięg'],
    readingTime: 10,
    featured: true,
    seo: {
      metaTitle: 'Tesla Model 3 2024 - test długodystansowy po 25000 km',
      metaDescription: 'Szczegółowy test Tesli Model 3 2024. Rzeczywisty zasięg, koszty eksploatacji, plusy i minusy po 6 miesiącach.',
      ogImage: '/images/blog/tesla-model-3-test.jpg'
    }
  }
]

// Convert string dates to Date objects and create BlogPost array
const mockBlogPosts: BlogPost[] = mockBlogPostsData.map(post => ({
  ...post,
  publishedAt: new Date(post.publishedAt),
  updatedAt: post.updatedAt ? new Date(post.updatedAt) : undefined
}))

// Client-side functions that don't use Node.js fs
export function getAllPosts(): BlogPost[] {
  return mockBlogPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | null {
  return mockBlogPosts.find(post => post.slug === slug) || null
}

export function getFeaturedPosts(): BlogPost[] {
  return mockBlogPosts.filter(post => post.featured)
}

export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase()
  return mockBlogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export function getPostsByCategory(category: string): BlogPost[] {
  return mockBlogPosts.filter(post => post.category === category)
}

export function getAllCategories(): string[] {
  const categoriesSet = new Set<string>()
  mockBlogPosts.forEach(post => {
    categoriesSet.add(post.category)
  })
  return Array.from(categoriesSet).sort()
}

export function getAllTags(): string[] {
  const tagsSet = new Set<string>()
  mockBlogPosts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag))
  })
  return Array.from(tagsSet).sort()
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  const relatedPosts = mockBlogPosts
    .filter(post => post.slug !== currentSlug)
    .filter(post => 
      post.category === currentPost.category ||
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit)

  return relatedPosts
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}