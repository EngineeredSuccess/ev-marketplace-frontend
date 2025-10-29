'use client'

import React from 'react'

export default function StandardsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Nasze Standardy Redakcyjne
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Jakość i rzetelność to fundament naszej pracy. Dowiedz się, jak tworzymy treści, 
          które możesz zaufać.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Verification Process */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Weryfikacja Faktów</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Każdy artykuł przechodzi przez <strong>rygorystyczny proces weryfikacji</strong>. 
              Sprawdzamy dane techniczne u producentów, porównujemy ze źródłami branżowymi 
              i weryfikujemy statystyki w oficjalnych raportach.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Minimum 2 niezależne źródła dla każdego faktu</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Weryfikacja danych technicznych u producentów</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Przegląd przez co najmniej dwóch ekspertów</span>
              </li>
            </ul>
          </div>

          {/* Content Updates */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Aktualizacja Treści</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Branża EV zmienia się błyskawicznie. <strong>Regularnie aktualizujemy nasze artykuły</strong>, 
              aby zawsze dostarczać najbardziej aktualne informacje o cenach, zasięgach i dostępności modeli.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Comiesięczny przegląd kluczowych artykułów</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Natychmiastowa aktualizacja przy zmianach cenowych</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Oznaczenie daty ostatniej aktualizacji</span>
              </li>
            </ul>
          </div>

          {/* Information Sources */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Źródła Informacji</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Opieramy się wyłącznie na <strong>renomowanych i weryfikowalnych źródłach</strong>. 
              Każdy artykuł zawiera linki do źródeł, dzięki czemu możesz samodzielnie sprawdzić informacje.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Oficjalne dane producentów pojazdów</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Raporty branżowe i badania naukowe</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Testy i recenzje z własnych doświadczeń</span>
              </li>
            </ul>
          </div>

          {/* Editorial Independence */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Niezależność Redakcyjna</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nasze opinie są <strong>całkowicie niezależne</strong> od producentów, dealerów 
              i reklamodawców. Piszemy prawdę, nawet jeśli nie jest wygodna dla branży.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-orange-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Brak wpływu reklamodawców na treść artykułów</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-orange-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Jasne oznaczenie treści sponsorowanych</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-orange-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Obiektywne recenzje i porównania</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
