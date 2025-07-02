/**
 * Thin wrapper around the Replicate HTTP API.
 * Docs: https://replicate.com/docs/reference/http#predictions.create
 */

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN
const REPLICATE_MODEL_VERSION =
  process.env.REPLICATE_MODEL_VERSION ||
  // 👉  Stable Diffusion XL (replace with your own model hash if needed)
  "f178ccf03c7dc6b8f10ed2c2d63343bef0ba61d8d61c523e0aa27aa5e2e60c5c"

// ⚠️ Fail fast if the token is not set
if (!REPLICATE_API_TOKEN) {
  throw new Error("REPLICATE_API_TOKEN is not set. " + "Add it in your Vercel / local environment variables.")
}

interface StartPredictionArgs {
  imageUrl: string
  prompt?: string
}

export async function startPrediction({
  imageUrl,
  prompt = "fantasy character, digital art, high quality",
}: StartPredictionArgs) {
  const res = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${REPLICATE_API_TOKEN}`,
    },
    body: JSON.stringify({
      version: REPLICATE_MODEL_VERSION,
      input: {
        image: imageUrl,
        prompt,
        num_outputs: 4,
      },
    }),
  })

  const data = await res.json()

  // Replicate returns 201 on success; anything else may contain an error payload.
  if (!res.ok) {
    console.error("Replicate error:", data)
    return {
      id: null,
      status: "failed" as const,
      detail: data?.detail ?? "Unknown Replicate error",
    }
  }

  return {
    id: data.id as string,
    status: data.status as string,
    detail: null,
  }
}
