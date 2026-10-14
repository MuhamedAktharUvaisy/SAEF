export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FFF9F3', coral: '#F2545B', emergency: '#D7263D', navy: '#14213D',
        blush: '#FDE4E4', mint: '#D6F2E4', lavender: '#E6E0FA',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: { soft: '0 18px 50px -20px rgba(20,33,61,0.25)', glow: '0 0 60px 10px rgba(242,84,91,0.25)' },
    },
  },
  plugins: [],
}
