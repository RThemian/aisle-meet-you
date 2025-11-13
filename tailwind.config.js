/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
  safelist: [
    // Safelist dynamic Tailwind classes used in the app
    'bg-blue-100',
    'bg-blue-50',
    'bg-emerald-100',
    'bg-emerald-50',
    'bg-red-100',
    'bg-red-50',
    'bg-amber-100',
    'bg-amber-50',
    'bg-green-100',
    'bg-green-50',
    'text-blue-600',
    'text-emerald-600',
    'text-red-600',
    'text-amber-600',
    'text-green-600',
    'border-blue-200',
    'border-blue-400',
    'border-emerald-200',
    'border-emerald-400',
    'border-red-200',
    'border-red-400',
    'border-amber-200',
    'border-amber-400',
    'border-green-200',
    'border-green-400',
    'hover:border-blue-400',
    'hover:border-emerald-400',
    'hover:border-red-400',
    'hover:border-amber-400',
    'hover:border-green-400',
    'hover:bg-blue-50',
    'hover:bg-emerald-50',
    'hover:bg-red-50',
    'hover:bg-amber-50',
    'hover:bg-green-50',
  ]
}
