import { create } from 'zustand'

export type ExerciseType = 'shoulder' | 'neck' | 'arms' | 'breathing'
export type Difficulty = 'gentle' | 'moderate' | 'active'
export type Environment = 'forest' | 'ocean' | 'mountains' | 'zen'

export interface Exercise {
  id: ExerciseType
  name: string
  description: string
  duration: string
  icon: string
  steps: ExerciseStep[]
}

export interface ExerciseStep {
  instruction: string
  duration: number // in seconds
  targetPosition?: { x: number; y: number; z: number }
  breathPhase?: 'in' | 'out' | 'hold'
}

interface GameState {
  // VR State
  isInVR: boolean
  isVRSupported: boolean
  
  // Exercise Selection
  currentExercise: ExerciseType | null
  difficulty: Difficulty
  environment: Environment
  audioEnabled: boolean
  
  // Exercise Progress
  isExerciseActive: boolean
  currentStepIndex: number
  exerciseProgress: number // 0-100
  sessionStartTime: number | null
  completedExercises: number
  totalSessionTime: number
  
  // Actions
  setIsInVR: (value: boolean) => void
  setVRSupported: (value: boolean) => void
  selectExercise: (exercise: ExerciseType) => void
  setDifficulty: (difficulty: Difficulty) => void
  setEnvironment: (environment: Environment) => void
  setAudioEnabled: (enabled: boolean) => void
  startExercise: () => void
  nextStep: () => void
  updateProgress: (progress: number) => void
  completeExercise: () => void
  resetExercise: () => void
  exitVR: () => void
}

