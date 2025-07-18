# 🗄️ Database Schema for Account Management & Vehicle Listings

## 📋 **Overview**
This document outlines the database schema required for the new account management and vehicle listing features implemented in the iVi Market application.

## 🔧 **Required Database Tables**

### **1. Users Table (Enhanced)**
The existing `users` table needs to be enhanced with additional fields for profile management:

```sql
-- Enhanced users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### **2. Vehicles Table (New)**
Create a new table for vehicle listings:

```sql
-- Create vehicles table
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL CHECK (year >= 2010 AND year <= EXTRACT(YEAR FROM NOW()) + 1),
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    battery_capacity DECIMAL(5,1) NOT NULL CHECK (battery_capacity >= 0),
    range INTEGER NOT NULL CHECK (range >= 0),
    charging_type VARCHAR(50) NOT NULL DEFAULT 'AC/DC',
    location VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    mileage INTEGER NOT NULL CHECK (mileage >= 0),
    battery_type VARCHAR(20) NOT NULL CHECK (battery_type IN ('Li-ion', 'LiFePO4', 'NMC', 'LTO')),
    drive_type VARCHAR(10) NOT NULL CHECK (drive_type IN ('FWD', 'RWD', 'AWD')),
    power_output DECIMAL(6,1) NOT NULL CHECK (power_output >= 0),
    max_charging_speed DECIMAL(6,1) DEFAULT 0 CHECK (max_charging_speed >= 0),
    efficiency DECIMAL(4,1) DEFAULT 0 CHECK (efficiency >= 0),
    charging_ports TEXT[] DEFAULT '{}',
    autopilot BOOLEAN DEFAULT FALSE,
    heated_seats BOOLEAN DEFAULT FALSE,
    heat_pump BOOLEAN DEFAULT FALSE,
    photos TEXT[] DEFAULT '{}',
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'sold', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_vehicles_seller_id ON vehicles(seller_id);
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_make_model ON vehicles(make, model);
CREATE INDEX idx_vehicles_price ON vehicles(price);
CREATE INDEX idx_vehicles_year ON vehicles(year);
CREATE INDEX idx_vehicles_location ON vehicles(location);
CREATE INDEX idx_vehicles_created_at ON vehicles(created_at);

-- Create trigger for updated_at
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### **3. Storage Bucket for Vehicle Photos**
Create a storage bucket for vehicle photos:

```sql
-- Create storage bucket for vehicle photos
INSERT INTO storage.buckets (id, name, public) VALUES ('vehicle-photos', 'vehicle-photos', true);

-- Set up RLS policies for vehicle photos
CREATE POLICY "Users can upload vehicle photos" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'vehicle-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Users can view vehicle photos" ON storage.objects
    FOR SELECT USING (bucket_id = 'vehicle-photos');

CREATE POLICY "Users can update their own vehicle photos" ON storage.objects
    FOR UPDATE USING (bucket_id = 'vehicle-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own vehicle photos" ON storage.objects
    FOR DELETE USING (bucket_id = 'vehicle-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## 🔐 **Row Level Security (RLS) Policies**

### **Users Table Policies**
```sql
-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth_user_id = auth.uid()::text);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth_user_id = auth.uid()::text);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (auth_user_id = auth.uid()::text);
```

### **Vehicles Table Policies**
```sql
-- Enable RLS on vehicles table
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Anyone can view active vehicle listings
CREATE POLICY "Anyone can view active vehicles" ON vehicles
    FOR SELECT USING (status = 'active');

-- Users can view all their own vehicles
CREATE POLICY "Users can view own vehicles" ON vehicles
    FOR SELECT USING (seller_id IN (
        SELECT id FROM users WHERE auth_user_id = auth.uid()::text
    ));

-- Users can insert their own vehicle listings
CREATE POLICY "Users can insert own vehicles" ON vehicles
    FOR INSERT WITH CHECK (seller_id IN (
        SELECT id FROM users WHERE auth_user_id = auth.uid()::text
    ));

-- Users can update their own vehicle listings
CREATE POLICY "Users can update own vehicles" ON vehicles
    FOR UPDATE USING (seller_id IN (
        SELECT id FROM users WHERE auth_user_id = auth.uid()::text
    ));

-- Users can delete their own vehicle listings
CREATE POLICY "Users can delete own vehicles" ON vehicles
    FOR DELETE USING (seller_id IN (
        SELECT id FROM users WHERE auth_user_id = auth.uid()::text
    ));
