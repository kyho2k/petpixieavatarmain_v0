"use client"

import { useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Text } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Smartphone, Coffee, Shirt } from "lucide-react"

interface GoodsPreviewSectionProps {
  sampleImage?: string
}

// 3D 머그컵 컴포넌트
function MugModel({ texture }: { texture?: string }) {
  return (
    <group>
      {/* 머그컵 본체 */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 2, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* 손잡이 */}
      <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.3, 0.1, 8, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* 이미지 텍스처 (앞면) */}
      <mesh position={[0, 0, 1.01]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial color="#ffffff" />
        <Text position={[0, 0, 0.01]} fontSize={0.2} color="#666" anchorX="center" anchorY="middle">
          Your Pet Avatar
        </Text>
      </mesh>
    </group>
  )
}

// 3D 티셔츠 컴포넌트
function TShirtModel({ texture }: { texture?: string }) {
  return (
    <group>
      {/* 티셔츠 본체 */}
      <mesh>
        <boxGeometry args={[2, 2.5, 0.1]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>

      {/* 소매 */}
      <mesh position={[-1.2, 0.8, 0]}>
        <boxGeometry args={[0.8, 1, 0.1]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>
      <mesh position={[1.2, 0.8, 0]}>
        <boxGeometry args={[0.8, 1, 0.1]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>

      {/* 프린트 영역 */}
      <mesh position={[0, 0.2, 0.06]}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshStandardMaterial color="#ffffff" />
        <Text position={[0, 0, 0.01]} fontSize={0.15} color="#666" anchorX="center" anchorY="middle">
          Pet Avatar
        </Text>
      </mesh>
    </group>
  )
}

// 3D 폰케이스 컴포넌트
function PhoneCaseModel({ texture }: { texture?: string }) {
  return (
    <group>
      {/* 폰케이스 본체 */}
      <mesh>
        <boxGeometry args={[1, 2, 0.2]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      {/* 화면 영역 */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[0.8, 1.6]} />
        <meshStandardMaterial color="#ffffff" />
        <Text position={[0, 0, 0.01]} fontSize={0.1} color="#666" anchorX="center" anchorY="middle">
          Your Pet
        </Text>
      </mesh>

      {/* 카메라 홀 */}
      <mesh position={[-0.3, 0.7, 0.11]}>
        <circleGeometry args={[0.1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  )
}

export default function GoodsPreviewSection({ sampleImage }: GoodsPreviewSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<"mug" | "tshirt" | "phonecase">("mug")
  const [isARSupported, setIsARSupported] = useState(false)

  const products = [
    {
      id: "mug" as const,
      name: "머그컵",
      icon: Coffee,
      description: "매일 사용하는 머그컵에 우리 아이를",
      price: "25,000원",
    },
    {
      id: "tshirt" as const,
      name: "티셔츠",
      icon: Shirt,
      description: "편안한 티셔츠로 우리 아이와 함께",
      price: "35,000원",
    },
    {
      id: "phonecase" as const,
      name: "폰케이스",
      icon: Smartphone,
      description: "언제나 함께하는 폰케이스",
      price: "20,000원",
    },
  ]

  const renderModel = () => {
    switch (selectedProduct) {
      case "mug":
        return <MugModel texture={sampleImage} />
      case "tshirt":
        return <TShirtModel texture={sampleImage} />
      case "phonecase":
        return <PhoneCaseModel texture={sampleImage} />
      default:
        return <MugModel texture={sampleImage} />
    }
  }

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800">
            <RotateCcw className="h-4 w-4 mr-2" />
            3D 미리보기
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">내 펫 캐릭터 굿즈로 만나보기</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            생성된 AI 아바타가 실제 굿즈에 어떻게 적용되는지 3D로 미리 확인해보세요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Viewer */}
          <div className="relative">
            <Card className="overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200">
              <CardContent className="p-0">
                <div className="h-96 md:h-[500px] relative">
                  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <Suspense fallback={null}>
                      <ambientLight intensity={0.5} />
                      <directionalLight position={[10, 10, 5]} intensity={1} />
                      <Environment preset="studio" />

                      {renderModel()}

                      <OrbitControls
                        enablePan={false}
                        enableZoom={true}
                        minDistance={3}
                        maxDistance={8}
                        autoRotate
                        autoRotateSpeed={1}
                      />
                    </Suspense>
                  </Canvas>

                  {/* 3D 조작 안내 */}
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-2 rounded-lg text-sm">
                    <RotateCcw className="h-4 w-4 inline mr-2" />
                    드래그하여 회전
                  </div>

                  {/* AR 버튼 (모바일에서만) */}
                  {isARSupported && (
                    <div className="absolute bottom-4 right-4">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        📱 AR로 보기
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 제품 정보 */}
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {products.find((p) => p.id === selectedProduct)?.name}
              </h3>
              <p className="text-gray-600 mb-2">{products.find((p) => p.id === selectedProduct)?.description}</p>
              <div className="text-lg font-bold text-purple-600">
                {products.find((p) => p.id === selectedProduct)?.price}
              </div>
            </div>
          </div>

          {/* Product Selection */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">굿즈 종류 선택</h3>
              <div className="grid gap-4">
                {products.map((product) => {
                  const Icon = product.icon
                  return (
                    <Card
                      key={product.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedProduct === product.id ? "ring-2 ring-purple-500 bg-purple-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedProduct(product.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-3 rounded-lg ${
                              selectedProduct === product.id
                                ? "bg-purple-100 text-purple-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.description}</p>
                            <div className="text-sm font-medium text-purple-600 mt-1">{product.price}</div>
                          </div>
                          {selectedProduct === product.id && (
                            <div className="text-purple-600">
                              <Badge className="bg-purple-100 text-purple-800">선택됨</Badge>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Features */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">✨ 굿즈 제작 특징</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 고해상도 AI 이미지 사용</li>
                <li>• 프리미엄 소재로 제작</li>
                <li>• 개별 맞춤 제작</li>
                <li>• 전국 무료배송</li>
                <li>• 품질보증 30일</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
                이 굿즈로 펀딩 참여하기
              </Button>
              <p className="text-xs text-gray-500 text-center">* 실제 굿즈는 펀딩 완료 후 제작됩니다</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">고품질 프린팅</h4>
            <p className="text-sm text-gray-600">
              AI 이미지를 최고 품질로 프린팅하여 선명하고 생생한 결과물을 제공합니다
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📦</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">안전한 포장</h4>
            <p className="text-sm text-gray-600">소중한 굿즈가 안전하게 배송될 수 있도록 꼼꼼한 포장으로 발송합니다</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💝</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">특별한 선물</h4>
            <p className="text-sm text-gray-600">세상에 하나뿐인 우리 아이 굿즈로 특별한 추억을 만들어보세요</p>
          </div>
        </div>
      </div>
    </div>
  )
}
