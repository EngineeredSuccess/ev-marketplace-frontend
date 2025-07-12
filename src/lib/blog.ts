import { BlogPost } from '@/types/Blog'
import { processHTMLFile } from '@/utils/markdown'

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    // Wrap in paragraphs
    .replace(/^(.+)$/gm, '<p>$1</p>')
    // Clean up multiple paragraph tags
    .replace(/<p><\/p>/g, '')
    .replace(/<p><h([1-6])>/g, '<h$1>')
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
    .replace(/<p><strong>/g, '<p><strong>')
    .replace(/<\/strong><\/p>/g, '</strong></p>')
    // Tables
    .replace(/\|(.+)\|/g, (match, content) => {
      const cells = content.split('|').map((cell: string) => cell.trim())
      return '<tr>' + cells.map((cell: string) => `<td>${cell}</td>`).join('') + '</tr>'
    })
    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr>')
}

// Mock blog posts data with updated content from markdown files
const mockBlogPostsData: Array<Omit<BlogPost, 'publishedAt' | 'updatedAt'> & {
  publishedAt: string;
  updatedAt?: string;
}> = [
  {
    slug: 'stacje-ladowania-w-polsce-2025',
    title: 'Stacje ładowania w Polsce 2025 – Kompletny przewodnik',
    excerpt: 'Mapa stacji ładowania w Polsce, koszty, aplikacje i praktyczne porady. Ponad 3000 punktów ładowania, sieci Ionity, Orlen, GreenWay. Planowanie tras EV.',
    content: markdownToHtml(`# Stacje ładowania w Polsce 2025 – Kompletny przewodnik

**Infrastruktura ładowania w Polsce rozwija się w ekspresowym tempie!** W 2025 roku mamy już ponad 3000 punktów ładowania w całym kraju. W naszym kompletnym przewodniku znajdziesz wszystko o stacjach ładowania, kosztach, aplikacjach i planowaniu tras dla pojazdów elektrycznych.

**Kluczowe informacje o stacjach ładowania:**
- 🗺️ **Ponad 3000 punktów** ładowania w Polsce
- ⚡ **Moc do 350 kW** - najszybsze ładowarki w Europie
- 💰 **Koszty 0,40-2,50 zł/kWh** w zależności od operatora
- 📱 **10+ aplikacji** do znajdowania i płacenia
- 🛣️ **Pełne pokrycie autostrad** - stacja co 50 km

---

## Najważniejsze informacje o infrastrukturze

**Polska staje się liderem w rozwoju infrastruktury ładowania w Europie Środkowej!**

**📊 Stan infrastruktury 2025:**
- **Łączna liczba punktów:** 3247 (stan na styczeń 2025)
- **Stacje szybkie DC (>50 kW):** 1456 punktów
- **Stacje AC (3,7-22 kW):** 1791 punktów
- **Wzrost rok do roku:** +89% (2024 vs 2023)

**🏆 Największe sieci w Polsce:**
1. **Orlen Charge** - 847 punktów
2. **GreenWay** - 523 punkty
3. **Ionity** - 156 punktów
4. **Tauron** - 234 punkty
5. **Energa** - 189 punktów

## Największe sieci stacji ładowania

### 1. Orlen Charge - Lider rynku

**⛽ Orlen Charge - największa sieć w Polsce:**
- **Liczba stacji:** 847 punktów
- **Moc:** 50-150 kW (DC), 22 kW (AC)
- **Lokalizacje:** Stacje Orlen, centra handlowe, miasta
- **Koszty:** 1,69-1,89 zł/kWh (DC), 1,29 zł/kWh (AC)
- **Aplikacja:** Orlen Charge (iOS/Android)

### 2. GreenWay - Szybkie ładowanie

**🟢 GreenWay - specjalista od szybkiego ładowania:**
- **Liczba stacji:** 523 punkty
- **Moc:** 50-350 kW (DC)
- **Lokalizacje:** Autostrady, drogi ekspresowe, miasta
- **Koszty:** 1,89-2,49 zł/kWh
- **Aplikacja:** GreenWay (iOS/Android)

### 3. Ionity - Premium dla długich tras

**🔵 Ionity - europejska sieć premium:**
- **Liczba stacji:** 156 punktów
- **Moc:** 350 kW (DC)
- **Lokalizacje:** Autostrady (co 120 km)
- **Koszty:** 2,19 zł/kWh (bez abonamentu)
- **Aplikacja:** Ionity (iOS/Android)

## Koszty ładowania na stacjach

### Porównanie cen operatorów

**💰 Aktualne ceny ładowania (styczeń 2025):**

| Operator | AC (22 kW) | DC (50 kW) | DC (150+ kW) | Opłata aktywacyjna |
|----------|------------|------------|--------------|-------------------|
| **Orlen Charge** | 1,29 zł/kWh | 1,69 zł/kWh | 1,89 zł/kWh | 0 zł |
| **GreenWay** | 1,49 zł/kWh | 1,89 zł/kWh | 2,49 zł/kWh | 0 zł |
| **Ionity** | - | - | 2,19 zł/kWh | 0 zł |
| **Tauron** | 1,49 zł/kWh | 1,79 zł/kWh | - | 0 zł |
| **Energa** | 1,39 zł/kWh | 1,69 zł/kWh | - | 0 zł |

### Najlepsze aplikacje 2025

**📱 Top 5 aplikacji do ładowania:**

**🏆 1. PlugShare**
- **Ocena:** ⭐⭐⭐⭐⭐
- **Zalety:** Największa baza, opinie użytkowników
- **Funkcje:** Mapa, filtry, planowanie tras
- **Cena:** Darmowa + Premium (15 zł/miesiąc)

**🥈 2. ChargeMap**
- **Ocena:** ⭐⭐⭐⭐⭐
- **Zalety:** Europejska baza, płatności
- **Funkcje:** Mapa, rezerwacje, płatności
- **Cena:** Darmowa + Pass (20 €/miesiąc)

**🥉 3. A Better Routeplanner (ABRP)**
- **Ocena:** ⭐⭐⭐⭐⭐
- **Zalety:** Najlepsze planowanie tras
- **Funkcje:** Optymalizacja tras, pogoda
- **Cena:** Darmowa + Premium (5 €/miesiąc)`),
    author: 'iViMarket',
    publishedAt: '2024-01-05',
    category: 'Ładowanie',
    tags: ['stacje ładowania', 'infrastruktura', 'Polska', 'mapa', 'koszty', '2025'],
    readingTime: 8,
    featured: true,
    seo: {
      metaTitle: 'Stacje ładowania w Polsce 2025 – Kompletny przewodnik',
      metaDescription: 'Mapa stacji ładowania w Polsce, koszty, aplikacje i praktyczne porady. Ponad 3000 punktów ładowania, sieci Ionity, Orlen, GreenWay.',
      ogImage: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80'
    }
  },
  {
    slug: 'jak-ladowac-pojazd-elektryczny-w-domu',
    title: 'Jak ładować pojazd elektryczny w domu? – Kompletny poradnik 2025',
    excerpt: 'Praktyczny poradnik instalacji wallboxa i optymalizacji kosztów ładowania w domu. Wallbox 11 kW, oszczędności do 4000 zł rocznie, najlepsze modele 2025.',
    content: markdownToHtml(`# Jak ładować pojazd elektryczny w domu? – Kompletny poradnik 2025

**Domowe ładowanie to klucz do wygodnego użytkowania pojazdu elektrycznego!** Wallbox w domu to nie tylko wygoda, ale przede wszystkim znaczące oszczędności. W naszym kompletnym poradniku dowiesz się wszystkiego o instalacji, kosztach i najlepszych rozwiązaniach na 2025 rok.

**Kluczowe zalety domowego ładowania:**
- 💰 **Oszczędności do 4000 zł** rocznie vs stacje publiczne
- ⚡ **Ładowanie 11-22 kW** - pełna bateria w 4-8 godzin
- 🏠 **Wygoda** - ładowanie podczas snu
- 📱 **Kontrola przez aplikację** - planowanie i monitoring
- 🌱 **Ekologia** - możliwość ładowania z paneli PV

---

## Najważniejsze informacje o domowym ładowaniu

**Wallbox to najlepsza inwestycja dla właściciela pojazdu elektrycznego!**

**📊 Porównanie kosztów ładowania:**
- **Dom (taryfa G12 - noc):** 0,40 zł/kWh
- **Dom (taryfa G11):** 0,60 zł/kWh
- **Stacje szybkie:** 1,80-2,50 zł/kWh
- **Różnica:** **do 6x taniej** w domu!

**💎 Pakiet kompletny wallbox:**
- **Wallbox 11 kW** z instalacją
- **Aplikacja mobilna** do sterowania
- **Gwarancja 5 lat** na urządzenie
- **Serwis i wsparcie** techniczne

## Rodzaje ładowarek domowych

### 2. Wallbox AC (7,4-22 kW) - ZALECANE

**🏆 Najlepsze rozwiązanie dla większości użytkowników:**
- **Moc:** 7,4 kW (1-fazowy) lub 11-22 kW (3-fazowy)
- **Czas ładowania:** 4-8 godzin (pełna bateria)
- **Koszt:** 3000-7000 zł (z instalacją)
- **Zalety:** Optymalna prędkość, bezpieczeństwo, wygoda
- **Zwrot inwestycji:** 12-24 miesiące

**🔋 Przykładowe czasy ładowania (bateria 60 kWh):**
- **Wallbox 7,4 kW:** 8 godzin (0-100%)
- **Wallbox 11 kW:** 5,5 godziny (0-100%)
- **Wallbox 22 kW:** 3 godziny (0-100%)*

*Rzeczywisty czas zależy od możliwości ładowania pojazdu

## Najlepsze wallboxy 2025

### Top 5 modeli wallbox

**🏆 1. KEBA KeContact P30 (11 kW)**
- **Cena:** 3500 zł
- **Zalety:** Niezawodność, aplikacja mobilna, RFID
- **Gwarancja:** 5 lat
- **Ocena:** ⭐⭐⭐⭐⭐

**🥈 2. ABL Sursum eMH1 (11 kW)**
- **Cena:** 2800 zł
- **Zalety:** Niemiecka jakość, prosty montaż
- **Gwarancja:** 3 lata
- **Ocena:** ⭐⭐⭐⭐⭐

**🥉 3. Easee Home (22 kW)**
- **Cena:** 4200 zł
- **Zalety:** Inteligentne funkcje, design
- **Gwarancja:** 3 lata
- **Ocena:** ⭐⭐⭐⭐⭐

### Koszty instalacji

**💰 Szczegółowy kosztorys:**

| Element | Koszt | Opis |
|---------|-------|------|
| **Wallbox 11 kW** | 2500-4000 zł | Urządzenie z kablem 5m |
| **Instalacja elektryczna** | 800-1500 zł | Kable, zabezpieczenia |
| **Robocizna** | 500-1000 zł | Montaż i uruchomienie |
| **Dokumentacja** | 200-300 zł | Protokoły, certyfikaty |
| **RAZEM** | **4000-6800 zł** | Kompletna instalacja |

## Koszty i oszczędności

### Oszczędności roczne

**📊 Kalkulacja oszczędności (przebieg 15 000 km/rok):**

**Pojazd zużywający 18 kWh/100 km:**
- **Roczne zużycie energii:** 2700 kWh
- **Koszt ładowania w domu (G12):** 1080 zł/rok
- **Koszt na stacjach publicznych:** 4860 zł/rok
- **Oszczędność:** **3780 zł rocznie**

**🎯 Zwrot inwestycji:**
- **Koszt wallboxa:** 5000 zł
- **Roczne oszczędności:** 3780 zł
- **Okres zwrotu:** **16 miesięcy**`),
    author: 'iViMarket',
    publishedAt: '2024-01-10',
    category: 'Ładowanie',
    tags: ['ładowanie', 'wallbox', 'dom', 'poradnik', 'oszczędności', 'instalacja', '2025'],
    readingTime: 6,
    featured: false,
    seo: {
      metaTitle: 'Jak ładować pojazd elektryczny w domu? – Kompletny poradnik 2025',
      metaDescription: 'Praktyczny poradnik instalacji wallboxa i optymalizacji kosztów ładowania w domu. Wallbox 11 kW, oszczędności do 4000 zł rocznie.',
      ogImage: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80'
    }
  },
  {
    slug: 'tesla-model-3-test-2024',
    title: 'Tesla Model 3 – Pełny test 2024',
    excerpt: 'Sprawdziliśmy najnowszą Teslę Model 3 w polskich warunkach. Zasięg 420 km, zaawansowana technologia i doskonały komfort jazdy. Czy to najlepszy elektryczny sedan?',
    content: markdownToHtml(`# Tesla Model 3 – Pełny test 2024

**Elektryczny przełom w segmencie premium!** Tesla Model 3 to rewolucyjny sedan elektryczny, który od lat wyznacza standardy w branży EV. W naszym szczegółowym teście sprawdziliśmy, jak najnowsza wersja sprawdza się w polskich warunkach drogowych i klimatycznych.

**Kluczowe zalety Tesla Model 3:**
- ⚡ **420 km zasięgu** w mieszanych warunkach
- 🚀 **Przyspieszenie 0-100 km/h** w 6,1 sekundy
- 🔋 **Szybkie ładowanie** DC do 250 kW
- 🤖 **Autopilot** z zaawansowanymi funkcjami
- 📱 **Over-the-air updates** - ciągłe ulepszenia

---

## Najważniejsze wiadomości o teście

**Tesla Model 3 przeszła przez nasze rygorystyczne testy w różnych warunkach!**

**📊 Wyniki testów:**
- **Zasięg miasto:** 480 km (warunki optymalne)
- **Zasięg trasa:** 380 km (autostrada 120 km/h)
- **Zasięg zima:** 340 km (temperatura -5°C)

**🏆 Ocena końcowa:**
Tesla Model 3 otrzymuje od nas **9/10 punktów** za doskonałe połączenie zasięgu, technologii i komfortu jazdy.

## Specyfikacja techniczna

### Silnik i osiągi

**🚗 Napęd elektryczny:**
- **Moc:** 283 KM (208 kW)
- **Moment obrotowy:** 420 Nm
- **Przyspieszenie 0-100 km/h:** 6,1 sekundy
- **Prędkość maksymalna:** 225 km/h
- **Napęd:** Na tylne koła (RWD)

**📏 Zasięg i efektywność:**
- **Zasięg WLTP:** do 491 km
- **Zużycie energii:** 15,3 kWh/100 km
- **Zasięg realny:** 420-450 km (warunki miejskie)
- **Zasięg autostrada:** 350-380 km (120 km/h)

### Ładowanie i bateria

**🔋 Bateria LFP (Lithium Iron Phosphate):**
- **Pojemność:** 75 kWh (użyteczna)
- **Technologia:** LFP - bezpieczna i trwała
- **Gwarancja:** 8 lat lub 192 000 km
- **Żywotność:** ponad 3000 cykli ładowania

**⚡ Ładowanie:**
- **DC szybkie ładowanie:** do 250 kW (Supercharger V3)
- **Czas ładowania 10-80%:** 27 minut (DC)
- **AC ładowanie domowe:** 11 kW
- **Czas pełnego ładowania AC:** 7 godzin (11 kW)

### Komfort i technologia

**🎯 Minimalistyczne wnętrze:**
- **Ekran dotykowy 15,4"** - centrum sterowania
- **Fotele sportowe** z regulacją elektryczną
- **Klimatyzacja automatyczna** z filtrem HEPA
- **System audio premium** (14 głośników)
- **Panoramiczny dach** szklany

**🤖 Autopilot Enhanced:**
- **Adaptacyjny tempomat** z funkcją Stop&Go
- **Automatyczna zmiana pasa** na autostradzie
- **Parkowanie automatyczne** (równoległe i prostopadłe)
- **Wezwanie pojazdu** (Smart Summon)

## Porównanie z konkurencją

### Tabela porównawcza

| Model | Cena od | Zasięg WLTP | Moc | Ładowanie DC | Bagażnik |
|-------|---------|-------------|-----|--------------|----------|
| **Tesla Model 3** | **199 900 zł** | **491 km** | **283 KM** | **250 kW** | **425 l** |
| BMW i4 eDrive40 | 249 900 zł | 590 km | 340 KM | 200 kW | 470 l |
| Genesis Electrified G80 | 329 900 zł | 427 km | 365 KM | 220 kW | 424 l |
| Polestar 2 | 219 900 zł | 540 km | 231 KM | 205 kW | 405 l |

### Analiza konkurencji

**🏆 Tesla Model 3 - zalety:**
- ✅ **Najlepsza technologia** ładowania (Supercharger)
- ✅ **Autopilot** - najbardziej zaawansowany system
- ✅ **Over-the-air updates** - ciągłe ulepszenia
- ✅ **Minimalistyczne wnętrze** - futurystyczny design
- ✅ **Sieć Supercharger** - najlepsza infrastruktura

**⚠️ Tesla Model 3 - wady:**
- ❌ **Jakość wykończenia** - czasami nierówna
- ❌ **Brak fizycznych przycisków** - wszystko przez ekran
- ❌ **Serwis** - ograniczona sieć w Polsce
- ❌ **Cena części** - drogie naprawy

## Podsumowanie testu

### Ocena końcowa: 9/10

**🏆 Tesla Model 3 to doskonały wybór dla:**
- ✅ Osób ceniących **zaawansowaną technologię**
- ✅ Kierowców często jeżdżących **długie trasy**
- ✅ Użytkowników szukających **autonomii jazdy**
- ✅ Osób mających dostęp do **ładowania domowego**

**⚠️ Może nie być idealna dla:**
- ❌ Osób preferujących **tradycyjne wnętrze**
- ❌ Kierowców rzadko korzystających z **funkcji tech**
- ❌ Użytkowników w obszarach bez **dobrej infrastruktury**`),
    author: 'iViMarket',
    publishedAt: '2024-01-15',
    category: 'Testy',
    tags: ['Tesla', 'Model 3', 'test', 'elektryczny', 'sedan', 'recenzja', '2024'],
    readingTime: 10,
    featured: true,
    seo: {
      metaTitle: 'Tesla Model 3 – Pełny test 2024',
      metaDescription: 'Sprawdziliśmy najnowszą Teslę Model 3 w polskich warunkach. Zasięg 420 km, zaawansowana technologia i doskonały komfort jazdy.',
      ogImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80'
    }
  },
  {
    slug: 'geely-ex5-elektryczny-suv-polska-premiera-2025',
    title: 'Geely EX5 – premiera w Polsce 2025',
    excerpt: 'Geely EX5 już w Q3 2025 w Polsce – 430 km zasięgu WLTP, od 129 900 zł z NaszEauto. Wersje Pro/Max, 5 gwiazdek Euro NCAP, specyfikacja techniczna.',
    content: '', // Will be loaded from HTML file
    contentType: 'html' as const, // Indicate this is HTML content
    htmlFile: '/src/posts/geely-ex5-elektryczny-suv-polska-premiera-2025.html',
    author: 'iViMarket',
    publishedAt: '2025-01-11',
    updatedAt: '2025-01-11',
    category: 'Samochody elektryczne',
    tags: ['Geely', 'EX5', 'SUV', 'elektryczny', 'nowość', 'Jameel Motors', '2025'],
    readingTime: 12,
    featured: true,
    seo: {
      metaTitle: 'Geely EX5 – polska premiera 2025, specyfikacja i cena | IVI Market',
      metaDescription: 'Geely EX5 już w Q3 2025 w Polsce – 430 km zasięgu WLTP, od 129 900 zł z NaszEauto. Wersje Pro/Max, 5 gwiazdek Euro NCAP, specyfikacja techniczna.',
      ogImage: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    }
  },
  {
    slug: 'byd-dolphin-surf-elektryczny-maluch',
    title: 'Czy BYD Dolphin Surf to nowy „Maluch”? Elektryczny SUV, który może zmienić rynek EV w Polsce',
    excerpt: 'Analiza, czy BYD Dolphin Surf – przystępny cenowo elektryk – może odegrać dla elektromobilności podobną rolę jak Fiat 126p w historii polskiej motoryzacji.',
    content: '',
    contentType: 'html' as const,
    htmlFile: '/src/posts/byd-dolphin-surf-elektryczny-maluch.html',
    author: 'iViMarket',
    publishedAt: '2025-07-12',
    updatedAt: '2025-07-12',
    category: 'Samochody elektryczne',
    tags: ['BYD Dolphin Surf', 'samochody elektryczne', 'EV w Polsce', 'elektryczny SUV', 'budżetowe EV'],
    readingTime: 10,
    featured: true,
    seo: {
      metaTitle: 'BYD Dolphin Surf – Czy to nowy Maluch ery elektromobilności?',
      metaDescription: 'Czy BYD Dolphin Surf może zostać ikoną elektryfikacji w Polsce? Sprawdź, jak ten przystępny SUV zmienia zasady gry w świecie samochodów elektrycznych.',
      ogImage: 'https://agymzuliolgopwejswta.supabase.co/storage/v1/object/sign/fotkiblog/37DFDE05-CEC6-4098-8F04-3562A7084B24.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjRiM2IxNy04ZTc2LTQ4YjAtYTRiMi00ODE4OTJjZWM2OTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3RraWJsb2cvMzdERkRFMDUtQ0VDNi00MDk4LThGMDQtMzU2MkE3MDg0QjI0LnBuZyIsImlhdCI6MTc1MjMyNjM2OCwiZXhwIjoyMDY3Njg2MzY4fQ.IGdmN8nwmAdaFWbTylSKinKn0F-6nHPUGRxxU-bws_8'
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
  const post = mockBlogPosts.find(post => post.slug === slug);
  
  if (!post) return null;
  
  // If it's an HTML post and content is empty, load the full HTML
  if (post.contentType === 'html' && !post.content) {
    // For now, return the post with a placeholder content
    // In a real app, you'd read the HTML file here
    return {
      ...post,
      content: `<div class="html-content-placeholder">
        <p>This is an HTML-based blog post. The full content would be loaded from: ${post.htmlFile}</p>
        <p>This demonstrates the capability to serve native HTML blog posts with full SEO control.</p>
      </div>`
    };
  }
  
  return post;
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