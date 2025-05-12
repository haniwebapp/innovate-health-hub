
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // MOH brand colors - enhanced with additional shades
        moh: {
          green: '#00814A',
          gold: '#C3A86B',
          lightGreen: '#E8F5F0', // Updated to a proper light green for backgrounds
          darkGreen: '#006B3E',
          lightGold: '#F0EAD6',
          darkGold: '#A38A56',
          gray: '#F5F7FA',
          darkGray: '#4A5568',
          // New glass effect colors
          glassGreen: 'rgba(0, 129, 74, 0.08)',
          glassGold: 'rgba(195, 168, 107, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        arabic: ['Tajawal', 'sans-serif'],
        // Adding Playfair Display for headings
        playfair: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'count-up': {
          '0%': { content: '"0"' },
          '100%': { content: 'attr(data-value)' }
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' }
        },
        'medical-pulse': {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 129, 74, 0.4)' },
          '70%': { boxShadow: '0 0 0 15px rgba(0, 129, 74, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0, 129, 74, 0)' }
        },
        'dna-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-right': 'fade-in-right 0.5s ease-out forwards',
        'pulse-soft': 'pulse-soft 3s infinite ease-in-out',
        'float': 'float 4s infinite ease-in-out',
        'scale-in': 'scale-in 0.3s ease-out forwards',
        'count-up': 'count-up 2s forwards',
        'shimmer': 'shimmer 2s infinite',
        'medical-pulse': 'medical-pulse 2s infinite',
        'dna-rotate': 'dna-rotate 20s linear infinite'
      },
      backgroundImage: {
        'hero-pattern': 'linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%)',
        'card-gradient': 'linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(250, 250, 250, 0.9))',
        'green-gold-gradient': 'linear-gradient(135deg, rgba(0, 129, 74, 0.05) 0%, rgba(195, 168, 107, 0.05) 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
