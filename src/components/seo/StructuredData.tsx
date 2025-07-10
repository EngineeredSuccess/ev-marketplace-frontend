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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "ivimarket.pl",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ivimarket.pl/logo.png"
      }
    },
    "datePublished": publishedAt,
    "dateModified": modifiedAt || publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "url": url,
    "image": image ? {
      "@type": "ImageObject",
      "url": image
    } : undefined,
    "keywords": tags.join(", "),
    "wordCount": readingTime * 200, // Approximate words based on reading time
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
    "name": "ivimarket.pl",
    "description": "Marketplace pojazdów elektrycznych w Polsce",
    "url": "https://ivimarket.pl",
    "logo": "https://ivimarket.pl/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "Polish"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PL"
    },
    "sameAs": [
      // Add social media links when available
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