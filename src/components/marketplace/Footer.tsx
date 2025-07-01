import React from 'react';

interface FooterProps {
  onViewChange: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  return (
    <footer style={{
      background: '#1f2937',
      color: 'white',
      padding: '40px 0 20px',
      marginTop: '60px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '40px',
          marginBottom: '32px'
        }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#10b981' }}>
              iVi Market
            </h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#9ca3af', marginBottom: '16px' }}>
              Marketplace pojazdów elektrycznych w Polsce. Znajdź swój wymarzony pojazd elektryczny 
              lub sprzedaj swój obecny w bezpieczny sposób.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ 
                background: '#374151', 
                padding: '8px', 
                borderRadius: '8px',
                fontSize: '12px'
              }}>
                🔋 Tylko pojazdy elektryczne
              </div>
              <div style={{ 
                background: '#374151', 
                padding: '8px', 
                borderRadius: '8px',
                fontSize: '12px'
              }}>
                ✅ Zweryfikowani sprzedawcy
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'white' }}>
              Informacje prawne
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => onViewChange('terms')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '4px 0'
                }}
              >
                Regulamin serwisu
              </button>
              <button
                onClick={() => onViewChange('privacy')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '4px 0'
                }}
              >
                Polityka prywatności
              </button>
              <a 
                href="mailto:rodo@ivimarket.pl"
                style={{
                  color: '#9ca3af',
                  fontSize: '14px',
                  textDecoration: 'none',
                  padding: '4px 0'
                }}
              >
                Kontakt RODO
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'white' }}>
              Kontakt
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#9ca3af' }}>
              <div>iVi Market Sp. z o.o.</div>
              <div>ul. Marszałkowska 1</div>
              <div>00-001 Warszawa</div>
              <div>NIP: 1234567890</div>
              <div>KRS: 0000123456</div>
              <a 
                href="mailto:kontakt@ivimarket.pl"
                style={{ color: '#10b981', textDecoration: 'none' }}
              >
                kontakt@ivimarket.pl
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'white' }}>
              Dla konsumentów
            </h4>
            <div style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '12px' }}>
                Platforma ODR (Online Dispute Resolution):
              </p>
              <a 
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#10b981', textDecoration: 'none', fontSize: '13px' }}
              >
                ec.europa.eu/consumers/odr
              </a>
              <p style={{ marginTop: '12px', fontSize: '13px' }}>
                Urząd Ochrony Konkurencji i Konsumentów: 
                <a 
                  href="https://www.uokik.gov.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#10b981', textDecoration: 'none', marginLeft: '4px' }}
                >
                  www.uokik.gov.pl
                </a>
              </p>
            </div>
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid #374151', 
          paddingTop: '20px', 
          textAlign: 'center',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <p style={{ margin: '0' }}>
            © {new Date().getFullYear()} iVi Market Sp. z o.o. Wszelkie prawa zastrzeżone.
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>
            Serwis jest obecnie w fazie rozwoju. Wszystkie dane mają charakter demonstracyjny.
          </p>
        </div>
      </div>
    </footer>
  );
};