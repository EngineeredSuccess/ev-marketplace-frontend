'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { vehicleService, VehicleListingData } from '@/services/vehicleService'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Sprawdzanie stanu uwierzytelnienia...</p>
          </div>
        </Card>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8">
          <h1 className="text-2xl font-bold text-center mb-4">Dostęp zabroniony</h1>
          <p className="text-gray-600 text-center">Musisz być zalogowany, aby dodać ogłoszenie.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dodaj swój pojazd elektryczny</h1>
          <p className="text-gray-600 mt-2">Wypełnij formularz, aby dodać swoje ogłoszenie</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Podstawowe informacje</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
                    Marka *
                  </label>
                  <input
                    type="text"
                    id="make"
                    name="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    required
                    placeholder="Tesla, BMW, Audi..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                    Model *
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                    placeholder="Model 3, i3, e-tron..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                    Rok produkcji *
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    min="2010"
                    max={new Date().getFullYear() + 1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Cena (PLN) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1">
                    Przebieg (km) *
                  </label>
                  <input
                    type="number"
                    id="mileage"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Lokalizacja *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="Warszawa, Kraków..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Specyfikacja techniczna</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="batteryCapacity" className="block text-sm font-medium text-gray-700 mb-1">
                    Pojemność baterii (kWh) *
                  </label>
                  <input
                    type="number"
                    id="batteryCapacity"
                    name="batteryCapacity"
                    value={formData.batteryCapacity}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="range" className="block text-sm font-medium text-gray-700 mb-1">
                    Zasięg (km) *
                  </label>
                  <input
                    type="number"
                    id="range"
                    name="range"
                    value={formData.range}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="powerOutput" className="block text-sm font-medium text-gray-700 mb-1">
                    Moc (kW) *
                  </label>
                  <input
                    type="number"
                    id="powerOutput"
                    name="powerOutput"
                    value={formData.powerOutput}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="batteryType" className="block text-sm font-medium text-gray-700 mb-1">
                    Typ baterii *
                  </label>
                  <select
                    id="batteryType"
                    name="batteryType"
                    value={formData.batteryType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Li-ion">Li-ion</option>
                    <option value="LiFePO4">LiFePO4</option>
                    <option value="NMC">NMC</option>
                    <option value="LTO">LTO</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="driveType" className="block text-sm font-medium text-gray-700 mb-1">
                    Napęd *
                  </label>
                  <select
                    id="driveType"
                    name="driveType"
                    value={formData.driveType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="FWD">Przedni (FWD)</option>
                    <option value="RWD">Tylny (RWD)</option>
                    <option value="AWD">Wszystkie koła (AWD)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="maxChargingSpeed" className="block text-sm font-medium text-gray-700 mb-1">
                    Maks. moc ładowania (kW)
                  </label>
                  <input
                    type="number"
                    id="maxChargingSpeed"
                    name="maxChargingSpeed"
                    value={formData.maxChargingSpeed}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Charging Ports */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Porty ładowania</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Type 2', 'CCS', 'CHAdeMO', 'Tesla Supercharger'].map(port => (
                  <label key={port} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.chargingPorts.includes(port)}
                      onChange={(e) => handleChargingPortsChange(port, e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{port}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Wyposażenie</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="autopilot"
                    checked={formData.autopilot}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Autopilot</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="heatedSeats"
                    checked={formData.heatedSeats}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Podgrzewane fotele</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="heatPump"
                    checked={formData.heatPump}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Pompa ciepła</span>
                </label>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Opis</h2>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Opis pojazdu *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Opisz swój pojazd, jego stan, historię serwisową, dodatkowe wyposażenie..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical"
                />
              </div>
            </div>

            {/* Photos */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Zdjęcia</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-1">
                    Dodaj zdjęcia pojazdu
                  </label>
                  <input
                    type="file"
                    id="photos"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Możesz dodać maksymalnie 10 zdjęć</p>
                </div>
                
                {formData.photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Zdjęcie ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <Button
                type="submit"
                disabled={isLoading}
                className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Dodawanie...' : 'Dodaj ogłoszenie'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}