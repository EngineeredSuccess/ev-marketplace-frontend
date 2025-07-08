import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Artykuł nie znaleziony
        </h1>
        <p className="text-gray-600 mb-8">
          Przepraszamy, ale artykuł o podanym adresie nie istnieje.
        </p>
        <Link 
          href="/blog"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Powrót do bloga
        </Link>
      </div>
    </div>
  )
}