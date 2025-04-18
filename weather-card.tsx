"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Cloud, CloudRain, Sun, Wind, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface WeatherCardProps {
  weather: {
    id: number
    location: string
    temperature: number
    condition: string
    humidity: number
    windSpeed: number
    feelsLike: number
    high: number
    low: number
  }
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const [expanded, setExpanded] = useState(false)

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="text-amber-500" size={36} />
      case "rainy":
        return <CloudRain className="text-blue-500" size={36} />
      case "cloudy":
      case "partly cloudy":
        return <Cloud className="text-slate-500" size={36} />
      default:
        return <Sun className="text-amber-500" size={36} />
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-none shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{weather.location}</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {getWeatherIcon(weather.condition)}
                <span className="text-3xl font-bold ml-3">{weather.temperature}°C</span>
              </div>
              <div className="text-right">
                <p className="text-slate-600 dark:text-slate-300">{weather.condition}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Feels like {weather.feelsLike}°C</p>
              </div>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center justify-center w-full mt-4 text-sky-500 hover:text-sky-600 transition-colors"
            >
              {expanded ? (
                <>
                  <span className="mr-1">Less</span>
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  <span className="mr-1">More</span>
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-sky-50 dark:bg-slate-700/50 p-4 grid grid-cols-2 gap-3"
            >
              <div className="flex items-center">
                <Cloud className="text-sky-500 mr-2" size={16} />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Humidity</p>
                  <p className="font-medium">{weather.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center">
                <Wind className="text-sky-500 mr-2" size={16} />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Wind</p>
                  <p className="font-medium">{weather.windSpeed} km/h</p>
                </div>
              </div>
              <div className="flex items-center">
                <Sun className="text-amber-500 mr-2" size={16} />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">High</p>
                  <p className="font-medium">{weather.high}°C</p>
                </div>
              </div>
              <div className="flex items-center">
                <CloudRain className="text-blue-500 mr-2" size={16} />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Low</p>
                  <p className="font-medium">{weather.low}°C</p>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
