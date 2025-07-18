import { supabase } from '@/lib/supabase'

export interface VehicleListingData {
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

export interface VehicleListing {
  id: number
  seller_id: number
  make: string
  model: string
  year: number
  price: number
  battery_capacity: number
  range: number
  charging_type: string
  location: string
  description: string
  mileage: number
  battery_type: string
  drive_type: string
  power_output: number
  max_charging_speed: number
  efficiency: number
  charging_ports: string[]
  autopilot: boolean
  heated_seats: boolean
  heat_pump: boolean
  photos: string[]
  status: 'active' | 'sold' | 'inactive'
  created_at: string
  updated_at: string
}

export const vehicleService = {
  // Create a new vehicle listing
  createListing: async (listingData: VehicleListingData): Promise<VehicleListing | null> => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('No authenticated user')

    // Get user profile to get the numeric ID
    const { data: profile } = await supabase
      .from('users')
      .select('id')
      .eq('auth_user_id', user.id)
      .single()

    if (!profile) throw new Error('User profile not found')

    // Upload photos first
    const photoUrls: string[] = []
    for (const photo of listingData.photos) {
      const fileName = `${Date.now()}-${photo.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('vehicle-photos')
        .upload(fileName, photo)

      if (uploadError) {
        console.error('Error uploading photo:', uploadError)
        continue
      }

      const { data: { publicUrl } } = supabase.storage
        .from('vehicle-photos')
        .getPublicUrl(fileName)

      photoUrls.push(publicUrl)
    }

    // Create the listing
    const { data, error } = await supabase
      .from('vehicles')
      .insert({
        seller_id: profile.id,
        make: listingData.make,
        model: listingData.model,
        year: listingData.year,
        price: listingData.price,
        battery_capacity: listingData.batteryCapacity,
        range: listingData.range,
        charging_type: listingData.chargingType,
        location: listingData.location,
        description: listingData.description,
        mileage: listingData.mileage,
        battery_type: listingData.batteryType,
        drive_type: listingData.driveType,
        power_output: listingData.powerOutput,
        max_charging_speed: listingData.maxChargingSpeed,
        efficiency: listingData.efficiency,
        charging_ports: listingData.chargingPorts,
        autopilot: listingData.autopilot,
        heated_seats: listingData.heatedSeats,
        heat_pump: listingData.heatPump,
        photos: photoUrls,
        status: 'active'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating vehicle listing:', error)
      throw error
    }

    return data
  },

  // Get user's listings
  getUserListings: async (): Promise<VehicleListing[]> => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('No authenticated user')

    // Get user profile to get the numeric ID
    const { data: profile } = await supabase
      .from('users')
      .select('id')
      .eq('auth_user_id', user.id)
      .single()

    if (!profile) throw new Error('User profile not found')

    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('seller_id', profile.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user listings:', error)
      throw error
    }

    return data || []
  },

  // Update listing status
  updateListingStatus: async (listingId: number, status: 'active' | 'sold' | 'inactive'): Promise<VehicleListing | null> => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('No authenticated user')

    // Get user profile to get the numeric ID
    const { data: profile } = await supabase
      .from('users')
      .select('id')
      .eq('auth_user_id', user.id)
      .single()

    if (!profile) throw new Error('User profile not found')

    const { data, error } = await supabase
      .from('vehicles')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', listingId)
      .eq('seller_id', profile.id) // Ensure user owns the listing
      .select()
      .single()

    if (error) {
      console.error('Error updating listing status:', error)
      throw error
    }

    return data
  },

  // Delete listing
  deleteListing: async (listingId: number): Promise<void> => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('No authenticated user')

    // Get user profile to get the numeric ID
    const { data: profile } = await supabase
      .from('users')
      .select('id')
      .eq('auth_user_id', user.id)
      .single()

    if (!profile) throw new Error('User profile not found')

    // First get the listing to delete photos
    const { data: listing } = await supabase
      .from('vehicles')
      .select('photos')
      .eq('id', listingId)
      .eq('seller_id', profile.id)
      .single()

    if (listing?.photos) {
      // Delete photos from storage
      for (const photoUrl of listing.photos) {
        const fileName = photoUrl.split('/').pop()
        if (fileName) {
          await supabase.storage
            .from('vehicle-photos')
            .remove([fileName])
        }
      }
    }

    // Delete the listing
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', listingId)
      .eq('seller_id', profile.id)

    if (error) {
      console.error('Error deleting listing:', error)
      throw error
    }
  },

  // Get all active listings (for browsing)
  getActiveListings: async (): Promise<VehicleListing[]> => {
    const { data, error } = await supabase
      .from('vehicles')
      .select(`
        *,
        users!vehicles_seller_id_fkey (
          first_name,
          last_name,
          is_company,
          company_name,
          is_verified
        )
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching active listings:', error)
      throw error
    }

    return data || []
  }
}