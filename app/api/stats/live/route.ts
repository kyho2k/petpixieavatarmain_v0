import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      const sendStats = () => {
        const stats = {
          todayGenerations: 52 + Math.floor(Math.random() * 10),
          averageProcessingTime: 58 + Math.floor(Math.random() * 10),
          satisfactionRate: 92 + Math.floor(Math.random() * 5),
          activeUsers: 15 + Math.floor(Math.random() * 5),
          fundingProgress: 85 + Math.floor(Math.random() * 3),
          fundingAmount: 4250000 + Math.floor(Math.random() * 100000),
          backers: 127 + Math.floor(Math.random() * 5),
          daysLeft: 12,
        }

        controller.enqueue(`data: ${JSON.stringify(stats)}\n\n`)
      }

      // Send initial stats
      sendStats()

      // Update every 30 seconds
      const interval = setInterval(sendStats, 30000)

      // Cleanup
      return () => {
        clearInterval(interval)
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
