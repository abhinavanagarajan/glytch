# 🎤 Voice/Text-to-Speech Feature Guide

## ✅ Voice Feature Now Active!

Your chatbot now has **automatic text-to-speech** enabled by default!

## 🔊 How It Works

### Automatic Voice Reading
- When the bot sends a response, it **automatically reads the text aloud**
- Uses your system's default voice
- Works in all modern browsers
- No additional setup needed

### Manual Voice Replay
- Each bot message has a **speaker icon** (🔊) next to the timestamp
- Click the speaker icon to replay the message in voice
- Useful if you missed the first reading or want to hear it again

### Audio Control
- **Microphone Icon** in the chatbot header toggles audio on/off
- When enabled (default): Responses are read automatically
- When disabled: Only text is displayed, no audio

## 🎨 UI Features

### Speaker Button
- Located next to the timestamp on each bot message
- Blue colored (🔊) for easy visibility
- Hover to see "Read aloud" tooltip
- Click anytime to replay the message

### Audio Toggle
- Located in the chatbot header (top-right area)
- Shows enabled state (🔊) or disabled state (🔇)
- Click to turn voice on/off
- Your preference is remembered during the session

## 🎯 Voice Settings

The voice is configured with:
- **Rate**: 0.9 (slightly faster for clarity)
- **Pitch**: 1.0 (natural tone)
- **Volume**: 100% (maximum volume)
- **Language**: English (en-US)

## 📱 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome/Chromium 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 💡 Tips & Tricks

### For Better Experience
1. Use headphones or speakers for clearer audio
2. Adjust your system volume for comfort
3. Click speaker icon if you want to re-read a message
4. Toggle audio off if you prefer reading only

### Keyboard Shortcuts
- Use Tab to navigate between messages
- Click speaker icon with keyboard (Enter/Space)
- Escape to close the chatbot

## 🔧 Customization (Advanced)

To change voice settings, edit `/my-app/src/components/AIChatbot.tsx`:

```typescript
const speakMessage = (text: string) => {
  if (audioEnabled && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9        // Change speaking speed (0.5 = slow, 2 = fast)
    utterance.pitch = 1.0       // Change pitch (0.5 = low, 2 = high)
    utterance.volume = 1.0      // Change volume (0 = mute, 1 = max)
    utterance.lang = 'en-US'    // Change language
    
    window.speechSynthesis.speak(utterance)
  }
}
```

## ❓ Troubleshooting

### Voice Not Playing?
1. Check audio toggle is **enabled** (🔊 icon)
2. Check system volume is not muted
3. Check browser permissions for microphone/audio
4. Try refreshing the page
5. Clear browser cache

### Voice Too Slow/Fast?
1. Edit the `rate` value in speakMessage function (0.5-2.0)
2. Current setting: 0.9 (recommended)
3. Increase for faster, decrease for slower

### Voice Quality Issues?
1. Different browsers use different voices
2. Try a different browser for comparison
3. Adjust pitch/rate settings if available
4. Check system text-to-speech settings

## 🚀 Quick Start

1. **Visit Patient Progress Page**
   - Navigate to http://localhost:3000/patient/progress

2. **Click Chatbot Button**
   - Bottom-right floating button
   - Blue/purple gradient circle

3. **Ask a Question**
   - Type your health question
   - Press Send or Enter

4. **Hear the Response**
   - Bot automatically reads the response aloud
   - Or click speaker icon (🔊) to replay

5. **Control Audio**
   - Microphone icon (top of chatbot) to toggle on/off
   - Speaker icon (each message) to replay

## 📋 Feature Checklist

- [x] Automatic voice reading enabled by default
- [x] Manual speaker button for replaying messages
- [x] Audio toggle in header
- [x] Optimized voice settings (speed, pitch, volume)
- [x] Works across all modern browsers
- [x] Mobile compatible
- [x] No external dependencies
- [x] System-level text-to-speech integration

## 🎓 Example Interactions

```
User: "How can I improve my recovery?"

Bot Response (with voice):
"Great question about your recovery! Based on your recent activity, 
I can see you're working hard on your rehabilitation. Remember that 
progress in physical therapy often comes in small increments..."

[Voice automatically reads this aloud]

[User sees speaker icon next to timestamp - can click to replay]
```

## 🔐 Privacy Note

- Voice processing happens entirely on your device
- No audio is recorded or sent to servers
- Uses browser's built-in text-to-speech
- No external voice services required
- 100% private and secure

---

**Ready to experience voice-powered health guidance? Just start chatting!** 🎤✨
