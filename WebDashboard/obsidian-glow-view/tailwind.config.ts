import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        gold: "hsl(var(--gold))",
        amber: "hsl(var(--amber))",
        bronze: "hsl(var(--bronze))",
        champagne: "hsl(var(--champagne))",
        slate: "hsl(var(--slate))",
        platinum: "hsl(var(--platinum))",
        "rose-gold": "hsl(var(--rose-gold))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(263 70% 60% / 0.4)",
            transform: "scale(1)",
          },
          "50%": { 
            boxShadow: "0 0 40px hsl(263 70% 60% / 0.6)",
            transform: "scale(1.02)",
          },
        },
        "pulse-multi": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(263 70% 60% / 0.4), 0 0 40px hsl(210 100% 60% / 0.2)",
          },
          "33%": { 
            boxShadow: "0 0 30px hsl(320 85% 60% / 0.5), 0 0 50px hsl(263 70% 60% / 0.3)",
          },
          "66%": { 
            boxShadow: "0 0 25px hsl(210 100% 60% / 0.5), 0 0 45px hsl(180 100% 50% / 0.3)",
          },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "wave": {
          "0%, 100%": { transform: "translateX(0) scale(1)" },
          "50%": { transform: "translateX(100%) scale(1.2)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "pulse-multi": "pulse-multi 4s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "shimmer": "shimmer 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
        "wave": "wave 4s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary": "var(--gradient-primary)",
        "gradient-secondary": "var(--gradient-secondary)",
        "gradient-elegant": "var(--gradient-elegant)",
        "gradient-royal": "var(--gradient-royal)",
        "gradient-subtle": "var(--gradient-subtle)",
        "gradient-luxe": "var(--gradient-luxe)",
        "gradient-premium": "var(--gradient-premium)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
