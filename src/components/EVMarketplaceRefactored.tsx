import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Vehicle } from '../types/Vehicle';
import { useAuth } from '../hooks/useAuth';
import { mockVehicles } from '../data/mockVehicles';

// Components
import { AuthModal } from './auth/AuthModal';
import { Navigation } from './marketplace/Navigation';
import { Footer } from './marketplace/Footer';
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { BlogPage } from './pages/BlogPage';
import { PrivacyPage } from './pages/PrivacyPage';

// Extend Window interface for GTM
declare global {
  interface Window {
    dataLayer: any[];
    hj?: any;
  }
}

export default function EVMarketplaceRefactored() {
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(mockVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [currentView, setCurrentView] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [filters, setFilters] = useState<{[key: string]: string}>({
    make: 'Wszystkie',
    priceRange: 'Wszystkie',
    year: 'Wszystkie',
    location: 'Wszystkie',
    batteryType: 'Wszystkie',
    driveType: 'Wszystkie',
    rangeCategory: 'Wszystkie',
    chargingSpeed: 'Wszystkie',
    batteryCapacity: 'Wszystkie',
    features: 'Wszystkie'
  });

  // Use the auth hook
  const {
    currentUser,
    isAuthenticated,
    showAuthModal,
    authMode,
    phoneVerificationStep,
    openAuthModal,
    closeAuthModal,
    logout,
    setAuthMode
  } = useAuth();

  // Initialize dataLayer for GTM
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
    }
  }, []);

  // Track page views when currentView changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: currentView === 'home' ? 'Strona główna' : 
                   currentView === 'browse' ? 'Przeglądaj pojazdy' :
                   currentView === 'blog' ? 'Blog' :
                   currentView === 'sell' ? 'Sprzedaj pojazd' :
                   currentView === 'details' ? 'Szczegóły pojazdu' : currentView,
        page_location: window.location.href,
        page_path: `/${currentView}`
      });
    }
  }, [currentView]);

  // Track vehicle interactions
  const trackVehicleEvent = (action: string, vehicleData?: any) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'vehicle_interaction',
        vehicle_action: action,
        vehicle_make: vehicleData?.make,
        vehicle_model: vehicleData?.model,
        vehicle_price: vehicleData?.price,
        vehicle_year: vehicleData?.year
      });
    }
  };

  // Filter vehicles function
  const filterVehicles = () => {
    let filtered = vehicles.filter(vehicle => {
      const matchesSearch = vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vehicle.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMake = filters.make === 'Wszystkie' || vehicle.make === filters.make;
      const matchesLocation = filters.location === 'Wszystkie' || vehicle.location === filters.location;
      const matchesYear = filters.year === 'Wszystkie' || vehicle.year.toString() === filters.year;
      
      // Price filter
      let matchesPrice = true;
      if (filters.priceRange !== 'Wszystkie') {
        const [min, max] = filters.priceRange.split('-').map(p => parseInt(p) * 1000);
        matchesPrice = vehicle.price >= min && (max ? vehicle.price <= max : true);
      }
      
      // EV-specific filters
      const matchesBatteryType = filters.batteryType === 'Wszystkie' || vehicle.batteryType === filters.batteryType;
      const matchesDriveType = filters.driveType === 'Wszystkie' || vehicle.driveType === filters.driveType;
      
      return matchesSearch && matchesMake && matchesLocation && matchesYear && matchesPrice &&
             matchesBatteryType && matchesDriveType;
    });
    
    setFilteredVehicles(filtered);
  };

  useEffect(() => {
    filterVehicles();
  }, [searchTerm, filters, vehicles]);

  const handleSellClick = () => {
    trackVehicleEvent('sell_intent');
    if (!isAuthenticated) {
      openAuthModal('register');
    } else {
      setCurrentView('sell');
    }
  };

  // Track search events
  const handleSearch = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'search',
        search_term: searchTerm,
        search_filters: Object.entries(filters).filter(([key, value]) => value !== 'Wszystkie'),
        search_results_count: filteredVehicles.length
      });
    }
  };

  // Vehicle Details Component (inline for now)
  const VehicleDetails = () => {
    if (!selectedVehicle) return null;

    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <button
          onClick={() => setCurrentView('browse')}
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
          ← Powrót do listy
        </button>

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          overflow: 'hidden'
        }}>
          <img
            src={selectedVehicle.photos?.[0] || "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600"}
            alt={`${selectedVehicle.make} ${selectedVehicle.model}`}
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
          />
          
          <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h1 style={{ 
                  fontSize: '32px', 
                  fontWeight: '800', 
                  color: '#1f2937',
                  margin: '0 0 8px 0'
                }}>
                  {selectedVehicle.make} {selectedVehicle.model}
                </h1>
                <p style={{ color: '#6b7280', fontSize: '18px', margin: '0' }}>{selectedVehicle.year}</p>
              </div>
              <div style={{ 
                fontSize: '32px', 
                fontWeight: '800',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {selectedVehicle.price.toLocaleString('pl-PL')} zł
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#1f2937' }}>
                  Specyfikacja techniczna
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'Pojemność baterii:', value: `${selectedVehicle.batteryCapacity} kWh` },
                    { label: 'Typ baterii:', value: selectedVehicle.batteryType },
                    { label: 'Zasięg WLTP:', value: `${selectedVehicle.range} km` },
                    { label: 'Moc silnika:', value: `${selectedVehicle.powerOutput} kW` },
                    { label: 'Rodzaj napędu:', value: selectedVehicle.driveType },
                    { label: 'Przebieg:', value: `${selectedVehicle.mileage?.toLocaleString('pl-PL')} km` },
                    { label: 'Lokalizacja:', value: selectedVehicle.location }
                  ].map(({ label, value }, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280' }}>{label}</span>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#1f2937' }}>
                  Kontakt ze sprzedającym
                </h3>
                {selectedVehicle.seller && (
                  <div style={{
                    background: '#f8fafc',
                    padding: '20px',
                    borderRadius: '16px'
                  }}>
                    <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                      {selectedVehicle.seller.name}
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <button 
                        onClick={() => trackVehicleEvent('contact_seller_phone', selectedVehicle)}
                        style={{
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          color: 'white',
                          border: 'none',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}>
                        📞 Zadzwoń: {selectedVehicle.seller.phone}
                      </button>
                      <button 
                        onClick={() => trackVehicleEvent('contact_seller_email', selectedVehicle)}
                        style={{
                          background: '#6b7280',
                          color: 'white',
                          border: 'none',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}>
                        ✉️ Wyślij wiadomość
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
                Opis
              </h3>
              <p style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '16px' }}>
                {selectedVehicle.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Cookie Banner Component (inline for now)
  const CookieBanner = () => {
    if (!showCookieBanner) return null;

    return (
      <div style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        background: 'rgba(31, 41, 55, 0.95)',
        color: 'white',
        padding: '20px',
        zIndex: 1000,
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.5' }}>
              Ta strona używa plików cookies w celu świadczenia usług na najwyższym poziomie. 
              Dalsze korzystanie ze strony oznacza, że zgadzasz się na ich użycie zgodnie z{' '}
              <button
                onClick={() => setCurrentView('privacy')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#10b981',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '14px',
                  padding: '0'
                }}
              >
                Polityką Prywatności
              </button>
              .
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowCookieBanner(false)}
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Akceptuję
            </button>
            <button
              onClick={() => {
                setCurrentView('privacy');
                setShowCookieBanner(false);
              }}
              style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Więcej informacji
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Google Tag Manager - Only load if GTM ID is available */}
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `,
          }}
        />
      )}
      
      {/* Hotjar Tracking Code - Only load in production, over HTTPS, and if ID is available */}
      {process.env.NODE_ENV === 'production' &&
       process.env.NEXT_PUBLIC_HOTJAR_ID &&
       typeof window !== 'undefined' &&
       window.location.protocol === 'https:' && (
        <Script
          id="hotjar-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      )}

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {/* Google Tag Manager (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{display: 'none', visibility: 'hidden'}}
            />
          </noscript>
        )}
        
        <Navigation 
          currentView={currentView}
          onViewChange={setCurrentView}
          onSellClick={handleSellClick}
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}
          onLogin={() => openAuthModal('login')}
          onRegister={() => openAuthModal('register')}
          onLogout={logout}
        />
        
        {currentView === 'home' && (
          <HomePage
            vehicles={vehicles}
            filteredVehicles={filteredVehicles}
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={handleSearch}
            onViewChange={setCurrentView}
            onVehicleSelect={setSelectedVehicle}
            onTrackEvent={trackVehicleEvent}
          />
        )}
        
        {currentView === 'browse' && (
          <BrowsePage
            filteredVehicles={filteredVehicles}
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={handleSearch}
            onVehicleSelect={setSelectedVehicle}
            onViewChange={setCurrentView}
            onTrackEvent={trackVehicleEvent}
          />
        )}
        
        {currentView === 'details' && <VehicleDetails />}
        {currentView === 'blog' && <BlogPage onViewChange={setCurrentView} />}
        {currentView === 'privacy' && <PrivacyPage onViewChange={setCurrentView} />}
        
        <Footer onViewChange={setCurrentView} />
        
        <AuthModal
          isOpen={showAuthModal}
          authMode={authMode}
          phoneVerificationStep={phoneVerificationStep}
          onClose={closeAuthModal}
          onAuthModeChange={setAuthMode}
        />
        
        <CookieBanner />
      </div>
    </>
  );
}