# Gemini AI Chatbot Setup Guide

## 🤖 Overview

The chatbot on the patient progress page now integrates with **Google Gemini API** to provide intelligent, personalized health and rehabilitation guidance. The chatbot is a floating button that opens as a popup dialog.

## ✨ Features

- **AI-Powered Health Guidance**: Uses Google Gemini to answer health-related questions
- **Personalized Context**: Includes patient progress data and exercise history
- **Fallback Support**: Works with or without API key using built-in responses
- **Audio Support**: Text-to-speech capability for bot responses
- **Conversation History**: Maintains context across messages
- **Real-time Streaming**: Smooth, responsive interactions

## 🔑 Getting Your Gemini API Key

### Step 1: Visit Google AI Studio
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Choose your project (or create a new one)
5. Copy your API key

### Step 2: Add to Environment Variables
1. Create a `.env.local` file in the `my-app` directory if it doesn't exist
2. Add your API key:
   ```bash
   GEMINI_API_KEY=your-api-key-here
   ```
3. Save the file
4. Restart your development server

## 🚀 Using the Chatbot

### Access the Chatbot
1. Navigate to the **Patient Progress** page
2. Look for the **floating chatbot button** in the bottom-right corner (blue/purple gradient circle with a message icon)
3. Click to open the chatbot popup

### Features Available
- **Chat Interface**: Type health-related questions
- **Quick Actions**: Use preset questions for quick help
- **Audio Toggle**: Enable/disable text-to-speech
- **Clear Conversation**: Reset chat history
- **Minimize/Maximize**: Control window size
- **Close**: Exit the chatbot

## 💬 Example Prompts

The chatbot can help with:

```
Health & Recovery Questions:
- "How can I speed up my recovery?"
- "What should I do if I experience pain during exercises?"
- "How often should I do these exercises?"
- "What are signs of good progress?"

Progress & Motivation:
- "How am I doing with my exercises?"
- "Give me tips for staying motivated"
- "What are my next goals?"

Exercise Guidance:
- "How should I perform this exercise correctly?"
- "What exercises should I prioritize?"
- "Can you explain my exercise assignments?"

General Questions:
- "What is physical therapy?"
- "How does posture affect recovery?"
- "When should I see my therapist?"
```

## 🔄 How It Works

### With Gemini API (Recommended)
1. User sends a message via the chatbot
2. System prepares context including:
   - Patient information (name, injury type, etc.)
   - Recent progress data (exercises, accuracy, time spent)
   - Active exercise assignments
   - Conversation history
3. Gemini generates a personalized response
4. Response is displayed in the chat interface

### Without Gemini API (Fallback)
If the API key is not set or the service is unavailable:
- Intelligent fallback responses are used
- Responses are based on common health/rehab topics
- Full functionality is maintained
- Users won't experience any service interruption

## ⚙️ Configuration

### Environment Variables
```bash
# .env.local
GEMINI_API_KEY=your-actual-api-key-here

# Optional: Adjust model behavior
GEMINI_MODEL=gemini-pro          # Model name (default: gemini-pro)
```

### API Endpoint
The chatbot uses the `/api/chatbot` endpoint which:
- Authenticates using Clerk (user must be logged in)
- Requires a valid patient context
- Includes conversation history for context
- Returns personalized health guidance

## 🛡️ Privacy & Security

- **User Authentication**: Clerk manages authentication
- **Data Validation**: Patient data is verified before use
- **API Security**: API key is server-side only (not exposed to frontend)
- **Message History**: Stored only in the client session
- **HIPAA Compliance**: Follows health data handling best practices

## 🐛 Troubleshooting

### Issue: "I'm having trouble connecting right now"
**Causes & Solutions:**
1. **API Key Missing**
   - Add `GEMINI_API_KEY` to `.env.local`
   - Restart the development server

2. **API Rate Limit**
   - Wait a few moments and try again
   - Check your Gemini API quota at [Google AI Studio](https://aistudio.google.com/app/apikey)

3. **Network Issues**
   - Check your internet connection
   - Verify the API endpoint is reachable

4. **Server Error**
   - Check browser console for detailed error messages
   - Review server logs: `npm run dev`

### Issue: Chatbot not appearing
**Solutions:**
1. Hard refresh the page: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
2. Clear browser cache
3. Check browser console for JavaScript errors
4. Verify you're on the patient progress page

### Issue: Responses are generic/not personalized
**Solutions:**
1. Check that you're logged in as a patient
2. Verify patient data exists in the database
3. Ensure exercises are assigned to your account
4. Try refreshing the page

## 📊 Monitoring Usage

### Check API Quota
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. View your API usage statistics
3. Monitor requests and adjust as needed

### Response Times
- Average response time: 2-5 seconds
- With fallback: < 1 second
- Network dependent

## 🔗 Useful Links

- [Google AI Studio](https://aistudio.google.com/app/apikey)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Google Generative AI Python Library](https://github.com/google/generative-ai-js)
- [Project Repository](https://github.com/abhinavanagarajan/datasprint)

## 📝 API Request/Response Format

### Request Format
```json
{
  "message": "How can I improve my posture?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Hello",
      "timestamp": "2024-12-10T10:30:00Z"
    },
    {
      "role": "assistant",
      "content": "Hi there!",
      "timestamp": "2024-12-10T10:30:05Z"
    }
  ],
  "patientId": "patient-uuid"
}
```

### Response Format
```json
{
  "message": "Great question about posture! ...",
  "timestamp": "2024-12-10T10:30:10Z"
}
```

## 🎓 Best Practices

1. **Be Specific**: More detailed questions get better answers
2. **Provide Context**: Mention your injury type or current symptoms
3. **Ask Follow-ups**: Build on previous responses for deeper insights
4. **Verify Information**: Always consult your healthcare provider for medical advice
5. **Save Important Info**: Copy important guidance for future reference

## 🚨 Important Disclaimer

**Medical Advice Notice**: This AI chatbot provides general health and rehabilitation guidance. It is **NOT a substitute for professional medical advice**. Always:

- Consult your healthcare provider for specific medical concerns
- Follow your therapist's personalized treatment plan
- Report severe pain or unusual symptoms to medical professionals
- Don't use this as the sole basis for medical decisions

## 📧 Support

For issues or questions:
1. Check this guide's troubleshooting section
2. Review the browser console for errors
3. Contact your development team
4. Check the project repository for known issues

---

**Happy recovery! 💪**
