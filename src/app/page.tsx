import EVMarketplace from '../components/EVMarketplaceRedirected';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketplace Pojazdów Elektrycznych - Kup Tesla, BMW, Audi | iVi Market',
  description: 'Znajdź idealny pojazd elektryczny w Polsce. Tesla Model 3, BMW iX, Audi e-tron. Sprawdzone oferty, bezpieczne transakcje, najlepsze ceny. Ponad 500 pojazdów w bazie.',
  keywords: 'Tesla Model 3, BMW iX, Audi e-tron, pojazdy elektryczne Warszawa, samochody elektryczne Kraków, EV marketplace Polska',
  alternates: {
    canonical: 'https://ivimarket.pl'
  }
};

export default function Home() {
  return <EVMarketplace />;
}