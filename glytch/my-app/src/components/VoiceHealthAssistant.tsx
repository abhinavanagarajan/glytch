// components/VoiceHealthAssistant.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, X, Send, Loader, Volume2, AlertCircle } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import toast from 'react-hot-toast'

interface VoiceResponse {
  text: string
  timestamp: string
  source: 'voice' | 'text'
}

const VoiceHealthAssistant: React.FC = () => {
  const { user } = useUser()
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [responses, setResponses] = useState<VoiceResponse[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const recognitionRef = useRef<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = 'en-US'

        recognition.onstart = () => {
          setIsListening(true)
          setTranscript('')
        }

        recognition.onresult = (event: any) => {
          let interimTranscript = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              setTranscript(transcript)
            } else {
              interimTranscript += transcript
            }
          }
          if (interimTranscript) {
            setTranscript(interimTranscript)
          }
        }

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          toast.error(`Mic error: ${event.error}`)
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current = recognition
      }
    }
  }, [])

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [responses])

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const speakResponse = (text: string) => {
    if (audioEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1.0
      utterance.volume = 1.0
      utterance.lang = 'en-US'
      window.speechSynthesis.speak(utterance)
    }
  }

  const sendQuestion = async (question: string) => {
    if (!question.trim() || isProcessing) return

    try {
      setIsProcessing(true)
      setTranscript('')

      // Get AI response
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: question,
          conversationHistory: responses.map(r => ({
            role: r.source === 'voice' ? 'user' : 'assistant',
            content: r.text,
            timestamp: r.timestamp
          })),
          patientId: user?.id
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      const botResponse = data.message

      // Add responses to list
      setResponses(prev => [
        ...prev,
        { text: question, timestamp: new Date().toISOString(), source: 'voice' },
        { text: botResponse, timestamp: new Date().toISOString(), source: 'text' }
      ])

      // Speak the response
      speakResponse(botResponse)
      toast.success('Response received!')
    } catch (error: any) {
      console.error('Error:', error)
      toast.error('Failed to get health response')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (transcript.trim()) {
      await sendQuestion(transcript)
    }
  }

  return (
    <>
      {/* Floating Voice Button */}
      <motion.button
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-gradient-to-r from-red-500 to-pink-600 rounded-full shadow-lg flex items-center justify-center group hover:shadow-2xl transition-all duration-300"
        title="Voice Health Assistant"
      >
        <Mic className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Health Assistant</h2>
                    <p className="text-sm text-red-100">Ask health questions</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {responses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-8">
                    <Mic className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium">Start by asking a health question</p>
                    <p className="text-gray-400 text-sm mt-2">Use the microphone or type below</p>
                  </div>
                ) : (
                  responses.map((response, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${response.source === 'voice' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-3 rounded-2xl ${
                          response.source === 'voice'
                            ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                            : 'bg-white border border-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{response.text}</p>
                        {response.source === 'text' && (
                          <button
                            onClick={() => speakResponse(response.text)}
                            className="mt-2 text-xs flex items-center space-x-1 hover:opacity-80 transition-opacity"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>Read aloud</span>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Status Messages */}
              {isListening && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-2 bg-blue-50 border-t border-blue-200 flex items-center space-x-2"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <p className="text-sm text-blue-700">Listening...</p>
                </motion.div>
              )}

              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-2 bg-yellow-50 border-t border-yellow-200 flex items-center space-x-2"
                >
                  <Loader className="w-4 h-4 text-yellow-600 animate-spin" />
                  <p className="text-sm text-yellow-700">Getting health response...</p>
                </motion.div>
              )}

              {transcript && !isListening && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-2 bg-purple-50 border-t border-purple-200"
                >
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-purple-700">Transcript: </span>
                    {transcript}
                  </p>
                </motion.div>
              )}

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4 bg-white rounded-b-2xl">
                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    disabled={isProcessing}
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isListening
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={isListening ? 'Stop listening' : 'Start listening'}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  <input
                    type="text"
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Or type your question..."
                    disabled={isProcessing}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 text-sm disabled:bg-gray-100"
                  />

                  <button
                    type="submit"
                    disabled={!transcript.trim() || isProcessing}
                    className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>

                {/* Audio Toggle */}
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className="mt-3 text-xs text-gray-600 hover:text-gray-800 flex items-center space-x-1 transition-colors"
                >
                  {audioEnabled ? (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>Audio ON</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      <span>Audio OFF</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default VoiceHealthAssistant
