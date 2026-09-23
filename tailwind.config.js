/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        evergreen: {
          DEFAULT: '#173A35',
          hover: '#22564F',
          active: '#102A27',
          disabled: '#7E8E8B',
          subtle: '#EBF0EE',
        },
        mineral: {
          secondary: '#3E5A58',
          teal: '#4F7C84',
          'teal-hover': '#3E666D',
        },
        charcoal: {
          ink: '#202B29',
          body: '#46514F',
          muted: '#76807D',
        },
        ivory: {
          canvas: '#F3F0E8',
          subtle: '#FAF8F4',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          elevated: '#FFFFFF',
        },
        border: {
          DEFAULT: '#D9DDD8',
          strong: '#B8C2BD',
        },
        state: {
          success: '#2F6B4F',
          warning: '#A66A2B',
          error: '#A63D32',
          info: '#3F6877',
        }
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"IBM Plex Serif"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'Menlo', 'monospace'],
      },
      maxWidth: {
        'corporate': '1440px',
        'editorial': '1280px',
        'reading': '760px',
        'text': '720px',
      },
      spacing: {
        'section': '112px',
        'section-lg': '144px',
      },
      borderRadius: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
