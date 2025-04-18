"use client"

import { useEffect, useRef } from "react"

export default function CloudAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const clouds: { x: number; y: number; width: number; speed: number; opacity: number }[] = []
    const cloudCount = 10

    // Create clouds
    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 2),
        width: Math.random() * 200 + 100,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    function drawCloud(x: number, y: number, width: number, opacity: number) {
      const height = width * 0.6

      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.beginPath()

      // Draw cloud shape
      const radiusX = width * 0.4
      const radiusY = height * 0.4

      // Main cloud body
      ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2)
      ctx.fill()

      // Additional cloud puffs
      ctx.beginPath()
      ctx.ellipse(x - width * 0.25, y + height * 0.1, radiusX * 0.6, radiusY * 0.6, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.ellipse(x + width * 0.25, y - height * 0.1, radiusX * 0.7, radiusY * 0.7, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.ellipse(x + width * 0.4, y + height * 0.15, radiusX * 0.5, radiusY * 0.5, 0, 0, Math.PI * 2)
      ctx.fill()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < clouds.length; i++) {
        const cloud = clouds[i]
        drawCloud(cloud.x, cloud.y, cloud.width, cloud.opacity)

        cloud.x += cloud.speed

        if (cloud.x > canvas.width + cloud.width) {
          cloud.x = -cloud.width
          cloud.y = Math.random() * (canvas.height / 2)
        }
      }

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
