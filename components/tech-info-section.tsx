"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cpu, Zap, Brain, Palette, Clock, Shield, Sparkles, ArrowRight, CheckCircle } from "lucide-react"

export function TechInfoSection() {
  return (
    <section id="tech-info" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Brain className="w-4 h-4 mr-2" />
            기술 정보
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-purple-600">최첨단 AI 기술</span>로 구현
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Meshy AI와 LightX AI의 강력한 조합으로 사진 한 장을 생생한 3D 모델과 다양한 스타일의 캐릭터로 변환합니다
          </p>
        </div>

        <Tabs defaultValue="pipeline" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pipeline">AI 파이프라인</TabsTrigger>
            <TabsTrigger value="performance">성능 지표</TabsTrigger>
            <TabsTrigger value="features">주요 기능</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="space-y-8">
            {/* AI Pipeline Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="relative">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">1. 이미지 전처리</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      배경 자동 제거
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      노이즈 감소 및 선명화
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      최적 해상도 조정
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      특징점 추출
                    </li>
                  </ul>
                </CardContent>
                <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden md:block">
                  <ArrowRight className="w-6 h-6 text-purple-400" />
                </div>
              </Card>

              <Card className="relative">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">2. Meshy AI 3D 생성</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      2D → 3D 변환
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      메시 최적화
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      텍스처 매핑
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      360° 뷰 생성
                    </li>
                  </ul>
                </CardContent>
                <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden md:block">
                  <ArrowRight className="w-6 h-6 text-purple-400" />
                </div>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">3. LightX AI 스타일링</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      다중 스타일 적용
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      색상 보정
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      디테일 향상
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      최종 렌더링
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Technical Specs */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  기술 사양
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">4K</div>
                    <div className="text-sm text-gray-600">최대 출력 해상도</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">60초</div>
                    <div className="text-sm text-gray-600">평균 처리 시간</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">99.2%</div>
                    <div className="text-sm text-gray-600">성공률</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">4+</div>
                    <div className="text-sm text-gray-600">지원 스타일</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    처리 속도
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">이미지 전처리</span>
                      <span className="text-sm font-medium">5-10초</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">3D 모델 생성</span>
                      <span className="text-sm font-medium">30-40초</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">스타일 적용</span>
                      <span className="text-sm font-medium">15-20초</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    품질 지표
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">3D 모델 정확도</span>
                      <span className="text-sm font-medium">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">스타일 일관성</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">사용자 만족도</span>
                      <span className="text-sm font-medium">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800 mb-1">99.9% 업타임 보장</h3>
                    <p className="text-green-700 text-sm">AWS 클라우드 인프라를 통한 안정적인 서비스 제공</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <Brain className="w-5 h-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">지능형 분석</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    딥러닝 기반 이미지 분석으로 반려동물의 특징을 정확하게 파악하고 최적의 3D 모델을 생성합니다.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <Palette className="w-5 h-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">다양한 스타일</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    디즈니, 애니메이션, 카툰, 픽셀아트 등 다양한 스타일로 개성 넘치는 캐릭터를 만들어보세요.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">실시간 처리</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    최적화된 AI 파이프라인으로 빠른 처리 속도와 실시간 진행 상황 확인이 가능합니다.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                    <Shield className="w-5 h-5 text-yellow-600" />
                  </div>
                  <CardTitle className="text-lg">개인정보 보호</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    업로드된 이미지는 처리 후 자동 삭제되며, 개인정보는 안전하게 보호됩니다.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-3">
                    <Cpu className="w-5 h-5 text-pink-600" />
                  </div>
                  <CardTitle className="text-lg">고해상도 출력</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">최대 4K 해상도의 고품질 이미지와 상세한 3D 모델을 제공합니다.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                  </div>
                  <CardTitle className="text-lg">지속적 개선</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    사용자 피드백을 바탕으로 AI 모델을 지속적으로 개선하여 더 나은 결과를 제공합니다.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-4">더 궁금한 점이 있으신가요?</h3>
                <p className="mb-6 opacity-90">기술적인 질문이나 비즈니스 문의사항이 있으시면 언제든 연락해주세요.</p>
                <Button variant="secondary" size="lg">
                  문의하기
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
