// app/api/chatbot/health/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const checks = {
    geminiApiKey: !!process.env.GEMINI_API_KEY,
    clerkPublishableKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    clerkSecretKey: !!process.env.CLERK_SECRET_KEY,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  }

  return NextResponse.json({
    status: 'ok',
    message: 'Health check for chatbot API',
    checks,
    geminiKeyLength: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0
  })
}
