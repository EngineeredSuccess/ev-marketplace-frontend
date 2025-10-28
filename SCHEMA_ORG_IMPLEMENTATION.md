# Implementacja danych strukturalnych Schema.org

## Przegląd zmian

Ten dokument opisuje implementację i ulepszenia danych strukturalnych Schema.org (JSON-LD) dla bloga iViMarket.

## Co zostało zaimplementowane?

### 1. Ulepszone komponenty Schema.org

Zaktualizowano plik `src/components/seo/StructuredData.tsx` z następującymi ulepszeniami:

#### BlogPostStructuredData
- ✅ Pełna implementacja schematu **BlogPosting**
- ✅ Wszystkie wymagane pola według Google Rich Results
- ✅ Rozszerzone metadane: `wordCount`, `timeRequired`, `articleSection`, `genre`
- ✅ Poprawiony obiekt `author` z typem `Person` i URL
- ✅ Poprawiony obiekt `publisher` z wymiarami logo
- ✅ Dodano wymiary obrazu (`width`, `height`)
- ✅ Szczegółowa dokumentacja JSDoc

#### ArticleStructuredData (nowy)
- ✅ Alternatywny komponent z typem `Article`
- ✅ Bardziej uniwersalny dla różnych typów treści
- ✅ Identyczne pola jak BlogPosting

#### Pozostałe komponenty
- ✅ `WebsiteStructuredData` - schemat dla całej witryny
- ✅ `VehicleStructuredData` - schemat dla ofert pojazdów
- ✅ `OrganizationStructuredData` - schemat organizacji
- ✅ `BreadcrumbStructuredData` - schemat breadcrumb

## Umiejscowienie kodu JSON-LD

### W strukturze HTML

Kod JSON-LD jest renderowany przez komponenty React i automatycznie umieszczany w DOM. W Next.js komponenty te są używane bezpośrednio na stronach artykułów.

### Przykład użycia w stronie artykułu

```tsx
// src/app/blog/[slug]/page.tsx

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)
  
  return (
    <div>
      {/* Dane strukturalne - renderowane w miejscu użycia */}
      <BlogPostStructuredData
        title={post.title}
        description={post.excerpt}
        author={post.author}
        publishedAt={post.publishedAt.toISOString()}
        modifiedAt={post.updatedAt?.toISOString()}
        image={post.seo.ogImage}
        url={`https://ivimarket.pl/blog/${post.slug}`}
        readingTime={post.readingTime}
        tags={post.tags}
      />
      
      {/* Breadcrumb */}
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
      {/* Treść artykułu */}
      <article>
        <h1>{post.title}</h1>
        {/* ... */}
      </article>
    </div>
  )
}
```

### Gdzie w HTML?

W Next.js z `'use client'`, komponenty są renderowane w miejscu użycia w drzewie komponentów. Zazwyczaj umieszcza się je:

1. **Na początku komponentu strony** (zalecane):
   ```tsx
   return (
     <div>
       <BlogPostStructuredData {...props} />
       {/* reszta treści */}
     </div>
   )
   ```

2. **W dedykowanej sekcji SEO**:
   ```tsx
   return (
     <>
       {/* SEO i metadane */}
       <Head>
         <title>{post.title}</title>
       </Head>
       <BlogPostStructuredData {...props} />
       
       {/* Treść */}
       <article>{/* ... */}</article>
     </>
   )
   ```

## Przykład wygenerowanego JSON-LD

Dla artykułu "Czy BYD Dolphin Surf to nowy Maluch?":

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Czy BYD Dolphin Surf to nowy „Maluch"? Elektryczny kompakt, który może zmienić rynek EV w Polsce",
  "description": "Analiza, czy BYD Dolphin Surf – przystępny cenowo elektryk – może odegrać dla elektromobilności podobną rolę jak Fiat 126p w historii polskiej motoryzacji.",
  "url": "https://ivimarket.pl/blog/byd-dolphin-surf-elektryczny-maluch",
  "author": {
    "@type": "Person",
    "name": "iViMarket",
    "url": "https://ivimarket.pl/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "iViMarket",
    "url": "https://ivimarket.pl",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ivimarket.pl/logo.png",
      "width": 600,
      "height": 60
    }
  },
  "datePublished": "2025-01-12T00:00:00+01:00",
  "dateModified": "2025-01-12T00:00:00+01:00",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://ivimarket.pl/blog/byd-dolphin-surf-elektryczny-maluch"
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://images.unsplash.com/photo-1617788138017-80ad40651399",
    "width": 1200,
    "height": 630
  },
  "keywords": "BYD Dolphin Surf, samochody elektryczne, EV w Polsce, elektryczny kompakt, budżetowe EV",
  "wordCount": 2000,
  "timeRequired": "PT10M",
  "inLanguage": "pl-PL",
  "about": {
    "@type": "Thing",
    "name": "Pojazdy elektryczne"
  },
  "articleSection": "Blog o pojazdach elektrycznych",
  "genre": "Artykuł informacyjny"
}
```

