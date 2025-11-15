import { ReactNode } from 'react';

// Use static generation for better performance
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <>{children}</>;
}
