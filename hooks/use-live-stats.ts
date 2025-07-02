"use client"

import { useState, useEffect } from "react"

interface LiveStats {
  todayGenerations: number
  averageProcessingTime: number
  satisfactionRate: number
  activeUsers: number
  fundingProgress: number
  fundingAmount: number
  backers: number
  daysLeft: number
}

export function useLiveStats() {
  const [stats, setStats] = useState<LiveStats>({
    todayGenerations: 0,
    averageProcessingTime: 0,
    satisfactionRate: 0,
    activeUsers: 0,
    fundingProgress: 0,
    fundingAmount: 0,
    backers: 0,
    daysLeft: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats")
        if (!response.ok) {
          throw new Error("Failed to fetch stats")
        }
        const data = await response.json()
        setStats(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load stats")
      } finally {
        setIsLoading(false)
      }
    }

    // Initial fetch
    fetchStats()

    // Set up SSE for real-time updates
    const eventSource = new EventSource("/api/stats/live")

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setStats(data)
    }

    eventSource.onerror = () => {
      setError("Real-time connection lost")
    }

    // Cleanup
    return () => {
      eventSource.close()
    }
  }, [])

  return { stats, isLoading, error }
}
