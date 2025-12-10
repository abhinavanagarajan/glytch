'use client'

import { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Environment, 
  Text, 
  Float, 
  Stars,
  Sky,
  Cloud,
  Sphere,
  Box,
  Ring,
} from '@react-three/drei'
import { XR, createXRStore, useXRStore } from '@react-three/xr'
import * as THREE from 'three'
import { useGameStore, exercises, ExerciseType } from '@/store/gameStore'

// Create XR store for VR session management
const xrStore = createXRStore()

// Loading component
function Loader() {
  return (
    <div className="fixed inset-0 bg-dark-400 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="loading-spinner mx-auto mb-4"></div>
        <p className="text-primary-400">Loading VR Experience...</p>
      </div>
    </div>
  )
}

// Therapeutic environment based on selection
function TherapeuticEnvironment({ type }: { type: string }) {
  if (type === 'ocean') {
    return (
      <>
        <Sky sunPosition={[100, 10, 100]} turbidity={8} rayleigh={2} />
        <fog attach="fog" args={['#ff9966', 10, 50]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#1e3a5f" metalness={0.8} roughness={0.2} />
        </mesh>
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      </>
    )
  }
  
  if (type === 'mountains') {
    return (
      <>
        <Sky sunPosition={[0, 1, 0]} turbidity={10} rayleigh={0.5} />
        <fog attach="fog" args={['#c9d6df', 5, 30]} />
        <Cloud position={[-4, 8, -15]} speed={0.2} opacity={0.5} />
        <Cloud position={[4, 10, -20]} speed={0.2} opacity={0.4} />
        <Cloud position={[0, 7, -25]} speed={0.1} opacity={0.6} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
      </>
    )
  }
  
  if (type === 'zen') {
    return (
      <>
        <fog attach="fog" args={['#2d3436', 5, 25]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        {/* Zen stones */}
        {[[-3, 0, -5], [3, 0, -6], [-1, 0, -8]].map((pos, i) => (
          <Sphere key={i} args={[0.3 + i * 0.1]} position={pos as [number, number, number]}>
            <meshStandardMaterial color="#636e72" roughness={0.9} />
          </Sphere>
        ))}
        <Stars radius={50} depth={50} count={1000} factor={2} saturation={0} fade speed={0.5} />
      </>
    )
  }
  
  // Default: forest
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} turbidity={10} rayleigh={0.4} />
      <fog attach="fog" args={['#88c0d0', 8, 35]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#2d5a27" />
      </mesh>
      {/* Simple trees representation */}
      {[[-4, 0, -8], [4, 0, -10], [-2, 0, -12], [3, 0, -6]].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh position={[0, 1.5, 0]}>
            <coneGeometry args={[0.8, 2, 8]} />
            <meshStandardMaterial color="#1e4620" />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.15, 0.2, 0.8]} />
            <meshStandardMaterial color="#5d4e37" />
          </mesh>
        </group>
      ))}
    </>
  )
}

// Floating guide orb that provides visual feedback
function GuideOrb({ isActive }: { isActive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hue, setHue] = useState(0.5)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      
      if (isActive) {
        setHue((0.5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1))
      }
    }
  })
  
  const color = new THREE.Color().setHSL(hue, 0.8, 0.5)
  
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[0.2, 32, 32]} position={[0, 1.5, -2.5]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.5 : 0.2}
          metalness={0.7}
          roughness={0.3}
        />
      </Sphere>
      {/* Glow effect */}
      <Sphere args={[0.25, 16, 16]} position={[0, 1.5, -2.5]}>
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </Sphere>
    </Float>
  )
}

// Movement target for exercises
function MovementTarget({ position, color, visible }: { 
  position: [number, number, number]
  color: string
  visible: boolean 
}) {
  const ringRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (ringRef.current && visible) {
      ringRef.current.rotation.z = state.clock.elapsedTime
    }
  })
  
  if (!visible) return null
  
  return (
    <group position={position}>
      <Ring ref={ringRef} args={[0.15, 0.2, 32]}>
        <meshBasicMaterial color={color} transparent opacity={0.8} side={THREE.DoubleSide} />
      </Ring>
      {/* Pulsing outer ring */}
      <Ring args={[0.2, 0.22, 32]}>
        <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
      </Ring>
    </group>
  )
}

