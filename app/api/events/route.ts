import type { NextRequest } from "next/server"
import { getSnapshot } from "@/lib/predictions"

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id")
  if (!id) return new Response("Missing id", { status: 400 })

  const encoder = new TextEncoder()
  const dataFrame = (obj: unknown) => encoder.encode(`data: ${JSON.stringify(obj)}\n\n`)

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(": connected\n\n"))

      const send = () => {
        const snap = getSnapshot(id)
        if (!snap) {
          controller.enqueue(dataFrame({ status: "failed", error: "Not found" }))
          controller.close()
          return
        }

        controller.enqueue(dataFrame(snap))

        if (snap.status === "succeeded") {
          controller.close()
          return
        }

        setTimeout(send, 1000)
      }

      send()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
