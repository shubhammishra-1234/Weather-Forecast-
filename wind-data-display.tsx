"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wind, Compass, ArrowUp, Navigation } from "lucide-react"
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

interface WindDataPoint {
  time: string
  speed: number
  direction: string
  directionDegrees: number
  gust: number
}

interface WindDataDisplayProps {
  windData: WindDataPoint[]
  location: string
  currentWindSpeed: number
  currentWindDirection: string
  currentWindGust: number
}

export default function WindDataDisplay({
  windData,
  location,
  currentWindSpeed,
  currentWindDirection,
  currentWindGust,
}: WindDataDisplayProps) {
  const [activeTab, setActiveTab] = useState("current")

  // Convert direction string to degrees for the compass
  const getDirectionDegrees = (direction: string): number => {
    const directions: Record<string, number> = {
      N: 0,
      NNE: 22.5,
      NE: 45,
      ENE: 67.5,
      E: 90,
      ESE: 112.5,
      SE: 135,
      SSE: 157.5,
      S: 180,
      SSW: 202.5,
      SW: 225,
      WSW: 247.5,
      W: 270,
      WNW: 292.5,
      NW: 315,
      NNW: 337.5,
    }
    return directions[direction] || 0
  }

  // Prepare data for radar chart
  const radarData = windData.map((point) => ({
    subject: point.time,
    speed: point.speed,
    gust: point.gust,
    fullMark: 50,
  }))

  // Format tooltip for bar chart
  const formatTooltipValue = (value: number, name: string) => {
    if (name === "speed") return [`${value} km/h`, "Wind Speed"]
    if (name === "gust") return [`${value} km/h`, "Wind Gust"]
    return [`${value}`, name]
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="h-5 w-5" />
          <span>Wind Data for {location}</span>
        </CardTitle>
        <CardDescription>Current conditions and 24-hour forecast</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="hourly">Hourly</TabsTrigger>
            <TabsTrigger value="radar">Wind Radar</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg flex flex-col items-center justify-center">
                <h3 className="text-sm font-medium text-slate-500 mb-2">Wind Speed</h3>
                <div className="flex items-center gap-2">
                  <Wind className="h-6 w-6 text-blue-500" />
                  <span className="text-3xl font-bold">{currentWindSpeed}</span>
                  <span className="text-lg">km/h</span>
                </div>
                {currentWindSpeed < 10 && <p className="text-sm mt-2 text-slate-500">Light breeze</p>}
                {currentWindSpeed >= 10 && currentWindSpeed < 20 && (
                  <p className="text-sm mt-2 text-slate-500">Gentle breeze</p>
                )}
                {currentWindSpeed >= 20 && currentWindSpeed < 30 && (
                  <p className="text-sm mt-2 text-slate-500">Moderate breeze</p>
                )}
                {currentWindSpeed >= 30 && currentWindSpeed < 40 && (
                  <p className="text-sm mt-2 text-slate-500">Fresh breeze</p>
                )}
                {currentWindSpeed >= 40 && currentWindSpeed < 50 && (
                  <p className="text-sm mt-2 text-slate-500">Strong breeze</p>
                )}
                {currentWindSpeed >= 50 && <p className="text-sm mt-2 text-slate-500">High wind</p>}
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg flex flex-col items-center justify-center">
                <h3 className="text-sm font-medium text-slate-500 mb-2">Wind Direction</h3>
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full border-2 border-slate-200 dark:border-slate-700"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Compass className="h-8 w-8 text-slate-400" />
                  </div>
                  <div
                    className="absolute top-1/2 left-1/2 h-16 w-1 bg-blue-500 origin-bottom transform -translate-x-1/2"
                    style={{ transform: `translateX(-50%) rotate(${getDirectionDegrees(currentWindDirection)}deg)` }}
                  >
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 transform rotate-45"></div>
                  </div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-xs font-medium">N</span>
                  </div>
                  <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <span className="text-xs font-medium">E</span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                    <span className="text-xs font-medium">S</span>
                  </div>
                  <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-xs font-medium">W</span>
                  </div>
                </div>
                <p className="text-lg font-medium mt-2">{currentWindDirection}</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg flex flex-col items-center justify-center">
                <h3 className="text-sm font-medium text-slate-500 mb-2">Wind Gust</h3>
                <div className="flex items-center gap-2">
                  <Navigation className="h-6 w-6 text-red-500" />
                  <span className="text-3xl font-bold">{currentWindGust}</span>
                  <span className="text-lg">km/h</span>
                </div>
                <p className="text-sm mt-2 text-slate-500">
                  {currentWindGust > currentWindSpeed + 15
                    ? "Strong gusts expected"
                    : currentWindGust > currentWindSpeed + 5
                      ? "Moderate gusts expected"
                      : "Light gusts expected"}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Wind Impact</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {currentWindSpeed < 10
                  ? "Current wind conditions are light with minimal impact. Perfect for outdoor activities."
                  : currentWindSpeed < 20
                    ? "Gentle breeze may cause small branches to move. Good conditions for most outdoor activities."
                    : currentWindSpeed < 30
                      ? "Moderate winds may cause dust and loose paper to rise. Small branches will move."
                      : currentWindSpeed < 40
                        ? "Fresh breeze will move small trees. Use caution with umbrellas and unsecured items."
                        : currentWindSpeed < 50
                          ? "Strong winds may make walking difficult. Secure loose outdoor items."
                          : "High winds can cause damage. Avoid outdoor activities if possible."}
                {currentWindGust > currentWindSpeed + 15
                  ? " Be aware of strong wind gusts that may cause sudden impacts."
                  : ""}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="hourly" className="mt-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={windData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    domain={[0, "dataMax + 10"]}
                    label={{ value: "km/h", position: "insideLeft", angle: -90, dy: 50, fontSize: 12 }}
                  />
                  <Tooltip formatter={formatTooltipValue} />
                  <Legend />
                  <Bar dataKey="speed" name="Wind Speed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="gust" name="Wind Gust" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-3 text-left">Time</th>
                    <th className="py-2 px-3 text-center">Speed (km/h)</th>
                    <th className="py-2 px-3 text-center">Gust (km/h)</th>
                    <th className="py-2 px-3 text-center">Direction</th>
                  </tr>
                </thead>
                <tbody>
                  {windData.map((point, index) => (
                    <tr key={index} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-2 px-3">{point.time}</td>
                      <td className="py-2 px-3 text-center">{point.speed}</td>
                      <td className="py-2 px-3 text-center">{point.gust}</td>
                      <td className="py-2 px-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span>{point.direction}</span>
                          <ArrowUp
                            className="h-4 w-4 text-blue-500"
                            style={{ transform: `rotate(${point.directionDegrees}deg)` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="radar" className="mt-0">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, "auto"]} />
                  <Radar name="Wind Speed" dataKey="speed" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Radar name="Wind Gust" dataKey="gust" stroke="#ef4444" fill="#ef4444" fillOpacity={0.4} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
