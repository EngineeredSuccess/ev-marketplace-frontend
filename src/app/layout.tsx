import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Polish EV Marketplace | Marketplace Pojazdów Elektrycznych',
  description: 'Find and sell electric vehicles in Poland. The best platform for EVs in Polska.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}