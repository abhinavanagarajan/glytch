# 🏗️ Chatbot Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    PATIENT PROGRESS PAGE                        │
│  (/src/app/patient/progress/page.tsx)                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
            ┌──────────────────────────┐
            │   AIChatbot Component    │
            │ (/src/components/        │
            │  AIChatbot.tsx)          │
            │                          │
            │  - Floating Button       │
            │  - Popup Dialog          │
            │  - Message UI            │
            │  - Input Handler         │
            └────────────┬─────────────┘
                         │
                         │ API Call
                         ▼
        ┌─────────────────────────────────┐
        │   Frontend Hook                 │
        │  (useChatbot)                   │
        │                                 │
        │  - State Management             │
        │  - Message History              │
        │  - Error Handling               │
        │  - Loading States               │
        └────────────────┬────────────────┘
                         │
                         │ HTTP POST
                         │ /api/chatbot
                         ▼
        ┌─────────────────────────────────┐
        │   API Route                     │
        │  (/src/app/api/chatbot/        │
        │   route.ts)                     │
        │                                 │
        │  - Clerk Authentication         │
        │  - Patient Validation           │
        │  - Context Preparation          │
        │  - Error Handling               │
        └────────────────┬────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
    ┌──────────────────┐  ┌─────────────────────┐
    │  GEMINI API      │  │  Database           │
    │  (google.com)    │  │  (Supabase)         │
    │                  │  │                     │
    │  - Generate      │  │  - Patient Data     │
    │    Response      │  │  - Progress Data    │
    │  - Temperature   │  │  - Assignments      │
    │  - Tokens        │  │  - Analytics        │
    └──────────────────┘  └─────────────────────┘
```

## Data Flow

```
USER ACTION
    │
    ▼
┌──────────────────────────────────────┐
│ Click Chatbot Button                │
│ or Type Message & Press Send          │
└──────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────┐
│ AIChatbot Component Sends:           │
│  - User message                      │
│  - Conversation history              │
│  - Patient ID                        │
└──────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────┐
│ API Route Processes:                 │
│  1. Verify user is authenticated     │
│  2. Validate patient ID              │
│  3. Fetch patient context from DB    │
│  4. Build system prompt              │
│  5. Call Gemini API                  │
│  6. Handle response/fallback         │
└──────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────┐
│ AI Response Generation:              │
│  Option A: Gemini Generates          │
│  Option B: Fallback Response         │
└──────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────┐
│ Return Response to Frontend:         │
│  {                                   │
│    "message": "...",                │
│    "timestamp": "...",               │
│    "source": "gemini" | "fallback"   │
│  }                                   │
└──────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────┐
│ Display in Chat UI:                  │
│  - Show bot message                  │
│  - Animate entry                     │
│  - Optional: Text-to-speech          │
│  - Ready for next message            │
└──────────────────────────────────────┘
```

## Component Structure

```
src/
├── app/
│   ├── patient/
│   │   └── progress/
│   │       └── page.tsx               ← Imports AIChatbot
│   │
│   └── api/
│       └── chatbot/
│           └── route.ts               ← Gemini API integration
│
├── components/
│   └── AIChatbot.tsx                  ← Chat UI component
│
└── hooks/
    └── useChatbot.ts                  ← State management hook
```

## File Interactions

```
┌────────────────────────────────────────────────────────────┐
│  page.tsx (Patient Progress)                               │
│  ├─ Imports AIChatbot component                           │
│  └─ Renders <AIChatbot position="fixed" />               │
└────────────────────────────────────────────────────────────┘
                            │
                            │ Renders
                            ▼
┌────────────────────────────────────────────────────────────┐
│  AIChatbot.tsx (Component)                                 │
│  ├─ Uses useChatbot hook for state                         │
│  ├─ Displays floating button                               │
│  ├─ Shows chat popup when open                            │
│  ├─ Handles user input                                    │
│  └─ Calls sendMessage() on form submit                    │
└────────────────────────────────────────────────────────────┘
                            │
                            │ Calls
                            ▼
┌────────────────────────────────────────────────────────────┐
│  useChatbot.ts (Hook)                                      │
│  ├─ Manages message state                                 │
│  ├─ Prepares request payload                              │
│  ├─ Calls fetch('/api/chatbot', {POST})                   │
│  ├─ Handles loading/error states                          │
│  └─ Updates UI with responses                             │
└────────────────────────────────────────────────────────────┘
                            │
                            │ Calls
                            ▼
