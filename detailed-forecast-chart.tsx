"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wind, Droplets, Thermometer, Sun, CloudRain, Gauge } from "lucide-react"

interface ForecastDataPoint {
  time: string
  temperature: number
  windSpeed: number
  humidity: number
  precipitation: number
  pressure: number
  uvIndex: number
}

interface DetailedForecastChartProps {
  forecastData: ForecastDataPoint[]
  location: string
}

export default function DetailedForecastChart({ forecastData, location }: DetailedForecastChartProps) {
  const [activeTab, setActiveTab] = useState("temperature")

  // Custom tooltip formatter
  const formatTooltipValue = (value: number, name: string) => {
    switch (name) {
      case "temperature":
        return [`${value}°C`, "Temperature"]
      case "windSpeed":
        return [`${value} km/h`, "Wind Speed"]
      case "humidity":
        return [`${value}%`, "Humidity"]
      case "precipitation":
        return [`${value} mm`, "Precipitation"]
      case "pressure":
        return [`${value} hPa`, "Pressure"]
      case "uvIndex":
        return [`${value}`, "UV Index"]
      default:
        return [`${value}`, name]
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Detailed Forecast for {location}</span>
        </CardTitle>
        <CardDescription>48-hour detailed weather forecast with hourly data</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
            <TabsTrigger value="temperature" className="flex items-center gap-1">
              <Thermometer className="h-4 w-4" />
              <span className="hidden sm:inline">Temperature</span>
            </TabsTrigger>
            <TabsTrigger value="wind" className="flex items-center gap-1">
              <Wind className="h-4 w-4" />
              <span className="hidden sm:inline">Wind</span>
            </TabsTrigger>
            <TabsTrigger value="humidity" className="flex items-center gap-1">
              <Droplets className="h-4 w-4" />
              <span className="hidden sm:inline">Humidity</span>
            </TabsTrigger>
            <TabsTrigger value="precipitation" className="flex items-center gap-1">
              <CloudRain className="h-4 w-4" />
              <span className="hidden sm:inline">Precipitation</span>
            </TabsTrigger>
            <TabsTrigger value="pressure" className="flex items-center gap-1">
              <Gauge className="h-4 w-4" />
              <span className="hidden sm:inline">Pressure</span>
            </TabsTrigger>
            <TabsTrigger value="uv" className="flex items-center gap-1">
              <Sun className="h-4 w-4" />
              <span className="hidden sm:inline">UV Index</span>
            </TabsTrigger>
          </TabsList>

          <div className="h-[300px] w-full">
            <TabsContent value="temperature" className="h-full mt-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    domain={["dataMin - 2", "dataMax + 2"]}
                    label={{ value: "°C", position: "insideLeft", angle: -90, dy: 50, fontSize: 12 }}
                  />
                  <Tooltip formatter={formatTooltipValue} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#ff7c43"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="wind" className="h-full mt-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    domain={[0, "dataMax + 5"]}
                    label={{ value: "km/h", position: "insideLeft", angle: -90, dy: 50, fontSize: 12 }}
                  />
                  <Tooltip formatter={formatTooltipValue} />
                  <Legend />
                  <Bar dataKey="windSpeed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="humidity" className="h-full mt-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    domain={[0, 100]}
                    label={{ value: "%", position: "insideLeft", angle: -90, dy: 50, fontSize: 12 }}
                  />
                  <Tooltip formatter={formatTooltipValue} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="humidity"
                    stroke="#4cc9f0"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="precipitation" className="h-full mt-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    domain={[0, "dataMax + 2"]}
                    label={{ value: "mm", position: "insideLeft", angle: -90, dy: 50, fontSize: 12 }}
                  />
                  <Tooltip formatter={formatTooltipValue} />
                  <Legend />
                  <Bar dataKey="precipitation" fill="#4361ee" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="pressure" className="h-full mt-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    domain={["dataMin - 5", "dataMax + 5"]}
                    label={{ value: "hPa", position: "insideLeft", angle: -90, dy: 50, fontSize: 12 }}
                  />
                  <Tooltip formatter={formatTooltipValue} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pressure"
                    stroke="#7209b7"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="uv" className="h-full mt-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    domain={[0, 12]}
                    label={{ value: "Index", position: "insideLeft", angle: -90, dy: 50, fontSize: 12 }}
                  />
                  <Tooltip formatter={formatTooltipValue} />
                  <Legend />
                  <Bar dataKey="uvIndex" fill="#f72585" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </div>
        </Tabs>

        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3">Combined Forecast View</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis
                  yAxisId="temp"
                  orientation="left"
                  tick={{ fontSize: 12 }}
                  domain={["dataMin - 2", "dataMax + 2"]}
                  label={{ value: "°C", position: "insideLeft", angle: -90, dy: 50, fontSize: 12 }}
                />
                <YAxis
                  yAxisId="wind"
                  orientation="right"
                  tick={{ fontSize: 12 }}
                  domain={[0, "dataMax + 5"]}
                  label={{ value: "km/h", position: "insideRight", angle: -90, dy: 50, fontSize: 12 }}
                />
                <Tooltip formatter={formatTooltipValue} />
                <Legend />
                <Line
                  yAxisId="temp"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#ff7c43"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Bar yAxisId="wind" dataKey="windSpeed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Area
                  yAxisId="temp"
                  type="monotone"
                  dataKey="precipitation"
                  fill="#4361ee"
                  stroke="#4361ee"
                  fillOpacity={0.3}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
