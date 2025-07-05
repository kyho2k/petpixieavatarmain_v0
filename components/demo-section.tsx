"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { UploadDropzone } from "@/components/upload-dropzone"
import { ResultsSection } from "@/components/results-section"
import { useGeneration } from "@/hooks/use-generation"
import { Upload, Sparkles, Clock, CheckCircle } from "lucide-react"

export function DemoSection() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const generation = useGeneration()

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl)
  }

  const handleStartGeneration = () => {
    if (uploadedImage) {
      generation.startGeneration(uploadedImage, ["disney", "anime", "cartoon", "pixel"])
    }
  }

  const handleReset = () => {
    setUploadedImage(null)
    generation.reset()
  }

  return (
    <section id="demo-section" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            무료 체험
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            지금 바로 <span className="text-purple-600">체험해보세요</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            반려동물 사진을 업로드하고 AI가 만드는 마법 같은 변화를 경험해보세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-white shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-purple-600" />
                1단계: 사진 업로드
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!uploadedImage ? (
                <UploadDropzone onImageUpload={handleImageUpload} />
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded pet"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUploadedImage(null)}
                      className="absolute top-2 right-2"
                    >
                      다시 선택
                    </Button>
                  </div>

                  {!generation.isGenerating && (
                    <Button
                      onClick={handleStartGeneration}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      size="lg"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      AI 생성 시작하기
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progress/Results Section */}
          <Card className="bg-white shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {generation.status === "succeeded" ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Clock className="w-5 h-5 text-purple-600" />
                )}
                2단계: AI 생성 결과
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generation.isGenerating ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{generation.currentStep}</h3>
                    <p className="text-gray-600 text-sm">예상 남은 시간: {generation.estimatedTimeRemaining}초</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>진행률</span>
                      <span>{generation.progress}%</span>
                    </div>
                    <Progress value={generation.progress} className="h-2" />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">처리 단계:</h4>
                    <div className="space-y-2 text-sm">
                      <div
                        className={`flex items-center gap-2 ${generation.progress >= 25 ? "text-green-600" : "text-gray-400"}`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${generation.progress >= 25 ? "bg-green-600" : "bg-gray-300"}`}
                        />
                        이미지 분석 및 전처리
                      </div>
                      <div
                        className={`flex items-center gap-2 ${generation.progress >= 50 ? "text-green-600" : "text-gray-400"}`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${generation.progress >= 50 ? "bg-green-600" : "bg-gray-300"}`}
                        />
                        3D 모델 생성 (Meshy AI)
                      </div>
                      <div
                        className={`flex items-center gap-2 ${generation.progress >= 75 ? "text-green-600" : "text-gray-400"}`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${generation.progress >= 75 ? "bg-green-600" : "bg-gray-300"}`}
                        />
                        캐릭터 이미지 생성 (LightX AI)
                      </div>
                      <div
                        className={`flex items-center gap-2 ${generation.progress >= 100 ? "text-green-600" : "text-gray-400"}`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${generation.progress >= 100 ? "bg-green-600" : "bg-gray-300"}`}
                        />
                        최종 처리 및 완료
                      </div>
                    </div>
                  </div>
                </div>
              ) : generation.status === "succeeded" ? (
                <div className="space-y-4">
                  <ResultsSection images={generation.images} model3D={generation.model3D} />
                  <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
                    다시 시도하기
                  </Button>
                </div>
              ) : generation.status === "failed" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-600 text-2xl">⚠️</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-red-600">생성 실패</h3>
                  <p className="text-gray-600 mb-4">{generation.error}</p>
                  <Button onClick={handleReset} variant="outline">
                    다시 시도하기
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">사진을 업로드해주세요</h3>
                  <p className="text-gray-600">반려동물 사진을 업로드하면 AI가 멋진 아바타를 만들어드려요</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
