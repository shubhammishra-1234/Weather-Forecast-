"use client"

import { useEffect, useRef } from "react"

export default function SunAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const centerX = canvas.width * 0.8
    const centerY = canvas.height * 0.2
    const radius = 80
    let angle = 0

    const drawSun = () => {
      // Sun glow
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.5, centerX, centerY, radius * 3)
      gradient.addColorStop(0, "rgba(255, 200, 64, 0.8)")
      gradient.addColorStop(0.3, "rgba(255, 200, 64, 0.2)")
      gradient.addColorStop(1, "rgba(255, 200, 64, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 3, 0, Math.PI * 2)
      ctx.fill()

      // Sun body
      ctx.fillStyle = "#FFD700"
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()

      // Sun rays
      ctx.strokeStyle = "#FFD700"
      ctx.lineWidth = 3

      for (let i = 0; i < 12; i++) {
        const rayAngle = (i * Math.PI) / 6 + angle
        const innerRadius = radius * 1.2
        const outerRadius = radius * 1.8

        ctx.beginPath()
        ctx.moveTo(centerX + innerRadius * Math.cos(rayAngle), centerY + innerRadius * Math.sin(rayAngle))
        ctx.lineTo(centerX + outerRadius * Math.cos(rayAngle), centerY + outerRadius * Math.sin(rayAngle))
        ctx.stroke()
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawSun()

      angle += 0.005

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}
