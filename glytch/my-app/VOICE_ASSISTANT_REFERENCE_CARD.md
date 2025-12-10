# 🎤 Voice Health Assistant - Visual Reference Card

## Button Locations

### On Progress Page
```
[Progress Page]

         🎤 ← Voice Health Assistant (NEW - Red/Pink)
         
         💜 ← AI Chatbot (Existing - Blue/Purple)

  Both floating in bottom-right corner
```

## Modal Interface

```
┌──────────────────────────────────────────┐
│ 🎤 Health Assistant              ✕      │  Header (Red/Pink)
├──────────────────────────────────────────┤
│                                          │
│  👤 You: "How am I doing?"              │  User Message
│                                          │  (Right side, Red gradient)
│  🤖 Bot: "Great question! Based on..."  │  Bot Message
│      Read aloud 🔊                      │  (Left side, White)
│                                          │
│  [Chat continues...]                    │
│                                          │
│  Listening...  🔴⚫⚫  (Pulsing)         │  Status (if listening)
│                                          │
├──────────────────────────────────────────┤
│ 🎤 | 📝 [Type or speak...]       ➤      │  Input Controls
│    Audio: ON  🔊                         │  Audio Toggle
└──────────────────────────────────────────┘
```

## Voice Feature Overview

```
VOICE INPUT FLOW:
  User speaks
    ↓
  Browser Speech Recognition
    ↓
  Real-time Transcript
    ↓
  Send to AI
    ↓
  Gemini generates response
    ↓
  Display in chat
    ↓
  Voice reads aloud 🔊
    ↓
  User can replay anytime
```

## Button States

### Voice Button (🎤)
```
[IDLE STATE]
  🎤 Red/Pink button
  Floating in corner
  Click to open modal

[LISTENING STATE]
  🎤 Button might have
  pulsing effect (inside modal)

[PROCESSING STATE]
  ⏳ Loading indicator
  Shows "Getting response..."

[READY STATE]
  ✅ Response displayed
  Ready for next question
```

## Control Guide

```
Input Controls:
┌─────────────┬─────────────────────────┬─────────────┐
│  🎤 Mic     │  📝 Text Input Field    │  ➤ Send    │
│  Button     │  Type or voice text     │  Button    │
│             │  shows here             │            │
└─────────────┴─────────────────────────┴─────────────┘

Status Controls:
┌──────────────────────────────────────────────────────┐
│  Audio: ON  🔊  (Click to toggle audio)              │
└──────────────────────────────────────────────────────┘

Header Controls:
┌──────────────────────────────────────────────────────┐
│  🎤 Health Assistant                           ✕     │
│                          (Close button)              │
└──────────────────────────────────────────────────────┘
```

## Message Types

```
YOUR MESSAGES:
┌──────────────────────────────────┐
│  How am I progressing?           │  Red/Pink gradient
│                                  │  Aligned right
└──────────────────────────────────┘  Shows user perspective

AI RESPONSES:
┌──────────────────────────────────┐
│  Great question! Based on your   │  White with border
│  recent activity, you're making  │  Aligned left
│  excellent progress...           │
│                                  │
│  Read aloud 🔊                   │  Can click to replay
└──────────────────────────────────┘
```

## Feature Highlights

```
🎤 VOICE INPUT
   Click mic → Speak clearly → See transcript → Auto-send or manual send

💬 CHAT DISPLAY  
   User messages (right, red) vs AI messages (left, white)
   Full history visible, auto-scrolls to latest

🔊 VOICE OUTPUT
   Auto-reads responses (if Audio ON)
   Click "Read aloud" to replay any message
   Toggle audio button at bottom

⚙️ STATUS INDICATORS
   "Listening..." when recording
   Loading spinner while processing
   Transcript shown while speaking
```

## Quick Action Keys

```
Microphone: 🎤 (Red when listening, Gray normally)
Send:       ➤  (Blue, enabled only with text)
Close:      ✕  (Top right of header)
Audio:      🔊  (Shows at bottom, click to toggle)
```

## Example Interaction

