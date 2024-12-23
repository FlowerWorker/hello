import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		fontFamily: {
			'montserrat': ['Montserrat', 'sans-serif'],
			'open-sans': ['Open Sans', 'sans-serif'],  
		  },
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		boxShadow: {
			'bottom-only': '0px 5px 10px rgba(0, 0, 0, 0.25)'
		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
			gold:'var(--gold)',
			darkblue: 'var(--darkblue)',
			turquoiseLight: 'var(--turquoiseLight)',
			turquoiseMed: 'var(--turquoiseMed)',
			turquoiseDark: 'var(--turquoiseDark)',
			turqoisgradient: 'var(--turqoisgradient)',
			navbardark: 'var(--navbardark)',
			navbarlight: 'var(--navbarlight)',
			bgdarkv1: 'var(--bgdarkv1)',
			bgdarkv2: 'var(--bgdarkv2)',
			bgdarkv3: 'var(--bgdarkv3)',
			bgdarkv4: 'var(--bgdarkv4)',
			bgdarkv5: 'var(--bgdarkv5)',
			bgdarkv6: 'var(--bgdarkv6)',
			bgdarkv7: 'var(--bgdarkv7)',
			bgdarkv8: 'var(--bgdarkv8)',
			purplev1: 'var(--purplev1)',
			purplev2: 'var(--purplev2)',
			greyv1: 'var(--greyv1)',
			cardhover: 'var(--cardhover)',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
