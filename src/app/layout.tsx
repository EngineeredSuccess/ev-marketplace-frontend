import { Metadata } from 'next'
import { WebsiteStructuredData, OrganizationStructuredData } from '@/components/seo/StructuredData'
import WebVitals from '@/components/analytics/WebVitals'

export const metadata: Metadata = {
  title: {
    default: 'iVi Market - Marketplace Pojazdów Elektrycznych w Polsce',
    template: '%s | iVi Market'
  },
  description: 'Największy marketplace pojazdów elektrycznych w Polsce. Kup lub sprzedaj samochód elektryczny. Tesla, BMW, Audi i więcej. Sprawdzone oferty, bezpieczne transakcje.',
  keywords: ['pojazdy elektryczne', 'samochody elektryczne', 'Tesla', 'marketplace', 'Polska', 'EV', 'sprzedaż', 'kupno', 'BMW', 'Audi', 'ładowanie', 'bateria'],
  authors: [{ name: 'iVi Market' }],
  creator: 'iVi Market',
  publisher: 'iVi Market',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://ivimarket.pl',
    siteName: 'iVi Market',
    title: 'iVi Market - Marketplace Pojazdów Elektrycznych',
    description: 'Największy marketplace pojazdów elektrycznych w Polsce. Sprawdzone oferty Tesla, BMW, Audi i innych marek.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'iVi Market - Marketplace Pojazdów Elektrycznych'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iVi Market - Marketplace Pojazdów Elektrycznych',
    description: 'Największy marketplace pojazdów elektrycznych w Polsce',
    images: ['/og-image.jpg']
  },
  alternates: {
    canonical: 'https://ivimarket.pl'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <head>
        <meta name="theme-color" content="#10b981" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <WebsiteStructuredData
          name="iVi Market"
          description="Największy marketplace pojazdów elektrycznych w Polsce. Kup lub sprzedaj samochód elektryczny. Tesla, BMW, Audi i więcej."
          url="https://ivimarket.pl"
          logo="https://ivimarket.pl/logo.png"
          sameAs={[]}
        />
        <OrganizationStructuredData />
        <WebVitals />
        {children}
      </body>
    </html>
  )
}