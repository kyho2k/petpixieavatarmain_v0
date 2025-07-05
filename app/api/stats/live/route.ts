import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulate live stats - in production this would come from a database
    const stats = {
      totalGenerated: 1247 + Math.floor(Math.random() * 100),
      todayGenerated: 58 + Math.floor(Math.random() * 20),
      todayUsers: 234 + Math.floor(Math.random() * 50),
      averageTime: 62 + Math.floor(Math.random() * 20) - 10,
      successRate: 94 + Math.floor(Math.random() * 6) - 3,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Stats API error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
