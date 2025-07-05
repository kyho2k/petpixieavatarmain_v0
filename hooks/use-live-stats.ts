"use client"

import { useState, useEffect } from "react"

export interface LiveStats {
  totalGenerated: number
  todayGenerated: number
  todayUsers: number
  averageTime: number
  successRate: number
}

export function useLiveStats() {
  const [stats, setStats] = useState<LiveStats>({
    totalGenerated: 1247,
    todayGenerated: 58,
    todayUsers: 234,
    averageTime: 62,
    successRate: 94,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Simulate real-time updates
    const updateInterval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        totalGenerated: prev.totalGenerated + Math.floor(Math.random() * 3),
        todayGenerated: prev.todayGenerated + Math.floor(Math.random() * 2),
        todayUsers: prev.todayUsers + Math.floor(Math.random() * 5),
        averageTime: Math.max(45, Math.min(90, prev.averageTime + (Math.random() - 0.5) * 10)),
      }))
    }, 15000) // Update every 15 seconds

    return () => {
      clearTimeout(loadingTimer)
      clearInterval(updateInterval)
    }
  }, [])

  return { stats, isLoading }
}
