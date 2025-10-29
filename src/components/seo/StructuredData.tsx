'use client'

import React from 'react'

interface BlogPostStructuredDataProps {
  title: string
  description: string
  author: string
  publishedAt: string
  modifiedAt?: string
  image?: string
  url: string
  readingTime: number
  tags: string[]
}

interface WebsiteStructuredDataProps {
  name: string
  description: string
  url: string
  logo?: string
  sameAs?: string[]
}

interface VehicleStructuredDataProps {
  name: string
  brand: string
  model: string
  year: number
  price: number
  currency: string
  mileage?: number
  fuelType: string
  description: string
  image?: string
  url: string
}

/**
 * Komponent BlogPostStructuredData - generuje dane strukturalne Schema.org dla artykułów blogowych
 * 
 * Implementuje schemat BlogPosting zgodnie z wytycznymi Schema.org i Google Rich Results
 * Zawiera wszystkie wymagane i zalecane pola dla optymalnego SEO
 * 
 * Umiejscowienie: Kod JSON-LD jest automatycznie renderowany w DOM i może być umieszczony
 * zarówno w <head> jak i na początku <body>. W Next.js renderuje się w miejscu użycia komponentu.
 * 
 * @param title - Tytuł artykułu (wymagane)
 * @param description - Opis/excerpt artykułu (wymagane)
 * @param author - Imię i nazwisko autora (wymagane)
 * @param publishedAt - Data publikacji w formacie ISO 8601 (wymagane)
 * @param modifiedAt - Data ostatniej modyfikacji w formacie ISO 8601 (opcjonalne)
 * @param image - URL do głównego obrazu artykułu (zalecane, min. 1200x675px)
 * @param url - Pełny URL do artykułu (wymagane)
 * @param readingTime - Szacowany czas czytania w minutach (opcjonalne)
 * @param tags - Tablica tagów/słów kluczowych (opcjonalne)
 */
export function BlogPostStructuredData({
  title,
  description,
  author,
  publishedAt,
  modifiedAt,
  image,
  url,
  readingTime,
  tags
}: BlogPostStructuredDataProps) {
  // Główny schemat BlogPosting zgodny z Schema.org
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    
    // Podstawowe informacje o artykule
    "headline": title,
    "description": description,
    "url": url,
    
    // Informacje o autorze jako obiekt Person (wymagane przez Google)
    "author": {
      "@type": "Person",
      "name": author,
      "url": "https://ivimarket.pl/about"
    },
    
    // Informacje o wydawcy (wymagane przez Google Rich Results)
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
    
    // Daty publikacji i modyfikacji (wymagane)
    "datePublished": publishedAt,
    "dateModified": modifiedAt || publishedAt,
    
    // MainEntityOfPage - wskazuje główną stronę artykułu (wymagane)
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    
    // Obraz artykułu (zalecane dla Rich Results, minimum 1200x675px)
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": image,
        "width": 1200,
        "height": 630
      }
    }),
    
    // Dodatkowe metadane SEO
    "keywords": tags.join(", "),
    "wordCount": readingTime * 200, // Przybliżona liczba słów (200 słów/min)
    "timeRequired": `PT${readingTime}M`, // Format ISO 8601 Duration (np. PT10M = 10 minut)
    "inLanguage": "pl-PL",
    
    // Kontekst tematyczny artykułu
    "about": {
      "@type": "Thing",
      "name": "Pojazdy elektryczne"
    },
    
    // Kategoria artykułu
    "articleSection": "Blog o pojazdach elektrycznych",
    
    // Typ treści
    "genre": "Artykuł informacyjny"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}

/**
 * Alternatywny komponent z użyciem typu Article
 * 
 * Article to bardziej ogólny schemat niż BlogPosting i może być używany zamiennie.
 * BlogPosting jest preferowany dla treści blogowych, ale Article jest bardziej uniwersalny.
 * 
 * Użyj tego komponentu dla artykułów, które nie są stricte blogowymi postami,
 * np. artykuły informacyjne, poradniki, analizy rynkowe.
 */
export function ArticleStructuredData({
  title,
  description,
  author,
  publishedAt,
  modifiedAt,
  image,
  url,
  readingTime,
  tags
}: BlogPostStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    
    "headline": title,
    "description": description,
    "url": url,
    
    "author": {
      "@type": "Person",
      "name": author,
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
    
    "datePublished": publishedAt,
    "dateModified": modifiedAt || publishedAt,
    
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": image,
        "width": 1200,
        "height": 630
      }
    }),
    
    "keywords": tags.join(", "),
    "wordCount": readingTime * 200,
    "timeRequired": `PT${readingTime}M`,
    "inLanguage": "pl-PL",
    
    "about": {
      "@type": "Thing",
      "name": "Pojazdy elektryczne"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}

export function WebsiteStructuredData({
  name,
  description,
  url,
  logo,
  sameAs = []
}: WebsiteStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "description": description,
    "url": url,
    "logo": logo ? {
      "@type": "ImageObject",
      "url": logo
    } : undefined,
    "sameAs": sameAs,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": name,
      "logo": logo ? {
        "@type": "ImageObject",
        "url": logo
      } : undefined
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}

export function VehicleStructuredData({
  name,
  brand,
  model,
  year,
  price,
  currency,
  mileage,
  fuelType,
  description,
  image,
  url
}: VehicleStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "name": name,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "model": model,
    "vehicleModelDate": year.toString(),
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": currency,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "ivimarket.pl"
      }
    },
    "mileageFromOdometer": mileage ? {
      "@type": "QuantitativeValue",
      "value": mileage,
      "unitCode": "KMT"
    } : undefined,
    "fuelType": fuelType,
    "description": description,
    "image": image ? {
      "@type": "ImageObject",
      "url": image
    } : undefined,
    "url": url,
    "vehicleConfiguration": "Electric Vehicle"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "iViMarket",
    "alternateName": "ivimarket.pl",
    "description": "Marketplace pojazdów elektrycznych w Polsce",
    "url": "https://ivimarket.pl",
    "logo": "https://ivimarket.pl/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Polish", "pl"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PL"
    },
    "sameAs": [
      // Dodaj linki do mediów społecznościowych gdy będą dostępne
      // "https://www.facebook.com/ivimarket",
      // "https://twitter.com/ivimarket",
      // "https://www.linkedin.com/company/ivimarket"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}

export function PersonStructuredData({
  name,
  jobTitle,
  description,
  url,
  image,
  sameAs = []
}: {
  name: string
  jobTitle: string
  description: string
  url: string
  image?: string
  sameAs?: string[]
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": jobTitle,
    "description": description,
    "url": url,
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": image
      }
    }),
    "sameAs": sameAs,
    "worksFor": {
      "@type": "Organization",
      "name": "iViMarket",
      "url": "https://ivimarket.pl"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}
