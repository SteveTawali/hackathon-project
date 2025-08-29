# MindWell Frontend

React/TypeScript frontend for the MindWell mental wellness platform.

## Technology Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** with custom design system
- **Radix UI** primitives with shadcn/ui components
- **TanStack Query** for state management
- **React Router v6** for navigation

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Features

- Responsive design with dark/light theme support
- Comprehensive mood tracking with visual charts
- AI-powered journaling with sentiment analysis
- Habit tracking with progress visualization
- Meditation timer and breathing exercises
- Crisis support resources
- Beautiful, accessible UI components

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   └── Navigation.tsx # Main navigation
├── pages/             # Page components
├── hooks/             # Custom React hooks
├── lib/              # Utility functions
├── index.css         # Global styles and design tokens
└── main.tsx          # Application entry point
```