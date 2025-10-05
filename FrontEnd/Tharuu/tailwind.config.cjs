module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
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
