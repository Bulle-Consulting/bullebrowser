import type { Config } from 'tailwindcss';

// Comet-inspired dark palette: near-black surfaces, soft white ink,
// hairline borders, brand blue reserved for accents and CTAs.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
        },
        accent: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
        },
        surface: {
          dark: '#050506',
          base: '#09090B',
          muted: '#101012',
          raised: '#141416',
        },
        ink: {
          primary: '#F4F4F5',
          secondary: '#9D9DA6',
          faint: '#6B6B74',
          inverse: '#09090B',
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.16)',
        },
      },
      fontFamily: {
        ui: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
