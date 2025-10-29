import React from 'react'
import { Metadata } from 'next'
import TeamSection from '@/components/about/TeamSection'
import MissionSection from '@/components/about/MissionSection'
import StandardsSection from '@/components/about/StandardsSection'
import TimelineSection from '@/components/about/TimelineSection'
import ContactSection from '@/components/about/ContactSection'
import { PersonStructuredData, OrganizationStructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'O Nas - iViMarket | Eksperci ds. Elektromobilności',
  description: 'Poznaj zespół ekspertów iViMarket. Doświadczeni inżynierowie, specjaliści ds. infrastruktury ładowania i pasjonaci elektromobilności dzielą się wiedzą o pojazdach elektrycznych.',
  keywords: 'o nas, redakcja, eksperci EV, elektromobilność, pojazdy elektryczne, blog motoryzacyjny',
  openGraph: {
    title: 'O Nas - iViMarket | Eksperci ds. Elektromobilności',
    description: 'Poznaj zespół ekspertów iViMarket. Doświadczeni inżynierowie i specjaliści dzielą się wiedzą o pojazdach elektrycznych.',
    url: 'https://ivimarket.pl/about',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <>
      {/* Dane strukturalne Schema.org */}
      <OrganizationStructuredData />
      <PersonStructuredData
        name="Michał Kowalski"
        jobTitle="Główny Redaktor i Ekspert ds. Elektromobilności"
        description="Wizjoner elektromobilności z technicznym zacięciem byłego inżyniera. Łączy pasję do EV z precyzyjną analizą, tworząc wiarygodne źródło wiedzy. Przewiduje trendy i inspiruje, pokazując, jak technologia kształtuje przyszłość transportu i naszego życia."
        url="https://ivimarket.pl/about"
        image="https://ivimarket.pl/team/michal-kowalski.jpg"
        sameAs={[
          "https://www.linkedin.com/in/michal-kowalski-ev",
          "https://twitter.com/michalkowalski_ev"
        ]}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-5xl font-bold mb-6 text-center">
              O Nas
            </h1>
            <p className="text-xl text-center max-w-3xl mx-auto leading-relaxed">
              Jesteśmy zespołem pasjonatów i ekspertów, którzy wierzą w przyszłość elektromobilności. 
              Naszą misją jest dostarczanie rzetelnej wiedzy, która pomaga Polakom podejmować świadome 
              decyzje o przejściu na pojazdy elektryczne.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <MissionSection />

        {/* Team Section */}
        <TeamSection />

        {/* Standards Section */}
        <StandardsSection />

        {/* Timeline Section */}
        <TimelineSection />

        {/* Contact Section */}
        <ContactSection />
      </div>
    </>
  )
}
