'use client'

import { useState, useEffect, useCallback } from 'react'
import { useIsMobile } from './use-mobile'

interface MobileWarningState {
  shouldShowWarning: boolean
  isDismissed: boolean
  isMobile: boolean
}

interface MobileWarningActions {
  dismissWarning: () => void
  showWarning: () => void
  resetWarning: () => void
}

const STORAGE_KEY = 'mobile-warning-dismissed'

export function useMobileWarning(): MobileWarningState & MobileWarningActions {
  const isMobile = useIsMobile()
  const [isDismissed, setIsDismissed] = useState<boolean>(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (dismissed === 'true') {
      setIsDismissed(true)
    }
  }, [])

  const shouldShowWarning = isHydrated && isMobile && !isDismissed

  const dismissWarning = useCallback(() => {
    setIsDismissed(true)
    localStorage.setItem(STORAGE_KEY, 'true')
  }, [])

  const showWarning = useCallback(() => {
    setIsDismissed(false)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const resetWarning = useCallback(() => {
    setIsDismissed(false)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return {
    shouldShowWarning,
    isDismissed,
    isMobile: isHydrated ? isMobile : false,
    dismissWarning,
    showWarning,
    resetWarning,
  }
} 