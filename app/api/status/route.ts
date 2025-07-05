import { getSnapshot } from "@/lib/predictions"
import type { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")
  if (!id) return new Response("Missing id", { status: 400 })

  const snap = getSnapshot(id)
  if (!snap) return new Response("Not found", { status: 404 })

  return Response.json(snap)
}
