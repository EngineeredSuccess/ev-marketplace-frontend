'use client'

import React from 'react'

interface TimelineEvent {
  year: string
  title: string
  description: string
  icon: 'rocket' | 'users' | 'trophy' | 'chart'
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2023",
    title: "Narodziny iViMarket",
    description: "Uruchomienie bloga z misją edukacji Polaków o elektromobilności. Pierwsze artykuły o podstawach technologii EV.",
    icon: "rocket"
  },
  {
    year: "2024",
    title: "Rosnąca Społeczność",
    description: "Osiągnięcie 10 000 miesięcznych czytelników. Publikacja ponad 100 szczegółowych analiz i recenzji pojazdów elektrycznych.",
    icon: "users"
  },
  {
    year: "2024",
    title: "Uznanie Branżowe",
    description: "Cytowanie przez główne media motoryzacyjne. Nawiązanie współpracy z ekspertami i producentami.",
    icon: "trophy"
  },
  {
    year: "2025",
    title: "Przyszłość: Marketplace",
    description: "Przygotowania do uruchomienia pierwszego w Polsce marketplace dedykowanego wyłącznie pojazdom elektrycznym.",
    icon: "chart"
  }
]

const getIcon = (iconType: string) => {
  switch(iconType) {
    case 'rocket':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case 'users':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    case 'trophy':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    case 'chart':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    default:
      return null
  }
}

export default function TimelineSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Nasza Historia i Osiągnięcia
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Od skromnych początków do jednego z najbardziej zaufanych źródeł wiedzy o EV w Polsce.
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-400 to-green-600"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div 
                key={index}
                className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold mb-3">
                      {event.year}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Icon */}
                <div className="hidden md:flex w-2/12 justify-center relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <div className="text-white">
                      {getIcon(event.icon)}
                    </div>
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
            <div className="text-gray-600">Opublikowanych Analiz</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Przetestowanych Modeli EV</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">10k+</div>
            <div className="text-gray-600">Miesięcznych Czytelników</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">2+</div>
            <div className="text-gray-600">Lata Doświadczenia</div>
          </div>
        </div>
      </div>
    </section>
  )
}
