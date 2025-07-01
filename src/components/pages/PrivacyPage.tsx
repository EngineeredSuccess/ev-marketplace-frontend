import React from 'react';

interface PrivacyPageProps {
  onViewChange: (view: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onViewChange }) => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <button
        onClick={() => onViewChange('home')}
        style={{
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          color: '#10b981',
          background: 'transparent',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
        ← Powrót do strony głównej
      </button>

      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '40px'
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '800', 
          marginBottom: '32px', 
          color: '#1f2937'
        }}>
          Polityka Prywatności
        </h1>

        <div style={{ lineHeight: '1.6', color: '#4b5563' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
            1. Administrator danych
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Administratorem Państwa danych osobowych jest iVi Market Sp. z o.o. z siedzibą w Warszawie, 
            ul. Marszałkowska 1, 00-001 Warszawa, NIP: 1234567890, wpisana do Krajowego Rejestru Sądowego 
            pod numerem KRS 0000123456.
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
            2. Cele i podstawy prawne przetwarzania danych
          </h2>
          <p style={{ marginBottom: '16px' }}>Przetwarzamy Państwa dane osobowe w następujących celach:</p>
          <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Świadczenie usług marketplace</strong> - na podstawie art. 6 ust. 1 lit. b RODO (wykonanie umowy)
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Weryfikacja tożsamości użytkowników</strong> - na podstawie art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes)
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Marketing bezpośredni</strong> - na podstawie art. 6 ust. 1 lit. a RODO (zgoda) - tylko za zgodą
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Wypełnienie obowiązków prawnych</strong> - na podstawie art. 6 ust. 1 lit. c RODO
            </li>
          </ul>

          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
            3. Kategorie przetwarzanych danych
          </h2>
          <p style={{ marginBottom: '16px' }}>Przetwarzamy następujące kategorie danych osobowych:</p>
          <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Dane identyfikacyjne (imię, nazwisko, numer telefonu, adres e-mail)</li>
            <li style={{ marginBottom: '8px' }}>Dane adresowe (adres zamieszkania/siedziby)</li>
            <li style={{ marginBottom: '8px' }}>Dane firmowe (nazwa firmy, NIP) - w przypadku kont firmowych</li>
            <li style={{ marginBottom: '8px' }}>Dane techniczne (adres IP, informacje o urządzeniu, cookies)</li>
          </ul>

          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
            4. Okres przechowywania danych
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Dane osobowe przechowujemy przez okres niezbędny do realizacji celów, dla których zostały zebrane, 
            nie dłużej niż przez 5 lat od zakończenia współpracy, z zastrzeżeniem przepisów prawa nakazujących 
            dłuższe przechowywanie danych.
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
            5. Prawa osób, których dane dotyczą
          </h2>
          <p style={{ marginBottom: '16px' }}>Przysługują Państwu następujące prawa:</p>
          <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Prawo dostępu do danych (art. 15 RODO)</li>
            <li style={{ marginBottom: '8px' }}>Prawo do sprostowania danych (art. 16 RODO)</li>
            <li style={{ marginBottom: '8px' }}>Prawo do usunięcia danych (art. 17 RODO)</li>
            <li style={{ marginBottom: '8px' }}>Prawo do ograniczenia przetwarzania (art. 18 RODO)</li>
            <li style={{ marginBottom: '8px' }}>Prawo do przenoszenia danych (art. 20 RODO)</li>
            <li style={{ marginBottom: '8px' }}>Prawo sprzeciwu (art. 21 RODO)</li>
            <li style={{ marginBottom: '8px' }}>Prawo do cofnięcia zgody (art. 7 ust. 3 RODO)</li>
          </ul>

          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
            6. Kontakt w sprawach ochrony danych
          </h2>
          <p style={{ marginBottom: '24px' }}>
            W sprawach dotyczących ochrony danych osobowych można się kontaktować pod adresem e-mail: 
            <strong> rodo@ivimarket.pl</strong> lub pisemnie na adres siedziby spółki.
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
            7. Prawo do wniesienia skargi
          </h2>
          <p style={{ marginBottom: '24px' }}>
            W przypadku naruszenia przepisów o ochronie danych osobowych przysługuje Państwu prawo wniesienia 
            skargi do Prezesa Urzędu Ochrony Danych Osobowych.
          </p>

          <div style={{ 
            background: '#f0fdf4', 
            padding: '16px', 
            borderRadius: '12px', 
            marginTop: '32px',
            border: '1px solid #bbf7d0'
          }}>
            <p style={{ margin: '0', fontSize: '14px', color: '#166534' }}>
              <strong>Ostatnia aktualizacja:</strong> {new Date().toLocaleDateString('pl-PL')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};