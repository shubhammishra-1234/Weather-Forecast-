"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Droplets,
  Umbrella,
  ArrowDown,
  ArrowUp,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface DailyForecast {
  date: string
  day: string
  condition: string
  highTemp: number
  lowTemp: number
  windSpeed: number
  windDirection: string
  humidity: number
  precipitation: number
  precipitationChance: number
  sunrise: string
  sunset: string
  moonPhase: string
  uvIndex: number
}

interface ExtendedForecastProps {
  forecast: DailyForecast[]
  location: string
}

export default function ExtendedForecast({ forecast, location }: ExtendedForecastProps) {
  const [expandedDay, setExpandedDay] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("daily")

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return <Sun className="h-8 w-8 text-amber-500" />
      case "partly cloudy":
      case "cloudy":
        return <Cloud className="h-8 w-8 text-slate-500" />
      case "rainy":
      case "rain":
      case "showers":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      case "snowy":
      case "snow":
        return <CloudSnow className="h-8 w-8 text-blue-300" />
      case "stormy":
      case "thunderstorm":
        return <CloudLightning className="h-8 w-8 text-purple-500" />
      default:
        return <Sun className="h-8 w-8 text-amber-500" />
    }
  }

  const getUVIndexColor = (index: number) => {
    if (index <= 2) return "bg-green-500"
    if (index <= 5) return "bg-yellow-500"
    if (index <= 7) return "bg-orange-500"
    if (index <= 10) return "bg-red-500"
    return "bg-purple-500"
  }

  const getUVIndexText = (index: number) => {
    if (index <= 2) return "Low"
    if (index <= 5) return "Moderate"
    if (index <= 7) return "High"
    if (index <= 10) return "Very High"
    return "Extreme"
  }

  const getPrecipitationChanceColor = (chance: number) => {
    if (chance < 30) return "bg-green-500"
    if (chance < 60) return "bg-yellow-500"
    return "bg-blue-500"
  }

  const toggleDayExpansion = (date: string) => {
    if (expandedDay === date) {
      setExpandedDay(null)
    } else {
      setExpandedDay(date)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <span>Extended Forecast for {location}</span>
        </CardTitle>
        <CardDescription>10-day detailed weather forecast</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="daily">Daily View</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="mt-0">
            <div className="space-y-3">
              {forecast.map((day) => (
                <div key={day.date} className="rounded-lg overflow-hidden border">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    onClick={() => toggleDayExpansion(day.date)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">{getWeatherIcon(day.condition)}</div>
                      <div>
                        <p className="font-medium">{day.day}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{day.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="hidden md:flex items-center gap-2">
                        <Wind className="h-4 w-4 text-slate-500" />
                        <span>{day.windSpeed} km/h</span>
                      </div>
                      <div className="hidden md:flex items-center gap-2">
                        <Umbrella className="h-4 w-4 text-slate-500" />
                        <span>{day.precipitationChance}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowDown className="h-4 w-4 text-blue-500" />
                        <span>{day.lowTemp}°</span>
                        <ArrowUp className="h-4 w-4 text-red-500 ml-2" />
                        <span>{day.highTemp}°</span>
                      </div>
                      {expandedDay === day.date ? (
                        <ChevronUp className="h-5 w-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {expandedDay === day.date && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4 pt-2 border-t"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                          <h4 className="text-sm font-medium mb-2">Wind</h4>
                          <div className="flex items-center gap-2">
                            <Wind className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="font-medium">{day.windSpeed} km/h</p>
                              <p className="text-xs text-slate-500">Direction: {day.windDirection}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                          <h4 className="text-sm font-medium mb-2">Humidity & Precipitation</h4>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Droplets className="h-5 w-5 text-blue-500" />
                              <p className="font-medium">{day.humidity}%</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Umbrella className="h-5 w-5 text-blue-500" />
                              <div>
                                <p className="font-medium">{day.precipitation} mm</p>
                                <Badge className={`text-xs ${getPrecipitationChanceColor(day.precipitationChance)}`}>
                                  {day.precipitationChance}%
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                          <h4 className="text-sm font-medium mb-2">Sun & Moon</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-xs text-slate-500">Sunrise</p>
                              <p className="font-medium">{day.sunrise}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Sunset</p>
                              <p className="font-medium">{day.sunset}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-xs text-slate-500">Moon Phase</p>
                              <p className="font-medium">{day.moonPhase}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                          <h4 className="text-sm font-medium mb-2">UV Index</h4>
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 flex items-center justify-center">
                              <div
                                className={`absolute inset-0 rounded-full ${getUVIndexColor(day.uvIndex)} opacity-20`}
                              ></div>
                              <span className="text-lg font-bold">{day.uvIndex}</span>
                            </div>
                            <div>
                              <p className="font-medium">{getUVIndexText(day.uvIndex)}</p>
                              <p className="text-xs text-slate-500">
                                {day.uvIndex <= 2
                                  ? "No protection needed"
                                  : day.uvIndex <= 5
                                    ? "Protection recommended"
                                    : "Protection required"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <h4 className="text-sm font-medium mb-2">Weather Summary</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {day.condition} conditions with temperatures between {day.lowTemp}°C and {day.highTemp}°C.
                          {day.precipitationChance > 30
                            ? ` There is a ${day.precipitationChance}% chance of precipitation with expected rainfall of ${day.precipitation} mm.`
                            : " Precipitation is unlikely."}
                          {day.windSpeed > 20
                            ? ` Expect strong winds of ${day.windSpeed} km/h from the ${day.windDirection}.`
                            : ` Light winds of ${day.windSpeed} km/h from the ${day.windDirection}.`}
                          {day.uvIndex > 5
                            ? " UV index is high, sun protection is strongly recommended."
                            : day.uvIndex > 2
                              ? " Moderate UV levels, consider sun protection."
                              : " Low UV levels today."}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="mt-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-3 text-left">Day</th>
                    <th className="py-2 px-3 text-left">Condition</th>
                    <th className="py-2 px-3 text-center">Temp (°C)</th>
                    <th className="py-2 px-3 text-center">Wind (km/h)</th>
                    <th className="py-2 px-3 text-center">Precip (%)</th>
                    <th className="py-2 px-3 text-center">Humidity (%)</th>
                    <th className="py-2 px-3 text-center">UV Index</th>
                  </tr>
                </thead>
                <tbody>
                  {forecast.map((day) => (
                    <tr key={day.date} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-3">
                        <div>
                          <p className="font-medium">{day.day}</p>
                          <p className="text-xs text-slate-500">{day.date}</p>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          {getWeatherIcon(day.condition)}
                          <span>{day.condition}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-blue-500">{day.lowTemp}°</span>
                          <span>-</span>
                          <span className="text-red-500">{day.highTemp}°</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex flex-col items-center">
                          <span>{day.windSpeed}</span>
                          <span className="text-xs text-slate-500">{day.windDirection}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <Badge className={`${getPrecipitationChanceColor(day.precipitationChance)}`}>
                          {day.precipitationChance}%
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-center">{day.humidity}%</td>
                      <td className="py-3 px-3 text-center">
                        <div
                          className={`inline-flex items-center justify-center h-6 w-6 rounded-full ${getUVIndexColor(day.uvIndex)} text-white font-medium text-xs`}
                        >
                          {day.uvIndex}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
