// app/api/generate/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { startPrediction } from "@/lib/replicate"

/**
 * POST /api/generate
 * Body: { imageUrl: string; prompt?: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { imageUrl, prompt } = await req.json()

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    const { id, status, detail } = await startPrediction({ imageUrl, prompt })

    // If Replicate returned an error message, bubble it up
    if (status === "failed") {
      return NextResponse.json({ error: detail }, { status: 500 })
    }

    return NextResponse.json({ id, status })
  } catch (err) {
    console.error("Generate error:", err)
    return NextResponse.json({ error: "Unexpected error starting generation" }, { status: 500 })
  }
}
