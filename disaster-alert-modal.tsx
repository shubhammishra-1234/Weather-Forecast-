"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  AlertTriangle,
  X,
  LogIn,
  User,
  Lock,
  Bell,
  Shield,
  CheckCircle2,
  Clock,
  Settings,
  ChevronRight,
  MapPin,
  Info,
  ExternalLink,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DisasterAlertModalProps {
  isOpen: boolean
  onClose: () => void
}

interface AlertItem {
  id: string
  type: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  icon: string
  source: string
  verified: boolean
  location: string
  timestamp: string
  actions?: string[]
}

export default function DisasterAlertModal({ isOpen, onClose }: DisasterAlertModalProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("alerts")
  const [activeAlerts, setActiveAlerts] = useState<AlertItem[]>([])
  const [alertHistory, setAlertHistory] = useState<AlertItem[]>([])
  const [filterSeverity, setFilterSeverity] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: false,
    soundAlerts: true,
    vibration: true,
    alertRadius: 25,
  })

  // Sample alert data
  useEffect(() => {
    if (isLoggedIn) {
      // Simulate fetching active alerts
      setActiveAlerts([
        {
          id: "alert-1",
          type: "Heavy Rainfall Alert",
          description:
            "IMD: Very heavy rainfall predicted for the next 48 hours. Risk of urban flooding and waterlogging in low-lying areas of Mumbai and surrounding regions.",
          severity: "high",
          icon: "🌧️",
          source: "Indian Meteorological Department",
          verified: true,
          location: "Mumbai, Maharashtra",
          timestamp: "2 hours ago",
          actions: ["View Map", "Safety Tips", "Share"],
        },
        {
          id: "alert-2",
          type: "Cyclone Warning",
          description:
            "NDMA: Cyclone Tauktae approaching western coast. Expected landfall within 24 hours. Prepare for strong winds and heavy rainfall.",
          severity: "critical",
          icon: "🌀",
          source: "National Disaster Management Authority",
          verified: true,
          location: "Gujarat Coast",
          timestamp: "5 hours ago",
          actions: ["Evacuation Routes", "Emergency Contacts", "Share"],
        },
        {
          id: "alert-3",
          type: "Earthquake Information",
          description:
            "NCS: Magnitude 4.2 earthquake detected in Uttarakhand region. No major damage reported. Stay alert for aftershocks.",
          severity: "medium",
          icon: "🏚️",
          source: "National Center for Seismology",
          verified: true,
          location: "Uttarakhand",
          timestamp: "Yesterday",
        },
      ])

      // Simulate fetching alert history
      setAlertHistory([
        {
          id: "history-1",
          type: "Flood Warning",
          description: "Flood warning for Yamuna river basin has been lifted. Water levels have receded to normal.",
          severity: "medium",
          icon: "💧",
          source: "Central Water Commission",
          verified: true,
          location: "Delhi NCR",
          timestamp: "3 days ago",
        },
        {
          id: "history-2",
          type: "Heat Wave Alert",
          description: "Heat wave conditions have subsided. Temperatures have returned to seasonal norms.",
          severity: "high",
          icon: "🔥",
          source: "Indian Meteorological Department",
          verified: true,
          location: "Rajasthan",
          timestamp: "1 week ago",
        },
        {
          id: "history-3",
          type: "Landslide Warning",
          description: "Landslide risk has decreased following reduced rainfall in the region.",
          severity: "medium",
          icon: "⛰️",
          source: "Geological Survey of India",
          verified: true,
          location: "Himachal Pradesh",
          timestamp: "2 weeks ago",
        },
        {
          id: "history-4",
          type: "Air Quality Alert",
          description: "Air quality has improved to moderate levels. No special precautions needed for general public.",
          severity: "low",
          icon: "😷",
          source: "Central Pollution Control Board",
          verified: true,
          location: "New Delhi",
          timestamp: "3 weeks ago",
        },
        {
          id: "history-5",
          type: "Thunderstorm Warning",
          description: "Thunderstorm activity has moved out of the region. All warnings have been lifted.",
          severity: "medium",
          icon: "⛈️",
          source: "Indian Meteorological Department",
          verified: true,
          location: "West Bengal",
          timestamp: "1 month ago",
        },
      ])
    }
  }, [isLoggedIn])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoggedIn(true)
      setIsLoading(false)
    }, 1500)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setEmail("")
    setPassword("")
    setActiveTab("alerts")
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-orange-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-slate-500"
    }
  }

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "low":
        return "Low"
      case "medium":
        return "Medium"
      case "high":
        return "High"
      case "critical":
        return "Critical"
      default:
        return "Unknown"
    }
  }

  const filteredAlerts = activeAlerts.filter((alert) => {
    if (filterSeverity === "all") return true
    return alert.severity === filterSeverity
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 flex justify-between items-center sticky top-0 z-10">
            <div className="flex items-center">
              <AlertTriangle className="text-white mr-2" />
              <h2 className="text-xl font-bold text-white">Official Disaster Alert System</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-red-600 rounded-full transition-colors"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {isLoggedIn ? (
              <div className="h-full flex flex-col">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                      >
                        <User className="text-green-500" size={32} />
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Welcome to Disaster Alerts</h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        You will receive verified alerts for any disasters or emergencies in your area.
                      </p>
                    </div>
                  </div>

                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="alerts" className="flex items-center gap-2">
                        <Bell size={16} />
                        <span>Active Alerts</span>
                        {activeAlerts.length > 0 && (
                          <Badge variant="destructive" className="ml-1">
                            {activeAlerts.length}
                          </Badge>
                        )}
                      </TabsTrigger>
                      <TabsTrigger value="history" className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>History</span>
                      </TabsTrigger>
                      <TabsTrigger value="settings" className="flex items-center gap-2">
                        <Settings size={16} />
                        <span>Settings</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="alerts" className="mt-0 space-y-4">
                      {activeAlerts.length > 0 ? (
                        <>
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-lg flex items-center">
                              <Shield className="mr-2 h-5 w-5 text-red-500" />
                              Active Alerts
                            </h4>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowFilters(!showFilters)}
                              className="flex items-center gap-2"
                            >
                              <Filter size={16} />
                              Filter
                            </Button>
                          </div>

                          {showFilters && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg"
                            >
                              <div className="flex flex-wrap gap-2">
                                <Badge
                                  variant={filterSeverity === "all" ? "default" : "outline"}
                                  className="cursor-pointer hover:opacity-80 transition-opacity"
                                  onClick={() => setFilterSeverity("all")}
                                >
                                  All
                                </Badge>
                                <Badge
                                  variant={filterSeverity === "critical" ? "default" : "outline"}
                                  className={`cursor-pointer hover:opacity-80 transition-opacity ${
                                    filterSeverity === "critical" ? "bg-red-500" : ""
                                  }`}
                                  onClick={() => setFilterSeverity("critical")}
                                >
                                  Critical
                                </Badge>
                                <Badge
                                  variant={filterSeverity === "high" ? "default" : "outline"}
                                  className={`cursor-pointer hover:opacity-80 transition-opacity ${
                                    filterSeverity === "high" ? "bg-orange-500" : ""
                                  }`}
                                  onClick={() => setFilterSeverity("high")}
                                >
                                  High
                                </Badge>
                                <Badge
                                  variant={filterSeverity === "medium" ? "default" : "outline"}
                                  className={`cursor-pointer hover:opacity-80 transition-opacity ${
                                    filterSeverity === "medium" ? "bg-yellow-500" : ""
                                  }`}
                                  onClick={() => setFilterSeverity("medium")}
                                >
                                  Medium
                                </Badge>
                                <Badge
                                  variant={filterSeverity === "low" ? "default" : "outline"}
                                  className={`cursor-pointer hover:opacity-80 transition-opacity ${
                                    filterSeverity === "low" ? "bg-blue-500" : ""
                                  }`}
                                  onClick={() => setFilterSeverity("low")}
                                >
                                  Low
                                </Badge>
                              </div>
                            </motion.div>
                          )}

                          <ScrollArea className="h-[300px] rounded-md border p-4">
                            <div className="space-y-4">
                              {filteredAlerts.map((alert) => (
                                <motion.div
                                  key={alert.id}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3 }}
                                  whileHover={{ scale: 1.02 }}
                                  className="bg-white dark:bg-slate-700 rounded-lg shadow-md overflow-hidden border border-slate-200 dark:border-slate-600"
                                >
                                  <div
                                    className={`p-3 flex items-center justify-between ${getSeverityColor(
                                      alert.severity,
                                    )} text-white`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-xl">{alert.icon}</span>
                                      <h5 className="font-medium">{alert.type}</h5>
                                    </div>
                                    <Badge variant="outline" className="bg-white/20 text-white border-white/40">
                                      {getSeverityText(alert.severity)}
                                    </Badge>
                                  </div>
                                  <div className="p-4">
                                    <p className="text-sm mb-3">{alert.description}</p>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                                      <div className="flex items-center">
                                        <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                                        <span>{alert.source}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <MapPin className="h-3 w-3 mr-1 text-blue-500" />
                                        <span>{alert.location}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1 text-slate-400" />
                                        <span>{alert.timestamp}</span>
                                      </div>
                                    </div>
                                    {alert.actions && (
                                      <div className="flex flex-wrap gap-2 mt-3">
                                        {alert.actions.map((action, index) => (
                                          <Button
                                            key={index}
                                            variant="outline"
                                            size="sm"
                                            className="text-xs hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                                          >
                                            {action}
                                            {action === "Share" ? (
                                              <ExternalLink className="ml-1 h-3 w-3" />
                                            ) : (
                                              <ChevronRight className="ml-1 h-3 w-3" />
                                            )}
                                          </Button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </ScrollArea>

                          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Info className="h-4 w-4 text-blue-500" />
                              <h5 className="font-medium text-sm">Alert Information</h5>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300">
                              These alerts are issued by official government agencies and verified for accuracy. Please
                              follow the recommended actions and stay safe. For emergency assistance, call the national
                              emergency number 112.
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                            className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4"
                          >
                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                          </motion.div>
                          <h4 className="text-lg font-medium text-green-700 dark:text-green-300 mb-2">
                            No Active Alerts
                          </h4>
                          <p className="text-green-600 dark:text-green-400 text-sm">
                            There are currently no active disaster alerts for your area. Stay prepared by reviewing your
                            emergency plans.
                          </p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="history" className="mt-0">
                      <h4 className="font-medium text-lg mb-4 flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-slate-500" />
                        Alert History
                      </h4>

                      <ScrollArea className="h-[350px] rounded-md border p-4">
                        <div className="space-y-3">
                          {alertHistory.map((alert, index) => (
                            <motion.div
                              key={alert.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              whileHover={{ scale: 1.01 }}
                              className="p-3 border-b last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-lg">{alert.icon}</span>
                                    <h5 className="font-medium">{alert.type}</h5>
                                    <Badge
                                      variant="outline"
                                      className={`${getSeverityColor(alert.severity)} text-white border-none text-xs`}
                                    >
                                      {getSeverityText(alert.severity)}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">{alert.description}</p>
                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center">
                                      <MapPin className="h-3 w-3 mr-1 text-blue-500" />
                                      <span>{alert.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1 text-slate-400" />
                                      <span>{alert.timestamp}</span>
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs hover:bg-slate-100 dark:hover:bg-slate-600"
                                >
                                  Details
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="settings" className="mt-0">
                      <h4 className="font-medium text-lg mb-4 flex items-center">
                        <Settings className="mr-2 h-5 w-5 text-slate-500" />
                        Alert Settings
                      </h4>

                      <div className="space-y-6">
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                          <h5 className="font-medium mb-3">Notification Preferences</h5>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Bell className="h-4 w-4 text-slate-500" />
                                <Label htmlFor="push-notifications">Push Notifications</Label>
                              </div>
                              <Switch
                                id="push-notifications"
                                checked={notificationSettings.pushNotifications}
                                onCheckedChange={(checked) =>
                                  setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-slate-500" />
                                <Label htmlFor="email-notifications">Email Notifications</Label>
                              </div>
                              <Switch
                                id="email-notifications"
                                checked={notificationSettings.emailNotifications}
                                onCheckedChange={(checked) =>
                                  setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-slate-500" />
                                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                              </div>
                              <Switch
                                id="sms-notifications"
                                checked={notificationSettings.smsNotifications}
                                onCheckedChange={(checked) =>
                                  setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                          <h5 className="font-medium mb-3">Alert Preferences</h5>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Volume2 className="h-4 w-4 text-slate-500" />
                                <Label htmlFor="sound-alerts">Sound Alerts</Label>
                              </div>
                              <Switch
                                id="sound-alerts"
                                checked={notificationSettings.soundAlerts}
                                onCheckedChange={(checked) =>
                                  setNotificationSettings({ ...notificationSettings, soundAlerts: checked })
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Smartphone className="h-4 w-4 text-slate-500" />
                                <Label htmlFor="vibration">Vibration</Label>
                              </div>
                              <Switch
                                id="vibration"
                                checked={notificationSettings.vibration}
                                onCheckedChange={(checked) =>
                                  setNotificationSettings({ ...notificationSettings, vibration: checked })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-slate-500" />
                                <Label htmlFor="alert-radius">Alert Radius (km)</Label>
                              </div>
                              <Input
                                id="alert-radius"
                                type="number"
                                value={notificationSettings.alertRadius}
                                onChange={(e) =>
                                  setNotificationSettings({
                                    ...notificationSettings,
                                    alertRadius: Number.parseInt(e.target.value) || 0,
                                  })
                                }
                                className="max-w-[150px]"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                          <h5 className="font-medium mb-3">Alert Types</h5>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              "Floods",
                              "Earthquakes",
                              "Cyclones",
                              "Tsunamis",
                              "Landslides",
                              "Extreme Weather",
                              "Wildfires",
                              "Industrial Accidents",
                            ].map((type) => (
                              <div key={type} className="flex items-center space-x-2">
                                <Checkbox id={`alert-type-${type}`} defaultChecked />
                                <Label htmlFor={`alert-type-${type}`} className="text-sm">
                                  {type}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <form onSubmit={handleLogin}>
                  <div className="mb-6 text-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                      className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <AlertTriangle className="text-red-500" size={32} />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">Sign In to Disaster Alert</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Get notified about emergencies and disasters in your area
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        />
                        <Label htmlFor="remember" className="text-sm">
                          Remember me
                        </Label>
                      </div>
                      <a href="#" className="text-sm text-sky-500 hover:text-sky-600">
                        Forgot password?
                      </a>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-colors"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Signing in...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <LogIn size={16} className="mr-2" />
                          Sign In
                        </div>
                      )}
                    </Button>

                    <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                      Don't have an account?{" "}
                      <a href="#" className="text-sky-500 hover:text-sky-600">
                        Sign up
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Footer */}
          {isLoggedIn && (
            <div className="border-t p-4 flex justify-between items-center sticky bottom-0 bg-white dark:bg-slate-800 z-10">
              <Button variant="outline" onClick={handleLogout} className="hover:bg-slate-100 dark:hover:bg-slate-700">
                Sign Out
              </Button>
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-colors"
              >
                Close
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function Mail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function MessageSquare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function Smartphone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  )
}

function Volume2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}
