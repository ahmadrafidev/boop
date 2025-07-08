'use client'

import { AlertTriangle, X, Monitor } from 'lucide-react'
import { useMobileWarning } from '@/hooks/use-mobile-warning'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface MobileWarningProps {
  message?: string
  description?: string
  overlay?: boolean
  className?: string
}

export function MobileWarning({
  message = "This application is optimized for desktop use and may not function properly on mobile devices.",
  description = "For the best experience, please use a desktop or tablet device.",
  overlay = false,
  className = "",
}: MobileWarningProps) {
  const { shouldShowWarning, dismissWarning } = useMobileWarning()

  if (!shouldShowWarning) {
    return null
  }

  const WarningContent = () => (
    <Alert className={`border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950 ${className}`}>
      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <div className="flex-1">
        <AlertTitle className="text-amber-800 dark:text-amber-200">
          Mobile Device Detected
        </AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-300 mt-2">
          {message}
          <br />
          <span className="text-sm mt-1 block">{description}</span>
        </AlertDescription>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={dismissWarning}
        className="ml-2 h-auto p-1 text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200"
        aria-label="Dismiss warning"
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  )

  const OverlayContent = () => (
    <Card className="bg-white dark:bg-gray-900 max-w-md mx-auto shadow-2xl border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Mobile Device Detected
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {message}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-start gap-3 mb-6 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
          <Monitor className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
            {description}
          </span>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={dismissWarning}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700"
          >
            I Understand
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <OverlayContent />
        </div>
      </div>
    )
  }

  return <WarningContent />
}

export function MobileWarningBanner() {
  const { shouldShowWarning, dismissWarning } = useMobileWarning()

  if (!shouldShowWarning) {
    return null
  }

  return (
    <div className="bg-amber-100 border-b border-amber-200 dark:bg-amber-950 dark:border-amber-800">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mr-2" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Mobile Warning:</strong> This app may not work properly on mobile devices.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={dismissWarning}
            className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200 p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MobileWarning;

MobileWarning.displayName = "MobileWarning";