```

## 📊 **Sample Data Structure**

### **Enhanced User Profile Example**
```json
{
  "id": 1,
  "auth_user_id": "uuid-from-supabase-auth",
  "email": "john.doe@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+48 123 456 789",
  "is_company": false,
  "street": "ul. Przykładowa 123",
  "city": "Warszawa",
  "postal_code": "00-001",
  "country": "Polska",
  "company_name": null,
  "nip": null,
  "avatar_url": "https://example.com/avatar.jpg",
  "bio": "Entuzjasta pojazdów elektrycznych",
  "is_verified": true,
  "auth_provider": "google",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z"
}
```

### **Vehicle Listing Example**
```json
{
  "id": 1,
  "seller_id": 1,
  "make": "Tesla",
  "model": "Model 3",
  "year": 2023,
  "price": 180000.00,
  "battery_capacity": 75.0,
  "range": 500,
  "charging_type": "AC/DC",
  "location": "Warszawa",
  "description": "Doskonały stan, jeden właściciel, pełna dokumentacja serwisowa.",
  "mileage": 25000,
  "battery_type": "Li-ion",
  "drive_type": "RWD",
  "power_output": 283.0,
  "max_charging_speed": 250.0,
  "efficiency": 15.0,
  "charging_ports": ["Type 2", "CCS"],
  "autopilot": true,
  "heated_seats": true,
  "heat_pump": true,
  "photos": [
    "https://supabase.co/storage/v1/object/public/vehicle-photos/photo1.jpg",
    "https://supabase.co/storage/v1/object/public/vehicle-photos/photo2.jpg"
  ],
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

## 🚀 **Implementation Steps**

### **Step 1: Database Setup**
1. Run the SQL commands above in your Supabase SQL editor
2. Verify that all tables and indexes are created
3. Test the RLS policies

### **Step 2: Storage Setup**
1. Create the `vehicle-photos` storage bucket
2. Configure the bucket policies
3. Test photo upload functionality

### **Step 3: Application Integration**
1. The application services are already implemented:
   - `authService.updateUserProfile()` for profile updates
   - `vehicleService.createListing()` for vehicle listings
   - `vehicleService.getUserListings()` for user's listings

### **Step 4: Testing**
1. Test user profile updates via `/account` page
2. Test vehicle listing creation via `/sell` page
3. Verify authentication and authorization

## 🔍 **Database Queries for Common Operations**

### **Get User Profile with Listings Count**
```sql
SELECT 
    u.*,
    COUNT(v.id) as total_listings,
    COUNT(CASE WHEN v.status = 'active' THEN 1 END) as active_listings
FROM users u
LEFT JOIN vehicles v ON u.id = v.seller_id
WHERE u.auth_user_id = $1
GROUP BY u.id;
```

### **Get Active Vehicle Listings with Seller Info**
```sql
SELECT 
    v.*,
    u.first_name,
    u.last_name,
    u.is_company,
    u.company_name,
    u.is_verified,
    u.phone
FROM vehicles v
JOIN users u ON v.seller_id = u.id
WHERE v.status = 'active'
ORDER BY v.created_at DESC
LIMIT 20 OFFSET $1;
```

### **Search Vehicles**
```sql
SELECT v.*, u.first_name, u.last_name, u.is_verified
FROM vehicles v
JOIN users u ON v.seller_id = u.id
WHERE v.status = 'active'
    AND ($1 IS NULL OR LOWER(v.make) LIKE LOWER($1 || '%'))
    AND ($2 IS NULL OR LOWER(v.model) LIKE LOWER($2 || '%'))
    AND ($3 IS NULL OR v.price <= $3)
    AND ($4 IS NULL OR v.year >= $4)
    AND ($5 IS NULL OR LOWER(v.location) LIKE LOWER('%' || $5 || '%'))
ORDER BY v.created_at DESC;
```

## ✅ **Features Implemented**

### **Account Management**
- ✅ User profile editing (name, address, contact info)
- ✅ Company profile support (company name, NIP)
- ✅ Bio and avatar support
- ✅ Authentication-protected routes
- ✅ Form validation and error handling

### **Vehicle Listings**
- ✅ Comprehensive vehicle listing form
- ✅ Technical specifications (battery, range, power)
- ✅ Multiple photo upload support
- ✅ Feature checkboxes (autopilot, heated seats, etc.)
- ✅ Charging port selection
- ✅ Authentication-protected listing creation
- ✅ Form validation and error handling

### **Navigation & UX**
- ✅ User dropdown menu with account settings access
- ✅ Direct navigation to sell page
- ✅ Responsive design
- ✅ Polish language interface
- ✅ Proper authentication flow integration

## 🎯 **Next Steps**
1. **Deploy Database Schema**: Run the SQL commands in your Supabase instance
2. **Test with Real Authentication**: Complete OAuth flow and test all features
3. **Add Listing Management**: Create a page to view/edit/delete user's listings
4. **Implement Search & Filters**: Add vehicle search functionality
5. **Add Photo Management**: Implement photo editing and reordering
6. **Email Notifications**: Add email alerts for new listings, inquiries, etc.

The foundation for both account management and vehicle listings is now complete and ready for production use!