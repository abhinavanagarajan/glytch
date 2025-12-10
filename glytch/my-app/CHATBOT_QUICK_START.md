# 🤖 Chatbot Quick Start Guide

## 🎯 What's New

A **Gemini AI-powered chatbot** has been added to the Patient Progress page! It's a floating button that opens as a popup where patients can ask health-related questions.

## 🔑 Setup (Takes 2 Minutes!)

### Step 1: Get Your Gemini API Key
1. Visit: https://aistudio.google.com/app/apikey
2. Click **"Create API Key"**
3. Copy the key

### Step 2: Add to Your Project
Create or edit `.env.local` in the `my-app` folder:
```
GEMINI_API_KEY=your-key-here
```

### Step 3: Restart
```bash
npm run dev
```

**Done!** 🎉

## 💬 How to Use It

### For Patients
1. Go to the **Patient Progress** page
2. Click the **floating button** in the bottom-right corner (blue/purple circle with a message icon)
3. The chatbot popup opens
4. Type your health question and press Send
5. Get personalized AI-powered responses!

### Example Questions
- "How can I improve my posture?"
- "What should I do if I have pain?"
- "How am I progressing?"
- "Give me motivation!"
- "What exercises should I do?"

## 🎨 Chatbot Features

| Feature | Description |
|---------|-------------|
| **AI Responses** | Powered by Google Gemini |
| **Personalized** | Uses your progress data |
| **History** | Remembers conversation context |
| **Audio** | Text-to-speech support |
| **Smart Fallback** | Works even without API key |
| **Mobile** | Responsive on all devices |
| **Clean UI** | Beautiful gradient design |

## 🎛️ Controls

Inside the chatbot popup:

- 🎤 **Audio Toggle**: Enable/disable text-to-speech
- 🔄 **Refresh Icon**: Clear conversation history
- ➖ **Minimize**: Collapse to header only
- ✕ **Close**: Exit chatbot

## 📊 What It Knows About You

The chatbot has access to:
- Your name and injury information
- Your recent exercise progress
- How long you've been exercising
- Your accuracy scores
- Your assigned exercises
- Your conversation history

All of this helps it give **personalized, relevant answers!**

## ✅ No API Key? No Problem!

If you don't add a Gemini API key, the chatbot still works! It uses intelligent fallback responses for:
- Exercise motivation
- Progress insights
- Pain management guidance
- Goal-setting advice
- General rehabilitation tips

## 🐛 Troubleshooting

### Chatbot not showing?
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Clear browser cache
- Make sure you're on the Patient Progress page

### Responses are generic?
- Make sure you're logged in
- Try adding more detail to your question
- Check that exercises are assigned to you

### "Trouble connecting" error?
- Add your API key to `.env.local`
- Restart the development server
- The chatbot will still work with fallback responses!

## 📚 More Info

For detailed setup and troubleshooting, see:
- **Setup Guide**: `GEMINI_CHATBOT_SETUP.md`
- **Integration Details**: `CHATBOT_INTEGRATION_SUMMARY.md`

## 🚨 Remember

**This chatbot provides general guidance, not medical advice.**
Always consult your healthcare provider for serious health concerns!

---

## 🎯 Quick Checklist

- [ ] Get Gemini API Key from Google AI Studio
- [ ] Add API key to `.env.local`
- [ ] Restart development server
- [ ] Go to Patient Progress page
- [ ] Click the chatbot button
- [ ] Start chatting!

**Questions? Check the detailed setup guides or contact your development team.** 💪
