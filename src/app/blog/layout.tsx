import { ReactNode } from 'react'

// Force dynamic rendering for all blog pages
export const dynamic = 'force-dynamic'

interface BlogLayoutProps {
  children: ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <>{children}</>
}