export const exercises: Record<ExerciseType, Exercise> = {
  shoulder: {
    id: 'shoulder',
    name: 'Shoulder Mobility',
    description: 'Rotations & stretches for shoulder recovery',
    duration: '5-10 min',
    icon: '🦾',
    steps: [
      { instruction: 'Stand relaxed with arms at your sides.\nTake a deep breath.', duration: 5 },
      { instruction: 'Slowly raise your right shoulder up\ntowards your ear.', duration: 8, targetPosition: { x: 1, y: 2, z: -3 } },
      { instruction: 'Hold this position.\nBreathe steadily.', duration: 5 },
      { instruction: 'Slowly lower your shoulder back down.\nFeel the release.', duration: 8 },
      { instruction: 'Now raise your left shoulder up\ntowards your ear.', duration: 8, targetPosition: { x: -1, y: 2, z: -3 } },
      { instruction: 'Hold this position.\nKeep breathing.', duration: 5 },
      { instruction: 'Slowly lower your shoulder back down.', duration: 8 },
      { instruction: 'Now raise both shoulders together.\nShrug them up high.', duration: 8, targetPosition: { x: 0, y: 2.5, z: -3 } },
      { instruction: 'Hold at the top.\nFeel the tension.', duration: 5 },
      { instruction: 'Let them drop completely.\nRelax and breathe.', duration: 8 },
      { instruction: 'Roll both shoulders forward\nin slow circles.', duration: 15 },
      { instruction: 'Now roll them backward\nin slow circles.', duration: 15 },
      { instruction: 'Excellent work!\nTake a moment to notice how you feel.', duration: 8 },
    ],
  },
  neck: {
    id: 'neck',
    name: 'Neck Relief',
    description: 'Gentle movements for neck tension',
    duration: '5-8 min',
    icon: '🧘',
    steps: [
      { instruction: 'Sit or stand comfortably.\nRelax your shoulders.', duration: 5 },
      { instruction: 'Look at the target on your RIGHT.\nTurn your head slowly.', duration: 10, targetPosition: { x: 2, y: 1.6, z: -2 } },
      { instruction: 'Hold gently.\nDon\'t strain.', duration: 5 },
      { instruction: 'Return to center slowly.', duration: 5 },
      { instruction: 'Look at the target on your LEFT.\nTurn your head slowly.', duration: 10, targetPosition: { x: -2, y: 1.6, z: -2 } },
      { instruction: 'Hold gently.\nBreathe.', duration: 5 },
      { instruction: 'Return to center.', duration: 5 },
      { instruction: 'Tilt your head to the RIGHT.\nEar towards shoulder.', duration: 10, targetPosition: { x: 1.5, y: 1.2, z: -3 } },
      { instruction: 'Hold this stretch.\nKeep shoulders down.', duration: 8 },
      { instruction: 'Return to center.', duration: 5 },
      { instruction: 'Tilt your head to the LEFT.\nEar towards shoulder.', duration: 10, targetPosition: { x: -1.5, y: 1.2, z: -3 } },
      { instruction: 'Hold this stretch.', duration: 8 },
      { instruction: 'Return to center.\nWell done!', duration: 5 },
    ],
  },
  arms: {
    id: 'arms',
    name: 'Arm Stretches',
    description: 'Full arm range of motion exercises',
    duration: '8-12 min',
    icon: '💪',
    steps: [
      { instruction: 'Stand with space around you.\nArms relaxed.', duration: 5 },
      { instruction: 'Raise your right arm overhead.\nFollow the target.', duration: 10, targetPosition: { x: 0.5, y: 2.5, z: -2 } },
      { instruction: 'Reach up and stretch.\nFeel the lengthening.', duration: 8 },
      { instruction: 'Lower slowly.', duration: 5 },
      { instruction: 'Raise your left arm overhead.\nFollow the target.', duration: 10, targetPosition: { x: -0.5, y: 2.5, z: -2 } },
      { instruction: 'Reach up and stretch.', duration: 8 },
      { instruction: 'Lower slowly.', duration: 5 },
      { instruction: 'Extend both arms to the sides.\nLike a T shape.', duration: 8, targetPosition: { x: 0, y: 1.6, z: -3 } },
      { instruction: 'Make small circles forward.', duration: 15 },
      { instruction: 'Now make small circles backward.', duration: 15 },
      { instruction: 'Cross your right arm over your chest.\nHold with left hand.', duration: 10, targetPosition: { x: -0.5, y: 1.5, z: -2 } },
      { instruction: 'Hold the stretch.\nBreathe deeply.', duration: 10 },
      { instruction: 'Switch arms.\nLeft arm across chest.', duration: 10, targetPosition: { x: 0.5, y: 1.5, z: -2 } },
      { instruction: 'Hold the stretch.', duration: 10 },
      { instruction: 'Release and shake out your arms.\nGreat job!', duration: 8 },
    ],
  },
  breathing: {
    id: 'breathing',
    name: 'Deep Breathing',
    description: 'Relaxation & breathing exercises',
    duration: '5 min',
    icon: '🌬️',
    steps: [
      { instruction: 'Find a comfortable position.\nClose your eyes if you like.', duration: 5 },
      { instruction: 'Breathe IN slowly...\nFill your lungs completely.', duration: 4, breathPhase: 'in' },
      { instruction: 'HOLD your breath gently...', duration: 4, breathPhase: 'hold' },
      { instruction: 'Breathe OUT slowly...\nRelease all tension.', duration: 6, breathPhase: 'out' },
      { instruction: 'Breathe IN...\nExpand your belly.', duration: 4, breathPhase: 'in' },
      { instruction: 'HOLD...', duration: 4, breathPhase: 'hold' },
      { instruction: 'Breathe OUT...\nLet everything go.', duration: 6, breathPhase: 'out' },
      { instruction: 'Breathe IN deeply...', duration: 4, breathPhase: 'in' },
      { instruction: 'HOLD...', duration: 4, breathPhase: 'hold' },
      { instruction: 'Breathe OUT completely...', duration: 6, breathPhase: 'out' },
      { instruction: 'Breathe IN...\nFeel the calm.', duration: 4, breathPhase: 'in' },
      { instruction: 'HOLD...', duration: 4, breathPhase: 'hold' },
      { instruction: 'Breathe OUT...\nRelax deeper.', duration: 6, breathPhase: 'out' },
      { instruction: 'Return to natural breathing.\nNotice how you feel.', duration: 10 },
      { instruction: 'Well done.\nCarry this calm with you.', duration: 5 },
    ],
  },
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial State
  isInVR: false,
  isVRSupported: false,
  currentExercise: null,
  difficulty: 'moderate',
  environment: 'forest',
  audioEnabled: true,
  isExerciseActive: false,
  currentStepIndex: 0,
  exerciseProgress: 0,
  sessionStartTime: null,
  completedExercises: 0,
  totalSessionTime: 0,

  // Actions
  setIsInVR: (value) => set({ isInVR: value }),
  setVRSupported: (value) => set({ isVRSupported: value }),
  
  selectExercise: (exercise) => set({ currentExercise: exercise }),
  
  setDifficulty: (difficulty) => set({ difficulty }),
  
  setEnvironment: (environment) => set({ environment }),
  
  setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),
  
  startExercise: () => set({
    isExerciseActive: true,
    currentStepIndex: 0,
    exerciseProgress: 0,
    sessionStartTime: Date.now(),
  }),
  
  nextStep: () => {
    const { currentExercise, currentStepIndex } = get()
    if (!currentExercise) return
    
    const exercise = exercises[currentExercise]
    const totalSteps = exercise.steps.length
    const newIndex = currentStepIndex + 1
    
    if (newIndex >= totalSteps) {
      get().completeExercise()
    } else {
      set({
        currentStepIndex: newIndex,
        exerciseProgress: Math.round((newIndex / totalSteps) * 100),
      })
    }
  },
  
  updateProgress: (progress) => set({ exerciseProgress: progress }),
  
  completeExercise: () => {
    const { sessionStartTime, completedExercises, totalSessionTime } = get()
    const sessionDuration = sessionStartTime ? Math.round((Date.now() - sessionStartTime) / 1000) : 0
    
    set({
      isExerciseActive: false,
      exerciseProgress: 100,
      completedExercises: completedExercises + 1,
      totalSessionTime: totalSessionTime + sessionDuration,
    })
  },
  
  resetExercise: () => set({
    isExerciseActive: false,
    currentStepIndex: 0,
    exerciseProgress: 0,
    sessionStartTime: null,
  }),
  
  exitVR: () => set({
    isInVR: false,
    isExerciseActive: false,
    currentStepIndex: 0,
    exerciseProgress: 0,
  }),
}))

