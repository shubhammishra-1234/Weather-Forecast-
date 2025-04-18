"use client"

import { motion } from "framer-motion"
import { MapPin, Navigation, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface LocationPromptProps {
  onConfirm: (useGeolocation: boolean) => void
  onClose: () => void
}

export default function LocationPrompt({ onConfirm, onClose }: LocationPromptProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Location Access</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={18} />
            </Button>
          </div>
          <CardDescription>We need your location to provide accurate weather information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-sky-50 dark:bg-sky-900/30 p-4 rounded-lg flex items-start">
              <MapPin className="text-sky-500 mr-3 mt-1 flex-shrink-0" />
              <p className="text-sm text-slate-600 dark:text-slate-300">
                We've detected you're in a new location. Would you like to update your weather information?
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Button
                onClick={() => onConfirm(true)}
                className="bg-sky-500 hover:bg-sky-600 flex items-center justify-center gap-2 h-16"
              >
                <Navigation size={18} />
                Use my current location
              </Button>

              <Button
                variant="outline"
                onClick={() => onConfirm(false)}
                className="flex items-center justify-center gap-2 h-12"
              >
                <MapPin size={18} />
                Enter location manually
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Your location data is only used to provide weather information and is never shared with third parties.
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
