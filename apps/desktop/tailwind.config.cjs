/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{ts,tsx,html}'],
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
          dark: '#0F172A',
          light: '#FFFFFF',
          muted: '#F8FAFC',
        },
        ink: {
          primary: '#0F172A',
          secondary: '#64748B',
          inverse: '#F8FAFC',
        },
        line: {
          DEFAULT: '#E2E8F0',
          strong: '#CBD5E1',
        },
      },
      fontFamily: {
        ui: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
