// app/api/chatbot/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/database'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Google Gemini client
let gemini: any = null
let hasGemini = false

const initializeGemini = () => {
  if (process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
      gemini = genAI.getGenerativeModel({ model: "gemini-pro" })
      hasGemini = true
      console.log('Gemini API initialized successfully')
    } catch (error) {
      console.error('Failed to initialize Gemini:', error)
      hasGemini = false
    }
  } else {
    console.warn('GEMINI_API_KEY is not set in environment variables')
  }
}

// Initialize on first import
initializeGemini()

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: string
}

interface ChatbotRequest {
  message: string
  conversationHistory?: ChatMessage[]
  patientId?: string
}

// Fallback AI responses for common questions
const getFallbackResponse = (message: string, patientContext: string): string => {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('progress') || lowerMessage.includes('improvement')) {
    return `Great question about your progress! ${patientContext ? 'Based on your recent activity, ' : ''}I can see you're working hard on your rehabilitation. Remember that progress in physical therapy often comes in small increments. Keep consistent with your exercises, focus on proper form, and celebrate the small victories along the way. Every session brings you closer to your goals! 💪`
  }
  
  if (lowerMessage.includes('motivation') || lowerMessage.includes('encourage')) {
    return `You're doing amazing work on your recovery journey! 🌟 Physical therapy can be challenging, but your dedication shows real strength. Remember why you started this journey and keep that goal in mind. Every exercise you complete, every session you attend, is an investment in your future health and mobility. You've got this! 💪`
  }
  
  if (lowerMessage.includes('exercise') || lowerMessage.includes('workout')) {
    return `Exercise is the cornerstone of successful rehabilitation! 🏃‍♂️ Focus on:\n\n• Proper form over speed\n• Consistent daily practice\n• Listening to your body\n• Gradual progression\n\nRemember to warm up before exercises and cool down afterward. If you experience pain (not mild discomfort), please consult your therapist. Quality movements build lasting strength!`
  }
  
  if (lowerMessage.includes('pain') || lowerMessage.includes('hurt') || lowerMessage.includes('sore')) {
    return `It's important to distinguish between normal muscle fatigue and concerning pain. 🩺 Mild muscle soreness after exercise is normal, but sharp or persistent pain is not. Please:\n\n• Stop any exercise causing sharp pain\n• Apply ice for acute pain, heat for stiffness\n• Contact your healthcare provider if pain persists\n• Never push through significant discomfort\n\nYour safety comes first!`
  }
  
  if (lowerMessage.includes('goal') || lowerMessage.includes('target')) {
    return `Setting and achieving goals is crucial for rehabilitation success! 🎯 Break your recovery into smaller, manageable milestones:\n\n• Daily movement goals\n• Weekly strength targets\n• Monthly mobility improvements\n• Long-term functional objectives\n\nCelebrate each achievement, no matter how small. Progress isn't always linear, but persistence pays off!`
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('question')) {
    return `I'm here to support your rehabilitation journey! 🤖 I can help with:\n\n• Exercise motivation and tips\n• Progress tracking insights\n• General wellness guidance\n• Answering rehab-related questions\n\nFor specific medical concerns, always consult your healthcare provider. What specific area would you like guidance on?`
  }
  
  // Default encouraging response
  return `Thank you for reaching out! 😊 I'm here to support your rehabilitation journey. Whether you need motivation, exercise tips, or just want to chat about your progress, I'm ready to help. Remember, every day you work on your recovery is a step toward better health and mobility. What would you like to know more about?`
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: ChatbotRequest = await request.json()
    const { message, conversationHistory = [], patientId } = body

    // Get patient data for context (optional)
    let patientContext = ''
    let progressContext = ''

    if (patientId) {
      try {
        // Try to verify patient belongs to current user
        const patient = await db.getPatientByUserId(userId)
        if (patient && patient.id === patientId) {
          // Get recent progress data
          const progressEntries = await db.getProgressEntriesByPatientId(patientId)
          const recentProgress = progressEntries?.slice(0, 5) || []
          
          // Get analytics
          const analytics = await db.getPatientAnalytics(patientId, 7)

          patientContext = `
Patient Profile:
- Name: ${patient.firstName} ${patient.lastName}
- Injury Type: ${patient.injuryType || 'Not specified'}
- Email: ${patient.email}
`

          if (analytics) {
            progressContext = `
Recent Progress (Last 7 days):
- Total Exercises Completed: ${analytics.totalExercises}
- Total Exercise Time: ${Math.round(analytics.totalTime / 60)} minutes
- Average Accuracy: ${Math.round(analytics.averageAccuracy)}%
`
          }
        }
      } catch (error) {
        console.warn('Could not fetch patient context:', error)
        // Continue without patient context
      }
    }

    // Prepare the system prompt with patient context
    const systemPrompt = `You are Dr. RehabBot, a helpful and encouraging AI assistant specializing in physical therapy and rehabilitation. You help patients with their recovery journey by providing motivation, exercise guidance, and progress insights.

${patientContext}
${progressContext}

Guidelines:
1. Be encouraging and motivational, celebrating small victories
2. Provide specific, actionable advice for rehabilitation
3. If asked about medical advice, remind them to consult their healthcare provider
4. Use the patient's progress data to provide personalized insights
5. Be empathetic and understanding about recovery challenges
6. Keep responses concise but helpful (max 150-200 words typically)
7. Always maintain a positive, professional tone
8. Focus on health and rehabilitation topics only

Current date: ${new Date().toLocaleDateString()}

Remember: You are an AI health assistant for rehabilitation. Always encourage patients to consult healthcare providers for serious concerns.`

    // Check if we have Gemini available
    if (hasGemini && gemini) {
      try {
        // Prepare conversation context for Gemini
        const conversationContext = conversationHistory
          .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
          .join('\n')

        // Create the full prompt for Gemini
        const fullPrompt = `${systemPrompt}

Previous conversation:
${conversationContext}

User: ${message}`

        // Generate response using Gemini with error handling
        let result
        try {
          result = await gemini.generateContent({
            contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
            generationConfig: {
              maxOutputTokens: 300,
              temperature: 0.7,
            },
          })
        } catch (apiError: any) {
          console.error('Gemini API call failed:', apiError.message)
          throw apiError
        }

        if (!result || !result.response) {
          throw new Error('No response from Gemini API')
        }

        const response = await result.response
        const botResponse = response.text()
        
        if (!botResponse) {
          throw new Error('Empty response from Gemini API')
        }

        return NextResponse.json({
          message: botResponse,
          timestamp: new Date().toISOString()
        })
      } catch (geminiError: any) {
        console.error('Gemini processing error:', geminiError.message || geminiError)
        // Fall through to fallback response
      }
    } else {
      console.log('Gemini not available, using fallback. hasGemini:', hasGemini, 'gemini exists:', !!gemini)
    }

    // Use fallback response if Gemini is not available or failed
    const fallbackResponse = getFallbackResponse(message, patientContext)

    return NextResponse.json({
      message: fallbackResponse,
      timestamp: new Date().toISOString(),
      source: 'fallback'
    })

  } catch (error) {
    console.error('Chatbot error:', error)
    
    // Always provide a helpful fallback response
    const fallbackResponse = getFallbackResponse('help', '')

    return NextResponse.json({
      message: fallbackResponse,
      timestamp: new Date().toISOString(),
      error: 'Service temporarily unavailable - using fallback response'
    }, { status: 200 })
  }
}

// Handle preflight OPTIONS requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
