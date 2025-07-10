'use client'

import { useEffect } from 'react'
import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals'
import { reportWebVital, initPerformanceOptimizations } from '@/lib/performance'

export default function WebVitals() {
  useEffect(() => {
    // Initialize performance optimizations
    initPerformanceOptimizations()

    // Report Core Web Vitals
    onCLS(reportWebVital)
    onFCP(reportWebVital)
    onLCP(reportWebVital)
    onTTFB(reportWebVital)

    // Report INP (Interaction to Next Paint) - replaces FID in web-vitals v5+
    try {
      onINP(reportWebVital)
    } catch (error) {
      // INP not supported in this environment
      console.debug('INP metric not supported:', error)
    }
  }, [])

  // This component doesn't render anything
  return null
}