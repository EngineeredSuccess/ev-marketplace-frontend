# Vercel Deployment Fix

## Issue
The Vercel deployment was failing with TypeScript errors related to the `UserProfile` interface missing the `phone` property.

## Error Details
```
Type error: Object literal may only specify known properties, and 'phone' does not exist in type 'Omit<UserProfile, "id" | "is_verified">'.
```

## Root Cause
The `UserProfile` interface in `src/services/authService.ts` was missing the `phone` field, but it was being used throughout the application, including in:
- `src/components/auth/RegistrationForm.tsx`
- `src/types/User.ts`
- Various other components and utilities

## Solution Applied

### 1. Updated UserProfile Interface
**File**: `src/services/authService.ts`
- Added `phone: string` to the `UserProfile` interface

### 2. Updated registerUser Function
**File**: `src/services/authService.ts`
- Added `phone: userData.phone || '',` to the `createUserProfile` call

### 3. Fixed RegistrationForm
**File**: `src/components/auth/RegistrationForm.tsx`
- Added `auth_provider: 'phone'` to the `createUserProfile` call to satisfy the interface requirements

## Changes Made

### src/services/authService.ts
```typescript
export interface UserProfile {
  id: number
  phone: string  // ← Added this field
  email: string
  first_name: string
  last_name: string
  is_company: boolean
  street: string
  city: string
  postal_code: string
  country: string
  company_name?: string
  nip?: string
  is_verified: boolean
  auth_provider: string
}
```

### src/components/auth/RegistrationForm.tsx
```typescript
await authService.createUserProfile({
  phone: phone,
  email: formData.email,
  first_name: formData.firstName,
  last_name: formData.lastName,
  is_company: formData.isCompany,
  street: formData.street || '',
  city: formData.city,
  postal_code: formData.postalCode || '',
  country: 'Poland',
  company_name: formData.isCompany ? formData.companyName : undefined,
  nip: formData.isCompany ? formData.nip : undefined,
  auth_provider: 'phone'  // ← Added this field
})
```

## Expected Result
- ✅ TypeScript compilation should now pass
- ✅ Vercel deployment should succeed
- ✅ All phone-related functionality should work correctly
- ✅ Google OAuth fix remains intact

## Verification
Run `npm run build` to verify that all TypeScript errors are resolved before deploying to Vercel.