// Breathing guide visualization
function BreathingGuide({ phase, visible }: { phase: 'in' | 'out' | 'hold' | null, visible: boolean }) {
  const sphereRef = useRef<THREE.Mesh>(null)
  const [scale, setScale] = useState(1)
  
  useFrame((state, delta) => {
    if (!visible || !sphereRef.current) return
    
    const targetScale = phase === 'in' ? 1.5 : phase === 'out' ? 0.8 : 1.2
    const newScale = THREE.MathUtils.lerp(scale, targetScale, delta * 0.5)
    setScale(newScale)
    sphereRef.current.scale.setScalar(newScale)
  })
  
  if (!visible) return null
  
  const color = phase === 'in' ? '#4ECDC4' : phase === 'out' ? '#FF6B6B' : '#FFE66D'
  
  return (
    <group position={[0, 1.3, -2]}>
      <Sphere ref={sphereRef} args={[0.3, 32, 32]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </Sphere>
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {phase === 'in' ? 'Breathe In' : phase === 'out' ? 'Breathe Out' : 'Hold'}
      </Text>
    </group>
  )
}

// Progress ring
function ProgressRing({ progress }: { progress: number }) {
  const ringRef = useRef<THREE.Mesh>(null)
  
  return (
    <group position={[0, 0.6, -2]} rotation={[0, 0, Math.PI / 2]}>
      {/* Background ring */}
      <Ring args={[0.18, 0.22, 64]}>
        <meshBasicMaterial color="#333" transparent opacity={0.4} side={THREE.DoubleSide} />
      </Ring>
      {/* Progress ring */}
      <Ring args={[0.18, 0.22, 64, 1, 0, (progress / 100) * Math.PI * 2]}>
        <meshBasicMaterial color="#4ECDC4" side={THREE.DoubleSide} />
      </Ring>
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.08}
        color="white"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, -Math.PI / 2]}
      >
        {`${Math.round(progress)}%`}
      </Text>
    </group>
  )
}

// Instruction panel
function InstructionPanel({ title, instruction }: { title: string, instruction: string }) {
  return (
    <group position={[0, 2, -2.5]}>
      {/* Panel background */}
      <Box args={[2.2, 0.7, 0.02]} position={[0, 0, -0.02]}>
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.9} />
      </Box>
      <Text
        position={[0, 0.18, 0]}
        fontSize={0.12}
        color="#4ECDC4"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {title}
      </Text>
      <Text
        position={[0, -0.1, 0]}
        fontSize={0.08}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.9}
        textAlign="center"
      >
        {instruction}
      </Text>
    </group>
  )
}

// VR Menu buttons
function VRMenu({ onStart, onExit, visible }: { onStart: () => void, onExit: () => void, visible: boolean }) {
  if (!visible) return null
  
  return (
    <group position={[0, 1.3, -2]}>
      {/* Start button */}
      <group position={[0, 0.15, 0]} onClick={onStart}>
        <Box args={[0.5, 0.15, 0.03]}>
          <meshStandardMaterial color="#4ECDC4" emissive="#4ECDC4" emissiveIntensity={0.2} />
        </Box>
        <Text position={[0, 0, 0.02]} fontSize={0.06} color="#1a1a2e" anchorX="center" anchorY="middle">
          START
        </Text>
      </group>
      
      {/* Exit button */}
      <group position={[0, -0.15, 0]} onClick={onExit}>
        <Box args={[0.5, 0.12, 0.03]}>
          <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.2} />
        </Box>
        <Text position={[0, 0, 0.02]} fontSize={0.05} color="white" anchorX="center" anchorY="middle">
          EXIT VR
        </Text>
      </group>
    </group>
  )
}

// Session complete panel
function CompletePanel({ stats, onRestart, visible }: { 
  stats: { exercises: number, time: string }
  onRestart: () => void
  visible: boolean 
}) {
  if (!visible) return null
  
  return (
    <group position={[0, 1.6, -2]}>
      <Box args={[1.8, 1, 0.02]} position={[0, 0, -0.02]}>
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.95} />
      </Box>
      <Text position={[0, 0.3, 0]} fontSize={0.12} color="#4ECDC4" anchorX="center" anchorY="middle">
        Session Complete! 🎉
      </Text>
      <Text position={[0, 0.05, 0]} fontSize={0.07} color="white" anchorX="center" anchorY="middle">
        {`Great work! You completed the exercise.`}
      </Text>
      <group position={[0, -0.25, 0]} onClick={onRestart}>
        <Box args={[0.4, 0.12, 0.02]}>
          <meshStandardMaterial color="#4ECDC4" />
        </Box>
        <Text position={[0, 0, 0.02]} fontSize={0.05} color="#1a1a2e" anchorX="center" anchorY="middle">
          RESTART
        </Text>
      </group>
    </group>
  )
}

// Countdown display component
function CountdownDisplay({ seconds, visible }: { seconds: number, visible: boolean }) {
  if (!visible || seconds <= 0) return null
  
  return (
    <group position={[0, 1.3, -2]}>
      {/* Background circle */}
      <Sphere args={[0.35, 32, 32]}>
        <meshStandardMaterial 
          color="#4ECDC4" 
          emissive="#4ECDC4" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </Sphere>
      {/* Countdown number */}
      <Text
        position={[0, 0, 0.4]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {seconds.toString()}
      </Text>
      {/* Label */}
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.08}
        color="#4ECDC4"
        anchorX="center"
        anchorY="middle"
      >
        Starting in...
      </Text>
    </group>
  )
}

