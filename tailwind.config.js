/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './Components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        'h1': '64px',
        'h2': '48px',
        'h3': '32px',
        'h4': '24px',
        'h5': '20px',
        'h6': '16px',
        'body-lg': '20px',
        'body-md': '16px',
        'body-sm': '14px',
        'body-xs': '12pxm',
        'body-cap': '14pxm',
      },
      lineHeight: {
        'h1': '80px',
        'h2': '56px',
        'h3': '40px',
        'h4': '32px',
        'h5': '24px',
        'h6': '24px',
        'body-lg': '32px',
        'body-md': '24px',
        'body-sm': '24px',
        'body-xs': '24pxm',
        'body-cap': '16pxm',
      },
      letterSpacing: {
        'tight': '-0.02em',
        'normal': '0',
      },
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
      },
      fontWeight: {
        'normal': 400,
        'semibold': 600,
        'bold': 700,
      },
      height: {
        displayHeight: '36rem'
      }
    },
    colors: {
      primary: '#2BD17E',
      error: '#EB5757',
      background: '#093545',
      input: '#224957',
      card: '#092C39',
      white: '#FFFFFF'

    }
  },
  plugins: [],
}
