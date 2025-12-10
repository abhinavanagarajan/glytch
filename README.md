# PhysioVR 🥽

A Virtual Reality physiotherapy game designed for Google Cardboard. Built with Next.js, Three.js, and React Three Fiber.

![PhysioVR](https://img.shields.io/badge/VR-Cardboard%20Ready-4ECDC4)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Three.js](https://img.shields.io/badge/Three.js-WebXR-orange)

## Features

- 🧘 **4 Exercise Programs**: Shoulder mobility, neck relief, arm stretches, and deep breathing
- 🌲 **4 Therapeutic Environments**: Forest, ocean sunset, mountains, and zen garden
- 📱 **Google Cardboard Compatible**: Full WebXR VR support
- 📊 **Progress Tracking**: Session statistics and completion tracking
- 🎨 **Beautiful UI**: Modern, accessible design with smooth animations
- ⚡ **Fast & Lightweight**: Optimized for mobile browsers

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/physiovr.git
cd physiovr

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Build the app
npm run build

# The static files will be in the 'out' folder
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy with one click!

### Option 2: Netlify

1. Push to GitHub
2. Connect to [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `out`

### Option 3: GitHub Pages

1. Update `next.config.js`:
```js
const nextConfig = {
  output: 'export',
  basePath: '/your-repo-name',
}
```

2. Build and deploy:
```bash
npm run build
# Push the 'out' folder to gh-pages branch
```

### Option 4: Any Static Host

The `npm run build` command generates static files in the `out` folder. Upload these to any static hosting service (AWS S3, Firebase Hosting, etc.)

## Using with Google Cardboard

1. Open the deployed URL on your smartphone
2. Select an exercise and settings
3. Tap "Enter VR Experience"
4. Tap the VR goggles button (🥽) in the top right
5. Place your phone in the Cardboard viewer
6. Follow the guided exercises!

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **3D Engine**: Three.js via React Three Fiber
- **VR**: @react-three/xr (WebXR)
- **State**: Zustand
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion

## Exercise Programs

| Exercise | Duration | Focus |
|----------|----------|-------|
| Shoulder Mobility | 5-10 min | Rotations, shrugs, stretches |
| Neck Relief | 5-8 min | Gentle turns, tilts |
| Arm Stretches | 8-12 min | Full ROM, circles |
| Deep Breathing | 5 min | 4-4-6 breath pattern |

## Project Structure

```
physiovr/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── LandingPage.tsx # Exercise selection UI
│   │   └── VRExperience.tsx# 3D VR scene
│   └── store/
│       └── gameStore.ts    # Zustand state management
├── public/
│   └── manifest.json       # PWA manifest
├── package.json
└── README.md
```

## Browser Support

- Chrome (Android) ✅
- Firefox (Android) ✅
- Safari (iOS 15+) ⚠️ Limited WebXR
- Desktop browsers ✅ (for preview)

## License

MIT License - Feel free to use for personal or commercial projects.

## Contributing

Contributions welcome! Please open an issue or PR.

---

Made with ❤️ for therapeutic wellness

