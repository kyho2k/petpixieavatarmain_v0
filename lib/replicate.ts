/**
 * Replicate API wrapper with exponential backoff and proper error handling
 * Docs: https://replicate.com/docs/reference/http
 */

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN
const REPLICATE_MODEL_VERSION =
  process.env.REPLICATE_MODEL_VERSION || "8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f" // SDXL default

if (!REPLICATE_API_TOKEN) {
  throw new Error("REPLICATE_API_TOKEN is not set. Add it in your Vercel environment variables.")
}

interface StartPredictionArgs {
  imageUrl: string
  prompt?: string
  numOutputs?: number
}

interface PredictionResponse {
  id: string
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled"
  input?: any
  output?: string[]
  error?: string
  metrics?: {
    predict_time?: number
    total_time?: number
  }
  created_at: string
  started_at?: string
  completed_at?: string
}

// Exponential backoff utility
async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3): Promise<Response> {
  let lastError: Error

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options)

      // If rate limited, wait and retry
      if (response.status === 429) {
        const retryAfter = response.headers.get("retry-after")
        const waitTime = retryAfter ? Number.parseInt(retryAfter) * 1000 : Math.pow(2, attempt) * 1000
        await sleep(waitTime)
        continue
      }

      return response
    } catch (error) {
      lastError = error as Error
      if (attempt < maxRetries) {
        await sleep(Math.pow(2, attempt) * 1000) // 1s, 2s, 4s
      }
    }
  }

  throw lastError!
}

export async function startPrediction({
  imageUrl,
  prompt = "fantasy character, digital art, high quality, detailed",
  numOutputs = 4,
}: StartPredictionArgs): Promise<{
  id: string | null
  status: string
  detail: string | null
}> {
  try {
    const response = await fetchWithRetry("https://api.replicate.com/v1/predictions", {
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
          num_outputs: numOutputs,
          guidance_scale: 7.5,
          num_inference_steps: 50,
          scheduler: "K_EULER",
        },
      }),
    })

    const data: PredictionResponse = await response.json()

    if (!response.ok) {
      console.error("Replicate API error:", data)
      return {
        id: null,
        status: "failed",
        detail: (data as any)?.detail || `HTTP ${response.status}: ${response.statusText}`,
      }
    }

    return {
      id: data.id,
      status: data.status,
      detail: null,
    }
  } catch (error) {
    console.error("Network error calling Replicate:", error)
    return {
      id: null,
      status: "failed",
      detail: error instanceof Error ? error.message : "Network error",
    }
  }
}

export async function getPrediction(id: string): Promise<PredictionResponse | null> {
  try {
    const response = await fetchWithRetry(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: {
        Authorization: `Token ${REPLICATE_API_TOKEN}`,
      },
    })

    if (!response.ok) {
      console.error(`Failed to get prediction ${id}:`, response.status)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching prediction:", error)
    return null
  }
}

export function calculateProgress(prediction: PredictionResponse): number {
  if (!prediction) return 0

  switch (prediction.status) {
    case "starting":
      return 10
    case "processing":
      // Use metrics if available, otherwise estimate based on time
      if (prediction.metrics?.predict_time) {
        return Math.min(90, 20 + (prediction.metrics.predict_time / 60) * 70)
      }
      return 50
    case "succeeded":
      return 100
    case "failed":
    case "canceled":
      return 0
    default:
      return 0
  }
}

export function getEstimatedTimeRemaining(prediction: PredictionResponse): number {
  if (!prediction || prediction.status !== "processing") return 0

  const elapsed = prediction.started_at ? Date.now() - new Date(prediction.started_at).getTime() : 0

  // Estimate based on typical processing time (30-90 seconds)
  const estimatedTotal = 60000 // 60 seconds average
  return Math.max(0, estimatedTotal - elapsed) / 1000
}
