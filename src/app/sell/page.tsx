'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { vehicleService, VehicleListingData } from '@/services/vehicleService'
import { ArrowLeft, Car, Battery, Zap, MapPin, Upload, X, CheckCircle, AlertCircle, User } from 'lucide-react'

interface VehicleFormData {
  make: string
  model: string
  year: number
  price: number
  batteryCapacity: number
  range: number
  chargingType: string
  location: string
  description: string
  mileage: number
  batteryType: 'Li-ion' | 'LiFePO4' | 'NMC' | 'LTO'
  driveType: 'FWD' | 'RWD' | 'AWD'
  powerOutput: number
  maxChargingSpeed: number
  efficiency: number
  chargingPorts: string[]
  autopilot: boolean
  heatedSeats: boolean
  heatPump: boolean
  photos: File[]
}

export default function SellPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState<VehicleFormData>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    batteryCapacity: 0,
    range: 0,
    chargingType: 'AC/DC',
    location: '',
    description: '',
    mileage: 0,
    batteryType: 'Li-ion',
    driveType: 'FWD',
    powerOutput: 0,
    maxChargingSpeed: 0,
    efficiency: 0,
    chargingPorts: [],
    autopilot: false,
    heatedSeats: false,
    heatPump: false,
    photos: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleChargingPortsChange = (port: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      chargingPorts: checked 
        ? [...prev.chargingPorts, port]
        : prev.chargingPorts.filter(p => p !== port)
    }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (formData.photos.length + files.length > 10) {
      setMessage({ type: 'error', text: 'Możesz dodać maksymalnie 10 zdjęć' })
      return
    }
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files] }))
  }

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const result = await vehicleService.createListing(formData)
      
      if (result) {
        setMessage({ type: 'success', text: 'Ogłoszenie zostało dodane pomyślnie!' })
        
        // Reset form
        setFormData({
          make: '',
          model: '',
          year: new Date().getFullYear(),
          price: 0,
          batteryCapacity: 0,
          range: 0,
          chargingType: 'AC/DC',
          location: '',
          description: '',
          mileage: 0,
          batteryType: 'Li-ion',
          driveType: 'FWD',
          powerOutput: 0,
          maxChargingSpeed: 0,
          efficiency: 0,
          chargingPorts: [],
          autopilot: false,
          heatedSeats: false,
          heatPump: false,
          photos: []
        })
        
        // Clear file input
        const fileInput = document.getElementById('photos') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      }
    } catch (error) {
      console.error('Error creating listing:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Wystąpił błąd podczas dodawania ogłoszenia.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          margin: '0 20px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #10b981',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 24px'
          }} />
          <p style={{ color: '#6b7280', fontSize: '16px', margin: '0' }}>
            Sprawdzanie stanu uwierzytelnienia...
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          padding: '20px 0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => router.push('/')}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white'
                }}
              >
                <ArrowLeft style={{ height: '20px', width: '20px' }} />
              </button>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                margin: '0'
              }}>
                Sprzedaj pojazd
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 80px)',
          padding: '40px 20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            maxWidth: '500px',
            width: '100%'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <User style={{ height: '40px', width: '40px', color: 'white' }} />
            </div>
            
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '16px'
            }}>
              Wymagane logowanie
            </h2>
            
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              marginBottom: '32px',
              lineHeight: '1.5'
            }}>
              Aby dodać ogłoszenie sprzedaży pojazdu elektrycznego, musisz być zalogowany w systemie.
            </p>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => router.push('/?auth=login')}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Zaloguj się
              </button>
              
              <button
                onClick={() => router.push('/?auth=register')}
                style={{
                  background: 'white',
                  color: '#10b981',
                  border: '2px solid #10b981',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#10b981'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white'
                  e.currentTarget.style.color = '#10b981'
                }}
              >
                Zarejestruj się
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        padding: '20px 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => router.push('/')}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: 'white'
              }}
            >
              <ArrowLeft style={{ height: '20px', width: '20px' }} />
            </button>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                margin: '0 0 4px 0'
              }}>
                Sprzedaj pojazd elektryczny
              </h1>
              <p style={{
                fontSize: '16px',
                margin: '0',
                opacity: '0.9'
              }}>
                Dodaj swoje ogłoszenie i znajdź kupca
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Message */}
        {message && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderRadius: '16px',
            marginBottom: '32px',
            background: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
            border: `2px solid ${message.type === 'success' ? '#10b981' : '#dc2626'}`,
            color: message.type === 'success' ? '#065f46' : '#991b1b'
          }}>
            {message.type === 'success' ? (
              <CheckCircle style={{ height: '20px', width: '20px' }} />
            ) : (
              <AlertCircle style={{ height: '20px', width: '20px' }} />
            )}
            <span style={{ fontSize: '16px', fontWeight: '500' }}>{message.text}</span>
          </div>
        )}

        {/* Form */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Car style={{ height: '20px', width: '20px', color: '#10b981' }} />
                Podstawowe informacje
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Marka *
                  </label>
                  <input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    required
                    placeholder="Tesla, BMW, Audi..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Model *
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                    placeholder="Model 3, i3, e-tron..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Rok produkcji *
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    min="2010"
                    max={new Date().getFullYear() + 1}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Cena (PLN) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="1000"
                    placeholder="150000"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Przebieg (km) *
                  </label>
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="50000"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Lokalizacja *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="Warszawa, Kraków..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Battery style={{ height: '20px', width: '20px', color: '#10b981' }} />
                Specyfikacja techniczna
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Pojemność baterii (kWh) *
                  </label>
                  <input
                    type="number"
                    name="batteryCapacity"
                    value={formData.batteryCapacity}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.1"
                    placeholder="75.0"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Zasięg (km) *
                  </label>
                  <input
                    type="number"
                    name="range"
                    value={formData.range}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="500"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Moc (kW) *
                  </label>
                  <input
                    type="number"
                    name="powerOutput"
                    value={formData.powerOutput}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="250"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Typ baterii *
                  </label>
                  <select
                    name="batteryType"
                    value={formData.batteryType}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      background: 'white',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  >
                    <option value="Li-ion">Li-ion</option>
                    <option value="LiFePO4">LiFePO4</option>
                    <option value="NMC">NMC</option>
                    <option value="LTO">LTO</option>
                  </select>
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Napęd *
                  </label>
                  <select
                    name="driveType"
                    value={formData.driveType}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      background: 'white',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  >
                    <option value="FWD">Przedni (FWD)</option>
                    <option value="RWD">Tylny (RWD)</option>
                    <option value="AWD">Wszystkie koła (AWD)</option>
                  </select>
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Maks. moc ładowania (kW)
                  </label>
                  <input
                    type="number"
                    name="maxChargingSpeed"
                    value={formData.maxChargingSpeed}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="150"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>
            </div>

            {/* Charging Ports */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Zap style={{ height: '20px', width: '20px', color: '#10b981' }} />
                Porty ładowania
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {['Type 2', 'CCS', 'CHAdeMO', 'Tesla Supercharger'].map(port => (
                  <label key={port} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: formData.chargingPorts.includes(port) ? '#f0fdf4' : 'white'
                  }}
                  onMouseEnter={(e) => {
                    if (!formData.chargingPorts.includes(port)) {
                      e.currentTarget.style.borderColor = '#10b981'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!formData.chargingPorts.includes(port)) {
                      e.currentTarget.style.borderColor = '#e5e7eb'
                    }
                  }}>
                    <input
                      type="checkbox"
                      checked={formData.chargingPorts.includes(port)}
                      onChange={(e) => handleChargingPortsChange(port, e.target.checked)}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: '#10b981'
                      }}
                    />
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      {port}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Features */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '20px'
              }}>
                Wyposażenie
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {[
                  { key: 'autopilot', label: 'Autopilot' },
                  { key: 'heatedSeats', label: 'Podgrzewane fotele' },
                  { key: 'heatPump', label: 'Pompa ciepła' }
                ].map(feature => (
                  <label key={feature.key} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: formData[feature.key as keyof VehicleFormData] ? '#f0fdf4' : 'white'
                  }}
                  onMouseEnter={(e) => {
                    if (!formData[feature.key as keyof VehicleFormData]) {
                      e.currentTarget.style.borderColor = '#10b981'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!formData[feature.key as keyof VehicleFormData]) {
                      e.currentTarget.style.borderColor = '#e5e7eb'
                    }
                  }}>
                    <input
                      type="checkbox"
                      name={feature.key}
                      checked={formData[feature.key as keyof VehicleFormData] as boolean}
                      onChange={handleInputChange}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: '#10b981'
                      }}
                    />
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      {feature.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '20px'
              }}>
                Opis
              </h2>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Opis pojazdu *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Opisz swój pojazd, jego stan, historię serwisową, dodatkowe wyposażenie..."
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#10b981'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            {/* Photos */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Upload style={{ height: '20px', width: '20px', color: '#10b981' }} />
                Zdjęcia
              </h2>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Dodaj zdjęcia pojazdu
                </label>
                <input
                  type="file"
                  id="photos"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#10b981'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
                <p style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  margin: '6px 0 0 0'
                }}>
                  Możesz dodać maksymalnie 10 zdjęć (JPG, PNG)
                </p>
              </div>
              
              {formData.photos.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: '16px'
                }}>
                  {formData.photos.map((photo, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Zdjęcie ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '120px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          border: '2px solid #e5e7eb'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          background: '#dc2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                      >
                        <X style={{ height: '12px', width: '12px' }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div style={{
              borderTop: '2px solid #f3f4f6',
              paddingTop: '32px',
              textAlign: 'center'
            }}>
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '16px 40px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  minWidth: '200px'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                {isLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid white',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Dodawanie...
                  </div>
                ) : (
                  'Dodaj ogłoszenie'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* CSS Animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  )
}

