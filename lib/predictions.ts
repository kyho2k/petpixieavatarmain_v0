const TICK_MS = 1000 // one progress step per second
const STEP_PERCENT = 10 // +10 % each tick
const FINISH_AFTER = 10 // 10 ticks → 100 %

export interface PredictionSnapshot {
  id: string
  progress: number
  status: "starting" | "processing-3d" | "processing-character" | "succeeded"
  estimatedTimeRemaining: number
  currentStep: string
  images?: string[]
  model3D?: string
}

/* In-memory registry — OK for demos / dev */
const store = new Map<string, number>() // value = startTime (ms)

export function createPrediction(id: string) {
  store.set(id, Date.now())
}

export function getSnapshot(id: string): PredictionSnapshot | null {
  const start = store.get(id)
  if (!start) return null

  const elapsed = Date.now() - start
  const ticks = Math.floor(elapsed / TICK_MS)
  const progress = Math.min(100, ticks * STEP_PERCENT)

  let status: PredictionSnapshot["status"] = "starting"
  let stepText = "이미지 분석 중..."
  if (progress >= 20 && progress < 60) {
    status = "processing-3d"
    stepText = "3D 모델 생성 중..."
  } else if (progress >= 60 && progress < 100) {
    status = "processing-character"
    stepText = "캐릭터 이미지 생성 중..."
  } else if (progress === 100) {
    status = "succeeded"
    stepText = "완료되었습니다! ✨"
  }

  const snapshot: PredictionSnapshot = {
    id,
    progress,
    status,
    estimatedTimeRemaining: Math.max(0, FINISH_AFTER - ticks),
    currentStep: stepText,
  }

  if (status === "succeeded") {
    snapshot.images = [
      "/placeholder.svg?height=512&width=512",
      "/placeholder.svg?height=512&width=512",
      "/placeholder.svg?height=512&width=512",
    ]
    snapshot.model3D = "/placeholder.svg?height=1&width=1"
  }

  return snapshot
}