┌────────────────────────────────────────────────────────────┐
│  /api/chatbot/route.ts (API Route)                         │
│  ├─ Verifies Clerk authentication                          │
│  ├─ Validates patient ID from DB                           │
│  ├─ Fetches patient context:                               │
│  │  ├─ Patient info                                        │
│  │  ├─ Progress data                                       │
│  │  ├─ Exercise assignments                                │
│  │  └─ Analytics                                           │
│  ├─ Builds system prompt                                  │
│  ├─ Calls Gemini API (if available)                        │
│  ├─ Falls back if needed                                  │
│  └─ Returns response JSON                                 │
└────────────────────────────────────────────────────────────┘
```

## Environment Variables

```
.env.local (Required for full AI capabilities)
├─ GEMINI_API_KEY=your-api-key-here
│  (Optional: Enables AI responses)
│
├─ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
│  (Required: User authentication)
│
└─ CLERK_SECRET_KEY
   (Required: Authentication verification)
```

## Authentication Flow

```
┌─────────────┐
│ User Logs In│
│  (Clerk)    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│ Can Access Patient Progress Page    │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│ Chatbot Button Available            │
│ (Fixed bottom-right)                │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│ Click Chatbot → Opens Popup         │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│ API Verifies Clerk Token            │
│ Validates Patient ID                │
│ Fetches Context from DB             │
│ Calls Gemini API (Authenticated)    │
│ Returns Response                    │
└─────────────────────────────────────┘
```

## Response Flow

```
USER INPUT
    │
    ├─→ useChatbot Hook
    │   ├─→ Shows loading indicator
    │   └─→ Sends POST to /api/chatbot
    │
    ├─→ API Route
    │   ├─→ Authenticates (Clerk)
    │   ├─→ Validates patient
    │   ├─→ Fetches context (Database)
    │   ├─→ Sends to Gemini API
    │   │   ├─→ Success: Get AI response
    │   │   └─→ Fail: Use fallback
    │   └─→ Returns JSON response
    │
    ├─→ Frontend Hook
    │   ├─→ Clears loading state
    │   ├─→ Adds message to history
    │   ├─→ Triggers animation
    │   └─→ Auto-scrolls to latest
    │
    └─→ Chat UI
        ├─→ Displays message bubble
        ├─→ Optional: Text-to-speech
        └─→ Ready for next message
```

## Key Features & Implementation

| Feature | Location | Implementation |
|---------|----------|----------------|
| **Floating Button** | AIChatbot.tsx | Fixed position, gradient styling |
| **Popup Dialog** | AIChatbot.tsx | AnimatePresence with framer-motion |
| **Message Display** | AIChatbot.tsx | Array mapped to MessageBubble components |
| **User Input** | AIChatbot.tsx | Form submission with useRef focus |
| **API Calls** | useChatbot.ts | fetch() with AbortController |
| **Authentication** | route.ts | Clerk auth() function |
| **Context Fetching** | route.ts | Database queries for patient data |
| **AI Generation** | route.ts | GoogleGenerativeAI client |
| **Fallback** | route.ts | getFallbackResponse() function |
| **Text-to-Speech** | AIChatbot.tsx | Web Speech API (window.speechSynthesis) |
| **Animations** | AIChatbot.tsx | Framer Motion (motion.div, AnimatePresence) |
| **State Management** | useChatbot.ts | useState hooks |
| **Scroll Behavior** | useChatbot.ts | useRef + scrollIntoView |

## Security Layers

```
Frontend (Browser)
    ↓
  Clerk Authentication
    ↓
API Route Handler
    ├─ Verify token
    ├─ Check user ID
    └─ Validate patient ID
        ↓
    Database Access
        ├─ Verify patient owns data
        └─ Fetch context
            ↓
        Gemini API
            ├─ Server-side only (key never exposed)
            └─ Rate limited by Google
                ↓
            Response returned to frontend
```

---

**This architecture ensures:**
- ✅ User authentication
- ✅ Data privacy
- ✅ Secure API calls
- ✅ Graceful fallbacks
- ✅ Responsive UI
- ✅ Personalized responses
