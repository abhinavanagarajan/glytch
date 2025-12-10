'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LandingPage from '@/components/LandingPage'
import VRExperience from '@/components/VRExperience'
import { useGameStore } from '@/store/gameStore'

export default function Home() {
  const { isInVR, currentExercise } = useGameStore()

  return (
    <main className="min-h-[100dvh]">
      <AnimatePresence mode="wait">
        {!isInVR ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage />
          </motion.div>
        ) : (
          <motion.div
            key="vr"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0"
          >
            <VRExperience />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