## Wymagane pola według Schema.org

### BlogPosting - wymagane:
- ✅ `@context`: "https://schema.org"
- ✅ `@type`: "BlogPosting"
- ✅ `headline`: Tytuł artykułu
- ✅ `author`: Obiekt Person
- ✅ `publisher`: Obiekt Organization z logo
- ✅ `datePublished`: Data publikacji (ISO 8601)
- ✅ `dateModified`: Data modyfikacji (ISO 8601)
- ✅ `mainEntityOfPage`: Obiekt WebPage z @id
- ✅ `url`: Pełny URL artykułu

### Zalecane dla Rich Results:
- ✅ `image`: Obiekt ImageObject (min. 1200x675px)
- ✅ `description`: Opis artykułu
- ✅ `keywords`: Słowa kluczowe
- ✅ `inLanguage`: Kod języka

## Najlepsze praktyki

### 1. Format dat
Używaj formatu ISO 8601 z timezone:
```typescript
publishedAt={post.publishedAt.toISOString()}
// Wynik: "2025-01-12T00:00:00.000Z"
```

### 2. Obrazy
- Minimalna rozdzielczość: 1200x675px
- Zalecana: 1200x630px (format Open Graph)
- Zawsze podawaj `width` i `height`

### 3. Author
Zawsze jako obiekt `Person`, nie string:
```json
"author": {
  "@type": "Person",
  "name": "Jan Kowalski",
  "url": "https://ivimarket.pl/about"
}
```

### 4. Publisher z logo
Logo musi mieć wymiary:
```json
"publisher": {
  "@type": "Organization",
  "name": "iViMarket",
  "logo": {
    "@type": "ImageObject",
    "url": "https://ivimarket.pl/logo.png",
    "width": 600,
    "height": 60
  }
}
```

## Walidacja

### Narzędzia:
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Google Search Console**: Monitorowanie w czasie rzeczywistym

### Jak testować:
1. Wejdź na https://search.google.com/test/rich-results
2. Wklej URL artykułu: `https://ivimarket.pl/blog/byd-dolphin-surf-elektryczny-maluch`
3. Sprawdź czy wszystkie pola są rozpoznane
4. Upewnij się, że nie ma błędów

## Korzyści

### SEO:
- ✅ Lepsze pozycjonowanie w Google
- ✅ Rich snippets (gwiazdki, obrazy, daty)
- ✅ Zwiększona widoczność w SERP

### Użytkownik:
- ✅ Bardziej atrakcyjne wyniki wyszukiwania
- ✅ Więcej informacji przed kliknięciem
- ✅ Wyższa CTR (Click-Through Rate)

### Analityka:
- ✅ Lepsze śledzenie w Google Analytics
- ✅ Monitorowanie w Search Console
- ✅ Dane o wydajności Rich Results

## Rozwiązywanie problemów

### Problem: Dane strukturalne nie są wykrywane
**Rozwiązanie:**
- Sprawdź `type="application/ld+json"`
- Zwaliduj JSON (bez błędów składni)
- Użyj walidatora JSON

### Problem: Brak Rich Results
**Rozwiązanie:**
- Poczekaj 1-2 tygodnie na reindeksację
- Wymuś reindeksację w Search Console
- Sprawdź wszystkie wymagane pola

### Problem: Ostrzeżenia w Search Console
**Rozwiązanie:**
- Dodaj brakujące pola (image, dateModified)
- Sprawdź rozdzielczość obrazów (min. 1200x675px)
- Zweryfikuj format dat (ISO 8601)

## Pliki zmodyfikowane

```
src/components/seo/StructuredData.tsx - Zaktualizowany z ulepszoną implementacją
SCHEMA_ORG_IMPLEMENTATION.md - Ten plik dokumentacji
```

## Następne kroki

1. ✅ Przetestuj zmiany lokalnie
2. ✅ Zwaliduj JSON-LD w Google Rich Results Test
3. ✅ Deploy na produkcję
4. ⏳ Poczekaj na reindeksację Google (1-2 tygodnie)
5. ⏳ Monitoruj w Google Search Console

## Wsparcie

W razie pytań lub problemów:
- Sprawdź dokumentację Schema.org: https://schema.org/BlogPosting
- Użyj Google Rich Results Test: https://search.google.com/test/rich-results
- Sprawdź Google Search Console dla błędów w czasie rzeczywistym
