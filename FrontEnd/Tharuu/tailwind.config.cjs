module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf8e1',
          100: '#fcf1c7',
          200: '#fae9a3',
          300: '#f7e07f',
          400: '#f5d75b',
          500: '#F2CD3C', // Main Gold
          600: '#d9b836',
          700: '#bf9e30',
          800: '#a6852a',
          900: '#8c7323',
          950: '#735e1d',
        }
      }
    },
  },
  plugins: [],
  safelist: [
    'text-3xl',
    'text-4xl',
    'font-bold',
    'text-blue-600',
    'mt-4',
    'pt-20',
    'max-w-4xl',
    'mx-auto',
    'p-4',
    'min-h-screen',
    'bg-gray-50',
    'dark:bg-gray-900',
    'text-gray-600',
    'dark:text-gray-300'
  ],
};
