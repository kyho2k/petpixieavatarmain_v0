import { NextResponse } from "next/server"

export async function GET() {
  try {
    // In a real implementation, you would fetch from your database
    // For now, we'll return mock data with some randomization
    const baseStats = {
      todayGenerations: 52 + Math.floor(Math.random() * 10),
      averageProcessingTime: 58 + Math.floor(Math.random() * 10),
      satisfactionRate: 92 + Math.floor(Math.random() * 5),
      activeUsers: 15 + Math.floor(Math.random() * 5),
      fundingProgress: 85 + Math.floor(Math.random() * 3),
      fundingAmount: 4250000 + Math.floor(Math.random() * 100000),
      backers: 127 + Math.floor(Math.random() * 5),
      daysLeft: 12,
    }

    return NextResponse.json(baseStats)
  } catch (error) {
    console.error("Stats error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
