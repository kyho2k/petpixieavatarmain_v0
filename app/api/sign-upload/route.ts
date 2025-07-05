import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType, fileSize } = await request.json()

    // Validate input
    if (!fileName || !fileType || !fileSize) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (fileSize > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 })
    }

    if (!fileType.startsWith("image/")) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = fileName.split(".").pop()
    const uniqueFileName = `uploads/${timestamp}-${randomString}.${extension}`

    // In production, you would generate a real presigned URL for S3/R2/etc.
    // For demo purposes, we'll return placeholder URLs
    const uploadUrl = `https://api.cloudflare.com/client/v4/accounts/demo/images/v1/direct_upload`
    const publicUrl = `https://imagedelivery.net/demo/${uniqueFileName}`

    return NextResponse.json({
      uploadUrl,
      publicUrl,
      fileName: uniqueFileName,
    })
  } catch (error) {
    console.error("Sign upload error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
