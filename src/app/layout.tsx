import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Orbitron } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
})

export const metadata: Metadata = {
  title: 'PhysioVR - Therapeutic Exercise in VR',
  description: 'A virtual reality physiotherapy experience for Google Cardboard. Guided exercises for shoulder mobility, neck relief, arm stretches, and breathing.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'PhysioVR',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1a1a2e',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${orbitron.variable}`}>
      <body className="bg-dark-400 text-white antialiased">
        {children}
      </body>
    </html>
  )
}

