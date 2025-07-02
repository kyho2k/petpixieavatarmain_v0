import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return new Response("Missing prediction ID", { status: 400 })
  }

  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = (data: any) => {
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`)
      }

      const pollPrediction = async () => {
        try {
          const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
            headers: {
              Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
            },
          })

          if (!response.ok) {
            throw new Error("Failed to fetch prediction")
          }

          const prediction = await response.json()

          // Calculate progress based on status
          let progress = 0
          if (prediction.status === "starting") progress = 10
          else if (prediction.status === "processing") progress = 50
          else if (prediction.status === "succeeded") progress = 100
          else if (prediction.status === "failed") progress = 0

          sendEvent({
            status: prediction.status,
            progress,
            output: prediction.output,
            error: prediction.error,
            estimatedTime: prediction.status === "processing" ? 30 : 0,
          })

          if (prediction.status === "succeeded" || prediction.status === "failed") {
            controller.close()
            return
          }

          // Continue polling
          setTimeout(pollPrediction, 2000)
        } catch (error) {
          sendEvent({
            status: "failed",
            error: "Failed to fetch prediction status",
          })
          controller.close()
        }
      }

      pollPrediction()
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