```
1. User clicks 🎤 button
   ↓ Modal opens

2. User clicks mic button
   ↓ Listening indicator appears
   ↓ "Listening..." message shows
   ↓ Browser shows mic permission prompt

3. User speaks: "What should I do for my back pain?"
   ↓ Real-time transcript appears
   ↓ "What should I do for my back pain?" shows
   ↓ After 2 seconds of silence, auto-sends

4. Server processes request
   ↓ "Getting response..." shows
   ↓ Spinner/loader animation

5. AI Response received
   ↓ "Back pain during recovery is common..." appears
   ↓ Voice automatically reads aloud 🔊
   ↓ Message has "Read aloud 🔊" button

6. User can:
   ↓ Ask follow-up question
   ↓ Click "Read aloud" to replay
   ↓ Toggle audio off
   ↓ Close and come back later
```

## Location Map

```
Progress Page Layout:

┌─────────────────────────────────────────┐
│ Header: "Your Progress Journey"         │
│ Stats: [4 metric cards]                 │
│ Charts: [Progress & Weekly]             │
│ Footer: "Keep up the good work" + Btn   │
│                                         │
│                    ┌────────────────┐  │
│                    │ 🎤 (NEW)       │  │
│                    │ Voice          │  │
│                    │ Assistant      │  │
│                    └────────────────┘  │
│                    ┌────────────────┐  │
│                    │ 💜 (OLD)       │  │
│                    │ Chat Bot       │  │
│                    └────────────────┘  │
│                                         │
└─────────────────────────────────────────┘

Both buttons float in bottom-right corner
🎤 is slightly above 💜
Both are z-index layered correctly
```

## Color Scheme

```
🎤 VOICE BUTTON
   Red:   #EF4444 (from-red-500)
   Pink:  #EC4899 (to-pink-600)
   Gradient: Red → Pink
   Icon:  White

MODAL HEADER
   Red:   #EF4444 (from-red-500)
   Pink:  #EC4899 (to-pink-600)
   Text:  White

USER MESSAGES
   Red:   #EF4444 (from-red-500)
   Pink:  #EC4899 (to-pink-600)
   Text:  White

BOT MESSAGES
   Background: White
   Border:     Gray
   Text:       Dark Gray

STATUS COLORS
   Listening:   Blue
   Processing:  Yellow
   Transcript:  Purple
```

## Responsive Design

```
DESKTOP (> 768px)
  ✅ Full size modal
  ✅ Comfortable spacing
  ✅ Easy input

TABLET (768px - 1024px)
  ✅ Responsive modal
  ✅ Good proportions
  ✅ Touch-friendly

MOBILE (< 768px)
  ✅ Full-screen friendly
  ✅ Touch optimized buttons
  ✅ Scrollable content
  ✅ Readable text
```

## Status Messages

```
"Listening..."
  ↑ Appears when mic is active
  ↑ Blue indicator pulsing
  ↑ While you're speaking

"Getting health response..."
  ↑ Appears after you send
  ↑ Yellow loading indicator
  ↑ While AI is thinking

"Transcript: What you said..."
  ↑ Purple box
  ↑ Shows what was recognized
  ↑ Visible before auto-send

"Audio: ON" or "Audio: OFF"
  ↑ At bottom of modal
  ↑ Click to toggle
  ↑ Shows current state
```

## Workflow Diagram

```
OPEN MODAL
    ↓
┌─────────────────────────────────────────┐
│  See: Empty chat (with instruction)     │
│  Option 1: Click mic to speak           │
│  Option 2: Type in text field           │
└─────────────────────────────────────────┘
    ↓
SPEAK OR TYPE QUESTION
    ↓
┌─────────────────────────────────────────┐
│  See: Transcript appearing               │
│  See: Listening indicator (if voice)    │
└─────────────────────────────────────────┘
    ↓
SEND QUESTION
    ↓
┌─────────────────────────────────────────┐
│  See: "Getting response..." message     │
│  See: Loading spinner                   │
└─────────────────────────────────────────┘
    ↓
RECEIVE RESPONSE
    ↓
┌─────────────────────────────────────────┐
│  See: AI response appears               │
│  Hear: Voice reads it aloud (auto)      │
│  See: "Read aloud 🔊" button            │
│  Can: Click to replay anytime           │
└─────────────────────────────────────────┘
    ↓
CONTINUE OR CLOSE
    ↓
  Ask more questions → Repeat
  OR
  Click X → Close modal
```

---

**Save this card for quick reference!** 📋✨
