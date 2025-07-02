"use client"

import { useState, useCallback } from "react"

interface GenerationState {
  id: string | null
  status: "idle" | "starting" | "processing" | "succeeded" | "failed"
  progress: number
  images: string[]
  error: string | null
  estimatedTime: number
}

export function useGeneration() {
  const [state, setState] = useState<GenerationState>({
    id: null,
    status: "idle",
    progress: 0,
    images: [],
    error: null,
    estimatedTime: 60,
  })

  const startGeneration = useCallback(async (imageUrl: string, prompt?: string) => {
    try {
      setState((prev) => ({
        ...prev,
        status: "starting",
        progress: 0,
        error: null,
        images: [],
      }))

      // Start generation
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl,
          prompt: prompt || "fantasy character, digital art, high quality",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to start generation")
      }

      const { id } = await response.json()

      setState((prev) => ({
        ...prev,
        id,
        status: "processing",
      }))

      // Start listening to progress events
      const eventSource = new EventSource(`/api/events?id=${id}`)

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data)

        setState((prev) => ({
          ...prev,
          progress: data.progress || prev.progress,
          status: data.status || prev.status,
          images: data.output || prev.images,
          estimatedTime: data.estimatedTime || prev.estimatedTime,
        }))

        if (data.status === "succeeded" || data.status === "failed") {
          eventSource.close()
        }
      }

      eventSource.onerror = () => {
        setState((prev) => ({
          ...prev,
          status: "failed",
          error: "Connection lost",
        }))
        eventSource.close()
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: "failed",
        error: error instanceof Error ? error.message : "Generation failed",
      }))
    }
  }, [])

  const reset = useCallback(() => {
    setState({
      id: null,
      status: "idle",
      progress: 0,
      images: [],
      error: null,
      estimatedTime: 60,
    })
  }, [])

  return {
    ...state,
    startGeneration,
    reset,
    isGenerating: state.status === "starting" || state.status === "processing",
  }
}
