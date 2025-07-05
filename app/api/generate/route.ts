import { NextResponse } from "next/server"
import { nanoid } from "nanoid"
import { createPrediction } from "@/lib/predictions"

interface GenerateBody {
  imageUrl: string
  styles?: string[]
  pipeline?: string
}

/**
 * POST /api/generate
 *
 * Starts a (mock) generation job and returns a prediction ID.
 * In production you would call your Replicate / Meshy pipeline here.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<GenerateBody>

    if (!body.imageUrl) {
      return NextResponse.json({ error: "imageUrl is required" }, { status: 400 })
    }

    // 1. Create a new prediction entry in our in-memory store
    const id = nanoid()
    createPrediction(id)

    // 2. Return the prediction ID
    return NextResponse.json({ id })
  } catch (err) {
    console.error("POST /api/generate error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/* (optional) GET handler for debugging – returns 405 for now */
export function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 })
}
