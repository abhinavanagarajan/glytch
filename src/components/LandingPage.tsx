'use client'

import { motion } from 'framer-motion'
import { useGameStore, exercises, ExerciseType, Difficulty, Environment } from '@/store/gameStore'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function LandingPage() {
  const {
    currentExercise,
    difficulty,
    environment,
    audioEnabled,
    selectExercise,
    setDifficulty,
    setEnvironment,
    setAudioEnabled,
    setIsInVR,
    completedExercises,
    totalSessionTime,
  } = useGameStore()

  const handleStartVR = () => {
    if (!currentExercise) {
      alert('Please select an exercise first!')
      return
    }
    setIsInVR(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen min-h-[100dvh] overflow-y-auto py-8 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.header variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 glow-primary">
            <svg className="w-14 h-14 text-dark-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="28" r="14" fill="currentColor"/>
              <path d="M50 42 L50 72 M32 52 L68 52 M50 72 L36 92 M50 72 L64 92" 
                    stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
              <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="3" opacity="0.4"/>
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-3 text-gradient">
            PhysioVR
          </h1>
          <p className="text-xl text-gray-300">
            Therapeutic Exercise in Virtual Reality
          </p>
          
          {/* Stats */}
          {completedExercises > 0 && (
            <div className="mt-6 inline-flex gap-6 px-6 py-3 rounded-2xl glass">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400">{completedExercises}</div>
                <div className="text-xs text-gray-400">Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400">{formatTime(totalSessionTime)}</div>
                <div className="text-xs text-gray-400">Total Time</div>
              </div>
            </div>
          )}
        </motion.header>

        {/* Exercise Selection */}
        <motion.section variants={itemVariants} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Choose Your Exercise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(Object.keys(exercises) as ExerciseType[]).map((key) => {
              const exercise = exercises[key]
              const isSelected = currentExercise === key
              
              return (
                <motion.button
                  key={key}
                  onClick={() => selectExercise(key)}
                  className={`exercise-card text-left ${isSelected ? 'selected' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{exercise.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {exercise.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">
                        {exercise.description}
                      </p>
                      <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary-400/20 text-primary-400">
                        {exercise.duration}
                      </span>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-primary-400 flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </motion.section>

        {/* Settings */}
        <motion.section variants={itemVariants} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Session Settings</h2>
          <div className="glass rounded-3xl p-6 space-y-5">
            {/* Difficulty */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="text-gray-300 font-medium">Intensity Level</label>
              <div className="flex gap-2">
                {(['gentle', 'moderate', 'active'] as Difficulty[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      difficulty === level
                        ? 'bg-primary-400 text-dark-400'
                        : 'bg-dark-300 text-gray-300 hover:bg-dark-200'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Environment */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="text-gray-300 font-medium">Environment</label>
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value as Environment)}
                className="px-4 py-2 rounded-xl bg-dark-300 text-white border border-white/10 focus:border-primary-400 focus:outline-none transition-colors"
              >
                <option value="forest">🌲 Peaceful Forest</option>
                <option value="ocean">🌊 Ocean Sunset</option>
                <option value="mountains">⛰️ Mountain Vista</option>
                <option value="zen">🎋 Zen Garden</option>
              </select>
            </div>

            {/* Audio Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-gray-300 font-medium">Ambient Sound</label>
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  audioEnabled ? 'bg-primary-400' : 'bg-dark-200'
                }`}
              >
                <motion.div
                  className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-md"
                  animate={{ left: audioEnabled ? '1.75rem' : '0.25rem' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </div>
        </motion.section>

        {/* Start Button */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.button
            onClick={handleStartVR}
            disabled={!currentExercise}
            className={`btn-primary inline-flex items-center gap-3 ${
              !currentExercise ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            whileHover={currentExercise ? { scale: 1.05 } : {}}
            whileTap={currentExercise ? { scale: 0.95 } : {}}
          >
            <span className="text-2xl">🥽</span>
            <span>Enter VR Experience</span>
          </motion.button>
          
          <p className="mt-4 text-sm text-gray-500">
            Place your phone in a Google Cardboard viewer for the full VR experience.
            <br />
            Or view in browser to preview exercises.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.footer variants={itemVariants} className="mt-16 text-center text-gray-500 text-sm">
          <p>Built for therapeutic wellness • Works with Google Cardboard</p>
        </motion.footer>
      </motion.div>
    </div>
  )
}

