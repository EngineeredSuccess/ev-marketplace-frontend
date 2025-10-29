'use client'

import React from 'react'
import Image from 'next/image'

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  experience: string
  certifications: string[]
  linkedin?: string
  twitter?: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Michał Kowalski",
    role: "Główny Redaktor i Ekspert ds. Elektromobilności",
    bio: "Wizjoner elektromobilności z technicznym zacięciem byłego inżyniera. Łączy pasję do EV z precyzyjną analizą, tworząc wiarygodne źródło wiedzy. Przewiduje trendy i inspiruje, pokazując, jak technologia kształtuje przyszłość transportu i naszego życia.",
    image: "/team/placeholder-1.jpg",
    experience: "15+ lat w branży motoryzacyjnej",
    certifications: [
      "Inżynier Systemów Elektrycznych",
      "Certyfikat VDA (Verband der Automobilindustrie)",
      "Specjalista ds. Infrastruktury Ładowania"
    ],
    linkedin: "https://www.linkedin.com/in/michal-kowalski-ev",
    twitter: "https://twitter.com/michalkowalski_ev"
  }
]

export default function TeamSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Poznaj Nasz Zespół Ekspertów
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Za każdym artykułem stoją prawdziwi ludzie z pasją i doświadczeniem. 
          Poznaj ekspertów, którzy tworzą treści na iViMarket.
        </p>

        <div className="grid md:grid-cols-1 gap-12">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <div className="md:flex">
                {/* Image Section */}
                <div className="md:w-1/3 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center p-8">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    {/* Placeholder for image - replace with actual image */}
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <span className="text-6xl text-white font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:w-2/3 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-lg text-green-600 font-semibold mb-4">
                        {member.role}
                      </p>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex gap-3">
                      {member.linkedin && (
                        <a 
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                      {member.twitter && (
                        <a 
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors"
                          aria-label="Twitter/X"
                        >
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Experience Badge */}
                  <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold">{member.experience}</span>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                      Certyfikaty i Kwalifikacje
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.certifications.map((cert, certIndex) => (
                        <span 
                          key={certIndex}
                          className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
                        >
                          <svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Chcesz dołączyć do naszego zespołu?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Jesteśmy zawsze otwarci na współpracę z ekspertami, którzy dzielą naszą pasję do elektromobilności. 
            Jeśli masz doświadczenie w branży motoryzacyjnej lub EV, skontaktuj się z nami!
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Skontaktuj się z nami
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
