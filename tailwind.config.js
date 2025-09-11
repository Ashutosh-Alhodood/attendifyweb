/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0E13",
        slate: "#111622",
        line: "#EDEEF2",
        primary: "#0EA5E9",
        primaryDark: "#0369A1",
        success: "#10B981",
        warning: "#F59E0B",
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(2, 6, 23, 0.06)",
      },
    },
  },
   "compilerOptions": {
    "jsx": "react-jsx",          // for React 17+ (Next.js 13/14 uses this)
    "allowJs": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "module": "esnext",
    "target": "esnext",
    "strict": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"],
  plugins: [],
};