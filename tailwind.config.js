/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Blue
          light: '#60A5FA', // Light blue
        },
        secondary: {
          DEFAULT: '#FFFFFF', // White
          light: '#F8F9FA', // Light gray for hover states
        },
        accent: {
          DEFAULT: '#06B6D4', // Cyan
          light: '#22D3EE', // Light cyan
        },
        // Page-specific themes
        dashboard: {
          primary: '#3B82F6',
          secondary: '#1E40AF',
          accent: '#06B6D4',
          bg: '#EBF8FF',
          transparent: 'rgba(59, 130, 246, 0.1)',
          glass: 'rgba(255, 255, 255, 0.25)'
        },
        products: {
          primary: '#8B5CF6',
          secondary: '#7C3AED',
          accent: '#A855F7',
          bg: '#F3E8FF',
          transparent: 'rgba(139, 92, 246, 0.1)',
          glass: 'rgba(255, 255, 255, 0.25)'
        },
        orders: {
          primary: '#10B981',
          secondary: '#059669',
          accent: '#34D399',
          bg: '#ECFDF5',
          transparent: 'rgba(16, 185, 129, 0.1)',
          glass: 'rgba(255, 255, 255, 0.25)'
        },
        members: {
          primary: '#F59E0B',
          secondary: '#D97706',
          accent: '#FBBF24',
          bg: '#FFFBEB',
          transparent: 'rgba(245, 158, 11, 0.1)',
          glass: 'rgba(255, 255, 255, 0.25)'
        },
        reports: {
          primary: '#EF4444',
          secondary: '#DC2626',
          accent: '#F87171',
          bg: '#FEF2F2',
          transparent: 'rgba(239, 68, 68, 0.1)',
          glass: 'rgba(255, 255, 255, 0.25)'
        },
        topsales: {
          primary: '#06B6D4',
          secondary: '#0891B2',
          accent: '#22D3EE',
          bg: '#ECFEFF',
          transparent: 'rgba(6, 182, 212, 0.1)',
          glass: 'rgba(255, 255, 255, 0.25)'
        },
        settings: {
          primary: '#6366F1',
          secondary: '#4F46E5',
          accent: '#818CF8',
          bg: '#EEF2FF',
          transparent: 'rgba(99, 102, 241, 0.1)',
          glass: 'rgba(255, 255, 255, 0.25)'
        },
        staff: {
          primary: '#EC4899',
          secondary: '#DB2777',
          accent: '#F472B6',
          bg: '#FDF2F8',
          transparent: 'rgba(236, 72, 153, 0.1)',
          glass: 'rgba(255, 255, 255, 0.25)'
        },
        attendance: {
          primary: '#14B8A6',
          secondary: '#0D9488',
          accent: '#2DD4BF',
          bg: '#F0FDFA',
          transparent: 'rgba(20, 184, 166, 0.1)',
          glass: 'rgba(255, 255, 255, 0.25)'
        },
        // AI-specific colors
        ai: {
          primary: '#7C3AED',
          secondary: '#5B21B6',
          accent: '#A855F7',
          bg: '#F3E8FF',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          glow: '0 0 20px rgba(124, 58, 237, 0.3)'
        },
        // Smart POS colors
        smartpos: {
          primary: '#06B6D4',
          secondary: '#0891B2',
          accent: '#22D3EE',
          bg: '#ECFEFF',
          glass: 'rgba(6, 182, 212, 0.1)'
        },
        // Chatbot colors
        chatbot: {
          primary: '#10B981',
          secondary: '#059669',
          accent: '#34D399',
          bg: '#ECFDF5'
        }
      },
      animation: {
        'shine': 'shine 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'gradient': 'gradient 3s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 255, 255, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shine-gradient': 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        'radial-shine': 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 206, 50, 0.3)',
        'glow-blue': '0 0 20px rgba(29, 99, 255, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
};