// Main scene content
function SceneContent() {
  const {
    currentExercise,
    environment,
    isExerciseActive,
    currentStepIndex,
    exerciseProgress,
    startExercise,
    nextStep,
    resetExercise,
    exitVR,
    completedExercises,
    totalSessionTime,
  } = useGameStore()
  
  const [stepTimer, setStepTimer] = useState<NodeJS.Timeout | null>(null)
  const [countdown, setCountdown] = useState(5)
  const [hasAutoStarted, setHasAutoStarted] = useState(false)
  const exercise = currentExercise ? exercises[currentExercise] : null
  const currentStep = exercise?.steps[currentStepIndex]
  
  // Auto-start countdown - starts automatically when entering VR experience
  useEffect(() => {
    if (!isExerciseActive && !hasAutoStarted && countdown > 0) {
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearInterval(countdownTimer)
    }
  }, [isExerciseActive, hasAutoStarted])
  
  // Start exercise when countdown reaches 0
  useEffect(() => {
    if (countdown === 0 && !isExerciseActive && !hasAutoStarted) {
      setHasAutoStarted(true)
      startExercise()
    }
  }, [countdown, isExerciseActive, hasAutoStarted, startExercise])
  
  // Handle step timing
  useEffect(() => {
    if (isExerciseActive && currentStep) {
      const timer = setTimeout(() => {
        nextStep()
      }, currentStep.duration * 1000)
      
      setStepTimer(timer)
      return () => clearTimeout(timer)
    }
  }, [isExerciseActive, currentStepIndex, currentStep, nextStep])
  
  const handleStart = () => {
    setCountdown(0)
    setHasAutoStarted(true)
    startExercise()
  }
  
  const handleExit = () => {
    if (stepTimer) clearTimeout(stepTimer)
    exitVR()
  }
  
  const handleRestart = () => {
    setCountdown(5)
    setHasAutoStarted(false)
    resetExercise()
  }
  
  const isComplete = exerciseProgress === 100 && !isExerciseActive
  const showMenu = !isExerciseActive && !isComplete && countdown <= 0
  const showCountdown = !isExerciseActive && !isComplete && countdown > 0
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#4ECDC4" />
      
      {/* Environment */}
      <TherapeuticEnvironment type={environment} />
      
      {/* Guide Orb */}
      <GuideOrb isActive={isExerciseActive} />
      
      {/* Instruction Panel */}
      <InstructionPanel
        title={isExerciseActive && exercise ? exercise.name : 'Welcome to PhysioVR'}
        instruction={
          isExerciseActive && currentStep 
            ? currentStep.instruction 
            : showCountdown 
              ? 'Get ready! Exercise starting soon...\nRelax and look around.'
              : 'Look around to get comfortable.\nPress START when ready.'
        }
      />
      
      {/* Countdown Display */}
      <CountdownDisplay seconds={countdown} visible={showCountdown} />
      
      {/* Progress Ring */}
      {isExerciseActive && <ProgressRing progress={exerciseProgress} />}
      
      {/* Movement Targets */}
      {isExerciseActive && currentStep?.targetPosition && (
        <MovementTarget
          position={[
            currentStep.targetPosition.x,
            currentStep.targetPosition.y,
            currentStep.targetPosition.z
          ]}
          color="#4ECDC4"
          visible={true}
        />
      )}
      
      {/* Breathing Guide */}
      <BreathingGuide
        phase={currentStep?.breathPhase || null}
        visible={isExerciseActive && !!currentStep?.breathPhase}
      />
      
      {/* VR Menu */}
      <VRMenu onStart={handleStart} onExit={handleExit} visible={showMenu} />
      
      {/* Complete Panel */}
      <CompletePanel
        stats={{ exercises: completedExercises, time: '0:00' }}
        onRestart={handleRestart}
        visible={isComplete}
      />
    </>
  )
}

// Main VR Experience component
export default function VRExperience() {
  const { exitVR } = useGameStore()
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  if (!isClient) {
    return <Loader />
  }
  
  return (
    <div className="fixed inset-0 bg-dark-400">
      {/* Exit button overlay */}
      <button
        onClick={exitVR}
        className="fixed top-4 left-4 z-50 px-4 py-2 rounded-xl bg-dark-300/80 backdrop-blur text-white text-sm hover:bg-dark-200 transition-colors flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Exit
      </button>
      
      {/* VR Enter button */}
      <button
        onClick={() => xrStore.enterVR()}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-xl bg-primary-400 text-dark-400 font-semibold text-sm hover:bg-primary-300 transition-colors flex items-center gap-2"
      >
        <span>🥽</span>
        Enter VR
      </button>
      
      <Suspense fallback={<Loader />}>
        <Canvas
          className="vr-canvas"
          camera={{ position: [0, 1.6, 0], fov: 75 }}
          gl={{ antialias: true }}
        >
          <XR store={xrStore}>
            <SceneContent />
          </XR>
        </Canvas>
      </Suspense>
    </div>
  )
}

