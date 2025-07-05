"use client"

import { useState, useCallback, useRef, useEffect } from "react"

export interface GenerationState {
  isGenerating: boolean
  progress: number
  status: "idle" | "starting" | "processing-3d" | "processing-character" | "succeeded" | "failed"
  images: string[]
  model3D: string | null
  error: string | null
  estimatedTimeRemaining: number
  predictionId: string | null
  currentStep: string
}

export function useGeneration() {
  const [state, setState] = useState<GenerationState>({
    isGenerating: false,
    progress: 0,
    status: "idle",
    images: [],
    model3D: null,
    error: null,
    estimatedTimeRemaining: 0,
    predictionId: null,
    currentStep: "",
  })

  /* ────────────────────────────────
     Refs to keep latest values
  ──────────────────────────────────*/
  const eventSourceRef = useRef<EventSource | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const retryRef = useRef(0) // how many times we retried SSE
  const pollTimerRef = useRef<NodeJS.Timeout | null>(null) // for fallback polling
  const latestStatus = useRef<GenerationState["status"]>("idle")

  /** keep the latest status in the ref */
  useEffect(() => {
    latestStatus.current = state.status
  }, [state.status])

  /* ────────────────────────────────
     Cleanup helper
  ──────────────────────────────────*/
  const cleanup = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current)
      pollTimerRef.current = null
    }
    retryRef.current = 0
  }, [])

  /* ────────────────────────────────
     Main function: startGeneration
  ──────────────────────────────────*/
  const startGeneration = useCallback(
    async (imageUrl: string, styles: string[] = ["disney", "anime", "cartoon", "pixel"]) => {
      try {
        cleanup()

        setState((prev) => ({
          ...prev,
          isGenerating: true,
          progress: 0,
          status: "starting",
          error: null,
          images: [],
          model3D: null,
          estimatedTimeRemaining: 90,
          currentStep: "AI가 이미지를 분석하고 있어요...",
        }))

        /* --- Kick-off generation on the server ------------------------ */
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageUrl,
            styles,
            pipeline: "meshy-lightx",
          }),
        })

        const { id, error } = await res.json()

        if (!res.ok) throw new Error(error ?? "Failed to start generation")

        /* --- Listen to the progress SSE ------------------------------ */
        const es = new EventSource(`/api/events?id=${id}`)
        eventSourceRef.current = es

        es.onmessage = (event) => {
          if (!event.data?.trim() || event.data.trim() === "ping" || !event.data.trim().startsWith("{")) return // ignore keep-alives / comments

          try {
            const payload = JSON.parse(event.data)

            setState((prev) => ({
              ...prev,
              progress: payload.progress ?? prev.progress,
              status: payload.status ?? prev.status,
              estimatedTimeRemaining: payload.estimatedTimeRemaining ?? prev.estimatedTimeRemaining,
              currentStep: payload.currentStep ?? prev.currentStep,
              images: payload.images ?? prev.images,
              model3D: payload.model3D ?? prev.model3D,
              error: payload.error ?? prev.error,
            }))

            if (payload.status === "succeeded") {
              setState((prev) => ({
                ...prev,
                isGenerating: false,
                progress: 100,
                estimatedTimeRemaining: 0,
                currentStep: "완료되었습니다! ✨",
              }))
              cleanup()
            } else if (payload.status === "failed") {
              setState((prev) => ({
                ...prev,
                isGenerating: false,
                error: payload.error ?? "Generation failed",
                currentStep: "오류가 발생했습니다",
              }))
              cleanup()
            }
          } catch (err) {
            console.error("SSE JSON parse error:", err, event.data)
          }
        }

        es.onerror = () => {
          // If we already finished, ignore the browser-generated error.
          if (
            es.readyState === EventSource.CLOSED &&
            (latestStatus.current === "succeeded" || latestStatus.current === "failed")
          ) {
            cleanup()
            return
          }

          // Try to reconnect up to 3 times
          if (retryRef.current < 3) {
            retryRef.current += 1
            console.warn(`⚠️  SSE disconnected – retry ${retryRef.current}/3 in 1 s…`)
            es.close()
            setTimeout(() => {
              if (latestStatus.current === "succeeded" || latestStatus.current === "failed") {
                return // no need any more
              }
              const newEs = new EventSource(`/api/events?id=${id}`)
              eventSourceRef.current = newEs
              /* re-attach the same listeners */
              newEs.onmessage = es.onmessage
              newEs.onerror = es.onerror
            }, 1000 * retryRef.current)
            return
          }

          /* After 3 retries, fall back to polling */
          console.error("SSE failed repeatedly – switching to polling.")
          es.close()
          startPolling(id) // see helper below
        }

        /* --- Safety timeout (5 min) ---------------------------------- */
        timeoutRef.current = setTimeout(
          () => {
            setState((prev) => ({
              ...prev,
              isGenerating: false,
              status: "failed",
              error: "Generation timed out",
              currentStep: "시간 초과되었습니다",
            }))
            cleanup()
          },
          5 * 60 * 1000,
        )
      } catch (err) {
        console.error("Generation error:", err)
        setState((prev) => ({
          ...prev,
          isGenerating: false,
          status: "failed",
          error: err instanceof Error ? err.message : "Unknown error",
          currentStep: "오류가 발생했습니다",
        }))
        cleanup()
      }
    },
    [cleanup],
  )

  /* ────────────────────────────────
     Public helpers
  ──────────────────────────────────*/
  const reset = useCallback(() => {
    cleanup()
    setState({
      isGenerating: false,
      progress: 0,
      status: "idle",
      images: [],
      model3D: null,
      error: null,
      estimatedTimeRemaining: 0,
      predictionId: null,
      currentStep: "",
    })
  }, [cleanup])

  /** fallback JSON polling every 2 s when SSE is not available */
  const startPolling = (predictionId: string) => {
    if (pollTimerRef.current) return // already polling

    const poll = async () => {
      try {
        const res = await fetch(`/api/status?id=${predictionId}`)
        if (!res.ok) throw new Error("polling failed")

        const data = await res.json()

        setState((prev) => ({
          ...prev,
          progress: data.progress ?? prev.progress,
          status: data.status ?? prev.status,
          estimatedTimeRemaining: data.estimatedTimeRemaining ?? prev.estimatedTimeRemaining,
          currentStep: data.currentStep ?? prev.currentStep,
          images: data.images ?? prev.images,
          model3D: data.model3D ?? prev.model3D,
          error: data.error ?? prev.error,
        }))

        if (data.status === "succeeded" || data.status === "failed") {
          cleanup()
        }
      } catch (err) {
        console.error("Polling error:", err)
        setState((prev) => ({
          ...prev,
          error: prev.error ?? "연결 오류가 발생했습니다",
          status: "failed",
          isGenerating: false,
        }))
        cleanup()
      }
    }

    poll() // run immediately
    pollTimerRef.current = setInterval(poll, 2000)
  }

  useEffect(() => cleanup, [cleanup]) // auto-cleanup on unmount

  return { ...state, startGeneration, reset }
}
